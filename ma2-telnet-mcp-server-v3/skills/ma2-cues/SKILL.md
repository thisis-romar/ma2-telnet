---
name: ma2-cues
version: 1.1.0
---

# SK-07 — Cues, Sequences & Playback

## Cue Management
- Store/Update cue
- Go, GoBack, Goto Cue N Executor M
- Off Executor
- Trigger types
- Cue modes (Assert, Break, Release)
- Tracking vs cue-only
- Fade/delay syntax

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### >>> [GoFastForward]

The key >>> [GoFastForward] is located in the command area on the right of the key Learn.

```
>>>
Flash
ToFull
>>> Executor 3
```

### <<<  [GoFastBack]

The key <<<  [GoFastBack] is located in the command area on the left of the key Learn.

```
<<<
Black
ToZero
```

### Copy

The key Copy is located in the command area below the key Del.

```
Clone
​Copy Cue 5
```

### Cue

The key Cue is located in the command area on the right of the key Sequ.

```
Cue
Part
Cue 3
```

### Del (Delete)

The key Del (= Delete) is located in the command area on the right of the key Goto.

```
Release
```

### Fixture

The key Fixture is located in the command area on the right of the key Channel.

```
Selection
```

### Go + Key (small)

The key Go + (small) is located in the command area on the right of the key Pause.

```
Go
Unpark
```

### Go - Key (small)

The key Go - (small) is located in the command area on the left of the key Pause.

```
GoBack
```

### Goto

The key Goto is located in the command area on the right of the key Effect.

```
Goto
Load
LoadNext
LoadPrev
Goto /?
Goto Cue 5 Executor 4
```

### Learn

The key Learn is located in the command area on the right of the key <<<.

```
Learn
Rate1
```

### Off

The key Off is located in the command area on the right of the key Select.

```
Off
Off Cue 1
Off Fixture 1 + 3
Flash Off Executor 1.2.4
Highlight Off
```

### On

The key On is located in the command area on the right of the key Top.

```
On
Call
On /?
On Cue 1
On Fixture 1 + 3
Flash On Executor 1.2.4
```

### Pause (small)

The small key Pause is located in the command area on the right of the small key Go -.

```
Pause
Park
```

### Prvw (Preview)

The key Prvw (Preview) is located in the command area on the left of the key Assign.

```
Preview
```

### Sequ (Sequence)

The key Sequ (Sequence) is located in the command area on the left of the key Cue.

```
Sequence
```

### Store

The key Store is located in the command area on the left of the key

```
Record
Store Cue 1 Thru 10 + 20 Thru 30
```

### Temp

The key Temp is located in the command area on the left of the key Top.

```
Temp
Toggle
Temp /?
Temp On Executor 1
Temp Off Executor 1
```

### Time

The key Time is located in the command area on the left of the key Esc.

```
Fade
Delay
Store Fade
Store OutFade
Store Delay
Store OutDelay
Store CmdDelay
```

### Top

The key Top is located in the command area on the right of the key Temp.

```
Top
Kill
Top /?
Top Executor 5
Top Executor 5 Fade 3
```

### View

The key View is located in the command area on the left of the key Effect.

```
ViewButton
```

### Helping Keywords

Helping keywords are used to create a relation between functions and objects.

```
Copy Cue 3 At Cue 5
```

### Function Keywords

Function keywords perform a task or a function.

```
Goto Cue 3
Delete Preset "Blue"
```

### <<< [GoFastBack]

The keyword <<< GoFastBack is a function used to jump quickly to previous step (default without timing can be changed in setup).

```
<<< Executor 3
```

### + [Plus]

+ [Plus] is a helping keyword with various functions.

```
Delete Cue 1 + 2
```

### Alert

Alert is a keyword which generates an alert message in the message center.

```
Alert "coffee break"
```

### And

The keyword And is a helping keyword that adds selection or values.

```
Delete Cue 1 If Fixture 5 Attribute "Pan" And Fixture 5 Attribute "Tilt"
```

### Assign

Assign is a function used to define relationships between objects or give values to properties.

```
​Assign Sequence 1 Thru 5 At Executor 6 Thru 10
​Assign Fade 3 Cue 5
```

### At

Following an object list that follows a function, At is a helping keyword for the starting function.

```
​At Cue 3
```

### Attribute

Attribute is an object type used as reference attributes of a fixture.

