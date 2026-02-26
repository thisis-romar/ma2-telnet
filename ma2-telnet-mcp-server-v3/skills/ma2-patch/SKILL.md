---
name: ma2-patch
version: 1.1.0
---


# SK-04 — Fixture Patching, DMX, and Bulk Operations


## Fixture/Channel ID and FixtureType Assignment
- `Assign Dmx x.yyy At Fixture z`
- `Assign FixtureType 101 At Fixture 201` (assigns a FixtureType to a Fixture)
- Live-patch vs EditSetup distinction
- Multipatching
- RdmSetPatch
- DMX tester
- universe.address notation


### Bulk Patch Automation
For large patch operations, use loops or macro automation to assign many fixtures/channels:
```
Assign Channel 111 At Dmx 1.001 /noconfirm
Assign Fixture 101 At Dmx 1.001 /noconfirm
... (repeat for all fixtures)
```


### Group Creation (Bulk)
Automate group creation for fixtures/channels:
```
Channel 111 ; Store Group "Flare" /merge
Fixture 101 ; Store Group "Flare" /merge
... (repeat for all)
```

### Macro Automation Pattern
For complex patching/grouping, use macro automation (see ma2-export-import for import/export and macro creation patterns).

## Safety
- EditSetup pauses DMX output and triggers show upload
- Use live-patch for in-show changes

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### ChannelFader

ChannelFader is an object type representing a fader of the ChannelPages.

```
​Assign Fixture 301 At ChannelFader 5
​Assign Channel 201 Thru 215 At ChannelFader 2.1
​Assign Fixture 3.2.1 At ChannelFader 2.11
```

### ChannelLink

ChannelLink is a function used to toggle the Channel faders to dynamic mode.

```
​ChannelLink
​ChannelLink PresetType "Position"
​ChannelLink Attribute "Iris" + "Focus"
```

### ChannelPage

ChannelPage is an object type representing a page of channel faders.

```
​ChannelPage 5
​ChannelPage +
​Delete ChannelPage 2
```

### RdmAutomatch

RdmAutomatch is a function keyword.

```
RdmAutomatch
RdmAutomatch Group 1
RdmAutomatch Group 1 If Sequence 2
```

### RdmAutopatch

RdmAutopatch is a function keyword.

```
RdmAutopatch
RdmAutopatch Group 1
RdmAutopatch Group 1 If Sequence 2
```

### RdmFixtureType

The RdmFixtureType is an object keyword to access Rdm fixtures with a Rdm fixture type ID.

```
RdmAutomatch RdmFixtureType 1
RdmUmatch RdmFixtureType 1
```

### RdmInfo

The RdmInfo keyword is a function keyword.

```
RDMInfo Fixture 3
RDMInfo Fixture 3/screen = 3
```

### RdmList

The RdmList keyword is a function keyword.

```
RdmList /?
RdmList Fixture 3
RdmList Fixture 3 / filename = "RDM Fixture 3"
```

### RdmSetParameter

The RdmSetParameter keyword is a function keyword.

```
RdmSetParameter /?
RdmSetParameter dmx_start_address 3 / UID =  43500F019FCB
RdmSetParameter display_invert 1
```

### RdmSetpatch

The RdmSetPatch keyword is a function keyword.

```
RdmSetPatch /?
RdmSetPatch 25
RdmSetPatch 25 / multipatch = 5
RdmSetPatch 25 / UID = 43500F019FCB
```

### RdmUnmatch

The RdmUnmatch keyword is a function keyword.

```
RdmUnmatch
RdmUnmatch Group 1
RdmUnmatch Group 1 If Sequence 2
```

### Multipatching

Multipatching is a function to add extra fixtures to a Fixture ID or Channel ID.

```
Assign [DMX-list] At Fixture [Fixture ID]
Assign DMX 2.1 At Fixture 101
Assign DMX 3.1 Thru 3.5 Fixture 201
as dmx 3.1 t 3.5 f 201
```

### Live patching

So, the thing that does not concern the fixture structure, can be changed without giving a show upload, this is called "Live editing/patching".

```
Assign Fixture [Fixture-list] At DMX [DMX-address]
Assign Fixture 101 At DMX 2.1
Assign Fixture 101 + 103 + 105 DMX 5.61
```
