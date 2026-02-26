---
name: ma2-commands
version: 1.1.0
---

# SK-02 — Command Syntax & Keywords

## Command Syntax
- Full keyword taxonomy
- Abbreviation rules
- Quotation semantics
- Range syntax (Thru, +, -)
- Echo parsing

## Reference
- functionKeywords.ts (314 entries)

## Examples
- Store Group 1
- Group 1 Thru 10
- Assign DMX 1.1 Thru 1.10 At Fixture 1 Thru 10
- Macro 10 Please

## Tool Selection
- Use skills/ma2-connection/SKILL.md for connection work
- Use skills/ma2-export-import/SKILL.md for export/import/macros

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### . [Dot]

The key . is located in the command area on the left of the key If.

```
Default
```

### Assign

The key Assign is located in the command area on the right of the key Prvw.

```
Label
Appearance
Assign /?
​Assign Dmx 2.101 At Channel 5
​Assign User JohnDoe /password=qwerty
```

### At

The key At is located in the command area on the right of the key If.

```
At
Stomp
Extract
At /?
​At 75
Fixture 2 At Fixture 3
Attribute "Pan" At 20
```

### Channel

The key Channel is located on the left of the key Fixture.

```
Channel
Dmx
DmxUniverse
​Channel 34
​Channel 11.5
​Channel 11
```

### Copy

The key Copy is located in the command area below the key Del.

```
Copy
Copy /?
Copy 2 At 6
```

### Del (Delete)

The key Del (= Delete) is located in the command area on the right of the key Goto.

```
Delete
Remove
```

### Fix

The key Fix is located in the command area on the left of the key Select.

```
Fix
```

### Fixture

The key Fixture is located in the command area on the right of the key Channel.

```
Fixture
FixtureType
Fixture 34
Fixture 11.5
Fixture 11
```

### Help

The key Help is located on the right of the key Backup.

```
Help
CmdHelp
Help Fixture
```

### If

The key If is located in the command area on the left of the key At.

```
IfOutput
IfActive
IfProg
If
```

### List

The key List is located in the command area on the left of the key Store.

```
List
List /?
List Attribute
```

### Move

The key Move is located in the command area on the right of the key Group.

```
Move
Replace
Insert
Search
```

### Select

The key Select is located in the command area on the left of the key Off.

```
Select
SelFix
Select Layout 2
```

### Store

The key Store is located in the command area on the left of the key

```
Store
Store /?
Store 7
```

### Thru

The key Thru is located in the command area on the right of the number key 6 in the number pad.

```
Channel Thru
Fixture Thru
Fixture 3 Thru 6
Fixture Thru 10
```

### Time

The key Time is located in the command area on the left of the key Esc.

```
Store SnapPercent
```

### View

The key View is located in the command area on the left of the key Effect.

```
View
Screen
View 2
View 5 /screen = 2
Store View 5 /screen = 234
Assign View 2/name = "Stage Extern"
```

### Object Keywords

Object keywords are used to allocate objects in your show file.

```
Store Fixture 3
```

### - [Minus]

- [Minus] is a helping keyword with various functions.

```
At - 10
- 5 Thru 7
```

### + [Plus]

+ [Plus] is a helping keyword with various functions.

```
At + 5
+ 5 Thru 7
```

### Agenda

Agenda is an object type which holds scheduled tasks to be executed at specific dates and times.

```
Agenda /?
```

### Align

Align is a function keyword to change the mode of the attribute encoders.

```
Align "<"
Align 0
```

### All

All is a function used to set the MAtricks property Single X to none (0), which means to reselect all fixtures, (or reselect all columns of fixtures, if Interleave is active).

```
All
```

### AllRows

AllRows is a function used to set the MAtricks property Single Y to none (0), which means to reselect all rows of fixtures in a virtual array created with MAtricksInterleave.

```
AllRows
```

### Appearance

You can change the frame color of pool objects and the background color of cues with the Appearance keyword.

```
Appearance /?
```

### Asterisk *

To get the Asterisk * in the command line press and hold Shift + 8.

```
Fixture backt*blue
```

### Attribute

Attribute is an object type used as reference attributes of a fixture.

```
​Attribute "pan" At 120
Feature 3.1
Feature $feature.1 At + 1
```

### AutoCreate

The keyword AutoCreate automatically creates preset objects.

```
AutoCreate /?
```

### Block

Block is a function used to add data to prevent tracking. Tracking values (magenta colored) are converted to stored values (white colored).

```
Block /?
​Block
```

### Camera

To enter this keyword into the console, type Camera or the shortcut Cam into the command line.

```
Select Camera 1
```

### Chat

The keyword Chat generates an information message in the message center.

```
Chat "text"
```

### CircularCopy

CircularCopy is a function used to move attribute values within your current selection.

```
​CircularCopy 1
​CircularCopy -2
```

### Clear

Clear is a function used to clear selection, active values or programmer.

```
​Clear
```

### CmdHelp

CmdHelp is a function used to list all keywords in the response window of the command line.

