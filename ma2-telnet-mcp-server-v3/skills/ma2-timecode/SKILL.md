---
name: ma2-timecode
version: 1.1.0
---

# SK-11 — Timecode & Timer

## Timecode Management
- Timecode slot assignment
- trig type Timecode
- SMPTE/MIDI TC sources
- Timer keywords
- Goto vs Go in TC recording

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### Timecode

You can also type Timecode in the command line or use the shortcut TC.

```
Store Timecode 2
Record Timecode 2
Go Timecode 2
Top Timecode 2
Label Timecode 2
Assign Timecode 1/Slot = 3
```

### TimecodeSlot

TimecodeSlot is an object type representing the 8 different possible timecode streams.

```
TimecodeSlot 3
```

### Timer

With the Timer keyword you can edit, start, pause, restart, switch off, select, lock, unlock, and assign timers.

```
Edit Timer 4
Assign Timer 4 /countdowntime = 20
```

### Playing Back a Timecode Show

The timecode shows can be controlled using the Timecode Encoder Toolbar or by the command line.

```
Go Timecode 3 Time 3h30m
<<< Timecode 4
Go TimecodeSlot 1
```
