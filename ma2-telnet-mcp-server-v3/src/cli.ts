import readline from 'readline';
import chalk from 'chalk';
import { exec, status, close, execBatch, listObjects } from './index.js';

// Enhanced log utility with color
const LOG_LEVEL = process.env.MA2_LOG_LEVEL || 'info';
function log(level: 'error' | 'info' | 'debug', msg: string) {
  if (['error', 'info', 'debug'].indexOf(level) === -1) return;
  if (level === 'debug' && LOG_LEVEL !== 'debug') return;
  if (level === 'info' && LOG_LEVEL === 'error') return;
  // Redact credentials
  msg = msg.replace(/(admin|administrator|password|MA2_PASSWORD|MA2_USERNAME)\s*[:=]\s*\S+/gi, '[REDACTED]');
  let prefix = `[${level.toUpperCase()}]`;
  let colored;
  if (level === 'error') {
    colored = chalk.red.bold(prefix) + ' ' + chalk.red(msg);
  } else if (level === 'info') {
    colored = chalk.blue(prefix) + ' ' + msg;
  } else if (level === 'debug') {
    colored = chalk.gray(prefix) + ' ' + msg;
  } else {
    colored = prefix + ' ' + msg;
  }
  console[level === 'error' ? 'error' : 'log'](colored);
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'MA2> '
  });

  log('info', chalk.green('Welcome to MA2 Interactive CLI. Type :help for commands.'));
  rl.prompt();

  rl.on('line', async (line) => {
    const cmd = line.trim();
    if (!cmd) {
      rl.prompt();
      return;
    }
    try {
      if (cmd.startsWith(':')) {
        // Meta-commands
        if (cmd === ':help') {
          log('info', chalk.yellow('Commands:'));
          log('info', chalk.white('  <MA2 command>        Send command to console'));
          log('info', chalk.white('  :status              Show connection status'));
          log('info', chalk.white('  :close               Close connection'));
          log('info', chalk.white('  :batch <cmds>        Run multiple commands (comma separated)'));
          log('info', chalk.white('  :list <type> [args]  List objects of type'));
          log('info', chalk.white('  :exit                Exit CLI'));
        } else if (cmd === ':status') {
          const s = await status();
          log('info', JSON.stringify(s, null, 2));
        } else if (cmd === ':close') {
          await close();
          log('info', chalk.magenta('Connection closed.'));
        } else if (cmd.startsWith(':batch ')) {
          const cmds = cmd.slice(7).split(',').map(s => s.trim()).filter(Boolean);
          const res = await execBatch(cmds);
          log('info', JSON.stringify(res, null, 2));
        } else if (cmd.startsWith(':list ')) {
          const [type, ...args] = cmd.slice(6).split(' ');
          const res = await listObjects(type as any, args.join(' '));
          log('info', JSON.stringify(res, null, 2));
        } else if (cmd === ':exit') {
          rl.close();
        } else {
          log('error', chalk.red('Unknown meta-command. Type :help for list.'));
        }
      } else {
        // MA2 command
        const result = await exec(cmd);
        log('info', JSON.stringify(result, null, 2));
      }
    } catch (err) {
      log('error', chalk.red(err instanceof Error ? err.message : String(err)));
    }
    rl.prompt();
  });

  rl.on('close', () => {
    log('info', chalk.green('Exiting MA2 CLI.'));
    process.exit(0);
  });
}

main().catch((err) => {
  log('error', chalk.red('Fatal: ' + (err instanceof Error ? err.message : String(err))));
  process.exit(1);
});