```
​Off Attribute 1
```

### Black

Black is a function used to temporary override master level to zero on executing objects.

```
Black On Executor 1
Black Off Executor 1
```

### Blackout

Blackout is a function used to force zero values on output for dimmer parameter of channels and fixtures. Fixtures with "React to Master" = off in the fixture edit menu do not react to Blackout. As long as Blackout is enabled the "B.O." button is on i.e.,  it is permanently burning.

```
Blackout On
```

### BlackScreen

The keyword BlackScreen is used to make single or all screens of the console turn black.

```
BlackScreen /?
BlackScreen
BlackScreen Off
BlackScreen 1
```

### Blind

Blind is a function that suppresses the output of the live programmer. Programming is possible without a live output. Switching off the blind mode brings back the live programmer including changes made during blind mode.

```
Blind On
```

### BlindEdit

BlindEdit is a function used to switch the console between the Live and a separate Blind programmer.

```
​BlindEdit On
```

### Block

Block is a function used to add data to prevent tracking. Tracking values (magenta colored) are converted to stored values (white colored).

```
​Block Cue 5 If Fixture 4 If Feature "Position"
```

### Clone

It is possible to clone from fixture to fixture; from fixture to fixture type; from fixture type to fixture; or from fixture type to fixture type.

```
Clone /?
Clone Fixture 1 At Fixture 2
Clone Fixture 1 + 2 At Group 10 If Sequence 1 Thru 10
Clone Fixture 1 At Fixture 2 /merge
​Clone Fixture 1 At Fixture 2 /overwrite
Clone Fixture 1 At FixtureType 2
Clone Fixture 1 At FixtureType 2 /merge
Clone Fixture 1 At FixtureType 2 /overwrite
Clone FixtureType 1 At Fixture 2
Clone FixtureType 1 At Fixture 2 /merge
​Clone FixtureType 1 At Fixture 2 /overwrite
Clone FixtureType 1 At FixtureType 2
Clone FixtureType 1 At FixtureType 2 /merge
​Clone FixtureType 1 At FixtureType 2 /overwrite
```

### CmdDelay

CmdDelay is a helping keyword used to indicate delay times for the cmd link.

```
​Store Cue 3 CmdDelay 4
```

### Crossfade

Crossfade is a function that is assigned for executors.

```
​Assign Crossfade At Executor 1 Thru 5
​Crossfade 70 Executor 1 Fade 3
```

### CrossfadeA

CrossfadeA is a function assigned for executors.

```
​Assign CrossfadeA At Executor 1
```

### CrossfadeB

CrossfadeB is a function that is assigned for executors.

```
​Assign CrossfadeB At Executor 1
```

### DefGoBack

DefGoBack is a keyword which refers to the selected executor.

```
​DefGoBack
```

### DefGoForward

DefGoForward is a keyword which refers to the selected sequence.

```
​DefGoForward
```

### DefGoPause

DefGoPause is a keyword which refers to the selected executor.

```
​DefGoPause
```

### Delay

Delay is a helping keyword used to indicate delay times.

```
Store Cue 3 Delay 4
Delay 4
```

### Dmx

Dmx is an object type representing the DMX outputs of the console.

```
​Off Dmx Thru
```

### DoubleRate

DoubleRate is a function used to double the current rate.

```
​DoubleRate Executor 5
```

### DoubleSpeed

DoubleSpeed is a function to multiply the speed or the executor by 2.

```
DoubleSpeed Executor 5
```

### Extract

Extract is a function that applies hard values in the programmer and breaks any referenced links.

```
Extract Selection
Extract Cue 4
```

### Fade

Fade is a helping keyword to indicate fade times.

```
Goto Cue 3 Fade 4
Store Cue 3 Fade 4
Assign Fade 3 Cue 2
Fade 2
At 50 Fade 2
```

### FadePath

FadePath is an object type representing the possible transition paths of a cue part.

```
Assign FadePath 7 At Cue 4 Part 0
```

### Feature

Feature is an object keyword representing features of a fixture.

```
Feature "Position".2
```

### Flash

Flash is a function used to temporary overwrite master level to full on executing objects without using times.

```
Flash On Executor 1
Flash Off Executor 1
```

### FlashGo

FlashGo executes the keyword Flash and jumps into the next cue.

```
FlashGo /?
FlashGo Executor 1
```

### FlashOn

