# MA2 Telnet Command Validation Report

Generated: 2026-02-26T04:20:04.473Z

## Summary

| Status | Count |
|---|---|
| PASS | 145 |
| FAIL | 688 |
| SKIP | 73 |
| **Total** | **906** |

## Results by Skill

### ma2-backup

Pass: 0 | Fail: 5 | Skip: 21

**Failures:**

| Command | Error |
|---|---|
| `​CrashLogCopy` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​CrashLogDelete` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​CrashLogList` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListShows` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListShows f*` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-commands

Pass: 51 | Fail: 158 | Skip: 7

**Failures:**

| Command | Error |
|---|---|
| `Label` | Error #28: NO CUE SOURCE GIVEN |
| `Appearance` | Error #28: NO CUE SOURCE GIVEN |
| `Copy` | Error #28: NO CUE SOURCE GIVEN |
| `Delete` | Error #28: NO CUE SOURCE GIVEN |
| `If` | Error #72: COMMAND NOT EXECUTED |
| `Move` | Error #72: COMMAND NOT EXECUTED |
| `Store Fixture 3` | Error #72: COMMAND NOT EXECUTED |
| `At - 10` | Error #1: UNKNOWN COMMAND |
| `+ 5 Thru 7` | Error #1: UNKNOWN COMMAND |
| `Align "<"` | Error #1: UNKNOWN COMMAND |
| `Align 0` | Error #1: UNKNOWN COMMAND |
| `Fixture backt*blue` | Error #14: OBJECT DOES NOT EXIST |
| `​Assign Dmx 2.101 At Channel 5` | Error #72: COMMAND NOT EXECUTED |
| `​Assign User JohnDoe /password=qwerty` | Error #14: OBJECT DOES NOT EXIST |
| `AutoCreate /?` | Error #1: UNKNOWN COMMAND |
| `​Channel 34` | Error #72: COMMAND NOT EXECUTED |
| `​Channel 11.5` | Error #14: OBJECT DOES NOT EXIST |
| `​Channel 11` | Error #72: COMMAND NOT EXECUTED |
| `Copy 2 At 6` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 1 Default` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete 7` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Messages` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete World 6` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Fixture 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Dmx 2.101` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Dmx 513 At 100` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Assign Dmx 1.101 At Fixture 2 /break=1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Unpark DmxUniverse 1 Thru 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Delete DmxUniverse 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Edit DmxUniverse 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Move DmxUniverse 2 at 12` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "Pan" At 50.5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Down` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Edit /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Edit` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Exit` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Feature 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List feature` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Feature "Gobo1"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Feature $feature.2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Filter 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Select Filter 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 34` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 11.5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 11` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Flip` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At Form 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Channel 53 Full` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fullhighlight` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At Gel "Lee"."Mauve"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At Gel "Lee". "126"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At Gel 7.44` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Help Fixture` | connect ECONNREFUSED 127.0.0.1:30000 |
| `IfOutput At 50 Thru 75` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At Image 16` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Image 14` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Invert Fixture 1 Thru 6` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Item3D Thru` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Label Fixture 1 Thru 10 "Mac700 1"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Layer 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Layout 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Layout 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At Layout 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List Attribute` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListLibrary "Martin*"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListOops` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListOwner` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Lua "gma.feedback('hello world')"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Mask 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Mask "My Mask"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List MediaServer Thru` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Message "test marker 1"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List Messages /cnd = "type = 'alert'"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MidiProgram 12` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List Model` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Model 2 At Item3d 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Move3D At 2.5 -5 3.3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `NextRow` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Oops /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Oops` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Park Fixture 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Park Attribute "pan"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Park Channel 1 Thru 5 At 100` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Park DMX 1.2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Copy 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Paste 15` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Plugin 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `PMArea /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign PMArea 1 /name="Sunstrips"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Previous` | connect ECONNREFUSED 127.0.0.1:30000 |
| `PrevRow` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Protocol 1.1 /mode=outputauto /localstart=10 /amount=1 /network=1 /subnet=0 /universe=9` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Remote 3.1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RemoteCommand 192.168.0.4 "View 3"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Attribute "Pan" At - 270 Thru 270 With - 260 Thru 280` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Fixture 2 with 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Fixture 1 with 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Fixture 3 with 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Fixture 1 With` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ChangeDest Root DMX_Protocols.Art-Net` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Rotate3D At 2.5 -5 3.3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Screen 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Mask 5 Screen 2.3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Search Fixture 1 Thru 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SelFix SearchResult` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Search Fixture Thru Attribute "G" At 20 If SearchResult` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Select Layout 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ShuffleValues` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Stomp 75` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 2 Stomp 0` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store 7` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Surface 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 3 Thru 6` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture Thru 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Tools` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Unblock` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Unblock Sequ 1 /dv` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Unlock World 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Unpark DMX 1.1 Thru 1.10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Unpark DmxUnivers Thru` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Unpark Fixture 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Up` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List User 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List User` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List UserProfile` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List UserProfile 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign UserProfile 2 At World 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign World 1 UserProfile 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign UserProfile 2/World=1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Search Value 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Channel 1 Thru 10 Value 50 With 60` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Value` | connect ECONNREFUSED 127.0.0.1:30000 |
| `View 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `View 5 /screen = 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store View 5 /screen = 234` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign View 2/name = "Stage Extern"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace At 50 With 55 If Programmer` | connect ECONNREFUSED 127.0.0.1:30000 |
| `World 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Label World 4 "All Fixtures"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Zero` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 1 Thru 10 Zero` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture Thru 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete 3 Thru` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Channel 1 Channel 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign World 4 UserProfile 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Channel 1 At Full` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Channel 2 At 55` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 1 Thru 10 Full` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Search Value 100` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Fixture 1 With Fixture 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Fixture 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace At 50 With 55` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Fixture 1 Thru 10 Attribute "Pan" At -270 Thru 270 With -200 Thru 200` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Fixture 1 Thru 10 Attribute "Pan" At -270 Thru 270 With -250 Thru 290` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Lock Image 14` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-connection

Pass: 0 | Fail: 11 | Skip: 32

**Failures:**

| Command | Error |
|---|---|
| `​DisconnectStation 192.168.0.10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​DisconnectStation 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​DisconnectStation Thru` | connect ECONNREFUSED 127.0.0.1:30000 |
| `DropControl` | connect ECONNREFUSED 127.0.0.1:30000 |
| `NetworkInfo /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `NetworkInfo` | connect ECONNREFUSED 127.0.0.1:30000 |
| `NetworkNodeInfo` | connect ECONNREFUSED 127.0.0.1:30000 |
| `NetworkSpeedTest /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `NetworkSpeedTest` | connect ECONNREFUSED 127.0.0.1:30000 |
| `TakeControl Fixture 1 Thru 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Telnet 192.168.0.1 : 23 "Artist1"` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-cues

Pass: 48 | Fail: 217 | Skip: 11

**Failures:**

| Command | Error |
|---|---|
| `Clone` | Error #28: NO CUE SOURCE GIVEN |
| `Goto` | Error #72: COMMAND NOT EXECUTED |
| `Load` | Error #72: COMMAND NOT EXECUTED |
| `Copy Cue 3 At Cue 5` | Error #72: COMMAND NOT EXECUTED |
| `Goto Cue 3` | Error #72: COMMAND NOT EXECUTED |
| `Delete Preset "Blue"` | Error #14: OBJECT DOES NOT EXIST |
| `<<< Executor 3` | Error #1: UNKNOWN COMMAND |
| `>>> Executor 3` | Error #1: UNKNOWN COMMAND |
| `Delete Cue 1 + 2` | Error #14: OBJECT DOES NOT EXIST |
| `Delete Cue 1 If Fixture 5 Attribute "Pan" And Fixture 5 Attribute "Tilt"` | Error #14: OBJECT DOES NOT EXIST |
| `​Assign Sequence 1 Thru 5 At Executor 6 Thru 10` | Error #14: OBJECT DOES NOT EXIST |
| `​Assign Fade 3 Cue 5` | Error #72: COMMAND NOT EXECUTED |
| `Clone Fixture 1 At Fixture 2` | Error #47: CLONE SOURCE FIXTURE LIST EXPECTED |
| `Clone Fixture 1 + 2 At Group 10 If Sequence 1 Thru 10` | Error #47: CLONE SOURCE FIXTURE LIST EXPECTED |
| `Clone Fixture 1 At Fixture 2 /merge` | Error #47: CLONE SOURCE FIXTURE LIST EXPECTED |
| `​Clone Fixture 1 At Fixture 2 /overwrite` | Error #47: CLONE SOURCE FIXTURE LIST EXPECTED |
| `Clone Fixture 1 At FixtureType 2` | Error #1: UNKNOWN COMMAND |
| `Clone Fixture 1 At FixtureType 2 /merge` | Error #1: UNKNOWN COMMAND |
| `Clone Fixture 1 At FixtureType 2 /overwrite` | Error #14: OBJECT DOES NOT EXIST |
| `Clone FixtureType 1 At Fixture 2` | Error #1: UNKNOWN COMMAND |
| `Clone FixtureType 1 At Fixture 2 /merge` | Error #1: UNKNOWN COMMAND |
| `​Clone FixtureType 1 At Fixture 2 /overwrite` | Error #1: UNKNOWN COMMAND |
| `Clone FixtureType 1 At FixtureType 2` | Error #1: UNKNOWN COMMAND |
| `Clone FixtureType 1 At FixtureType 2 /merge` | Error #1: UNKNOWN COMMAND |
| `​Clone FixtureType 1 At FixtureType 2 /overwrite` | Error #1: UNKNOWN COMMAND |
| `​Copy Cue 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Assign Crossfade At Executor 1 Thru 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Crossfade 70 Executor 1 Fade 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Assign CrossfadeA At Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Assign CrossfadeB At Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Cue 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​DefGoBack` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​DefGoForward` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​DefGoPause` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 3 Delay 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delay 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Off Dmx Thru` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​DoubleRate Executor 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `DoubleSpeed Executor 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Extract Selection` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Extract Cue 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Goto Cue 3 Fade 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 3 Fade 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Fade 3 Cue 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fade 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At 50 Fade 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign FadePath 7 At Cue 4 Part 0` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Feature "Position".2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Flash On Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Flash Off Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `FlashGo /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `FlashGo Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `FlashOn /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `FlashOn Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Freeze On` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Go /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Go Executor 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Go Macro 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `GoBack /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `GoBack Executor 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Goto /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Goto Cue 5 Executor 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `HalfRate Executor 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `HalfSpeed Executor 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Highlight On` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Cue 3 If Channel 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Cue 3 If Fixture 4 Attribute "pan"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Cue 3 If Fixture 4 If Attribute "pan"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Kill /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Kill Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List Cue` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListUpdate` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Load Cue 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Load Cue 5 Executor 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Load Executor 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `LoadNext Executor 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `LoadPrev Executor 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Locate Sequence 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Lock Cue 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ManualXFade SpecialMaster 2.3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off SpecialMaster 2.3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Messages /condition="type = 'alert'"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MidiControl 1 64` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off Cue 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off Fixture 1 + 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Flash Off Executor 1.2.4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Highlight Off` | connect ECONNREFUSED 127.0.0.1:30000 |
| `On /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `On Cue 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `On Fixture 1 + 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Flash On Executor 1.2.4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Oops /noconfirm` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Cue 1 If Channel 2 or 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 3 OutDelay 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 3 OutFade 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 3 Part 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Move Cue 2 Part 2 At Cue 2 Part 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Cue 1 Part 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Pause Executor 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Plugin 2/name="Create Sequence"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store PMArea 1.2 /axis=+X+Z /noconfirm` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Preview /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Preview Cue 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Preview Cue 5 Part 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Preview Executor 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `PreviewEdit On` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Go PreviewExecutor` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 5 PreviewExecutor` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Protocol 4 /outactive=on` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Label Macro 3 "on"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Cue 1 /info="run after music stops"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Rate Exec 6` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Rate 2 Executor 1 + 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Rate1 Executor 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Record Timecode 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Record Timecode` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Record Off Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Release Selection` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Release PresetType "position"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Release Effect 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ReloadPlugins` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Remove Selection` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Attribute "Dim" At 0 Thru 100 With 0 Thru 90 If Sequence 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Attribute "Tilt" Fade 5 with Fade 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ResetDmxSelection` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off Selection` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off Executor 5 ; Delete Group 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Sequence 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Block Sequence 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ShuffleSelection` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 1 SnapPercent 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Cue 1 SnapPercent 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Cue 5 /mib = early /trig = follow` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Solo On` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Speed Exec 28` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Speed 120 Executor 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign StepFade Exec 28` | connect ECONNREFUSED 127.0.0.1:30000 |
| `StepFade 50 Exec 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign StepInFade Exec 28` | connect ECONNREFUSED 127.0.0.1:30000 |
| `StepInFade 50 Executor 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign StepOutFade Exec 28` | connect ECONNREFUSED 127.0.0.1:30000 |
| `StepOutFade 50 Exec 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 1 Thru 10 + 20 Thru 30` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Swop /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Swop Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Swop Off Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SwopGo /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SwopOn /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SwopOn Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SwopOn Off Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Temp /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Temp On Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Temp Off Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign TempFader Exec 28` | connect ECONNREFUSED 127.0.0.1:30000 |
| `TempFader 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Cue 3 Thru` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off Thru` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ToFull Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ToFull SpecialMaster "grandmaster" . "grand"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ToFull SpecialMaster 2.1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ToFull Executor 1 / cm = A` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Toggle /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Toggle Executor 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Toggle Sequence 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Top /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Top Executor 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Top Executor 5 Fade 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ToZero Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ToZero SpecialMaster "grandmaster" . "grand"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ToZero SpecialMaster 2.1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ToZero Executor 1 / cm = A` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Unblock Cue 3 If Fixture 1 If Feature "Position"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Unlock Cue 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Update /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Update` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Update Cue 4 /originalcontent /cueonly` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Update Preset 4.2 /global /keepactive=true /noconfirm` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Version` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete ViewButton 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Label ViewButton 2.5 "Layout"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store ViewButton 11.1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `WebRemoteProgOnly` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 3 + Channel 6` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Cue Thru 3 - Channel 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Group 3 + Cue 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `On Feature "GOBO1"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off Attribute 8.1.1 Thru 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off Fixture 1 Thru 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `store cue 2 + 4 "BO Scene 1"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `store cue "BO*" /merge /cueonly` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 1.2 Executor 1.4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Sequence 8 Cue 20 /overwrite` | connect ECONNREFUSED 127.0.0.1:30000 |
| `S Seq 8 Cu 20 /o` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 20 Sequence 8 /overwrite` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Cue 42 "Return of the Paranoid Android" /merge /use=Look` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Rate 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Goto Cue 4 Executor 8` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Goto Cue 4 Executor 1.8 Fade 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Goto Cue 4 Sequence 8` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Unblock Sequence 9` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Cue /MIB=late` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Cue 101 /MIB=99` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Cue 1 Thru 10 / MIB=Off` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Cue 15  / MIB=-4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Search Preset 1.2 If Sequence 6` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Fixture 1 With Fixture 2 If Sequence 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Preset 2.1 With Preset 2.4 If Sequence 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Search Fixture 8 If Sequence 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Value 0 Thru 100 With 0 Thru 120 If Sequence 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Fixture 1 + 2 Value 0 Thru 100 With 0 Thru 80 If Sequence 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Search Value 50 If Sequence 8` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store cue 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Label seq 1 "Main Show"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `g 1 + 2 at 75` | connect ECONNREFUSED 127.0.0.1:30000 |
| `g 3 t 5 at 60` | connect ECONNREFUSED 127.0.0.1:30000 |
| `store PM 1.2 /axis=+X+Z` | connect ECONNREFUSED 127.0.0.1:30000 |
| `copy PM 1.1 at 1.2 /merge` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-effects

Pass: 3 | Fail: 89 | Skip: 0

**Failures:**

| Command | Error |
|---|---|
| `Edit Effect 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Move Effect 1 At 37` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SelFix Effect 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectAttack` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectAttack` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectAttack 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectAttack 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectBPM` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectBPM` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectBPM 120` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectBPM 90` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectDecay` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectDecay` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectDecay 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectDecay 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectDelay` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectDelay` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectDelay 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectDelay 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectFade` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectFade` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectFade 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectFade 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectForm` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectForm` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectForm 6` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectForm 6` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectHigh` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectHigh` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectHigh 80` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectHigh 20` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectHZ` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectHZ` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectHZ 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectHZ 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectID` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectID` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectLow` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectLow` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectLow 20` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectLow -20` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectPhase` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectPhase` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectPhase 180` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectPhase 180` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectSec` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectSec` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectSec 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectSec 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectSpeedGroup` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectWidth` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off EffectWidth` | connect ECONNREFUSED 127.0.0.1:30000 |
| `EffectWidth 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Attribute "pan" At EffectWidth 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Interleave 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Layer EffectForm` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListEffectLibrary "My*"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store MAtricks 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MAtricks 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Matricks Off` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MatricksBlocks  2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MatricksBlocks  2.3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MF  2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MatricksFilter  "OddID"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MAtricksGroups  4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MAtricksGroups  6.3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MatricksInterleave 1.2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MatricksInterleave +` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MatricksReset` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MatricksWings 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MatricksInterleave 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RemoveIndividuals Effect 1 Thru 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RemoveIndividuals Effect 1.11.2  /nc` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SelFix Effect 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SyncEffects` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 1 Thru 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At 10 Thru 100` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MAtricksInterleave 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MAtricksBlocks 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MAtricksBlocks 3.2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MAtricksWings 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MAtricksWings 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At 0 Thru 100` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MAtricksGroups 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `MAtricksGroups 1.3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Edit Effect 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Effect "number"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Effect "number" Thru "number"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Effect 1 Thru` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-executors

Pass: 14 | Fail: 51 | Skip: 0

**Failures:**

| Command | Error |
|---|---|
| `Off AllButtonExecutors` | Error #1: UNKNOWN COMMAND |
| `Off AllChaseExecutors` | Error #1: UNKNOWN COMMAND |
| `Off AllFaderExecutors` | Error #1: UNKNOWN COMMAND |
| `Off AllSequExecutors` | Error #1: UNKNOWN COMMAND |
| `Assign Go ExecButton1 1.1 /cue_mode=xassert` | Error #14: OBJECT DOES NOT EXIST |
| `Assign Empty Executor 101` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Toggle At ExecButton1 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete ExecButton1 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Toggle At ExecButton2 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete ExecButton2 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Toggle At ExecButton 3 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete ExecButton 3 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Executor 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Executor 5 At 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Cue 3 Executor 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Select Executor 4.2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Speed At Fader 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fader 5 At 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `FaderPage 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fix On Executor 1 Thru 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fix Executor 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `IdentifyFaderModule 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListFaderModules` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Master Exec 28` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Assign Masterfade At Executor 1 Thru 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `​Masterfade 5 Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Page 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Pause Page 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Page 3 / Info = "This are all my executors on page 3"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Page "song name"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Select Executor 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SelFix Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SpecialMaster "grandmaster" . "grand" At 50` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Go Page 4 thru 5 Exec 4 thru 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ViewPage 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Executor 1 Zero` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Pause Page 1 Thru 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Executor 10 Thru 13` | connect ECONNREFUSED 127.0.0.1:30000 |
| `locate group 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `as seq 4 ex 2.5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign ToFull ExecButton3 8.5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Rate Executor 9` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Rate Fader 9` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Empty Fader 9` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ButtonPage 20` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Page Rainbow` | connect ECONNREFUSED 127.0.0.1:30000 |
| `CD Fixture 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Fixture 1.1.3 ChannelPage 1.2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Fixture 1.1.4 ChannelPage 1.3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Fixture 1.1.PAN ChannelPage 1.2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Fixture 1.1.TILT ChannelPage 1.3` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-export-import

