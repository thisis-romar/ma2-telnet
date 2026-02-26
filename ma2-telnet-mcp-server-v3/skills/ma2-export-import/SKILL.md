---
name: ma2-export-import
description: grandMA2 object export/import, drive management, cross-show transfers
version: 1.0.0
---

# SK-12 — Export, Import & Drive Management

## Export Syntax
Export [Object-list] ["filename"] / [option] = [option value]
Shortcut: Exp

## Import Syntax
Import "filename" [At destination-object] / [option] = [option value]
Shortcut: Im

## Drive Management (MUST do before USB operations)
  SelectDrive       → lists all available drives with numbers
  SelectDrive 1     → internal console/onPC drive (default)
  SelectDrive 4     → first USB stick
  SelectDrive [n]   → use listed drive number
  sd                → shortcut for SelectDrive

## importexport Directory Paths
  Console hardware:  internal storage /importexport/
  grandMA2 onPC:     C:\ProgramData\MA Lighting Technologies\grandMA\gma2_V_3.x\importexport
  USB stick:         [drive root]\gma2\importexport

## Object Type → Folder Mapping
  Macro     →  importexport/Macro/
  Effect    →  importexport/Effect/
  Fixture   →  importexport/FixtureType/  (library folder)
  All others → importexport/ (root)

## Export Examples
  Export Group 1 Thru 4 "Front_groups"
  Export Macro 1 Thru 10 "mymacros"
  Export Sequence 5 "Main_show_seq"
  Export Preset 1 Thru 20 "color_presets"
  Export UserProfile "Designer" /Overwrite
  SelectDrive 4 / Export Group 1 "groups" / SelectDrive 1   (USB workflow)


## Automated Import Workflows

### General Import (Macros, Groups, etc.)
1. Ensure the file is in the correct importexport directory (see above).
2. (Optional) Select the correct drive:
  - `SelectDrive 1` (internal)
  - `SelectDrive 4` (USB)
3. Run the import command:
  - `Import "filename.xml"` (appends to pool)
  - `Import "filename.xml" At Macro 20` (import at specific pool position)

### FixtureType Import (Automated Sequence)
**FixtureType import requires EditSetup context.**

1. Enter EditSetup:
  - `EditSetup`
2. Import the FixtureType:
  - `Import "FixtureTypeFile.xml"`
  - (Optionally) `Import "FixtureTypeFile.xml" At FixtureType 101`
3. Exit EditSetup:
  - `Exit`

**Automated agents should always follow this sequence for FixtureType import.**

#### Example Automation (FixtureType):
```
EditSetup
Import "MyFixture.xml"
Exit
```

## Objects Supported for Export/Import (confirmed)

## Objects Supported for Export/Import (confirmed)
  Groups, Presets, Sequences (with cues), Macros, Effects,
  Layouts, Masks, MAtricks, UserProfiles, Remote MIDI/OSC configs,
  Images (to/from XML wrapper — not raw JPG/BMP)

## Objects NOT supported
  Full show file to other console manufacturers — MA2 format only
  Individual cues without parent sequence (export the sequence)

## /Overwrite Option
  Export "filename" /Overwrite — replaces existing file without prompt
  Useful for automated backup workflows via telnet agents

## Typical Agent Workflow — nightly macro export
  SelectDrive 1
  Export Macro 1 Thru 99 "nightly_macros_backup"
  SaveShow

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### Export

Export is a function keyword to transfer data from the show file to the libraries in the console.

```
Export /?
Export Macro 1 Thru 10 "MyMacros"
Export Effect 1
```

### Gel

Another way is to type Gel or the shortcut Ge into the command line.

```
Export Gel 7
```

### Import

Import is a function keyword to bring data from external .xml and .xmlp libraries into the show file.

```
Import /?
Import "MyCoolEffect" Effect 101
Import "MyMacro" At Macro 20 /path = "/data/ma/actual/gma2/importexport"
```

### Messages

With the Messages keyword you can

```
Export Messages /cnd="(type >= 'warning' or time <= '12:45:00') and !(new = 'true')"
```

### Profile

The Profile keyword is an object keyword to access DMX profiles and DMX profiles points. For more information, see DMX profiles.

```
Export Profile 1
```

### Root

The Root keyword access the root in the object tree.

```
Export Root LiveSetup.Layers
```

### SelectDrive

The SelectDrive keyword is a function keyword.

```
SelectDrive
SelectDrive 2; LoadShow "demo dimmer and more"
```

### Export by using command line

It is possible to use the Command Line to export all objects. For more information about the keyword and syntax, see the Export keyword topic.

```
Export Group 1  Thru 4 "Front_groups"
Export UserProfile "Designer" /Overwrite
SelectDrive 4
export preset 4 "Cyan"
```

### Import by using command line

It is possible to use the Command Line to import all objects. For more information about the keyword and syntax, see the Import keyword topic.

```
Import "Front Groups" At Group 20
```