FlashOn activates the cue and ignores the fade times and the master level.

```
FlashOn /?
FlashOn Executor 1
```

### Freeze

To execute the keyword Freeze directly press Freeze.

```
Freeze On
```

### Go

Go is a function keyword to activate the next step of an executing object.

```
Go /?
Go Executor 3
Go Macro 2
```

### GoBack

GoBack is a function keyword to activate previous step of an executing object.

```
GoBack /?
GoBack Executor 3
```

### HalfRate

HalfRate is a function keyword to divide the current rate by 2.

```
HalfRate Executor 5
```

### HalfSpeed

HalfSpeed is a function keyword to divide the current speed by 2.

```
HalfSpeed Executor 5
```

### Highlight

Another way is to type Highlight or the shortcut Hi directly in the command line.

```
Highlight On
```

### If

The If keyword as a function keyword deselects fixtures not in the entered selection list.

```
Delete Cue 3 If Channel 4
Delete Cue 3 If Fixture 4 Attribute "pan"
Delete Cue 3 If Fixture 4 If Attribute "pan"
```

### Kill

You can also type Kill or the shortcut K in the command line.

```
Kill /?
Kill Executor 1
```

### List

The List keyword is a function keyword.

```
List Cue
```

### ListUpdate

The ListUpdate keyword is a function keyword to get the objects in the command line displayed that can be updated.

```
ListUpdate
```

### Load

The load keyword is a function keyword used to prepare an executor to jump to another cue rather than jumping to the next cue when a Go+ is performed on the executor.

```
Load Cue 3
Load Cue 5 Executor 4
Load Executor 3
```

### LoadNext

LoadNext is a function keyword. If an executor stands in a cue, LoadNext loads the next cue.

```
LoadNext Executor 2
```

### LoadPrev

LoadPrev is a function keyword. If an executor stands in a cue, LoadPrev loads the previous cue.

```
LoadPrev Executor 2
```

### Locate

The locate keyword is a function keyword to locate assigned objects on executors. The page will change to that page where the object is assigned and a HERE is displayed.

```
Locate Sequence 1
```

### Lock

The lock keyword is a function keyword to lock objects.

```
Lock Cue 3
```

### ManualXFade

ManualXFade activates the function Crossfade of the Special Masters "Exec Time" and "Program Time".

```
ManualXFade SpecialMaster 2.3
Off SpecialMaster 2.3
```

### Messages

With the Messages keyword you can

```
Delete Messages /condition="type = 'alert'"
```

### MidiControl

The MidiControl keyword is a function keyword to transmit MIDI control change messages via the MidiOut port.

```
MidiControl 1 64
```

### Oops

The Oops keyword is a function keyword to undo the last:

```
Oops /noconfirm
```

### Or

Or is a helping keyword and is usually used along with the keyword If.

```
Delete Cue 1 If Channel 2 or 3
```

### OutDelay

The OutDelay keyword is a helping keyword to set an outdelay time.

```
Store Cue 3 OutDelay 4
```

### OutFade

The OutFade keyword is a helping keyword to set an outfade time.

```
Store Cue 3 OutFade 4
```

### Part

You can also type Part or the shortcut P in the command line.

```
Store Cue 3 Part 2
Move Cue 2 Part 2 At Cue 2 Part 3
Delete Cue 1 Part 2
```

### Pause

The Pause keyword is a function keyword to pause:

```
Pause Executor 3
```

### Plugin

The Plugin keyword is an object keyword to access Plugins. The default function for the Plugin keyword is Go+.

```
Assign Plugin 2/name="Create Sequence"
```

### PMArea

The PMArea keyword is an object keyword to access pixel mapper areas and pixel mapper outputs. You can store, copy, and delete pixel mapper setups. For more information, see MA VPU pixel mapper.

```
Store PMArea 1.2 /axis=+X+Z /noconfirm
```

### Preview

The Preview keyword is a function keyword.

```
Preview /?
Preview Cue 5
Preview Cue 5 Part 2
Preview Executor 3
```

### PreviewEdit

You can also type PreviewEdit in the command line or use the shortcut PreviewEd.

```
PreviewEdit On
```

### PreviewExecutor

To execute the PreviewExecutor keyword, enter a functional keyword and press  Prvw . For example  Go +  Prvw (=  Go PreviewExecutor).

```
Go PreviewExecutor
Store Cue 5 PreviewExecutor
```

