---
name: ma2-effects
version: 1.1.0
---

# SK-09 — Effects & MAtricks

## Effect Management
- EffectBPM, EffectHZ, EffectHigh, EffectLow, EffectForm, EffectPhase
- Effect pool store/assign
- MAtricks interleave/wings

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### Effect

The key Effect is located on the right of the key View.

```
Effect
Form
Move Effect 1 At 37
SelFix Effect 1
```

### Helping Keywords

Helping keywords are used to create a relation between functions and objects.

```
Delete Effect 4 Thru 6
```

### Edit

Edit is a function keyword and it is used to modify values.

```
Edit Effect 2
```

### EffectAttack

EffectAttack is a helping keyword used to indicate individual EffectAttack of a pulse width modulation form.

```
EffectAttack
Off EffectAttack
EffectAttack 50
Attribute "pan" At EffectAttack 50
```

### EffectBPM

EffectBPM is a helping keyword to indicate individual effect speed in BPM (= beats per minute).

```
EffectBPM
Off EffectBPM
EffectBPM 120
Attribute "pan" At EffectBPM 90
```

### EffectDecay

EffectDecay is a helping keyword to indicate individual EffectDecay of a pulse width modulation form.

```
EffectDecay
Off EffectDecay
EffectDecay 50
Attribute "pan" At EffectDecay 50
```

### EffectDelay

EffectDelay is a helping keyword to indicate individual effect delay times.

```
EffectDelay
Off EffectDelay
EffectDelay 4
Attribute "pan" At EffectDelay 2
```

### EffectFade

EffectFade is a helping keyword to indicate individual effect fade times.

```
EffectFade
Off EffectFade
EffectFade 4
Attribute "pan" At EffectFade 2
```

### EffectForm

EffectForm is a helping keyword to indicate individual effect form values.

```
EffectForm
Off EffectForm
EffectForm 6
Attribute "pan" At EffectForm 6
```

### EffectHigh

EffectHigh is a helping keyword to indicate individual effect high values.

```
EffectHigh
Off EffectHigh
EffectHigh 80
Attribute "pan" At EffectHigh 20
```

### EffectHZ

EffectHZ is a helping keyword to indicate individual effect speed in Hertz.

```
EffectHZ
Off EffectHZ
EffectHZ 4
Attribute "pan" At EffectHZ 2
```

### EffectID

EffectID is a helping keyword to indicate the EffectID layer.

```
EffectID
Off EffectID
```

### EffectLow

EffectLow is a helping keyword used to indicate individual effect low values.

```
EffectLow
Off EffectLow
EffectLow 20
Attribute "pan" At EffectLow -20
```

### EffectPhase

EffectPhase is a helping keyword to indicate individual effect phases.

```
EffectPhase
Off EffectPhase
EffectPhase 180
Attribute "pan" At EffectPhase 180
```

### EffectSec

EffectSec is a helping keyword to indicate individual effect speed in seconds.

```
EffectSec
Off EffectSec
EffectSec 2
Attribute "pan" At EffectSec 4
```

### EffectSpeedGroup

EffectSpeedGroup calls the effect layer Speed Group.

```
EffectSpeedGroup
```

### EffectWidth

EffectWidth is a helping keyword to indicate individual EffectWidth.

```
EffectWidth
Off EffectWidth
EffectWidth 50
Attribute "pan" At EffectWidth 50
```

### Interleave

Interleave is used to set ranges in the MAtricks or to create a virtual array of the fixtures selected.

```
Interleave 10
```

### Layer

Layer is a function keyword to change the working layer of the attribute encoders.

```
Layer EffectForm
```

### ListEffectLibrary

The ListEffectLibrary is a function keyword to displays the .xml files in effects folder of the selected drive in the command line feedback window.

```
ListEffectLibrary "My*"
```

### MAtricks

The MAtricks keyword acts as an object type and as a mode.

```
Store MAtricks 2
MAtricks 3
Matricks Off
Fixture 1 Thru 10
```

### MAtricksBlocks

MAtricksBlocks is a function to set the MAtricks Blocks values.

```
MatricksBlocks  2
MatricksBlocks  2.3
```

### MAtricksFilter

MatricksFilter is a function keyword to set the Matricks filter values.

```
MF  2
MatricksFilter  "OddID"
```

### MAtricksGroups

MAtricksGroups is a function keyword to set the Align Groups.

```
MAtricksGroups  4
MAtricksGroups  6.3
```

### MAtricksInterleave

MatricksInterleave is a function keyword to create a virtual array of the fixture selection.

```
MatricksInterleave 1.2
MatricksInterleave +
```

### MAtricksReset

The MAtricksReset is a function keyword to turn off all active MAtricks settings.

```
MatricksReset
```

### MAtricksWings

MAtricksWings is a function keyword to set the MAtricks Wings value.

```
MatricksWings 2
```

### NextRow

NextRow is a function keyword to increase the MAtricks property single y.

```
MatricksInterleave 4
```

### RemoveIndividuals

To get the RemoveIndividuals keyword in the command line, type RemoveIndividuals or the shortcut Removei in the command line.

```
RemoveIndividuals Effect 1 Thru 10
RemoveIndividuals Effect 1.11.2  /nc
```

### SelFix

SelFix is a function keyword.

```
SelFix Effect 3
```

### SyncEffects

You can also type SyncEffects in the command line or use the shortcut Sy.

```
SyncEffects
```

### MAtricks Toolbar

Use the MAtricks toolbar to control the MAtricks.

```
At 10 Thru 100
```

### MAtricks Interleave

This topic illustrates how to use MAtricksInterleave based on an example.

```
MAtricksInterleave 4
```

### MAtricks Blocks

For information on the keyword see MAtricksBlocks.

```
MAtricksBlocks 3
MAtricksBlocks 3.2
```

### MAtricks Wings

This topic illustrates how to use the wings in the MAtricks with the help of an example.

```
MAtricksWings 2
MAtricksWings 3
```

### MAtricks Groups

This topic illustrates how to use MAtricksGroups based on an example.

```
At 0 Thru 100
MAtricksGroups 4
MAtricksGroups 1.3
```

### Use Predefined Effects

The simplest way to use effects in the grandMA2 is to work with predefined effects.

```
Edit Effect 1
```

### Delete Effects

Delete single, several or all effects.

```
Delete Effect "number"
Delete Effect "number" Thru "number"
Delete Effect 1 Thru
```
