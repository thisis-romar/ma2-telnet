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

## Import Examples
  Import "mymacros.xml"                  (appends after last Macro ID)
  Import "mymacros.xml" At Macro 20      (import at specific pool position)
  Import "Front_groups.xml" At Group 50  (targeted placement)
  SelectDrive 4 / Import "groups.xml" / SelectDrive 1   (from USB)

## ⚠️ CRITICAL RESTRICTION: FixtureType Import
  Importing FixtureTypes is ONLY allowed inside EditSetup context.
  Attempting Import of FixtureType from normal command line will fail.
  Correct sequence:
    EditSetup                              (enter setup mode)
    Import "generic@dimmer@00"             (fixture type import)
    (exit setup via keyboard or command)

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
