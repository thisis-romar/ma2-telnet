---
name: ma2-presets
version: 1.1.0
---

# SK-06 — Presets

## Preset Types
- Dimmer/Position/Color/Gobo/Beam/All/Universal
- Store/Update/Apply Preset
- List Preset introspection

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### Preset

The key Preset is located in the command area on the right of the key Macro.

```
Preset
Attribute
Gel
PresetType
Preset 5
At Preset 3.2
Preset *."DarkRed"
```

### Object Keywords

Object keywords are used to allocate objects in your show file.

```
Delete Preset "Red"
```

### Appearance

You can change the frame color of pool objects and the background color of cues with the Appearance keyword.

```
Appearance Preset 0.1 /h=0 /s=100 /br=50
​Appearance Preset 0.1 /r=100 /g=0 /b=0
```

### At

Following an object list that follows a function, At is a helping keyword for the starting function.

```
​PresetType 2 Thru 9 At Delay 2
```

### Attribute

Attribute is an object type used as reference attributes of a fixture.

```
​PresetType 3.2.1
```

### AutoCreate

The keyword AutoCreate automatically creates preset objects.

```
AutoCreate FixtureType 2. "PresetReferences"
```

### Cut

Cut is a function used to specify the source objects for a two-step move action.

```
Cut Preset 4.1
```

### Default

You can also type Default or the shortcut D into the command line.

```
Default PresetType "Position"
```

### Extract

Extract is a function that applies hard values in the programmer and breaks any referenced links.

```
At Preset "drummer"
Extract Preset "drummer"
```

### Feature

Feature is an object keyword representing features of a fixture.

```
PresetType "gobo".2
```

### FixtureType

To execute the keyword FixtureType press  and Fixture or type FixtureType or one of the shortcuts FT or FixtureT into the command line.

```
Clone FixtureType 2 at 3 if Preset "Color".*
```

### IfOutput

IfOutput is a function keyword to select fixtures based on their current output.

```
IfOutput Preset  "color"."Red"
```

### Label

Label is a function used to give names to objects.

```
Label Preset "color"."Red" "Dark Red"
```

### List

The List keyword is a function keyword.

```
List Preset "color"."m*"
List Preset 4. "m*"
```

### PresetType

You can also type PresetType, PresetT, or PT in the command line.

```
PresetType 3
PresetType "Dimmer"
PresetType 3.1
On PresetType "Color".2
PresetType $preset.2
PresetType 3.2.1
Store If PresetType Position If Selection
```

### Remove

You can also type Remove in the command line or use the shortcut Remov.

```
Remove PresetType "position"
Remove Fixture 1 If PresetType 1
```

### SelFix

SelFix is a function keyword.

```
SelFix Preset 1
```

### ShuffleValues

The ShuffleValues keyword is a function keyword.

```
ShuffleValues If PresetType "Position"
```

### Stomp

You can also type Stomp in the command line or use the shortcut Stom.

```
Stomp Preset "drummer"
```

### Store

Store is a function keyword.

```
Store Preset 1.3 /presetfilter=false /ka
```

### StoreLook

StoreLook is a function keyword.

```
StoreLook /?
StoreLook Executor 1
```

### Unpark

You can also type Unpark in the command line or use the shortcut Unp.

```
Unpark PresetType Dimmer
```

### With

The With keyword is a helping keyword.

```
Replace PresetType 1 At 50 With 55
```

### Preset Pool Options

Fixture 1 and fixture 101 have both the preset Dimmer.

```
Fixture 1 + Fixture 101 Please
```

### Delete Presets

It is possible to delete presets in three different ways. Use either the keys of the console or the command line.

```
Delete Preset 4.1 Thru 4.5
Delete Preset *.*
```

### Clone Presets

For more information on how to prepare cloning see Clone using screens.

```
Clone Fixture 1 At FixtureType 1.1 If Preset 2.4
```

### Search

Search can be used to find almost anything in a show file.

```
Search Attribute "Zoom" At 40 If Preset 0."*"
Search Preset 1.2
```

### Replace

The Replace mechanism is used to replace some objects with other objects (or values with other values), using the With keyword, and it might be limited to a defined scope using the If keyword.

```
Replace Preset 2.1 With Preset 2.4 If SearchResult
Replace Attribute "Dim" With Preset 1.5 If SearchResult
```
