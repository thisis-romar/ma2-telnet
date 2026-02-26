---
name: ma2-backup
version: 1.1.0
---

# SK-03 — Show File & Backup Management

## Show File Management
- SaveShow, LoadShow, NewShow
- Show upload cycle (pauses DMX)
- PSR (Partial Show Read) for safe in-show merges
- Export/import of full show files

## Backup Automation
- Export Macro 1 Thru 99 "nightly_backup" /Overwrite
- Use SelectDrive for USB workflows

## Safety
- Never use EditSetup during a running show

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### Backup

The Backup keyword opens and close the Backup menu. For more information, see Using the Backup Menu.

```
Backup
```

### CrashLogCopy

CrashLogCopy is a function used to copy crash log files from the internal drive to USB flash drive.

```
​CrashLogCopy
```

### CrashLogDelete

CrashLogDelete is a function used to delete crash log files on the internal drive.

```
​CrashLogDelete
```

### CrashLogList

CrashLogList is a function used to list existing crash log files in command line response window.

```
​CrashLogList
```

### DeleteShow

DeleteShow is a function used to remove show files from hard drives.

```
DeleteShow /?
DeleteShow /backup
DeleteShow /b
DeleteShow /show
DeleteShow /s
```

### ListShows

The ListShows keyword is a function keyword to display the show files on the selected drive in the Command Line Feedback window.

```
ListShows
ListShows f*
```

### LoadShow

The LoadShow keyword is a function keyword.

```
LoadShow /?
LoadShow "Macbeth"
LoadShow "Macbeth" /full
```

### NewShow

The NewShow keyword is a function keyword to create new shows.

```
NewShow /?
NewShow "Macbeth"
NewShow "Macbeth" /full
```

### PSR

The PSR keyword is a function keyword.

```
PSR /?
PSR Sequence 1
PSR Sequence 1 If Channel 1 Thru 3
```

### PSRList

The PSRList keyword is a function keyword.

```
PSRList Sequence
```

### PSRPrepare

The PSPPrepare keyword is a function keyword.

```
PSRPrepare /?
PSRPrepare "demo dimmer and more.show.gz"
```

### SaveShow

The SaveShow keyword is a function keyword.

```
SaveShow "Macbeth"
SaveShow
```

### Using the Backup Menu

The Backup Menu can be opened by pressing the Backup key or using the dedicated command:

```
Menu "Backup"
```