Pass: 0 | Fail: 16 | Skip: 1

**Failures:**

| Command | Error |
|---|---|
| `Export /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Export Macro 1 Thru 10 "MyMacros"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Export Effect 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Export Gel 7` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Import /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Import "MyCoolEffect" Effect 101` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Import "MyMacro" At Macro 20 /path = "/data/ma/actual/gma2/importexport"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Export Messages /cnd="(type >= 'warning' or time <= '12:45:00') and !(new = 'true')"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Export Profile 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Export Root LiveSetup.Layers` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SelectDrive` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Export Group 1  Thru 4 "Front_groups"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Export UserProfile "Designer" /Overwrite` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SelectDrive 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `export preset 4 "Cyan"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Import "Front Groups" At Group 20` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-groups

Pass: 9 | Fail: 20 | Skip: 0

**Failures:**

| Command | Error |
|---|---|
| `Group 5 - Channel 2` | Error #1: UNKNOWN COMMAND |
| `Group Mac*` | Error #14: OBJECT DOES NOT EXIST |
| `Copy Group 1 At 5` | read ECONNRESET |
| `Copy Group 1 Thru 3 At 11` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Copy Group 2 At 6 Thru 8` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Group 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Flip 2 Group 7` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Group 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `If Group 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Group 3 If Group 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `IfActive Group 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `IfProg Group 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Insert Group 5 At 9` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Label Group 3 "All Studiocolors"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Group 5 Layout 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List Group Thru 10` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Move Group 5 At 9` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Cut Group 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Paste Group 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Remote 3.1 /dmx=5.1 /type=cmd /cmd="Group 1"` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-macros

Pass: 8 | Fail: 34 | Skip: 1

**Failures:**

| Command | Error |
|---|---|
| `SetUserVar $myname = "John"` | Error #54: VARIABLE NOT FOUND |
| `AddUserVar $myname = " Doe"` | Error #54: VARIABLE NOT FOUND |
| `SetUserVar $mycounter = 5` | Error #54: VARIABLE NOT FOUND |
| `AddUserVar $mycounter = 6` | Error #54: VARIABLE NOT FOUND |
| `SetVar $myname = "John"` | Error #54: VARIABLE NOT FOUND |
| `AddVar $myname = " Doe"` | Error #54: VARIABLE NOT FOUND |
| `SetVar $mycounter = 5` | Error #54: VARIABLE NOT FOUND |
| `AddVar $mycounter = 6` | Error #54: VARIABLE NOT FOUND |
| `Appearance Macro 2 At Macro 13` | Error #52: OPERATION ABORTED BY USER |
| `​Call Preset 3.1` | Error #72: COMMAND NOT EXECUTED |
| `​Call Cue 3` | Error #72: COMMAND NOT EXECUTED |
| `Call Cue 3 /status` | Error #72: COMMAND NOT EXECUTED |
| `Copy Macro 2 At 6` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SetVar $mychasers = "Executor 11 Thru 15"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Off $mychasers` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SetVar $myname = "Ben Dover"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListMacroLibrary "My*"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListPluginLibrary "My*"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListUserVar` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListUserVar f*` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListVar` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ListVar f*` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Macro 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Macro 1.3.4 /wait="Go"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Macro 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RemoteCommand 192.168.0.4 "Macro 4"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SetUserVar $CueNumber =` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SetVar $CueNumber =` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SetVar $song_name = This is us` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SetVar $chorus_Chasers="Executor 201 + 204 + 205"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Go $chorus_Chasers` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Group 4 At` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Macro 1 At Exec 2.7` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Macro 2 At ViewButton 1.5` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-patch

Pass: 5 | Fail: 34 | Skip: 0

**Failures:**

| Command | Error |
|---|---|
| `​Assign Fixture 301 At ChannelFader 5` | Error #72: COMMAND NOT EXECUTED |
| `​Assign Channel 201 Thru 215 At ChannelFader 2.1` | Error #14: OBJECT DOES NOT EXIST |
| `​Assign Fixture 3.2.1 At ChannelFader 2.11` | Error #14: OBJECT DOES NOT EXIST |
| `​ChannelLink Attribute "Iris" + "Focus"` | Error #14: OBJECT DOES NOT EXIST |
| `RdmAutomatch` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmAutomatch Group 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmAutomatch Group 1 If Sequence 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmAutopatch` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmAutopatch Group 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmAutopatch Group 1 If Sequence 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmAutomatch RdmFixtureType 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmUmatch RdmFixtureType 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RDMInfo Fixture 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RDMInfo Fixture 3/screen = 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmList /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmList Fixture 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmList Fixture 3 / filename = "RDM Fixture 3"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmSetParameter /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmSetParameter dmx_start_address 3 / UID =  43500F019FCB` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmSetParameter display_invert 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmSetPatch /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmSetPatch 25` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmSetPatch 25 / multipatch = 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmSetPatch 25 / UID = 43500F019FCB` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmUnmatch` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmUnmatch Group 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `RdmUnmatch Group 1 If Sequence 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign [DMX-list] At Fixture [Fixture ID]` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign DMX 2.1 At Fixture 101` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign DMX 3.1 Thru 3.5 Fixture 201` | connect ECONNREFUSED 127.0.0.1:30000 |
| `as dmx 3.1 t 3.5 f 201` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Fixture [Fixture-list] At DMX [DMX-address]` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Fixture 101 At DMX 2.1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Fixture 101 + 103 + 105 DMX 5.61` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-presets

