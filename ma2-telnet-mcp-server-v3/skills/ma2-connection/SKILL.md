---
name: ma2-connection
version: 1.1.0
---

# SK-01 — Connection & Session Management

## ⚠️ CRITICAL: Record Macro is NOT telnet-compatible
Record Macro N Please → enters hardware key-recording mode on the console.
The console then waits for physical hardware key presses to populate the macro.
Via Telnet: the command executes, recording mode starts, but NO subsequent
telnet commands are recorded — the console is waiting for physical input.
Result: macro creation silently fails or console becomes temporarily unresponsive.
NEVER use Record Macro from a telnet agent session.

## Connection Workflow
- TCP connect port 30000
- Dual-prompt login
- CRLF termination
- ANSI stripping
- Prompt detection
- Auto-reconnect
- Command queue serialisation

## Environment Variables
MA2_HOST / MA2_PORT / MA2_USERNAME / MA2_PASSWORD

## Recovery
If connection is lost or console enters recording mode, physical operator must press Please or Escape on the console to recover.