### Protocol

The Protocol keyword is an object keyword to access the network protocols.

```
Assign Protocol 4 /outactive=on
```

### Quotation Marks " " Character

To enter " " quotation marks into the command line press and hold Shift and  "  .

```
Label Macro 3 "on"
Assign Cue 1 /info="run after music stops"
```

### Rate

The Rate keyword is a function to adjust the Rate of an executor.

```
Assign Rate Exec 6
Rate 2 Executor 1 + 5
```

### Rate1

The Rate1 keyword is a function keyword.

```
Rate1 Executor 5
```

### Record

The Record keyword is a function keyword.

```
Record Timecode 1
Record Timecode
Record Macro 5
Record Macro
Record Executor 1
Record Off Executor 1
```

### Release

You can also type Release in the command line or use the shortcut Rel.

```
Release Selection
Release PresetType "position"
Release Effect 4
```

### ReloadPlugins

The ReloadPlugins keyword is a function keyword.

```
ReloadPlugins
```

### Remove

You can also type Remove in the command line or use the shortcut Remov.

```
Remove Selection
```

### Replace

The replace keyword is a function keyword.

```
Replace Attribute "Dim" At 0 Thru 100 With 0 Thru 90 If Sequence 3
Replace Attribute "Tilt" Fade 5 with Fade 10
Replace Fixture 1 With Fixture 2 If Sequence 3
Replace Preset 2.1 With Preset 2.4 If Sequence 5
Search Fixture 8 If Sequence 5
Replace Value 0 Thru 100 With 0 Thru 120 If Sequence 4
Replace Fixture 1 + 2 Value 0 Thru 100 With 0 Thru 80 If Sequence 4
Search Value 50 If Sequence 8
```

### ResetDmxSelection

ResetDmxSelection is a function keyword.

```
ResetDmxSelection
```

### Selection

You can also type Selection in the command line or use the shortcut Selecti.

```
Off Selection
```

### Semicolon ; Character

To get the ; semicolon in the command line, press  ; .

```
Off Executor 5 ; Delete Group 3
```

### Sequence

You can also type Sequence or the shortcut Seq in the command line .

```
Sequence 5
Block Sequence 5
```

### ShuffleSelection

The ShuffleSelection keyword mix-up the order of the selected fixture or channel.

```
ShuffleSelection
```

### SnapPercent

You can also type, SnapPercent or the shortcut Sn in the command line.

```
Store Cue 1 SnapPercent 4
Assign Cue 1 SnapPercent 4
```

### Slash / Character

To get the slash / in the command line, press / .

```
Assign Cue 5 /mib = early /trig = follow
```

### Solo

The Solo keyword is a function keyword.

```
Solo On
```

### Speed

The Speed keyword is a function keyword.

```
Assign Speed Exec 28
Speed 120 Executor 3
```

### StepFade

The StepFade keyword is a function keyword.

```
Assign StepFade Exec 28
StepFade 50 Exec 3
```

### StepInFade

The StepInFade keyword assigns executors as a step in fader. A step in fader controls the step in time of each step of a chaser.

```
Assign StepInFade Exec 28
StepInFade 50 Executor 3
```

### StepOutFade

The StepOutFade keyword is a function keyword.

```
Assign StepOutFade Exec 28
StepOutFade 50 Exec 3
```

### Swop

The Swop keyword temporary overrides the master level of executors to full and set all other master levels to zero.

```
Swop /?
Swop Executor 1
Swop Off Executor 1
```

### SwopGo

The SwopGo keyword temporary overrides the master level of executors to full and all other master levels to zero, and goes to the next cue.

```
SwopGo /?
```

### SwopOn

The SwopOn keyword temporary overrides the master level of executors to full and all other master levels to zero.

```
SwopOn /?
SwopOn Executor 1
SwopOn Off Executor 1
```

### TempFader

The TempFader keyword, is a function that crossfades the cue on when pulled up, and crossfades the cue off when pulled down.

```
Assign TempFader Exec 28
TempFader 50
```

### Thru

You can also type Thru in the command line or use the shortcut T.

```
Delete Cue 3 Thru
Off Thru
```

### ToFull

ToFull is a function keyword.

```
ToFull Executor 1
ToFull SpecialMaster "grandmaster" . "grand"
ToFull SpecialMaster 2.1
ToFull Executor 1 / cm = A
```

