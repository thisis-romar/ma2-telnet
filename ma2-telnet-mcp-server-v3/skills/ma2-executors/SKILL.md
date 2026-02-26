---
name: ma2-executors
version: 1.1.0
---

# SK-08 — Executors & Pages

## Executor Management
- Assign Sequence N Executor M
- FaderPage/ButtonPage navigation
- Executor options (priority, loop)
- Kill; On/Off; bulk commands

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### Exec (Executor)

The key Exec is located in the command area on the right of the key Cue.

```
Executor
SpecialMaster
```

### Page

The key Page is located in the command area on the left of the key Macro.

```
Page
ChannelPage
FaderPage
ButtonPage
Page 5
Pause Page 3
Assign Page 3 / Info = "This are all my executors on page 3"
Page "song name"
```

### View

The key View is located in the command area on the left of the key Effect.

```
ViewPage
```

### - [Minus]

- [Minus] is a helping keyword with various functions.

```
Page -
```

### + [Plus]

+ [Plus] is a helping keyword with various functions.

```
Page +
```

### AlignFaderModules

AlignFaderModules is a function used to configure connected external wings.

```
AlignFaderModule
```

### AllButtonExecutors

AllButtonExecutors is an alias for all button executors.

```
Off AllButtonExecutors
```

### AllChaseExecutors

AllChaseExecutors is used as an alias to address all executors with chasers assigned.

```
Off AllChaseExecutors
```

### AllFaderExecutors

AllFaderExecutors is an alias for all fader executors.

```
Off AllFaderExecutors
```

### AllSequExecutors

AllSequExecutors is an alias for all executors assigned with a sequence.

```
Off AllSequExecutors
```

### Assign

Assign is a function used to define relationships between objects or give values to properties.

```
​Assign Toggle At Executor 101
​Assign Executor 1
Assign Go ExecButton1 1.1 /cue_mode=xassert
```

### At

Following an object list that follows a function, At is a helping keyword for the starting function.

```
Executor 3 At 50
```

### ButtonPage

ButtonPage is an object type representing the button executor part of a page.

```
​ButtonPage 5
```

### Empty

The Empty keyword is a function keyword.

```
Assign Empty Executor 101
```

### ExecButton1

ExecButton1 is an object keyword for the first button of an executor.

```
Assign Toggle At ExecButton1 5
Delete ExecButton1 5
```

### ExecButton2

ExecButton2 is an object keyword for the second button of an executor.

```
Assign Toggle At ExecButton2 5
Delete ExecButton2 5
```

### ExecButton3

ExecButton3 is an object keyword for the third button of an executor.

```
Assign Toggle At ExecButton 3 5
Delete ExecButton 3 5
```

### Executor

You can also type Executor or the shortcut Ex directly in the command line.

```
Delete Executor 5
Executor 5 At 50
Delete Cue 3 Executor 5
Select Executor 4.2
```

### Fader

Fader is an object keyword representing the fader of an executor.

```
Assign Speed At Fader 5
Fader 5 At 50
```

### FaderPage

Another way is to type FaderPage or one of the shortcuts FP or FaderP directly in the command line.

```
FaderPage 5
```

### Fix

Fix is a function keyword to fix objects on a page.

```
Fix On Executor 1 Thru 5
Fix Executor 3
```

### IdentifyFaderModule

IdentifyFaderModule defines which module corresponds to which wing. That is, the wing starts to flash. The flashing automatically stops after approximately 10 seconds.

```
IdentifyFaderModule 1
```

### ListFaderModules

The ListFaderModules keyword is a function keyword to display all available internal and external wings (= executor modules) in the command line feedback window.

```
ListFaderModules
```

### Master

The Master keyword is a function keyword to assign an executor the function master. Master is a function that will scale the output of intensity-values of an executor, according to the position of the fader.

```
Assign Master Exec 28
```

### MasterFade

MasterFade keyword is a function to adjust the on and off fade time of chasers and effects, and the off fade time for sequence executors.

```
​Assign Masterfade At Executor 1 Thru 5
​Masterfade 5 Executor 1
```

### Select

You can also type Select or the shortcut Se in the command line.

```
Select Executor 5
```

### SelFix

SelFix is a function keyword.

```
SelFix Executor 1
```

### SpecialMaster

Specialmaster is an object type that holds predefined objects for global control.

```
SpecialMaster "grandmaster" . "grand" At 50
```

### Thru

You can also type Thru in the command line or use the shortcut T.

```
Go Page 4 thru 5 Exec 4 thru 5
```

### ViewPage

The ViewPage keyword calls the view pages. There are 11 view pages available.
This is the same as press and hold the  and a V-Key.

```
ViewPage 2
```

### Zero

This keyword is a helping keyword.

```
Executor 1 Zero
```

### Executor List

An executor list is an object list of executors.

```
Pause Page 1 Thru 3
Delete Executor 10 Thru 13
```

### Group Master on Executors

Groups can be assigned to Executors and be used as group masters.

```
locate group 3
```

### Assign a function

This topics describes how to assign an object to an executor and how to assign functions to executor keys and faders.

```
as seq 4 ex 2.5
Assign ToFull ExecButton3 8.5
Assign Rate Executor 9
Assign Rate Fader 9
Assign Empty Fader 9
```

### Executor Pages

The Executors are arranged in pages.

```
ButtonPage 20
Page Rainbow
```

### Channel Pages

The Fader Executors can be changed to be Channel Faders instead of Executors.

```
CD Fixture 1
Assign Fixture 1.1.3 ChannelPage 1.2
Assign Fixture 1.1.4 ChannelPage 1.3
Assign Fixture 1.1.PAN ChannelPage 1.2
Assign Fixture 1.1.TILT ChannelPage 1.3
```
