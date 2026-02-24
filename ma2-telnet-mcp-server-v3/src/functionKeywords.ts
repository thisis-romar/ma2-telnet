/**
 * Definition of all known grandMA2 function keywords.
 *
 * Function keywords correspond to the verbs of the grandMA2 command
 * language.  They perform actions (e.g. `Assign`, `Copy`, `Import`,
 * `Export`) and are usually followed by an object on which the
 * operation is performed.  The list below is derived from the
 * grandMA2 manual's "Function Keywords" chapter and includes every
 * documented keyword.  Each entry is stored in lowercase to make
 * comparisons case‑insensitive.  We also include the `appearance`
 * keyword on request, even though it is categorized separately in
 * the manual.
 */

/**
 * Union type of every grandMA2 function keyword.  The symbols
 * `>>>` and `<<<` are valid keywords representing fast forward
 * and fast back operations, respectively.  All other keywords are
 * alphanumeric strings converted to lowercase.
 */
export type MA2FunctionKeyword =
  | '>>>'
  | '<<<'
  | 'adduservar'
  | 'addvar'
  | 'align'
  | 'alignfadermodules'
  | 'all'
  | 'allrows'
  | 'assign'
  | 'at'
  | 'backup'
  | 'black'
  | 'blackout'
  | 'blind'
  | 'blindedit'
  | 'block'
  | 'call'
  | 'changedest'
  | 'channellink'
  | 'circularcopy'
  | 'clear'
  | 'clearactive'
  | 'clearall'
  | 'clearselection'
  | 'clone'
  | 'cmdhelp'
  | 'copy'
  | 'delete'
  | 'deleteshow'
  | 'disconnectstation'
  | 'doublerate'
  | 'doublespeed'
  | 'edit'
  | 'endsession'
  | 'export'
  | 'extract'
  | 'fix'
  | 'flash'
  | 'flip'
  | 'freeze'
  | 'go'
  | 'goback'
  | 'goto'
  | 'halfrate'
  | 'halfspeed'
  | 'help'
  | 'highlight'
  | 'if'
  | 'ifactive'
  | 'ifoutput'
  | 'ifprog'
  | 'import'
  | 'info'
  | 'insert'
  | 'invert'
  | 'invitestation'
  | 'joinsession'
  | 'kill'
  | 'label'
  | 'layer'
  | 'learn'
  | 'leavesession'
  | 'list'
  | 'listfadermodules'
  | 'listlibrary'
  | 'listeffectlibrary'
  | 'listmacrolibrary'
  | 'listshows'
  | 'listuservar'
  | 'listvar'
  | 'load'
  | 'loadshow'
  | 'lock'
  | 'login'
  | 'logout'
  | 'masterfade'
  | 'matricksblocks'
  | 'matricksfilter'
  | 'matricksgroups'
  | 'matricksinterleave'
  | 'matricksreset'
  | 'matrickswings'
  | 'menu'
  | 'midicontrol'
  | 'midinote'
  | 'midiprogram'
  | 'move'
  | 'networkinfo'
  | 'networknodeinfo'
  | 'networknodeupdate'
  | 'networkspeedtest'
  | 'newshow'
  | 'nextrow'
  | 'off'
  | 'on'
  | 'oops'
  | 'park'
  | 'pause'
  | 'preview'
  | 'previewedit'
  | 'previewexecutor'
  | 'prevrow'
  | 'psr'
  | 'psrlist'
  | 'psrprepare'
  | 'rate1'
  | 'reboot'
  | 'record'
  | 'saveshow'
  | 'select'
  | 'selectdrive'
  | 'selfix'
  | 'setip'
  | 'setup'
  | 'setuservar'
  | 'setvar'
  | 'shuffleselection'
  | 'shufflevalues'
  | 'shutdown'
  | 'solo'
  | 'speed'
  | 'stepfade'
  | 'stepinfade'
  | 'stepoutfade'
  | 'stomp'
  | 'store'
  | 'storelook'
  | 'swop'
  | 'swopgo'
  | 'swopon'
  | 'temp'
  | 'tempfader'
  | 'toggle'
  | 'tools'
  | 'top'
  | 'unblock'
  | 'unpark'
  | 'update'
  | 'updatefirmware'
  | 'updatesoftware'
  | 'updatethumbnails'
  | 'version'
  | 'appearance';

/**
 * Ordered list of grandMA2 function keywords.  Use this array for
 * runtime validation or iteration.  The order follows the sequence
 * presented in the manual.  All entries are lowercase.
 */
export const MA2_FUNCTION_KEYWORDS: MA2FunctionKeyword[] = [
  '>>>',
  '<<<',
  'adduservar',
  'addvar',
  'align',
  'alignfadermodules',
  'all',
  'allrows',
  'assign',
  'at',
  'backup',
  'black',
  'blackout',
  'blind',
  'blindedit',
  'block',
  'call',
  'changedest',
  'channellink',
  'circularcopy',
  'clear',
  'clearactive',
  'clearall',
  'clearselection',
  'clone',
  'cmdhelp',
  'copy',
  'delete',
  'deleteshow',
  'disconnectstation',
  'doublerate',
  'doublespeed',
  'edit',
  'endsession',
  'export',
  'extract',
  'fix',
  'flash',
  'flip',
  'freeze',
  'go',
  'goback',
  'goto',
  'halfrate',
  'halfspeed',
  'help',
  'highlight',
  'if',
  'ifactive',
  'ifoutput',
  'ifprog',
  'import',
  'info',
  'insert',
  'invert',
  'invitestation',
  'joinsession',
  'kill',
  'label',
  'layer',
  'learn',
  'leavesession',
  'list',
  'listfadermodules',
  'listlibrary',
  'listeffectlibrary',
  'listmacrolibrary',
  'listshows',
  'listuservar',
  'listvar',
  'load',
  'loadshow',
  'lock',
  'login',
  'logout',
  'masterfade',
  'matricksblocks',
  'matricksfilter',
  'matricksgroups',
  'matricksinterleave',
  'matricksreset',
  'matrickswings',
  'menu',
  'midicontrol',
  'midinote',
  'midiprogram',
  'move',
  'networkinfo',
  'networknodeinfo',
  'networknodeupdate',
  'networkspeedtest',
  'newshow',
  'nextrow',
  'off',
  'on',
  'oops',
  'park',
  'pause',
  'preview',
  'previewedit',
  'previewexecutor',
  'prevrow',
  'psr',
  'psrlist',
  'psrprepare',
  'rate1',
  'reboot',
  'record',
  'saveshow',
  'select',
  'selectdrive',
  'selfix',
  'setip',
  'setup',
  'setuservar',
  'setvar',
  'shuffleselection',
  'shufflevalues',
  'shutdown',
  'solo',
  'speed',
  'stepfade',
  'stepinfade',
  'stepoutfade',
  'stomp',
  'store',
  'storelook',
  'swop',
  'swopgo',
  'swopon',
  'temp',
  'tempfader',
  'toggle',
  'tools',
  'top',
  'unblock',
  'unpark',
  'update',
  'updatefirmware',
  'updatesoftware',
  'updatethumbnails',
  'version',
  'appearance',
];