```
​CmdHelp
​CmdHelp f*
```

### Default

You can also type Default or the shortcut D into the command line.

```
Fixture 1 Default
```

### Delete

Delete is a function used to remove data from the show file.

```
Delete /?
Delete 7
Delete Messages
Delete World 6
Delete Fixture 4
```

### Dmx

Dmx is an object type representing the DMX outputs of the console.

```
​Dmx 2.101
Dmx 513 At 100
​Assign Dmx 1.101 At Fixture 2 /break=1
```

### DmxUniverse

DmxUniverse is an object type representing the DMX universes of the console.

```
​Unpark DmxUniverse 1 Thru 4
​Delete DmxUniverse 2
​Edit DmxUniverse 3
Move DmxUniverse 2 at 12
```

### Dot . Character

To get the . dot in the command line, press  . .

```
Attribute "Pan" At 50.5
```

### Down

Down is a function keyword.

```
Down
```

### Edit

Edit is a function keyword and it is used to modify values.

```
Edit /?
Edit
```

### Exit

Exit disconnects the connection to Telnet.

```
Exit
```

### Feature

Feature is an object keyword representing features of a fixture.

```
Feature 2
List feature
Feature "Gobo1"
Feature $feature.2
```

### Filter

To execute the keyword Filter in the command line press Group Group Group (= Filter).

```
Filter 4
Select Filter 5
```

### Flip

Flip is a function keyword to access the different pan/tilt combinations that points a moving head in the same direction.

```
Flip
```

### Form

Form is an object type with shapes used for dynamic effects.

```
At Form 10
```

### Full

Another way is to type Full or the shortcut Fu directly in the command line.

```
Channel 53 Full
```

### FullHighlight

Fullhighlight takes all highlight values of the fixtures that are currently selected into the programmer.

```
Fullhighlight
```

### Gel

Another way is to type Gel or the shortcut Ge into the command line.

```
At Gel "Lee"."Mauve"
At Gel "Lee". "126"
At Gel 7.44
```

### IfOutput

IfOutput is a function keyword to select fixtures based on their current output.

```
IfOutput At 50 Thru 75
```

### Image

The keyword Image is an object keyword. It is used to handle images via command line.

```
At Image 16
Delete Image 14
```

### Invert

To enter the Invert keyword into the command line, type Invert or the shortcut Inv into the command line.

```
Invert Fixture 1 Thru 6
```

### Item3D

Item3D is an object keyword used to modify 3D objects in grandMA 3D.

```
Delete Item3D Thru
```

### Label

Label is a function used to give names to objects.

```
Label Fixture 1 Thru 10 "Mac700 1"
```

### Layer

Layer is a function keyword to change the working layer of the attribute encoders.

```
Layer 3
```

### Layout

You can also type Layout or the shortcut Lay in the command line.

```
Layout 3
Store Layout 5
At Layout 1
```

### ListLibrary

The ListLirbrary keyword is a function keyword to display the fixture type library in the command line feedback window.

```
ListLibrary "Martin*"
```

### ListOops

The ListOops keyword is a function keyword to get the Oops list in the command line feedback window displayed.

```
ListOops
```

### ListOwner

ListOwner is used as a troubleshooting keyword in case of a multi user access conflict. If a multi user access conflict occurs, execute the ListOwner keyword. The ListOwner keyword lists the users currently editing the same in a session and hence causing the conflict.

```
ListOwner
```

### Lua

This keyword is used to execute commands written in the script language Lua.

```
Lua "gma.feedback('hello world')"
```

### Mask

To execute the keyword Mask press and hold

```
Mask 3
Mask "My Mask"
```

### MediaServer

The keyword MediaServer is an object keyword and is used in connection with CITP.

```
List MediaServer Thru
```

### Menu

With the Menu keyword you can open and close menus. If the Menu keyword is used without an On or Off keyword, it toggles.

```
Menu /?
Menu "setup"
Menu /list
```

### Message

The Message keyword is a function keyword to create Messages in the system monitor.

```
Message "test marker 1"
```

### Messages

With the Messages keyword you can

```
List Messages /cnd = "type = 'alert'"
```

### MidiProgram

The MidiProgram keyword is a function keyword to transmit MIDI program change messages via the MidiOut port.

```
MidiProgram 12
```

### Model

The Model keyword is an object keyword to access 3D models.

```
List Model
Assign Model 2 At Item3d 10
```

### Move3D

Move3D is a function keyword.

```
Move3D At 2.5 -5 3.3
```

### NextRow

NextRow is a function keyword to increase the MAtricks property single y.

```
NextRow
```

### Oops

The Oops keyword is a function keyword to undo the last:

```
Oops /?
Oops
```

### Park

The Park keyword is a function keyword to lock DMX output values of attributes. You can also lock DMX output values of a fixture selection, or group of attributes for the current selection.

```
Park Fixture 5
Park Attribute "pan"
Park Channel 1 Thru 5 At 100
Park DMX 1.2
```

