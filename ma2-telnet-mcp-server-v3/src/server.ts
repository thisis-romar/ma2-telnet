import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { exec, execBatch, status, listObjects } from './index.js';
import { MA2_OBJECT_TYPES } from './objectTypes.js';

const server = new McpServer({
  name: 'ma2-telnet',
  version: '3.0.0',
});

server.registerTool(
  'ma2_exec',
  {
    description:
      'Execute a single grandMA2 command over telnet. ' +
      'Commands beginning with "List" return structured parsed output; ' +
      'all other commands return raw output lines.',
    inputSchema: z.object({
      command: z.string().describe('The grandMA2 command to execute (e.g. "List Cue", "Goto Cue 1").'),
    }),
  },
  async ({ command }) => {
    const result = await exec(command);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

server.registerTool(
  'ma2_exec_batch',
  {
    description: 'Execute multiple grandMA2 commands in sequence. Returns results in the same order.',
    inputSchema: z.object({
      commands: z.array(z.string()).describe('Ordered list of grandMA2 commands to execute.'),
    }),
  },
  async ({ commands }) => {
    const results = await execBatch(commands);
    return { content: [{ type: 'text', text: JSON.stringify(results, null, 2) }] };
  }
);

server.registerTool(
  'ma2_status',
  {
    description: 'Check whether a TCP connection to the grandMA2 console is currently established.',
  },
  async () => {
    const result = await status();
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  }
);

server.registerTool(
  'ma2_list_objects',
  {
    description:
      'List grandMA2 objects of a specific type and return structured rows. ' +
      'Wraps "List <type> [args]" and parses the table output.',
    inputSchema: z.object({
      type: z
        .enum(MA2_OBJECT_TYPES as [string, ...string[]])
        .describe('The grandMA2 object type to list (e.g. "cue", "group", "fixture").'),
      args: z
        .string()
        .optional()
        .describe('Optional range qualifier, e.g. "Thru 10" or "1 Thru 5".'),
    }),
  },
  async ({ type, args }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await listObjects(type as any, args);
    return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${err instanceof Error ? err.message : String(err)}\n`);
  process.exit(1);
});
