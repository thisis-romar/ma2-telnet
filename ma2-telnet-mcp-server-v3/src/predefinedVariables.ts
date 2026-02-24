/**
 * Definition of all known grandMA2 predefined (system) variables.  These
 * variables are automatically updated by the console and can be
 * referenced in macros or command‑line commands by prefixing the
 * variable name with a `$` symbol.  When exporting the values here
 * the `$` is intentionally omitted so that the strings can be
 * concatenated with `$` at call sites.  All names are uppercase to
 * match the documentation.
 *
 * This list is compiled from the MA Lighting documentation.  At the
 * time of writing the documented variables include $TIME, $DATE,
 * $USER, $USERRIGHTS, $FADERPAGE, $BUTTONPAGE, $CHANNELPAGE,
 * $SELECTEDEXEC, $SELECTEDEXECCUE, $FEATURE, $ATTRIBUTE and
 * $SHOWFILE【527674179264934†L507-L523】【723991380457966†L194-L229】.  If
 * additional system variables are discovered, they can be appended to
 * the union and array below.  Unknown variables will not be
 * recognized by the type system but can still be sent to the console
 * via raw commands.
 */

/**
 * String literal union of all currently known predefined variables.
 */
export type MA2PredefinedVariable =
  | 'TIME'
  | 'DATE'
  | 'USER'
  | 'USERRIGHTS'
  | 'FADERPAGE'
  | 'BUTTONPAGE'
  | 'CHANNELPAGE'
  | 'SELECTEDEXEC'
  | 'SELECTEDEXECCUE'
  | 'FEATURE'
  | 'ATTRIBUTE'
  | 'SHOWFILE';

/**
 * Array of all known predefined variable names.  These values do not
 * include the leading `$` symbol.  Use this list to validate or
 * auto‑complete variable names in higher‑level tools or UIs.
 */
export const MA2_PREDEFINED_VARIABLES: MA2PredefinedVariable[] = [
  'TIME',
  'DATE',
  'USER',
  'USERRIGHTS',
  'FADERPAGE',
  'BUTTONPAGE',
  'CHANNELPAGE',
  'SELECTEDEXEC',
  'SELECTEDEXECCUE',
  'FEATURE',
  'ATTRIBUTE',
  'SHOWFILE',
];