### Paste

The Paste keyword is a function keyword.

```
Copy 5
Paste 15
```

### Plugin

The Plugin keyword is an object keyword to access Plugins. The default function for the Plugin keyword is Go+.

```
Plugin 2
```

### PMArea

The PMArea keyword is an object keyword to access pixel mapper areas and pixel mapper outputs. You can store, copy, and delete pixel mapper setups. For more information, see MA VPU pixel mapper.

```
PMArea /?
Assign PMArea 1 /name="Sunstrips"
```

### Previous

You can also type Previous in the command line or use the shortcut Previo.

```
Previous
```

### PrevRow

The PrevRow keyword is a function keyword.

```
PrevRow
```

### Protocol

The Protocol keyword is an object keyword to access the network protocols.

```
Assign Protocol 1.1 /mode=outputauto /localstart=10 /amount=1 /network=1 /subnet=0 /universe=9
```

### Remote

The Remote keyword is an object keyword to access the remote input types.

```
Store Remote 3.1
```

### RemoteCommand

RemoteCommand is a function keyword.

```
RemoteCommand 192.168.0.4 "View 3"
```

### Replace

The replace keyword is a function keyword.

```
Replace Attribute "Pan" At - 270 Thru 270 With - 260 Thru 280
Replace Fixture 2 with 3
Replace Fixture 1 with 2
Replace Fixture 3 with 1
Replace Fixture 1 With
Replace Fixture 1 With Fixture 2
Replace Fixture 1
Replace At 50 With 55
Replace Fixture 1 Thru 10 Attribute "Pan" At -270 Thru 270 With -200 Thru 200
Replace Fixture 1 Thru 10 Attribute "Pan" At -270 Thru 270 With -250 Thru 290
```

### Root

The Root keyword access the root in the object tree.

```
ChangeDest Root DMX_Protocols.Art-Net
```

### Rotate3D

Rotate3D is a function keyword.

```
Rotate3D At 2.5 -5 3.3
```

### Screen

You can also type Screen or the shortcut Scr in the command line .

```
Delete Screen 2
Assign Mask 5 Screen 2.3
```

### Search

The Search keyword is a function keyword.

```
Search Fixture 1 Thru 10
Search Value 100
```

### SearchResult

The SearchResult keyword is a function keyword.

```
SearchResult
SelFix SearchResult
Search Fixture Thru Attribute "G" At 20 If SearchResult
```

### Setup

The Setup keyword is a function keyword.

```
Setup
```

### ShuffleValues

The ShuffleValues keyword is a function keyword.

```
ShuffleValues
```

### Stomp

You can also type Stomp in the command line or use the shortcut Stom.

```
Stomp 75
Fixture 2 Stomp 0
```

### Surface

The Surface keyword, loads a created surface form the Wing & Monitor Setup.

```
Surface 2
```

### Tools

The Tools keyword is a function keyword.

```
Tools
```

### Unblock

Unblock is a function keyword.

```
Unblock
Unblock Sequ 1 /dv
```

### Unlock

The Unlock keyword is a function keyword.

```
Unlock World 3
```

### Unpark

You can also type Unpark in the command line or use the shortcut Unp.

```
Unpark DMX 1.1 Thru 1.10
Unpark DmxUnivers Thru
Unpark Fixture 2
```

### Up

The Up keyword is a function keyword.

```
Up
```

### User

To use to the User keyword, type User the shortcut Us in the command line.

```
List User 1
List User
```

### UserProfile

The keyword UserProfile displays the user profiles in the command line feedback.

```
List UserProfile
List UserProfile 1
Assign UserProfile 2 At World 1
Assign World 1 UserProfile 2
Assign UserProfile 2/World=1
```

### Value

With the value keyword you can:

```
Search Value 50
Replace Channel 1 Thru 10 Value 50 With 60
Value
```

### With

The With keyword is a helping keyword.

```
Replace At 50 With 55 If Programmer
```

### World

The world keyword call worlds along with its filter, and limit the access to the parameters in the word.
World 1 is fixed by default and includes all parameters (fixtures and attributes) in the show.

```
World 4
Label World 4 "All Fixtures"
```

### Zero

This keyword is a helping keyword.

```
Zero
Fixture 1 Thru 10 Zero
```

### Object List

An object list is a list of objects of the same type.

```
Fixture Thru 3
Delete 3 Thru
Channel 1 Channel 5
```

### Create user profiles and users

This menu offers a lot of information and some possibilities. But the main purpose of this menu is to create Users and User Profiles.

```
Assign World 4 UserProfile 3
```

### Channel Sheet and Fixture Sheet

Channel sheet and fixture sheet share identical layers.

```
Channel 1 At Full
Channel 2 At 55
```

### What is the Programmer

The programmer is where all the active and nonactive values, which are not in the playbacks, are located.

```
Fixture 1 Thru 10 Full
```

### Image Pool

The grandMA2 has an image pool with predefined images, which cannot be edited.

```
Lock Image 14
```
