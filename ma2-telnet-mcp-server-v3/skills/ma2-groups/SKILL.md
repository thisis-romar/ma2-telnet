---
name: ma2-groups
version: 1.1.0
---

# SK-05 — Groups & Fixture Selection

## Group Management
- Store Group N
- Group N selection
- If keyword for filtering
- Selection pool introspection via List Group

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### Group

The key Group is located in the command area on the right of the key Fixture.

```
Group
World
Filter
Layout
SearchResult
Mask
Group 3
```

### If

The key If is located in the command area on the left of the key At.

```
Store If Group 5 EndIf
If Group 5
Group 3 If Group 5
```

### - [Minus]

- [Minus] is a helping keyword with various functions.

```
Group 5 - Channel 2
```

### Asterisk *

To get the Asterisk * in the command line press and hold Shift + 8.

```
Group Mac*
```

### Assign

Assign is a function used to define relationships between objects or give values to properties.

```
Assign Group 1 Layout 1 /x=5 /y=2
```

### At

Following an object list that follows a function, At is a helping keyword for the starting function.

```
Copy Group 4 At 10
```

### Copy

Copy is a function used to create copies of an object.

```
Copy Group 1 At 5
Copy Group 1 Thru 3 At 11
Copy Group 2 At 6 Thru 8
```

### Delete

Delete is a function used to remove data from the show file.

```
Delete Group 3
```

### Flip

Flip is a function keyword to access the different pan/tilt combinations that points a moving head in the same direction.

```
Flip 2 Group 7
```

### IfActive

IfActive is a function keyword to select fixtures with active values in the programmer.

```
IfActive Group 5
```

### IfProg

IfProg is a function keyword to select fixtures with values in the programmer.

```
IfProg Group 5
```

### Insert

The Insert keyword is a function keyword to insert pool objects between two other already taken pool objects. The following pool objects will be moved to the next empty destination.

```
Insert Group 5 At 9
```

### Label

Label is a function used to give names to objects.

```
Label Group 3 "All Studiocolors"
```

### Layout

You can also type Layout or the shortcut Lay in the command line.

```
Assign Group 5 Layout 4
```

### List

The List keyword is a function keyword.

```
List Group Thru 10
```

### Move

The Move keyword is a function keyword to move objects and give them a new object ID.

```
Move Group 5 At 9
```

### Paste

The Paste keyword is a function keyword.

```
Cut Group 1
Paste Group 5
```

### Remote

The Remote keyword is an object keyword to access the remote input types.

```
Assign Remote 3.1 /dmx=5.1 /type=cmd /cmd="Group 1"
```
