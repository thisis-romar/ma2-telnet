---
name: ma2-macros
description: grandMA2 macro execution, programmatic telnet creation, variables, automation
version: 1.1.0
---

# SK-10 — Macros & Automation

## ⚠️ CRITICAL: Record Macro is NOT telnet-compatible
Record Macro N Please → enters hardware key-recording mode on the console.
The console then waits for physical hardware key presses to populate the macro.
Via Telnet: the command executes, recording mode starts, but NO subsequent
telnet commands are recorded — the console is waiting for physical input.
Result: macro creation silently fails or console becomes temporarily unresponsive.
NEVER use Record Macro from a telnet agent session.

## Telnet-Native Macro Creation (3-step pattern)

Step 1 — Create the pool object:
  Store Macro 1.[id]

Step 2 — Create line slots (one per line needed):
  Store Macro 1.[id].[line_number]

Step 3 — Assign command content to each line:
  Assign Macro 1.[id].[line_number] /CMD="your command here"

Step 4 — Label the macro (optional):
  Label Macro [id] "Human Readable Name"

## Full Example — ShowStart macro with 3 lines
Store Macro 1.10
Store Macro 1.10.1
Store Macro 1.10.2
Store Macro 1.10.3
Assign Macro 1.10.1 /CMD="Go Executor 1"
Assign Macro 1.10.2 /CMD="Go Executor 2"
Assign Macro 1.10.3 /CMD="SaveShow"
Label Macro 10 "ShowStart"

## Running Macros via Telnet
  Macro 10 Please        (runs macro 10)
  Call Macro 10          (same, alternative syntax)
  Macro "ShowStart" Please  (by name)

## Variables
  SetVar $name = value             (global show variable)
  SetVar $name = "text string"     (text — quotes required)
  AddVar $name = additional_text   (append to variable)
  ListVar                          (display all variables)

## Built-in Predefined Variables
  $SELECTEDEXEC   current selected executor number
  $ACTIVECUE      active cue on selected executor
  $FADERPAGE      current executor fader page
  $BUTTONPAGE     current executor button page
  $SHOWNAME       name of the current show file
  $USER           currently logged in user

## Quote Nesting in /CMD=
Outer quotes: double → inner must be single
  Assign Macro 1.5.1 /CMD="Label Macro 10 'ShowStart'"
No nested quotes of same type — use variable substitution if needed.