### Toggle

You can also type Toggle in the command line or use the shortcut Tog

```
Toggle /?
Toggle Executor 4
Toggle Sequence 1
```

### ToZero

ToZero is a function keyword.

```
ToZero Executor 1
ToZero SpecialMaster "grandmaster" . "grand"
ToZero SpecialMaster 2.1
ToZero Executor 1 / cm = A
```

### Unblock

Unblock is a function keyword.

```
Unblock Cue 3 If Fixture 1 If Feature "Position"
```

### Unlock

The Unlock keyword is a function keyword.

```
Unlock Cue 3
```

### Update

Update is a function keyword.

```
Update /?
Update
Update Cue 4 /originalcontent /cueonly
Update Preset 4.2 /global /keepactive=true /noconfirm
```

### UpdateFirmware

With the UpdateFirmware keyword, you update the firmware of the hardware components at the console.

```
UpdateFirmware
```

### UpdateSoftware

The UpdateSoftware keyword is a function keyword.

```
UpdateSoftware 192.168.0.32
```

### Version

The version keyword is a function keyword.

```
Version
```

### ViewButton

The ViewButton keyword calls the assigned function on the view button. The call function works only if the assigned object supports a call.

```
Delete ViewButton 4
Label ViewButton 2.5 "Layout"
Store ViewButton 11.1
```

### WebRemoteProgOnly

The WebRemoteProgOnly is a function keyword.

```
WebRemoteProgOnly
```

### Selection List

A selection list is a list of fixtures.

```
Fixture 3 + Channel 6
Cue Thru 3 - Channel 4
Group 3 + Cue 4
```

### Attribute List

An attribute list is an object list of attributes.

```
On Feature "GOBO1"
Off Attribute 8.1.1 Thru 4
```

### Station List

[IP-address]

```
SetIP ethO 192.168.0.101
Shutdown 1 Thru 4
```

### What is the Programmer

The programmer is where all the active and nonactive values, which are not in the playbacks, are located.

```
Off Fixture 1 Thru 10
```

### Storing cues

If the store operation is used to store into already existing cues then a pop-up like this appears:

```
store cue 2 + 4 "BO Scene 1"
store cue "BO*" /merge /cueonly
Store Cue 1.2 Executor 1.4
Store Sequence 8 Cue 20 /overwrite
S Seq 8 Cu 20 /o
Store Cue 20 Sequence 8 /overwrite
Store Cue 42 "Return of the Paranoid Android" /merge /use=Look
```

### Cue timings

A Rate fader is used to modulate or dynamically adjust the stored times. It does not change the stored times, it simply adjust the time to be faster or slower.

```
Rate 1
```

### Playing back Cues

Any command related to playing back the cues can be used with the executor.

```
Goto Cue 4 Executor 8
Goto Cue 4 Executor 1.8 Fade 5
Goto Cue 4 Sequence 8
```

### What is Tracking

Release First Step controls what should happen with tracked values. They can track from the last cue to the first (Release First Step Off) or any tracked values can be released when the sequence is started from the top (Release First Step On).

```
Unblock Sequence 9
```

### Working with MIB

This topic is about some of the details concerning MIB (Move In Black). The What is MIB topic might be a good place to start if MIB is new to you.

```
Assign Cue /MIB=late
Assign Cue 101 /MIB=99
Assign Cue 1 Thru 10 / MIB=Off
Assign Cue 15  / MIB=-4
```

### Search

Search can be used to find almost anything in a show file.

```
Search Preset 1.2 If Sequence 6
```

### Welcome to the Quick Start Guide

In the following chapters we are going to have a guided look at some of the most used functions in the grandMA2.

```
Store cue 1
```

### Storing the first cue

It is time to make the first cue.

```
Label seq 1 "Main Show"
```

### Create more cue

Let us make some more cues. Press:  2 0 + 2 8 At 8 0 Store Cue 2 Time 1 5 Please. That created cue 2 with a fade time of 15 seconds. Let us continue with cue 3. Now we are going to use the groups and the command line.

```
g 1 + 2 at 75
g 3 t 5 at 60
```

### Console - VPU Pixel Mapper View

A visual representation of the Pixel Mapper editor of the VPU is implemented in the grandMA2 console:

```
store PM 1.2 /axis=+X+Z
copy PM 1.1 at 1.2 /merge
```
