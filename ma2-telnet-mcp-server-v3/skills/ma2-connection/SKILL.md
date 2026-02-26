---
name: ma2-connection
version: 1.1.0
---

# SK-01 — Connection & Session Management

## ⚠️ CRITICAL: Record Macro is NOT telnet-compatible
Record Macro N Please → enters hardware key-recording mode on the console.
The console then waits for physical hardware key presses to populate the macro.
Via Telnet: the command executes, recording mode starts, but NO subsequent
telnet commands are recorded — the console is waiting for physical input.
Result: macro creation silently fails or console becomes temporarily unresponsive.
NEVER use Record Macro from a telnet agent session.

## Connection Workflow
- TCP connect port 30000
- Dual-prompt login
- CRLF termination
- ANSI stripping
- Prompt detection
- Auto-reconnect
- Command queue serialisation

## Environment Variables
MA2_HOST / MA2_PORT / MA2_USERNAME / MA2_PASSWORD

## Recovery
If connection is lost or console enters recording mode, physical operator must press Please or Escape on the console to recover.

## Command Examples

Reference commands attributed to this skill from the grandMA2 help documentation.

### DisconnectStation

DisconnectStation is a function used to throw stations out of your session.

```
DisconnectStation /?
​DisconnectStation 192.168.0.10
​DisconnectStation 10
​DisconnectStation Thru
```

### DropControl

DropControl is used if multiple users are in a session.

```
DropControl
```

### EndSession

EndSession is a function keyword to end a session for all session members. The EndSession keyword disconnects all linked devices in the session. It is not possible to join an ended session again.

```
EndSession /?
EndSession
EndSession /noconfirm
```

### InviteStation

InviteStation is a function keyword to bring other stations into the session.

```
InviteStation 192.168.0.10
InviteStation 10
InviteStation Thru
```

### JoinSession

JoinSession is a function used to join or create a session. If no option is given the recent entered settings in the MA Network Control will be used.

```
JoinSession /?
JoinSession 1 "FOH" /pw = "1235"
```

### LeaveSession

The LeaveSession keyword is a function keyword to leave the current session.

```
LeaveSession
```

### Login

The Login keyword is a function keyword to login another user.

```
Login "Jimmy Page" "mac"
```

### Logout

The logout keyword is a function keyword to logout the current user and change to the guest user.

```
Logout
```

### NetworkInfo

The NetworkInfo keyword is a function keyword to display information about the network in the command line feedback window.

```
NetworkInfo /?
NetworkInfo
```

### NetworkNodeInfo

The NetworkNodeInfo keyword displays all in the network available MA Nodes in the command line feedback window.

```
NetworkNodeInfo
```

### NetworkNodeUpdate

NetworkNodeUpdate is a function keyword used for the update of the following MA Nodes:

```
NetworkNodeUpdate
```

### NetworkSpeedTest

The NetworkSpeedTest keyword checks the current network performance in the network of the following MA devices in the session:

```
NetworkSpeedTest /?
NetworkSpeedTest
```

### Reboot

The Reboot keyword is a function keyword.

```
Reboot /?
Reboot
Reboot 192.168.0.32
```

### Restart

The Restart keyword is a function keyword.

```
Restart /?
Restart
Restart 192.168.0.32
```

### SetHostname

The SetHostname keyword is a function keyword.

```
SetHostname "grandMA2"
```

### SetIP

To execute keyword SetIP type SetIP into the command line.

```
SetIP /?
SetIP eth0 192.168.0.5
SetIP eth0 /DHCP
SetIP eth1 2.0.0.10 /mask=255.0.0.0
SetIP
```

### SetNetworkSpeed

The SetNetworkSpeed keyword is a function keyword.

```
SetNetworkSpeed 100 192.168.0.32
```

### Shutdown

The shutdown keyword switches the grandMA2 console off or close the grandMA2 onPC.

```
Shutdown /?
Shutdown 192.168.0.10
Shutdown 10
Shutdown
```

### TakeControl

TakeControl is a keyword used if multiple users are in a session.

```
TakeControl Fixture 1 Thru 10
```

### Telnet

The Telnet keyword is a function keyword.

```
Telnet 192.168.0.1 : 23 "Artist1"
```

### Login on a station

The main way to login using the GUI is to press the Tools key and the Login button. This will open this pop-up on all screens:

```
login administrator admin
```

### Shut Down the System

For more information on the location of the power key and the power switch see grandMA2 console.

```
Shutdown "IP Address"
```