Pass: 7 | Fail: 41 | Skip: 0

**Failures:**

| Command | Error |
|---|---|
| `Delete Preset "Red"` | Error #14: OBJECT DOES NOT EXIST |
| `​PresetType 3.2.1` | Error #1: UNKNOWN COMMAND |
| `AutoCreate FixtureType 2. "PresetReferences"` | Error #1: UNKNOWN COMMAND |
| `Cut Preset 4.1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Default PresetType "Position"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At Preset "drummer"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Extract Preset "drummer"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `PresetType "gobo".2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Clone FixtureType 2 at 3 if Preset "Color".*` | connect ECONNREFUSED 127.0.0.1:30000 |
| `IfOutput Preset  "color"."Red"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Label Preset "color"."Red" "Dark Red"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List Preset "color"."m*"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `List Preset 4. "m*"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Preset 5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `At Preset 3.2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Preset *."DarkRed"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `PresetType 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `PresetType "Dimmer"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `PresetType 3.1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `On PresetType "Color".2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `PresetType $preset.2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `PresetType 3.2.1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store If PresetType Position If Selection` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Remove PresetType "position"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Remove Fixture 1 If PresetType 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `SelFix Preset 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `ShuffleValues If PresetType "Position"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Stomp Preset "drummer"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Store Preset 1.3 /presetfilter=false /ka` | connect ECONNREFUSED 127.0.0.1:30000 |
| `StoreLook /?` | connect ECONNREFUSED 127.0.0.1:30000 |
| `StoreLook Executor 1` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Unpark PresetType Dimmer` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace PresetType 1 At 50 With 55` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Fixture 1 + Fixture 101 Please` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Preset 4.1 Thru 4.5` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Delete Preset *.*` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Clone Fixture 1 At FixtureType 1.1 If Preset 2.4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Search Attribute "Zoom" At 40 If Preset 0."*"` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Search Preset 1.2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Preset 2.1 With Preset 2.4 If SearchResult` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Replace Attribute "Dim" With Preset 1.5 If SearchResult` | connect ECONNREFUSED 127.0.0.1:30000 |

### ma2-timecode

Pass: 0 | Fail: 12 | Skip: 0

**Failures:**

| Command | Error |
|---|---|
| `Store Timecode 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Record Timecode 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Go Timecode 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Top Timecode 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Label Timecode 2` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Timecode 1/Slot = 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `TimecodeSlot 3` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Edit Timer 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Assign Timer 4 /countdowntime = 20` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Go Timecode 3 Time 3h30m` | connect ECONNREFUSED 127.0.0.1:30000 |
| `<<< Timecode 4` | connect ECONNREFUSED 127.0.0.1:30000 |
| `Go TimecodeSlot 1` | connect ECONNREFUSED 127.0.0.1:30000 |

