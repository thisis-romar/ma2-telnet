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

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### Macro

The key Macro is located in the command area on the right of the key Page.

```
Macro
Timecode
Agenda
Timer
Plugin
Macro 5
Assign Macro 1.3.4 /wait="Go"
Store Macro 2
```

### Function of the Command Line

For more information on multiple functions of keys see Key overview.

```
Delete Group 4
```

### AddUserVar

AddUserVar is a function used to change/extend content of user specific variables.

```
SetUserVar $myname = "John"
AddUserVar $myname = " Doe"
SetUserVar $mycounter = 5
AddUserVar $mycounter = 6
```

### AddVar

AddVar is a function keyword to change or extend content of show specific variables.

```
SetVar $myname = "John"
AddVar $myname = " Doe"
SetVar $mycounter = 5
AddVar $mycounter = 6
```

### Appearance

You can change the frame color of pool objects and the background color of cues with the Appearance keyword.

```
Appearance Macro 2 At Macro 13
```

### Call

Call is a function used to apply/engage an object or its content (press 2x button "ON").

```
Call /?
​Call Preset 3.1
​Call Sequence 1
​Call Cue 3
Call Cue 3 /status
```

### Copy

Copy is a function used to create copies of an object.

```
Copy Macro 2 At 6
```

### Dollar $ Character

To get the $ character in the command line, press and hold Shift + 4.

```
SetVar $mychasers = "Executor 11 Thru 15"
Off $mychasers
SetVar $myname = "Ben Dover"
Login $"myname"
```

### ListMacroLibrary

The ListMacroLibrary is a function keyword to displays the .xml files in macro folder of the selected drive in the command line feedback window.

```
ListMacroLibrary "My*"
```

### ListPluginLibrary

The ListPluginLibrary is a function keyword to displays the .xml files in the plugins folder of the selected drive in the command line feedback window.

```
ListPluginLibrary "My*"
```

### ListUserVar

The ListUserVar keyword is a function keyword to get the user specific variables and their values in the Command Line Feedback window displayed.

```
ListUserVar
ListUserVar f*
```

### ListVar

The ListVar keyword is a function keyword to get the variables and their values in the Command Line Feedback window displayed.

```
ListVar
ListVar f*
```

### RemoteCommand

RemoteCommand is a function keyword.

```
RemoteCommand 192.168.0.4 "Macro 4"
```

### SetUserVar

The SetUserVar keyword sets user profile specific variables. For more information, see Macros - Use Variables.

```
SetUserVar $CueNumber =
```

### SetVar

The SetVar keyword sets global show variables. Every user profile can use these variables. For more information, see Macros - Use Variables.

```
SetVar $CueNumber =
```

### Use variables in macros

It is possible to use variables in your macros and in any command line entry in the show.

```
SetVar $song_name = This is us
SetVar $chorus_Chasers="Executor 201 + 204 + 205"
Go $chorus_Chasers
```

### Command line interaction

Command line interaction can mean two different things when we talk about macros - they are however connected.

```
Group 4 At
```

### Assign a macro to a

Macros can be assigned to Executors, View buttons, and X-keys.

```
Assign Macro 1 At Exec 2.7
Assign Macro 2 At ViewButton 1.5
```
