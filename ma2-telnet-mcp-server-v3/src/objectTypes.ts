/**
 * Definition of all known grandMA2 object types.  These keywords map to
 * nouns in the grandMA2 command syntax (e.g. `List Cue`, `List Group`).
 *
 * The values are expressed in lowercase to simplify comparisons.  When
 * parsing a `List` command, any token following `List` is normalized
 * to lowercase and looked up in this union.  If no match is found,
 * the type defaults to `'destination'`, which corresponds to the
 * currently selected pool.
 */

/**
 * String literal union of all object types supported by grandMA2.  The
 * fallback value `'destination'` represents the implicit target when no
 * explicit object type is provided.
 */
export type MA2ObjectType =
  | 'agenda'
  | 'attribute'
  | 'buttonpage'
  | 'camera'
  | 'channel'
  | 'channelfader'
  | 'cue'
  | 'default'
  | 'dmx'
  | 'effect'
  | 'execbutton1'
  | 'execbutton2'
  | 'execbutton3'
  | 'executor'
  | 'fader'
  | 'faderpage'
  | 'feature'
  | 'filter'
  | 'fixture'
  | 'fixturetype'
  | 'form'
  | 'full'
  | 'group'
  | 'layout'
  | 'macro'
  | 'mask'
  | 'matricks'
  | 'normal'
  | 'page'
  | 'part'
  | 'preset'
  | 'presettype'
  | 'previewexecutor'
  | 'remote'
  | 'root'
  | 'screen'
  | 'selection'
  | 'sequence'
  | 'specialmaster'
  | 'timecode'
  | 'timer'
  | 'user'
  | 'userprofile'
  | 'view'
  | 'viewbutton'
  | 'viewpage'
  | 'world'
  | 'zero'
  | 'destination';

/**
 * Array of all known object type keywords.  This can be used to
 * validate user input or to iterate over supported types when
 * generating tools or documentation.  The list is kept in the same
 * order as documented in the MA Lighting manual for ease of
 * cross‑reference.
 */
export const MA2_OBJECT_TYPES: MA2ObjectType[] = [
  'agenda',
  'attribute',
  'buttonpage',
  'camera',
  'channel',
  'channelfader',
  'cue',
  'default',
  'dmx',
  'effect',
  'execbutton1',
  'execbutton2',
  'execbutton3',
  'executor',
  'fader',
  'faderpage',
  'feature',
  'filter',
  'fixture',
  'fixturetype',
  'form',
  'full',
  'group',
  'layout',
  'macro',
  'mask',
  'matricks',
  'normal',
  'page',
  'part',
  'preset',
  'presettype',
  'previewexecutor',
  'remote',
  'root',
  'screen',
  'selection',
  'sequence',
  'specialmaster',
  'timecode',
  'timer',
  'user',
  'userprofile',
  'view',
  'viewbutton',
  'viewpage',
  'world',
  'zero',
  'destination',
];