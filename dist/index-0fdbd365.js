'use strict';

const process$2 = require('node:process');
const os$1 = require('node:os');
const require$$2 = require('node:tty');
const require$$0$1 = require('util');
const require$$0 = require('os');
const index$1 = require('./index-27f3aec5.js');
const require$$0$2 = require('fs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
      if (k !== 'default' && !(k in n)) {
        const d = Object.getOwnPropertyDescriptor(e, k);
        if (d) {
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      }
    } }
  }
  return Object.freeze(n);
}

const process__default = /*#__PURE__*/_interopDefaultLegacy(process$2);
const os__default = /*#__PURE__*/_interopDefaultLegacy(os$1);
const require$$2__default = /*#__PURE__*/_interopDefaultLegacy(require$$2);
const require$$0__default$1 = /*#__PURE__*/_interopDefaultLegacy(require$$0$1);
const require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
const require$$0__default$2 = /*#__PURE__*/_interopDefaultLegacy(require$$0$2);

var cliTable3 = {exports: {}};

let messages = [];
let level = 0;

const debug$3 = (msg, min) => {
  if (level >= min) {
    messages.push(msg);
  }
};

debug$3.WARN = 1;
debug$3.INFO = 2;
debug$3.DEBUG = 3;

debug$3.reset = () => {
  messages = [];
};

debug$3.setDebugLevel = (v) => {
  level = v;
};

debug$3.warn = (msg) => debug$3(msg, debug$3.WARN);
debug$3.info = (msg) => debug$3(msg, debug$3.INFO);
debug$3.debug = (msg) => debug$3(msg, debug$3.DEBUG);

debug$3.debugMessages = () => messages;

var debug_1 = debug$3;

var stringWidth$2 = {exports: {}};

var ansiRegex$1 = ({onlyFirst = false} = {}) => {
	const pattern = [
		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
	].join('|');

	return new RegExp(pattern, onlyFirst ? undefined : 'g');
};

const ansiRegex = ansiRegex$1;

var stripAnsi$1 = string => typeof string === 'string' ? string.replace(ansiRegex(), '') : string;

var isFullwidthCodePoint$2 = {exports: {}};

/* eslint-disable yoda */

const isFullwidthCodePoint$1 = codePoint => {
	if (Number.isNaN(codePoint)) {
		return false;
	}

	// Code points are derived from:
	// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt
	if (
		codePoint >= 0x1100 && (
			codePoint <= 0x115F || // Hangul Jamo
			codePoint === 0x2329 || // LEFT-POINTING ANGLE BRACKET
			codePoint === 0x232A || // RIGHT-POINTING ANGLE BRACKET
			// CJK Radicals Supplement .. Enclosed CJK Letters and Months
			(0x2E80 <= codePoint && codePoint <= 0x3247 && codePoint !== 0x303F) ||
			// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
			(0x3250 <= codePoint && codePoint <= 0x4DBF) ||
			// CJK Unified Ideographs .. Yi Radicals
			(0x4E00 <= codePoint && codePoint <= 0xA4C6) ||
			// Hangul Jamo Extended-A
			(0xA960 <= codePoint && codePoint <= 0xA97C) ||
			// Hangul Syllables
			(0xAC00 <= codePoint && codePoint <= 0xD7A3) ||
			// CJK Compatibility Ideographs
			(0xF900 <= codePoint && codePoint <= 0xFAFF) ||
			// Vertical Forms
			(0xFE10 <= codePoint && codePoint <= 0xFE19) ||
			// CJK Compatibility Forms .. Small Form Variants
			(0xFE30 <= codePoint && codePoint <= 0xFE6B) ||
			// Halfwidth and Fullwidth Forms
			(0xFF01 <= codePoint && codePoint <= 0xFF60) ||
			(0xFFE0 <= codePoint && codePoint <= 0xFFE6) ||
			// Kana Supplement
			(0x1B000 <= codePoint && codePoint <= 0x1B001) ||
			// Enclosed Ideographic Supplement
			(0x1F200 <= codePoint && codePoint <= 0x1F251) ||
			// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
			(0x20000 <= codePoint && codePoint <= 0x3FFFD)
		)
	) {
		return true;
	}

	return false;
};

isFullwidthCodePoint$2.exports = isFullwidthCodePoint$1;
isFullwidthCodePoint$2.exports.default = isFullwidthCodePoint$1;

var emojiRegex$1 = function () {
  // https://mths.be/emoji
  return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F|\uD83D\uDC68(?:\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68\uD83C\uDFFB|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|[\u2695\u2696\u2708]\uFE0F|\uD83D[\uDC66\uDC67]|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708])\uFE0F|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C[\uDFFB-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)\uD83C\uDFFB|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB\uDFFC])|\uD83D\uDC69(?:\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D\uD83D\uDC69)(?:\uD83C[\uDFFB-\uDFFD])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83C\uDFF4\u200D\u2620)\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83C\uDDF6\uD83C\uDDE6|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDBB\uDDD2-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5\uDEEB\uDEEC\uDEF4-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFA\uDFE0-\uDFEB]|\uD83E[\uDD0D-\uDD3A\uDD3C-\uDD45\uDD47-\uDD71\uDD73-\uDD76\uDD7A-\uDDA2\uDDA5-\uDDAA\uDDAE-\uDDCA\uDDCD-\uDDFF\uDE70-\uDE73\uDE78-\uDE7A\uDE80-\uDE82\uDE90-\uDE95])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};

const stripAnsi = stripAnsi$1;
const isFullwidthCodePoint = isFullwidthCodePoint$2.exports;
const emojiRegex = emojiRegex$1;

const stringWidth$1 = string => {
	if (typeof string !== 'string' || string.length === 0) {
		return 0;
	}

	string = stripAnsi(string);

	if (string.length === 0) {
		return 0;
	}

	string = string.replace(emojiRegex(), '  ');

	let width = 0;

	for (let i = 0; i < string.length; i++) {
		const code = string.codePointAt(i);

		// Ignore control characters
		if (code <= 0x1F || (code >= 0x7F && code <= 0x9F)) {
			continue;
		}

		// Ignore combining characters
		if (code >= 0x300 && code <= 0x36F) {
			continue;
		}

		// Surrogates
		if (code > 0xFFFF) {
			i++;
		}

		width += isFullwidthCodePoint(code) ? 2 : 1;
	}

	return width;
};

stringWidth$2.exports = stringWidth$1;
// TODO: remove this in the next major version
stringWidth$2.exports.default = stringWidth$1;

const stringWidth = stringWidth$2.exports;

function codeRegex(capture) {
  return capture ? /\u001b\[((?:\d*;){0,5}\d*)m/g : /\u001b\[(?:\d*;){0,5}\d*m/g;
}

function strlen(str) {
  let code = codeRegex();
  let stripped = ('' + str).replace(code, '');
  let split = stripped.split('\n');
  return split.reduce(function (memo, s) {
    return stringWidth(s) > memo ? stringWidth(s) : memo;
  }, 0);
}

function repeat$1(str, times) {
  return Array(times + 1).join(str);
}

function pad(str, len, pad, dir) {
  let length = strlen(str);
  if (len + 1 >= length) {
    let padlen = len - length;
    switch (dir) {
      case 'right': {
        str = repeat$1(pad, padlen) + str;
        break;
      }
      case 'center': {
        let right = Math.ceil(padlen / 2);
        let left = padlen - right;
        str = repeat$1(pad, left) + str + repeat$1(pad, right);
        break;
      }
      default: {
        str = str + repeat$1(pad, padlen);
        break;
      }
    }
  }
  return str;
}

let codeCache = {};

function addToCodeCache(name, on, off) {
  on = '\u001b[' + on + 'm';
  off = '\u001b[' + off + 'm';
  codeCache[on] = { set: name, to: true };
  codeCache[off] = { set: name, to: false };
  codeCache[name] = { on: on, off: off };
}

//https://github.com/Marak/colors.js/blob/master/lib/styles.js
addToCodeCache('bold', 1, 22);
addToCodeCache('italics', 3, 23);
addToCodeCache('underline', 4, 24);
addToCodeCache('inverse', 7, 27);
addToCodeCache('strikethrough', 9, 29);

function updateState(state, controlChars) {
  let controlCode = controlChars[1] ? parseInt(controlChars[1].split(';')[0]) : 0;
  if ((controlCode >= 30 && controlCode <= 39) || (controlCode >= 90 && controlCode <= 97)) {
    state.lastForegroundAdded = controlChars[0];
    return;
  }
  if ((controlCode >= 40 && controlCode <= 49) || (controlCode >= 100 && controlCode <= 107)) {
    state.lastBackgroundAdded = controlChars[0];
    return;
  }
  if (controlCode === 0) {
    for (let i in state) {
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(state, i)) {
        delete state[i];
      }
    }
    return;
  }
  let info = codeCache[controlChars[0]];
  if (info) {
    state[info.set] = info.to;
  }
}

function readState(line) {
  let code = codeRegex(true);
  let controlChars = code.exec(line);
  let state = {};
  while (controlChars !== null) {
    updateState(state, controlChars);
    controlChars = code.exec(line);
  }
  return state;
}

function unwindState(state, ret) {
  let lastBackgroundAdded = state.lastBackgroundAdded;
  let lastForegroundAdded = state.lastForegroundAdded;

  delete state.lastBackgroundAdded;
  delete state.lastForegroundAdded;

  Object.keys(state).forEach(function (key) {
    if (state[key]) {
      ret += codeCache[key].off;
    }
  });

  if (lastBackgroundAdded && lastBackgroundAdded != '\u001b[49m') {
    ret += '\u001b[49m';
  }
  if (lastForegroundAdded && lastForegroundAdded != '\u001b[39m') {
    ret += '\u001b[39m';
  }

  return ret;
}

function rewindState(state, ret) {
  let lastBackgroundAdded = state.lastBackgroundAdded;
  let lastForegroundAdded = state.lastForegroundAdded;

  delete state.lastBackgroundAdded;
  delete state.lastForegroundAdded;

  Object.keys(state).forEach(function (key) {
    if (state[key]) {
      ret = codeCache[key].on + ret;
    }
  });

  if (lastBackgroundAdded && lastBackgroundAdded != '\u001b[49m') {
    ret = lastBackgroundAdded + ret;
  }
  if (lastForegroundAdded && lastForegroundAdded != '\u001b[39m') {
    ret = lastForegroundAdded + ret;
  }

  return ret;
}

function truncateWidth(str, desiredLength) {
  if (str.length === strlen(str)) {
    return str.substr(0, desiredLength);
  }

  while (strlen(str) > desiredLength) {
    str = str.slice(0, -1);
  }

  return str;
}

function truncateWidthWithAnsi(str, desiredLength) {
  let code = codeRegex(true);
  let split = str.split(codeRegex());
  let splitIndex = 0;
  let retLen = 0;
  let ret = '';
  let myArray;
  let state = {};

  while (retLen < desiredLength) {
    myArray = code.exec(str);
    let toAdd = split[splitIndex];
    splitIndex++;
    if (retLen + strlen(toAdd) > desiredLength) {
      toAdd = truncateWidth(toAdd, desiredLength - retLen);
    }
    ret += toAdd;
    retLen += strlen(toAdd);

    if (retLen < desiredLength) {
      if (!myArray) {
        break;
      } // full-width chars may cause a whitespace which cannot be filled
      ret += myArray[0];
      updateState(state, myArray);
    }
  }

  return unwindState(state, ret);
}

function truncate(str, desiredLength, truncateChar) {
  truncateChar = truncateChar || '…';
  let lengthOfStr = strlen(str);
  if (lengthOfStr <= desiredLength) {
    return str;
  }
  desiredLength -= strlen(truncateChar);

  let ret = truncateWidthWithAnsi(str, desiredLength);

  return ret + truncateChar;
}

function defaultOptions$1() {
  return {
    chars: {
      top: '─',
      'top-mid': '┬',
      'top-left': '┌',
      'top-right': '┐',
      bottom: '─',
      'bottom-mid': '┴',
      'bottom-left': '└',
      'bottom-right': '┘',
      left: '│',
      'left-mid': '├',
      mid: '─',
      'mid-mid': '┼',
      right: '│',
      'right-mid': '┤',
      middle: '│',
    },
    truncate: '…',
    colWidths: [],
    rowHeights: [],
    colAligns: [],
    rowAligns: [],
    style: {
      'padding-left': 1,
      'padding-right': 1,
      head: ['red'],
      border: ['grey'],
      compact: false,
    },
    head: [],
  };
}

function mergeOptions(options, defaults) {
  options = options || {};
  defaults = defaults || defaultOptions$1();
  let ret = Object.assign({}, defaults, options);
  ret.chars = Object.assign({}, defaults.chars, options.chars);
  ret.style = Object.assign({}, defaults.style, options.style);
  return ret;
}

// Wrap on word boundary
function wordWrap(maxLength, input) {
  let lines = [];
  let split = input.split(/(\s+)/g);
  let line = [];
  let lineLength = 0;
  let whitespace;
  for (let i = 0; i < split.length; i += 2) {
    let word = split[i];
    let newLength = lineLength + strlen(word);
    if (lineLength > 0 && whitespace) {
      newLength += whitespace.length;
    }
    if (newLength > maxLength) {
      if (lineLength !== 0) {
        lines.push(line.join(''));
      }
      line = [word];
      lineLength = strlen(word);
    } else {
      line.push(whitespace || '', word);
      lineLength = newLength;
    }
    whitespace = split[i + 1];
  }
  if (lineLength) {
    lines.push(line.join(''));
  }
  return lines;
}

// Wrap text (ignoring word boundaries)
function textWrap(maxLength, input) {
  let lines = [];
  let line = '';
  function pushLine(str, ws) {
    if (line.length && ws) line += ws;
    line += str;
    while (line.length > maxLength) {
      lines.push(line.slice(0, maxLength));
      line = line.slice(maxLength);
    }
  }
  let split = input.split(/(\s+)/g);
  for (let i = 0; i < split.length; i += 2) {
    pushLine(split[i], i && split[i - 1]);
  }
  if (line.length) lines.push(line);
  return lines;
}

function multiLineWordWrap(maxLength, input, wrapOnWordBoundary = true) {
  let output = [];
  input = input.split('\n');
  const handler = wrapOnWordBoundary ? wordWrap : textWrap;
  for (let i = 0; i < input.length; i++) {
    output.push.apply(output, handler(maxLength, input[i]));
  }
  return output;
}

function colorizeLines(input) {
  let state = {};
  let output = [];
  for (let i = 0; i < input.length; i++) {
    let line = rewindState(state, input[i]);
    state = readState(line);
    let temp = Object.assign({}, state);
    output.push(unwindState(temp, line));
  }
  return output;
}

/**
 * Credit: Matheus Sampaio https://github.com/matheussampaio
 */
function hyperlink(url, text) {
  const OSC = '\u001B]';
  const BEL = '\u0007';
  const SEP = ';';

  return [OSC, '8', SEP, SEP, url || text, BEL, text, OSC, '8', SEP, SEP, BEL].join('');
}

var utils$2 = {
  strlen: strlen,
  repeat: repeat$1,
  pad: pad,
  truncate: truncate,
  mergeOptions: mergeOptions,
  wordWrap: multiLineWordWrap,
  colorizeLines: colorizeLines,
  hyperlink,
};

var layoutManager = {exports: {}};

var cell = {exports: {}};

var safe = {exports: {}};

var colors$3 = {exports: {}};

var styles$2 = {exports: {}};

/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var hasRequiredStyles;

function requireStyles () {
	if (hasRequiredStyles) return styles$2.exports;
	hasRequiredStyles = 1;
	(function (module) {
		var styles = {};
		module['exports'] = styles;

		var codes = {
		  reset: [0, 0],

		  bold: [1, 22],
		  dim: [2, 22],
		  italic: [3, 23],
		  underline: [4, 24],
		  inverse: [7, 27],
		  hidden: [8, 28],
		  strikethrough: [9, 29],

		  black: [30, 39],
		  red: [31, 39],
		  green: [32, 39],
		  yellow: [33, 39],
		  blue: [34, 39],
		  magenta: [35, 39],
		  cyan: [36, 39],
		  white: [37, 39],
		  gray: [90, 39],
		  grey: [90, 39],

		  brightRed: [91, 39],
		  brightGreen: [92, 39],
		  brightYellow: [93, 39],
		  brightBlue: [94, 39],
		  brightMagenta: [95, 39],
		  brightCyan: [96, 39],
		  brightWhite: [97, 39],

		  bgBlack: [40, 49],
		  bgRed: [41, 49],
		  bgGreen: [42, 49],
		  bgYellow: [43, 49],
		  bgBlue: [44, 49],
		  bgMagenta: [45, 49],
		  bgCyan: [46, 49],
		  bgWhite: [47, 49],
		  bgGray: [100, 49],
		  bgGrey: [100, 49],

		  bgBrightRed: [101, 49],
		  bgBrightGreen: [102, 49],
		  bgBrightYellow: [103, 49],
		  bgBrightBlue: [104, 49],
		  bgBrightMagenta: [105, 49],
		  bgBrightCyan: [106, 49],
		  bgBrightWhite: [107, 49],

		  // legacy styles for colors pre v1.0.0
		  blackBG: [40, 49],
		  redBG: [41, 49],
		  greenBG: [42, 49],
		  yellowBG: [43, 49],
		  blueBG: [44, 49],
		  magentaBG: [45, 49],
		  cyanBG: [46, 49],
		  whiteBG: [47, 49],

		};

		Object.keys(codes).forEach(function(key) {
		  var val = codes[key];
		  var style = styles[key] = [];
		  style.open = '\u001b[' + val[0] + 'm';
		  style.close = '\u001b[' + val[1] + 'm';
		});
} (styles$2));
	return styles$2.exports;
}

/*
MIT License

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var hasFlag$2;
var hasRequiredHasFlag;

function requireHasFlag () {
	if (hasRequiredHasFlag) return hasFlag$2;
	hasRequiredHasFlag = 1;

	hasFlag$2 = function(flag, argv) {
	  argv = argv || process.argv;

	  var terminatorPos = argv.indexOf('--');
	  var prefix = /^-{1,2}/.test(flag) ? '' : '--';
	  var pos = argv.indexOf(prefix + flag);

	  return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
	};
	return hasFlag$2;
}

/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var supportsColors;
var hasRequiredSupportsColors;

function requireSupportsColors () {
	if (hasRequiredSupportsColors) return supportsColors;
	hasRequiredSupportsColors = 1;

	var os = require$$0__default["default"];
	var hasFlag = requireHasFlag();

	var env = process.env;

	var forceColor = void 0;
	if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false')) {
	  forceColor = false;
	} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true')
	           || hasFlag('color=always')) {
	  forceColor = true;
	}
	if ('FORCE_COLOR' in env) {
	  forceColor = env.FORCE_COLOR.length === 0
	    || parseInt(env.FORCE_COLOR, 10) !== 0;
	}

	function translateLevel(level) {
	  if (level === 0) {
	    return false;
	  }

	  return {
	    level: level,
	    hasBasic: true,
	    has256: level >= 2,
	    has16m: level >= 3,
	  };
	}

	function supportsColor(stream) {
	  if (forceColor === false) {
	    return 0;
	  }

	  if (hasFlag('color=16m') || hasFlag('color=full')
	      || hasFlag('color=truecolor')) {
	    return 3;
	  }

	  if (hasFlag('color=256')) {
	    return 2;
	  }

	  if (stream && !stream.isTTY && forceColor !== true) {
	    return 0;
	  }

	  var min = forceColor ? 1 : 0;

	  if (process.platform === 'win32') {
	    // Node.js 7.5.0 is the first version of Node.js to include a patch to
	    // libuv that enables 256 color output on Windows. Anything earlier and it
	    // won't work. However, here we target Node.js 8 at minimum as it is an LTS
	    // release, and Node.js 7 is not. Windows 10 build 10586 is the first
	    // Windows release that supports 256 colors. Windows 10 build 14931 is the
	    // first release that supports 16m/TrueColor.
	    var osRelease = os.release().split('.');
	    if (Number(process.versions.node.split('.')[0]) >= 8
	        && Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
	      return Number(osRelease[2]) >= 14931 ? 3 : 2;
	    }

	    return 1;
	  }

	  if ('CI' in env) {
	    if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(function(sign) {
	      return sign in env;
	    }) || env.CI_NAME === 'codeship') {
	      return 1;
	    }

	    return min;
	  }

	  if ('TEAMCITY_VERSION' in env) {
	    return (/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0
	    );
	  }

	  if ('TERM_PROGRAM' in env) {
	    var version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

	    switch (env.TERM_PROGRAM) {
	      case 'iTerm.app':
	        return version >= 3 ? 3 : 2;
	      case 'Hyper':
	        return 3;
	      case 'Apple_Terminal':
	        return 2;
	      // No default
	    }
	  }

	  if (/-256(color)?$/i.test(env.TERM)) {
	    return 2;
	  }

	  if (/^screen|^xterm|^vt100|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
	    return 1;
	  }

	  if ('COLORTERM' in env) {
	    return 1;
	  }

	  if (env.TERM === 'dumb') {
	    return min;
	  }

	  return min;
	}

	function getSupportLevel(stream) {
	  var level = supportsColor(stream);
	  return translateLevel(level);
	}

	supportsColors = {
	  supportsColor: getSupportLevel,
	  stdout: getSupportLevel(process.stdout),
	  stderr: getSupportLevel(process.stderr),
	};
	return supportsColors;
}

var trap = {exports: {}};

var hasRequiredTrap;

function requireTrap () {
	if (hasRequiredTrap) return trap.exports;
	hasRequiredTrap = 1;
	(function (module) {
		module['exports'] = function runTheTrap(text, options) {
		  var result = '';
		  text = text || 'Run the trap, drop the bass';
		  text = text.split('');
		  var trap = {
		    a: ['\u0040', '\u0104', '\u023a', '\u0245', '\u0394', '\u039b', '\u0414'],
		    b: ['\u00df', '\u0181', '\u0243', '\u026e', '\u03b2', '\u0e3f'],
		    c: ['\u00a9', '\u023b', '\u03fe'],
		    d: ['\u00d0', '\u018a', '\u0500', '\u0501', '\u0502', '\u0503'],
		    e: ['\u00cb', '\u0115', '\u018e', '\u0258', '\u03a3', '\u03be', '\u04bc',
		      '\u0a6c'],
		    f: ['\u04fa'],
		    g: ['\u0262'],
		    h: ['\u0126', '\u0195', '\u04a2', '\u04ba', '\u04c7', '\u050a'],
		    i: ['\u0f0f'],
		    j: ['\u0134'],
		    k: ['\u0138', '\u04a0', '\u04c3', '\u051e'],
		    l: ['\u0139'],
		    m: ['\u028d', '\u04cd', '\u04ce', '\u0520', '\u0521', '\u0d69'],
		    n: ['\u00d1', '\u014b', '\u019d', '\u0376', '\u03a0', '\u048a'],
		    o: ['\u00d8', '\u00f5', '\u00f8', '\u01fe', '\u0298', '\u047a', '\u05dd',
		      '\u06dd', '\u0e4f'],
		    p: ['\u01f7', '\u048e'],
		    q: ['\u09cd'],
		    r: ['\u00ae', '\u01a6', '\u0210', '\u024c', '\u0280', '\u042f'],
		    s: ['\u00a7', '\u03de', '\u03df', '\u03e8'],
		    t: ['\u0141', '\u0166', '\u0373'],
		    u: ['\u01b1', '\u054d'],
		    v: ['\u05d8'],
		    w: ['\u0428', '\u0460', '\u047c', '\u0d70'],
		    x: ['\u04b2', '\u04fe', '\u04fc', '\u04fd'],
		    y: ['\u00a5', '\u04b0', '\u04cb'],
		    z: ['\u01b5', '\u0240'],
		  };
		  text.forEach(function(c) {
		    c = c.toLowerCase();
		    var chars = trap[c] || [' '];
		    var rand = Math.floor(Math.random() * chars.length);
		    if (typeof trap[c] !== 'undefined') {
		      result += trap[c][rand];
		    } else {
		      result += c;
		    }
		  });
		  return result;
		};
} (trap));
	return trap.exports;
}

var zalgo = {exports: {}};

var hasRequiredZalgo;

function requireZalgo () {
	if (hasRequiredZalgo) return zalgo.exports;
	hasRequiredZalgo = 1;
	(function (module) {
		// please no
		module['exports'] = function zalgo(text, options) {
		  text = text || '   he is here   ';
		  var soul = {
		    'up': [
		      '̍', '̎', '̄', '̅',
		      '̿', '̑', '̆', '̐',
		      '͒', '͗', '͑', '̇',
		      '̈', '̊', '͂', '̓',
		      '̈', '͊', '͋', '͌',
		      '̃', '̂', '̌', '͐',
		      '̀', '́', '̋', '̏',
		      '̒', '̓', '̔', '̽',
		      '̉', 'ͣ', 'ͤ', 'ͥ',
		      'ͦ', 'ͧ', 'ͨ', 'ͩ',
		      'ͪ', 'ͫ', 'ͬ', 'ͭ',
		      'ͮ', 'ͯ', '̾', '͛',
		      '͆', '̚',
		    ],
		    'down': [
		      '̖', '̗', '̘', '̙',
		      '̜', '̝', '̞', '̟',
		      '̠', '̤', '̥', '̦',
		      '̩', '̪', '̫', '̬',
		      '̭', '̮', '̯', '̰',
		      '̱', '̲', '̳', '̹',
		      '̺', '̻', '̼', 'ͅ',
		      '͇', '͈', '͉', '͍',
		      '͎', '͓', '͔', '͕',
		      '͖', '͙', '͚', '̣',
		    ],
		    'mid': [
		      '̕', '̛', '̀', '́',
		      '͘', '̡', '̢', '̧',
		      '̨', '̴', '̵', '̶',
		      '͜', '͝', '͞',
		      '͟', '͠', '͢', '̸',
		      '̷', '͡', ' ҉',
		    ],
		  };
		  var all = [].concat(soul.up, soul.down, soul.mid);

		  function randomNumber(range) {
		    var r = Math.floor(Math.random() * range);
		    return r;
		  }

		  function isChar(character) {
		    var bool = false;
		    all.filter(function(i) {
		      bool = (i === character);
		    });
		    return bool;
		  }


		  function heComes(text, options) {
		    var result = '';
		    var counts;
		    var l;
		    options = options || {};
		    options['up'] =
		      typeof options['up'] !== 'undefined' ? options['up'] : true;
		    options['mid'] =
		      typeof options['mid'] !== 'undefined' ? options['mid'] : true;
		    options['down'] =
		      typeof options['down'] !== 'undefined' ? options['down'] : true;
		    options['size'] =
		      typeof options['size'] !== 'undefined' ? options['size'] : 'maxi';
		    text = text.split('');
		    for (l in text) {
		      if (isChar(l)) {
		        continue;
		      }
		      result = result + text[l];
		      counts = {'up': 0, 'down': 0, 'mid': 0};
		      switch (options.size) {
		        case 'mini':
		          counts.up = randomNumber(8);
		          counts.mid = randomNumber(2);
		          counts.down = randomNumber(8);
		          break;
		        case 'maxi':
		          counts.up = randomNumber(16) + 3;
		          counts.mid = randomNumber(4) + 1;
		          counts.down = randomNumber(64) + 3;
		          break;
		        default:
		          counts.up = randomNumber(8) + 1;
		          counts.mid = randomNumber(6) / 2;
		          counts.down = randomNumber(8) + 1;
		          break;
		      }

		      var arr = ['up', 'mid', 'down'];
		      for (var d in arr) {
		        var index = arr[d];
		        for (var i = 0; i <= counts[index]; i++) {
		          if (options[index]) {
		            result = result + soul[index][randomNumber(soul[index].length)];
		          }
		        }
		      }
		    }
		    return result;
		  }
		  // don't summon him
		  return heComes(text, options);
		};
} (zalgo));
	return zalgo.exports;
}

var america = {exports: {}};

var hasRequiredAmerica;

function requireAmerica () {
	if (hasRequiredAmerica) return america.exports;
	hasRequiredAmerica = 1;
	(function (module) {
		module['exports'] = function(colors) {
		  return function(letter, i, exploded) {
		    if (letter === ' ') return letter;
		    switch (i%3) {
		      case 0: return colors.red(letter);
		      case 1: return colors.white(letter);
		      case 2: return colors.blue(letter);
		    }
		  };
		};
} (america));
	return america.exports;
}

var zebra = {exports: {}};

var hasRequiredZebra;

function requireZebra () {
	if (hasRequiredZebra) return zebra.exports;
	hasRequiredZebra = 1;
	(function (module) {
		module['exports'] = function(colors) {
		  return function(letter, i, exploded) {
		    return i % 2 === 0 ? letter : colors.inverse(letter);
		  };
		};
} (zebra));
	return zebra.exports;
}

var rainbow$1 = {exports: {}};

var hasRequiredRainbow;

function requireRainbow () {
	if (hasRequiredRainbow) return rainbow$1.exports;
	hasRequiredRainbow = 1;
	(function (module) {
		module['exports'] = function(colors) {
		  // RoY G BiV
		  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta'];
		  return function(letter, i, exploded) {
		    if (letter === ' ') {
		      return letter;
		    } else {
		      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
		    }
		  };
		};
} (rainbow$1));
	return rainbow$1.exports;
}

var random = {exports: {}};

var hasRequiredRandom;

function requireRandom () {
	if (hasRequiredRandom) return random.exports;
	hasRequiredRandom = 1;
	(function (module) {
		module['exports'] = function(colors) {
		  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green',
		    'blue', 'white', 'cyan', 'magenta', 'brightYellow', 'brightRed',
		    'brightGreen', 'brightBlue', 'brightWhite', 'brightCyan', 'brightMagenta'];
		  return function(letter, i, exploded) {
		    return letter === ' ' ? letter :
		      colors[
		          available[Math.round(Math.random() * (available.length - 2))]
		      ](letter);
		  };
		};
} (random));
	return random.exports;
}

/*

The MIT License (MIT)

Original Library
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var hasRequiredColors;

function requireColors () {
	if (hasRequiredColors) return colors$3.exports;
	hasRequiredColors = 1;
	(function (module) {
		var colors = {};
		module['exports'] = colors;

		colors.themes = {};

		var util = require$$0__default$1["default"];
		var ansiStyles = colors.styles = requireStyles();
		var defineProps = Object.defineProperties;
		var newLineRegex = new RegExp(/[\r\n]+/g);

		colors.supportsColor = requireSupportsColors().supportsColor;

		if (typeof colors.enabled === 'undefined') {
		  colors.enabled = colors.supportsColor() !== false;
		}

		colors.enable = function() {
		  colors.enabled = true;
		};

		colors.disable = function() {
		  colors.enabled = false;
		};

		colors.stripColors = colors.strip = function(str) {
		  return ('' + str).replace(/\x1B\[\d+m/g, '');
		};

		// eslint-disable-next-line no-unused-vars
		colors.stylize = function stylize(str, style) {
		  if (!colors.enabled) {
		    return str+'';
		  }

		  var styleMap = ansiStyles[style];

		  // Stylize should work for non-ANSI styles, too
		  if (!styleMap && style in colors) {
		    // Style maps like trap operate as functions on strings;
		    // they don't have properties like open or close.
		    return colors[style](str);
		  }

		  return styleMap.open + str + styleMap.close;
		};

		var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
		var escapeStringRegexp = function(str) {
		  if (typeof str !== 'string') {
		    throw new TypeError('Expected a string');
		  }
		  return str.replace(matchOperatorsRe, '\\$&');
		};

		function build(_styles) {
		  var builder = function builder() {
		    return applyStyle.apply(builder, arguments);
		  };
		  builder._styles = _styles;
		  // __proto__ is used because we must return a function, but there is
		  // no way to create a function with a different prototype.
		  builder.__proto__ = proto;
		  return builder;
		}

		var styles = (function() {
		  var ret = {};
		  ansiStyles.grey = ansiStyles.gray;
		  Object.keys(ansiStyles).forEach(function(key) {
		    ansiStyles[key].closeRe =
		      new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
		    ret[key] = {
		      get: function() {
		        return build(this._styles.concat(key));
		      },
		    };
		  });
		  return ret;
		})();

		var proto = defineProps(function colors() {}, styles);

		function applyStyle() {
		  var args = Array.prototype.slice.call(arguments);

		  var str = args.map(function(arg) {
		    // Use weak equality check so we can colorize null/undefined in safe mode
		    if (arg != null && arg.constructor === String) {
		      return arg;
		    } else {
		      return util.inspect(arg);
		    }
		  }).join(' ');

		  if (!colors.enabled || !str) {
		    return str;
		  }

		  var newLinesPresent = str.indexOf('\n') != -1;

		  var nestedStyles = this._styles;

		  var i = nestedStyles.length;
		  while (i--) {
		    var code = ansiStyles[nestedStyles[i]];
		    str = code.open + str.replace(code.closeRe, code.open) + code.close;
		    if (newLinesPresent) {
		      str = str.replace(newLineRegex, function(match) {
		        return code.close + match + code.open;
		      });
		    }
		  }

		  return str;
		}

		colors.setTheme = function(theme) {
		  if (typeof theme === 'string') {
		    console.log('colors.setTheme now only accepts an object, not a string.  ' +
		      'If you are trying to set a theme from a file, it is now your (the ' +
		      'caller\'s) responsibility to require the file.  The old syntax ' +
		      'looked like colors.setTheme(__dirname + ' +
		      '\'/../themes/generic-logging.js\'); The new syntax looks like '+
		      'colors.setTheme(require(__dirname + ' +
		      '\'/../themes/generic-logging.js\'));');
		    return;
		  }
		  for (var style in theme) {
		    (function(style) {
		      colors[style] = function(str) {
		        if (typeof theme[style] === 'object') {
		          var out = str;
		          for (var i in theme[style]) {
		            out = colors[theme[style][i]](out);
		          }
		          return out;
		        }
		        return colors[theme[style]](str);
		      };
		    })(style);
		  }
		};

		function init() {
		  var ret = {};
		  Object.keys(styles).forEach(function(name) {
		    ret[name] = {
		      get: function() {
		        return build([name]);
		      },
		    };
		  });
		  return ret;
		}

		var sequencer = function sequencer(map, str) {
		  var exploded = str.split('');
		  exploded = exploded.map(map);
		  return exploded.join('');
		};

		// custom formatter methods
		colors.trap = requireTrap();
		colors.zalgo = requireZalgo();

		// maps
		colors.maps = {};
		colors.maps.america = requireAmerica()(colors);
		colors.maps.zebra = requireZebra()(colors);
		colors.maps.rainbow = requireRainbow()(colors);
		colors.maps.random = requireRandom()(colors);

		for (var map in colors.maps) {
		  (function(map) {
		    colors[map] = function(str) {
		      return sequencer(colors.maps[map], str);
		    };
		  })(map);
		}

		defineProps(colors, init());
} (colors$3));
	return colors$3.exports;
}

var hasRequiredSafe;

function requireSafe () {
	if (hasRequiredSafe) return safe.exports;
	hasRequiredSafe = 1;
	(function (module) {
		//
		// Remark: Requiring this file will use the "safe" colors API,
		// which will not touch String.prototype.
		//
		//   var colors = require('colors/safe');
		//   colors.red("foo")
		//
		//
		var colors = requireColors();
		module['exports'] = colors;
} (safe));
	return safe.exports;
}

const { info, debug: debug$2 } = debug_1;
const utils$1 = utils$2;

class Cell$1 {
  /**
   * A representation of a cell within the table.
   * Implementations must have `init` and `draw` methods,
   * as well as `colSpan`, `rowSpan`, `desiredHeight` and `desiredWidth` properties.
   * @param options
   * @constructor
   */
  constructor(options) {
    this.setOptions(options);

    /**
     * Each cell will have it's `x` and `y` values set by the `layout-manager` prior to
     * `init` being called;
     * @type {Number}
     */
    this.x = null;
    this.y = null;
  }

  setOptions(options) {
    if (['boolean', 'number', 'string'].indexOf(typeof options) !== -1) {
      options = { content: '' + options };
    }
    options = options || {};
    this.options = options;
    let content = options.content;
    if (['boolean', 'number', 'string'].indexOf(typeof content) !== -1) {
      this.content = String(content);
    } else if (!content) {
      this.content = this.options.href || '';
    } else {
      throw new Error('Content needs to be a primitive, got: ' + typeof content);
    }
    this.colSpan = options.colSpan || 1;
    this.rowSpan = options.rowSpan || 1;
    if (this.options.href) {
      Object.defineProperty(this, 'href', {
        get() {
          return this.options.href;
        },
      });
    }
  }

  mergeTableOptions(tableOptions, cells) {
    this.cells = cells;

    let optionsChars = this.options.chars || {};
    let tableChars = tableOptions.chars;
    let chars = (this.chars = {});
    CHAR_NAMES.forEach(function (name) {
      setOption(optionsChars, tableChars, name, chars);
    });

    this.truncate = this.options.truncate || tableOptions.truncate;

    let style = (this.options.style = this.options.style || {});
    let tableStyle = tableOptions.style;
    setOption(style, tableStyle, 'padding-left', this);
    setOption(style, tableStyle, 'padding-right', this);
    this.head = style.head || tableStyle.head;
    this.border = style.border || tableStyle.border;

    this.fixedWidth = tableOptions.colWidths[this.x];
    this.lines = this.computeLines(tableOptions);

    this.desiredWidth = utils$1.strlen(this.content) + this.paddingLeft + this.paddingRight;
    this.desiredHeight = this.lines.length;
  }

  computeLines(tableOptions) {
    const tableWordWrap = tableOptions.wordWrap || tableOptions.textWrap;
    const { wordWrap = tableWordWrap } = this.options;
    if (this.fixedWidth && wordWrap) {
      this.fixedWidth -= this.paddingLeft + this.paddingRight;
      if (this.colSpan) {
        let i = 1;
        while (i < this.colSpan) {
          this.fixedWidth += tableOptions.colWidths[this.x + i];
          i++;
        }
      }
      const { wrapOnWordBoundary: tableWrapOnWordBoundary = true } = tableOptions;
      const { wrapOnWordBoundary = tableWrapOnWordBoundary } = this.options;
      return this.wrapLines(utils$1.wordWrap(this.fixedWidth, this.content, wrapOnWordBoundary));
    }
    return this.wrapLines(this.content.split('\n'));
  }

  wrapLines(computedLines) {
    const lines = utils$1.colorizeLines(computedLines);
    if (this.href) {
      return lines.map((line) => utils$1.hyperlink(this.href, line));
    }
    return lines;
  }

  /**
   * Initializes the Cells data structure.
   *
   * @param tableOptions - A fully populated set of tableOptions.
   * In addition to the standard default values, tableOptions must have fully populated the
   * `colWidths` and `rowWidths` arrays. Those arrays must have lengths equal to the number
   * of columns or rows (respectively) in this table, and each array item must be a Number.
   *
   */
  init(tableOptions) {
    let x = this.x;
    let y = this.y;
    this.widths = tableOptions.colWidths.slice(x, x + this.colSpan);
    this.heights = tableOptions.rowHeights.slice(y, y + this.rowSpan);
    this.width = this.widths.reduce(sumPlusOne, -1);
    this.height = this.heights.reduce(sumPlusOne, -1);

    this.hAlign = this.options.hAlign || tableOptions.colAligns[x];
    this.vAlign = this.options.vAlign || tableOptions.rowAligns[y];

    this.drawRight = x + this.colSpan == tableOptions.colWidths.length;
  }

  /**
   * Draws the given line of the cell.
   * This default implementation defers to methods `drawTop`, `drawBottom`, `drawLine` and `drawEmpty`.
   * @param lineNum - can be `top`, `bottom` or a numerical line number.
   * @param spanningCell - will be a number if being called from a RowSpanCell, and will represent how
   * many rows below it's being called from. Otherwise it's undefined.
   * @returns {String} The representation of this line.
   */
  draw(lineNum, spanningCell) {
    if (lineNum == 'top') return this.drawTop(this.drawRight);
    if (lineNum == 'bottom') return this.drawBottom(this.drawRight);
    let content = utils$1.truncate(this.content, 10, this.truncate);
    if (!lineNum) {
      info(`${this.y}-${this.x}: ${this.rowSpan - lineNum}x${this.colSpan} Cell ${content}`);
    }
    let padLen = Math.max(this.height - this.lines.length, 0);
    let padTop;
    switch (this.vAlign) {
      case 'center':
        padTop = Math.ceil(padLen / 2);
        break;
      case 'bottom':
        padTop = padLen;
        break;
      default:
        padTop = 0;
    }
    if (lineNum < padTop || lineNum >= padTop + this.lines.length) {
      return this.drawEmpty(this.drawRight, spanningCell);
    }
    let forceTruncation = this.lines.length > this.height && lineNum + 1 >= this.height;
    return this.drawLine(lineNum - padTop, this.drawRight, forceTruncation, spanningCell);
  }

  /**
   * Renders the top line of the cell.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @returns {String}
   */
  drawTop(drawRight) {
    let content = [];
    if (this.cells) {
      //TODO: cells should always exist - some tests don't fill it in though
      this.widths.forEach(function (width, index) {
        content.push(this._topLeftChar(index));
        content.push(utils$1.repeat(this.chars[this.y == 0 ? 'top' : 'mid'], width));
      }, this);
    } else {
      content.push(this._topLeftChar(0));
      content.push(utils$1.repeat(this.chars[this.y == 0 ? 'top' : 'mid'], this.width));
    }
    if (drawRight) {
      content.push(this.chars[this.y == 0 ? 'topRight' : 'rightMid']);
    }
    return this.wrapWithStyleColors('border', content.join(''));
  }

  _topLeftChar(offset) {
    let x = this.x + offset;
    let leftChar;
    if (this.y == 0) {
      leftChar = x == 0 ? 'topLeft' : offset == 0 ? 'topMid' : 'top';
    } else {
      if (x == 0) {
        leftChar = 'leftMid';
      } else {
        leftChar = offset == 0 ? 'midMid' : 'bottomMid';
        if (this.cells) {
          //TODO: cells should always exist - some tests don't fill it in though
          let spanAbove = this.cells[this.y - 1][x] instanceof Cell$1.ColSpanCell;
          if (spanAbove) {
            leftChar = offset == 0 ? 'topMid' : 'mid';
          }
          if (offset == 0) {
            let i = 1;
            while (this.cells[this.y][x - i] instanceof Cell$1.ColSpanCell) {
              i++;
            }
            if (this.cells[this.y][x - i] instanceof Cell$1.RowSpanCell) {
              leftChar = 'leftMid';
            }
          }
        }
      }
    }
    return this.chars[leftChar];
  }

  wrapWithStyleColors(styleProperty, content) {
    if (this[styleProperty] && this[styleProperty].length) {
      try {
        let colors = requireSafe();
        for (let i = this[styleProperty].length - 1; i >= 0; i--) {
          colors = colors[this[styleProperty][i]];
        }
        return colors(content);
      } catch (e) {
        return content;
      }
    } else {
      return content;
    }
  }

  /**
   * Renders a line of text.
   * @param lineNum - Which line of text to render. This is not necessarily the line within the cell.
   * There may be top-padding above the first line of text.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @param forceTruncationSymbol - `true` if the rendered text should end with the truncation symbol even
   * if the text fits. This is used when the cell is vertically truncated. If `false` the text should
   * only include the truncation symbol if the text will not fit horizontally within the cell width.
   * @param spanningCell - a number of if being called from a RowSpanCell. (how many rows below). otherwise undefined.
   * @returns {String}
   */
  drawLine(lineNum, drawRight, forceTruncationSymbol, spanningCell) {
    let left = this.chars[this.x == 0 ? 'left' : 'middle'];
    if (this.x && spanningCell && this.cells) {
      let cellLeft = this.cells[this.y + spanningCell][this.x - 1];
      while (cellLeft instanceof ColSpanCell$1) {
        cellLeft = this.cells[cellLeft.y][cellLeft.x - 1];
      }
      if (!(cellLeft instanceof RowSpanCell$1)) {
        left = this.chars['rightMid'];
      }
    }
    let leftPadding = utils$1.repeat(' ', this.paddingLeft);
    let right = drawRight ? this.chars['right'] : '';
    let rightPadding = utils$1.repeat(' ', this.paddingRight);
    let line = this.lines[lineNum];
    let len = this.width - (this.paddingLeft + this.paddingRight);
    if (forceTruncationSymbol) line += this.truncate || '…';
    let content = utils$1.truncate(line, len, this.truncate);
    content = utils$1.pad(content, len, ' ', this.hAlign);
    content = leftPadding + content + rightPadding;
    return this.stylizeLine(left, content, right);
  }

  stylizeLine(left, content, right) {
    left = this.wrapWithStyleColors('border', left);
    right = this.wrapWithStyleColors('border', right);
    if (this.y === 0) {
      content = this.wrapWithStyleColors('head', content);
    }
    return left + content + right;
  }

  /**
   * Renders the bottom line of the cell.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @returns {String}
   */
  drawBottom(drawRight) {
    let left = this.chars[this.x == 0 ? 'bottomLeft' : 'bottomMid'];
    let content = utils$1.repeat(this.chars.bottom, this.width);
    let right = drawRight ? this.chars['bottomRight'] : '';
    return this.wrapWithStyleColors('border', left + content + right);
  }

  /**
   * Renders a blank line of text within the cell. Used for top and/or bottom padding.
   * @param drawRight - true if this method should render the right edge of the cell.
   * @param spanningCell - a number of if being called from a RowSpanCell. (how many rows below). otherwise undefined.
   * @returns {String}
   */
  drawEmpty(drawRight, spanningCell) {
    let left = this.chars[this.x == 0 ? 'left' : 'middle'];
    if (this.x && spanningCell && this.cells) {
      let cellLeft = this.cells[this.y + spanningCell][this.x - 1];
      while (cellLeft instanceof ColSpanCell$1) {
        cellLeft = this.cells[cellLeft.y][cellLeft.x - 1];
      }
      if (!(cellLeft instanceof RowSpanCell$1)) {
        left = this.chars['rightMid'];
      }
    }
    let right = drawRight ? this.chars['right'] : '';
    let content = utils$1.repeat(' ', this.width);
    return this.stylizeLine(left, content, right);
  }
}

class ColSpanCell$1 {
  /**
   * A Cell that doesn't do anything. It just draws empty lines.
   * Used as a placeholder in column spanning.
   * @constructor
   */
  constructor() {}

  draw(lineNum) {
    if (typeof lineNum === 'number') {
      debug$2(`${this.y}-${this.x}: 1x1 ColSpanCell`);
    }
    return '';
  }

  init() {}

  mergeTableOptions() {}
}

class RowSpanCell$1 {
  /**
   * A placeholder Cell for a Cell that spans multiple rows.
   * It delegates rendering to the original cell, but adds the appropriate offset.
   * @param originalCell
   * @constructor
   */
  constructor(originalCell) {
    this.originalCell = originalCell;
  }

  init(tableOptions) {
    let y = this.y;
    let originalY = this.originalCell.y;
    this.cellOffset = y - originalY;
    this.offset = findDimension(tableOptions.rowHeights, originalY, this.cellOffset);
  }

  draw(lineNum) {
    if (lineNum == 'top') {
      return this.originalCell.draw(this.offset, this.cellOffset);
    }
    if (lineNum == 'bottom') {
      return this.originalCell.draw('bottom');
    }
    debug$2(`${this.y}-${this.x}: 1x${this.colSpan} RowSpanCell for ${this.originalCell.content}`);
    return this.originalCell.draw(this.offset + 1 + lineNum);
  }

  mergeTableOptions() {}
}

function firstDefined(...args) {
  return args.filter((v) => v !== undefined && v !== null).shift();
}

// HELPER FUNCTIONS
function setOption(objA, objB, nameB, targetObj) {
  let nameA = nameB.split('-');
  if (nameA.length > 1) {
    nameA[1] = nameA[1].charAt(0).toUpperCase() + nameA[1].substr(1);
    nameA = nameA.join('');
    targetObj[nameA] = firstDefined(objA[nameA], objA[nameB], objB[nameA], objB[nameB]);
  } else {
    targetObj[nameB] = firstDefined(objA[nameB], objB[nameB]);
  }
}

function findDimension(dimensionTable, startingIndex, span) {
  let ret = dimensionTable[startingIndex];
  for (let i = 1; i < span; i++) {
    ret += 1 + dimensionTable[startingIndex + i];
  }
  return ret;
}

function sumPlusOne(a, b) {
  return a + b + 1;
}

let CHAR_NAMES = [
  'top',
  'top-mid',
  'top-left',
  'top-right',
  'bottom',
  'bottom-mid',
  'bottom-left',
  'bottom-right',
  'left',
  'left-mid',
  'mid',
  'mid-mid',
  'right',
  'right-mid',
  'middle',
];

cell.exports = Cell$1;
cell.exports.ColSpanCell = ColSpanCell$1;
cell.exports.RowSpanCell = RowSpanCell$1;

const { warn, debug: debug$1 } = debug_1;
const Cell = cell.exports;
const { ColSpanCell, RowSpanCell } = Cell;

(function () {
  function next(alloc, col) {
    if (alloc[col] > 0) {
      return next(alloc, col + 1);
    }
    return col;
  }

  function layoutTable(table) {
    let alloc = {};
    table.forEach(function (row, rowIndex) {
      let col = 0;
      row.forEach(function (cell) {
        cell.y = rowIndex;
        // Avoid erroneous call to next() on first row
        cell.x = rowIndex ? next(alloc, col) : col;
        const rowSpan = cell.rowSpan || 1;
        const colSpan = cell.colSpan || 1;
        if (rowSpan > 1) {
          for (let cs = 0; cs < colSpan; cs++) {
            alloc[cell.x + cs] = rowSpan;
          }
        }
        col = cell.x + colSpan;
      });
      Object.keys(alloc).forEach((idx) => {
        alloc[idx]--;
        if (alloc[idx] < 1) delete alloc[idx];
      });
    });
  }

  function maxWidth(table) {
    let mw = 0;
    table.forEach(function (row) {
      row.forEach(function (cell) {
        mw = Math.max(mw, cell.x + (cell.colSpan || 1));
      });
    });
    return mw;
  }

  function maxHeight(table) {
    return table.length;
  }

  function cellsConflict(cell1, cell2) {
    let yMin1 = cell1.y;
    let yMax1 = cell1.y - 1 + (cell1.rowSpan || 1);
    let yMin2 = cell2.y;
    let yMax2 = cell2.y - 1 + (cell2.rowSpan || 1);
    let yConflict = !(yMin1 > yMax2 || yMin2 > yMax1);

    let xMin1 = cell1.x;
    let xMax1 = cell1.x - 1 + (cell1.colSpan || 1);
    let xMin2 = cell2.x;
    let xMax2 = cell2.x - 1 + (cell2.colSpan || 1);
    let xConflict = !(xMin1 > xMax2 || xMin2 > xMax1);

    return yConflict && xConflict;
  }

  function conflictExists(rows, x, y) {
    let i_max = Math.min(rows.length - 1, y);
    let cell = { x: x, y: y };
    for (let i = 0; i <= i_max; i++) {
      let row = rows[i];
      for (let j = 0; j < row.length; j++) {
        if (cellsConflict(cell, row[j])) {
          return true;
        }
      }
    }
    return false;
  }

  function allBlank(rows, y, xMin, xMax) {
    for (let x = xMin; x < xMax; x++) {
      if (conflictExists(rows, x, y)) {
        return false;
      }
    }
    return true;
  }

  function addRowSpanCells(table) {
    table.forEach(function (row, rowIndex) {
      row.forEach(function (cell) {
        for (let i = 1; i < cell.rowSpan; i++) {
          let rowSpanCell = new RowSpanCell(cell);
          rowSpanCell.x = cell.x;
          rowSpanCell.y = cell.y + i;
          rowSpanCell.colSpan = cell.colSpan;
          insertCell(rowSpanCell, table[rowIndex + i]);
        }
      });
    });
  }

  function addColSpanCells(cellRows) {
    for (let rowIndex = cellRows.length - 1; rowIndex >= 0; rowIndex--) {
      let cellColumns = cellRows[rowIndex];
      for (let columnIndex = 0; columnIndex < cellColumns.length; columnIndex++) {
        let cell = cellColumns[columnIndex];
        for (let k = 1; k < cell.colSpan; k++) {
          let colSpanCell = new ColSpanCell();
          colSpanCell.x = cell.x + k;
          colSpanCell.y = cell.y;
          cellColumns.splice(columnIndex + 1, 0, colSpanCell);
        }
      }
    }
  }

  function insertCell(cell, row) {
    let x = 0;
    while (x < row.length && row[x].x < cell.x) {
      x++;
    }
    row.splice(x, 0, cell);
  }

  function fillInTable(table) {
    let h_max = maxHeight(table);
    let w_max = maxWidth(table);
    debug$1(`Max rows: ${h_max}; Max cols: ${w_max}`);
    for (let y = 0; y < h_max; y++) {
      for (let x = 0; x < w_max; x++) {
        if (!conflictExists(table, x, y)) {
          let opts = { x: x, y: y, colSpan: 1, rowSpan: 1 };
          x++;
          while (x < w_max && !conflictExists(table, x, y)) {
            opts.colSpan++;
            x++;
          }
          let y2 = y + 1;
          while (y2 < h_max && allBlank(table, y2, opts.x, opts.x + opts.colSpan)) {
            opts.rowSpan++;
            y2++;
          }
          let cell = new Cell(opts);
          cell.x = opts.x;
          cell.y = opts.y;
          warn(`Missing cell at ${cell.y}-${cell.x}.`);
          insertCell(cell, table[y]);
        }
      }
    }
  }

  function generateCells(rows) {
    return rows.map(function (row) {
      if (!Array.isArray(row)) {
        let key = Object.keys(row)[0];
        row = row[key];
        if (Array.isArray(row)) {
          row = row.slice();
          row.unshift(key);
        } else {
          row = [key, row];
        }
      }
      return row.map(function (cell) {
        return new Cell(cell);
      });
    });
  }

  function makeTableLayout(rows) {
    let cellRows = generateCells(rows);
    layoutTable(cellRows);
    fillInTable(cellRows);
    addRowSpanCells(cellRows);
    addColSpanCells(cellRows);
    return cellRows;
  }

  layoutManager.exports = {
    makeTableLayout: makeTableLayout,
    layoutTable: layoutTable,
    addRowSpanCells: addRowSpanCells,
    maxWidth: maxWidth,
    fillInTable: fillInTable,
    computeWidths: makeComputeWidths('colSpan', 'desiredWidth', 'x', 1),
    computeHeights: makeComputeWidths('rowSpan', 'desiredHeight', 'y', 1),
  };
})();

function makeComputeWidths(colSpan, desiredWidth, x, forcedMin) {
  return function (vals, table) {
    let result = [];
    let spanners = [];
    let auto = {};
    table.forEach(function (row) {
      row.forEach(function (cell) {
        if ((cell[colSpan] || 1) > 1) {
          spanners.push(cell);
        } else {
          result[cell[x]] = Math.max(result[cell[x]] || 0, cell[desiredWidth] || 0, forcedMin);
        }
      });
    });

    vals.forEach(function (val, index) {
      if (typeof val === 'number') {
        result[index] = val;
      }
    });

    //spanners.forEach(function(cell){
    for (let k = spanners.length - 1; k >= 0; k--) {
      let cell = spanners[k];
      let span = cell[colSpan];
      let col = cell[x];
      let existingWidth = result[col];
      let editableCols = typeof vals[col] === 'number' ? 0 : 1;
      if (typeof existingWidth === 'number') {
        for (let i = 1; i < span; i++) {
          existingWidth += 1 + result[col + i];
          if (typeof vals[col + i] !== 'number') {
            editableCols++;
          }
        }
      } else {
        existingWidth = desiredWidth === 'desiredWidth' ? cell.desiredWidth - 1 : 1;
        if (!auto[col] || auto[col] < existingWidth) {
          auto[col] = existingWidth;
        }
      }

      if (cell[desiredWidth] > existingWidth) {
        let i = 0;
        while (editableCols > 0 && cell[desiredWidth] > existingWidth) {
          if (typeof vals[col + i] !== 'number') {
            let dif = Math.round((cell[desiredWidth] - existingWidth) / editableCols);
            existingWidth += dif;
            result[col + i] += dif;
            editableCols--;
          }
          i++;
        }
      }
    }

    Object.assign(vals, result, auto);
    for (let j = 0; j < vals.length; j++) {
      vals[j] = Math.max(forcedMin, vals[j] || 0);
    }
  };
}

const debug = debug_1;
const utils = utils$2;
const tableLayout = layoutManager.exports;

class Table$1 extends Array {
  constructor(opts) {
    super();

    const options = utils.mergeOptions(opts);
    Object.defineProperty(this, 'options', {
      value: options,
      enumerable: options.debug,
    });

    if (options.debug) {
      switch (typeof options.debug) {
        case 'boolean':
          debug.setDebugLevel(debug.WARN);
          break;
        case 'number':
          debug.setDebugLevel(options.debug);
          break;
        case 'string':
          debug.setDebugLevel(parseInt(options.debug, 10));
          break;
        default:
          debug.setDebugLevel(debug.WARN);
          debug.warn(`Debug option is expected to be boolean, number, or string. Received a ${typeof options.debug}`);
      }
      Object.defineProperty(this, 'messages', {
        get() {
          return debug.debugMessages();
        },
      });
    }
  }

  toString() {
    let array = this;
    let headersPresent = this.options.head && this.options.head.length;
    if (headersPresent) {
      array = [this.options.head];
      if (this.length) {
        array.push.apply(array, this);
      }
    } else {
      this.options.style.head = [];
    }

    let cells = tableLayout.makeTableLayout(array);

    cells.forEach(function (row) {
      row.forEach(function (cell) {
        cell.mergeTableOptions(this.options, cells);
      }, this);
    }, this);

    tableLayout.computeWidths(this.options.colWidths, cells);
    tableLayout.computeHeights(this.options.rowHeights, cells);

    cells.forEach(function (row) {
      row.forEach(function (cell) {
        cell.init(this.options);
      }, this);
    }, this);

    let result = [];

    for (let rowIndex = 0; rowIndex < cells.length; rowIndex++) {
      let row = cells[rowIndex];
      let heightOfRow = this.options.rowHeights[rowIndex];

      if (rowIndex === 0 || !this.options.style.compact || (rowIndex == 1 && headersPresent)) {
        doDraw(row, 'top', result);
      }

      for (let lineNum = 0; lineNum < heightOfRow; lineNum++) {
        doDraw(row, lineNum, result);
      }

      if (rowIndex + 1 == cells.length) {
        doDraw(row, 'bottom', result);
      }
    }

    return result.join('\n');
  }

  get width() {
    let str = this.toString().split('\n');
    return str[0].length;
  }
}

Table$1.reset = () => debug.reset();

function doDraw(row, lineNum, result) {
  let line = [];
  row.forEach(function (cell) {
    line.push(cell.draw(lineNum));
  });
  let str = line.join('');
  if (str.length) result.push(str);
}

var table = Table$1;

(function (module) {
	module.exports = table;
} (cliTable3));

var redeyed$1 = {exports: {}};

var esprima = {exports: {}};

var hasRequiredEsprima;

function requireEsprima () {
	if (hasRequiredEsprima) return esprima.exports;
	hasRequiredEsprima = 1;
	(function (module, exports) {
		(function webpackUniversalModuleDefinition(root, factory) {
		/* istanbul ignore next */
			module.exports = factory();
		})(index$1.commonjsGlobal, function() {
		return /******/ (function(modules) { // webpackBootstrap
		/******/ 	// The module cache
		/******/ 	var installedModules = {};

		/******/ 	// The require function
		/******/ 	function __webpack_require__(moduleId) {

		/******/ 		// Check if module is in cache
		/* istanbul ignore if */
		/******/ 		if(installedModules[moduleId])
		/******/ 			return installedModules[moduleId].exports;

		/******/ 		// Create a new module (and put it into the cache)
		/******/ 		var module = installedModules[moduleId] = {
		/******/ 			exports: {},
		/******/ 			id: moduleId,
		/******/ 			loaded: false
		/******/ 		};

		/******/ 		// Execute the module function
		/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

		/******/ 		// Flag the module as loaded
		/******/ 		module.loaded = true;

		/******/ 		// Return the exports of the module
		/******/ 		return module.exports;
		/******/ 	}


		/******/ 	// expose the modules object (__webpack_modules__)
		/******/ 	__webpack_require__.m = modules;

		/******/ 	// expose the module cache
		/******/ 	__webpack_require__.c = installedModules;

		/******/ 	// __webpack_public_path__
		/******/ 	__webpack_require__.p = "";

		/******/ 	// Load entry module and return exports
		/******/ 	return __webpack_require__(0);
		/******/ })
		/************************************************************************/
		/******/ ([
		/* 0 */
		/***/ function(module, exports, __webpack_require__) {
			/*
			  Copyright JS Foundation and other contributors, https://js.foundation/

			  Redistribution and use in source and binary forms, with or without
			  modification, are permitted provided that the following conditions are met:

			    * Redistributions of source code must retain the above copyright
			      notice, this list of conditions and the following disclaimer.
			    * Redistributions in binary form must reproduce the above copyright
			      notice, this list of conditions and the following disclaimer in the
			      documentation and/or other materials provided with the distribution.

			  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
			  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
			  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
			  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
			  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
			  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
			  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
			  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
			  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
			  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
			*/
			Object.defineProperty(exports, "__esModule", { value: true });
			var comment_handler_1 = __webpack_require__(1);
			var jsx_parser_1 = __webpack_require__(3);
			var parser_1 = __webpack_require__(8);
			var tokenizer_1 = __webpack_require__(15);
			function parse(code, options, delegate) {
			    var commentHandler = null;
			    var proxyDelegate = function (node, metadata) {
			        if (delegate) {
			            delegate(node, metadata);
			        }
			        if (commentHandler) {
			            commentHandler.visit(node, metadata);
			        }
			    };
			    var parserDelegate = (typeof delegate === 'function') ? proxyDelegate : null;
			    var collectComment = false;
			    if (options) {
			        collectComment = (typeof options.comment === 'boolean' && options.comment);
			        var attachComment = (typeof options.attachComment === 'boolean' && options.attachComment);
			        if (collectComment || attachComment) {
			            commentHandler = new comment_handler_1.CommentHandler();
			            commentHandler.attach = attachComment;
			            options.comment = true;
			            parserDelegate = proxyDelegate;
			        }
			    }
			    var isModule = false;
			    if (options && typeof options.sourceType === 'string') {
			        isModule = (options.sourceType === 'module');
			    }
			    var parser;
			    if (options && typeof options.jsx === 'boolean' && options.jsx) {
			        parser = new jsx_parser_1.JSXParser(code, options, parserDelegate);
			    }
			    else {
			        parser = new parser_1.Parser(code, options, parserDelegate);
			    }
			    var program = isModule ? parser.parseModule() : parser.parseScript();
			    var ast = program;
			    if (collectComment && commentHandler) {
			        ast.comments = commentHandler.comments;
			    }
			    if (parser.config.tokens) {
			        ast.tokens = parser.tokens;
			    }
			    if (parser.config.tolerant) {
			        ast.errors = parser.errorHandler.errors;
			    }
			    return ast;
			}
			exports.parse = parse;
			function parseModule(code, options, delegate) {
			    var parsingOptions = options || {};
			    parsingOptions.sourceType = 'module';
			    return parse(code, parsingOptions, delegate);
			}
			exports.parseModule = parseModule;
			function parseScript(code, options, delegate) {
			    var parsingOptions = options || {};
			    parsingOptions.sourceType = 'script';
			    return parse(code, parsingOptions, delegate);
			}
			exports.parseScript = parseScript;
			function tokenize(code, options, delegate) {
			    var tokenizer = new tokenizer_1.Tokenizer(code, options);
			    var tokens;
			    tokens = [];
			    try {
			        while (true) {
			            var token = tokenizer.getNextToken();
			            if (!token) {
			                break;
			            }
			            if (delegate) {
			                token = delegate(token);
			            }
			            tokens.push(token);
			        }
			    }
			    catch (e) {
			        tokenizer.errorHandler.tolerate(e);
			    }
			    if (tokenizer.errorHandler.tolerant) {
			        tokens.errors = tokenizer.errors();
			    }
			    return tokens;
			}
			exports.tokenize = tokenize;
			var syntax_1 = __webpack_require__(2);
			exports.Syntax = syntax_1.Syntax;
			// Sync with *.json manifests.
			exports.version = '4.0.1';


		/***/ },
		/* 1 */
		/***/ function(module, exports, __webpack_require__) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var syntax_1 = __webpack_require__(2);
			var CommentHandler = (function () {
			    function CommentHandler() {
			        this.attach = false;
			        this.comments = [];
			        this.stack = [];
			        this.leading = [];
			        this.trailing = [];
			    }
			    CommentHandler.prototype.insertInnerComments = function (node, metadata) {
			        //  innnerComments for properties empty block
			        //  `function a() {/** comments **\/}`
			        if (node.type === syntax_1.Syntax.BlockStatement && node.body.length === 0) {
			            var innerComments = [];
			            for (var i = this.leading.length - 1; i >= 0; --i) {
			                var entry = this.leading[i];
			                if (metadata.end.offset >= entry.start) {
			                    innerComments.unshift(entry.comment);
			                    this.leading.splice(i, 1);
			                    this.trailing.splice(i, 1);
			                }
			            }
			            if (innerComments.length) {
			                node.innerComments = innerComments;
			            }
			        }
			    };
			    CommentHandler.prototype.findTrailingComments = function (metadata) {
			        var trailingComments = [];
			        if (this.trailing.length > 0) {
			            for (var i = this.trailing.length - 1; i >= 0; --i) {
			                var entry_1 = this.trailing[i];
			                if (entry_1.start >= metadata.end.offset) {
			                    trailingComments.unshift(entry_1.comment);
			                }
			            }
			            this.trailing.length = 0;
			            return trailingComments;
			        }
			        var entry = this.stack[this.stack.length - 1];
			        if (entry && entry.node.trailingComments) {
			            var firstComment = entry.node.trailingComments[0];
			            if (firstComment && firstComment.range[0] >= metadata.end.offset) {
			                trailingComments = entry.node.trailingComments;
			                delete entry.node.trailingComments;
			            }
			        }
			        return trailingComments;
			    };
			    CommentHandler.prototype.findLeadingComments = function (metadata) {
			        var leadingComments = [];
			        var target;
			        while (this.stack.length > 0) {
			            var entry = this.stack[this.stack.length - 1];
			            if (entry && entry.start >= metadata.start.offset) {
			                target = entry.node;
			                this.stack.pop();
			            }
			            else {
			                break;
			            }
			        }
			        if (target) {
			            var count = target.leadingComments ? target.leadingComments.length : 0;
			            for (var i = count - 1; i >= 0; --i) {
			                var comment = target.leadingComments[i];
			                if (comment.range[1] <= metadata.start.offset) {
			                    leadingComments.unshift(comment);
			                    target.leadingComments.splice(i, 1);
			                }
			            }
			            if (target.leadingComments && target.leadingComments.length === 0) {
			                delete target.leadingComments;
			            }
			            return leadingComments;
			        }
			        for (var i = this.leading.length - 1; i >= 0; --i) {
			            var entry = this.leading[i];
			            if (entry.start <= metadata.start.offset) {
			                leadingComments.unshift(entry.comment);
			                this.leading.splice(i, 1);
			            }
			        }
			        return leadingComments;
			    };
			    CommentHandler.prototype.visitNode = function (node, metadata) {
			        if (node.type === syntax_1.Syntax.Program && node.body.length > 0) {
			            return;
			        }
			        this.insertInnerComments(node, metadata);
			        var trailingComments = this.findTrailingComments(metadata);
			        var leadingComments = this.findLeadingComments(metadata);
			        if (leadingComments.length > 0) {
			            node.leadingComments = leadingComments;
			        }
			        if (trailingComments.length > 0) {
			            node.trailingComments = trailingComments;
			        }
			        this.stack.push({
			            node: node,
			            start: metadata.start.offset
			        });
			    };
			    CommentHandler.prototype.visitComment = function (node, metadata) {
			        var type = (node.type[0] === 'L') ? 'Line' : 'Block';
			        var comment = {
			            type: type,
			            value: node.value
			        };
			        if (node.range) {
			            comment.range = node.range;
			        }
			        if (node.loc) {
			            comment.loc = node.loc;
			        }
			        this.comments.push(comment);
			        if (this.attach) {
			            var entry = {
			                comment: {
			                    type: type,
			                    value: node.value,
			                    range: [metadata.start.offset, metadata.end.offset]
			                },
			                start: metadata.start.offset
			            };
			            if (node.loc) {
			                entry.comment.loc = node.loc;
			            }
			            node.type = type;
			            this.leading.push(entry);
			            this.trailing.push(entry);
			        }
			    };
			    CommentHandler.prototype.visit = function (node, metadata) {
			        if (node.type === 'LineComment') {
			            this.visitComment(node, metadata);
			        }
			        else if (node.type === 'BlockComment') {
			            this.visitComment(node, metadata);
			        }
			        else if (this.attach) {
			            this.visitNode(node, metadata);
			        }
			    };
			    return CommentHandler;
			}());
			exports.CommentHandler = CommentHandler;


		/***/ },
		/* 2 */
		/***/ function(module, exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.Syntax = {
			    AssignmentExpression: 'AssignmentExpression',
			    AssignmentPattern: 'AssignmentPattern',
			    ArrayExpression: 'ArrayExpression',
			    ArrayPattern: 'ArrayPattern',
			    ArrowFunctionExpression: 'ArrowFunctionExpression',
			    AwaitExpression: 'AwaitExpression',
			    BlockStatement: 'BlockStatement',
			    BinaryExpression: 'BinaryExpression',
			    BreakStatement: 'BreakStatement',
			    CallExpression: 'CallExpression',
			    CatchClause: 'CatchClause',
			    ClassBody: 'ClassBody',
			    ClassDeclaration: 'ClassDeclaration',
			    ClassExpression: 'ClassExpression',
			    ConditionalExpression: 'ConditionalExpression',
			    ContinueStatement: 'ContinueStatement',
			    DoWhileStatement: 'DoWhileStatement',
			    DebuggerStatement: 'DebuggerStatement',
			    EmptyStatement: 'EmptyStatement',
			    ExportAllDeclaration: 'ExportAllDeclaration',
			    ExportDefaultDeclaration: 'ExportDefaultDeclaration',
			    ExportNamedDeclaration: 'ExportNamedDeclaration',
			    ExportSpecifier: 'ExportSpecifier',
			    ExpressionStatement: 'ExpressionStatement',
			    ForStatement: 'ForStatement',
			    ForOfStatement: 'ForOfStatement',
			    ForInStatement: 'ForInStatement',
			    FunctionDeclaration: 'FunctionDeclaration',
			    FunctionExpression: 'FunctionExpression',
			    Identifier: 'Identifier',
			    IfStatement: 'IfStatement',
			    ImportDeclaration: 'ImportDeclaration',
			    ImportDefaultSpecifier: 'ImportDefaultSpecifier',
			    ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
			    ImportSpecifier: 'ImportSpecifier',
			    Literal: 'Literal',
			    LabeledStatement: 'LabeledStatement',
			    LogicalExpression: 'LogicalExpression',
			    MemberExpression: 'MemberExpression',
			    MetaProperty: 'MetaProperty',
			    MethodDefinition: 'MethodDefinition',
			    NewExpression: 'NewExpression',
			    ObjectExpression: 'ObjectExpression',
			    ObjectPattern: 'ObjectPattern',
			    Program: 'Program',
			    Property: 'Property',
			    RestElement: 'RestElement',
			    ReturnStatement: 'ReturnStatement',
			    SequenceExpression: 'SequenceExpression',
			    SpreadElement: 'SpreadElement',
			    Super: 'Super',
			    SwitchCase: 'SwitchCase',
			    SwitchStatement: 'SwitchStatement',
			    TaggedTemplateExpression: 'TaggedTemplateExpression',
			    TemplateElement: 'TemplateElement',
			    TemplateLiteral: 'TemplateLiteral',
			    ThisExpression: 'ThisExpression',
			    ThrowStatement: 'ThrowStatement',
			    TryStatement: 'TryStatement',
			    UnaryExpression: 'UnaryExpression',
			    UpdateExpression: 'UpdateExpression',
			    VariableDeclaration: 'VariableDeclaration',
			    VariableDeclarator: 'VariableDeclarator',
			    WhileStatement: 'WhileStatement',
			    WithStatement: 'WithStatement',
			    YieldExpression: 'YieldExpression'
			};


		/***/ },
		/* 3 */
		/***/ function(module, exports, __webpack_require__) {
		/* istanbul ignore next */
			var __extends = (this && this.__extends) || (function () {
			    var extendStatics = Object.setPrototypeOf ||
			        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
			        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
			    return function (d, b) {
			        extendStatics(d, b);
			        function __() { this.constructor = d; }
			        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
			    };
			})();
			Object.defineProperty(exports, "__esModule", { value: true });
			var character_1 = __webpack_require__(4);
			var JSXNode = __webpack_require__(5);
			var jsx_syntax_1 = __webpack_require__(6);
			var Node = __webpack_require__(7);
			var parser_1 = __webpack_require__(8);
			var token_1 = __webpack_require__(13);
			var xhtml_entities_1 = __webpack_require__(14);
			token_1.TokenName[100 /* Identifier */] = 'JSXIdentifier';
			token_1.TokenName[101 /* Text */] = 'JSXText';
			// Fully qualified element name, e.g. <svg:path> returns "svg:path"
			function getQualifiedElementName(elementName) {
			    var qualifiedName;
			    switch (elementName.type) {
			        case jsx_syntax_1.JSXSyntax.JSXIdentifier:
			            var id = elementName;
			            qualifiedName = id.name;
			            break;
			        case jsx_syntax_1.JSXSyntax.JSXNamespacedName:
			            var ns = elementName;
			            qualifiedName = getQualifiedElementName(ns.namespace) + ':' +
			                getQualifiedElementName(ns.name);
			            break;
			        case jsx_syntax_1.JSXSyntax.JSXMemberExpression:
			            var expr = elementName;
			            qualifiedName = getQualifiedElementName(expr.object) + '.' +
			                getQualifiedElementName(expr.property);
			            break;
			    }
			    return qualifiedName;
			}
			var JSXParser = (function (_super) {
			    __extends(JSXParser, _super);
			    function JSXParser(code, options, delegate) {
			        return _super.call(this, code, options, delegate) || this;
			    }
			    JSXParser.prototype.parsePrimaryExpression = function () {
			        return this.match('<') ? this.parseJSXRoot() : _super.prototype.parsePrimaryExpression.call(this);
			    };
			    JSXParser.prototype.startJSX = function () {
			        // Unwind the scanner before the lookahead token.
			        this.scanner.index = this.startMarker.index;
			        this.scanner.lineNumber = this.startMarker.line;
			        this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
			    };
			    JSXParser.prototype.finishJSX = function () {
			        // Prime the next lookahead.
			        this.nextToken();
			    };
			    JSXParser.prototype.reenterJSX = function () {
			        this.startJSX();
			        this.expectJSX('}');
			        // Pop the closing '}' added from the lookahead.
			        if (this.config.tokens) {
			            this.tokens.pop();
			        }
			    };
			    JSXParser.prototype.createJSXNode = function () {
			        this.collectComments();
			        return {
			            index: this.scanner.index,
			            line: this.scanner.lineNumber,
			            column: this.scanner.index - this.scanner.lineStart
			        };
			    };
			    JSXParser.prototype.createJSXChildNode = function () {
			        return {
			            index: this.scanner.index,
			            line: this.scanner.lineNumber,
			            column: this.scanner.index - this.scanner.lineStart
			        };
			    };
			    JSXParser.prototype.scanXHTMLEntity = function (quote) {
			        var result = '&';
			        var valid = true;
			        var terminated = false;
			        var numeric = false;
			        var hex = false;
			        while (!this.scanner.eof() && valid && !terminated) {
			            var ch = this.scanner.source[this.scanner.index];
			            if (ch === quote) {
			                break;
			            }
			            terminated = (ch === ';');
			            result += ch;
			            ++this.scanner.index;
			            if (!terminated) {
			                switch (result.length) {
			                    case 2:
			                        // e.g. '&#123;'
			                        numeric = (ch === '#');
			                        break;
			                    case 3:
			                        if (numeric) {
			                            // e.g. '&#x41;'
			                            hex = (ch === 'x');
			                            valid = hex || character_1.Character.isDecimalDigit(ch.charCodeAt(0));
			                            numeric = numeric && !hex;
			                        }
			                        break;
			                    default:
			                        valid = valid && !(numeric && !character_1.Character.isDecimalDigit(ch.charCodeAt(0)));
			                        valid = valid && !(hex && !character_1.Character.isHexDigit(ch.charCodeAt(0)));
			                        break;
			                }
			            }
			        }
			        if (valid && terminated && result.length > 2) {
			            // e.g. '&#x41;' becomes just '#x41'
			            var str = result.substr(1, result.length - 2);
			            if (numeric && str.length > 1) {
			                result = String.fromCharCode(parseInt(str.substr(1), 10));
			            }
			            else if (hex && str.length > 2) {
			                result = String.fromCharCode(parseInt('0' + str.substr(1), 16));
			            }
			            else if (!numeric && !hex && xhtml_entities_1.XHTMLEntities[str]) {
			                result = xhtml_entities_1.XHTMLEntities[str];
			            }
			        }
			        return result;
			    };
			    // Scan the next JSX token. This replaces Scanner#lex when in JSX mode.
			    JSXParser.prototype.lexJSX = function () {
			        var cp = this.scanner.source.charCodeAt(this.scanner.index);
			        // < > / : = { }
			        if (cp === 60 || cp === 62 || cp === 47 || cp === 58 || cp === 61 || cp === 123 || cp === 125) {
			            var value = this.scanner.source[this.scanner.index++];
			            return {
			                type: 7 /* Punctuator */,
			                value: value,
			                lineNumber: this.scanner.lineNumber,
			                lineStart: this.scanner.lineStart,
			                start: this.scanner.index - 1,
			                end: this.scanner.index
			            };
			        }
			        // " '
			        if (cp === 34 || cp === 39) {
			            var start = this.scanner.index;
			            var quote = this.scanner.source[this.scanner.index++];
			            var str = '';
			            while (!this.scanner.eof()) {
			                var ch = this.scanner.source[this.scanner.index++];
			                if (ch === quote) {
			                    break;
			                }
			                else if (ch === '&') {
			                    str += this.scanXHTMLEntity(quote);
			                }
			                else {
			                    str += ch;
			                }
			            }
			            return {
			                type: 8 /* StringLiteral */,
			                value: str,
			                lineNumber: this.scanner.lineNumber,
			                lineStart: this.scanner.lineStart,
			                start: start,
			                end: this.scanner.index
			            };
			        }
			        // ... or .
			        if (cp === 46) {
			            var n1 = this.scanner.source.charCodeAt(this.scanner.index + 1);
			            var n2 = this.scanner.source.charCodeAt(this.scanner.index + 2);
			            var value = (n1 === 46 && n2 === 46) ? '...' : '.';
			            var start = this.scanner.index;
			            this.scanner.index += value.length;
			            return {
			                type: 7 /* Punctuator */,
			                value: value,
			                lineNumber: this.scanner.lineNumber,
			                lineStart: this.scanner.lineStart,
			                start: start,
			                end: this.scanner.index
			            };
			        }
			        // `
			        if (cp === 96) {
			            // Only placeholder, since it will be rescanned as a real assignment expression.
			            return {
			                type: 10 /* Template */,
			                value: '',
			                lineNumber: this.scanner.lineNumber,
			                lineStart: this.scanner.lineStart,
			                start: this.scanner.index,
			                end: this.scanner.index
			            };
			        }
			        // Identifer can not contain backslash (char code 92).
			        if (character_1.Character.isIdentifierStart(cp) && (cp !== 92)) {
			            var start = this.scanner.index;
			            ++this.scanner.index;
			            while (!this.scanner.eof()) {
			                var ch = this.scanner.source.charCodeAt(this.scanner.index);
			                if (character_1.Character.isIdentifierPart(ch) && (ch !== 92)) {
			                    ++this.scanner.index;
			                }
			                else if (ch === 45) {
			                    // Hyphen (char code 45) can be part of an identifier.
			                    ++this.scanner.index;
			                }
			                else {
			                    break;
			                }
			            }
			            var id = this.scanner.source.slice(start, this.scanner.index);
			            return {
			                type: 100 /* Identifier */,
			                value: id,
			                lineNumber: this.scanner.lineNumber,
			                lineStart: this.scanner.lineStart,
			                start: start,
			                end: this.scanner.index
			            };
			        }
			        return this.scanner.lex();
			    };
			    JSXParser.prototype.nextJSXToken = function () {
			        this.collectComments();
			        this.startMarker.index = this.scanner.index;
			        this.startMarker.line = this.scanner.lineNumber;
			        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
			        var token = this.lexJSX();
			        this.lastMarker.index = this.scanner.index;
			        this.lastMarker.line = this.scanner.lineNumber;
			        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
			        if (this.config.tokens) {
			            this.tokens.push(this.convertToken(token));
			        }
			        return token;
			    };
			    JSXParser.prototype.nextJSXText = function () {
			        this.startMarker.index = this.scanner.index;
			        this.startMarker.line = this.scanner.lineNumber;
			        this.startMarker.column = this.scanner.index - this.scanner.lineStart;
			        var start = this.scanner.index;
			        var text = '';
			        while (!this.scanner.eof()) {
			            var ch = this.scanner.source[this.scanner.index];
			            if (ch === '{' || ch === '<') {
			                break;
			            }
			            ++this.scanner.index;
			            text += ch;
			            if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
			                ++this.scanner.lineNumber;
			                if (ch === '\r' && this.scanner.source[this.scanner.index] === '\n') {
			                    ++this.scanner.index;
			                }
			                this.scanner.lineStart = this.scanner.index;
			            }
			        }
			        this.lastMarker.index = this.scanner.index;
			        this.lastMarker.line = this.scanner.lineNumber;
			        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
			        var token = {
			            type: 101 /* Text */,
			            value: text,
			            lineNumber: this.scanner.lineNumber,
			            lineStart: this.scanner.lineStart,
			            start: start,
			            end: this.scanner.index
			        };
			        if ((text.length > 0) && this.config.tokens) {
			            this.tokens.push(this.convertToken(token));
			        }
			        return token;
			    };
			    JSXParser.prototype.peekJSXToken = function () {
			        var state = this.scanner.saveState();
			        this.scanner.scanComments();
			        var next = this.lexJSX();
			        this.scanner.restoreState(state);
			        return next;
			    };
			    // Expect the next JSX token to match the specified punctuator.
			    // If not, an exception will be thrown.
			    JSXParser.prototype.expectJSX = function (value) {
			        var token = this.nextJSXToken();
			        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
			            this.throwUnexpectedToken(token);
			        }
			    };
			    // Return true if the next JSX token matches the specified punctuator.
			    JSXParser.prototype.matchJSX = function (value) {
			        var next = this.peekJSXToken();
			        return next.type === 7 /* Punctuator */ && next.value === value;
			    };
			    JSXParser.prototype.parseJSXIdentifier = function () {
			        var node = this.createJSXNode();
			        var token = this.nextJSXToken();
			        if (token.type !== 100 /* Identifier */) {
			            this.throwUnexpectedToken(token);
			        }
			        return this.finalize(node, new JSXNode.JSXIdentifier(token.value));
			    };
			    JSXParser.prototype.parseJSXElementName = function () {
			        var node = this.createJSXNode();
			        var elementName = this.parseJSXIdentifier();
			        if (this.matchJSX(':')) {
			            var namespace = elementName;
			            this.expectJSX(':');
			            var name_1 = this.parseJSXIdentifier();
			            elementName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_1));
			        }
			        else if (this.matchJSX('.')) {
			            while (this.matchJSX('.')) {
			                var object = elementName;
			                this.expectJSX('.');
			                var property = this.parseJSXIdentifier();
			                elementName = this.finalize(node, new JSXNode.JSXMemberExpression(object, property));
			            }
			        }
			        return elementName;
			    };
			    JSXParser.prototype.parseJSXAttributeName = function () {
			        var node = this.createJSXNode();
			        var attributeName;
			        var identifier = this.parseJSXIdentifier();
			        if (this.matchJSX(':')) {
			            var namespace = identifier;
			            this.expectJSX(':');
			            var name_2 = this.parseJSXIdentifier();
			            attributeName = this.finalize(node, new JSXNode.JSXNamespacedName(namespace, name_2));
			        }
			        else {
			            attributeName = identifier;
			        }
			        return attributeName;
			    };
			    JSXParser.prototype.parseJSXStringLiteralAttribute = function () {
			        var node = this.createJSXNode();
			        var token = this.nextJSXToken();
			        if (token.type !== 8 /* StringLiteral */) {
			            this.throwUnexpectedToken(token);
			        }
			        var raw = this.getTokenRaw(token);
			        return this.finalize(node, new Node.Literal(token.value, raw));
			    };
			    JSXParser.prototype.parseJSXExpressionAttribute = function () {
			        var node = this.createJSXNode();
			        this.expectJSX('{');
			        this.finishJSX();
			        if (this.match('}')) {
			            this.tolerateError('JSX attributes must only be assigned a non-empty expression');
			        }
			        var expression = this.parseAssignmentExpression();
			        this.reenterJSX();
			        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
			    };
			    JSXParser.prototype.parseJSXAttributeValue = function () {
			        return this.matchJSX('{') ? this.parseJSXExpressionAttribute() :
			            this.matchJSX('<') ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
			    };
			    JSXParser.prototype.parseJSXNameValueAttribute = function () {
			        var node = this.createJSXNode();
			        var name = this.parseJSXAttributeName();
			        var value = null;
			        if (this.matchJSX('=')) {
			            this.expectJSX('=');
			            value = this.parseJSXAttributeValue();
			        }
			        return this.finalize(node, new JSXNode.JSXAttribute(name, value));
			    };
			    JSXParser.prototype.parseJSXSpreadAttribute = function () {
			        var node = this.createJSXNode();
			        this.expectJSX('{');
			        this.expectJSX('...');
			        this.finishJSX();
			        var argument = this.parseAssignmentExpression();
			        this.reenterJSX();
			        return this.finalize(node, new JSXNode.JSXSpreadAttribute(argument));
			    };
			    JSXParser.prototype.parseJSXAttributes = function () {
			        var attributes = [];
			        while (!this.matchJSX('/') && !this.matchJSX('>')) {
			            var attribute = this.matchJSX('{') ? this.parseJSXSpreadAttribute() :
			                this.parseJSXNameValueAttribute();
			            attributes.push(attribute);
			        }
			        return attributes;
			    };
			    JSXParser.prototype.parseJSXOpeningElement = function () {
			        var node = this.createJSXNode();
			        this.expectJSX('<');
			        var name = this.parseJSXElementName();
			        var attributes = this.parseJSXAttributes();
			        var selfClosing = this.matchJSX('/');
			        if (selfClosing) {
			            this.expectJSX('/');
			        }
			        this.expectJSX('>');
			        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
			    };
			    JSXParser.prototype.parseJSXBoundaryElement = function () {
			        var node = this.createJSXNode();
			        this.expectJSX('<');
			        if (this.matchJSX('/')) {
			            this.expectJSX('/');
			            var name_3 = this.parseJSXElementName();
			            this.expectJSX('>');
			            return this.finalize(node, new JSXNode.JSXClosingElement(name_3));
			        }
			        var name = this.parseJSXElementName();
			        var attributes = this.parseJSXAttributes();
			        var selfClosing = this.matchJSX('/');
			        if (selfClosing) {
			            this.expectJSX('/');
			        }
			        this.expectJSX('>');
			        return this.finalize(node, new JSXNode.JSXOpeningElement(name, selfClosing, attributes));
			    };
			    JSXParser.prototype.parseJSXEmptyExpression = function () {
			        var node = this.createJSXChildNode();
			        this.collectComments();
			        this.lastMarker.index = this.scanner.index;
			        this.lastMarker.line = this.scanner.lineNumber;
			        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
			        return this.finalize(node, new JSXNode.JSXEmptyExpression());
			    };
			    JSXParser.prototype.parseJSXExpressionContainer = function () {
			        var node = this.createJSXNode();
			        this.expectJSX('{');
			        var expression;
			        if (this.matchJSX('}')) {
			            expression = this.parseJSXEmptyExpression();
			            this.expectJSX('}');
			        }
			        else {
			            this.finishJSX();
			            expression = this.parseAssignmentExpression();
			            this.reenterJSX();
			        }
			        return this.finalize(node, new JSXNode.JSXExpressionContainer(expression));
			    };
			    JSXParser.prototype.parseJSXChildren = function () {
			        var children = [];
			        while (!this.scanner.eof()) {
			            var node = this.createJSXChildNode();
			            var token = this.nextJSXText();
			            if (token.start < token.end) {
			                var raw = this.getTokenRaw(token);
			                var child = this.finalize(node, new JSXNode.JSXText(token.value, raw));
			                children.push(child);
			            }
			            if (this.scanner.source[this.scanner.index] === '{') {
			                var container = this.parseJSXExpressionContainer();
			                children.push(container);
			            }
			            else {
			                break;
			            }
			        }
			        return children;
			    };
			    JSXParser.prototype.parseComplexJSXElement = function (el) {
			        var stack = [];
			        while (!this.scanner.eof()) {
			            el.children = el.children.concat(this.parseJSXChildren());
			            var node = this.createJSXChildNode();
			            var element = this.parseJSXBoundaryElement();
			            if (element.type === jsx_syntax_1.JSXSyntax.JSXOpeningElement) {
			                var opening = element;
			                if (opening.selfClosing) {
			                    var child = this.finalize(node, new JSXNode.JSXElement(opening, [], null));
			                    el.children.push(child);
			                }
			                else {
			                    stack.push(el);
			                    el = { node: node, opening: opening, closing: null, children: [] };
			                }
			            }
			            if (element.type === jsx_syntax_1.JSXSyntax.JSXClosingElement) {
			                el.closing = element;
			                var open_1 = getQualifiedElementName(el.opening.name);
			                var close_1 = getQualifiedElementName(el.closing.name);
			                if (open_1 !== close_1) {
			                    this.tolerateError('Expected corresponding JSX closing tag for %0', open_1);
			                }
			                if (stack.length > 0) {
			                    var child = this.finalize(el.node, new JSXNode.JSXElement(el.opening, el.children, el.closing));
			                    el = stack[stack.length - 1];
			                    el.children.push(child);
			                    stack.pop();
			                }
			                else {
			                    break;
			                }
			            }
			        }
			        return el;
			    };
			    JSXParser.prototype.parseJSXElement = function () {
			        var node = this.createJSXNode();
			        var opening = this.parseJSXOpeningElement();
			        var children = [];
			        var closing = null;
			        if (!opening.selfClosing) {
			            var el = this.parseComplexJSXElement({ node: node, opening: opening, closing: closing, children: children });
			            children = el.children;
			            closing = el.closing;
			        }
			        return this.finalize(node, new JSXNode.JSXElement(opening, children, closing));
			    };
			    JSXParser.prototype.parseJSXRoot = function () {
			        // Pop the opening '<' added from the lookahead.
			        if (this.config.tokens) {
			            this.tokens.pop();
			        }
			        this.startJSX();
			        var element = this.parseJSXElement();
			        this.finishJSX();
			        return element;
			    };
			    JSXParser.prototype.isStartOfExpression = function () {
			        return _super.prototype.isStartOfExpression.call(this) || this.match('<');
			    };
			    return JSXParser;
			}(parser_1.Parser));
			exports.JSXParser = JSXParser;


		/***/ },
		/* 4 */
		/***/ function(module, exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			// See also tools/generate-unicode-regex.js.
			var Regex = {
			    // Unicode v8.0.0 NonAsciiIdentifierStart:
			    NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
			    // Unicode v8.0.0 NonAsciiIdentifierPart:
			    NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
			};
			exports.Character = {
			    /* tslint:disable:no-bitwise */
			    fromCodePoint: function (cp) {
			        return (cp < 0x10000) ? String.fromCharCode(cp) :
			            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
			                String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
			    },
			    // https://tc39.github.io/ecma262/#sec-white-space
			    isWhiteSpace: function (cp) {
			        return (cp === 0x20) || (cp === 0x09) || (cp === 0x0B) || (cp === 0x0C) || (cp === 0xA0) ||
			            (cp >= 0x1680 && [0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(cp) >= 0);
			    },
			    // https://tc39.github.io/ecma262/#sec-line-terminators
			    isLineTerminator: function (cp) {
			        return (cp === 0x0A) || (cp === 0x0D) || (cp === 0x2028) || (cp === 0x2029);
			    },
			    // https://tc39.github.io/ecma262/#sec-names-and-keywords
			    isIdentifierStart: function (cp) {
			        return (cp === 0x24) || (cp === 0x5F) ||
			            (cp >= 0x41 && cp <= 0x5A) ||
			            (cp >= 0x61 && cp <= 0x7A) ||
			            (cp === 0x5C) ||
			            ((cp >= 0x80) && Regex.NonAsciiIdentifierStart.test(exports.Character.fromCodePoint(cp)));
			    },
			    isIdentifierPart: function (cp) {
			        return (cp === 0x24) || (cp === 0x5F) ||
			            (cp >= 0x41 && cp <= 0x5A) ||
			            (cp >= 0x61 && cp <= 0x7A) ||
			            (cp >= 0x30 && cp <= 0x39) ||
			            (cp === 0x5C) ||
			            ((cp >= 0x80) && Regex.NonAsciiIdentifierPart.test(exports.Character.fromCodePoint(cp)));
			    },
			    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
			    isDecimalDigit: function (cp) {
			        return (cp >= 0x30 && cp <= 0x39); // 0..9
			    },
			    isHexDigit: function (cp) {
			        return (cp >= 0x30 && cp <= 0x39) ||
			            (cp >= 0x41 && cp <= 0x46) ||
			            (cp >= 0x61 && cp <= 0x66); // a..f
			    },
			    isOctalDigit: function (cp) {
			        return (cp >= 0x30 && cp <= 0x37); // 0..7
			    }
			};


		/***/ },
		/* 5 */
		/***/ function(module, exports, __webpack_require__) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var jsx_syntax_1 = __webpack_require__(6);
			/* tslint:disable:max-classes-per-file */
			var JSXClosingElement = (function () {
			    function JSXClosingElement(name) {
			        this.type = jsx_syntax_1.JSXSyntax.JSXClosingElement;
			        this.name = name;
			    }
			    return JSXClosingElement;
			}());
			exports.JSXClosingElement = JSXClosingElement;
			var JSXElement = (function () {
			    function JSXElement(openingElement, children, closingElement) {
			        this.type = jsx_syntax_1.JSXSyntax.JSXElement;
			        this.openingElement = openingElement;
			        this.children = children;
			        this.closingElement = closingElement;
			    }
			    return JSXElement;
			}());
			exports.JSXElement = JSXElement;
			var JSXEmptyExpression = (function () {
			    function JSXEmptyExpression() {
			        this.type = jsx_syntax_1.JSXSyntax.JSXEmptyExpression;
			    }
			    return JSXEmptyExpression;
			}());
			exports.JSXEmptyExpression = JSXEmptyExpression;
			var JSXExpressionContainer = (function () {
			    function JSXExpressionContainer(expression) {
			        this.type = jsx_syntax_1.JSXSyntax.JSXExpressionContainer;
			        this.expression = expression;
			    }
			    return JSXExpressionContainer;
			}());
			exports.JSXExpressionContainer = JSXExpressionContainer;
			var JSXIdentifier = (function () {
			    function JSXIdentifier(name) {
			        this.type = jsx_syntax_1.JSXSyntax.JSXIdentifier;
			        this.name = name;
			    }
			    return JSXIdentifier;
			}());
			exports.JSXIdentifier = JSXIdentifier;
			var JSXMemberExpression = (function () {
			    function JSXMemberExpression(object, property) {
			        this.type = jsx_syntax_1.JSXSyntax.JSXMemberExpression;
			        this.object = object;
			        this.property = property;
			    }
			    return JSXMemberExpression;
			}());
			exports.JSXMemberExpression = JSXMemberExpression;
			var JSXAttribute = (function () {
			    function JSXAttribute(name, value) {
			        this.type = jsx_syntax_1.JSXSyntax.JSXAttribute;
			        this.name = name;
			        this.value = value;
			    }
			    return JSXAttribute;
			}());
			exports.JSXAttribute = JSXAttribute;
			var JSXNamespacedName = (function () {
			    function JSXNamespacedName(namespace, name) {
			        this.type = jsx_syntax_1.JSXSyntax.JSXNamespacedName;
			        this.namespace = namespace;
			        this.name = name;
			    }
			    return JSXNamespacedName;
			}());
			exports.JSXNamespacedName = JSXNamespacedName;
			var JSXOpeningElement = (function () {
			    function JSXOpeningElement(name, selfClosing, attributes) {
			        this.type = jsx_syntax_1.JSXSyntax.JSXOpeningElement;
			        this.name = name;
			        this.selfClosing = selfClosing;
			        this.attributes = attributes;
			    }
			    return JSXOpeningElement;
			}());
			exports.JSXOpeningElement = JSXOpeningElement;
			var JSXSpreadAttribute = (function () {
			    function JSXSpreadAttribute(argument) {
			        this.type = jsx_syntax_1.JSXSyntax.JSXSpreadAttribute;
			        this.argument = argument;
			    }
			    return JSXSpreadAttribute;
			}());
			exports.JSXSpreadAttribute = JSXSpreadAttribute;
			var JSXText = (function () {
			    function JSXText(value, raw) {
			        this.type = jsx_syntax_1.JSXSyntax.JSXText;
			        this.value = value;
			        this.raw = raw;
			    }
			    return JSXText;
			}());
			exports.JSXText = JSXText;


		/***/ },
		/* 6 */
		/***/ function(module, exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.JSXSyntax = {
			    JSXAttribute: 'JSXAttribute',
			    JSXClosingElement: 'JSXClosingElement',
			    JSXElement: 'JSXElement',
			    JSXEmptyExpression: 'JSXEmptyExpression',
			    JSXExpressionContainer: 'JSXExpressionContainer',
			    JSXIdentifier: 'JSXIdentifier',
			    JSXMemberExpression: 'JSXMemberExpression',
			    JSXNamespacedName: 'JSXNamespacedName',
			    JSXOpeningElement: 'JSXOpeningElement',
			    JSXSpreadAttribute: 'JSXSpreadAttribute',
			    JSXText: 'JSXText'
			};


		/***/ },
		/* 7 */
		/***/ function(module, exports, __webpack_require__) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var syntax_1 = __webpack_require__(2);
			/* tslint:disable:max-classes-per-file */
			var ArrayExpression = (function () {
			    function ArrayExpression(elements) {
			        this.type = syntax_1.Syntax.ArrayExpression;
			        this.elements = elements;
			    }
			    return ArrayExpression;
			}());
			exports.ArrayExpression = ArrayExpression;
			var ArrayPattern = (function () {
			    function ArrayPattern(elements) {
			        this.type = syntax_1.Syntax.ArrayPattern;
			        this.elements = elements;
			    }
			    return ArrayPattern;
			}());
			exports.ArrayPattern = ArrayPattern;
			var ArrowFunctionExpression = (function () {
			    function ArrowFunctionExpression(params, body, expression) {
			        this.type = syntax_1.Syntax.ArrowFunctionExpression;
			        this.id = null;
			        this.params = params;
			        this.body = body;
			        this.generator = false;
			        this.expression = expression;
			        this.async = false;
			    }
			    return ArrowFunctionExpression;
			}());
			exports.ArrowFunctionExpression = ArrowFunctionExpression;
			var AssignmentExpression = (function () {
			    function AssignmentExpression(operator, left, right) {
			        this.type = syntax_1.Syntax.AssignmentExpression;
			        this.operator = operator;
			        this.left = left;
			        this.right = right;
			    }
			    return AssignmentExpression;
			}());
			exports.AssignmentExpression = AssignmentExpression;
			var AssignmentPattern = (function () {
			    function AssignmentPattern(left, right) {
			        this.type = syntax_1.Syntax.AssignmentPattern;
			        this.left = left;
			        this.right = right;
			    }
			    return AssignmentPattern;
			}());
			exports.AssignmentPattern = AssignmentPattern;
			var AsyncArrowFunctionExpression = (function () {
			    function AsyncArrowFunctionExpression(params, body, expression) {
			        this.type = syntax_1.Syntax.ArrowFunctionExpression;
			        this.id = null;
			        this.params = params;
			        this.body = body;
			        this.generator = false;
			        this.expression = expression;
			        this.async = true;
			    }
			    return AsyncArrowFunctionExpression;
			}());
			exports.AsyncArrowFunctionExpression = AsyncArrowFunctionExpression;
			var AsyncFunctionDeclaration = (function () {
			    function AsyncFunctionDeclaration(id, params, body) {
			        this.type = syntax_1.Syntax.FunctionDeclaration;
			        this.id = id;
			        this.params = params;
			        this.body = body;
			        this.generator = false;
			        this.expression = false;
			        this.async = true;
			    }
			    return AsyncFunctionDeclaration;
			}());
			exports.AsyncFunctionDeclaration = AsyncFunctionDeclaration;
			var AsyncFunctionExpression = (function () {
			    function AsyncFunctionExpression(id, params, body) {
			        this.type = syntax_1.Syntax.FunctionExpression;
			        this.id = id;
			        this.params = params;
			        this.body = body;
			        this.generator = false;
			        this.expression = false;
			        this.async = true;
			    }
			    return AsyncFunctionExpression;
			}());
			exports.AsyncFunctionExpression = AsyncFunctionExpression;
			var AwaitExpression = (function () {
			    function AwaitExpression(argument) {
			        this.type = syntax_1.Syntax.AwaitExpression;
			        this.argument = argument;
			    }
			    return AwaitExpression;
			}());
			exports.AwaitExpression = AwaitExpression;
			var BinaryExpression = (function () {
			    function BinaryExpression(operator, left, right) {
			        var logical = (operator === '||' || operator === '&&');
			        this.type = logical ? syntax_1.Syntax.LogicalExpression : syntax_1.Syntax.BinaryExpression;
			        this.operator = operator;
			        this.left = left;
			        this.right = right;
			    }
			    return BinaryExpression;
			}());
			exports.BinaryExpression = BinaryExpression;
			var BlockStatement = (function () {
			    function BlockStatement(body) {
			        this.type = syntax_1.Syntax.BlockStatement;
			        this.body = body;
			    }
			    return BlockStatement;
			}());
			exports.BlockStatement = BlockStatement;
			var BreakStatement = (function () {
			    function BreakStatement(label) {
			        this.type = syntax_1.Syntax.BreakStatement;
			        this.label = label;
			    }
			    return BreakStatement;
			}());
			exports.BreakStatement = BreakStatement;
			var CallExpression = (function () {
			    function CallExpression(callee, args) {
			        this.type = syntax_1.Syntax.CallExpression;
			        this.callee = callee;
			        this.arguments = args;
			    }
			    return CallExpression;
			}());
			exports.CallExpression = CallExpression;
			var CatchClause = (function () {
			    function CatchClause(param, body) {
			        this.type = syntax_1.Syntax.CatchClause;
			        this.param = param;
			        this.body = body;
			    }
			    return CatchClause;
			}());
			exports.CatchClause = CatchClause;
			var ClassBody = (function () {
			    function ClassBody(body) {
			        this.type = syntax_1.Syntax.ClassBody;
			        this.body = body;
			    }
			    return ClassBody;
			}());
			exports.ClassBody = ClassBody;
			var ClassDeclaration = (function () {
			    function ClassDeclaration(id, superClass, body) {
			        this.type = syntax_1.Syntax.ClassDeclaration;
			        this.id = id;
			        this.superClass = superClass;
			        this.body = body;
			    }
			    return ClassDeclaration;
			}());
			exports.ClassDeclaration = ClassDeclaration;
			var ClassExpression = (function () {
			    function ClassExpression(id, superClass, body) {
			        this.type = syntax_1.Syntax.ClassExpression;
			        this.id = id;
			        this.superClass = superClass;
			        this.body = body;
			    }
			    return ClassExpression;
			}());
			exports.ClassExpression = ClassExpression;
			var ComputedMemberExpression = (function () {
			    function ComputedMemberExpression(object, property) {
			        this.type = syntax_1.Syntax.MemberExpression;
			        this.computed = true;
			        this.object = object;
			        this.property = property;
			    }
			    return ComputedMemberExpression;
			}());
			exports.ComputedMemberExpression = ComputedMemberExpression;
			var ConditionalExpression = (function () {
			    function ConditionalExpression(test, consequent, alternate) {
			        this.type = syntax_1.Syntax.ConditionalExpression;
			        this.test = test;
			        this.consequent = consequent;
			        this.alternate = alternate;
			    }
			    return ConditionalExpression;
			}());
			exports.ConditionalExpression = ConditionalExpression;
			var ContinueStatement = (function () {
			    function ContinueStatement(label) {
			        this.type = syntax_1.Syntax.ContinueStatement;
			        this.label = label;
			    }
			    return ContinueStatement;
			}());
			exports.ContinueStatement = ContinueStatement;
			var DebuggerStatement = (function () {
			    function DebuggerStatement() {
			        this.type = syntax_1.Syntax.DebuggerStatement;
			    }
			    return DebuggerStatement;
			}());
			exports.DebuggerStatement = DebuggerStatement;
			var Directive = (function () {
			    function Directive(expression, directive) {
			        this.type = syntax_1.Syntax.ExpressionStatement;
			        this.expression = expression;
			        this.directive = directive;
			    }
			    return Directive;
			}());
			exports.Directive = Directive;
			var DoWhileStatement = (function () {
			    function DoWhileStatement(body, test) {
			        this.type = syntax_1.Syntax.DoWhileStatement;
			        this.body = body;
			        this.test = test;
			    }
			    return DoWhileStatement;
			}());
			exports.DoWhileStatement = DoWhileStatement;
			var EmptyStatement = (function () {
			    function EmptyStatement() {
			        this.type = syntax_1.Syntax.EmptyStatement;
			    }
			    return EmptyStatement;
			}());
			exports.EmptyStatement = EmptyStatement;
			var ExportAllDeclaration = (function () {
			    function ExportAllDeclaration(source) {
			        this.type = syntax_1.Syntax.ExportAllDeclaration;
			        this.source = source;
			    }
			    return ExportAllDeclaration;
			}());
			exports.ExportAllDeclaration = ExportAllDeclaration;
			var ExportDefaultDeclaration = (function () {
			    function ExportDefaultDeclaration(declaration) {
			        this.type = syntax_1.Syntax.ExportDefaultDeclaration;
			        this.declaration = declaration;
			    }
			    return ExportDefaultDeclaration;
			}());
			exports.ExportDefaultDeclaration = ExportDefaultDeclaration;
			var ExportNamedDeclaration = (function () {
			    function ExportNamedDeclaration(declaration, specifiers, source) {
			        this.type = syntax_1.Syntax.ExportNamedDeclaration;
			        this.declaration = declaration;
			        this.specifiers = specifiers;
			        this.source = source;
			    }
			    return ExportNamedDeclaration;
			}());
			exports.ExportNamedDeclaration = ExportNamedDeclaration;
			var ExportSpecifier = (function () {
			    function ExportSpecifier(local, exported) {
			        this.type = syntax_1.Syntax.ExportSpecifier;
			        this.exported = exported;
			        this.local = local;
			    }
			    return ExportSpecifier;
			}());
			exports.ExportSpecifier = ExportSpecifier;
			var ExpressionStatement = (function () {
			    function ExpressionStatement(expression) {
			        this.type = syntax_1.Syntax.ExpressionStatement;
			        this.expression = expression;
			    }
			    return ExpressionStatement;
			}());
			exports.ExpressionStatement = ExpressionStatement;
			var ForInStatement = (function () {
			    function ForInStatement(left, right, body) {
			        this.type = syntax_1.Syntax.ForInStatement;
			        this.left = left;
			        this.right = right;
			        this.body = body;
			        this.each = false;
			    }
			    return ForInStatement;
			}());
			exports.ForInStatement = ForInStatement;
			var ForOfStatement = (function () {
			    function ForOfStatement(left, right, body) {
			        this.type = syntax_1.Syntax.ForOfStatement;
			        this.left = left;
			        this.right = right;
			        this.body = body;
			    }
			    return ForOfStatement;
			}());
			exports.ForOfStatement = ForOfStatement;
			var ForStatement = (function () {
			    function ForStatement(init, test, update, body) {
			        this.type = syntax_1.Syntax.ForStatement;
			        this.init = init;
			        this.test = test;
			        this.update = update;
			        this.body = body;
			    }
			    return ForStatement;
			}());
			exports.ForStatement = ForStatement;
			var FunctionDeclaration = (function () {
			    function FunctionDeclaration(id, params, body, generator) {
			        this.type = syntax_1.Syntax.FunctionDeclaration;
			        this.id = id;
			        this.params = params;
			        this.body = body;
			        this.generator = generator;
			        this.expression = false;
			        this.async = false;
			    }
			    return FunctionDeclaration;
			}());
			exports.FunctionDeclaration = FunctionDeclaration;
			var FunctionExpression = (function () {
			    function FunctionExpression(id, params, body, generator) {
			        this.type = syntax_1.Syntax.FunctionExpression;
			        this.id = id;
			        this.params = params;
			        this.body = body;
			        this.generator = generator;
			        this.expression = false;
			        this.async = false;
			    }
			    return FunctionExpression;
			}());
			exports.FunctionExpression = FunctionExpression;
			var Identifier = (function () {
			    function Identifier(name) {
			        this.type = syntax_1.Syntax.Identifier;
			        this.name = name;
			    }
			    return Identifier;
			}());
			exports.Identifier = Identifier;
			var IfStatement = (function () {
			    function IfStatement(test, consequent, alternate) {
			        this.type = syntax_1.Syntax.IfStatement;
			        this.test = test;
			        this.consequent = consequent;
			        this.alternate = alternate;
			    }
			    return IfStatement;
			}());
			exports.IfStatement = IfStatement;
			var ImportDeclaration = (function () {
			    function ImportDeclaration(specifiers, source) {
			        this.type = syntax_1.Syntax.ImportDeclaration;
			        this.specifiers = specifiers;
			        this.source = source;
			    }
			    return ImportDeclaration;
			}());
			exports.ImportDeclaration = ImportDeclaration;
			var ImportDefaultSpecifier = (function () {
			    function ImportDefaultSpecifier(local) {
			        this.type = syntax_1.Syntax.ImportDefaultSpecifier;
			        this.local = local;
			    }
			    return ImportDefaultSpecifier;
			}());
			exports.ImportDefaultSpecifier = ImportDefaultSpecifier;
			var ImportNamespaceSpecifier = (function () {
			    function ImportNamespaceSpecifier(local) {
			        this.type = syntax_1.Syntax.ImportNamespaceSpecifier;
			        this.local = local;
			    }
			    return ImportNamespaceSpecifier;
			}());
			exports.ImportNamespaceSpecifier = ImportNamespaceSpecifier;
			var ImportSpecifier = (function () {
			    function ImportSpecifier(local, imported) {
			        this.type = syntax_1.Syntax.ImportSpecifier;
			        this.local = local;
			        this.imported = imported;
			    }
			    return ImportSpecifier;
			}());
			exports.ImportSpecifier = ImportSpecifier;
			var LabeledStatement = (function () {
			    function LabeledStatement(label, body) {
			        this.type = syntax_1.Syntax.LabeledStatement;
			        this.label = label;
			        this.body = body;
			    }
			    return LabeledStatement;
			}());
			exports.LabeledStatement = LabeledStatement;
			var Literal = (function () {
			    function Literal(value, raw) {
			        this.type = syntax_1.Syntax.Literal;
			        this.value = value;
			        this.raw = raw;
			    }
			    return Literal;
			}());
			exports.Literal = Literal;
			var MetaProperty = (function () {
			    function MetaProperty(meta, property) {
			        this.type = syntax_1.Syntax.MetaProperty;
			        this.meta = meta;
			        this.property = property;
			    }
			    return MetaProperty;
			}());
			exports.MetaProperty = MetaProperty;
			var MethodDefinition = (function () {
			    function MethodDefinition(key, computed, value, kind, isStatic) {
			        this.type = syntax_1.Syntax.MethodDefinition;
			        this.key = key;
			        this.computed = computed;
			        this.value = value;
			        this.kind = kind;
			        this.static = isStatic;
			    }
			    return MethodDefinition;
			}());
			exports.MethodDefinition = MethodDefinition;
			var Module = (function () {
			    function Module(body) {
			        this.type = syntax_1.Syntax.Program;
			        this.body = body;
			        this.sourceType = 'module';
			    }
			    return Module;
			}());
			exports.Module = Module;
			var NewExpression = (function () {
			    function NewExpression(callee, args) {
			        this.type = syntax_1.Syntax.NewExpression;
			        this.callee = callee;
			        this.arguments = args;
			    }
			    return NewExpression;
			}());
			exports.NewExpression = NewExpression;
			var ObjectExpression = (function () {
			    function ObjectExpression(properties) {
			        this.type = syntax_1.Syntax.ObjectExpression;
			        this.properties = properties;
			    }
			    return ObjectExpression;
			}());
			exports.ObjectExpression = ObjectExpression;
			var ObjectPattern = (function () {
			    function ObjectPattern(properties) {
			        this.type = syntax_1.Syntax.ObjectPattern;
			        this.properties = properties;
			    }
			    return ObjectPattern;
			}());
			exports.ObjectPattern = ObjectPattern;
			var Property = (function () {
			    function Property(kind, key, computed, value, method, shorthand) {
			        this.type = syntax_1.Syntax.Property;
			        this.key = key;
			        this.computed = computed;
			        this.value = value;
			        this.kind = kind;
			        this.method = method;
			        this.shorthand = shorthand;
			    }
			    return Property;
			}());
			exports.Property = Property;
			var RegexLiteral = (function () {
			    function RegexLiteral(value, raw, pattern, flags) {
			        this.type = syntax_1.Syntax.Literal;
			        this.value = value;
			        this.raw = raw;
			        this.regex = { pattern: pattern, flags: flags };
			    }
			    return RegexLiteral;
			}());
			exports.RegexLiteral = RegexLiteral;
			var RestElement = (function () {
			    function RestElement(argument) {
			        this.type = syntax_1.Syntax.RestElement;
			        this.argument = argument;
			    }
			    return RestElement;
			}());
			exports.RestElement = RestElement;
			var ReturnStatement = (function () {
			    function ReturnStatement(argument) {
			        this.type = syntax_1.Syntax.ReturnStatement;
			        this.argument = argument;
			    }
			    return ReturnStatement;
			}());
			exports.ReturnStatement = ReturnStatement;
			var Script = (function () {
			    function Script(body) {
			        this.type = syntax_1.Syntax.Program;
			        this.body = body;
			        this.sourceType = 'script';
			    }
			    return Script;
			}());
			exports.Script = Script;
			var SequenceExpression = (function () {
			    function SequenceExpression(expressions) {
			        this.type = syntax_1.Syntax.SequenceExpression;
			        this.expressions = expressions;
			    }
			    return SequenceExpression;
			}());
			exports.SequenceExpression = SequenceExpression;
			var SpreadElement = (function () {
			    function SpreadElement(argument) {
			        this.type = syntax_1.Syntax.SpreadElement;
			        this.argument = argument;
			    }
			    return SpreadElement;
			}());
			exports.SpreadElement = SpreadElement;
			var StaticMemberExpression = (function () {
			    function StaticMemberExpression(object, property) {
			        this.type = syntax_1.Syntax.MemberExpression;
			        this.computed = false;
			        this.object = object;
			        this.property = property;
			    }
			    return StaticMemberExpression;
			}());
			exports.StaticMemberExpression = StaticMemberExpression;
			var Super = (function () {
			    function Super() {
			        this.type = syntax_1.Syntax.Super;
			    }
			    return Super;
			}());
			exports.Super = Super;
			var SwitchCase = (function () {
			    function SwitchCase(test, consequent) {
			        this.type = syntax_1.Syntax.SwitchCase;
			        this.test = test;
			        this.consequent = consequent;
			    }
			    return SwitchCase;
			}());
			exports.SwitchCase = SwitchCase;
			var SwitchStatement = (function () {
			    function SwitchStatement(discriminant, cases) {
			        this.type = syntax_1.Syntax.SwitchStatement;
			        this.discriminant = discriminant;
			        this.cases = cases;
			    }
			    return SwitchStatement;
			}());
			exports.SwitchStatement = SwitchStatement;
			var TaggedTemplateExpression = (function () {
			    function TaggedTemplateExpression(tag, quasi) {
			        this.type = syntax_1.Syntax.TaggedTemplateExpression;
			        this.tag = tag;
			        this.quasi = quasi;
			    }
			    return TaggedTemplateExpression;
			}());
			exports.TaggedTemplateExpression = TaggedTemplateExpression;
			var TemplateElement = (function () {
			    function TemplateElement(value, tail) {
			        this.type = syntax_1.Syntax.TemplateElement;
			        this.value = value;
			        this.tail = tail;
			    }
			    return TemplateElement;
			}());
			exports.TemplateElement = TemplateElement;
			var TemplateLiteral = (function () {
			    function TemplateLiteral(quasis, expressions) {
			        this.type = syntax_1.Syntax.TemplateLiteral;
			        this.quasis = quasis;
			        this.expressions = expressions;
			    }
			    return TemplateLiteral;
			}());
			exports.TemplateLiteral = TemplateLiteral;
			var ThisExpression = (function () {
			    function ThisExpression() {
			        this.type = syntax_1.Syntax.ThisExpression;
			    }
			    return ThisExpression;
			}());
			exports.ThisExpression = ThisExpression;
			var ThrowStatement = (function () {
			    function ThrowStatement(argument) {
			        this.type = syntax_1.Syntax.ThrowStatement;
			        this.argument = argument;
			    }
			    return ThrowStatement;
			}());
			exports.ThrowStatement = ThrowStatement;
			var TryStatement = (function () {
			    function TryStatement(block, handler, finalizer) {
			        this.type = syntax_1.Syntax.TryStatement;
			        this.block = block;
			        this.handler = handler;
			        this.finalizer = finalizer;
			    }
			    return TryStatement;
			}());
			exports.TryStatement = TryStatement;
			var UnaryExpression = (function () {
			    function UnaryExpression(operator, argument) {
			        this.type = syntax_1.Syntax.UnaryExpression;
			        this.operator = operator;
			        this.argument = argument;
			        this.prefix = true;
			    }
			    return UnaryExpression;
			}());
			exports.UnaryExpression = UnaryExpression;
			var UpdateExpression = (function () {
			    function UpdateExpression(operator, argument, prefix) {
			        this.type = syntax_1.Syntax.UpdateExpression;
			        this.operator = operator;
			        this.argument = argument;
			        this.prefix = prefix;
			    }
			    return UpdateExpression;
			}());
			exports.UpdateExpression = UpdateExpression;
			var VariableDeclaration = (function () {
			    function VariableDeclaration(declarations, kind) {
			        this.type = syntax_1.Syntax.VariableDeclaration;
			        this.declarations = declarations;
			        this.kind = kind;
			    }
			    return VariableDeclaration;
			}());
			exports.VariableDeclaration = VariableDeclaration;
			var VariableDeclarator = (function () {
			    function VariableDeclarator(id, init) {
			        this.type = syntax_1.Syntax.VariableDeclarator;
			        this.id = id;
			        this.init = init;
			    }
			    return VariableDeclarator;
			}());
			exports.VariableDeclarator = VariableDeclarator;
			var WhileStatement = (function () {
			    function WhileStatement(test, body) {
			        this.type = syntax_1.Syntax.WhileStatement;
			        this.test = test;
			        this.body = body;
			    }
			    return WhileStatement;
			}());
			exports.WhileStatement = WhileStatement;
			var WithStatement = (function () {
			    function WithStatement(object, body) {
			        this.type = syntax_1.Syntax.WithStatement;
			        this.object = object;
			        this.body = body;
			    }
			    return WithStatement;
			}());
			exports.WithStatement = WithStatement;
			var YieldExpression = (function () {
			    function YieldExpression(argument, delegate) {
			        this.type = syntax_1.Syntax.YieldExpression;
			        this.argument = argument;
			        this.delegate = delegate;
			    }
			    return YieldExpression;
			}());
			exports.YieldExpression = YieldExpression;


		/***/ },
		/* 8 */
		/***/ function(module, exports, __webpack_require__) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var assert_1 = __webpack_require__(9);
			var error_handler_1 = __webpack_require__(10);
			var messages_1 = __webpack_require__(11);
			var Node = __webpack_require__(7);
			var scanner_1 = __webpack_require__(12);
			var syntax_1 = __webpack_require__(2);
			var token_1 = __webpack_require__(13);
			var ArrowParameterPlaceHolder = 'ArrowParameterPlaceHolder';
			var Parser = (function () {
			    function Parser(code, options, delegate) {
			        if (options === void 0) { options = {}; }
			        this.config = {
			            range: (typeof options.range === 'boolean') && options.range,
			            loc: (typeof options.loc === 'boolean') && options.loc,
			            source: null,
			            tokens: (typeof options.tokens === 'boolean') && options.tokens,
			            comment: (typeof options.comment === 'boolean') && options.comment,
			            tolerant: (typeof options.tolerant === 'boolean') && options.tolerant
			        };
			        if (this.config.loc && options.source && options.source !== null) {
			            this.config.source = String(options.source);
			        }
			        this.delegate = delegate;
			        this.errorHandler = new error_handler_1.ErrorHandler();
			        this.errorHandler.tolerant = this.config.tolerant;
			        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
			        this.scanner.trackComment = this.config.comment;
			        this.operatorPrecedence = {
			            ')': 0,
			            ';': 0,
			            ',': 0,
			            '=': 0,
			            ']': 0,
			            '||': 1,
			            '&&': 2,
			            '|': 3,
			            '^': 4,
			            '&': 5,
			            '==': 6,
			            '!=': 6,
			            '===': 6,
			            '!==': 6,
			            '<': 7,
			            '>': 7,
			            '<=': 7,
			            '>=': 7,
			            '<<': 8,
			            '>>': 8,
			            '>>>': 8,
			            '+': 9,
			            '-': 9,
			            '*': 11,
			            '/': 11,
			            '%': 11
			        };
			        this.lookahead = {
			            type: 2 /* EOF */,
			            value: '',
			            lineNumber: this.scanner.lineNumber,
			            lineStart: 0,
			            start: 0,
			            end: 0
			        };
			        this.hasLineTerminator = false;
			        this.context = {
			            isModule: false,
			            await: false,
			            allowIn: true,
			            allowStrictDirective: true,
			            allowYield: true,
			            firstCoverInitializedNameError: null,
			            isAssignmentTarget: false,
			            isBindingElement: false,
			            inFunctionBody: false,
			            inIteration: false,
			            inSwitch: false,
			            labelSet: {},
			            strict: false
			        };
			        this.tokens = [];
			        this.startMarker = {
			            index: 0,
			            line: this.scanner.lineNumber,
			            column: 0
			        };
			        this.lastMarker = {
			            index: 0,
			            line: this.scanner.lineNumber,
			            column: 0
			        };
			        this.nextToken();
			        this.lastMarker = {
			            index: this.scanner.index,
			            line: this.scanner.lineNumber,
			            column: this.scanner.index - this.scanner.lineStart
			        };
			    }
			    Parser.prototype.throwError = function (messageFormat) {
			        var args = Array.prototype.slice.call(arguments, 1);
			        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
			            assert_1.assert(idx < args.length, 'Message reference must be in range');
			            return args[idx];
			        });
			        var index = this.lastMarker.index;
			        var line = this.lastMarker.line;
			        var column = this.lastMarker.column + 1;
			        throw this.errorHandler.createError(index, line, column, msg);
			    };
			    Parser.prototype.tolerateError = function (messageFormat) {
			        var args = Array.prototype.slice.call(arguments, 1);
			        var msg = messageFormat.replace(/%(\d)/g, function (whole, idx) {
			            assert_1.assert(idx < args.length, 'Message reference must be in range');
			            return args[idx];
			        });
			        var index = this.lastMarker.index;
			        var line = this.scanner.lineNumber;
			        var column = this.lastMarker.column + 1;
			        this.errorHandler.tolerateError(index, line, column, msg);
			    };
			    // Throw an exception because of the token.
			    Parser.prototype.unexpectedTokenError = function (token, message) {
			        var msg = message || messages_1.Messages.UnexpectedToken;
			        var value;
			        if (token) {
			            if (!message) {
			                msg = (token.type === 2 /* EOF */) ? messages_1.Messages.UnexpectedEOS :
			                    (token.type === 3 /* Identifier */) ? messages_1.Messages.UnexpectedIdentifier :
			                        (token.type === 6 /* NumericLiteral */) ? messages_1.Messages.UnexpectedNumber :
			                            (token.type === 8 /* StringLiteral */) ? messages_1.Messages.UnexpectedString :
			                                (token.type === 10 /* Template */) ? messages_1.Messages.UnexpectedTemplate :
			                                    messages_1.Messages.UnexpectedToken;
			                if (token.type === 4 /* Keyword */) {
			                    if (this.scanner.isFutureReservedWord(token.value)) {
			                        msg = messages_1.Messages.UnexpectedReserved;
			                    }
			                    else if (this.context.strict && this.scanner.isStrictModeReservedWord(token.value)) {
			                        msg = messages_1.Messages.StrictReservedWord;
			                    }
			                }
			            }
			            value = token.value;
			        }
			        else {
			            value = 'ILLEGAL';
			        }
			        msg = msg.replace('%0', value);
			        if (token && typeof token.lineNumber === 'number') {
			            var index = token.start;
			            var line = token.lineNumber;
			            var lastMarkerLineStart = this.lastMarker.index - this.lastMarker.column;
			            var column = token.start - lastMarkerLineStart + 1;
			            return this.errorHandler.createError(index, line, column, msg);
			        }
			        else {
			            var index = this.lastMarker.index;
			            var line = this.lastMarker.line;
			            var column = this.lastMarker.column + 1;
			            return this.errorHandler.createError(index, line, column, msg);
			        }
			    };
			    Parser.prototype.throwUnexpectedToken = function (token, message) {
			        throw this.unexpectedTokenError(token, message);
			    };
			    Parser.prototype.tolerateUnexpectedToken = function (token, message) {
			        this.errorHandler.tolerate(this.unexpectedTokenError(token, message));
			    };
			    Parser.prototype.collectComments = function () {
			        if (!this.config.comment) {
			            this.scanner.scanComments();
			        }
			        else {
			            var comments = this.scanner.scanComments();
			            if (comments.length > 0 && this.delegate) {
			                for (var i = 0; i < comments.length; ++i) {
			                    var e = comments[i];
			                    var node = void 0;
			                    node = {
			                        type: e.multiLine ? 'BlockComment' : 'LineComment',
			                        value: this.scanner.source.slice(e.slice[0], e.slice[1])
			                    };
			                    if (this.config.range) {
			                        node.range = e.range;
			                    }
			                    if (this.config.loc) {
			                        node.loc = e.loc;
			                    }
			                    var metadata = {
			                        start: {
			                            line: e.loc.start.line,
			                            column: e.loc.start.column,
			                            offset: e.range[0]
			                        },
			                        end: {
			                            line: e.loc.end.line,
			                            column: e.loc.end.column,
			                            offset: e.range[1]
			                        }
			                    };
			                    this.delegate(node, metadata);
			                }
			            }
			        }
			    };
			    // From internal representation to an external structure
			    Parser.prototype.getTokenRaw = function (token) {
			        return this.scanner.source.slice(token.start, token.end);
			    };
			    Parser.prototype.convertToken = function (token) {
			        var t = {
			            type: token_1.TokenName[token.type],
			            value: this.getTokenRaw(token)
			        };
			        if (this.config.range) {
			            t.range = [token.start, token.end];
			        }
			        if (this.config.loc) {
			            t.loc = {
			                start: {
			                    line: this.startMarker.line,
			                    column: this.startMarker.column
			                },
			                end: {
			                    line: this.scanner.lineNumber,
			                    column: this.scanner.index - this.scanner.lineStart
			                }
			            };
			        }
			        if (token.type === 9 /* RegularExpression */) {
			            var pattern = token.pattern;
			            var flags = token.flags;
			            t.regex = { pattern: pattern, flags: flags };
			        }
			        return t;
			    };
			    Parser.prototype.nextToken = function () {
			        var token = this.lookahead;
			        this.lastMarker.index = this.scanner.index;
			        this.lastMarker.line = this.scanner.lineNumber;
			        this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
			        this.collectComments();
			        if (this.scanner.index !== this.startMarker.index) {
			            this.startMarker.index = this.scanner.index;
			            this.startMarker.line = this.scanner.lineNumber;
			            this.startMarker.column = this.scanner.index - this.scanner.lineStart;
			        }
			        var next = this.scanner.lex();
			        this.hasLineTerminator = (token.lineNumber !== next.lineNumber);
			        if (next && this.context.strict && next.type === 3 /* Identifier */) {
			            if (this.scanner.isStrictModeReservedWord(next.value)) {
			                next.type = 4 /* Keyword */;
			            }
			        }
			        this.lookahead = next;
			        if (this.config.tokens && next.type !== 2 /* EOF */) {
			            this.tokens.push(this.convertToken(next));
			        }
			        return token;
			    };
			    Parser.prototype.nextRegexToken = function () {
			        this.collectComments();
			        var token = this.scanner.scanRegExp();
			        if (this.config.tokens) {
			            // Pop the previous token, '/' or '/='
			            // This is added from the lookahead token.
			            this.tokens.pop();
			            this.tokens.push(this.convertToken(token));
			        }
			        // Prime the next lookahead.
			        this.lookahead = token;
			        this.nextToken();
			        return token;
			    };
			    Parser.prototype.createNode = function () {
			        return {
			            index: this.startMarker.index,
			            line: this.startMarker.line,
			            column: this.startMarker.column
			        };
			    };
			    Parser.prototype.startNode = function (token, lastLineStart) {
			        if (lastLineStart === void 0) { lastLineStart = 0; }
			        var column = token.start - token.lineStart;
			        var line = token.lineNumber;
			        if (column < 0) {
			            column += lastLineStart;
			            line--;
			        }
			        return {
			            index: token.start,
			            line: line,
			            column: column
			        };
			    };
			    Parser.prototype.finalize = function (marker, node) {
			        if (this.config.range) {
			            node.range = [marker.index, this.lastMarker.index];
			        }
			        if (this.config.loc) {
			            node.loc = {
			                start: {
			                    line: marker.line,
			                    column: marker.column,
			                },
			                end: {
			                    line: this.lastMarker.line,
			                    column: this.lastMarker.column
			                }
			            };
			            if (this.config.source) {
			                node.loc.source = this.config.source;
			            }
			        }
			        if (this.delegate) {
			            var metadata = {
			                start: {
			                    line: marker.line,
			                    column: marker.column,
			                    offset: marker.index
			                },
			                end: {
			                    line: this.lastMarker.line,
			                    column: this.lastMarker.column,
			                    offset: this.lastMarker.index
			                }
			            };
			            this.delegate(node, metadata);
			        }
			        return node;
			    };
			    // Expect the next token to match the specified punctuator.
			    // If not, an exception will be thrown.
			    Parser.prototype.expect = function (value) {
			        var token = this.nextToken();
			        if (token.type !== 7 /* Punctuator */ || token.value !== value) {
			            this.throwUnexpectedToken(token);
			        }
			    };
			    // Quietly expect a comma when in tolerant mode, otherwise delegates to expect().
			    Parser.prototype.expectCommaSeparator = function () {
			        if (this.config.tolerant) {
			            var token = this.lookahead;
			            if (token.type === 7 /* Punctuator */ && token.value === ',') {
			                this.nextToken();
			            }
			            else if (token.type === 7 /* Punctuator */ && token.value === ';') {
			                this.nextToken();
			                this.tolerateUnexpectedToken(token);
			            }
			            else {
			                this.tolerateUnexpectedToken(token, messages_1.Messages.UnexpectedToken);
			            }
			        }
			        else {
			            this.expect(',');
			        }
			    };
			    // Expect the next token to match the specified keyword.
			    // If not, an exception will be thrown.
			    Parser.prototype.expectKeyword = function (keyword) {
			        var token = this.nextToken();
			        if (token.type !== 4 /* Keyword */ || token.value !== keyword) {
			            this.throwUnexpectedToken(token);
			        }
			    };
			    // Return true if the next token matches the specified punctuator.
			    Parser.prototype.match = function (value) {
			        return this.lookahead.type === 7 /* Punctuator */ && this.lookahead.value === value;
			    };
			    // Return true if the next token matches the specified keyword
			    Parser.prototype.matchKeyword = function (keyword) {
			        return this.lookahead.type === 4 /* Keyword */ && this.lookahead.value === keyword;
			    };
			    // Return true if the next token matches the specified contextual keyword
			    // (where an identifier is sometimes a keyword depending on the context)
			    Parser.prototype.matchContextualKeyword = function (keyword) {
			        return this.lookahead.type === 3 /* Identifier */ && this.lookahead.value === keyword;
			    };
			    // Return true if the next token is an assignment operator
			    Parser.prototype.matchAssign = function () {
			        if (this.lookahead.type !== 7 /* Punctuator */) {
			            return false;
			        }
			        var op = this.lookahead.value;
			        return op === '=' ||
			            op === '*=' ||
			            op === '**=' ||
			            op === '/=' ||
			            op === '%=' ||
			            op === '+=' ||
			            op === '-=' ||
			            op === '<<=' ||
			            op === '>>=' ||
			            op === '>>>=' ||
			            op === '&=' ||
			            op === '^=' ||
			            op === '|=';
			    };
			    // Cover grammar support.
			    //
			    // When an assignment expression position starts with an left parenthesis, the determination of the type
			    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
			    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
			    //
			    // There are three productions that can be parsed in a parentheses pair that needs to be determined
			    // after the outermost pair is closed. They are:
			    //
			    //   1. AssignmentExpression
			    //   2. BindingElements
			    //   3. AssignmentTargets
			    //
			    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
			    // binding element or assignment target.
			    //
			    // The three productions have the relationship:
			    //
			    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
			    //
			    // with a single exception that CoverInitializedName when used directly in an Expression, generates
			    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
			    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
			    //
			    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
			    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
			    // the CoverInitializedName check is conducted.
			    //
			    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
			    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
			    // pattern. The CoverInitializedName check is deferred.
			    Parser.prototype.isolateCoverGrammar = function (parseFunction) {
			        var previousIsBindingElement = this.context.isBindingElement;
			        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
			        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
			        this.context.isBindingElement = true;
			        this.context.isAssignmentTarget = true;
			        this.context.firstCoverInitializedNameError = null;
			        var result = parseFunction.call(this);
			        if (this.context.firstCoverInitializedNameError !== null) {
			            this.throwUnexpectedToken(this.context.firstCoverInitializedNameError);
			        }
			        this.context.isBindingElement = previousIsBindingElement;
			        this.context.isAssignmentTarget = previousIsAssignmentTarget;
			        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError;
			        return result;
			    };
			    Parser.prototype.inheritCoverGrammar = function (parseFunction) {
			        var previousIsBindingElement = this.context.isBindingElement;
			        var previousIsAssignmentTarget = this.context.isAssignmentTarget;
			        var previousFirstCoverInitializedNameError = this.context.firstCoverInitializedNameError;
			        this.context.isBindingElement = true;
			        this.context.isAssignmentTarget = true;
			        this.context.firstCoverInitializedNameError = null;
			        var result = parseFunction.call(this);
			        this.context.isBindingElement = this.context.isBindingElement && previousIsBindingElement;
			        this.context.isAssignmentTarget = this.context.isAssignmentTarget && previousIsAssignmentTarget;
			        this.context.firstCoverInitializedNameError = previousFirstCoverInitializedNameError || this.context.firstCoverInitializedNameError;
			        return result;
			    };
			    Parser.prototype.consumeSemicolon = function () {
			        if (this.match(';')) {
			            this.nextToken();
			        }
			        else if (!this.hasLineTerminator) {
			            if (this.lookahead.type !== 2 /* EOF */ && !this.match('}')) {
			                this.throwUnexpectedToken(this.lookahead);
			            }
			            this.lastMarker.index = this.startMarker.index;
			            this.lastMarker.line = this.startMarker.line;
			            this.lastMarker.column = this.startMarker.column;
			        }
			    };
			    // https://tc39.github.io/ecma262/#sec-primary-expression
			    Parser.prototype.parsePrimaryExpression = function () {
			        var node = this.createNode();
			        var expr;
			        var token, raw;
			        switch (this.lookahead.type) {
			            case 3 /* Identifier */:
			                if ((this.context.isModule || this.context.await) && this.lookahead.value === 'await') {
			                    this.tolerateUnexpectedToken(this.lookahead);
			                }
			                expr = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(node, new Node.Identifier(this.nextToken().value));
			                break;
			            case 6 /* NumericLiteral */:
			            case 8 /* StringLiteral */:
			                if (this.context.strict && this.lookahead.octal) {
			                    this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.StrictOctalLiteral);
			                }
			                this.context.isAssignmentTarget = false;
			                this.context.isBindingElement = false;
			                token = this.nextToken();
			                raw = this.getTokenRaw(token);
			                expr = this.finalize(node, new Node.Literal(token.value, raw));
			                break;
			            case 1 /* BooleanLiteral */:
			                this.context.isAssignmentTarget = false;
			                this.context.isBindingElement = false;
			                token = this.nextToken();
			                raw = this.getTokenRaw(token);
			                expr = this.finalize(node, new Node.Literal(token.value === 'true', raw));
			                break;
			            case 5 /* NullLiteral */:
			                this.context.isAssignmentTarget = false;
			                this.context.isBindingElement = false;
			                token = this.nextToken();
			                raw = this.getTokenRaw(token);
			                expr = this.finalize(node, new Node.Literal(null, raw));
			                break;
			            case 10 /* Template */:
			                expr = this.parseTemplateLiteral();
			                break;
			            case 7 /* Punctuator */:
			                switch (this.lookahead.value) {
			                    case '(':
			                        this.context.isBindingElement = false;
			                        expr = this.inheritCoverGrammar(this.parseGroupExpression);
			                        break;
			                    case '[':
			                        expr = this.inheritCoverGrammar(this.parseArrayInitializer);
			                        break;
			                    case '{':
			                        expr = this.inheritCoverGrammar(this.parseObjectInitializer);
			                        break;
			                    case '/':
			                    case '/=':
			                        this.context.isAssignmentTarget = false;
			                        this.context.isBindingElement = false;
			                        this.scanner.index = this.startMarker.index;
			                        token = this.nextRegexToken();
			                        raw = this.getTokenRaw(token);
			                        expr = this.finalize(node, new Node.RegexLiteral(token.regex, raw, token.pattern, token.flags));
			                        break;
			                    default:
			                        expr = this.throwUnexpectedToken(this.nextToken());
			                }
			                break;
			            case 4 /* Keyword */:
			                if (!this.context.strict && this.context.allowYield && this.matchKeyword('yield')) {
			                    expr = this.parseIdentifierName();
			                }
			                else if (!this.context.strict && this.matchKeyword('let')) {
			                    expr = this.finalize(node, new Node.Identifier(this.nextToken().value));
			                }
			                else {
			                    this.context.isAssignmentTarget = false;
			                    this.context.isBindingElement = false;
			                    if (this.matchKeyword('function')) {
			                        expr = this.parseFunctionExpression();
			                    }
			                    else if (this.matchKeyword('this')) {
			                        this.nextToken();
			                        expr = this.finalize(node, new Node.ThisExpression());
			                    }
			                    else if (this.matchKeyword('class')) {
			                        expr = this.parseClassExpression();
			                    }
			                    else {
			                        expr = this.throwUnexpectedToken(this.nextToken());
			                    }
			                }
			                break;
			            default:
			                expr = this.throwUnexpectedToken(this.nextToken());
			        }
			        return expr;
			    };
			    // https://tc39.github.io/ecma262/#sec-array-initializer
			    Parser.prototype.parseSpreadElement = function () {
			        var node = this.createNode();
			        this.expect('...');
			        var arg = this.inheritCoverGrammar(this.parseAssignmentExpression);
			        return this.finalize(node, new Node.SpreadElement(arg));
			    };
			    Parser.prototype.parseArrayInitializer = function () {
			        var node = this.createNode();
			        var elements = [];
			        this.expect('[');
			        while (!this.match(']')) {
			            if (this.match(',')) {
			                this.nextToken();
			                elements.push(null);
			            }
			            else if (this.match('...')) {
			                var element = this.parseSpreadElement();
			                if (!this.match(']')) {
			                    this.context.isAssignmentTarget = false;
			                    this.context.isBindingElement = false;
			                    this.expect(',');
			                }
			                elements.push(element);
			            }
			            else {
			                elements.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
			                if (!this.match(']')) {
			                    this.expect(',');
			                }
			            }
			        }
			        this.expect(']');
			        return this.finalize(node, new Node.ArrayExpression(elements));
			    };
			    // https://tc39.github.io/ecma262/#sec-object-initializer
			    Parser.prototype.parsePropertyMethod = function (params) {
			        this.context.isAssignmentTarget = false;
			        this.context.isBindingElement = false;
			        var previousStrict = this.context.strict;
			        var previousAllowStrictDirective = this.context.allowStrictDirective;
			        this.context.allowStrictDirective = params.simple;
			        var body = this.isolateCoverGrammar(this.parseFunctionSourceElements);
			        if (this.context.strict && params.firstRestricted) {
			            this.tolerateUnexpectedToken(params.firstRestricted, params.message);
			        }
			        if (this.context.strict && params.stricted) {
			            this.tolerateUnexpectedToken(params.stricted, params.message);
			        }
			        this.context.strict = previousStrict;
			        this.context.allowStrictDirective = previousAllowStrictDirective;
			        return body;
			    };
			    Parser.prototype.parsePropertyMethodFunction = function () {
			        var isGenerator = false;
			        var node = this.createNode();
			        var previousAllowYield = this.context.allowYield;
			        this.context.allowYield = true;
			        var params = this.parseFormalParameters();
			        var method = this.parsePropertyMethod(params);
			        this.context.allowYield = previousAllowYield;
			        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
			    };
			    Parser.prototype.parsePropertyMethodAsyncFunction = function () {
			        var node = this.createNode();
			        var previousAllowYield = this.context.allowYield;
			        var previousAwait = this.context.await;
			        this.context.allowYield = false;
			        this.context.await = true;
			        var params = this.parseFormalParameters();
			        var method = this.parsePropertyMethod(params);
			        this.context.allowYield = previousAllowYield;
			        this.context.await = previousAwait;
			        return this.finalize(node, new Node.AsyncFunctionExpression(null, params.params, method));
			    };
			    Parser.prototype.parseObjectPropertyKey = function () {
			        var node = this.createNode();
			        var token = this.nextToken();
			        var key;
			        switch (token.type) {
			            case 8 /* StringLiteral */:
			            case 6 /* NumericLiteral */:
			                if (this.context.strict && token.octal) {
			                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictOctalLiteral);
			                }
			                var raw = this.getTokenRaw(token);
			                key = this.finalize(node, new Node.Literal(token.value, raw));
			                break;
			            case 3 /* Identifier */:
			            case 1 /* BooleanLiteral */:
			            case 5 /* NullLiteral */:
			            case 4 /* Keyword */:
			                key = this.finalize(node, new Node.Identifier(token.value));
			                break;
			            case 7 /* Punctuator */:
			                if (token.value === '[') {
			                    key = this.isolateCoverGrammar(this.parseAssignmentExpression);
			                    this.expect(']');
			                }
			                else {
			                    key = this.throwUnexpectedToken(token);
			                }
			                break;
			            default:
			                key = this.throwUnexpectedToken(token);
			        }
			        return key;
			    };
			    Parser.prototype.isPropertyKey = function (key, value) {
			        return (key.type === syntax_1.Syntax.Identifier && key.name === value) ||
			            (key.type === syntax_1.Syntax.Literal && key.value === value);
			    };
			    Parser.prototype.parseObjectProperty = function (hasProto) {
			        var node = this.createNode();
			        var token = this.lookahead;
			        var kind;
			        var key = null;
			        var value = null;
			        var computed = false;
			        var method = false;
			        var shorthand = false;
			        var isAsync = false;
			        if (token.type === 3 /* Identifier */) {
			            var id = token.value;
			            this.nextToken();
			            computed = this.match('[');
			            isAsync = !this.hasLineTerminator && (id === 'async') &&
			                !this.match(':') && !this.match('(') && !this.match('*') && !this.match(',');
			            key = isAsync ? this.parseObjectPropertyKey() : this.finalize(node, new Node.Identifier(id));
			        }
			        else if (this.match('*')) {
			            this.nextToken();
			        }
			        else {
			            computed = this.match('[');
			            key = this.parseObjectPropertyKey();
			        }
			        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
			        if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'get' && lookaheadPropertyKey) {
			            kind = 'get';
			            computed = this.match('[');
			            key = this.parseObjectPropertyKey();
			            this.context.allowYield = false;
			            value = this.parseGetterMethod();
			        }
			        else if (token.type === 3 /* Identifier */ && !isAsync && token.value === 'set' && lookaheadPropertyKey) {
			            kind = 'set';
			            computed = this.match('[');
			            key = this.parseObjectPropertyKey();
			            value = this.parseSetterMethod();
			        }
			        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
			            kind = 'init';
			            computed = this.match('[');
			            key = this.parseObjectPropertyKey();
			            value = this.parseGeneratorMethod();
			            method = true;
			        }
			        else {
			            if (!key) {
			                this.throwUnexpectedToken(this.lookahead);
			            }
			            kind = 'init';
			            if (this.match(':') && !isAsync) {
			                if (!computed && this.isPropertyKey(key, '__proto__')) {
			                    if (hasProto.value) {
			                        this.tolerateError(messages_1.Messages.DuplicateProtoProperty);
			                    }
			                    hasProto.value = true;
			                }
			                this.nextToken();
			                value = this.inheritCoverGrammar(this.parseAssignmentExpression);
			            }
			            else if (this.match('(')) {
			                value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
			                method = true;
			            }
			            else if (token.type === 3 /* Identifier */) {
			                var id = this.finalize(node, new Node.Identifier(token.value));
			                if (this.match('=')) {
			                    this.context.firstCoverInitializedNameError = this.lookahead;
			                    this.nextToken();
			                    shorthand = true;
			                    var init = this.isolateCoverGrammar(this.parseAssignmentExpression);
			                    value = this.finalize(node, new Node.AssignmentPattern(id, init));
			                }
			                else {
			                    shorthand = true;
			                    value = id;
			                }
			            }
			            else {
			                this.throwUnexpectedToken(this.nextToken());
			            }
			        }
			        return this.finalize(node, new Node.Property(kind, key, computed, value, method, shorthand));
			    };
			    Parser.prototype.parseObjectInitializer = function () {
			        var node = this.createNode();
			        this.expect('{');
			        var properties = [];
			        var hasProto = { value: false };
			        while (!this.match('}')) {
			            properties.push(this.parseObjectProperty(hasProto));
			            if (!this.match('}')) {
			                this.expectCommaSeparator();
			            }
			        }
			        this.expect('}');
			        return this.finalize(node, new Node.ObjectExpression(properties));
			    };
			    // https://tc39.github.io/ecma262/#sec-template-literals
			    Parser.prototype.parseTemplateHead = function () {
			        assert_1.assert(this.lookahead.head, 'Template literal must start with a template head');
			        var node = this.createNode();
			        var token = this.nextToken();
			        var raw = token.value;
			        var cooked = token.cooked;
			        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
			    };
			    Parser.prototype.parseTemplateElement = function () {
			        if (this.lookahead.type !== 10 /* Template */) {
			            this.throwUnexpectedToken();
			        }
			        var node = this.createNode();
			        var token = this.nextToken();
			        var raw = token.value;
			        var cooked = token.cooked;
			        return this.finalize(node, new Node.TemplateElement({ raw: raw, cooked: cooked }, token.tail));
			    };
			    Parser.prototype.parseTemplateLiteral = function () {
			        var node = this.createNode();
			        var expressions = [];
			        var quasis = [];
			        var quasi = this.parseTemplateHead();
			        quasis.push(quasi);
			        while (!quasi.tail) {
			            expressions.push(this.parseExpression());
			            quasi = this.parseTemplateElement();
			            quasis.push(quasi);
			        }
			        return this.finalize(node, new Node.TemplateLiteral(quasis, expressions));
			    };
			    // https://tc39.github.io/ecma262/#sec-grouping-operator
			    Parser.prototype.reinterpretExpressionAsPattern = function (expr) {
			        switch (expr.type) {
			            case syntax_1.Syntax.Identifier:
			            case syntax_1.Syntax.MemberExpression:
			            case syntax_1.Syntax.RestElement:
			            case syntax_1.Syntax.AssignmentPattern:
			                break;
			            case syntax_1.Syntax.SpreadElement:
			                expr.type = syntax_1.Syntax.RestElement;
			                this.reinterpretExpressionAsPattern(expr.argument);
			                break;
			            case syntax_1.Syntax.ArrayExpression:
			                expr.type = syntax_1.Syntax.ArrayPattern;
			                for (var i = 0; i < expr.elements.length; i++) {
			                    if (expr.elements[i] !== null) {
			                        this.reinterpretExpressionAsPattern(expr.elements[i]);
			                    }
			                }
			                break;
			            case syntax_1.Syntax.ObjectExpression:
			                expr.type = syntax_1.Syntax.ObjectPattern;
			                for (var i = 0; i < expr.properties.length; i++) {
			                    this.reinterpretExpressionAsPattern(expr.properties[i].value);
			                }
			                break;
			            case syntax_1.Syntax.AssignmentExpression:
			                expr.type = syntax_1.Syntax.AssignmentPattern;
			                delete expr.operator;
			                this.reinterpretExpressionAsPattern(expr.left);
			                break;
			        }
			    };
			    Parser.prototype.parseGroupExpression = function () {
			        var expr;
			        this.expect('(');
			        if (this.match(')')) {
			            this.nextToken();
			            if (!this.match('=>')) {
			                this.expect('=>');
			            }
			            expr = {
			                type: ArrowParameterPlaceHolder,
			                params: [],
			                async: false
			            };
			        }
			        else {
			            var startToken = this.lookahead;
			            var params = [];
			            if (this.match('...')) {
			                expr = this.parseRestElement(params);
			                this.expect(')');
			                if (!this.match('=>')) {
			                    this.expect('=>');
			                }
			                expr = {
			                    type: ArrowParameterPlaceHolder,
			                    params: [expr],
			                    async: false
			                };
			            }
			            else {
			                var arrow = false;
			                this.context.isBindingElement = true;
			                expr = this.inheritCoverGrammar(this.parseAssignmentExpression);
			                if (this.match(',')) {
			                    var expressions = [];
			                    this.context.isAssignmentTarget = false;
			                    expressions.push(expr);
			                    while (this.lookahead.type !== 2 /* EOF */) {
			                        if (!this.match(',')) {
			                            break;
			                        }
			                        this.nextToken();
			                        if (this.match(')')) {
			                            this.nextToken();
			                            for (var i = 0; i < expressions.length; i++) {
			                                this.reinterpretExpressionAsPattern(expressions[i]);
			                            }
			                            arrow = true;
			                            expr = {
			                                type: ArrowParameterPlaceHolder,
			                                params: expressions,
			                                async: false
			                            };
			                        }
			                        else if (this.match('...')) {
			                            if (!this.context.isBindingElement) {
			                                this.throwUnexpectedToken(this.lookahead);
			                            }
			                            expressions.push(this.parseRestElement(params));
			                            this.expect(')');
			                            if (!this.match('=>')) {
			                                this.expect('=>');
			                            }
			                            this.context.isBindingElement = false;
			                            for (var i = 0; i < expressions.length; i++) {
			                                this.reinterpretExpressionAsPattern(expressions[i]);
			                            }
			                            arrow = true;
			                            expr = {
			                                type: ArrowParameterPlaceHolder,
			                                params: expressions,
			                                async: false
			                            };
			                        }
			                        else {
			                            expressions.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
			                        }
			                        if (arrow) {
			                            break;
			                        }
			                    }
			                    if (!arrow) {
			                        expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
			                    }
			                }
			                if (!arrow) {
			                    this.expect(')');
			                    if (this.match('=>')) {
			                        if (expr.type === syntax_1.Syntax.Identifier && expr.name === 'yield') {
			                            arrow = true;
			                            expr = {
			                                type: ArrowParameterPlaceHolder,
			                                params: [expr],
			                                async: false
			                            };
			                        }
			                        if (!arrow) {
			                            if (!this.context.isBindingElement) {
			                                this.throwUnexpectedToken(this.lookahead);
			                            }
			                            if (expr.type === syntax_1.Syntax.SequenceExpression) {
			                                for (var i = 0; i < expr.expressions.length; i++) {
			                                    this.reinterpretExpressionAsPattern(expr.expressions[i]);
			                                }
			                            }
			                            else {
			                                this.reinterpretExpressionAsPattern(expr);
			                            }
			                            var parameters = (expr.type === syntax_1.Syntax.SequenceExpression ? expr.expressions : [expr]);
			                            expr = {
			                                type: ArrowParameterPlaceHolder,
			                                params: parameters,
			                                async: false
			                            };
			                        }
			                    }
			                    this.context.isBindingElement = false;
			                }
			            }
			        }
			        return expr;
			    };
			    // https://tc39.github.io/ecma262/#sec-left-hand-side-expressions
			    Parser.prototype.parseArguments = function () {
			        this.expect('(');
			        var args = [];
			        if (!this.match(')')) {
			            while (true) {
			                var expr = this.match('...') ? this.parseSpreadElement() :
			                    this.isolateCoverGrammar(this.parseAssignmentExpression);
			                args.push(expr);
			                if (this.match(')')) {
			                    break;
			                }
			                this.expectCommaSeparator();
			                if (this.match(')')) {
			                    break;
			                }
			            }
			        }
			        this.expect(')');
			        return args;
			    };
			    Parser.prototype.isIdentifierName = function (token) {
			        return token.type === 3 /* Identifier */ ||
			            token.type === 4 /* Keyword */ ||
			            token.type === 1 /* BooleanLiteral */ ||
			            token.type === 5 /* NullLiteral */;
			    };
			    Parser.prototype.parseIdentifierName = function () {
			        var node = this.createNode();
			        var token = this.nextToken();
			        if (!this.isIdentifierName(token)) {
			            this.throwUnexpectedToken(token);
			        }
			        return this.finalize(node, new Node.Identifier(token.value));
			    };
			    Parser.prototype.parseNewExpression = function () {
			        var node = this.createNode();
			        var id = this.parseIdentifierName();
			        assert_1.assert(id.name === 'new', 'New expression must start with `new`');
			        var expr;
			        if (this.match('.')) {
			            this.nextToken();
			            if (this.lookahead.type === 3 /* Identifier */ && this.context.inFunctionBody && this.lookahead.value === 'target') {
			                var property = this.parseIdentifierName();
			                expr = new Node.MetaProperty(id, property);
			            }
			            else {
			                this.throwUnexpectedToken(this.lookahead);
			            }
			        }
			        else {
			            var callee = this.isolateCoverGrammar(this.parseLeftHandSideExpression);
			            var args = this.match('(') ? this.parseArguments() : [];
			            expr = new Node.NewExpression(callee, args);
			            this.context.isAssignmentTarget = false;
			            this.context.isBindingElement = false;
			        }
			        return this.finalize(node, expr);
			    };
			    Parser.prototype.parseAsyncArgument = function () {
			        var arg = this.parseAssignmentExpression();
			        this.context.firstCoverInitializedNameError = null;
			        return arg;
			    };
			    Parser.prototype.parseAsyncArguments = function () {
			        this.expect('(');
			        var args = [];
			        if (!this.match(')')) {
			            while (true) {
			                var expr = this.match('...') ? this.parseSpreadElement() :
			                    this.isolateCoverGrammar(this.parseAsyncArgument);
			                args.push(expr);
			                if (this.match(')')) {
			                    break;
			                }
			                this.expectCommaSeparator();
			                if (this.match(')')) {
			                    break;
			                }
			            }
			        }
			        this.expect(')');
			        return args;
			    };
			    Parser.prototype.parseLeftHandSideExpressionAllowCall = function () {
			        var startToken = this.lookahead;
			        var maybeAsync = this.matchContextualKeyword('async');
			        var previousAllowIn = this.context.allowIn;
			        this.context.allowIn = true;
			        var expr;
			        if (this.matchKeyword('super') && this.context.inFunctionBody) {
			            expr = this.createNode();
			            this.nextToken();
			            expr = this.finalize(expr, new Node.Super());
			            if (!this.match('(') && !this.match('.') && !this.match('[')) {
			                this.throwUnexpectedToken(this.lookahead);
			            }
			        }
			        else {
			            expr = this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
			        }
			        while (true) {
			            if (this.match('.')) {
			                this.context.isBindingElement = false;
			                this.context.isAssignmentTarget = true;
			                this.expect('.');
			                var property = this.parseIdentifierName();
			                expr = this.finalize(this.startNode(startToken), new Node.StaticMemberExpression(expr, property));
			            }
			            else if (this.match('(')) {
			                var asyncArrow = maybeAsync && (startToken.lineNumber === this.lookahead.lineNumber);
			                this.context.isBindingElement = false;
			                this.context.isAssignmentTarget = false;
			                var args = asyncArrow ? this.parseAsyncArguments() : this.parseArguments();
			                expr = this.finalize(this.startNode(startToken), new Node.CallExpression(expr, args));
			                if (asyncArrow && this.match('=>')) {
			                    for (var i = 0; i < args.length; ++i) {
			                        this.reinterpretExpressionAsPattern(args[i]);
			                    }
			                    expr = {
			                        type: ArrowParameterPlaceHolder,
			                        params: args,
			                        async: true
			                    };
			                }
			            }
			            else if (this.match('[')) {
			                this.context.isBindingElement = false;
			                this.context.isAssignmentTarget = true;
			                this.expect('[');
			                var property = this.isolateCoverGrammar(this.parseExpression);
			                this.expect(']');
			                expr = this.finalize(this.startNode(startToken), new Node.ComputedMemberExpression(expr, property));
			            }
			            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
			                var quasi = this.parseTemplateLiteral();
			                expr = this.finalize(this.startNode(startToken), new Node.TaggedTemplateExpression(expr, quasi));
			            }
			            else {
			                break;
			            }
			        }
			        this.context.allowIn = previousAllowIn;
			        return expr;
			    };
			    Parser.prototype.parseSuper = function () {
			        var node = this.createNode();
			        this.expectKeyword('super');
			        if (!this.match('[') && !this.match('.')) {
			            this.throwUnexpectedToken(this.lookahead);
			        }
			        return this.finalize(node, new Node.Super());
			    };
			    Parser.prototype.parseLeftHandSideExpression = function () {
			        assert_1.assert(this.context.allowIn, 'callee of new expression always allow in keyword.');
			        var node = this.startNode(this.lookahead);
			        var expr = (this.matchKeyword('super') && this.context.inFunctionBody) ? this.parseSuper() :
			            this.inheritCoverGrammar(this.matchKeyword('new') ? this.parseNewExpression : this.parsePrimaryExpression);
			        while (true) {
			            if (this.match('[')) {
			                this.context.isBindingElement = false;
			                this.context.isAssignmentTarget = true;
			                this.expect('[');
			                var property = this.isolateCoverGrammar(this.parseExpression);
			                this.expect(']');
			                expr = this.finalize(node, new Node.ComputedMemberExpression(expr, property));
			            }
			            else if (this.match('.')) {
			                this.context.isBindingElement = false;
			                this.context.isAssignmentTarget = true;
			                this.expect('.');
			                var property = this.parseIdentifierName();
			                expr = this.finalize(node, new Node.StaticMemberExpression(expr, property));
			            }
			            else if (this.lookahead.type === 10 /* Template */ && this.lookahead.head) {
			                var quasi = this.parseTemplateLiteral();
			                expr = this.finalize(node, new Node.TaggedTemplateExpression(expr, quasi));
			            }
			            else {
			                break;
			            }
			        }
			        return expr;
			    };
			    // https://tc39.github.io/ecma262/#sec-update-expressions
			    Parser.prototype.parseUpdateExpression = function () {
			        var expr;
			        var startToken = this.lookahead;
			        if (this.match('++') || this.match('--')) {
			            var node = this.startNode(startToken);
			            var token = this.nextToken();
			            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
			            if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
			                this.tolerateError(messages_1.Messages.StrictLHSPrefix);
			            }
			            if (!this.context.isAssignmentTarget) {
			                this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
			            }
			            var prefix = true;
			            expr = this.finalize(node, new Node.UpdateExpression(token.value, expr, prefix));
			            this.context.isAssignmentTarget = false;
			            this.context.isBindingElement = false;
			        }
			        else {
			            expr = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
			            if (!this.hasLineTerminator && this.lookahead.type === 7 /* Punctuator */) {
			                if (this.match('++') || this.match('--')) {
			                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier && this.scanner.isRestrictedWord(expr.name)) {
			                        this.tolerateError(messages_1.Messages.StrictLHSPostfix);
			                    }
			                    if (!this.context.isAssignmentTarget) {
			                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
			                    }
			                    this.context.isAssignmentTarget = false;
			                    this.context.isBindingElement = false;
			                    var operator = this.nextToken().value;
			                    var prefix = false;
			                    expr = this.finalize(this.startNode(startToken), new Node.UpdateExpression(operator, expr, prefix));
			                }
			            }
			        }
			        return expr;
			    };
			    // https://tc39.github.io/ecma262/#sec-unary-operators
			    Parser.prototype.parseAwaitExpression = function () {
			        var node = this.createNode();
			        this.nextToken();
			        var argument = this.parseUnaryExpression();
			        return this.finalize(node, new Node.AwaitExpression(argument));
			    };
			    Parser.prototype.parseUnaryExpression = function () {
			        var expr;
			        if (this.match('+') || this.match('-') || this.match('~') || this.match('!') ||
			            this.matchKeyword('delete') || this.matchKeyword('void') || this.matchKeyword('typeof')) {
			            var node = this.startNode(this.lookahead);
			            var token = this.nextToken();
			            expr = this.inheritCoverGrammar(this.parseUnaryExpression);
			            expr = this.finalize(node, new Node.UnaryExpression(token.value, expr));
			            if (this.context.strict && expr.operator === 'delete' && expr.argument.type === syntax_1.Syntax.Identifier) {
			                this.tolerateError(messages_1.Messages.StrictDelete);
			            }
			            this.context.isAssignmentTarget = false;
			            this.context.isBindingElement = false;
			        }
			        else if (this.context.await && this.matchContextualKeyword('await')) {
			            expr = this.parseAwaitExpression();
			        }
			        else {
			            expr = this.parseUpdateExpression();
			        }
			        return expr;
			    };
			    Parser.prototype.parseExponentiationExpression = function () {
			        var startToken = this.lookahead;
			        var expr = this.inheritCoverGrammar(this.parseUnaryExpression);
			        if (expr.type !== syntax_1.Syntax.UnaryExpression && this.match('**')) {
			            this.nextToken();
			            this.context.isAssignmentTarget = false;
			            this.context.isBindingElement = false;
			            var left = expr;
			            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
			            expr = this.finalize(this.startNode(startToken), new Node.BinaryExpression('**', left, right));
			        }
			        return expr;
			    };
			    // https://tc39.github.io/ecma262/#sec-exp-operator
			    // https://tc39.github.io/ecma262/#sec-multiplicative-operators
			    // https://tc39.github.io/ecma262/#sec-additive-operators
			    // https://tc39.github.io/ecma262/#sec-bitwise-shift-operators
			    // https://tc39.github.io/ecma262/#sec-relational-operators
			    // https://tc39.github.io/ecma262/#sec-equality-operators
			    // https://tc39.github.io/ecma262/#sec-binary-bitwise-operators
			    // https://tc39.github.io/ecma262/#sec-binary-logical-operators
			    Parser.prototype.binaryPrecedence = function (token) {
			        var op = token.value;
			        var precedence;
			        if (token.type === 7 /* Punctuator */) {
			            precedence = this.operatorPrecedence[op] || 0;
			        }
			        else if (token.type === 4 /* Keyword */) {
			            precedence = (op === 'instanceof' || (this.context.allowIn && op === 'in')) ? 7 : 0;
			        }
			        else {
			            precedence = 0;
			        }
			        return precedence;
			    };
			    Parser.prototype.parseBinaryExpression = function () {
			        var startToken = this.lookahead;
			        var expr = this.inheritCoverGrammar(this.parseExponentiationExpression);
			        var token = this.lookahead;
			        var prec = this.binaryPrecedence(token);
			        if (prec > 0) {
			            this.nextToken();
			            this.context.isAssignmentTarget = false;
			            this.context.isBindingElement = false;
			            var markers = [startToken, this.lookahead];
			            var left = expr;
			            var right = this.isolateCoverGrammar(this.parseExponentiationExpression);
			            var stack = [left, token.value, right];
			            var precedences = [prec];
			            while (true) {
			                prec = this.binaryPrecedence(this.lookahead);
			                if (prec <= 0) {
			                    break;
			                }
			                // Reduce: make a binary expression from the three topmost entries.
			                while ((stack.length > 2) && (prec <= precedences[precedences.length - 1])) {
			                    right = stack.pop();
			                    var operator = stack.pop();
			                    precedences.pop();
			                    left = stack.pop();
			                    markers.pop();
			                    var node = this.startNode(markers[markers.length - 1]);
			                    stack.push(this.finalize(node, new Node.BinaryExpression(operator, left, right)));
			                }
			                // Shift.
			                stack.push(this.nextToken().value);
			                precedences.push(prec);
			                markers.push(this.lookahead);
			                stack.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
			            }
			            // Final reduce to clean-up the stack.
			            var i = stack.length - 1;
			            expr = stack[i];
			            var lastMarker = markers.pop();
			            while (i > 1) {
			                var marker = markers.pop();
			                var lastLineStart = lastMarker && lastMarker.lineStart;
			                var node = this.startNode(marker, lastLineStart);
			                var operator = stack[i - 1];
			                expr = this.finalize(node, new Node.BinaryExpression(operator, stack[i - 2], expr));
			                i -= 2;
			                lastMarker = marker;
			            }
			        }
			        return expr;
			    };
			    // https://tc39.github.io/ecma262/#sec-conditional-operator
			    Parser.prototype.parseConditionalExpression = function () {
			        var startToken = this.lookahead;
			        var expr = this.inheritCoverGrammar(this.parseBinaryExpression);
			        if (this.match('?')) {
			            this.nextToken();
			            var previousAllowIn = this.context.allowIn;
			            this.context.allowIn = true;
			            var consequent = this.isolateCoverGrammar(this.parseAssignmentExpression);
			            this.context.allowIn = previousAllowIn;
			            this.expect(':');
			            var alternate = this.isolateCoverGrammar(this.parseAssignmentExpression);
			            expr = this.finalize(this.startNode(startToken), new Node.ConditionalExpression(expr, consequent, alternate));
			            this.context.isAssignmentTarget = false;
			            this.context.isBindingElement = false;
			        }
			        return expr;
			    };
			    // https://tc39.github.io/ecma262/#sec-assignment-operators
			    Parser.prototype.checkPatternParam = function (options, param) {
			        switch (param.type) {
			            case syntax_1.Syntax.Identifier:
			                this.validateParam(options, param, param.name);
			                break;
			            case syntax_1.Syntax.RestElement:
			                this.checkPatternParam(options, param.argument);
			                break;
			            case syntax_1.Syntax.AssignmentPattern:
			                this.checkPatternParam(options, param.left);
			                break;
			            case syntax_1.Syntax.ArrayPattern:
			                for (var i = 0; i < param.elements.length; i++) {
			                    if (param.elements[i] !== null) {
			                        this.checkPatternParam(options, param.elements[i]);
			                    }
			                }
			                break;
			            case syntax_1.Syntax.ObjectPattern:
			                for (var i = 0; i < param.properties.length; i++) {
			                    this.checkPatternParam(options, param.properties[i].value);
			                }
			                break;
			        }
			        options.simple = options.simple && (param instanceof Node.Identifier);
			    };
			    Parser.prototype.reinterpretAsCoverFormalsList = function (expr) {
			        var params = [expr];
			        var options;
			        var asyncArrow = false;
			        switch (expr.type) {
			            case syntax_1.Syntax.Identifier:
			                break;
			            case ArrowParameterPlaceHolder:
			                params = expr.params;
			                asyncArrow = expr.async;
			                break;
			            default:
			                return null;
			        }
			        options = {
			            simple: true,
			            paramSet: {}
			        };
			        for (var i = 0; i < params.length; ++i) {
			            var param = params[i];
			            if (param.type === syntax_1.Syntax.AssignmentPattern) {
			                if (param.right.type === syntax_1.Syntax.YieldExpression) {
			                    if (param.right.argument) {
			                        this.throwUnexpectedToken(this.lookahead);
			                    }
			                    param.right.type = syntax_1.Syntax.Identifier;
			                    param.right.name = 'yield';
			                    delete param.right.argument;
			                    delete param.right.delegate;
			                }
			            }
			            else if (asyncArrow && param.type === syntax_1.Syntax.Identifier && param.name === 'await') {
			                this.throwUnexpectedToken(this.lookahead);
			            }
			            this.checkPatternParam(options, param);
			            params[i] = param;
			        }
			        if (this.context.strict || !this.context.allowYield) {
			            for (var i = 0; i < params.length; ++i) {
			                var param = params[i];
			                if (param.type === syntax_1.Syntax.YieldExpression) {
			                    this.throwUnexpectedToken(this.lookahead);
			                }
			            }
			        }
			        if (options.message === messages_1.Messages.StrictParamDupe) {
			            var token = this.context.strict ? options.stricted : options.firstRestricted;
			            this.throwUnexpectedToken(token, options.message);
			        }
			        return {
			            simple: options.simple,
			            params: params,
			            stricted: options.stricted,
			            firstRestricted: options.firstRestricted,
			            message: options.message
			        };
			    };
			    Parser.prototype.parseAssignmentExpression = function () {
			        var expr;
			        if (!this.context.allowYield && this.matchKeyword('yield')) {
			            expr = this.parseYieldExpression();
			        }
			        else {
			            var startToken = this.lookahead;
			            var token = startToken;
			            expr = this.parseConditionalExpression();
			            if (token.type === 3 /* Identifier */ && (token.lineNumber === this.lookahead.lineNumber) && token.value === 'async') {
			                if (this.lookahead.type === 3 /* Identifier */ || this.matchKeyword('yield')) {
			                    var arg = this.parsePrimaryExpression();
			                    this.reinterpretExpressionAsPattern(arg);
			                    expr = {
			                        type: ArrowParameterPlaceHolder,
			                        params: [arg],
			                        async: true
			                    };
			                }
			            }
			            if (expr.type === ArrowParameterPlaceHolder || this.match('=>')) {
			                // https://tc39.github.io/ecma262/#sec-arrow-function-definitions
			                this.context.isAssignmentTarget = false;
			                this.context.isBindingElement = false;
			                var isAsync = expr.async;
			                var list = this.reinterpretAsCoverFormalsList(expr);
			                if (list) {
			                    if (this.hasLineTerminator) {
			                        this.tolerateUnexpectedToken(this.lookahead);
			                    }
			                    this.context.firstCoverInitializedNameError = null;
			                    var previousStrict = this.context.strict;
			                    var previousAllowStrictDirective = this.context.allowStrictDirective;
			                    this.context.allowStrictDirective = list.simple;
			                    var previousAllowYield = this.context.allowYield;
			                    var previousAwait = this.context.await;
			                    this.context.allowYield = true;
			                    this.context.await = isAsync;
			                    var node = this.startNode(startToken);
			                    this.expect('=>');
			                    var body = void 0;
			                    if (this.match('{')) {
			                        var previousAllowIn = this.context.allowIn;
			                        this.context.allowIn = true;
			                        body = this.parseFunctionSourceElements();
			                        this.context.allowIn = previousAllowIn;
			                    }
			                    else {
			                        body = this.isolateCoverGrammar(this.parseAssignmentExpression);
			                    }
			                    var expression = body.type !== syntax_1.Syntax.BlockStatement;
			                    if (this.context.strict && list.firstRestricted) {
			                        this.throwUnexpectedToken(list.firstRestricted, list.message);
			                    }
			                    if (this.context.strict && list.stricted) {
			                        this.tolerateUnexpectedToken(list.stricted, list.message);
			                    }
			                    expr = isAsync ? this.finalize(node, new Node.AsyncArrowFunctionExpression(list.params, body, expression)) :
			                        this.finalize(node, new Node.ArrowFunctionExpression(list.params, body, expression));
			                    this.context.strict = previousStrict;
			                    this.context.allowStrictDirective = previousAllowStrictDirective;
			                    this.context.allowYield = previousAllowYield;
			                    this.context.await = previousAwait;
			                }
			            }
			            else {
			                if (this.matchAssign()) {
			                    if (!this.context.isAssignmentTarget) {
			                        this.tolerateError(messages_1.Messages.InvalidLHSInAssignment);
			                    }
			                    if (this.context.strict && expr.type === syntax_1.Syntax.Identifier) {
			                        var id = expr;
			                        if (this.scanner.isRestrictedWord(id.name)) {
			                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictLHSAssignment);
			                        }
			                        if (this.scanner.isStrictModeReservedWord(id.name)) {
			                            this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
			                        }
			                    }
			                    if (!this.match('=')) {
			                        this.context.isAssignmentTarget = false;
			                        this.context.isBindingElement = false;
			                    }
			                    else {
			                        this.reinterpretExpressionAsPattern(expr);
			                    }
			                    token = this.nextToken();
			                    var operator = token.value;
			                    var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
			                    expr = this.finalize(this.startNode(startToken), new Node.AssignmentExpression(operator, expr, right));
			                    this.context.firstCoverInitializedNameError = null;
			                }
			            }
			        }
			        return expr;
			    };
			    // https://tc39.github.io/ecma262/#sec-comma-operator
			    Parser.prototype.parseExpression = function () {
			        var startToken = this.lookahead;
			        var expr = this.isolateCoverGrammar(this.parseAssignmentExpression);
			        if (this.match(',')) {
			            var expressions = [];
			            expressions.push(expr);
			            while (this.lookahead.type !== 2 /* EOF */) {
			                if (!this.match(',')) {
			                    break;
			                }
			                this.nextToken();
			                expressions.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
			            }
			            expr = this.finalize(this.startNode(startToken), new Node.SequenceExpression(expressions));
			        }
			        return expr;
			    };
			    // https://tc39.github.io/ecma262/#sec-block
			    Parser.prototype.parseStatementListItem = function () {
			        var statement;
			        this.context.isAssignmentTarget = true;
			        this.context.isBindingElement = true;
			        if (this.lookahead.type === 4 /* Keyword */) {
			            switch (this.lookahead.value) {
			                case 'export':
			                    if (!this.context.isModule) {
			                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalExportDeclaration);
			                    }
			                    statement = this.parseExportDeclaration();
			                    break;
			                case 'import':
			                    if (!this.context.isModule) {
			                        this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.IllegalImportDeclaration);
			                    }
			                    statement = this.parseImportDeclaration();
			                    break;
			                case 'const':
			                    statement = this.parseLexicalDeclaration({ inFor: false });
			                    break;
			                case 'function':
			                    statement = this.parseFunctionDeclaration();
			                    break;
			                case 'class':
			                    statement = this.parseClassDeclaration();
			                    break;
			                case 'let':
			                    statement = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({ inFor: false }) : this.parseStatement();
			                    break;
			                default:
			                    statement = this.parseStatement();
			                    break;
			            }
			        }
			        else {
			            statement = this.parseStatement();
			        }
			        return statement;
			    };
			    Parser.prototype.parseBlock = function () {
			        var node = this.createNode();
			        this.expect('{');
			        var block = [];
			        while (true) {
			            if (this.match('}')) {
			                break;
			            }
			            block.push(this.parseStatementListItem());
			        }
			        this.expect('}');
			        return this.finalize(node, new Node.BlockStatement(block));
			    };
			    // https://tc39.github.io/ecma262/#sec-let-and-const-declarations
			    Parser.prototype.parseLexicalBinding = function (kind, options) {
			        var node = this.createNode();
			        var params = [];
			        var id = this.parsePattern(params, kind);
			        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
			            if (this.scanner.isRestrictedWord(id.name)) {
			                this.tolerateError(messages_1.Messages.StrictVarName);
			            }
			        }
			        var init = null;
			        if (kind === 'const') {
			            if (!this.matchKeyword('in') && !this.matchContextualKeyword('of')) {
			                if (this.match('=')) {
			                    this.nextToken();
			                    init = this.isolateCoverGrammar(this.parseAssignmentExpression);
			                }
			                else {
			                    this.throwError(messages_1.Messages.DeclarationMissingInitializer, 'const');
			                }
			            }
			        }
			        else if ((!options.inFor && id.type !== syntax_1.Syntax.Identifier) || this.match('=')) {
			            this.expect('=');
			            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
			        }
			        return this.finalize(node, new Node.VariableDeclarator(id, init));
			    };
			    Parser.prototype.parseBindingList = function (kind, options) {
			        var list = [this.parseLexicalBinding(kind, options)];
			        while (this.match(',')) {
			            this.nextToken();
			            list.push(this.parseLexicalBinding(kind, options));
			        }
			        return list;
			    };
			    Parser.prototype.isLexicalDeclaration = function () {
			        var state = this.scanner.saveState();
			        this.scanner.scanComments();
			        var next = this.scanner.lex();
			        this.scanner.restoreState(state);
			        return (next.type === 3 /* Identifier */) ||
			            (next.type === 7 /* Punctuator */ && next.value === '[') ||
			            (next.type === 7 /* Punctuator */ && next.value === '{') ||
			            (next.type === 4 /* Keyword */ && next.value === 'let') ||
			            (next.type === 4 /* Keyword */ && next.value === 'yield');
			    };
			    Parser.prototype.parseLexicalDeclaration = function (options) {
			        var node = this.createNode();
			        var kind = this.nextToken().value;
			        assert_1.assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
			        var declarations = this.parseBindingList(kind, options);
			        this.consumeSemicolon();
			        return this.finalize(node, new Node.VariableDeclaration(declarations, kind));
			    };
			    // https://tc39.github.io/ecma262/#sec-destructuring-binding-patterns
			    Parser.prototype.parseBindingRestElement = function (params, kind) {
			        var node = this.createNode();
			        this.expect('...');
			        var arg = this.parsePattern(params, kind);
			        return this.finalize(node, new Node.RestElement(arg));
			    };
			    Parser.prototype.parseArrayPattern = function (params, kind) {
			        var node = this.createNode();
			        this.expect('[');
			        var elements = [];
			        while (!this.match(']')) {
			            if (this.match(',')) {
			                this.nextToken();
			                elements.push(null);
			            }
			            else {
			                if (this.match('...')) {
			                    elements.push(this.parseBindingRestElement(params, kind));
			                    break;
			                }
			                else {
			                    elements.push(this.parsePatternWithDefault(params, kind));
			                }
			                if (!this.match(']')) {
			                    this.expect(',');
			                }
			            }
			        }
			        this.expect(']');
			        return this.finalize(node, new Node.ArrayPattern(elements));
			    };
			    Parser.prototype.parsePropertyPattern = function (params, kind) {
			        var node = this.createNode();
			        var computed = false;
			        var shorthand = false;
			        var method = false;
			        var key;
			        var value;
			        if (this.lookahead.type === 3 /* Identifier */) {
			            var keyToken = this.lookahead;
			            key = this.parseVariableIdentifier();
			            var init = this.finalize(node, new Node.Identifier(keyToken.value));
			            if (this.match('=')) {
			                params.push(keyToken);
			                shorthand = true;
			                this.nextToken();
			                var expr = this.parseAssignmentExpression();
			                value = this.finalize(this.startNode(keyToken), new Node.AssignmentPattern(init, expr));
			            }
			            else if (!this.match(':')) {
			                params.push(keyToken);
			                shorthand = true;
			                value = init;
			            }
			            else {
			                this.expect(':');
			                value = this.parsePatternWithDefault(params, kind);
			            }
			        }
			        else {
			            computed = this.match('[');
			            key = this.parseObjectPropertyKey();
			            this.expect(':');
			            value = this.parsePatternWithDefault(params, kind);
			        }
			        return this.finalize(node, new Node.Property('init', key, computed, value, method, shorthand));
			    };
			    Parser.prototype.parseObjectPattern = function (params, kind) {
			        var node = this.createNode();
			        var properties = [];
			        this.expect('{');
			        while (!this.match('}')) {
			            properties.push(this.parsePropertyPattern(params, kind));
			            if (!this.match('}')) {
			                this.expect(',');
			            }
			        }
			        this.expect('}');
			        return this.finalize(node, new Node.ObjectPattern(properties));
			    };
			    Parser.prototype.parsePattern = function (params, kind) {
			        var pattern;
			        if (this.match('[')) {
			            pattern = this.parseArrayPattern(params, kind);
			        }
			        else if (this.match('{')) {
			            pattern = this.parseObjectPattern(params, kind);
			        }
			        else {
			            if (this.matchKeyword('let') && (kind === 'const' || kind === 'let')) {
			                this.tolerateUnexpectedToken(this.lookahead, messages_1.Messages.LetInLexicalBinding);
			            }
			            params.push(this.lookahead);
			            pattern = this.parseVariableIdentifier(kind);
			        }
			        return pattern;
			    };
			    Parser.prototype.parsePatternWithDefault = function (params, kind) {
			        var startToken = this.lookahead;
			        var pattern = this.parsePattern(params, kind);
			        if (this.match('=')) {
			            this.nextToken();
			            var previousAllowYield = this.context.allowYield;
			            this.context.allowYield = true;
			            var right = this.isolateCoverGrammar(this.parseAssignmentExpression);
			            this.context.allowYield = previousAllowYield;
			            pattern = this.finalize(this.startNode(startToken), new Node.AssignmentPattern(pattern, right));
			        }
			        return pattern;
			    };
			    // https://tc39.github.io/ecma262/#sec-variable-statement
			    Parser.prototype.parseVariableIdentifier = function (kind) {
			        var node = this.createNode();
			        var token = this.nextToken();
			        if (token.type === 4 /* Keyword */ && token.value === 'yield') {
			            if (this.context.strict) {
			                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
			            }
			            else if (!this.context.allowYield) {
			                this.throwUnexpectedToken(token);
			            }
			        }
			        else if (token.type !== 3 /* Identifier */) {
			            if (this.context.strict && token.type === 4 /* Keyword */ && this.scanner.isStrictModeReservedWord(token.value)) {
			                this.tolerateUnexpectedToken(token, messages_1.Messages.StrictReservedWord);
			            }
			            else {
			                if (this.context.strict || token.value !== 'let' || kind !== 'var') {
			                    this.throwUnexpectedToken(token);
			                }
			            }
			        }
			        else if ((this.context.isModule || this.context.await) && token.type === 3 /* Identifier */ && token.value === 'await') {
			            this.tolerateUnexpectedToken(token);
			        }
			        return this.finalize(node, new Node.Identifier(token.value));
			    };
			    Parser.prototype.parseVariableDeclaration = function (options) {
			        var node = this.createNode();
			        var params = [];
			        var id = this.parsePattern(params, 'var');
			        if (this.context.strict && id.type === syntax_1.Syntax.Identifier) {
			            if (this.scanner.isRestrictedWord(id.name)) {
			                this.tolerateError(messages_1.Messages.StrictVarName);
			            }
			        }
			        var init = null;
			        if (this.match('=')) {
			            this.nextToken();
			            init = this.isolateCoverGrammar(this.parseAssignmentExpression);
			        }
			        else if (id.type !== syntax_1.Syntax.Identifier && !options.inFor) {
			            this.expect('=');
			        }
			        return this.finalize(node, new Node.VariableDeclarator(id, init));
			    };
			    Parser.prototype.parseVariableDeclarationList = function (options) {
			        var opt = { inFor: options.inFor };
			        var list = [];
			        list.push(this.parseVariableDeclaration(opt));
			        while (this.match(',')) {
			            this.nextToken();
			            list.push(this.parseVariableDeclaration(opt));
			        }
			        return list;
			    };
			    Parser.prototype.parseVariableStatement = function () {
			        var node = this.createNode();
			        this.expectKeyword('var');
			        var declarations = this.parseVariableDeclarationList({ inFor: false });
			        this.consumeSemicolon();
			        return this.finalize(node, new Node.VariableDeclaration(declarations, 'var'));
			    };
			    // https://tc39.github.io/ecma262/#sec-empty-statement
			    Parser.prototype.parseEmptyStatement = function () {
			        var node = this.createNode();
			        this.expect(';');
			        return this.finalize(node, new Node.EmptyStatement());
			    };
			    // https://tc39.github.io/ecma262/#sec-expression-statement
			    Parser.prototype.parseExpressionStatement = function () {
			        var node = this.createNode();
			        var expr = this.parseExpression();
			        this.consumeSemicolon();
			        return this.finalize(node, new Node.ExpressionStatement(expr));
			    };
			    // https://tc39.github.io/ecma262/#sec-if-statement
			    Parser.prototype.parseIfClause = function () {
			        if (this.context.strict && this.matchKeyword('function')) {
			            this.tolerateError(messages_1.Messages.StrictFunction);
			        }
			        return this.parseStatement();
			    };
			    Parser.prototype.parseIfStatement = function () {
			        var node = this.createNode();
			        var consequent;
			        var alternate = null;
			        this.expectKeyword('if');
			        this.expect('(');
			        var test = this.parseExpression();
			        if (!this.match(')') && this.config.tolerant) {
			            this.tolerateUnexpectedToken(this.nextToken());
			            consequent = this.finalize(this.createNode(), new Node.EmptyStatement());
			        }
			        else {
			            this.expect(')');
			            consequent = this.parseIfClause();
			            if (this.matchKeyword('else')) {
			                this.nextToken();
			                alternate = this.parseIfClause();
			            }
			        }
			        return this.finalize(node, new Node.IfStatement(test, consequent, alternate));
			    };
			    // https://tc39.github.io/ecma262/#sec-do-while-statement
			    Parser.prototype.parseDoWhileStatement = function () {
			        var node = this.createNode();
			        this.expectKeyword('do');
			        var previousInIteration = this.context.inIteration;
			        this.context.inIteration = true;
			        var body = this.parseStatement();
			        this.context.inIteration = previousInIteration;
			        this.expectKeyword('while');
			        this.expect('(');
			        var test = this.parseExpression();
			        if (!this.match(')') && this.config.tolerant) {
			            this.tolerateUnexpectedToken(this.nextToken());
			        }
			        else {
			            this.expect(')');
			            if (this.match(';')) {
			                this.nextToken();
			            }
			        }
			        return this.finalize(node, new Node.DoWhileStatement(body, test));
			    };
			    // https://tc39.github.io/ecma262/#sec-while-statement
			    Parser.prototype.parseWhileStatement = function () {
			        var node = this.createNode();
			        var body;
			        this.expectKeyword('while');
			        this.expect('(');
			        var test = this.parseExpression();
			        if (!this.match(')') && this.config.tolerant) {
			            this.tolerateUnexpectedToken(this.nextToken());
			            body = this.finalize(this.createNode(), new Node.EmptyStatement());
			        }
			        else {
			            this.expect(')');
			            var previousInIteration = this.context.inIteration;
			            this.context.inIteration = true;
			            body = this.parseStatement();
			            this.context.inIteration = previousInIteration;
			        }
			        return this.finalize(node, new Node.WhileStatement(test, body));
			    };
			    // https://tc39.github.io/ecma262/#sec-for-statement
			    // https://tc39.github.io/ecma262/#sec-for-in-and-for-of-statements
			    Parser.prototype.parseForStatement = function () {
			        var init = null;
			        var test = null;
			        var update = null;
			        var forIn = true;
			        var left, right;
			        var node = this.createNode();
			        this.expectKeyword('for');
			        this.expect('(');
			        if (this.match(';')) {
			            this.nextToken();
			        }
			        else {
			            if (this.matchKeyword('var')) {
			                init = this.createNode();
			                this.nextToken();
			                var previousAllowIn = this.context.allowIn;
			                this.context.allowIn = false;
			                var declarations = this.parseVariableDeclarationList({ inFor: true });
			                this.context.allowIn = previousAllowIn;
			                if (declarations.length === 1 && this.matchKeyword('in')) {
			                    var decl = declarations[0];
			                    if (decl.init && (decl.id.type === syntax_1.Syntax.ArrayPattern || decl.id.type === syntax_1.Syntax.ObjectPattern || this.context.strict)) {
			                        this.tolerateError(messages_1.Messages.ForInOfLoopInitializer, 'for-in');
			                    }
			                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
			                    this.nextToken();
			                    left = init;
			                    right = this.parseExpression();
			                    init = null;
			                }
			                else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
			                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
			                    this.nextToken();
			                    left = init;
			                    right = this.parseAssignmentExpression();
			                    init = null;
			                    forIn = false;
			                }
			                else {
			                    init = this.finalize(init, new Node.VariableDeclaration(declarations, 'var'));
			                    this.expect(';');
			                }
			            }
			            else if (this.matchKeyword('const') || this.matchKeyword('let')) {
			                init = this.createNode();
			                var kind = this.nextToken().value;
			                if (!this.context.strict && this.lookahead.value === 'in') {
			                    init = this.finalize(init, new Node.Identifier(kind));
			                    this.nextToken();
			                    left = init;
			                    right = this.parseExpression();
			                    init = null;
			                }
			                else {
			                    var previousAllowIn = this.context.allowIn;
			                    this.context.allowIn = false;
			                    var declarations = this.parseBindingList(kind, { inFor: true });
			                    this.context.allowIn = previousAllowIn;
			                    if (declarations.length === 1 && declarations[0].init === null && this.matchKeyword('in')) {
			                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
			                        this.nextToken();
			                        left = init;
			                        right = this.parseExpression();
			                        init = null;
			                    }
			                    else if (declarations.length === 1 && declarations[0].init === null && this.matchContextualKeyword('of')) {
			                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
			                        this.nextToken();
			                        left = init;
			                        right = this.parseAssignmentExpression();
			                        init = null;
			                        forIn = false;
			                    }
			                    else {
			                        this.consumeSemicolon();
			                        init = this.finalize(init, new Node.VariableDeclaration(declarations, kind));
			                    }
			                }
			            }
			            else {
			                var initStartToken = this.lookahead;
			                var previousAllowIn = this.context.allowIn;
			                this.context.allowIn = false;
			                init = this.inheritCoverGrammar(this.parseAssignmentExpression);
			                this.context.allowIn = previousAllowIn;
			                if (this.matchKeyword('in')) {
			                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
			                        this.tolerateError(messages_1.Messages.InvalidLHSInForIn);
			                    }
			                    this.nextToken();
			                    this.reinterpretExpressionAsPattern(init);
			                    left = init;
			                    right = this.parseExpression();
			                    init = null;
			                }
			                else if (this.matchContextualKeyword('of')) {
			                    if (!this.context.isAssignmentTarget || init.type === syntax_1.Syntax.AssignmentExpression) {
			                        this.tolerateError(messages_1.Messages.InvalidLHSInForLoop);
			                    }
			                    this.nextToken();
			                    this.reinterpretExpressionAsPattern(init);
			                    left = init;
			                    right = this.parseAssignmentExpression();
			                    init = null;
			                    forIn = false;
			                }
			                else {
			                    if (this.match(',')) {
			                        var initSeq = [init];
			                        while (this.match(',')) {
			                            this.nextToken();
			                            initSeq.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
			                        }
			                        init = this.finalize(this.startNode(initStartToken), new Node.SequenceExpression(initSeq));
			                    }
			                    this.expect(';');
			                }
			            }
			        }
			        if (typeof left === 'undefined') {
			            if (!this.match(';')) {
			                test = this.parseExpression();
			            }
			            this.expect(';');
			            if (!this.match(')')) {
			                update = this.parseExpression();
			            }
			        }
			        var body;
			        if (!this.match(')') && this.config.tolerant) {
			            this.tolerateUnexpectedToken(this.nextToken());
			            body = this.finalize(this.createNode(), new Node.EmptyStatement());
			        }
			        else {
			            this.expect(')');
			            var previousInIteration = this.context.inIteration;
			            this.context.inIteration = true;
			            body = this.isolateCoverGrammar(this.parseStatement);
			            this.context.inIteration = previousInIteration;
			        }
			        return (typeof left === 'undefined') ?
			            this.finalize(node, new Node.ForStatement(init, test, update, body)) :
			            forIn ? this.finalize(node, new Node.ForInStatement(left, right, body)) :
			                this.finalize(node, new Node.ForOfStatement(left, right, body));
			    };
			    // https://tc39.github.io/ecma262/#sec-continue-statement
			    Parser.prototype.parseContinueStatement = function () {
			        var node = this.createNode();
			        this.expectKeyword('continue');
			        var label = null;
			        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
			            var id = this.parseVariableIdentifier();
			            label = id;
			            var key = '$' + id.name;
			            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
			                this.throwError(messages_1.Messages.UnknownLabel, id.name);
			            }
			        }
			        this.consumeSemicolon();
			        if (label === null && !this.context.inIteration) {
			            this.throwError(messages_1.Messages.IllegalContinue);
			        }
			        return this.finalize(node, new Node.ContinueStatement(label));
			    };
			    // https://tc39.github.io/ecma262/#sec-break-statement
			    Parser.prototype.parseBreakStatement = function () {
			        var node = this.createNode();
			        this.expectKeyword('break');
			        var label = null;
			        if (this.lookahead.type === 3 /* Identifier */ && !this.hasLineTerminator) {
			            var id = this.parseVariableIdentifier();
			            var key = '$' + id.name;
			            if (!Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
			                this.throwError(messages_1.Messages.UnknownLabel, id.name);
			            }
			            label = id;
			        }
			        this.consumeSemicolon();
			        if (label === null && !this.context.inIteration && !this.context.inSwitch) {
			            this.throwError(messages_1.Messages.IllegalBreak);
			        }
			        return this.finalize(node, new Node.BreakStatement(label));
			    };
			    // https://tc39.github.io/ecma262/#sec-return-statement
			    Parser.prototype.parseReturnStatement = function () {
			        if (!this.context.inFunctionBody) {
			            this.tolerateError(messages_1.Messages.IllegalReturn);
			        }
			        var node = this.createNode();
			        this.expectKeyword('return');
			        var hasArgument = (!this.match(';') && !this.match('}') &&
			            !this.hasLineTerminator && this.lookahead.type !== 2 /* EOF */) ||
			            this.lookahead.type === 8 /* StringLiteral */ ||
			            this.lookahead.type === 10 /* Template */;
			        var argument = hasArgument ? this.parseExpression() : null;
			        this.consumeSemicolon();
			        return this.finalize(node, new Node.ReturnStatement(argument));
			    };
			    // https://tc39.github.io/ecma262/#sec-with-statement
			    Parser.prototype.parseWithStatement = function () {
			        if (this.context.strict) {
			            this.tolerateError(messages_1.Messages.StrictModeWith);
			        }
			        var node = this.createNode();
			        var body;
			        this.expectKeyword('with');
			        this.expect('(');
			        var object = this.parseExpression();
			        if (!this.match(')') && this.config.tolerant) {
			            this.tolerateUnexpectedToken(this.nextToken());
			            body = this.finalize(this.createNode(), new Node.EmptyStatement());
			        }
			        else {
			            this.expect(')');
			            body = this.parseStatement();
			        }
			        return this.finalize(node, new Node.WithStatement(object, body));
			    };
			    // https://tc39.github.io/ecma262/#sec-switch-statement
			    Parser.prototype.parseSwitchCase = function () {
			        var node = this.createNode();
			        var test;
			        if (this.matchKeyword('default')) {
			            this.nextToken();
			            test = null;
			        }
			        else {
			            this.expectKeyword('case');
			            test = this.parseExpression();
			        }
			        this.expect(':');
			        var consequent = [];
			        while (true) {
			            if (this.match('}') || this.matchKeyword('default') || this.matchKeyword('case')) {
			                break;
			            }
			            consequent.push(this.parseStatementListItem());
			        }
			        return this.finalize(node, new Node.SwitchCase(test, consequent));
			    };
			    Parser.prototype.parseSwitchStatement = function () {
			        var node = this.createNode();
			        this.expectKeyword('switch');
			        this.expect('(');
			        var discriminant = this.parseExpression();
			        this.expect(')');
			        var previousInSwitch = this.context.inSwitch;
			        this.context.inSwitch = true;
			        var cases = [];
			        var defaultFound = false;
			        this.expect('{');
			        while (true) {
			            if (this.match('}')) {
			                break;
			            }
			            var clause = this.parseSwitchCase();
			            if (clause.test === null) {
			                if (defaultFound) {
			                    this.throwError(messages_1.Messages.MultipleDefaultsInSwitch);
			                }
			                defaultFound = true;
			            }
			            cases.push(clause);
			        }
			        this.expect('}');
			        this.context.inSwitch = previousInSwitch;
			        return this.finalize(node, new Node.SwitchStatement(discriminant, cases));
			    };
			    // https://tc39.github.io/ecma262/#sec-labelled-statements
			    Parser.prototype.parseLabelledStatement = function () {
			        var node = this.createNode();
			        var expr = this.parseExpression();
			        var statement;
			        if ((expr.type === syntax_1.Syntax.Identifier) && this.match(':')) {
			            this.nextToken();
			            var id = expr;
			            var key = '$' + id.name;
			            if (Object.prototype.hasOwnProperty.call(this.context.labelSet, key)) {
			                this.throwError(messages_1.Messages.Redeclaration, 'Label', id.name);
			            }
			            this.context.labelSet[key] = true;
			            var body = void 0;
			            if (this.matchKeyword('class')) {
			                this.tolerateUnexpectedToken(this.lookahead);
			                body = this.parseClassDeclaration();
			            }
			            else if (this.matchKeyword('function')) {
			                var token = this.lookahead;
			                var declaration = this.parseFunctionDeclaration();
			                if (this.context.strict) {
			                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunction);
			                }
			                else if (declaration.generator) {
			                    this.tolerateUnexpectedToken(token, messages_1.Messages.GeneratorInLegacyContext);
			                }
			                body = declaration;
			            }
			            else {
			                body = this.parseStatement();
			            }
			            delete this.context.labelSet[key];
			            statement = new Node.LabeledStatement(id, body);
			        }
			        else {
			            this.consumeSemicolon();
			            statement = new Node.ExpressionStatement(expr);
			        }
			        return this.finalize(node, statement);
			    };
			    // https://tc39.github.io/ecma262/#sec-throw-statement
			    Parser.prototype.parseThrowStatement = function () {
			        var node = this.createNode();
			        this.expectKeyword('throw');
			        if (this.hasLineTerminator) {
			            this.throwError(messages_1.Messages.NewlineAfterThrow);
			        }
			        var argument = this.parseExpression();
			        this.consumeSemicolon();
			        return this.finalize(node, new Node.ThrowStatement(argument));
			    };
			    // https://tc39.github.io/ecma262/#sec-try-statement
			    Parser.prototype.parseCatchClause = function () {
			        var node = this.createNode();
			        this.expectKeyword('catch');
			        this.expect('(');
			        if (this.match(')')) {
			            this.throwUnexpectedToken(this.lookahead);
			        }
			        var params = [];
			        var param = this.parsePattern(params);
			        var paramMap = {};
			        for (var i = 0; i < params.length; i++) {
			            var key = '$' + params[i].value;
			            if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
			                this.tolerateError(messages_1.Messages.DuplicateBinding, params[i].value);
			            }
			            paramMap[key] = true;
			        }
			        if (this.context.strict && param.type === syntax_1.Syntax.Identifier) {
			            if (this.scanner.isRestrictedWord(param.name)) {
			                this.tolerateError(messages_1.Messages.StrictCatchVariable);
			            }
			        }
			        this.expect(')');
			        var body = this.parseBlock();
			        return this.finalize(node, new Node.CatchClause(param, body));
			    };
			    Parser.prototype.parseFinallyClause = function () {
			        this.expectKeyword('finally');
			        return this.parseBlock();
			    };
			    Parser.prototype.parseTryStatement = function () {
			        var node = this.createNode();
			        this.expectKeyword('try');
			        var block = this.parseBlock();
			        var handler = this.matchKeyword('catch') ? this.parseCatchClause() : null;
			        var finalizer = this.matchKeyword('finally') ? this.parseFinallyClause() : null;
			        if (!handler && !finalizer) {
			            this.throwError(messages_1.Messages.NoCatchOrFinally);
			        }
			        return this.finalize(node, new Node.TryStatement(block, handler, finalizer));
			    };
			    // https://tc39.github.io/ecma262/#sec-debugger-statement
			    Parser.prototype.parseDebuggerStatement = function () {
			        var node = this.createNode();
			        this.expectKeyword('debugger');
			        this.consumeSemicolon();
			        return this.finalize(node, new Node.DebuggerStatement());
			    };
			    // https://tc39.github.io/ecma262/#sec-ecmascript-language-statements-and-declarations
			    Parser.prototype.parseStatement = function () {
			        var statement;
			        switch (this.lookahead.type) {
			            case 1 /* BooleanLiteral */:
			            case 5 /* NullLiteral */:
			            case 6 /* NumericLiteral */:
			            case 8 /* StringLiteral */:
			            case 10 /* Template */:
			            case 9 /* RegularExpression */:
			                statement = this.parseExpressionStatement();
			                break;
			            case 7 /* Punctuator */:
			                var value = this.lookahead.value;
			                if (value === '{') {
			                    statement = this.parseBlock();
			                }
			                else if (value === '(') {
			                    statement = this.parseExpressionStatement();
			                }
			                else if (value === ';') {
			                    statement = this.parseEmptyStatement();
			                }
			                else {
			                    statement = this.parseExpressionStatement();
			                }
			                break;
			            case 3 /* Identifier */:
			                statement = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
			                break;
			            case 4 /* Keyword */:
			                switch (this.lookahead.value) {
			                    case 'break':
			                        statement = this.parseBreakStatement();
			                        break;
			                    case 'continue':
			                        statement = this.parseContinueStatement();
			                        break;
			                    case 'debugger':
			                        statement = this.parseDebuggerStatement();
			                        break;
			                    case 'do':
			                        statement = this.parseDoWhileStatement();
			                        break;
			                    case 'for':
			                        statement = this.parseForStatement();
			                        break;
			                    case 'function':
			                        statement = this.parseFunctionDeclaration();
			                        break;
			                    case 'if':
			                        statement = this.parseIfStatement();
			                        break;
			                    case 'return':
			                        statement = this.parseReturnStatement();
			                        break;
			                    case 'switch':
			                        statement = this.parseSwitchStatement();
			                        break;
			                    case 'throw':
			                        statement = this.parseThrowStatement();
			                        break;
			                    case 'try':
			                        statement = this.parseTryStatement();
			                        break;
			                    case 'var':
			                        statement = this.parseVariableStatement();
			                        break;
			                    case 'while':
			                        statement = this.parseWhileStatement();
			                        break;
			                    case 'with':
			                        statement = this.parseWithStatement();
			                        break;
			                    default:
			                        statement = this.parseExpressionStatement();
			                        break;
			                }
			                break;
			            default:
			                statement = this.throwUnexpectedToken(this.lookahead);
			        }
			        return statement;
			    };
			    // https://tc39.github.io/ecma262/#sec-function-definitions
			    Parser.prototype.parseFunctionSourceElements = function () {
			        var node = this.createNode();
			        this.expect('{');
			        var body = this.parseDirectivePrologues();
			        var previousLabelSet = this.context.labelSet;
			        var previousInIteration = this.context.inIteration;
			        var previousInSwitch = this.context.inSwitch;
			        var previousInFunctionBody = this.context.inFunctionBody;
			        this.context.labelSet = {};
			        this.context.inIteration = false;
			        this.context.inSwitch = false;
			        this.context.inFunctionBody = true;
			        while (this.lookahead.type !== 2 /* EOF */) {
			            if (this.match('}')) {
			                break;
			            }
			            body.push(this.parseStatementListItem());
			        }
			        this.expect('}');
			        this.context.labelSet = previousLabelSet;
			        this.context.inIteration = previousInIteration;
			        this.context.inSwitch = previousInSwitch;
			        this.context.inFunctionBody = previousInFunctionBody;
			        return this.finalize(node, new Node.BlockStatement(body));
			    };
			    Parser.prototype.validateParam = function (options, param, name) {
			        var key = '$' + name;
			        if (this.context.strict) {
			            if (this.scanner.isRestrictedWord(name)) {
			                options.stricted = param;
			                options.message = messages_1.Messages.StrictParamName;
			            }
			            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
			                options.stricted = param;
			                options.message = messages_1.Messages.StrictParamDupe;
			            }
			        }
			        else if (!options.firstRestricted) {
			            if (this.scanner.isRestrictedWord(name)) {
			                options.firstRestricted = param;
			                options.message = messages_1.Messages.StrictParamName;
			            }
			            else if (this.scanner.isStrictModeReservedWord(name)) {
			                options.firstRestricted = param;
			                options.message = messages_1.Messages.StrictReservedWord;
			            }
			            else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
			                options.stricted = param;
			                options.message = messages_1.Messages.StrictParamDupe;
			            }
			        }
			        /* istanbul ignore next */
			        if (typeof Object.defineProperty === 'function') {
			            Object.defineProperty(options.paramSet, key, { value: true, enumerable: true, writable: true, configurable: true });
			        }
			        else {
			            options.paramSet[key] = true;
			        }
			    };
			    Parser.prototype.parseRestElement = function (params) {
			        var node = this.createNode();
			        this.expect('...');
			        var arg = this.parsePattern(params);
			        if (this.match('=')) {
			            this.throwError(messages_1.Messages.DefaultRestParameter);
			        }
			        if (!this.match(')')) {
			            this.throwError(messages_1.Messages.ParameterAfterRestParameter);
			        }
			        return this.finalize(node, new Node.RestElement(arg));
			    };
			    Parser.prototype.parseFormalParameter = function (options) {
			        var params = [];
			        var param = this.match('...') ? this.parseRestElement(params) : this.parsePatternWithDefault(params);
			        for (var i = 0; i < params.length; i++) {
			            this.validateParam(options, params[i], params[i].value);
			        }
			        options.simple = options.simple && (param instanceof Node.Identifier);
			        options.params.push(param);
			    };
			    Parser.prototype.parseFormalParameters = function (firstRestricted) {
			        var options;
			        options = {
			            simple: true,
			            params: [],
			            firstRestricted: firstRestricted
			        };
			        this.expect('(');
			        if (!this.match(')')) {
			            options.paramSet = {};
			            while (this.lookahead.type !== 2 /* EOF */) {
			                this.parseFormalParameter(options);
			                if (this.match(')')) {
			                    break;
			                }
			                this.expect(',');
			                if (this.match(')')) {
			                    break;
			                }
			            }
			        }
			        this.expect(')');
			        return {
			            simple: options.simple,
			            params: options.params,
			            stricted: options.stricted,
			            firstRestricted: options.firstRestricted,
			            message: options.message
			        };
			    };
			    Parser.prototype.matchAsyncFunction = function () {
			        var match = this.matchContextualKeyword('async');
			        if (match) {
			            var state = this.scanner.saveState();
			            this.scanner.scanComments();
			            var next = this.scanner.lex();
			            this.scanner.restoreState(state);
			            match = (state.lineNumber === next.lineNumber) && (next.type === 4 /* Keyword */) && (next.value === 'function');
			        }
			        return match;
			    };
			    Parser.prototype.parseFunctionDeclaration = function (identifierIsOptional) {
			        var node = this.createNode();
			        var isAsync = this.matchContextualKeyword('async');
			        if (isAsync) {
			            this.nextToken();
			        }
			        this.expectKeyword('function');
			        var isGenerator = isAsync ? false : this.match('*');
			        if (isGenerator) {
			            this.nextToken();
			        }
			        var message;
			        var id = null;
			        var firstRestricted = null;
			        if (!identifierIsOptional || !this.match('(')) {
			            var token = this.lookahead;
			            id = this.parseVariableIdentifier();
			            if (this.context.strict) {
			                if (this.scanner.isRestrictedWord(token.value)) {
			                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
			                }
			            }
			            else {
			                if (this.scanner.isRestrictedWord(token.value)) {
			                    firstRestricted = token;
			                    message = messages_1.Messages.StrictFunctionName;
			                }
			                else if (this.scanner.isStrictModeReservedWord(token.value)) {
			                    firstRestricted = token;
			                    message = messages_1.Messages.StrictReservedWord;
			                }
			            }
			        }
			        var previousAllowAwait = this.context.await;
			        var previousAllowYield = this.context.allowYield;
			        this.context.await = isAsync;
			        this.context.allowYield = !isGenerator;
			        var formalParameters = this.parseFormalParameters(firstRestricted);
			        var params = formalParameters.params;
			        var stricted = formalParameters.stricted;
			        firstRestricted = formalParameters.firstRestricted;
			        if (formalParameters.message) {
			            message = formalParameters.message;
			        }
			        var previousStrict = this.context.strict;
			        var previousAllowStrictDirective = this.context.allowStrictDirective;
			        this.context.allowStrictDirective = formalParameters.simple;
			        var body = this.parseFunctionSourceElements();
			        if (this.context.strict && firstRestricted) {
			            this.throwUnexpectedToken(firstRestricted, message);
			        }
			        if (this.context.strict && stricted) {
			            this.tolerateUnexpectedToken(stricted, message);
			        }
			        this.context.strict = previousStrict;
			        this.context.allowStrictDirective = previousAllowStrictDirective;
			        this.context.await = previousAllowAwait;
			        this.context.allowYield = previousAllowYield;
			        return isAsync ? this.finalize(node, new Node.AsyncFunctionDeclaration(id, params, body)) :
			            this.finalize(node, new Node.FunctionDeclaration(id, params, body, isGenerator));
			    };
			    Parser.prototype.parseFunctionExpression = function () {
			        var node = this.createNode();
			        var isAsync = this.matchContextualKeyword('async');
			        if (isAsync) {
			            this.nextToken();
			        }
			        this.expectKeyword('function');
			        var isGenerator = isAsync ? false : this.match('*');
			        if (isGenerator) {
			            this.nextToken();
			        }
			        var message;
			        var id = null;
			        var firstRestricted;
			        var previousAllowAwait = this.context.await;
			        var previousAllowYield = this.context.allowYield;
			        this.context.await = isAsync;
			        this.context.allowYield = !isGenerator;
			        if (!this.match('(')) {
			            var token = this.lookahead;
			            id = (!this.context.strict && !isGenerator && this.matchKeyword('yield')) ? this.parseIdentifierName() : this.parseVariableIdentifier();
			            if (this.context.strict) {
			                if (this.scanner.isRestrictedWord(token.value)) {
			                    this.tolerateUnexpectedToken(token, messages_1.Messages.StrictFunctionName);
			                }
			            }
			            else {
			                if (this.scanner.isRestrictedWord(token.value)) {
			                    firstRestricted = token;
			                    message = messages_1.Messages.StrictFunctionName;
			                }
			                else if (this.scanner.isStrictModeReservedWord(token.value)) {
			                    firstRestricted = token;
			                    message = messages_1.Messages.StrictReservedWord;
			                }
			            }
			        }
			        var formalParameters = this.parseFormalParameters(firstRestricted);
			        var params = formalParameters.params;
			        var stricted = formalParameters.stricted;
			        firstRestricted = formalParameters.firstRestricted;
			        if (formalParameters.message) {
			            message = formalParameters.message;
			        }
			        var previousStrict = this.context.strict;
			        var previousAllowStrictDirective = this.context.allowStrictDirective;
			        this.context.allowStrictDirective = formalParameters.simple;
			        var body = this.parseFunctionSourceElements();
			        if (this.context.strict && firstRestricted) {
			            this.throwUnexpectedToken(firstRestricted, message);
			        }
			        if (this.context.strict && stricted) {
			            this.tolerateUnexpectedToken(stricted, message);
			        }
			        this.context.strict = previousStrict;
			        this.context.allowStrictDirective = previousAllowStrictDirective;
			        this.context.await = previousAllowAwait;
			        this.context.allowYield = previousAllowYield;
			        return isAsync ? this.finalize(node, new Node.AsyncFunctionExpression(id, params, body)) :
			            this.finalize(node, new Node.FunctionExpression(id, params, body, isGenerator));
			    };
			    // https://tc39.github.io/ecma262/#sec-directive-prologues-and-the-use-strict-directive
			    Parser.prototype.parseDirective = function () {
			        var token = this.lookahead;
			        var node = this.createNode();
			        var expr = this.parseExpression();
			        var directive = (expr.type === syntax_1.Syntax.Literal) ? this.getTokenRaw(token).slice(1, -1) : null;
			        this.consumeSemicolon();
			        return this.finalize(node, directive ? new Node.Directive(expr, directive) : new Node.ExpressionStatement(expr));
			    };
			    Parser.prototype.parseDirectivePrologues = function () {
			        var firstRestricted = null;
			        var body = [];
			        while (true) {
			            var token = this.lookahead;
			            if (token.type !== 8 /* StringLiteral */) {
			                break;
			            }
			            var statement = this.parseDirective();
			            body.push(statement);
			            var directive = statement.directive;
			            if (typeof directive !== 'string') {
			                break;
			            }
			            if (directive === 'use strict') {
			                this.context.strict = true;
			                if (firstRestricted) {
			                    this.tolerateUnexpectedToken(firstRestricted, messages_1.Messages.StrictOctalLiteral);
			                }
			                if (!this.context.allowStrictDirective) {
			                    this.tolerateUnexpectedToken(token, messages_1.Messages.IllegalLanguageModeDirective);
			                }
			            }
			            else {
			                if (!firstRestricted && token.octal) {
			                    firstRestricted = token;
			                }
			            }
			        }
			        return body;
			    };
			    // https://tc39.github.io/ecma262/#sec-method-definitions
			    Parser.prototype.qualifiedPropertyName = function (token) {
			        switch (token.type) {
			            case 3 /* Identifier */:
			            case 8 /* StringLiteral */:
			            case 1 /* BooleanLiteral */:
			            case 5 /* NullLiteral */:
			            case 6 /* NumericLiteral */:
			            case 4 /* Keyword */:
			                return true;
			            case 7 /* Punctuator */:
			                return token.value === '[';
			        }
			        return false;
			    };
			    Parser.prototype.parseGetterMethod = function () {
			        var node = this.createNode();
			        var isGenerator = false;
			        var previousAllowYield = this.context.allowYield;
			        this.context.allowYield = !isGenerator;
			        var formalParameters = this.parseFormalParameters();
			        if (formalParameters.params.length > 0) {
			            this.tolerateError(messages_1.Messages.BadGetterArity);
			        }
			        var method = this.parsePropertyMethod(formalParameters);
			        this.context.allowYield = previousAllowYield;
			        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
			    };
			    Parser.prototype.parseSetterMethod = function () {
			        var node = this.createNode();
			        var isGenerator = false;
			        var previousAllowYield = this.context.allowYield;
			        this.context.allowYield = !isGenerator;
			        var formalParameters = this.parseFormalParameters();
			        if (formalParameters.params.length !== 1) {
			            this.tolerateError(messages_1.Messages.BadSetterArity);
			        }
			        else if (formalParameters.params[0] instanceof Node.RestElement) {
			            this.tolerateError(messages_1.Messages.BadSetterRestParameter);
			        }
			        var method = this.parsePropertyMethod(formalParameters);
			        this.context.allowYield = previousAllowYield;
			        return this.finalize(node, new Node.FunctionExpression(null, formalParameters.params, method, isGenerator));
			    };
			    Parser.prototype.parseGeneratorMethod = function () {
			        var node = this.createNode();
			        var isGenerator = true;
			        var previousAllowYield = this.context.allowYield;
			        this.context.allowYield = true;
			        var params = this.parseFormalParameters();
			        this.context.allowYield = false;
			        var method = this.parsePropertyMethod(params);
			        this.context.allowYield = previousAllowYield;
			        return this.finalize(node, new Node.FunctionExpression(null, params.params, method, isGenerator));
			    };
			    // https://tc39.github.io/ecma262/#sec-generator-function-definitions
			    Parser.prototype.isStartOfExpression = function () {
			        var start = true;
			        var value = this.lookahead.value;
			        switch (this.lookahead.type) {
			            case 7 /* Punctuator */:
			                start = (value === '[') || (value === '(') || (value === '{') ||
			                    (value === '+') || (value === '-') ||
			                    (value === '!') || (value === '~') ||
			                    (value === '++') || (value === '--') ||
			                    (value === '/') || (value === '/='); // regular expression literal
			                break;
			            case 4 /* Keyword */:
			                start = (value === 'class') || (value === 'delete') ||
			                    (value === 'function') || (value === 'let') || (value === 'new') ||
			                    (value === 'super') || (value === 'this') || (value === 'typeof') ||
			                    (value === 'void') || (value === 'yield');
			                break;
			        }
			        return start;
			    };
			    Parser.prototype.parseYieldExpression = function () {
			        var node = this.createNode();
			        this.expectKeyword('yield');
			        var argument = null;
			        var delegate = false;
			        if (!this.hasLineTerminator) {
			            var previousAllowYield = this.context.allowYield;
			            this.context.allowYield = false;
			            delegate = this.match('*');
			            if (delegate) {
			                this.nextToken();
			                argument = this.parseAssignmentExpression();
			            }
			            else if (this.isStartOfExpression()) {
			                argument = this.parseAssignmentExpression();
			            }
			            this.context.allowYield = previousAllowYield;
			        }
			        return this.finalize(node, new Node.YieldExpression(argument, delegate));
			    };
			    // https://tc39.github.io/ecma262/#sec-class-definitions
			    Parser.prototype.parseClassElement = function (hasConstructor) {
			        var token = this.lookahead;
			        var node = this.createNode();
			        var kind = '';
			        var key = null;
			        var value = null;
			        var computed = false;
			        var method = false;
			        var isStatic = false;
			        var isAsync = false;
			        if (this.match('*')) {
			            this.nextToken();
			        }
			        else {
			            computed = this.match('[');
			            key = this.parseObjectPropertyKey();
			            var id = key;
			            if (id.name === 'static' && (this.qualifiedPropertyName(this.lookahead) || this.match('*'))) {
			                token = this.lookahead;
			                isStatic = true;
			                computed = this.match('[');
			                if (this.match('*')) {
			                    this.nextToken();
			                }
			                else {
			                    key = this.parseObjectPropertyKey();
			                }
			            }
			            if ((token.type === 3 /* Identifier */) && !this.hasLineTerminator && (token.value === 'async')) {
			                var punctuator = this.lookahead.value;
			                if (punctuator !== ':' && punctuator !== '(' && punctuator !== '*') {
			                    isAsync = true;
			                    token = this.lookahead;
			                    key = this.parseObjectPropertyKey();
			                    if (token.type === 3 /* Identifier */ && token.value === 'constructor') {
			                        this.tolerateUnexpectedToken(token, messages_1.Messages.ConstructorIsAsync);
			                    }
			                }
			            }
			        }
			        var lookaheadPropertyKey = this.qualifiedPropertyName(this.lookahead);
			        if (token.type === 3 /* Identifier */) {
			            if (token.value === 'get' && lookaheadPropertyKey) {
			                kind = 'get';
			                computed = this.match('[');
			                key = this.parseObjectPropertyKey();
			                this.context.allowYield = false;
			                value = this.parseGetterMethod();
			            }
			            else if (token.value === 'set' && lookaheadPropertyKey) {
			                kind = 'set';
			                computed = this.match('[');
			                key = this.parseObjectPropertyKey();
			                value = this.parseSetterMethod();
			            }
			        }
			        else if (token.type === 7 /* Punctuator */ && token.value === '*' && lookaheadPropertyKey) {
			            kind = 'init';
			            computed = this.match('[');
			            key = this.parseObjectPropertyKey();
			            value = this.parseGeneratorMethod();
			            method = true;
			        }
			        if (!kind && key && this.match('(')) {
			            kind = 'init';
			            value = isAsync ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction();
			            method = true;
			        }
			        if (!kind) {
			            this.throwUnexpectedToken(this.lookahead);
			        }
			        if (kind === 'init') {
			            kind = 'method';
			        }
			        if (!computed) {
			            if (isStatic && this.isPropertyKey(key, 'prototype')) {
			                this.throwUnexpectedToken(token, messages_1.Messages.StaticPrototype);
			            }
			            if (!isStatic && this.isPropertyKey(key, 'constructor')) {
			                if (kind !== 'method' || !method || (value && value.generator)) {
			                    this.throwUnexpectedToken(token, messages_1.Messages.ConstructorSpecialMethod);
			                }
			                if (hasConstructor.value) {
			                    this.throwUnexpectedToken(token, messages_1.Messages.DuplicateConstructor);
			                }
			                else {
			                    hasConstructor.value = true;
			                }
			                kind = 'constructor';
			            }
			        }
			        return this.finalize(node, new Node.MethodDefinition(key, computed, value, kind, isStatic));
			    };
			    Parser.prototype.parseClassElementList = function () {
			        var body = [];
			        var hasConstructor = { value: false };
			        this.expect('{');
			        while (!this.match('}')) {
			            if (this.match(';')) {
			                this.nextToken();
			            }
			            else {
			                body.push(this.parseClassElement(hasConstructor));
			            }
			        }
			        this.expect('}');
			        return body;
			    };
			    Parser.prototype.parseClassBody = function () {
			        var node = this.createNode();
			        var elementList = this.parseClassElementList();
			        return this.finalize(node, new Node.ClassBody(elementList));
			    };
			    Parser.prototype.parseClassDeclaration = function (identifierIsOptional) {
			        var node = this.createNode();
			        var previousStrict = this.context.strict;
			        this.context.strict = true;
			        this.expectKeyword('class');
			        var id = (identifierIsOptional && (this.lookahead.type !== 3 /* Identifier */)) ? null : this.parseVariableIdentifier();
			        var superClass = null;
			        if (this.matchKeyword('extends')) {
			            this.nextToken();
			            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
			        }
			        var classBody = this.parseClassBody();
			        this.context.strict = previousStrict;
			        return this.finalize(node, new Node.ClassDeclaration(id, superClass, classBody));
			    };
			    Parser.prototype.parseClassExpression = function () {
			        var node = this.createNode();
			        var previousStrict = this.context.strict;
			        this.context.strict = true;
			        this.expectKeyword('class');
			        var id = (this.lookahead.type === 3 /* Identifier */) ? this.parseVariableIdentifier() : null;
			        var superClass = null;
			        if (this.matchKeyword('extends')) {
			            this.nextToken();
			            superClass = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall);
			        }
			        var classBody = this.parseClassBody();
			        this.context.strict = previousStrict;
			        return this.finalize(node, new Node.ClassExpression(id, superClass, classBody));
			    };
			    // https://tc39.github.io/ecma262/#sec-scripts
			    // https://tc39.github.io/ecma262/#sec-modules
			    Parser.prototype.parseModule = function () {
			        this.context.strict = true;
			        this.context.isModule = true;
			        this.scanner.isModule = true;
			        var node = this.createNode();
			        var body = this.parseDirectivePrologues();
			        while (this.lookahead.type !== 2 /* EOF */) {
			            body.push(this.parseStatementListItem());
			        }
			        return this.finalize(node, new Node.Module(body));
			    };
			    Parser.prototype.parseScript = function () {
			        var node = this.createNode();
			        var body = this.parseDirectivePrologues();
			        while (this.lookahead.type !== 2 /* EOF */) {
			            body.push(this.parseStatementListItem());
			        }
			        return this.finalize(node, new Node.Script(body));
			    };
			    // https://tc39.github.io/ecma262/#sec-imports
			    Parser.prototype.parseModuleSpecifier = function () {
			        var node = this.createNode();
			        if (this.lookahead.type !== 8 /* StringLiteral */) {
			            this.throwError(messages_1.Messages.InvalidModuleSpecifier);
			        }
			        var token = this.nextToken();
			        var raw = this.getTokenRaw(token);
			        return this.finalize(node, new Node.Literal(token.value, raw));
			    };
			    // import {<foo as bar>} ...;
			    Parser.prototype.parseImportSpecifier = function () {
			        var node = this.createNode();
			        var imported;
			        var local;
			        if (this.lookahead.type === 3 /* Identifier */) {
			            imported = this.parseVariableIdentifier();
			            local = imported;
			            if (this.matchContextualKeyword('as')) {
			                this.nextToken();
			                local = this.parseVariableIdentifier();
			            }
			        }
			        else {
			            imported = this.parseIdentifierName();
			            local = imported;
			            if (this.matchContextualKeyword('as')) {
			                this.nextToken();
			                local = this.parseVariableIdentifier();
			            }
			            else {
			                this.throwUnexpectedToken(this.nextToken());
			            }
			        }
			        return this.finalize(node, new Node.ImportSpecifier(local, imported));
			    };
			    // {foo, bar as bas}
			    Parser.prototype.parseNamedImports = function () {
			        this.expect('{');
			        var specifiers = [];
			        while (!this.match('}')) {
			            specifiers.push(this.parseImportSpecifier());
			            if (!this.match('}')) {
			                this.expect(',');
			            }
			        }
			        this.expect('}');
			        return specifiers;
			    };
			    // import <foo> ...;
			    Parser.prototype.parseImportDefaultSpecifier = function () {
			        var node = this.createNode();
			        var local = this.parseIdentifierName();
			        return this.finalize(node, new Node.ImportDefaultSpecifier(local));
			    };
			    // import <* as foo> ...;
			    Parser.prototype.parseImportNamespaceSpecifier = function () {
			        var node = this.createNode();
			        this.expect('*');
			        if (!this.matchContextualKeyword('as')) {
			            this.throwError(messages_1.Messages.NoAsAfterImportNamespace);
			        }
			        this.nextToken();
			        var local = this.parseIdentifierName();
			        return this.finalize(node, new Node.ImportNamespaceSpecifier(local));
			    };
			    Parser.prototype.parseImportDeclaration = function () {
			        if (this.context.inFunctionBody) {
			            this.throwError(messages_1.Messages.IllegalImportDeclaration);
			        }
			        var node = this.createNode();
			        this.expectKeyword('import');
			        var src;
			        var specifiers = [];
			        if (this.lookahead.type === 8 /* StringLiteral */) {
			            // import 'foo';
			            src = this.parseModuleSpecifier();
			        }
			        else {
			            if (this.match('{')) {
			                // import {bar}
			                specifiers = specifiers.concat(this.parseNamedImports());
			            }
			            else if (this.match('*')) {
			                // import * as foo
			                specifiers.push(this.parseImportNamespaceSpecifier());
			            }
			            else if (this.isIdentifierName(this.lookahead) && !this.matchKeyword('default')) {
			                // import foo
			                specifiers.push(this.parseImportDefaultSpecifier());
			                if (this.match(',')) {
			                    this.nextToken();
			                    if (this.match('*')) {
			                        // import foo, * as foo
			                        specifiers.push(this.parseImportNamespaceSpecifier());
			                    }
			                    else if (this.match('{')) {
			                        // import foo, {bar}
			                        specifiers = specifiers.concat(this.parseNamedImports());
			                    }
			                    else {
			                        this.throwUnexpectedToken(this.lookahead);
			                    }
			                }
			            }
			            else {
			                this.throwUnexpectedToken(this.nextToken());
			            }
			            if (!this.matchContextualKeyword('from')) {
			                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
			                this.throwError(message, this.lookahead.value);
			            }
			            this.nextToken();
			            src = this.parseModuleSpecifier();
			        }
			        this.consumeSemicolon();
			        return this.finalize(node, new Node.ImportDeclaration(specifiers, src));
			    };
			    // https://tc39.github.io/ecma262/#sec-exports
			    Parser.prototype.parseExportSpecifier = function () {
			        var node = this.createNode();
			        var local = this.parseIdentifierName();
			        var exported = local;
			        if (this.matchContextualKeyword('as')) {
			            this.nextToken();
			            exported = this.parseIdentifierName();
			        }
			        return this.finalize(node, new Node.ExportSpecifier(local, exported));
			    };
			    Parser.prototype.parseExportDeclaration = function () {
			        if (this.context.inFunctionBody) {
			            this.throwError(messages_1.Messages.IllegalExportDeclaration);
			        }
			        var node = this.createNode();
			        this.expectKeyword('export');
			        var exportDeclaration;
			        if (this.matchKeyword('default')) {
			            // export default ...
			            this.nextToken();
			            if (this.matchKeyword('function')) {
			                // export default function foo () {}
			                // export default function () {}
			                var declaration = this.parseFunctionDeclaration(true);
			                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
			            }
			            else if (this.matchKeyword('class')) {
			                // export default class foo {}
			                var declaration = this.parseClassDeclaration(true);
			                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
			            }
			            else if (this.matchContextualKeyword('async')) {
			                // export default async function f () {}
			                // export default async function () {}
			                // export default async x => x
			                var declaration = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
			                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
			            }
			            else {
			                if (this.matchContextualKeyword('from')) {
			                    this.throwError(messages_1.Messages.UnexpectedToken, this.lookahead.value);
			                }
			                // export default {};
			                // export default [];
			                // export default (1 + 2);
			                var declaration = this.match('{') ? this.parseObjectInitializer() :
			                    this.match('[') ? this.parseArrayInitializer() : this.parseAssignmentExpression();
			                this.consumeSemicolon();
			                exportDeclaration = this.finalize(node, new Node.ExportDefaultDeclaration(declaration));
			            }
			        }
			        else if (this.match('*')) {
			            // export * from 'foo';
			            this.nextToken();
			            if (!this.matchContextualKeyword('from')) {
			                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
			                this.throwError(message, this.lookahead.value);
			            }
			            this.nextToken();
			            var src = this.parseModuleSpecifier();
			            this.consumeSemicolon();
			            exportDeclaration = this.finalize(node, new Node.ExportAllDeclaration(src));
			        }
			        else if (this.lookahead.type === 4 /* Keyword */) {
			            // export var f = 1;
			            var declaration = void 0;
			            switch (this.lookahead.value) {
			                case 'let':
			                case 'const':
			                    declaration = this.parseLexicalDeclaration({ inFor: false });
			                    break;
			                case 'var':
			                case 'class':
			                case 'function':
			                    declaration = this.parseStatementListItem();
			                    break;
			                default:
			                    this.throwUnexpectedToken(this.lookahead);
			            }
			            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
			        }
			        else if (this.matchAsyncFunction()) {
			            var declaration = this.parseFunctionDeclaration();
			            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(declaration, [], null));
			        }
			        else {
			            var specifiers = [];
			            var source = null;
			            var isExportFromIdentifier = false;
			            this.expect('{');
			            while (!this.match('}')) {
			                isExportFromIdentifier = isExportFromIdentifier || this.matchKeyword('default');
			                specifiers.push(this.parseExportSpecifier());
			                if (!this.match('}')) {
			                    this.expect(',');
			                }
			            }
			            this.expect('}');
			            if (this.matchContextualKeyword('from')) {
			                // export {default} from 'foo';
			                // export {foo} from 'foo';
			                this.nextToken();
			                source = this.parseModuleSpecifier();
			                this.consumeSemicolon();
			            }
			            else if (isExportFromIdentifier) {
			                // export {default}; // missing fromClause
			                var message = this.lookahead.value ? messages_1.Messages.UnexpectedToken : messages_1.Messages.MissingFromClause;
			                this.throwError(message, this.lookahead.value);
			            }
			            else {
			                // export {foo};
			                this.consumeSemicolon();
			            }
			            exportDeclaration = this.finalize(node, new Node.ExportNamedDeclaration(null, specifiers, source));
			        }
			        return exportDeclaration;
			    };
			    return Parser;
			}());
			exports.Parser = Parser;


		/***/ },
		/* 9 */
		/***/ function(module, exports) {
			// Ensure the condition is true, otherwise throw an error.
			// This is only to have a better contract semantic, i.e. another safety net
			// to catch a logic error. The condition shall be fulfilled in normal case.
			// Do NOT use this to enforce a certain condition on any user input.
			Object.defineProperty(exports, "__esModule", { value: true });
			function assert(condition, message) {
			    /* istanbul ignore if */
			    if (!condition) {
			        throw new Error('ASSERT: ' + message);
			    }
			}
			exports.assert = assert;


		/***/ },
		/* 10 */
		/***/ function(module, exports) {
			/* tslint:disable:max-classes-per-file */
			Object.defineProperty(exports, "__esModule", { value: true });
			var ErrorHandler = (function () {
			    function ErrorHandler() {
			        this.errors = [];
			        this.tolerant = false;
			    }
			    ErrorHandler.prototype.recordError = function (error) {
			        this.errors.push(error);
			    };
			    ErrorHandler.prototype.tolerate = function (error) {
			        if (this.tolerant) {
			            this.recordError(error);
			        }
			        else {
			            throw error;
			        }
			    };
			    ErrorHandler.prototype.constructError = function (msg, column) {
			        var error = new Error(msg);
			        try {
			            throw error;
			        }
			        catch (base) {
			            /* istanbul ignore else */
			            if (Object.create && Object.defineProperty) {
			                error = Object.create(base);
			                Object.defineProperty(error, 'column', { value: column });
			            }
			        }
			        /* istanbul ignore next */
			        return error;
			    };
			    ErrorHandler.prototype.createError = function (index, line, col, description) {
			        var msg = 'Line ' + line + ': ' + description;
			        var error = this.constructError(msg, col);
			        error.index = index;
			        error.lineNumber = line;
			        error.description = description;
			        return error;
			    };
			    ErrorHandler.prototype.throwError = function (index, line, col, description) {
			        throw this.createError(index, line, col, description);
			    };
			    ErrorHandler.prototype.tolerateError = function (index, line, col, description) {
			        var error = this.createError(index, line, col, description);
			        if (this.tolerant) {
			            this.recordError(error);
			        }
			        else {
			            throw error;
			        }
			    };
			    return ErrorHandler;
			}());
			exports.ErrorHandler = ErrorHandler;


		/***/ },
		/* 11 */
		/***/ function(module, exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			// Error messages should be identical to V8.
			exports.Messages = {
			    BadGetterArity: 'Getter must not have any formal parameters',
			    BadSetterArity: 'Setter must have exactly one formal parameter',
			    BadSetterRestParameter: 'Setter function argument must not be a rest parameter',
			    ConstructorIsAsync: 'Class constructor may not be an async method',
			    ConstructorSpecialMethod: 'Class constructor may not be an accessor',
			    DeclarationMissingInitializer: 'Missing initializer in %0 declaration',
			    DefaultRestParameter: 'Unexpected token =',
			    DuplicateBinding: 'Duplicate binding %0',
			    DuplicateConstructor: 'A class may only have one constructor',
			    DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
			    ForInOfLoopInitializer: '%0 loop variable declaration may not have an initializer',
			    GeneratorInLegacyContext: 'Generator declarations are not allowed in legacy contexts',
			    IllegalBreak: 'Illegal break statement',
			    IllegalContinue: 'Illegal continue statement',
			    IllegalExportDeclaration: 'Unexpected token',
			    IllegalImportDeclaration: 'Unexpected token',
			    IllegalLanguageModeDirective: 'Illegal \'use strict\' directive in function with non-simple parameter list',
			    IllegalReturn: 'Illegal return statement',
			    InvalidEscapedReservedWord: 'Keyword must not contain escaped characters',
			    InvalidHexEscapeSequence: 'Invalid hexadecimal escape sequence',
			    InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
			    InvalidLHSInForIn: 'Invalid left-hand side in for-in',
			    InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
			    InvalidModuleSpecifier: 'Unexpected token',
			    InvalidRegExp: 'Invalid regular expression',
			    LetInLexicalBinding: 'let is disallowed as a lexically bound name',
			    MissingFromClause: 'Unexpected token',
			    MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
			    NewlineAfterThrow: 'Illegal newline after throw',
			    NoAsAfterImportNamespace: 'Unexpected token',
			    NoCatchOrFinally: 'Missing catch or finally after try',
			    ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
			    Redeclaration: '%0 \'%1\' has already been declared',
			    StaticPrototype: 'Classes may not have static property named prototype',
			    StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
			    StrictDelete: 'Delete of an unqualified identifier in strict mode.',
			    StrictFunction: 'In strict mode code, functions can only be declared at top level or inside a block',
			    StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
			    StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
			    StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
			    StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
			    StrictModeWith: 'Strict mode code may not include a with statement',
			    StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
			    StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
			    StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
			    StrictReservedWord: 'Use of future reserved word in strict mode',
			    StrictVarName: 'Variable name may not be eval or arguments in strict mode',
			    TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
			    UnexpectedEOS: 'Unexpected end of input',
			    UnexpectedIdentifier: 'Unexpected identifier',
			    UnexpectedNumber: 'Unexpected number',
			    UnexpectedReserved: 'Unexpected reserved word',
			    UnexpectedString: 'Unexpected string',
			    UnexpectedTemplate: 'Unexpected quasi %0',
			    UnexpectedToken: 'Unexpected token %0',
			    UnexpectedTokenIllegal: 'Unexpected token ILLEGAL',
			    UnknownLabel: 'Undefined label \'%0\'',
			    UnterminatedRegExp: 'Invalid regular expression: missing /'
			};


		/***/ },
		/* 12 */
		/***/ function(module, exports, __webpack_require__) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var assert_1 = __webpack_require__(9);
			var character_1 = __webpack_require__(4);
			var messages_1 = __webpack_require__(11);
			function hexValue(ch) {
			    return '0123456789abcdef'.indexOf(ch.toLowerCase());
			}
			function octalValue(ch) {
			    return '01234567'.indexOf(ch);
			}
			var Scanner = (function () {
			    function Scanner(code, handler) {
			        this.source = code;
			        this.errorHandler = handler;
			        this.trackComment = false;
			        this.isModule = false;
			        this.length = code.length;
			        this.index = 0;
			        this.lineNumber = (code.length > 0) ? 1 : 0;
			        this.lineStart = 0;
			        this.curlyStack = [];
			    }
			    Scanner.prototype.saveState = function () {
			        return {
			            index: this.index,
			            lineNumber: this.lineNumber,
			            lineStart: this.lineStart
			        };
			    };
			    Scanner.prototype.restoreState = function (state) {
			        this.index = state.index;
			        this.lineNumber = state.lineNumber;
			        this.lineStart = state.lineStart;
			    };
			    Scanner.prototype.eof = function () {
			        return this.index >= this.length;
			    };
			    Scanner.prototype.throwUnexpectedToken = function (message) {
			        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
			        return this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
			    };
			    Scanner.prototype.tolerateUnexpectedToken = function (message) {
			        if (message === void 0) { message = messages_1.Messages.UnexpectedTokenIllegal; }
			        this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, message);
			    };
			    // https://tc39.github.io/ecma262/#sec-comments
			    Scanner.prototype.skipSingleLineComment = function (offset) {
			        var comments = [];
			        var start, loc;
			        if (this.trackComment) {
			            comments = [];
			            start = this.index - offset;
			            loc = {
			                start: {
			                    line: this.lineNumber,
			                    column: this.index - this.lineStart - offset
			                },
			                end: {}
			            };
			        }
			        while (!this.eof()) {
			            var ch = this.source.charCodeAt(this.index);
			            ++this.index;
			            if (character_1.Character.isLineTerminator(ch)) {
			                if (this.trackComment) {
			                    loc.end = {
			                        line: this.lineNumber,
			                        column: this.index - this.lineStart - 1
			                    };
			                    var entry = {
			                        multiLine: false,
			                        slice: [start + offset, this.index - 1],
			                        range: [start, this.index - 1],
			                        loc: loc
			                    };
			                    comments.push(entry);
			                }
			                if (ch === 13 && this.source.charCodeAt(this.index) === 10) {
			                    ++this.index;
			                }
			                ++this.lineNumber;
			                this.lineStart = this.index;
			                return comments;
			            }
			        }
			        if (this.trackComment) {
			            loc.end = {
			                line: this.lineNumber,
			                column: this.index - this.lineStart
			            };
			            var entry = {
			                multiLine: false,
			                slice: [start + offset, this.index],
			                range: [start, this.index],
			                loc: loc
			            };
			            comments.push(entry);
			        }
			        return comments;
			    };
			    Scanner.prototype.skipMultiLineComment = function () {
			        var comments = [];
			        var start, loc;
			        if (this.trackComment) {
			            comments = [];
			            start = this.index - 2;
			            loc = {
			                start: {
			                    line: this.lineNumber,
			                    column: this.index - this.lineStart - 2
			                },
			                end: {}
			            };
			        }
			        while (!this.eof()) {
			            var ch = this.source.charCodeAt(this.index);
			            if (character_1.Character.isLineTerminator(ch)) {
			                if (ch === 0x0D && this.source.charCodeAt(this.index + 1) === 0x0A) {
			                    ++this.index;
			                }
			                ++this.lineNumber;
			                ++this.index;
			                this.lineStart = this.index;
			            }
			            else if (ch === 0x2A) {
			                // Block comment ends with '*/'.
			                if (this.source.charCodeAt(this.index + 1) === 0x2F) {
			                    this.index += 2;
			                    if (this.trackComment) {
			                        loc.end = {
			                            line: this.lineNumber,
			                            column: this.index - this.lineStart
			                        };
			                        var entry = {
			                            multiLine: true,
			                            slice: [start + 2, this.index - 2],
			                            range: [start, this.index],
			                            loc: loc
			                        };
			                        comments.push(entry);
			                    }
			                    return comments;
			                }
			                ++this.index;
			            }
			            else {
			                ++this.index;
			            }
			        }
			        // Ran off the end of the file - the whole thing is a comment
			        if (this.trackComment) {
			            loc.end = {
			                line: this.lineNumber,
			                column: this.index - this.lineStart
			            };
			            var entry = {
			                multiLine: true,
			                slice: [start + 2, this.index],
			                range: [start, this.index],
			                loc: loc
			            };
			            comments.push(entry);
			        }
			        this.tolerateUnexpectedToken();
			        return comments;
			    };
			    Scanner.prototype.scanComments = function () {
			        var comments;
			        if (this.trackComment) {
			            comments = [];
			        }
			        var start = (this.index === 0);
			        while (!this.eof()) {
			            var ch = this.source.charCodeAt(this.index);
			            if (character_1.Character.isWhiteSpace(ch)) {
			                ++this.index;
			            }
			            else if (character_1.Character.isLineTerminator(ch)) {
			                ++this.index;
			                if (ch === 0x0D && this.source.charCodeAt(this.index) === 0x0A) {
			                    ++this.index;
			                }
			                ++this.lineNumber;
			                this.lineStart = this.index;
			                start = true;
			            }
			            else if (ch === 0x2F) {
			                ch = this.source.charCodeAt(this.index + 1);
			                if (ch === 0x2F) {
			                    this.index += 2;
			                    var comment = this.skipSingleLineComment(2);
			                    if (this.trackComment) {
			                        comments = comments.concat(comment);
			                    }
			                    start = true;
			                }
			                else if (ch === 0x2A) {
			                    this.index += 2;
			                    var comment = this.skipMultiLineComment();
			                    if (this.trackComment) {
			                        comments = comments.concat(comment);
			                    }
			                }
			                else {
			                    break;
			                }
			            }
			            else if (start && ch === 0x2D) {
			                // U+003E is '>'
			                if ((this.source.charCodeAt(this.index + 1) === 0x2D) && (this.source.charCodeAt(this.index + 2) === 0x3E)) {
			                    // '-->' is a single-line comment
			                    this.index += 3;
			                    var comment = this.skipSingleLineComment(3);
			                    if (this.trackComment) {
			                        comments = comments.concat(comment);
			                    }
			                }
			                else {
			                    break;
			                }
			            }
			            else if (ch === 0x3C && !this.isModule) {
			                if (this.source.slice(this.index + 1, this.index + 4) === '!--') {
			                    this.index += 4; // `<!--`
			                    var comment = this.skipSingleLineComment(4);
			                    if (this.trackComment) {
			                        comments = comments.concat(comment);
			                    }
			                }
			                else {
			                    break;
			                }
			            }
			            else {
			                break;
			            }
			        }
			        return comments;
			    };
			    // https://tc39.github.io/ecma262/#sec-future-reserved-words
			    Scanner.prototype.isFutureReservedWord = function (id) {
			        switch (id) {
			            case 'enum':
			            case 'export':
			            case 'import':
			            case 'super':
			                return true;
			            default:
			                return false;
			        }
			    };
			    Scanner.prototype.isStrictModeReservedWord = function (id) {
			        switch (id) {
			            case 'implements':
			            case 'interface':
			            case 'package':
			            case 'private':
			            case 'protected':
			            case 'public':
			            case 'static':
			            case 'yield':
			            case 'let':
			                return true;
			            default:
			                return false;
			        }
			    };
			    Scanner.prototype.isRestrictedWord = function (id) {
			        return id === 'eval' || id === 'arguments';
			    };
			    // https://tc39.github.io/ecma262/#sec-keywords
			    Scanner.prototype.isKeyword = function (id) {
			        switch (id.length) {
			            case 2:
			                return (id === 'if') || (id === 'in') || (id === 'do');
			            case 3:
			                return (id === 'var') || (id === 'for') || (id === 'new') ||
			                    (id === 'try') || (id === 'let');
			            case 4:
			                return (id === 'this') || (id === 'else') || (id === 'case') ||
			                    (id === 'void') || (id === 'with') || (id === 'enum');
			            case 5:
			                return (id === 'while') || (id === 'break') || (id === 'catch') ||
			                    (id === 'throw') || (id === 'const') || (id === 'yield') ||
			                    (id === 'class') || (id === 'super');
			            case 6:
			                return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
			                    (id === 'switch') || (id === 'export') || (id === 'import');
			            case 7:
			                return (id === 'default') || (id === 'finally') || (id === 'extends');
			            case 8:
			                return (id === 'function') || (id === 'continue') || (id === 'debugger');
			            case 10:
			                return (id === 'instanceof');
			            default:
			                return false;
			        }
			    };
			    Scanner.prototype.codePointAt = function (i) {
			        var cp = this.source.charCodeAt(i);
			        if (cp >= 0xD800 && cp <= 0xDBFF) {
			            var second = this.source.charCodeAt(i + 1);
			            if (second >= 0xDC00 && second <= 0xDFFF) {
			                var first = cp;
			                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
			            }
			        }
			        return cp;
			    };
			    Scanner.prototype.scanHexEscape = function (prefix) {
			        var len = (prefix === 'u') ? 4 : 2;
			        var code = 0;
			        for (var i = 0; i < len; ++i) {
			            if (!this.eof() && character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
			                code = code * 16 + hexValue(this.source[this.index++]);
			            }
			            else {
			                return null;
			            }
			        }
			        return String.fromCharCode(code);
			    };
			    Scanner.prototype.scanUnicodeCodePointEscape = function () {
			        var ch = this.source[this.index];
			        var code = 0;
			        // At least, one hex digit is required.
			        if (ch === '}') {
			            this.throwUnexpectedToken();
			        }
			        while (!this.eof()) {
			            ch = this.source[this.index++];
			            if (!character_1.Character.isHexDigit(ch.charCodeAt(0))) {
			                break;
			            }
			            code = code * 16 + hexValue(ch);
			        }
			        if (code > 0x10FFFF || ch !== '}') {
			            this.throwUnexpectedToken();
			        }
			        return character_1.Character.fromCodePoint(code);
			    };
			    Scanner.prototype.getIdentifier = function () {
			        var start = this.index++;
			        while (!this.eof()) {
			            var ch = this.source.charCodeAt(this.index);
			            if (ch === 0x5C) {
			                // Blackslash (U+005C) marks Unicode escape sequence.
			                this.index = start;
			                return this.getComplexIdentifier();
			            }
			            else if (ch >= 0xD800 && ch < 0xDFFF) {
			                // Need to handle surrogate pairs.
			                this.index = start;
			                return this.getComplexIdentifier();
			            }
			            if (character_1.Character.isIdentifierPart(ch)) {
			                ++this.index;
			            }
			            else {
			                break;
			            }
			        }
			        return this.source.slice(start, this.index);
			    };
			    Scanner.prototype.getComplexIdentifier = function () {
			        var cp = this.codePointAt(this.index);
			        var id = character_1.Character.fromCodePoint(cp);
			        this.index += id.length;
			        // '\u' (U+005C, U+0075) denotes an escaped character.
			        var ch;
			        if (cp === 0x5C) {
			            if (this.source.charCodeAt(this.index) !== 0x75) {
			                this.throwUnexpectedToken();
			            }
			            ++this.index;
			            if (this.source[this.index] === '{') {
			                ++this.index;
			                ch = this.scanUnicodeCodePointEscape();
			            }
			            else {
			                ch = this.scanHexEscape('u');
			                if (ch === null || ch === '\\' || !character_1.Character.isIdentifierStart(ch.charCodeAt(0))) {
			                    this.throwUnexpectedToken();
			                }
			            }
			            id = ch;
			        }
			        while (!this.eof()) {
			            cp = this.codePointAt(this.index);
			            if (!character_1.Character.isIdentifierPart(cp)) {
			                break;
			            }
			            ch = character_1.Character.fromCodePoint(cp);
			            id += ch;
			            this.index += ch.length;
			            // '\u' (U+005C, U+0075) denotes an escaped character.
			            if (cp === 0x5C) {
			                id = id.substr(0, id.length - 1);
			                if (this.source.charCodeAt(this.index) !== 0x75) {
			                    this.throwUnexpectedToken();
			                }
			                ++this.index;
			                if (this.source[this.index] === '{') {
			                    ++this.index;
			                    ch = this.scanUnicodeCodePointEscape();
			                }
			                else {
			                    ch = this.scanHexEscape('u');
			                    if (ch === null || ch === '\\' || !character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
			                        this.throwUnexpectedToken();
			                    }
			                }
			                id += ch;
			            }
			        }
			        return id;
			    };
			    Scanner.prototype.octalToDecimal = function (ch) {
			        // \0 is not octal escape sequence
			        var octal = (ch !== '0');
			        var code = octalValue(ch);
			        if (!this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
			            octal = true;
			            code = code * 8 + octalValue(this.source[this.index++]);
			            // 3 digits are only allowed when string starts
			            // with 0, 1, 2, 3
			            if ('0123'.indexOf(ch) >= 0 && !this.eof() && character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
			                code = code * 8 + octalValue(this.source[this.index++]);
			            }
			        }
			        return {
			            code: code,
			            octal: octal
			        };
			    };
			    // https://tc39.github.io/ecma262/#sec-names-and-keywords
			    Scanner.prototype.scanIdentifier = function () {
			        var type;
			        var start = this.index;
			        // Backslash (U+005C) starts an escaped character.
			        var id = (this.source.charCodeAt(start) === 0x5C) ? this.getComplexIdentifier() : this.getIdentifier();
			        // There is no keyword or literal with only one character.
			        // Thus, it must be an identifier.
			        if (id.length === 1) {
			            type = 3 /* Identifier */;
			        }
			        else if (this.isKeyword(id)) {
			            type = 4 /* Keyword */;
			        }
			        else if (id === 'null') {
			            type = 5 /* NullLiteral */;
			        }
			        else if (id === 'true' || id === 'false') {
			            type = 1 /* BooleanLiteral */;
			        }
			        else {
			            type = 3 /* Identifier */;
			        }
			        if (type !== 3 /* Identifier */ && (start + id.length !== this.index)) {
			            var restore = this.index;
			            this.index = start;
			            this.tolerateUnexpectedToken(messages_1.Messages.InvalidEscapedReservedWord);
			            this.index = restore;
			        }
			        return {
			            type: type,
			            value: id,
			            lineNumber: this.lineNumber,
			            lineStart: this.lineStart,
			            start: start,
			            end: this.index
			        };
			    };
			    // https://tc39.github.io/ecma262/#sec-punctuators
			    Scanner.prototype.scanPunctuator = function () {
			        var start = this.index;
			        // Check for most common single-character punctuators.
			        var str = this.source[this.index];
			        switch (str) {
			            case '(':
			            case '{':
			                if (str === '{') {
			                    this.curlyStack.push('{');
			                }
			                ++this.index;
			                break;
			            case '.':
			                ++this.index;
			                if (this.source[this.index] === '.' && this.source[this.index + 1] === '.') {
			                    // Spread operator: ...
			                    this.index += 2;
			                    str = '...';
			                }
			                break;
			            case '}':
			                ++this.index;
			                this.curlyStack.pop();
			                break;
			            case ')':
			            case ';':
			            case ',':
			            case '[':
			            case ']':
			            case ':':
			            case '?':
			            case '~':
			                ++this.index;
			                break;
			            default:
			                // 4-character punctuator.
			                str = this.source.substr(this.index, 4);
			                if (str === '>>>=') {
			                    this.index += 4;
			                }
			                else {
			                    // 3-character punctuators.
			                    str = str.substr(0, 3);
			                    if (str === '===' || str === '!==' || str === '>>>' ||
			                        str === '<<=' || str === '>>=' || str === '**=') {
			                        this.index += 3;
			                    }
			                    else {
			                        // 2-character punctuators.
			                        str = str.substr(0, 2);
			                        if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
			                            str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
			                            str === '++' || str === '--' || str === '<<' || str === '>>' ||
			                            str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
			                            str === '<=' || str === '>=' || str === '=>' || str === '**') {
			                            this.index += 2;
			                        }
			                        else {
			                            // 1-character punctuators.
			                            str = this.source[this.index];
			                            if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
			                                ++this.index;
			                            }
			                        }
			                    }
			                }
			        }
			        if (this.index === start) {
			            this.throwUnexpectedToken();
			        }
			        return {
			            type: 7 /* Punctuator */,
			            value: str,
			            lineNumber: this.lineNumber,
			            lineStart: this.lineStart,
			            start: start,
			            end: this.index
			        };
			    };
			    // https://tc39.github.io/ecma262/#sec-literals-numeric-literals
			    Scanner.prototype.scanHexLiteral = function (start) {
			        var num = '';
			        while (!this.eof()) {
			            if (!character_1.Character.isHexDigit(this.source.charCodeAt(this.index))) {
			                break;
			            }
			            num += this.source[this.index++];
			        }
			        if (num.length === 0) {
			            this.throwUnexpectedToken();
			        }
			        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
			            this.throwUnexpectedToken();
			        }
			        return {
			            type: 6 /* NumericLiteral */,
			            value: parseInt('0x' + num, 16),
			            lineNumber: this.lineNumber,
			            lineStart: this.lineStart,
			            start: start,
			            end: this.index
			        };
			    };
			    Scanner.prototype.scanBinaryLiteral = function (start) {
			        var num = '';
			        var ch;
			        while (!this.eof()) {
			            ch = this.source[this.index];
			            if (ch !== '0' && ch !== '1') {
			                break;
			            }
			            num += this.source[this.index++];
			        }
			        if (num.length === 0) {
			            // only 0b or 0B
			            this.throwUnexpectedToken();
			        }
			        if (!this.eof()) {
			            ch = this.source.charCodeAt(this.index);
			            /* istanbul ignore else */
			            if (character_1.Character.isIdentifierStart(ch) || character_1.Character.isDecimalDigit(ch)) {
			                this.throwUnexpectedToken();
			            }
			        }
			        return {
			            type: 6 /* NumericLiteral */,
			            value: parseInt(num, 2),
			            lineNumber: this.lineNumber,
			            lineStart: this.lineStart,
			            start: start,
			            end: this.index
			        };
			    };
			    Scanner.prototype.scanOctalLiteral = function (prefix, start) {
			        var num = '';
			        var octal = false;
			        if (character_1.Character.isOctalDigit(prefix.charCodeAt(0))) {
			            octal = true;
			            num = '0' + this.source[this.index++];
			        }
			        else {
			            ++this.index;
			        }
			        while (!this.eof()) {
			            if (!character_1.Character.isOctalDigit(this.source.charCodeAt(this.index))) {
			                break;
			            }
			            num += this.source[this.index++];
			        }
			        if (!octal && num.length === 0) {
			            // only 0o or 0O
			            this.throwUnexpectedToken();
			        }
			        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
			            this.throwUnexpectedToken();
			        }
			        return {
			            type: 6 /* NumericLiteral */,
			            value: parseInt(num, 8),
			            octal: octal,
			            lineNumber: this.lineNumber,
			            lineStart: this.lineStart,
			            start: start,
			            end: this.index
			        };
			    };
			    Scanner.prototype.isImplicitOctalLiteral = function () {
			        // Implicit octal, unless there is a non-octal digit.
			        // (Annex B.1.1 on Numeric Literals)
			        for (var i = this.index + 1; i < this.length; ++i) {
			            var ch = this.source[i];
			            if (ch === '8' || ch === '9') {
			                return false;
			            }
			            if (!character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
			                return true;
			            }
			        }
			        return true;
			    };
			    Scanner.prototype.scanNumericLiteral = function () {
			        var start = this.index;
			        var ch = this.source[start];
			        assert_1.assert(character_1.Character.isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'), 'Numeric literal must start with a decimal digit or a decimal point');
			        var num = '';
			        if (ch !== '.') {
			            num = this.source[this.index++];
			            ch = this.source[this.index];
			            // Hex number starts with '0x'.
			            // Octal number starts with '0'.
			            // Octal number in ES6 starts with '0o'.
			            // Binary number in ES6 starts with '0b'.
			            if (num === '0') {
			                if (ch === 'x' || ch === 'X') {
			                    ++this.index;
			                    return this.scanHexLiteral(start);
			                }
			                if (ch === 'b' || ch === 'B') {
			                    ++this.index;
			                    return this.scanBinaryLiteral(start);
			                }
			                if (ch === 'o' || ch === 'O') {
			                    return this.scanOctalLiteral(ch, start);
			                }
			                if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
			                    if (this.isImplicitOctalLiteral()) {
			                        return this.scanOctalLiteral(ch, start);
			                    }
			                }
			            }
			            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
			                num += this.source[this.index++];
			            }
			            ch = this.source[this.index];
			        }
			        if (ch === '.') {
			            num += this.source[this.index++];
			            while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
			                num += this.source[this.index++];
			            }
			            ch = this.source[this.index];
			        }
			        if (ch === 'e' || ch === 'E') {
			            num += this.source[this.index++];
			            ch = this.source[this.index];
			            if (ch === '+' || ch === '-') {
			                num += this.source[this.index++];
			            }
			            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
			                while (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
			                    num += this.source[this.index++];
			                }
			            }
			            else {
			                this.throwUnexpectedToken();
			            }
			        }
			        if (character_1.Character.isIdentifierStart(this.source.charCodeAt(this.index))) {
			            this.throwUnexpectedToken();
			        }
			        return {
			            type: 6 /* NumericLiteral */,
			            value: parseFloat(num),
			            lineNumber: this.lineNumber,
			            lineStart: this.lineStart,
			            start: start,
			            end: this.index
			        };
			    };
			    // https://tc39.github.io/ecma262/#sec-literals-string-literals
			    Scanner.prototype.scanStringLiteral = function () {
			        var start = this.index;
			        var quote = this.source[start];
			        assert_1.assert((quote === '\'' || quote === '"'), 'String literal must starts with a quote');
			        ++this.index;
			        var octal = false;
			        var str = '';
			        while (!this.eof()) {
			            var ch = this.source[this.index++];
			            if (ch === quote) {
			                quote = '';
			                break;
			            }
			            else if (ch === '\\') {
			                ch = this.source[this.index++];
			                if (!ch || !character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
			                    switch (ch) {
			                        case 'u':
			                            if (this.source[this.index] === '{') {
			                                ++this.index;
			                                str += this.scanUnicodeCodePointEscape();
			                            }
			                            else {
			                                var unescaped_1 = this.scanHexEscape(ch);
			                                if (unescaped_1 === null) {
			                                    this.throwUnexpectedToken();
			                                }
			                                str += unescaped_1;
			                            }
			                            break;
			                        case 'x':
			                            var unescaped = this.scanHexEscape(ch);
			                            if (unescaped === null) {
			                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
			                            }
			                            str += unescaped;
			                            break;
			                        case 'n':
			                            str += '\n';
			                            break;
			                        case 'r':
			                            str += '\r';
			                            break;
			                        case 't':
			                            str += '\t';
			                            break;
			                        case 'b':
			                            str += '\b';
			                            break;
			                        case 'f':
			                            str += '\f';
			                            break;
			                        case 'v':
			                            str += '\x0B';
			                            break;
			                        case '8':
			                        case '9':
			                            str += ch;
			                            this.tolerateUnexpectedToken();
			                            break;
			                        default:
			                            if (ch && character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
			                                var octToDec = this.octalToDecimal(ch);
			                                octal = octToDec.octal || octal;
			                                str += String.fromCharCode(octToDec.code);
			                            }
			                            else {
			                                str += ch;
			                            }
			                            break;
			                    }
			                }
			                else {
			                    ++this.lineNumber;
			                    if (ch === '\r' && this.source[this.index] === '\n') {
			                        ++this.index;
			                    }
			                    this.lineStart = this.index;
			                }
			            }
			            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
			                break;
			            }
			            else {
			                str += ch;
			            }
			        }
			        if (quote !== '') {
			            this.index = start;
			            this.throwUnexpectedToken();
			        }
			        return {
			            type: 8 /* StringLiteral */,
			            value: str,
			            octal: octal,
			            lineNumber: this.lineNumber,
			            lineStart: this.lineStart,
			            start: start,
			            end: this.index
			        };
			    };
			    // https://tc39.github.io/ecma262/#sec-template-literal-lexical-components
			    Scanner.prototype.scanTemplate = function () {
			        var cooked = '';
			        var terminated = false;
			        var start = this.index;
			        var head = (this.source[start] === '`');
			        var tail = false;
			        var rawOffset = 2;
			        ++this.index;
			        while (!this.eof()) {
			            var ch = this.source[this.index++];
			            if (ch === '`') {
			                rawOffset = 1;
			                tail = true;
			                terminated = true;
			                break;
			            }
			            else if (ch === '$') {
			                if (this.source[this.index] === '{') {
			                    this.curlyStack.push('${');
			                    ++this.index;
			                    terminated = true;
			                    break;
			                }
			                cooked += ch;
			            }
			            else if (ch === '\\') {
			                ch = this.source[this.index++];
			                if (!character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
			                    switch (ch) {
			                        case 'n':
			                            cooked += '\n';
			                            break;
			                        case 'r':
			                            cooked += '\r';
			                            break;
			                        case 't':
			                            cooked += '\t';
			                            break;
			                        case 'u':
			                            if (this.source[this.index] === '{') {
			                                ++this.index;
			                                cooked += this.scanUnicodeCodePointEscape();
			                            }
			                            else {
			                                var restore = this.index;
			                                var unescaped_2 = this.scanHexEscape(ch);
			                                if (unescaped_2 !== null) {
			                                    cooked += unescaped_2;
			                                }
			                                else {
			                                    this.index = restore;
			                                    cooked += ch;
			                                }
			                            }
			                            break;
			                        case 'x':
			                            var unescaped = this.scanHexEscape(ch);
			                            if (unescaped === null) {
			                                this.throwUnexpectedToken(messages_1.Messages.InvalidHexEscapeSequence);
			                            }
			                            cooked += unescaped;
			                            break;
			                        case 'b':
			                            cooked += '\b';
			                            break;
			                        case 'f':
			                            cooked += '\f';
			                            break;
			                        case 'v':
			                            cooked += '\v';
			                            break;
			                        default:
			                            if (ch === '0') {
			                                if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index))) {
			                                    // Illegal: \01 \02 and so on
			                                    this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
			                                }
			                                cooked += '\0';
			                            }
			                            else if (character_1.Character.isOctalDigit(ch.charCodeAt(0))) {
			                                // Illegal: \1 \2
			                                this.throwUnexpectedToken(messages_1.Messages.TemplateOctalLiteral);
			                            }
			                            else {
			                                cooked += ch;
			                            }
			                            break;
			                    }
			                }
			                else {
			                    ++this.lineNumber;
			                    if (ch === '\r' && this.source[this.index] === '\n') {
			                        ++this.index;
			                    }
			                    this.lineStart = this.index;
			                }
			            }
			            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
			                ++this.lineNumber;
			                if (ch === '\r' && this.source[this.index] === '\n') {
			                    ++this.index;
			                }
			                this.lineStart = this.index;
			                cooked += '\n';
			            }
			            else {
			                cooked += ch;
			            }
			        }
			        if (!terminated) {
			            this.throwUnexpectedToken();
			        }
			        if (!head) {
			            this.curlyStack.pop();
			        }
			        return {
			            type: 10 /* Template */,
			            value: this.source.slice(start + 1, this.index - rawOffset),
			            cooked: cooked,
			            head: head,
			            tail: tail,
			            lineNumber: this.lineNumber,
			            lineStart: this.lineStart,
			            start: start,
			            end: this.index
			        };
			    };
			    // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
			    Scanner.prototype.testRegExp = function (pattern, flags) {
			        // The BMP character to use as a replacement for astral symbols when
			        // translating an ES6 "u"-flagged pattern to an ES5-compatible
			        // approximation.
			        // Note: replacing with '\uFFFF' enables false positives in unlikely
			        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
			        // pattern that would not be detected by this substitution.
			        var astralSubstitute = '\uFFFF';
			        var tmp = pattern;
			        var self = this;
			        if (flags.indexOf('u') >= 0) {
			            tmp = tmp
			                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
			                var codePoint = parseInt($1 || $2, 16);
			                if (codePoint > 0x10FFFF) {
			                    self.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
			                }
			                if (codePoint <= 0xFFFF) {
			                    return String.fromCharCode(codePoint);
			                }
			                return astralSubstitute;
			            })
			                .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, astralSubstitute);
			        }
			        // First, detect invalid regular expressions.
			        try {
			            RegExp(tmp);
			        }
			        catch (e) {
			            this.throwUnexpectedToken(messages_1.Messages.InvalidRegExp);
			        }
			        // Return a regular expression object for this pattern-flag pair, or
			        // `null` in case the current environment doesn't support the flags it
			        // uses.
			        try {
			            return new RegExp(pattern, flags);
			        }
			        catch (exception) {
			            /* istanbul ignore next */
			            return null;
			        }
			    };
			    Scanner.prototype.scanRegExpBody = function () {
			        var ch = this.source[this.index];
			        assert_1.assert(ch === '/', 'Regular expression literal must start with a slash');
			        var str = this.source[this.index++];
			        var classMarker = false;
			        var terminated = false;
			        while (!this.eof()) {
			            ch = this.source[this.index++];
			            str += ch;
			            if (ch === '\\') {
			                ch = this.source[this.index++];
			                // https://tc39.github.io/ecma262/#sec-literals-regular-expression-literals
			                if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
			                    this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
			                }
			                str += ch;
			            }
			            else if (character_1.Character.isLineTerminator(ch.charCodeAt(0))) {
			                this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
			            }
			            else if (classMarker) {
			                if (ch === ']') {
			                    classMarker = false;
			                }
			            }
			            else {
			                if (ch === '/') {
			                    terminated = true;
			                    break;
			                }
			                else if (ch === '[') {
			                    classMarker = true;
			                }
			            }
			        }
			        if (!terminated) {
			            this.throwUnexpectedToken(messages_1.Messages.UnterminatedRegExp);
			        }
			        // Exclude leading and trailing slash.
			        return str.substr(1, str.length - 2);
			    };
			    Scanner.prototype.scanRegExpFlags = function () {
			        var str = '';
			        var flags = '';
			        while (!this.eof()) {
			            var ch = this.source[this.index];
			            if (!character_1.Character.isIdentifierPart(ch.charCodeAt(0))) {
			                break;
			            }
			            ++this.index;
			            if (ch === '\\' && !this.eof()) {
			                ch = this.source[this.index];
			                if (ch === 'u') {
			                    ++this.index;
			                    var restore = this.index;
			                    var char = this.scanHexEscape('u');
			                    if (char !== null) {
			                        flags += char;
			                        for (str += '\\u'; restore < this.index; ++restore) {
			                            str += this.source[restore];
			                        }
			                    }
			                    else {
			                        this.index = restore;
			                        flags += 'u';
			                        str += '\\u';
			                    }
			                    this.tolerateUnexpectedToken();
			                }
			                else {
			                    str += '\\';
			                    this.tolerateUnexpectedToken();
			                }
			            }
			            else {
			                flags += ch;
			                str += ch;
			            }
			        }
			        return flags;
			    };
			    Scanner.prototype.scanRegExp = function () {
			        var start = this.index;
			        var pattern = this.scanRegExpBody();
			        var flags = this.scanRegExpFlags();
			        var value = this.testRegExp(pattern, flags);
			        return {
			            type: 9 /* RegularExpression */,
			            value: '',
			            pattern: pattern,
			            flags: flags,
			            regex: value,
			            lineNumber: this.lineNumber,
			            lineStart: this.lineStart,
			            start: start,
			            end: this.index
			        };
			    };
			    Scanner.prototype.lex = function () {
			        if (this.eof()) {
			            return {
			                type: 2 /* EOF */,
			                value: '',
			                lineNumber: this.lineNumber,
			                lineStart: this.lineStart,
			                start: this.index,
			                end: this.index
			            };
			        }
			        var cp = this.source.charCodeAt(this.index);
			        if (character_1.Character.isIdentifierStart(cp)) {
			            return this.scanIdentifier();
			        }
			        // Very common: ( and ) and ;
			        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
			            return this.scanPunctuator();
			        }
			        // String literal starts with single quote (U+0027) or double quote (U+0022).
			        if (cp === 0x27 || cp === 0x22) {
			            return this.scanStringLiteral();
			        }
			        // Dot (.) U+002E can also start a floating-point number, hence the need
			        // to check the next character.
			        if (cp === 0x2E) {
			            if (character_1.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1))) {
			                return this.scanNumericLiteral();
			            }
			            return this.scanPunctuator();
			        }
			        if (character_1.Character.isDecimalDigit(cp)) {
			            return this.scanNumericLiteral();
			        }
			        // Template literals start with ` (U+0060) for template head
			        // or } (U+007D) for template middle or template tail.
			        if (cp === 0x60 || (cp === 0x7D && this.curlyStack[this.curlyStack.length - 1] === '${')) {
			            return this.scanTemplate();
			        }
			        // Possible identifier start in a surrogate pair.
			        if (cp >= 0xD800 && cp < 0xDFFF) {
			            if (character_1.Character.isIdentifierStart(this.codePointAt(this.index))) {
			                return this.scanIdentifier();
			            }
			        }
			        return this.scanPunctuator();
			    };
			    return Scanner;
			}());
			exports.Scanner = Scanner;


		/***/ },
		/* 13 */
		/***/ function(module, exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.TokenName = {};
			exports.TokenName[1 /* BooleanLiteral */] = 'Boolean';
			exports.TokenName[2 /* EOF */] = '<end>';
			exports.TokenName[3 /* Identifier */] = 'Identifier';
			exports.TokenName[4 /* Keyword */] = 'Keyword';
			exports.TokenName[5 /* NullLiteral */] = 'Null';
			exports.TokenName[6 /* NumericLiteral */] = 'Numeric';
			exports.TokenName[7 /* Punctuator */] = 'Punctuator';
			exports.TokenName[8 /* StringLiteral */] = 'String';
			exports.TokenName[9 /* RegularExpression */] = 'RegularExpression';
			exports.TokenName[10 /* Template */] = 'Template';


		/***/ },
		/* 14 */
		/***/ function(module, exports) {
			// Generated by generate-xhtml-entities.js. DO NOT MODIFY!
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.XHTMLEntities = {
			    quot: '\u0022',
			    amp: '\u0026',
			    apos: '\u0027',
			    gt: '\u003E',
			    nbsp: '\u00A0',
			    iexcl: '\u00A1',
			    cent: '\u00A2',
			    pound: '\u00A3',
			    curren: '\u00A4',
			    yen: '\u00A5',
			    brvbar: '\u00A6',
			    sect: '\u00A7',
			    uml: '\u00A8',
			    copy: '\u00A9',
			    ordf: '\u00AA',
			    laquo: '\u00AB',
			    not: '\u00AC',
			    shy: '\u00AD',
			    reg: '\u00AE',
			    macr: '\u00AF',
			    deg: '\u00B0',
			    plusmn: '\u00B1',
			    sup2: '\u00B2',
			    sup3: '\u00B3',
			    acute: '\u00B4',
			    micro: '\u00B5',
			    para: '\u00B6',
			    middot: '\u00B7',
			    cedil: '\u00B8',
			    sup1: '\u00B9',
			    ordm: '\u00BA',
			    raquo: '\u00BB',
			    frac14: '\u00BC',
			    frac12: '\u00BD',
			    frac34: '\u00BE',
			    iquest: '\u00BF',
			    Agrave: '\u00C0',
			    Aacute: '\u00C1',
			    Acirc: '\u00C2',
			    Atilde: '\u00C3',
			    Auml: '\u00C4',
			    Aring: '\u00C5',
			    AElig: '\u00C6',
			    Ccedil: '\u00C7',
			    Egrave: '\u00C8',
			    Eacute: '\u00C9',
			    Ecirc: '\u00CA',
			    Euml: '\u00CB',
			    Igrave: '\u00CC',
			    Iacute: '\u00CD',
			    Icirc: '\u00CE',
			    Iuml: '\u00CF',
			    ETH: '\u00D0',
			    Ntilde: '\u00D1',
			    Ograve: '\u00D2',
			    Oacute: '\u00D3',
			    Ocirc: '\u00D4',
			    Otilde: '\u00D5',
			    Ouml: '\u00D6',
			    times: '\u00D7',
			    Oslash: '\u00D8',
			    Ugrave: '\u00D9',
			    Uacute: '\u00DA',
			    Ucirc: '\u00DB',
			    Uuml: '\u00DC',
			    Yacute: '\u00DD',
			    THORN: '\u00DE',
			    szlig: '\u00DF',
			    agrave: '\u00E0',
			    aacute: '\u00E1',
			    acirc: '\u00E2',
			    atilde: '\u00E3',
			    auml: '\u00E4',
			    aring: '\u00E5',
			    aelig: '\u00E6',
			    ccedil: '\u00E7',
			    egrave: '\u00E8',
			    eacute: '\u00E9',
			    ecirc: '\u00EA',
			    euml: '\u00EB',
			    igrave: '\u00EC',
			    iacute: '\u00ED',
			    icirc: '\u00EE',
			    iuml: '\u00EF',
			    eth: '\u00F0',
			    ntilde: '\u00F1',
			    ograve: '\u00F2',
			    oacute: '\u00F3',
			    ocirc: '\u00F4',
			    otilde: '\u00F5',
			    ouml: '\u00F6',
			    divide: '\u00F7',
			    oslash: '\u00F8',
			    ugrave: '\u00F9',
			    uacute: '\u00FA',
			    ucirc: '\u00FB',
			    uuml: '\u00FC',
			    yacute: '\u00FD',
			    thorn: '\u00FE',
			    yuml: '\u00FF',
			    OElig: '\u0152',
			    oelig: '\u0153',
			    Scaron: '\u0160',
			    scaron: '\u0161',
			    Yuml: '\u0178',
			    fnof: '\u0192',
			    circ: '\u02C6',
			    tilde: '\u02DC',
			    Alpha: '\u0391',
			    Beta: '\u0392',
			    Gamma: '\u0393',
			    Delta: '\u0394',
			    Epsilon: '\u0395',
			    Zeta: '\u0396',
			    Eta: '\u0397',
			    Theta: '\u0398',
			    Iota: '\u0399',
			    Kappa: '\u039A',
			    Lambda: '\u039B',
			    Mu: '\u039C',
			    Nu: '\u039D',
			    Xi: '\u039E',
			    Omicron: '\u039F',
			    Pi: '\u03A0',
			    Rho: '\u03A1',
			    Sigma: '\u03A3',
			    Tau: '\u03A4',
			    Upsilon: '\u03A5',
			    Phi: '\u03A6',
			    Chi: '\u03A7',
			    Psi: '\u03A8',
			    Omega: '\u03A9',
			    alpha: '\u03B1',
			    beta: '\u03B2',
			    gamma: '\u03B3',
			    delta: '\u03B4',
			    epsilon: '\u03B5',
			    zeta: '\u03B6',
			    eta: '\u03B7',
			    theta: '\u03B8',
			    iota: '\u03B9',
			    kappa: '\u03BA',
			    lambda: '\u03BB',
			    mu: '\u03BC',
			    nu: '\u03BD',
			    xi: '\u03BE',
			    omicron: '\u03BF',
			    pi: '\u03C0',
			    rho: '\u03C1',
			    sigmaf: '\u03C2',
			    sigma: '\u03C3',
			    tau: '\u03C4',
			    upsilon: '\u03C5',
			    phi: '\u03C6',
			    chi: '\u03C7',
			    psi: '\u03C8',
			    omega: '\u03C9',
			    thetasym: '\u03D1',
			    upsih: '\u03D2',
			    piv: '\u03D6',
			    ensp: '\u2002',
			    emsp: '\u2003',
			    thinsp: '\u2009',
			    zwnj: '\u200C',
			    zwj: '\u200D',
			    lrm: '\u200E',
			    rlm: '\u200F',
			    ndash: '\u2013',
			    mdash: '\u2014',
			    lsquo: '\u2018',
			    rsquo: '\u2019',
			    sbquo: '\u201A',
			    ldquo: '\u201C',
			    rdquo: '\u201D',
			    bdquo: '\u201E',
			    dagger: '\u2020',
			    Dagger: '\u2021',
			    bull: '\u2022',
			    hellip: '\u2026',
			    permil: '\u2030',
			    prime: '\u2032',
			    Prime: '\u2033',
			    lsaquo: '\u2039',
			    rsaquo: '\u203A',
			    oline: '\u203E',
			    frasl: '\u2044',
			    euro: '\u20AC',
			    image: '\u2111',
			    weierp: '\u2118',
			    real: '\u211C',
			    trade: '\u2122',
			    alefsym: '\u2135',
			    larr: '\u2190',
			    uarr: '\u2191',
			    rarr: '\u2192',
			    darr: '\u2193',
			    harr: '\u2194',
			    crarr: '\u21B5',
			    lArr: '\u21D0',
			    uArr: '\u21D1',
			    rArr: '\u21D2',
			    dArr: '\u21D3',
			    hArr: '\u21D4',
			    forall: '\u2200',
			    part: '\u2202',
			    exist: '\u2203',
			    empty: '\u2205',
			    nabla: '\u2207',
			    isin: '\u2208',
			    notin: '\u2209',
			    ni: '\u220B',
			    prod: '\u220F',
			    sum: '\u2211',
			    minus: '\u2212',
			    lowast: '\u2217',
			    radic: '\u221A',
			    prop: '\u221D',
			    infin: '\u221E',
			    ang: '\u2220',
			    and: '\u2227',
			    or: '\u2228',
			    cap: '\u2229',
			    cup: '\u222A',
			    int: '\u222B',
			    there4: '\u2234',
			    sim: '\u223C',
			    cong: '\u2245',
			    asymp: '\u2248',
			    ne: '\u2260',
			    equiv: '\u2261',
			    le: '\u2264',
			    ge: '\u2265',
			    sub: '\u2282',
			    sup: '\u2283',
			    nsub: '\u2284',
			    sube: '\u2286',
			    supe: '\u2287',
			    oplus: '\u2295',
			    otimes: '\u2297',
			    perp: '\u22A5',
			    sdot: '\u22C5',
			    lceil: '\u2308',
			    rceil: '\u2309',
			    lfloor: '\u230A',
			    rfloor: '\u230B',
			    loz: '\u25CA',
			    spades: '\u2660',
			    clubs: '\u2663',
			    hearts: '\u2665',
			    diams: '\u2666',
			    lang: '\u27E8',
			    rang: '\u27E9'
			};


		/***/ },
		/* 15 */
		/***/ function(module, exports, __webpack_require__) {
			Object.defineProperty(exports, "__esModule", { value: true });
			var error_handler_1 = __webpack_require__(10);
			var scanner_1 = __webpack_require__(12);
			var token_1 = __webpack_require__(13);
			var Reader = (function () {
			    function Reader() {
			        this.values = [];
			        this.curly = this.paren = -1;
			    }
			    // A function following one of those tokens is an expression.
			    Reader.prototype.beforeFunctionExpression = function (t) {
			        return ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
			            'return', 'case', 'delete', 'throw', 'void',
			            // assignment operators
			            '=', '+=', '-=', '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=',
			            '&=', '|=', '^=', ',',
			            // binary/unary operators
			            '+', '-', '*', '**', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
			            '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
			            '<=', '<', '>', '!=', '!=='].indexOf(t) >= 0;
			    };
			    // Determine if forward slash (/) is an operator or part of a regular expression
			    // https://github.com/mozilla/sweet.js/wiki/design
			    Reader.prototype.isRegexStart = function () {
			        var previous = this.values[this.values.length - 1];
			        var regex = (previous !== null);
			        switch (previous) {
			            case 'this':
			            case ']':
			                regex = false;
			                break;
			            case ')':
			                var keyword = this.values[this.paren - 1];
			                regex = (keyword === 'if' || keyword === 'while' || keyword === 'for' || keyword === 'with');
			                break;
			            case '}':
			                // Dividing a function by anything makes little sense,
			                // but we have to check for that.
			                regex = false;
			                if (this.values[this.curly - 3] === 'function') {
			                    // Anonymous function, e.g. function(){} /42
			                    var check = this.values[this.curly - 4];
			                    regex = check ? !this.beforeFunctionExpression(check) : false;
			                }
			                else if (this.values[this.curly - 4] === 'function') {
			                    // Named function, e.g. function f(){} /42/
			                    var check = this.values[this.curly - 5];
			                    regex = check ? !this.beforeFunctionExpression(check) : true;
			                }
			                break;
			        }
			        return regex;
			    };
			    Reader.prototype.push = function (token) {
			        if (token.type === 7 /* Punctuator */ || token.type === 4 /* Keyword */) {
			            if (token.value === '{') {
			                this.curly = this.values.length;
			            }
			            else if (token.value === '(') {
			                this.paren = this.values.length;
			            }
			            this.values.push(token.value);
			        }
			        else {
			            this.values.push(null);
			        }
			    };
			    return Reader;
			}());
			var Tokenizer = (function () {
			    function Tokenizer(code, config) {
			        this.errorHandler = new error_handler_1.ErrorHandler();
			        this.errorHandler.tolerant = config ? (typeof config.tolerant === 'boolean' && config.tolerant) : false;
			        this.scanner = new scanner_1.Scanner(code, this.errorHandler);
			        this.scanner.trackComment = config ? (typeof config.comment === 'boolean' && config.comment) : false;
			        this.trackRange = config ? (typeof config.range === 'boolean' && config.range) : false;
			        this.trackLoc = config ? (typeof config.loc === 'boolean' && config.loc) : false;
			        this.buffer = [];
			        this.reader = new Reader();
			    }
			    Tokenizer.prototype.errors = function () {
			        return this.errorHandler.errors;
			    };
			    Tokenizer.prototype.getNextToken = function () {
			        if (this.buffer.length === 0) {
			            var comments = this.scanner.scanComments();
			            if (this.scanner.trackComment) {
			                for (var i = 0; i < comments.length; ++i) {
			                    var e = comments[i];
			                    var value = this.scanner.source.slice(e.slice[0], e.slice[1]);
			                    var comment = {
			                        type: e.multiLine ? 'BlockComment' : 'LineComment',
			                        value: value
			                    };
			                    if (this.trackRange) {
			                        comment.range = e.range;
			                    }
			                    if (this.trackLoc) {
			                        comment.loc = e.loc;
			                    }
			                    this.buffer.push(comment);
			                }
			            }
			            if (!this.scanner.eof()) {
			                var loc = void 0;
			                if (this.trackLoc) {
			                    loc = {
			                        start: {
			                            line: this.scanner.lineNumber,
			                            column: this.scanner.index - this.scanner.lineStart
			                        },
			                        end: {}
			                    };
			                }
			                var startRegex = (this.scanner.source[this.scanner.index] === '/') && this.reader.isRegexStart();
			                var token = startRegex ? this.scanner.scanRegExp() : this.scanner.lex();
			                this.reader.push(token);
			                var entry = {
			                    type: token_1.TokenName[token.type],
			                    value: this.scanner.source.slice(token.start, token.end)
			                };
			                if (this.trackRange) {
			                    entry.range = [token.start, token.end];
			                }
			                if (this.trackLoc) {
			                    loc.end = {
			                        line: this.scanner.lineNumber,
			                        column: this.scanner.index - this.scanner.lineStart
			                    };
			                    entry.loc = loc;
			                }
			                if (token.type === 9 /* RegularExpression */) {
			                    var pattern = token.pattern;
			                    var flags = token.flags;
			                    entry.regex = { pattern: pattern, flags: flags };
			                }
			                this.buffer.push(entry);
			            }
			        }
			        return this.buffer.shift();
			    };
			    return Tokenizer;
			}());
			exports.Tokenizer = Tokenizer;


		/***/ }
		/******/ ])
		});
} (esprima));
	return esprima.exports;
}

(function (module) {
(function() {
	/* global define */

	var esprima;
	var exportFn;
	var toString = Object.prototype.toString;

	if (typeof require === 'function') {
	  // server side
	  esprima = requireEsprima();
	  exportFn = function(redeyed) { module.exports = redeyed; };
	  bootstrap(esprima, exportFn);
	} else if (typeof window === 'object') {
	  // no amd -> attach to window if it exists
	  // Note that this requires 'esprima' to be defined on the window, so that script has to be loaded first
	  window.redeyed = bootstrap(window.esprima);
	}

	function bootstrap(esprima, exportFn) {
	  function isFunction(obj) {
	    return toString.call(obj) === '[object Function]'
	  }

	  function isString(obj) {
	    return toString.call(obj) === '[object String]'
	  }

	  function isObject(obj) {
	    return toString.call(obj) === '[object Object]'
	  }

	  function surroundWith(before, after) {
	    return function(s) { return before + s + after }
	  }

	  function isNonCircular(key) {
	    return key !== '_parent'
	  }

	  function objectizeString(value) {
	    var vals = value.split(':');

	    if (vals.length === 0 || vals.length > 2)      {
	 throw new Error(
	        'illegal string config: ' + value +
	        '\nShould be of format "before:after"'
	      )
	}

	    if (vals.length === 1 || vals[1].length === 0) {
	      return vals.indexOf(':') < 0 ? { _before: vals[0] } : { _after: vals[0] }
	    } else {
	      return { _before: vals[0], _after: vals[1] }
	    }
	  }

	  function objectize(node) {
	    // Converts 'bef:aft' to { _before: bef, _after: aft }
	    // and resolves undefined before/after from parent or root

	    function resolve(value, key) {
	      // resolve before/after from root or parent if it isn't present on the current node
	      if (!value._parent) return undefined

	      // Immediate parent
	      if (value._parent._default && value._parent._default[key]) return value._parent._default[key]

	      // Root
	      var root = value._parent._parent;
	      if (!root) return undefined

	      return root._default ? root._default[key] : undefined
	    }

	    function process(key) {
	      var value = node[key];

	      if (!value) return
	      if (isFunction(value)) return

	      // normalize all strings to objects
	      if (isString(value)) {
	        node[key] = value = objectizeString(value);
	      }

	      value._parent = node;
	      if (isObject(value)) {
	        if (!value._before && !value._after) return objectize(value)

	        // resolve missing _before or _after from parent(s)
	        // in case we only have either one on this node
	        value._before =  value._before || resolve(value, '_before');
	        value._after  =  value._after  || resolve(value, '_after');

	        return
	      }

	      throw new Error('nodes need to be either {String}, {Object} or {Function}.' + value + ' is neither.')
	    }

	    // Process _default ones first so children can resolve missing before/after from them
	    if (node._default) process('_default');

	    Object.keys(node)
	      .filter(function(key) {
	        return isNonCircular(key)
	          && node.hasOwnProperty(key)
	          && key !== '_before'
	          && key !== '_after'
	          && key !== '_default'
	      })
	      .forEach(process);
	  }

	  function functionize(node) {
	    Object.keys(node)
	      .filter(function(key) {
	        return isNonCircular(key) && node.hasOwnProperty(key)
	      })
	      .forEach(function(key) {
	        var value = node[key];

	        if (isFunction(value)) return

	        if (isObject(value)) {
	          if (!value._before && !value._after) return functionize(value)

	          // at this point before/after were "inherited" from the parent or root
	          // (see objectize)
	          var before = value._before || '';
	          var after = value._after || '';

	          node[key] = surroundWith(before, after);
	          return node[key]
	        }
	      });
	  }

	  function normalize(root) {
	    objectize(root);
	    functionize(root);
	  }

	  function mergeTokensAndComments(tokens, comments) {
	    var all = {};

	    function addToAllByRangeStart(t) { all[ t.range[0] ] = t; }

	    tokens.forEach(addToAllByRangeStart);
	    comments.forEach(addToAllByRangeStart);

	    // keys are sorted automatically
	    return Object.keys(all)
	      .map(function(k) { return all[k] })
	  }

	  function redeyed(code, config, opts) {
	    opts = opts || {};
	    var parser = opts.parser || esprima;
	    var jsx = !!opts.jsx;
	    // tokenizer doesn't support JSX at this point (esprima@4.0.0)
	    // therefore we need to generate the AST via the parser not only to
	    // avoid the tokenizer from erroring but also to get JSXIdentifier tokens
	    var buildAst = jsx || !!opts.buildAst;

	    var hashbang =  '';
	    var ast;
	    var tokens;
	    var comments;
	    var lastSplitEnd = 0;
	    var splits = [];
	    var transformedCode;
	    var all;
	    var info;

	    // Replace hashbang line with empty whitespaces to preserve token locations
	    if (code[0] === '#' && code[1] === '!') {
	      hashbang = code.substr(0, code.indexOf('\n') + 1);
	      code = Array.apply(0, Array(hashbang.length)).join(' ') + '\n' + code.substr(hashbang.length);
	    }

	    if (buildAst) {
	      ast = parser.parse(code, { tokens: true, comment: true, range: true, loc: true, tolerant: true, jsx: true });
	      tokens = ast.tokens;
	      comments = ast.comments;
	    } else {
	      tokens = [];
	      comments = [];
	      parser.tokenize(code, { range: true, loc: true, comment: true }, function(token) {
	        if (token.type === 'LineComment') {
	          token.type = 'Line';
	          comments.push(token);
	        } else if (token.type === 'BlockComment') {
	          token.type = 'Block';
	          comments.push(token);
	        } else {
	          // Optimistically upgrade 'static' to a keyword
	          if (token.type === 'Identifier' && token.value === 'static') token.type = 'Keyword';
	          tokens.push(token);
	        }
	      });
	    }
	    normalize(config);

	    function tokenIndex(tokens, tkn, start) {
	      var current;
	      var rangeStart = tkn.range[0];

	      for (current = start; current < tokens.length; current++) {
	        if (tokens[current].range[0] === rangeStart) return current
	      }

	      throw new Error('Token %s not found at or after index: %d', tkn, start)
	    }

	    function process(surround) {
	      var result;
	      var currentIndex;
	      var nextIndex;
	      var skip = 0;
	      var splitEnd;

	      result = surround(code.slice(start, end), info);
	      if (isObject(result)) {
	        splits.push(result.replacement);

	        currentIndex =  info.tokenIndex;
	        nextIndex    =  tokenIndex(info.tokens, result.skipPastToken, currentIndex);
	        skip         =  nextIndex - currentIndex;
	        splitEnd     =  skip > 0 ? tokens[nextIndex - 1].range[1] : end;
	      } else {
	        splits.push(result);
	        splitEnd = end;
	      }

	      return { skip: skip, splitEnd: splitEnd }
	    }

	    function addSplit(start, end, surround, info) {
	      var result;
	      var skip = 0;

	      if (start >= end) return
	      if (surround) {
	        result       =  process(surround);
	        skip         =  result.skip;
	        lastSplitEnd =  result.splitEnd;
	      } else {
	        splits.push(code.slice(start, end));
	        lastSplitEnd = end;
	      }

	      return skip
	    }

	    all = mergeTokensAndComments(tokens, comments);
	    for (var tokenIdx = 0; tokenIdx < all.length; tokenIdx++) {
	      var token = all[tokenIdx];
	      var surroundForType = config[token.type];
	      var surround;
	      var start;
	      var end;

	      // At least the type (e.g., 'Keyword') needs to be specified for the token to be surrounded
	      if (surroundForType) {
	        // root defaults are only taken into account while resolving before/after otherwise
	        // a root default would apply to everything, even if no type default was specified
	        surround = surroundForType
	          && surroundForType.hasOwnProperty(token.value)
	          && surroundForType[token.value]
	          && isFunction(surroundForType[token.value])
	            ? surroundForType[token.value]
	            : surroundForType._default;

	        start = token.range[0];
	        end = token.range[1];

	        addSplit(lastSplitEnd, start);
	        info = { tokenIndex: tokenIdx, tokens: all, ast: ast, code: code };
	        tokenIdx += addSplit(start, end, surround);
	      }
	    }

	    if (lastSplitEnd < code.length) {
	      addSplit(lastSplitEnd, code.length);
	    }

	  if (!opts.nojoin) {
	    transformedCode = splits.join('');
	    if (hashbang.length > 0) {
	      transformedCode = hashbang + transformedCode.substr(hashbang.length);
	    }
	  }

	    return {
	        ast      :  ast
	      , tokens   :  tokens
	      , comments :  comments
	      , splits   :  splits
	      , code     :  transformedCode
	    }
	  }

	  return exportFn ? exportFn(redeyed) : redeyed
	}
	})();
} (redeyed$1));

var colorNums = {
      white         :  37
    , black         :  30
    , blue          :  34
    , cyan          :  36
    , green         :  32
    , magenta       :  35
    , red           :  31
    , yellow        :  33
    , brightBlack   :  90
    , brightRed     :  91
    , brightGreen   :  92
    , brightYellow  :  93
    , brightBlue    :  94
    , brightMagenta :  95
    , brightCyan    :  96
    , brightWhite   :  97
    }
  , backgroundColorNums = {
      bgBlack         :  40
    , bgRed           :  41
    , bgGreen         :  42
    , bgYellow        :  43
    , bgBlue          :  44
    , bgMagenta       :  45
    , bgCyan          :  46
    , bgWhite         :  47
    , bgBrightBlack   :  100
    , bgBrightRed     :  101
    , bgBrightGreen   :  102
    , bgBrightYellow  :  103
    , bgBrightBlue    :  104
    , bgBrightMagenta :  105
    , bgBrightCyan    :  106
    , bgBrightWhite   :  107
    } 
  , open   =  {}
  , close  =  {}
  , colors$2 =  {}
  ;

Object.keys(colorNums).forEach(function (k) {
  var o =  open[k]  =  '\u001b[' + colorNums[k] + 'm';
  var c =  close[k] =  '\u001b[39m';

  colors$2[k] = function (s) { 
    return o + s + c;
  };
});

Object.keys(backgroundColorNums).forEach(function (k) {
  var o =  open[k]  =  '\u001b[' + backgroundColorNums[k] + 'm';
  var c =  close[k] =  '\u001b[49m';

  colors$2[k] = function (s) { 
    return o + s + c;
  };
});

var ansicolors =  colors$2;
colors$2.open    =  open;
colors$2.close   =  close;

var colors$1 = ansicolors;

// Change the below definitions in order to tweak the color theme.
var _default = {

    'Boolean': {
      'true'   :  undefined
    , 'false'  :  undefined
    , _default :  colors$1.brightRed
    }

  , 'Identifier': {
      'undefined' :  colors$1.brightBlack
    , 'self'      :  colors$1.brightRed
    , 'console'   :  colors$1.blue
    , 'log'       :  colors$1.blue
    , 'warn'      :  colors$1.red
    , 'error'     :  colors$1.brightRed
    , _default    :  colors$1.white
    }

  , 'Null': {
      _default: colors$1.brightBlack
    }

  , 'Numeric': {
      _default: colors$1.blue
    }

  , 'String': {
      _default: function(s, info) {
        var nextToken = info.tokens[info.tokenIndex + 1];

        // show keys of object literals and json in different color
        return (nextToken && nextToken.type === 'Punctuator' && nextToken.value === ':')
          ? colors$1.green(s)
          : colors$1.brightGreen(s)
      }
    }

  , 'Keyword': {
      'break'       :  undefined

    , 'case'        :  undefined
    , 'catch'       :  colors$1.cyan
    , 'class'       :  undefined
    , 'const'       :  undefined
    , 'continue'    :  undefined

    , 'debugger'    :  undefined
    , 'default'     :  undefined
    , 'delete'      :  colors$1.red
    , 'do'          :  undefined

    , 'else'        :  undefined
    , 'enum'        :  undefined
    , 'export'      :  undefined
    , 'extends'     :  undefined

    , 'finally'     :  colors$1.cyan
    , 'for'         :  undefined
    , 'function'    :  undefined

    , 'if'          :  undefined
    , 'implements'  :  undefined
    , 'import'      :  undefined
    , 'in'          :  undefined
    , 'instanceof'  :  undefined
    , 'let'         :  undefined
    , 'new'         :  colors$1.red
    , 'package'     :  undefined
    , 'private'     :  undefined
    , 'protected'   :  undefined
    , 'public'      :  undefined
    , 'return'      :  colors$1.red
    , 'static'      :  undefined
    , 'super'       :  undefined
    , 'switch'      :  undefined

    , 'this'        :  colors$1.brightRed
    , 'throw'       :  undefined
    , 'try'         :  colors$1.cyan
    , 'typeof'      :  undefined

    , 'var'         :  colors$1.green
    , 'void'        :  undefined

    , 'while'       :  undefined
    , 'with'        :  undefined
    , 'yield'       :  undefined
    , _default      :  colors$1.brightBlue
  }
  , 'Punctuator': {
      ';': colors$1.brightBlack
    , '.': colors$1.green
    , ',': colors$1.green

    , '{': colors$1.yellow
    , '}': colors$1.yellow
    , '(': colors$1.brightBlack
    , ')': colors$1.brightBlack
    , '[': colors$1.yellow
    , ']': colors$1.yellow

    , '<': undefined
    , '>': undefined
    , '+': undefined
    , '-': undefined
    , '*': undefined
    , '%': undefined
    , '&': undefined
    , '|': undefined
    , '^': undefined
    , '!': undefined
    , '~': undefined
    , '?': undefined
    , ':': undefined
    , '=': undefined

    , '<=': undefined
    , '>=': undefined
    , '==': undefined
    , '!=': undefined
    , '++': undefined
    , '--': undefined
    , '<<': undefined
    , '>>': undefined
    , '&&': undefined
    , '||': undefined
    , '+=': undefined
    , '-=': undefined
    , '*=': undefined
    , '%=': undefined
    , '&=': undefined
    , '|=': undefined
    , '^=': undefined
    , '/=': undefined
    , '=>': undefined
    , '**': undefined

    , '===': undefined
    , '!==': undefined
    , '>>>': undefined
    , '<<=': undefined
    , '>>=': undefined
    , '...': undefined
    , '**=': undefined

    , '>>>=': undefined

    , _default: colors$1.brightYellow
  }

    // line comment
  , Line: {
      _default: colors$1.brightBlack
    }

    /* block comment */
  , Block: {
      _default: colors$1.brightBlack
    }

  // JSX
  , JSXAttribute: {
      _default: colors$1.magenta
    }
  , JSXClosingElement: {
      _default: colors$1.magenta
    }
  , JSXElement: {
      _default: colors$1.magenta
    }
  , JSXEmptyExpression: {
      _default: colors$1.magenta
    }
  , JSXExpressionContainer: {
      _default: colors$1.magenta
    }
  , JSXIdentifier: {
        className: colors$1.blue
      , _default: colors$1.magenta
    }
  , JSXMemberExpression: {
      _default: colors$1.magenta
    }
  , JSXNamespacedName: {
      _default: colors$1.magenta
    }
  , JSXOpeningElement: {
      _default: colors$1.magenta
    }
  , JSXSpreadAttribute: {
      _default: colors$1.magenta
    }
  , JSXText: {
      _default: colors$1.brightGreen
    }

  , _default: undefined
};

var redeyed =  redeyed$1.exports;
var theme   =  _default;
var colors  =  ansicolors;

var colorSurround =  colors.brightBlack;
var surroundClose =  '\u001b[39m';

function trimEmptyLines(lines) {
  // remove lines from the end until we find a non-empy one
  var line = lines.pop();
  while (!line || !line.length)    {
 line = lines.pop();
}

  // put the non-empty line back
  if (line) lines.push(line);
}

function addLinenos(highlightedCode, firstline) {
  var highlightedLines = highlightedCode.split('\n');

  trimEmptyLines(highlightedLines);

  var linesLen = highlightedLines.length;
  var lines = [];
  var totalDigits;
  var lineno;

  function getDigits(n) {
    if (n < 10) return 1
    if (n < 100) return 2
    if (n < 1000) return 3
    if (n < 10000) return 4
    // this works for up to 99,999 lines - any questions?
    return 5
  }

  function pad(n, totalDigits) {
    // not pretty, but simple and should perform quite well
    var padDigits = totalDigits - getDigits(n);
    switch (padDigits) {
      case 0: return '' + n
      case 1: return ' ' + n
      case 2: return '  ' + n
      case 3: return '   ' + n
      case 4: return '    ' + n
      case 5: return '     ' + n
    }
  }

  totalDigits = getDigits(linesLen + firstline - 1);

  for (var i = 0; i < linesLen; i++) {
    // Don't close the escape sequence here in order to not break multi line code highlights like block comments
    lineno = colorSurround(pad(i + firstline, totalDigits) + ': ').replace(surroundClose, '');
    lines.push(lineno + highlightedLines[i]);
  }

  return lines.join('\n')
}

var highlight$3 = function highlight(code, opts) {
  opts = opts || { };
  try {
    var result = redeyed(code, opts.theme || theme, { jsx: !!opts.jsx });
    var firstline = opts.firstline && !isNaN(opts.firstline) ? opts.firstline : 1;

    return opts.linenos ? addLinenos(result.code, firstline) : result.code
  } catch (e) {
    e.message = 'Unable to perform highlight. The code contained syntax errors: ' + e.message;
    throw e
  }
};

var fs$1 = require$$0__default$2["default"];
var highlight$2 = highlight$3;

function isFunction$3(obj) {
  return toString.call(obj) === '[object Function]'
}

var highlightFile = function highlightFile(fullPath, opts, cb) {
  if (isFunction$3(opts)) {
    cb = opts;
    opts = { };
  }
  opts = opts || { };

  fs$1.readFile(fullPath, 'utf-8', function(err, code) {
    if (err) return cb(err)
    try {
      cb(null, highlight$2(code, opts));
    } catch (e) {
      cb(e);
    }
  });
};

var fs = require$$0__default$2["default"];
var highlight$1 = highlight$3;

var highlightFileSync = function highlightFileSync(fullPath, opts) {
  var code = fs.readFileSync(fullPath, 'utf-8');
  opts = opts || { };
  return highlight$1(code, opts)
};

var cardinal$1 = {
    highlight: highlight$3
  , highlightFile: highlightFile
  , highlightFileSync: highlightFileSync
};

var nodeEmoji = {exports: {}};

/** Detect free variable `global` from Node.js. */

var freeGlobal$1 = typeof index$1.commonjsGlobal == 'object' && index$1.commonjsGlobal && index$1.commonjsGlobal.Object === Object && index$1.commonjsGlobal;

var _freeGlobal = freeGlobal$1;

var freeGlobal = _freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$7 = freeGlobal || freeSelf || Function('return this')();

var _root = root$7;

var root$6 = _root;

/** Built-in value references. */
var Symbol$4 = root$6.Symbol;

var _Symbol = Symbol$4;

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */

function copyArray$1(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

var _copyArray = copyArray$1;

var Symbol$3 = _Symbol;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$6.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag$1(value) {
  var isOwn = hasOwnProperty$4.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

var _getRawTag = getRawTag$1;

/** Used for built-in method references. */

var objectProto$5 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$5.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString$1(value) {
  return nativeObjectToString.call(value);
}

var _objectToString = objectToString$1;

var Symbol$2 = _Symbol,
    getRawTag = _getRawTag,
    objectToString = _objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag$5(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

var _baseGetTag = baseGetTag$5;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */

function isObject$2(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject$2;

var baseGetTag$4 = _baseGetTag,
    isObject$1 = isObject_1;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$1 = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction$2(value) {
  if (!isObject$1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag$4(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction$2;

var root$5 = _root;

/** Used to detect overreaching core-js shims. */
var coreJsData$1 = root$5['__core-js_shared__'];

var _coreJsData = coreJsData$1;

var coreJsData = _coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked$1(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked$1;

/** Used for built-in method references. */

var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource$2(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource$2;

var isFunction$1 = isFunction_1,
    isMasked = _isMasked,
    isObject = isObject_1,
    toSource$1 = _toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$4 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$3).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative$1(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource$1(value));
}

var _baseIsNative = baseIsNative$1;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */

function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue$1;

var baseIsNative = _baseIsNative,
    getValue = _getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative$5(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

var _getNative = getNative$5;

var getNative$4 = _getNative,
    root$4 = _root;

/* Built-in method references that are verified to be native. */
var DataView$1 = getNative$4(root$4, 'DataView');

var _DataView = DataView$1;

var getNative$3 = _getNative,
    root$3 = _root;

/* Built-in method references that are verified to be native. */
var Map$2 = getNative$3(root$3, 'Map');

var _Map = Map$2;

var getNative$2 = _getNative,
    root$2 = _root;

/* Built-in method references that are verified to be native. */
var Promise$2 = getNative$2(root$2, 'Promise');

var _Promise = Promise$2;

var getNative$1 = _getNative,
    root$1 = _root;

/* Built-in method references that are verified to be native. */
var Set$1 = getNative$1(root$1, 'Set');

var _Set = Set$1;

var getNative = _getNative,
    root = _root;

/* Built-in method references that are verified to be native. */
var WeakMap$1 = getNative(root, 'WeakMap');

var _WeakMap = WeakMap$1;

var DataView = _DataView,
    Map$1 = _Map,
    Promise$1 = _Promise,
    Set = _Set,
    WeakMap = _WeakMap,
    baseGetTag$3 = _baseGetTag,
    toSource = _toSource;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$2 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$1 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map$1),
    promiseCtorString = toSource(Promise$1),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag$1 = baseGetTag$3;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag$1(new DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
    (Map$1 && getTag$1(new Map$1) != mapTag$2) ||
    (Promise$1 && getTag$1(Promise$1.resolve()) != promiseTag) ||
    (Set && getTag$1(new Set) != setTag$2) ||
    (WeakMap && getTag$1(new WeakMap) != weakMapTag$1)) {
  getTag$1 = function(value) {
    var result = baseGetTag$3(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$1;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag$1;

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength$2(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength$2;

var isFunction = isFunction_1,
    isLength$1 = isLength_1;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike$2(value) {
  return value != null && isLength$1(value.length) && !isFunction(value);
}

var isArrayLike_1 = isArrayLike$2;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */

var isArray$2 = Array.isArray;

var isArray_1 = isArray$2;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */

function isObjectLike$4(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike$4;

var baseGetTag$2 = _baseGetTag,
    isArray$1 = isArray_1,
    isObjectLike$3 = isObjectLike_1;

/** `Object#toString` result references. */
var stringTag$1 = '[object String]';

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString$1(value) {
  return typeof value == 'string' ||
    (!isArray$1(value) && isObjectLike$3(value) && baseGetTag$2(value) == stringTag$1);
}

var isString_1 = isString$1;

/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */

function iteratorToArray$1(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

var _iteratorToArray = iteratorToArray$1;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */

function mapToArray$1(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray$1;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */

function setToArray$1(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray$1;

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */

function asciiToArray$1(string) {
  return string.split('');
}

var _asciiToArray = asciiToArray$1;

/** Used to compose unicode character classes. */

var rsAstralRange$1 = '\\ud800-\\udfff',
    rsComboMarksRange$1 = '\\u0300-\\u036f',
    reComboHalfMarksRange$1 = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange$1 = '\\u20d0-\\u20ff',
    rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1,
    rsVarRange$1 = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsZWJ$1 = '\\u200d';

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ$1 + rsAstralRange$1  + rsComboRange$1 + rsVarRange$1 + ']');

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode$1(string) {
  return reHasUnicode.test(string);
}

var _hasUnicode = hasUnicode$1;

/** Used to compose unicode character classes. */

var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f',
    reComboHalfMarksRange = '\\ufe20-\\ufe2f',
    rsComboSymbolsRange = '\\u20d0-\\u20ff',
    rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
    rsVarRange = '\\ufe0e\\ufe0f';

/** Used to compose unicode capture groups. */
var rsAstral = '[' + rsAstralRange + ']',
    rsCombo = '[' + rsComboRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray$1(string) {
  return string.match(reUnicode) || [];
}

var _unicodeToArray = unicodeToArray$1;

var asciiToArray = _asciiToArray,
    hasUnicode = _hasUnicode,
    unicodeToArray = _unicodeToArray;

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray$1(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

var _stringToArray = stringToArray$1;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */

function arrayMap$1(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap$1;

var arrayMap = _arrayMap;

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues$1(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

var _baseValues = baseValues$1;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */

function baseTimes$1(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes$1;

var baseGetTag$1 = _baseGetTag,
    isObjectLike$2 = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments$1(value) {
  return isObjectLike$2(value) && baseGetTag$1(value) == argsTag$1;
}

var _baseIsArguments = baseIsArguments$1;

var baseIsArguments = _baseIsArguments,
    isObjectLike$1 = isObjectLike_1;

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments$1 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike$1(value) && hasOwnProperty$2.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

var isArguments_1 = isArguments$1;

var isBuffer$1 = {exports: {}};

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */

function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

(function (module, exports) {
	var root = _root,
	    stubFalse = stubFalse_1;

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;
} (isBuffer$1, isBuffer$1.exports));

/** Used as references for various `Number` constants. */

var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex$1(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex$1;

var baseGetTag = _baseGetTag,
    isLength = isLength_1,
    isObjectLike = isObjectLike_1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray$1(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray$1;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */

function baseUnary$1(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary$1;

var _nodeUtil = {exports: {}};

(function (module, exports) {
	var freeGlobal = _freeGlobal;

	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    // Use `util.types` for Node.js 10+.
	    var types = freeModule && freeModule.require && freeModule.require('util').types;

	    if (types) {
	      return types;
	    }

	    // Legacy `process.binding('util')` for Node.js < 10.
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;
} (_nodeUtil, _nodeUtil.exports));

var baseIsTypedArray = _baseIsTypedArray,
    baseUnary = _baseUnary,
    nodeUtil = _nodeUtil.exports;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray_1 = isTypedArray$1;

var baseTimes = _baseTimes,
    isArguments = isArguments_1,
    isArray = isArray_1,
    isBuffer = isBuffer$1.exports,
    isIndex = _isIndex,
    isTypedArray = isTypedArray_1;

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys$1(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$1.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys$1;

/** Used for built-in method references. */

var objectProto$1 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype$1(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$1;

  return value === proto;
}

var _isPrototype = isPrototype$1;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */

function overArg$1(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg$1;

var overArg = _overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys$1 = overArg(Object.keys, Object);

var _nativeKeys = nativeKeys$1;

var isPrototype = _isPrototype,
    nativeKeys = _nativeKeys;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys$1(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys$1;

var arrayLikeKeys = _arrayLikeKeys,
    baseKeys = _baseKeys,
    isArrayLike$1 = isArrayLike_1;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys$1(object) {
  return isArrayLike$1(object) ? arrayLikeKeys(object) : baseKeys(object);
}

var keys_1 = keys$1;

var baseValues = _baseValues,
    keys = keys_1;

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values$1(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

var values_1 = values$1;

var Symbol$1 = _Symbol,
    copyArray = _copyArray,
    getTag = _getTag,
    isArrayLike = isArrayLike_1,
    isString = isString_1,
    iteratorToArray = _iteratorToArray,
    mapToArray = _mapToArray,
    setToArray = _setToArray,
    stringToArray = _stringToArray,
    values = values_1;

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    setTag = '[object Set]';

/** Built-in value references. */
var symIterator = Symbol$1 ? Symbol$1.iterator : undefined;

/**
 * Converts `value` to an array.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * _.toArray({ 'a': 1, 'b': 2 });
 * // => [1, 2]
 *
 * _.toArray('abc');
 * // => ['a', 'b', 'c']
 *
 * _.toArray(1);
 * // => []
 *
 * _.toArray(null);
 * // => []
 */
function toArray$1(value) {
  if (!value) {
    return [];
  }
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value);
  }
  if (symIterator && value[symIterator]) {
    return iteratorToArray(value[symIterator]());
  }
  var tag = getTag(value),
      func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

  return func(value);
}

var toArray_1 = toArray$1;

var umbrella_with_rain_drops = "☔";
var coffee = "☕";
var aries = "♈";
var taurus = "♉";
var sagittarius = "♐";
var capricorn = "♑";
var aquarius = "♒";
var pisces = "♓";
var anchor = "⚓";
var white_check_mark = "✅";
var sparkles = "✨";
var question = "❓";
var grey_question = "❔";
var grey_exclamation = "❕";
var exclamation = "❗";
var heavy_exclamation_mark = "❗";
var heavy_plus_sign = "➕";
var heavy_minus_sign = "➖";
var heavy_division_sign = "➗";
var hash = "#️⃣";
var keycap_star = "*️⃣";
var zero = "0️⃣";
var one = "1️⃣";
var two = "2️⃣";
var three = "3️⃣";
var four = "4️⃣";
var five = "5️⃣";
var six = "6️⃣";
var seven = "7️⃣";
var eight = "8️⃣";
var nine = "9️⃣";
var copyright = "©️";
var registered = "®️";
var mahjong = "🀄";
var black_joker = "🃏";
var a = "🅰️";
var b = "🅱️";
var o2 = "🅾️";
var parking = "🅿️";
var ab = "🆎";
var cl = "🆑";
var cool = "🆒";
var free = "🆓";
var id = "🆔";
var ng = "🆖";
var ok = "🆗";
var sos = "🆘";
var up = "🆙";
var vs = "🆚";
var cn = "🇨🇳";
var de = "🇩🇪";
var es = "🇪🇸";
var fr = "🇫🇷";
var gb = "🇬🇧";
var uk = "🇬🇧";
var it = "🇮🇹";
var jp = "🇯🇵";
var kr = "🇰🇷";
var ru = "🇷🇺";
var us = "🇺🇸";
var koko = "🈁";
var sa = "🈂️";
var u7121 = "🈚";
var u6307 = "🈯";
var u7981 = "🈲";
var u7a7a = "🈳";
var u5408 = "🈴";
var u6e80 = "🈵";
var u6709 = "🈶";
var u6708 = "🈷️";
var u7533 = "🈸";
var u5272 = "🈹";
var u55b6 = "🈺";
var ideograph_advantage = "🉐";
var accept = "🉑";
var cyclone = "🌀";
var foggy = "🌁";
var closed_umbrella = "🌂";
var night_with_stars = "🌃";
var sunrise_over_mountains = "🌄";
var sunrise = "🌅";
var city_sunset = "🌆";
var city_sunrise = "🌇";
var rainbow = "🌈";
var bridge_at_night = "🌉";
var ocean = "🌊";
var volcano = "🌋";
var milky_way = "🌌";
var earth_africa = "🌍";
var earth_americas = "🌎";
var earth_asia = "🌏";
var globe_with_meridians = "🌐";
var new_moon = "🌑";
var waxing_crescent_moon = "🌒";
var first_quarter_moon = "🌓";
var moon = "🌔";
var waxing_gibbous_moon = "🌔";
var full_moon = "🌕";
var waning_gibbous_moon = "🌖";
var last_quarter_moon = "🌗";
var waning_crescent_moon = "🌘";
var crescent_moon = "🌙";
var new_moon_with_face = "🌚";
var first_quarter_moon_with_face = "🌛";
var last_quarter_moon_with_face = "🌜";
var full_moon_with_face = "🌝";
var sun_with_face = "🌞";
var star2 = "🌟";
var stars = "🌠";
var thermometer = "🌡️";
var mostly_sunny = "🌤️";
var sun_small_cloud = "🌤️";
var barely_sunny = "🌥️";
var sun_behind_cloud = "🌥️";
var partly_sunny_rain = "🌦️";
var sun_behind_rain_cloud = "🌦️";
var rain_cloud = "🌧️";
var snow_cloud = "🌨️";
var lightning = "🌩️";
var lightning_cloud = "🌩️";
var tornado = "🌪️";
var tornado_cloud = "🌪️";
var fog = "🌫️";
var wind_blowing_face = "🌬️";
var hotdog = "🌭";
var taco = "🌮";
var burrito = "🌯";
var chestnut = "🌰";
var seedling = "🌱";
var evergreen_tree = "🌲";
var deciduous_tree = "🌳";
var palm_tree = "🌴";
var cactus = "🌵";
var hot_pepper = "🌶️";
var tulip = "🌷";
var cherry_blossom = "🌸";
var rose = "🌹";
var hibiscus = "🌺";
var sunflower = "🌻";
var blossom = "🌼";
var corn = "🌽";
var ear_of_rice = "🌾";
var herb = "🌿";
var four_leaf_clover = "🍀";
var maple_leaf = "🍁";
var fallen_leaf = "🍂";
var leaves = "🍃";
var mushroom = "🍄";
var tomato = "🍅";
var eggplant = "🍆";
var grapes = "🍇";
var melon = "🍈";
var watermelon = "🍉";
var tangerine = "🍊";
var lemon = "🍋";
var banana = "🍌";
var pineapple = "🍍";
var apple = "🍎";
var green_apple = "🍏";
var pear = "🍐";
var peach = "🍑";
var cherries = "🍒";
var strawberry = "🍓";
var hamburger = "🍔";
var pizza = "🍕";
var meat_on_bone = "🍖";
var poultry_leg = "🍗";
var rice_cracker = "🍘";
var rice_ball = "🍙";
var rice = "🍚";
var curry = "🍛";
var ramen = "🍜";
var spaghetti = "🍝";
var bread = "🍞";
var fries = "🍟";
var sweet_potato = "🍠";
var dango = "🍡";
var oden = "🍢";
var sushi = "🍣";
var fried_shrimp = "🍤";
var fish_cake = "🍥";
var icecream = "🍦";
var shaved_ice = "🍧";
var ice_cream = "🍨";
var doughnut = "🍩";
var cookie = "🍪";
var chocolate_bar = "🍫";
var candy = "🍬";
var lollipop = "🍭";
var custard = "🍮";
var honey_pot = "🍯";
var cake = "🍰";
var bento = "🍱";
var stew = "🍲";
var fried_egg = "🍳";
var cooking = "🍳";
var fork_and_knife = "🍴";
var tea = "🍵";
var sake = "🍶";
var wine_glass = "🍷";
var cocktail = "🍸";
var tropical_drink = "🍹";
var beer = "🍺";
var beers = "🍻";
var baby_bottle = "🍼";
var knife_fork_plate = "🍽️";
var champagne = "🍾";
var popcorn = "🍿";
var ribbon = "🎀";
var gift = "🎁";
var birthday = "🎂";
var jack_o_lantern = "🎃";
var christmas_tree = "🎄";
var santa = "🎅";
var fireworks = "🎆";
var sparkler = "🎇";
var balloon = "🎈";
var tada = "🎉";
var confetti_ball = "🎊";
var tanabata_tree = "🎋";
var crossed_flags = "🎌";
var bamboo = "🎍";
var dolls = "🎎";
var flags = "🎏";
var wind_chime = "🎐";
var rice_scene = "🎑";
var school_satchel = "🎒";
var mortar_board = "🎓";
var medal = "🎖️";
var reminder_ribbon = "🎗️";
var studio_microphone = "🎙️";
var level_slider = "🎚️";
var control_knobs = "🎛️";
var film_frames = "🎞️";
var admission_tickets = "🎟️";
var carousel_horse = "🎠";
var ferris_wheel = "🎡";
var roller_coaster = "🎢";
var fishing_pole_and_fish = "🎣";
var microphone = "🎤";
var movie_camera = "🎥";
var cinema = "🎦";
var headphones = "🎧";
var art = "🎨";
var tophat = "🎩";
var circus_tent = "🎪";
var ticket = "🎫";
var clapper = "🎬";
var performing_arts = "🎭";
var video_game = "🎮";
var dart = "🎯";
var slot_machine = "🎰";
var game_die = "🎲";
var bowling = "🎳";
var flower_playing_cards = "🎴";
var musical_note = "🎵";
var notes = "🎶";
var saxophone = "🎷";
var guitar = "🎸";
var musical_keyboard = "🎹";
var trumpet = "🎺";
var violin = "🎻";
var musical_score = "🎼";
var running_shirt_with_sash = "🎽";
var tennis = "🎾";
var ski = "🎿";
var basketball = "🏀";
var checkered_flag = "🏁";
var snowboarder = "🏂";
var runner = "🏃‍♂️";
var running = "🏃‍♂️";
var surfer = "🏄‍♂️";
var sports_medal = "🏅";
var trophy = "🏆";
var horse_racing = "🏇";
var football = "🏈";
var rugby_football = "🏉";
var swimmer = "🏊‍♂️";
var weight_lifter = "🏋️‍♂️";
var golfer = "🏌️‍♂️";
var racing_motorcycle = "🏍️";
var racing_car = "🏎️";
var cricket_bat_and_ball = "🏏";
var volleyball = "🏐";
var field_hockey_stick_and_ball = "🏑";
var ice_hockey_stick_and_puck = "🏒";
var table_tennis_paddle_and_ball = "🏓";
var snow_capped_mountain = "🏔️";
var camping = "🏕️";
var beach_with_umbrella = "🏖️";
var building_construction = "🏗️";
var house_buildings = "🏘️";
var cityscape = "🏙️";
var derelict_house_building = "🏚️";
var classical_building = "🏛️";
var desert = "🏜️";
var desert_island = "🏝️";
var national_park = "🏞️";
var stadium = "🏟️";
var house = "🏠";
var house_with_garden = "🏡";
var office = "🏢";
var post_office = "🏣";
var european_post_office = "🏤";
var hospital = "🏥";
var bank = "🏦";
var atm = "🏧";
var hotel = "🏨";
var love_hotel = "🏩";
var convenience_store = "🏪";
var school = "🏫";
var department_store = "🏬";
var factory = "🏭";
var izakaya_lantern = "🏮";
var lantern = "🏮";
var japanese_castle = "🏯";
var european_castle = "🏰";
var transgender_flag = "🏳️‍⚧️";
var waving_white_flag = "🏳️";
var pirate_flag = "🏴‍☠️";
var waving_black_flag = "🏴";
var rosette = "🏵️";
var label = "🏷️";
var badminton_racquet_and_shuttlecock = "🏸";
var bow_and_arrow = "🏹";
var amphora = "🏺";
var rat = "🐀";
var mouse2 = "🐁";
var ox = "🐂";
var water_buffalo = "🐃";
var cow2 = "🐄";
var tiger2 = "🐅";
var leopard = "🐆";
var rabbit2 = "🐇";
var black_cat = "🐈‍⬛";
var cat2 = "🐈";
var dragon = "🐉";
var crocodile = "🐊";
var whale2 = "🐋";
var snail = "🐌";
var snake = "🐍";
var racehorse = "🐎";
var ram = "🐏";
var goat = "🐐";
var sheep = "🐑";
var monkey = "🐒";
var rooster = "🐓";
var chicken = "🐔";
var service_dog = "🐕‍🦺";
var dog2 = "🐕";
var pig2 = "🐖";
var boar = "🐗";
var elephant = "🐘";
var octopus = "🐙";
var shell = "🐚";
var bug = "🐛";
var ant = "🐜";
var bee = "🐝";
var honeybee = "🐝";
var ladybug = "🐞";
var lady_beetle = "🐞";
var fish = "🐟";
var tropical_fish = "🐠";
var blowfish = "🐡";
var turtle = "🐢";
var hatching_chick = "🐣";
var baby_chick = "🐤";
var hatched_chick = "🐥";
var bird = "🐦";
var penguin = "🐧";
var koala = "🐨";
var poodle = "🐩";
var dromedary_camel = "🐪";
var camel = "🐫";
var dolphin = "🐬";
var flipper = "🐬";
var mouse = "🐭";
var cow = "🐮";
var tiger = "🐯";
var rabbit = "🐰";
var cat = "🐱";
var dragon_face = "🐲";
var whale = "🐳";
var horse = "🐴";
var monkey_face = "🐵";
var dog = "🐶";
var pig = "🐷";
var frog = "🐸";
var hamster = "🐹";
var wolf = "🐺";
var polar_bear = "🐻‍❄️";
var bear = "🐻";
var panda_face = "🐼";
var pig_nose = "🐽";
var feet = "🐾";
var paw_prints = "🐾";
var chipmunk = "🐿️";
var eyes = "👀";
var eye = "👁️";
var ear = "👂";
var nose = "👃";
var lips = "👄";
var tongue = "👅";
var point_up_2 = "👆";
var point_down = "👇";
var point_left = "👈";
var point_right = "👉";
var facepunch = "👊";
var punch = "👊";
var wave = "👋";
var ok_hand = "👌";
var thumbsup = "👍";
var thumbsdown = "👎";
var clap = "👏";
var open_hands = "👐";
var crown = "👑";
var womans_hat = "👒";
var eyeglasses = "👓";
var necktie = "👔";
var shirt = "👕";
var tshirt = "👕";
var jeans = "👖";
var dress = "👗";
var kimono = "👘";
var bikini = "👙";
var womans_clothes = "👚";
var purse = "👛";
var handbag = "👜";
var pouch = "👝";
var mans_shoe = "👞";
var shoe = "👞";
var athletic_shoe = "👟";
var high_heel = "👠";
var sandal = "👡";
var boot = "👢";
var footprints = "👣";
var bust_in_silhouette = "👤";
var busts_in_silhouette = "👥";
var boy = "👦";
var girl = "👧";
var man_feeding_baby = "👨‍🍼";
var family = "👨‍👩‍👦";
var man_with_probing_cane = "👨‍🦯";
var red_haired_man = "👨‍🦰";
var curly_haired_man = "👨‍🦱";
var bald_man = "👨‍🦲";
var white_haired_man = "👨‍🦳";
var man_in_motorized_wheelchair = "👨‍🦼";
var man_in_manual_wheelchair = "👨‍🦽";
var man = "👨";
var woman_feeding_baby = "👩‍🍼";
var woman_with_probing_cane = "👩‍🦯";
var red_haired_woman = "👩‍🦰";
var curly_haired_woman = "👩‍🦱";
var bald_woman = "👩‍🦲";
var white_haired_woman = "👩‍🦳";
var woman_in_motorized_wheelchair = "👩‍🦼";
var woman_in_manual_wheelchair = "👩‍🦽";
var woman = "👩";
var man_and_woman_holding_hands = "👫";
var woman_and_man_holding_hands = "👫";
var couple = "👫";
var two_men_holding_hands = "👬";
var men_holding_hands = "👬";
var two_women_holding_hands = "👭";
var women_holding_hands = "👭";
var cop = "👮‍♂️";
var dancers = "👯‍♀️";
var woman_with_veil = "👰‍♀️";
var man_with_veil = "👰‍♂️";
var bride_with_veil = "👰";
var person_with_blond_hair = "👱‍♂️";
var man_with_gua_pi_mao = "👲";
var man_with_turban = "👳‍♂️";
var older_man = "👴";
var older_woman = "👵";
var baby = "👶";
var construction_worker = "👷‍♂️";
var princess = "👸";
var japanese_ogre = "👹";
var japanese_goblin = "👺";
var ghost = "👻";
var angel = "👼";
var alien = "👽";
var space_invader = "👾";
var imp = "👿";
var skull = "💀";
var information_desk_person = "💁‍♀️";
var guardsman = "💂‍♂️";
var dancer = "💃";
var lipstick = "💄";
var nail_care = "💅";
var massage = "💆‍♀️";
var haircut = "💇‍♀️";
var barber = "💈";
var syringe = "💉";
var pill = "💊";
var kiss = "💋";
var love_letter = "💌";
var ring = "💍";
var gem = "💎";
var couplekiss = "💏";
var bouquet = "💐";
var couple_with_heart = "💑";
var wedding = "💒";
var heartbeat = "💓";
var broken_heart = "💔";
var two_hearts = "💕";
var sparkling_heart = "💖";
var heartpulse = "💗";
var cupid = "💘";
var blue_heart = "💙";
var green_heart = "💚";
var yellow_heart = "💛";
var purple_heart = "💜";
var gift_heart = "💝";
var revolving_hearts = "💞";
var heart_decoration = "💟";
var diamond_shape_with_a_dot_inside = "💠";
var bulb = "💡";
var anger = "💢";
var bomb = "💣";
var zzz = "💤";
var boom = "💥";
var collision = "💥";
var sweat_drops = "💦";
var droplet = "💧";
var dash = "💨";
var hankey = "💩";
var poop = "💩";
var shit = "💩";
var muscle = "💪";
var dizzy = "💫";
var speech_balloon = "💬";
var thought_balloon = "💭";
var white_flower = "💮";
var moneybag = "💰";
var currency_exchange = "💱";
var heavy_dollar_sign = "💲";
var credit_card = "💳";
var yen = "💴";
var dollar = "💵";
var euro = "💶";
var pound = "💷";
var money_with_wings = "💸";
var chart = "💹";
var seat = "💺";
var computer = "💻";
var briefcase = "💼";
var minidisc = "💽";
var floppy_disk = "💾";
var cd = "💿";
var dvd = "📀";
var file_folder = "📁";
var open_file_folder = "📂";
var page_with_curl = "📃";
var page_facing_up = "📄";
var date = "📅";
var calendar = "📆";
var card_index = "📇";
var chart_with_upwards_trend = "📈";
var chart_with_downwards_trend = "📉";
var bar_chart = "📊";
var clipboard = "📋";
var pushpin = "📌";
var round_pushpin = "📍";
var paperclip = "📎";
var straight_ruler = "📏";
var triangular_ruler = "📐";
var bookmark_tabs = "📑";
var ledger = "📒";
var notebook = "📓";
var notebook_with_decorative_cover = "📔";
var closed_book = "📕";
var book = "📖";
var open_book = "📖";
var green_book = "📗";
var blue_book = "📘";
var orange_book = "📙";
var books = "📚";
var name_badge = "📛";
var scroll = "📜";
var memo = "📝";
var pencil = "📝";
var telephone_receiver = "📞";
var pager = "📟";
var fax = "📠";
var satellite_antenna = "📡";
var loudspeaker = "📢";
var mega = "📣";
var outbox_tray = "📤";
var inbox_tray = "📥";
var incoming_envelope = "📨";
var envelope_with_arrow = "📩";
var mailbox_closed = "📪";
var mailbox = "📫";
var mailbox_with_mail = "📬";
var mailbox_with_no_mail = "📭";
var postbox = "📮";
var postal_horn = "📯";
var newspaper = "📰";
var iphone = "📱";
var calling = "📲";
var vibration_mode = "📳";
var mobile_phone_off = "📴";
var no_mobile_phones = "📵";
var signal_strength = "📶";
var camera = "📷";
var camera_with_flash = "📸";
var video_camera = "📹";
var tv = "📺";
var radio = "📻";
var vhs = "📼";
var film_projector = "📽️";
var prayer_beads = "📿";
var twisted_rightwards_arrows = "🔀";
var repeat = "🔁";
var repeat_one = "🔂";
var arrows_clockwise = "🔃";
var arrows_counterclockwise = "🔄";
var low_brightness = "🔅";
var high_brightness = "🔆";
var mute = "🔇";
var speaker = "🔈";
var sound = "🔉";
var loud_sound = "🔊";
var battery = "🔋";
var electric_plug = "🔌";
var mag = "🔍";
var mag_right = "🔎";
var lock_with_ink_pen = "🔏";
var closed_lock_with_key = "🔐";
var key = "🔑";
var lock = "🔒";
var unlock = "🔓";
var bell = "🔔";
var no_bell = "🔕";
var bookmark = "🔖";
var link = "🔗";
var radio_button = "🔘";
var back = "🔙";
var end = "🔚";
var on = "🔛";
var soon = "🔜";
var top = "🔝";
var underage = "🔞";
var keycap_ten = "🔟";
var capital_abcd = "🔠";
var abcd = "🔡";
var symbols = "🔣";
var abc = "🔤";
var fire = "🔥";
var flashlight = "🔦";
var wrench = "🔧";
var hammer = "🔨";
var nut_and_bolt = "🔩";
var hocho = "🔪";
var knife = "🔪";
var gun = "🔫";
var microscope = "🔬";
var telescope = "🔭";
var crystal_ball = "🔮";
var six_pointed_star = "🔯";
var beginner = "🔰";
var trident = "🔱";
var black_square_button = "🔲";
var white_square_button = "🔳";
var red_circle = "🔴";
var large_blue_circle = "🔵";
var large_orange_diamond = "🔶";
var large_blue_diamond = "🔷";
var small_orange_diamond = "🔸";
var small_blue_diamond = "🔹";
var small_red_triangle = "🔺";
var small_red_triangle_down = "🔻";
var arrow_up_small = "🔼";
var arrow_down_small = "🔽";
var om_symbol = "🕉️";
var dove_of_peace = "🕊️";
var kaaba = "🕋";
var mosque = "🕌";
var synagogue = "🕍";
var menorah_with_nine_branches = "🕎";
var clock1 = "🕐";
var clock2 = "🕑";
var clock3 = "🕒";
var clock4 = "🕓";
var clock5 = "🕔";
var clock6 = "🕕";
var clock7 = "🕖";
var clock8 = "🕗";
var clock9 = "🕘";
var clock10 = "🕙";
var clock11 = "🕚";
var clock12 = "🕛";
var clock130 = "🕜";
var clock230 = "🕝";
var clock330 = "🕞";
var clock430 = "🕟";
var clock530 = "🕠";
var clock630 = "🕡";
var clock730 = "🕢";
var clock830 = "🕣";
var clock930 = "🕤";
var clock1030 = "🕥";
var clock1130 = "🕦";
var clock1230 = "🕧";
var candle = "🕯️";
var mantelpiece_clock = "🕰️";
var hole = "🕳️";
var man_in_business_suit_levitating = "🕴️";
var sleuth_or_spy = "🕵️‍♂️";
var dark_sunglasses = "🕶️";
var spider = "🕷️";
var spider_web = "🕸️";
var joystick = "🕹️";
var man_dancing = "🕺";
var linked_paperclips = "🖇️";
var lower_left_ballpoint_pen = "🖊️";
var lower_left_fountain_pen = "🖋️";
var lower_left_paintbrush = "🖌️";
var lower_left_crayon = "🖍️";
var raised_hand_with_fingers_splayed = "🖐️";
var middle_finger = "🖕";
var reversed_hand_with_middle_finger_extended = "🖕";
var black_heart = "🖤";
var desktop_computer = "🖥️";
var printer = "🖨️";
var three_button_mouse = "🖱️";
var trackball = "🖲️";
var frame_with_picture = "🖼️";
var card_index_dividers = "🗂️";
var card_file_box = "🗃️";
var file_cabinet = "🗄️";
var wastebasket = "🗑️";
var spiral_note_pad = "🗒️";
var spiral_calendar_pad = "🗓️";
var compression = "🗜️";
var old_key = "🗝️";
var rolled_up_newspaper = "🗞️";
var dagger_knife = "🗡️";
var speaking_head_in_silhouette = "🗣️";
var left_speech_bubble = "🗨️";
var right_anger_bubble = "🗯️";
var ballot_box_with_ballot = "🗳️";
var world_map = "🗺️";
var mount_fuji = "🗻";
var tokyo_tower = "🗼";
var statue_of_liberty = "🗽";
var japan = "🗾";
var moyai = "🗿";
var grinning = "😀";
var grin = "😁";
var joy = "😂";
var smiley = "😃";
var smile = "😄";
var sweat_smile = "😅";
var laughing = "😆";
var satisfied = "😆";
var innocent = "😇";
var smiling_imp = "😈";
var wink = "😉";
var blush = "😊";
var yum = "😋";
var relieved = "😌";
var heart_eyes = "😍";
var sunglasses = "😎";
var smirk = "😏";
var neutral_face = "😐";
var expressionless = "😑";
var unamused = "😒";
var sweat = "😓";
var pensive = "😔";
var confused = "😕";
var confounded = "😖";
var kissing = "😗";
var kissing_heart = "😘";
var kissing_smiling_eyes = "😙";
var kissing_closed_eyes = "😚";
var stuck_out_tongue = "😛";
var stuck_out_tongue_winking_eye = "😜";
var stuck_out_tongue_closed_eyes = "😝";
var disappointed = "😞";
var worried = "😟";
var angry = "😠";
var rage = "😡";
var cry = "😢";
var persevere = "😣";
var triumph = "😤";
var disappointed_relieved = "😥";
var frowning = "😦";
var anguished = "😧";
var fearful = "😨";
var weary = "😩";
var sleepy = "😪";
var tired_face = "😫";
var grimacing = "😬";
var sob = "😭";
var face_exhaling = "😮‍💨";
var open_mouth = "😮";
var hushed = "😯";
var cold_sweat = "😰";
var scream = "😱";
var astonished = "😲";
var flushed = "😳";
var sleeping = "😴";
var face_with_spiral_eyes = "😵‍💫";
var dizzy_face = "😵";
var face_in_clouds = "😶‍🌫️";
var no_mouth = "😶";
var mask = "😷";
var smile_cat = "😸";
var joy_cat = "😹";
var smiley_cat = "😺";
var heart_eyes_cat = "😻";
var smirk_cat = "😼";
var kissing_cat = "😽";
var pouting_cat = "😾";
var crying_cat_face = "😿";
var scream_cat = "🙀";
var slightly_frowning_face = "🙁";
var slightly_smiling_face = "🙂";
var upside_down_face = "🙃";
var face_with_rolling_eyes = "🙄";
var no_good = "🙅‍♀️";
var ok_woman = "🙆‍♀️";
var bow = "🙇‍♂️";
var see_no_evil = "🙈";
var hear_no_evil = "🙉";
var speak_no_evil = "🙊";
var raising_hand = "🙋‍♀️";
var raised_hands = "🙌";
var person_frowning = "🙍‍♀️";
var person_with_pouting_face = "🙎‍♀️";
var pray = "🙏";
var rocket = "🚀";
var helicopter = "🚁";
var steam_locomotive = "🚂";
var railway_car = "🚃";
var bullettrain_side = "🚄";
var bullettrain_front = "🚅";
var train2 = "🚆";
var metro = "🚇";
var light_rail = "🚈";
var station = "🚉";
var tram = "🚊";
var train = "🚋";
var bus = "🚌";
var oncoming_bus = "🚍";
var trolleybus = "🚎";
var busstop = "🚏";
var minibus = "🚐";
var ambulance = "🚑";
var fire_engine = "🚒";
var police_car = "🚓";
var oncoming_police_car = "🚔";
var taxi = "🚕";
var oncoming_taxi = "🚖";
var car = "🚗";
var red_car = "🚗";
var oncoming_automobile = "🚘";
var blue_car = "🚙";
var truck = "🚚";
var articulated_lorry = "🚛";
var tractor = "🚜";
var monorail = "🚝";
var mountain_railway = "🚞";
var suspension_railway = "🚟";
var mountain_cableway = "🚠";
var aerial_tramway = "🚡";
var ship = "🚢";
var rowboat = "🚣‍♂️";
var speedboat = "🚤";
var traffic_light = "🚥";
var vertical_traffic_light = "🚦";
var construction = "🚧";
var rotating_light = "🚨";
var triangular_flag_on_post = "🚩";
var door = "🚪";
var no_entry_sign = "🚫";
var smoking = "🚬";
var no_smoking = "🚭";
var put_litter_in_its_place = "🚮";
var do_not_litter = "🚯";
var potable_water = "🚰";
var bike = "🚲";
var no_bicycles = "🚳";
var bicyclist = "🚴‍♂️";
var mountain_bicyclist = "🚵‍♂️";
var walking = "🚶‍♂️";
var no_pedestrians = "🚷";
var children_crossing = "🚸";
var mens = "🚹";
var womens = "🚺";
var restroom = "🚻";
var baby_symbol = "🚼";
var toilet = "🚽";
var wc = "🚾";
var shower = "🚿";
var bath = "🛀";
var bathtub = "🛁";
var passport_control = "🛂";
var customs = "🛃";
var baggage_claim = "🛄";
var left_luggage = "🛅";
var couch_and_lamp = "🛋️";
var sleeping_accommodation = "🛌";
var shopping_bags = "🛍️";
var bellhop_bell = "🛎️";
var bed = "🛏️";
var place_of_worship = "🛐";
var octagonal_sign = "🛑";
var shopping_trolley = "🛒";
var hindu_temple = "🛕";
var hut = "🛖";
var elevator = "🛗";
var hammer_and_wrench = "🛠️";
var shield = "🛡️";
var oil_drum = "🛢️";
var motorway = "🛣️";
var railway_track = "🛤️";
var motor_boat = "🛥️";
var small_airplane = "🛩️";
var airplane_departure = "🛫";
var airplane_arriving = "🛬";
var satellite = "🛰️";
var passenger_ship = "🛳️";
var scooter = "🛴";
var motor_scooter = "🛵";
var canoe = "🛶";
var sled = "🛷";
var flying_saucer = "🛸";
var skateboard = "🛹";
var auto_rickshaw = "🛺";
var pickup_truck = "🛻";
var roller_skate = "🛼";
var large_orange_circle = "🟠";
var large_yellow_circle = "🟡";
var large_green_circle = "🟢";
var large_purple_circle = "🟣";
var large_brown_circle = "🟤";
var large_red_square = "🟥";
var large_blue_square = "🟦";
var large_orange_square = "🟧";
var large_yellow_square = "🟨";
var large_green_square = "🟩";
var large_purple_square = "🟪";
var large_brown_square = "🟫";
var pinched_fingers = "🤌";
var white_heart = "🤍";
var brown_heart = "🤎";
var pinching_hand = "🤏";
var zipper_mouth_face = "🤐";
var money_mouth_face = "🤑";
var face_with_thermometer = "🤒";
var nerd_face = "🤓";
var thinking_face = "🤔";
var face_with_head_bandage = "🤕";
var robot_face = "🤖";
var hugging_face = "🤗";
var the_horns = "🤘";
var sign_of_the_horns = "🤘";
var call_me_hand = "🤙";
var raised_back_of_hand = "🤚";
var handshake = "🤝";
var crossed_fingers = "🤞";
var hand_with_index_and_middle_fingers_crossed = "🤞";
var i_love_you_hand_sign = "🤟";
var face_with_cowboy_hat = "🤠";
var clown_face = "🤡";
var nauseated_face = "🤢";
var rolling_on_the_floor_laughing = "🤣";
var drooling_face = "🤤";
var lying_face = "🤥";
var face_palm = "🤦";
var sneezing_face = "🤧";
var face_with_raised_eyebrow = "🤨";
var face_with_one_eyebrow_raised = "🤨";
var grinning_face_with_star_eyes = "🤩";
var zany_face = "🤪";
var grinning_face_with_one_large_and_one_small_eye = "🤪";
var shushing_face = "🤫";
var face_with_finger_covering_closed_lips = "🤫";
var face_with_symbols_on_mouth = "🤬";
var serious_face_with_symbols_covering_mouth = "🤬";
var face_with_hand_over_mouth = "🤭";
var smiling_face_with_smiling_eyes_and_hand_covering_mouth = "🤭";
var face_vomiting = "🤮";
var face_with_open_mouth_vomiting = "🤮";
var exploding_head = "🤯";
var shocked_face_with_exploding_head = "🤯";
var pregnant_woman = "🤰";
var palms_up_together = "🤲";
var selfie = "🤳";
var prince = "🤴";
var woman_in_tuxedo = "🤵‍♀️";
var man_in_tuxedo = "🤵‍♂️";
var person_in_tuxedo = "🤵";
var mrs_claus = "🤶";
var mother_christmas = "🤶";
var shrug = "🤷";
var person_doing_cartwheel = "🤸";
var juggling = "🤹";
var fencer = "🤺";
var wrestlers = "🤼";
var water_polo = "🤽";
var handball = "🤾";
var diving_mask = "🤿";
var wilted_flower = "🥀";
var drum_with_drumsticks = "🥁";
var clinking_glasses = "🥂";
var tumbler_glass = "🥃";
var spoon = "🥄";
var goal_net = "🥅";
var first_place_medal = "🥇";
var second_place_medal = "🥈";
var third_place_medal = "🥉";
var boxing_glove = "🥊";
var martial_arts_uniform = "🥋";
var curling_stone = "🥌";
var lacrosse = "🥍";
var softball = "🥎";
var flying_disc = "🥏";
var croissant = "🥐";
var avocado = "🥑";
var cucumber = "🥒";
var bacon = "🥓";
var potato = "🥔";
var carrot = "🥕";
var baguette_bread = "🥖";
var green_salad = "🥗";
var shallow_pan_of_food = "🥘";
var stuffed_flatbread = "🥙";
var egg = "🥚";
var glass_of_milk = "🥛";
var peanuts = "🥜";
var kiwifruit = "🥝";
var pancakes = "🥞";
var dumpling = "🥟";
var fortune_cookie = "🥠";
var takeout_box = "🥡";
var chopsticks = "🥢";
var bowl_with_spoon = "🥣";
var cup_with_straw = "🥤";
var coconut = "🥥";
var broccoli = "🥦";
var pie = "🥧";
var pretzel = "🥨";
var cut_of_meat = "🥩";
var sandwich = "🥪";
var canned_food = "🥫";
var leafy_green = "🥬";
var mango = "🥭";
var moon_cake = "🥮";
var bagel = "🥯";
var smiling_face_with_3_hearts = "🥰";
var yawning_face = "🥱";
var smiling_face_with_tear = "🥲";
var partying_face = "🥳";
var woozy_face = "🥴";
var hot_face = "🥵";
var cold_face = "🥶";
var ninja = "🥷";
var disguised_face = "🥸";
var pleading_face = "🥺";
var sari = "🥻";
var lab_coat = "🥼";
var goggles = "🥽";
var hiking_boot = "🥾";
var womans_flat_shoe = "🥿";
var crab = "🦀";
var lion_face = "🦁";
var scorpion = "🦂";
var turkey = "🦃";
var unicorn_face = "🦄";
var eagle = "🦅";
var duck = "🦆";
var bat = "🦇";
var shark = "🦈";
var owl = "🦉";
var fox_face = "🦊";
var butterfly = "🦋";
var deer = "🦌";
var gorilla = "🦍";
var lizard = "🦎";
var rhinoceros = "🦏";
var shrimp = "🦐";
var squid = "🦑";
var giraffe_face = "🦒";
var zebra_face = "🦓";
var hedgehog = "🦔";
var sauropod = "🦕";
var cricket = "🦗";
var kangaroo = "🦘";
var llama = "🦙";
var peacock = "🦚";
var hippopotamus = "🦛";
var parrot = "🦜";
var raccoon = "🦝";
var lobster = "🦞";
var mosquito = "🦟";
var microbe = "🦠";
var badger = "🦡";
var swan = "🦢";
var mammoth = "🦣";
var dodo = "🦤";
var sloth = "🦥";
var otter = "🦦";
var orangutan = "🦧";
var skunk = "🦨";
var flamingo = "🦩";
var oyster = "🦪";
var beaver = "🦫";
var bison = "🦬";
var seal = "🦭";
var guide_dog = "🦮";
var probing_cane = "🦯";
var bone = "🦴";
var leg = "🦵";
var foot = "🦶";
var tooth = "🦷";
var female_superhero = "🦸‍♀️";
var male_superhero = "🦸‍♂️";
var superhero = "🦸";
var female_supervillain = "🦹‍♀️";
var male_supervillain = "🦹‍♂️";
var supervillain = "🦹";
var safety_vest = "🦺";
var ear_with_hearing_aid = "🦻";
var motorized_wheelchair = "🦼";
var manual_wheelchair = "🦽";
var mechanical_arm = "🦾";
var mechanical_leg = "🦿";
var cheese_wedge = "🧀";
var cupcake = "🧁";
var salt = "🧂";
var beverage_box = "🧃";
var garlic = "🧄";
var onion = "🧅";
var falafel = "🧆";
var waffle = "🧇";
var butter = "🧈";
var mate_drink = "🧉";
var ice_cube = "🧊";
var bubble_tea = "🧋";
var woman_standing = "🧍‍♀️";
var man_standing = "🧍‍♂️";
var standing_person = "🧍";
var woman_kneeling = "🧎‍♀️";
var man_kneeling = "🧎‍♂️";
var kneeling_person = "🧎";
var deaf_woman = "🧏‍♀️";
var deaf_man = "🧏‍♂️";
var deaf_person = "🧏";
var face_with_monocle = "🧐";
var farmer = "🧑‍🌾";
var cook = "🧑‍🍳";
var person_feeding_baby = "🧑‍🍼";
var mx_claus = "🧑‍🎄";
var student = "🧑‍🎓";
var singer = "🧑‍🎤";
var artist = "🧑‍🎨";
var teacher = "🧑‍🏫";
var factory_worker = "🧑‍🏭";
var technologist = "🧑‍💻";
var office_worker = "🧑‍💼";
var mechanic = "🧑‍🔧";
var scientist = "🧑‍🔬";
var astronaut = "🧑‍🚀";
var firefighter = "🧑‍🚒";
var people_holding_hands = "🧑‍🤝‍🧑";
var person_with_probing_cane = "🧑‍🦯";
var red_haired_person = "🧑‍🦰";
var curly_haired_person = "🧑‍🦱";
var bald_person = "🧑‍🦲";
var white_haired_person = "🧑‍🦳";
var person_in_motorized_wheelchair = "🧑‍🦼";
var person_in_manual_wheelchair = "🧑‍🦽";
var health_worker = "🧑‍⚕️";
var judge = "🧑‍⚖️";
var pilot = "🧑‍✈️";
var adult = "🧑";
var child = "🧒";
var older_adult = "🧓";
var woman_with_beard = "🧔‍♀️";
var man_with_beard = "🧔‍♂️";
var bearded_person = "🧔";
var person_with_headscarf = "🧕";
var woman_in_steamy_room = "🧖‍♀️";
var man_in_steamy_room = "🧖‍♂️";
var person_in_steamy_room = "🧖‍♂️";
var woman_climbing = "🧗‍♀️";
var person_climbing = "🧗‍♀️";
var man_climbing = "🧗‍♂️";
var woman_in_lotus_position = "🧘‍♀️";
var person_in_lotus_position = "🧘‍♀️";
var man_in_lotus_position = "🧘‍♂️";
var female_mage = "🧙‍♀️";
var mage = "🧙‍♀️";
var male_mage = "🧙‍♂️";
var female_fairy = "🧚‍♀️";
var fairy = "🧚‍♀️";
var male_fairy = "🧚‍♂️";
var female_vampire = "🧛‍♀️";
var vampire = "🧛‍♀️";
var male_vampire = "🧛‍♂️";
var mermaid = "🧜‍♀️";
var merman = "🧜‍♂️";
var merperson = "🧜‍♂️";
var female_elf = "🧝‍♀️";
var male_elf = "🧝‍♂️";
var elf = "🧝‍♂️";
var female_genie = "🧞‍♀️";
var male_genie = "🧞‍♂️";
var genie = "🧞‍♂️";
var female_zombie = "🧟‍♀️";
var male_zombie = "🧟‍♂️";
var zombie = "🧟‍♂️";
var brain = "🧠";
var orange_heart = "🧡";
var billed_cap = "🧢";
var scarf = "🧣";
var gloves = "🧤";
var coat = "🧥";
var socks = "🧦";
var red_envelope = "🧧";
var firecracker = "🧨";
var jigsaw = "🧩";
var test_tube = "🧪";
var petri_dish = "🧫";
var dna = "🧬";
var compass = "🧭";
var abacus = "🧮";
var fire_extinguisher = "🧯";
var toolbox = "🧰";
var bricks = "🧱";
var magnet = "🧲";
var luggage = "🧳";
var lotion_bottle = "🧴";
var thread = "🧵";
var yarn = "🧶";
var safety_pin = "🧷";
var teddy_bear = "🧸";
var broom = "🧹";
var basket = "🧺";
var roll_of_paper = "🧻";
var soap = "🧼";
var sponge = "🧽";
var receipt = "🧾";
var nazar_amulet = "🧿";
var ballet_shoes = "🩰";
var briefs = "🩲";
var shorts = "🩳";
var thong_sandal = "🩴";
var drop_of_blood = "🩸";
var adhesive_bandage = "🩹";
var stethoscope = "🩺";
var kite = "🪁";
var parachute = "🪂";
var boomerang = "🪃";
var magic_wand = "🪄";
var pinata = "🪅";
var nesting_dolls = "🪆";
var ringed_planet = "🪐";
var chair = "🪑";
var razor = "🪒";
var axe = "🪓";
var diya_lamp = "🪔";
var banjo = "🪕";
var military_helmet = "🪖";
var accordion = "🪗";
var long_drum = "🪘";
var coin = "🪙";
var carpentry_saw = "🪚";
var screwdriver = "🪛";
var ladder = "🪜";
var hook = "🪝";
var mirror = "🪞";
var window$1 = "🪟";
var plunger = "🪠";
var sewing_needle = "🪡";
var knot = "🪢";
var bucket = "🪣";
var mouse_trap = "🪤";
var toothbrush = "🪥";
var headstone = "🪦";
var placard = "🪧";
var rock = "🪨";
var fly = "🪰";
var worm = "🪱";
var beetle = "🪲";
var cockroach = "🪳";
var potted_plant = "🪴";
var wood = "🪵";
var feather = "🪶";
var anatomical_heart = "🫀";
var lungs = "🫁";
var people_hugging = "🫂";
var blueberries = "🫐";
var bell_pepper = "🫑";
var olive = "🫒";
var flatbread = "🫓";
var tamale = "🫔";
var fondue = "🫕";
var teapot = "🫖";
var bangbang = "‼️";
var interrobang = "⁉️";
var tm = "™️";
var information_source = "ℹ️";
var left_right_arrow = "↔️";
var arrow_up_down = "↕️";
var arrow_upper_left = "↖️";
var arrow_upper_right = "↗️";
var arrow_lower_right = "↘️";
var arrow_lower_left = "↙️";
var leftwards_arrow_with_hook = "↩️";
var arrow_right_hook = "↪️";
var watch = "⌚";
var hourglass = "⌛";
var keyboard = "⌨️";
var eject = "⏏️";
var fast_forward = "⏩";
var rewind = "⏪";
var arrow_double_up = "⏫";
var arrow_double_down = "⏬";
var black_right_pointing_double_triangle_with_vertical_bar = "⏭️";
var black_left_pointing_double_triangle_with_vertical_bar = "⏮️";
var black_right_pointing_triangle_with_double_vertical_bar = "⏯️";
var alarm_clock = "⏰";
var stopwatch = "⏱️";
var timer_clock = "⏲️";
var hourglass_flowing_sand = "⏳";
var double_vertical_bar = "⏸️";
var black_square_for_stop = "⏹️";
var black_circle_for_record = "⏺️";
var m = "Ⓜ️";
var black_small_square = "▪️";
var white_small_square = "▫️";
var arrow_forward = "▶️";
var arrow_backward = "◀️";
var white_medium_square = "◻️";
var black_medium_square = "◼️";
var white_medium_small_square = "◽";
var black_medium_small_square = "◾";
var sunny = "☀️";
var cloud = "☁️";
var umbrella = "☂️";
var snowman = "☃️";
var comet = "☄️";
var phone = "☎️";
var telephone = "☎️";
var ballot_box_with_check = "☑️";
var shamrock = "☘️";
var point_up = "☝️";
var skull_and_crossbones = "☠️";
var radioactive_sign = "☢️";
var biohazard_sign = "☣️";
var orthodox_cross = "☦️";
var star_and_crescent = "☪️";
var peace_symbol = "☮️";
var yin_yang = "☯️";
var wheel_of_dharma = "☸️";
var white_frowning_face = "☹️";
var relaxed = "☺️";
var female_sign = "♀️";
var male_sign = "♂️";
var gemini = "♊";
var cancer = "♋";
var leo = "♌";
var virgo = "♍";
var libra = "♎";
var scorpius = "♏";
var chess_pawn = "♟️";
var spades = "♠️";
var clubs = "♣️";
var hearts = "♥️";
var diamonds = "♦️";
var hotsprings = "♨️";
var recycle = "♻️";
var infinity = "♾️";
var wheelchair = "♿";
var hammer_and_pick = "⚒️";
var crossed_swords = "⚔️";
var medical_symbol = "⚕️";
var staff_of_aesculapius = "⚕️";
var scales = "⚖️";
var alembic = "⚗️";
var gear = "⚙️";
var atom_symbol = "⚛️";
var fleur_de_lis = "⚜️";
var warning = "⚠️";
var zap = "⚡";
var transgender_symbol = "⚧️";
var white_circle = "⚪";
var black_circle = "⚫";
var coffin = "⚰️";
var funeral_urn = "⚱️";
var soccer = "⚽";
var baseball = "⚾";
var snowman_without_snow = "⛄";
var partly_sunny = "⛅";
var thunder_cloud_and_rain = "⛈️";
var ophiuchus = "⛎";
var pick = "⛏️";
var helmet_with_white_cross = "⛑️";
var chains = "⛓️";
var no_entry = "⛔";
var shinto_shrine = "⛩️";
var church = "⛪";
var mountain = "⛰️";
var umbrella_on_ground = "⛱️";
var fountain = "⛲";
var golf = "⛳";
var ferry = "⛴️";
var boat = "⛵";
var sailboat = "⛵";
var skier = "⛷️";
var ice_skate = "⛸️";
var person_with_ball = "⛹️‍♂️";
var tent = "⛺";
var fuelpump = "⛽";
var scissors = "✂️";
var airplane = "✈️";
var email = "✉️";
var envelope = "✉️";
var fist = "✊";
var hand = "✋";
var raised_hand = "✋";
var v = "✌️";
var writing_hand = "✍️";
var pencil2 = "✏️";
var black_nib = "✒️";
var heavy_check_mark = "✔️";
var heavy_multiplication_x = "✖️";
var latin_cross = "✝️";
var star_of_david = "✡️";
var eight_spoked_asterisk = "✳️";
var eight_pointed_black_star = "✴️";
var snowflake = "❄️";
var sparkle = "❇️";
var x = "❌";
var negative_squared_cross_mark = "❎";
var heavy_heart_exclamation_mark_ornament = "❣️";
var heart_on_fire = "❤️‍🔥";
var mending_heart = "❤️‍🩹";
var heart = "❤️";
var arrow_right = "➡️";
var curly_loop = "➰";
var loop = "➿";
var arrow_heading_up = "⤴️";
var arrow_heading_down = "⤵️";
var arrow_left = "⬅️";
var arrow_up = "⬆️";
var arrow_down = "⬇️";
var black_large_square = "⬛";
var white_large_square = "⬜";
var star = "⭐";
var o = "⭕";
var wavy_dash = "〰️";
var part_alternation_mark = "〽️";
var congratulations = "㊗️";
var secret = "㊙️";
const require$$1 = {
	"100": "💯",
	"1234": "🔢",
	umbrella_with_rain_drops: umbrella_with_rain_drops,
	coffee: coffee,
	aries: aries,
	taurus: taurus,
	sagittarius: sagittarius,
	capricorn: capricorn,
	aquarius: aquarius,
	pisces: pisces,
	anchor: anchor,
	white_check_mark: white_check_mark,
	sparkles: sparkles,
	question: question,
	grey_question: grey_question,
	grey_exclamation: grey_exclamation,
	exclamation: exclamation,
	heavy_exclamation_mark: heavy_exclamation_mark,
	heavy_plus_sign: heavy_plus_sign,
	heavy_minus_sign: heavy_minus_sign,
	heavy_division_sign: heavy_division_sign,
	hash: hash,
	keycap_star: keycap_star,
	zero: zero,
	one: one,
	two: two,
	three: three,
	four: four,
	five: five,
	six: six,
	seven: seven,
	eight: eight,
	nine: nine,
	copyright: copyright,
	registered: registered,
	mahjong: mahjong,
	black_joker: black_joker,
	a: a,
	b: b,
	o2: o2,
	parking: parking,
	ab: ab,
	cl: cl,
	cool: cool,
	free: free,
	id: id,
	"new": "🆕",
	ng: ng,
	ok: ok,
	sos: sos,
	up: up,
	vs: vs,
	"flag-ac": "🇦🇨",
	"flag-ad": "🇦🇩",
	"flag-ae": "🇦🇪",
	"flag-af": "🇦🇫",
	"flag-ag": "🇦🇬",
	"flag-ai": "🇦🇮",
	"flag-al": "🇦🇱",
	"flag-am": "🇦🇲",
	"flag-ao": "🇦🇴",
	"flag-aq": "🇦🇶",
	"flag-ar": "🇦🇷",
	"flag-as": "🇦🇸",
	"flag-at": "🇦🇹",
	"flag-au": "🇦🇺",
	"flag-aw": "🇦🇼",
	"flag-ax": "🇦🇽",
	"flag-az": "🇦🇿",
	"flag-ba": "🇧🇦",
	"flag-bb": "🇧🇧",
	"flag-bd": "🇧🇩",
	"flag-be": "🇧🇪",
	"flag-bf": "🇧🇫",
	"flag-bg": "🇧🇬",
	"flag-bh": "🇧🇭",
	"flag-bi": "🇧🇮",
	"flag-bj": "🇧🇯",
	"flag-bl": "🇧🇱",
	"flag-bm": "🇧🇲",
	"flag-bn": "🇧🇳",
	"flag-bo": "🇧🇴",
	"flag-bq": "🇧🇶",
	"flag-br": "🇧🇷",
	"flag-bs": "🇧🇸",
	"flag-bt": "🇧🇹",
	"flag-bv": "🇧🇻",
	"flag-bw": "🇧🇼",
	"flag-by": "🇧🇾",
	"flag-bz": "🇧🇿",
	"flag-ca": "🇨🇦",
	"flag-cc": "🇨🇨",
	"flag-cd": "🇨🇩",
	"flag-cf": "🇨🇫",
	"flag-cg": "🇨🇬",
	"flag-ch": "🇨🇭",
	"flag-ci": "🇨🇮",
	"flag-ck": "🇨🇰",
	"flag-cl": "🇨🇱",
	"flag-cm": "🇨🇲",
	cn: cn,
	"flag-cn": "🇨🇳",
	"flag-co": "🇨🇴",
	"flag-cp": "🇨🇵",
	"flag-cr": "🇨🇷",
	"flag-cu": "🇨🇺",
	"flag-cv": "🇨🇻",
	"flag-cw": "🇨🇼",
	"flag-cx": "🇨🇽",
	"flag-cy": "🇨🇾",
	"flag-cz": "🇨🇿",
	de: de,
	"flag-de": "🇩🇪",
	"flag-dg": "🇩🇬",
	"flag-dj": "🇩🇯",
	"flag-dk": "🇩🇰",
	"flag-dm": "🇩🇲",
	"flag-do": "🇩🇴",
	"flag-dz": "🇩🇿",
	"flag-ea": "🇪🇦",
	"flag-ec": "🇪🇨",
	"flag-ee": "🇪🇪",
	"flag-eg": "🇪🇬",
	"flag-eh": "🇪🇭",
	"flag-er": "🇪🇷",
	es: es,
	"flag-es": "🇪🇸",
	"flag-et": "🇪🇹",
	"flag-eu": "🇪🇺",
	"flag-fi": "🇫🇮",
	"flag-fj": "🇫🇯",
	"flag-fk": "🇫🇰",
	"flag-fm": "🇫🇲",
	"flag-fo": "🇫🇴",
	fr: fr,
	"flag-fr": "🇫🇷",
	"flag-ga": "🇬🇦",
	gb: gb,
	uk: uk,
	"flag-gb": "🇬🇧",
	"flag-gd": "🇬🇩",
	"flag-ge": "🇬🇪",
	"flag-gf": "🇬🇫",
	"flag-gg": "🇬🇬",
	"flag-gh": "🇬🇭",
	"flag-gi": "🇬🇮",
	"flag-gl": "🇬🇱",
	"flag-gm": "🇬🇲",
	"flag-gn": "🇬🇳",
	"flag-gp": "🇬🇵",
	"flag-gq": "🇬🇶",
	"flag-gr": "🇬🇷",
	"flag-gs": "🇬🇸",
	"flag-gt": "🇬🇹",
	"flag-gu": "🇬🇺",
	"flag-gw": "🇬🇼",
	"flag-gy": "🇬🇾",
	"flag-hk": "🇭🇰",
	"flag-hm": "🇭🇲",
	"flag-hn": "🇭🇳",
	"flag-hr": "🇭🇷",
	"flag-ht": "🇭🇹",
	"flag-hu": "🇭🇺",
	"flag-ic": "🇮🇨",
	"flag-id": "🇮🇩",
	"flag-ie": "🇮🇪",
	"flag-il": "🇮🇱",
	"flag-im": "🇮🇲",
	"flag-in": "🇮🇳",
	"flag-io": "🇮🇴",
	"flag-iq": "🇮🇶",
	"flag-ir": "🇮🇷",
	"flag-is": "🇮🇸",
	it: it,
	"flag-it": "🇮🇹",
	"flag-je": "🇯🇪",
	"flag-jm": "🇯🇲",
	"flag-jo": "🇯🇴",
	jp: jp,
	"flag-jp": "🇯🇵",
	"flag-ke": "🇰🇪",
	"flag-kg": "🇰🇬",
	"flag-kh": "🇰🇭",
	"flag-ki": "🇰🇮",
	"flag-km": "🇰🇲",
	"flag-kn": "🇰🇳",
	"flag-kp": "🇰🇵",
	kr: kr,
	"flag-kr": "🇰🇷",
	"flag-kw": "🇰🇼",
	"flag-ky": "🇰🇾",
	"flag-kz": "🇰🇿",
	"flag-la": "🇱🇦",
	"flag-lb": "🇱🇧",
	"flag-lc": "🇱🇨",
	"flag-li": "🇱🇮",
	"flag-lk": "🇱🇰",
	"flag-lr": "🇱🇷",
	"flag-ls": "🇱🇸",
	"flag-lt": "🇱🇹",
	"flag-lu": "🇱🇺",
	"flag-lv": "🇱🇻",
	"flag-ly": "🇱🇾",
	"flag-ma": "🇲🇦",
	"flag-mc": "🇲🇨",
	"flag-md": "🇲🇩",
	"flag-me": "🇲🇪",
	"flag-mf": "🇲🇫",
	"flag-mg": "🇲🇬",
	"flag-mh": "🇲🇭",
	"flag-mk": "🇲🇰",
	"flag-ml": "🇲🇱",
	"flag-mm": "🇲🇲",
	"flag-mn": "🇲🇳",
	"flag-mo": "🇲🇴",
	"flag-mp": "🇲🇵",
	"flag-mq": "🇲🇶",
	"flag-mr": "🇲🇷",
	"flag-ms": "🇲🇸",
	"flag-mt": "🇲🇹",
	"flag-mu": "🇲🇺",
	"flag-mv": "🇲🇻",
	"flag-mw": "🇲🇼",
	"flag-mx": "🇲🇽",
	"flag-my": "🇲🇾",
	"flag-mz": "🇲🇿",
	"flag-na": "🇳🇦",
	"flag-nc": "🇳🇨",
	"flag-ne": "🇳🇪",
	"flag-nf": "🇳🇫",
	"flag-ng": "🇳🇬",
	"flag-ni": "🇳🇮",
	"flag-nl": "🇳🇱",
	"flag-no": "🇳🇴",
	"flag-np": "🇳🇵",
	"flag-nr": "🇳🇷",
	"flag-nu": "🇳🇺",
	"flag-nz": "🇳🇿",
	"flag-om": "🇴🇲",
	"flag-pa": "🇵🇦",
	"flag-pe": "🇵🇪",
	"flag-pf": "🇵🇫",
	"flag-pg": "🇵🇬",
	"flag-ph": "🇵🇭",
	"flag-pk": "🇵🇰",
	"flag-pl": "🇵🇱",
	"flag-pm": "🇵🇲",
	"flag-pn": "🇵🇳",
	"flag-pr": "🇵🇷",
	"flag-ps": "🇵🇸",
	"flag-pt": "🇵🇹",
	"flag-pw": "🇵🇼",
	"flag-py": "🇵🇾",
	"flag-qa": "🇶🇦",
	"flag-re": "🇷🇪",
	"flag-ro": "🇷🇴",
	"flag-rs": "🇷🇸",
	ru: ru,
	"flag-ru": "🇷🇺",
	"flag-rw": "🇷🇼",
	"flag-sa": "🇸🇦",
	"flag-sb": "🇸🇧",
	"flag-sc": "🇸🇨",
	"flag-sd": "🇸🇩",
	"flag-se": "🇸🇪",
	"flag-sg": "🇸🇬",
	"flag-sh": "🇸🇭",
	"flag-si": "🇸🇮",
	"flag-sj": "🇸🇯",
	"flag-sk": "🇸🇰",
	"flag-sl": "🇸🇱",
	"flag-sm": "🇸🇲",
	"flag-sn": "🇸🇳",
	"flag-so": "🇸🇴",
	"flag-sr": "🇸🇷",
	"flag-ss": "🇸🇸",
	"flag-st": "🇸🇹",
	"flag-sv": "🇸🇻",
	"flag-sx": "🇸🇽",
	"flag-sy": "🇸🇾",
	"flag-sz": "🇸🇿",
	"flag-ta": "🇹🇦",
	"flag-tc": "🇹🇨",
	"flag-td": "🇹🇩",
	"flag-tf": "🇹🇫",
	"flag-tg": "🇹🇬",
	"flag-th": "🇹🇭",
	"flag-tj": "🇹🇯",
	"flag-tk": "🇹🇰",
	"flag-tl": "🇹🇱",
	"flag-tm": "🇹🇲",
	"flag-tn": "🇹🇳",
	"flag-to": "🇹🇴",
	"flag-tr": "🇹🇷",
	"flag-tt": "🇹🇹",
	"flag-tv": "🇹🇻",
	"flag-tw": "🇹🇼",
	"flag-tz": "🇹🇿",
	"flag-ua": "🇺🇦",
	"flag-ug": "🇺🇬",
	"flag-um": "🇺🇲",
	"flag-un": "🇺🇳",
	us: us,
	"flag-us": "🇺🇸",
	"flag-uy": "🇺🇾",
	"flag-uz": "🇺🇿",
	"flag-va": "🇻🇦",
	"flag-vc": "🇻🇨",
	"flag-ve": "🇻🇪",
	"flag-vg": "🇻🇬",
	"flag-vi": "🇻🇮",
	"flag-vn": "🇻🇳",
	"flag-vu": "🇻🇺",
	"flag-wf": "🇼🇫",
	"flag-ws": "🇼🇸",
	"flag-xk": "🇽🇰",
	"flag-ye": "🇾🇪",
	"flag-yt": "🇾🇹",
	"flag-za": "🇿🇦",
	"flag-zm": "🇿🇲",
	"flag-zw": "🇿🇼",
	koko: koko,
	sa: sa,
	u7121: u7121,
	u6307: u6307,
	u7981: u7981,
	u7a7a: u7a7a,
	u5408: u5408,
	u6e80: u6e80,
	u6709: u6709,
	u6708: u6708,
	u7533: u7533,
	u5272: u5272,
	u55b6: u55b6,
	ideograph_advantage: ideograph_advantage,
	accept: accept,
	cyclone: cyclone,
	foggy: foggy,
	closed_umbrella: closed_umbrella,
	night_with_stars: night_with_stars,
	sunrise_over_mountains: sunrise_over_mountains,
	sunrise: sunrise,
	city_sunset: city_sunset,
	city_sunrise: city_sunrise,
	rainbow: rainbow,
	bridge_at_night: bridge_at_night,
	ocean: ocean,
	volcano: volcano,
	milky_way: milky_way,
	earth_africa: earth_africa,
	earth_americas: earth_americas,
	earth_asia: earth_asia,
	globe_with_meridians: globe_with_meridians,
	new_moon: new_moon,
	waxing_crescent_moon: waxing_crescent_moon,
	first_quarter_moon: first_quarter_moon,
	moon: moon,
	waxing_gibbous_moon: waxing_gibbous_moon,
	full_moon: full_moon,
	waning_gibbous_moon: waning_gibbous_moon,
	last_quarter_moon: last_quarter_moon,
	waning_crescent_moon: waning_crescent_moon,
	crescent_moon: crescent_moon,
	new_moon_with_face: new_moon_with_face,
	first_quarter_moon_with_face: first_quarter_moon_with_face,
	last_quarter_moon_with_face: last_quarter_moon_with_face,
	full_moon_with_face: full_moon_with_face,
	sun_with_face: sun_with_face,
	star2: star2,
	stars: stars,
	thermometer: thermometer,
	mostly_sunny: mostly_sunny,
	sun_small_cloud: sun_small_cloud,
	barely_sunny: barely_sunny,
	sun_behind_cloud: sun_behind_cloud,
	partly_sunny_rain: partly_sunny_rain,
	sun_behind_rain_cloud: sun_behind_rain_cloud,
	rain_cloud: rain_cloud,
	snow_cloud: snow_cloud,
	lightning: lightning,
	lightning_cloud: lightning_cloud,
	tornado: tornado,
	tornado_cloud: tornado_cloud,
	fog: fog,
	wind_blowing_face: wind_blowing_face,
	hotdog: hotdog,
	taco: taco,
	burrito: burrito,
	chestnut: chestnut,
	seedling: seedling,
	evergreen_tree: evergreen_tree,
	deciduous_tree: deciduous_tree,
	palm_tree: palm_tree,
	cactus: cactus,
	hot_pepper: hot_pepper,
	tulip: tulip,
	cherry_blossom: cherry_blossom,
	rose: rose,
	hibiscus: hibiscus,
	sunflower: sunflower,
	blossom: blossom,
	corn: corn,
	ear_of_rice: ear_of_rice,
	herb: herb,
	four_leaf_clover: four_leaf_clover,
	maple_leaf: maple_leaf,
	fallen_leaf: fallen_leaf,
	leaves: leaves,
	mushroom: mushroom,
	tomato: tomato,
	eggplant: eggplant,
	grapes: grapes,
	melon: melon,
	watermelon: watermelon,
	tangerine: tangerine,
	lemon: lemon,
	banana: banana,
	pineapple: pineapple,
	apple: apple,
	green_apple: green_apple,
	pear: pear,
	peach: peach,
	cherries: cherries,
	strawberry: strawberry,
	hamburger: hamburger,
	pizza: pizza,
	meat_on_bone: meat_on_bone,
	poultry_leg: poultry_leg,
	rice_cracker: rice_cracker,
	rice_ball: rice_ball,
	rice: rice,
	curry: curry,
	ramen: ramen,
	spaghetti: spaghetti,
	bread: bread,
	fries: fries,
	sweet_potato: sweet_potato,
	dango: dango,
	oden: oden,
	sushi: sushi,
	fried_shrimp: fried_shrimp,
	fish_cake: fish_cake,
	icecream: icecream,
	shaved_ice: shaved_ice,
	ice_cream: ice_cream,
	doughnut: doughnut,
	cookie: cookie,
	chocolate_bar: chocolate_bar,
	candy: candy,
	lollipop: lollipop,
	custard: custard,
	honey_pot: honey_pot,
	cake: cake,
	bento: bento,
	stew: stew,
	fried_egg: fried_egg,
	cooking: cooking,
	fork_and_knife: fork_and_knife,
	tea: tea,
	sake: sake,
	wine_glass: wine_glass,
	cocktail: cocktail,
	tropical_drink: tropical_drink,
	beer: beer,
	beers: beers,
	baby_bottle: baby_bottle,
	knife_fork_plate: knife_fork_plate,
	champagne: champagne,
	popcorn: popcorn,
	ribbon: ribbon,
	gift: gift,
	birthday: birthday,
	jack_o_lantern: jack_o_lantern,
	christmas_tree: christmas_tree,
	santa: santa,
	fireworks: fireworks,
	sparkler: sparkler,
	balloon: balloon,
	tada: tada,
	confetti_ball: confetti_ball,
	tanabata_tree: tanabata_tree,
	crossed_flags: crossed_flags,
	bamboo: bamboo,
	dolls: dolls,
	flags: flags,
	wind_chime: wind_chime,
	rice_scene: rice_scene,
	school_satchel: school_satchel,
	mortar_board: mortar_board,
	medal: medal,
	reminder_ribbon: reminder_ribbon,
	studio_microphone: studio_microphone,
	level_slider: level_slider,
	control_knobs: control_knobs,
	film_frames: film_frames,
	admission_tickets: admission_tickets,
	carousel_horse: carousel_horse,
	ferris_wheel: ferris_wheel,
	roller_coaster: roller_coaster,
	fishing_pole_and_fish: fishing_pole_and_fish,
	microphone: microphone,
	movie_camera: movie_camera,
	cinema: cinema,
	headphones: headphones,
	art: art,
	tophat: tophat,
	circus_tent: circus_tent,
	ticket: ticket,
	clapper: clapper,
	performing_arts: performing_arts,
	video_game: video_game,
	dart: dart,
	slot_machine: slot_machine,
	"8ball": "🎱",
	game_die: game_die,
	bowling: bowling,
	flower_playing_cards: flower_playing_cards,
	musical_note: musical_note,
	notes: notes,
	saxophone: saxophone,
	guitar: guitar,
	musical_keyboard: musical_keyboard,
	trumpet: trumpet,
	violin: violin,
	musical_score: musical_score,
	running_shirt_with_sash: running_shirt_with_sash,
	tennis: tennis,
	ski: ski,
	basketball: basketball,
	checkered_flag: checkered_flag,
	snowboarder: snowboarder,
	"woman-running": "🏃‍♀️",
	"man-running": "🏃‍♂️",
	runner: runner,
	running: running,
	"woman-surfing": "🏄‍♀️",
	"man-surfing": "🏄‍♂️",
	surfer: surfer,
	sports_medal: sports_medal,
	trophy: trophy,
	horse_racing: horse_racing,
	football: football,
	rugby_football: rugby_football,
	"woman-swimming": "🏊‍♀️",
	"man-swimming": "🏊‍♂️",
	swimmer: swimmer,
	"woman-lifting-weights": "🏋️‍♀️",
	"man-lifting-weights": "🏋️‍♂️",
	weight_lifter: weight_lifter,
	"woman-golfing": "🏌️‍♀️",
	"man-golfing": "🏌️‍♂️",
	golfer: golfer,
	racing_motorcycle: racing_motorcycle,
	racing_car: racing_car,
	cricket_bat_and_ball: cricket_bat_and_ball,
	volleyball: volleyball,
	field_hockey_stick_and_ball: field_hockey_stick_and_ball,
	ice_hockey_stick_and_puck: ice_hockey_stick_and_puck,
	table_tennis_paddle_and_ball: table_tennis_paddle_and_ball,
	snow_capped_mountain: snow_capped_mountain,
	camping: camping,
	beach_with_umbrella: beach_with_umbrella,
	building_construction: building_construction,
	house_buildings: house_buildings,
	cityscape: cityscape,
	derelict_house_building: derelict_house_building,
	classical_building: classical_building,
	desert: desert,
	desert_island: desert_island,
	national_park: national_park,
	stadium: stadium,
	house: house,
	house_with_garden: house_with_garden,
	office: office,
	post_office: post_office,
	european_post_office: european_post_office,
	hospital: hospital,
	bank: bank,
	atm: atm,
	hotel: hotel,
	love_hotel: love_hotel,
	convenience_store: convenience_store,
	school: school,
	department_store: department_store,
	factory: factory,
	izakaya_lantern: izakaya_lantern,
	lantern: lantern,
	japanese_castle: japanese_castle,
	european_castle: european_castle,
	"rainbow-flag": "🏳️‍🌈",
	transgender_flag: transgender_flag,
	waving_white_flag: waving_white_flag,
	pirate_flag: pirate_flag,
	"flag-england": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
	"flag-scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
	"flag-wales": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
	waving_black_flag: waving_black_flag,
	rosette: rosette,
	label: label,
	badminton_racquet_and_shuttlecock: badminton_racquet_and_shuttlecock,
	bow_and_arrow: bow_and_arrow,
	amphora: amphora,
	"skin-tone-2": "🏻",
	"skin-tone-3": "🏼",
	"skin-tone-4": "🏽",
	"skin-tone-5": "🏾",
	"skin-tone-6": "🏿",
	rat: rat,
	mouse2: mouse2,
	ox: ox,
	water_buffalo: water_buffalo,
	cow2: cow2,
	tiger2: tiger2,
	leopard: leopard,
	rabbit2: rabbit2,
	black_cat: black_cat,
	cat2: cat2,
	dragon: dragon,
	crocodile: crocodile,
	whale2: whale2,
	snail: snail,
	snake: snake,
	racehorse: racehorse,
	ram: ram,
	goat: goat,
	sheep: sheep,
	monkey: monkey,
	rooster: rooster,
	chicken: chicken,
	service_dog: service_dog,
	dog2: dog2,
	pig2: pig2,
	boar: boar,
	elephant: elephant,
	octopus: octopus,
	shell: shell,
	bug: bug,
	ant: ant,
	bee: bee,
	honeybee: honeybee,
	ladybug: ladybug,
	lady_beetle: lady_beetle,
	fish: fish,
	tropical_fish: tropical_fish,
	blowfish: blowfish,
	turtle: turtle,
	hatching_chick: hatching_chick,
	baby_chick: baby_chick,
	hatched_chick: hatched_chick,
	bird: bird,
	penguin: penguin,
	koala: koala,
	poodle: poodle,
	dromedary_camel: dromedary_camel,
	camel: camel,
	dolphin: dolphin,
	flipper: flipper,
	mouse: mouse,
	cow: cow,
	tiger: tiger,
	rabbit: rabbit,
	cat: cat,
	dragon_face: dragon_face,
	whale: whale,
	horse: horse,
	monkey_face: monkey_face,
	dog: dog,
	pig: pig,
	frog: frog,
	hamster: hamster,
	wolf: wolf,
	polar_bear: polar_bear,
	bear: bear,
	panda_face: panda_face,
	pig_nose: pig_nose,
	feet: feet,
	paw_prints: paw_prints,
	chipmunk: chipmunk,
	eyes: eyes,
	"eye-in-speech-bubble": "👁️‍🗨️",
	eye: eye,
	ear: ear,
	nose: nose,
	lips: lips,
	tongue: tongue,
	point_up_2: point_up_2,
	point_down: point_down,
	point_left: point_left,
	point_right: point_right,
	facepunch: facepunch,
	punch: punch,
	wave: wave,
	ok_hand: ok_hand,
	"+1": "👍",
	thumbsup: thumbsup,
	"-1": "👎",
	thumbsdown: thumbsdown,
	clap: clap,
	open_hands: open_hands,
	crown: crown,
	womans_hat: womans_hat,
	eyeglasses: eyeglasses,
	necktie: necktie,
	shirt: shirt,
	tshirt: tshirt,
	jeans: jeans,
	dress: dress,
	kimono: kimono,
	bikini: bikini,
	womans_clothes: womans_clothes,
	purse: purse,
	handbag: handbag,
	pouch: pouch,
	mans_shoe: mans_shoe,
	shoe: shoe,
	athletic_shoe: athletic_shoe,
	high_heel: high_heel,
	sandal: sandal,
	boot: boot,
	footprints: footprints,
	bust_in_silhouette: bust_in_silhouette,
	busts_in_silhouette: busts_in_silhouette,
	boy: boy,
	girl: girl,
	"male-farmer": "👨‍🌾",
	"male-cook": "👨‍🍳",
	man_feeding_baby: man_feeding_baby,
	"male-student": "👨‍🎓",
	"male-singer": "👨‍🎤",
	"male-artist": "👨‍🎨",
	"male-teacher": "👨‍🏫",
	"male-factory-worker": "👨‍🏭",
	"man-boy-boy": "👨‍👦‍👦",
	"man-boy": "👨‍👦",
	"man-girl-boy": "👨‍👧‍👦",
	"man-girl-girl": "👨‍👧‍👧",
	"man-girl": "👨‍👧",
	"man-man-boy": "👨‍👨‍👦",
	"man-man-boy-boy": "👨‍👨‍👦‍👦",
	"man-man-girl": "👨‍👨‍👧",
	"man-man-girl-boy": "👨‍👨‍👧‍👦",
	"man-man-girl-girl": "👨‍👨‍👧‍👧",
	"man-woman-boy": "👨‍👩‍👦",
	family: family,
	"man-woman-boy-boy": "👨‍👩‍👦‍👦",
	"man-woman-girl": "👨‍👩‍👧",
	"man-woman-girl-boy": "👨‍👩‍👧‍👦",
	"man-woman-girl-girl": "👨‍👩‍👧‍👧",
	"male-technologist": "👨‍💻",
	"male-office-worker": "👨‍💼",
	"male-mechanic": "👨‍🔧",
	"male-scientist": "👨‍🔬",
	"male-astronaut": "👨‍🚀",
	"male-firefighter": "👨‍🚒",
	man_with_probing_cane: man_with_probing_cane,
	red_haired_man: red_haired_man,
	curly_haired_man: curly_haired_man,
	bald_man: bald_man,
	white_haired_man: white_haired_man,
	man_in_motorized_wheelchair: man_in_motorized_wheelchair,
	man_in_manual_wheelchair: man_in_manual_wheelchair,
	"male-doctor": "👨‍⚕️",
	"male-judge": "👨‍⚖️",
	"male-pilot": "👨‍✈️",
	"man-heart-man": "👨‍❤️‍👨",
	"man-kiss-man": "👨‍❤️‍💋‍👨",
	man: man,
	"female-farmer": "👩‍🌾",
	"female-cook": "👩‍🍳",
	woman_feeding_baby: woman_feeding_baby,
	"female-student": "👩‍🎓",
	"female-singer": "👩‍🎤",
	"female-artist": "👩‍🎨",
	"female-teacher": "👩‍🏫",
	"female-factory-worker": "👩‍🏭",
	"woman-boy-boy": "👩‍👦‍👦",
	"woman-boy": "👩‍👦",
	"woman-girl-boy": "👩‍👧‍👦",
	"woman-girl-girl": "👩‍👧‍👧",
	"woman-girl": "👩‍👧",
	"woman-woman-boy": "👩‍👩‍👦",
	"woman-woman-boy-boy": "👩‍👩‍👦‍👦",
	"woman-woman-girl": "👩‍👩‍👧",
	"woman-woman-girl-boy": "👩‍👩‍👧‍👦",
	"woman-woman-girl-girl": "👩‍👩‍👧‍👧",
	"female-technologist": "👩‍💻",
	"female-office-worker": "👩‍💼",
	"female-mechanic": "👩‍🔧",
	"female-scientist": "👩‍🔬",
	"female-astronaut": "👩‍🚀",
	"female-firefighter": "👩‍🚒",
	woman_with_probing_cane: woman_with_probing_cane,
	red_haired_woman: red_haired_woman,
	curly_haired_woman: curly_haired_woman,
	bald_woman: bald_woman,
	white_haired_woman: white_haired_woman,
	woman_in_motorized_wheelchair: woman_in_motorized_wheelchair,
	woman_in_manual_wheelchair: woman_in_manual_wheelchair,
	"female-doctor": "👩‍⚕️",
	"female-judge": "👩‍⚖️",
	"female-pilot": "👩‍✈️",
	"woman-heart-man": "👩‍❤️‍👨",
	"woman-heart-woman": "👩‍❤️‍👩",
	"woman-kiss-man": "👩‍❤️‍💋‍👨",
	"woman-kiss-woman": "👩‍❤️‍💋‍👩",
	woman: woman,
	man_and_woman_holding_hands: man_and_woman_holding_hands,
	woman_and_man_holding_hands: woman_and_man_holding_hands,
	couple: couple,
	two_men_holding_hands: two_men_holding_hands,
	men_holding_hands: men_holding_hands,
	two_women_holding_hands: two_women_holding_hands,
	women_holding_hands: women_holding_hands,
	"female-police-officer": "👮‍♀️",
	"male-police-officer": "👮‍♂️",
	cop: cop,
	"women-with-bunny-ears-partying": "👯‍♀️",
	"woman-with-bunny-ears-partying": "👯‍♀️",
	dancers: dancers,
	"men-with-bunny-ears-partying": "👯‍♂️",
	"man-with-bunny-ears-partying": "👯‍♂️",
	woman_with_veil: woman_with_veil,
	man_with_veil: man_with_veil,
	bride_with_veil: bride_with_veil,
	"blond-haired-woman": "👱‍♀️",
	"blond-haired-man": "👱‍♂️",
	person_with_blond_hair: person_with_blond_hair,
	man_with_gua_pi_mao: man_with_gua_pi_mao,
	"woman-wearing-turban": "👳‍♀️",
	"man-wearing-turban": "👳‍♂️",
	man_with_turban: man_with_turban,
	older_man: older_man,
	older_woman: older_woman,
	baby: baby,
	"female-construction-worker": "👷‍♀️",
	"male-construction-worker": "👷‍♂️",
	construction_worker: construction_worker,
	princess: princess,
	japanese_ogre: japanese_ogre,
	japanese_goblin: japanese_goblin,
	ghost: ghost,
	angel: angel,
	alien: alien,
	space_invader: space_invader,
	imp: imp,
	skull: skull,
	"woman-tipping-hand": "💁‍♀️",
	information_desk_person: information_desk_person,
	"man-tipping-hand": "💁‍♂️",
	"female-guard": "💂‍♀️",
	"male-guard": "💂‍♂️",
	guardsman: guardsman,
	dancer: dancer,
	lipstick: lipstick,
	nail_care: nail_care,
	"woman-getting-massage": "💆‍♀️",
	massage: massage,
	"man-getting-massage": "💆‍♂️",
	"woman-getting-haircut": "💇‍♀️",
	haircut: haircut,
	"man-getting-haircut": "💇‍♂️",
	barber: barber,
	syringe: syringe,
	pill: pill,
	kiss: kiss,
	love_letter: love_letter,
	ring: ring,
	gem: gem,
	couplekiss: couplekiss,
	bouquet: bouquet,
	couple_with_heart: couple_with_heart,
	wedding: wedding,
	heartbeat: heartbeat,
	broken_heart: broken_heart,
	two_hearts: two_hearts,
	sparkling_heart: sparkling_heart,
	heartpulse: heartpulse,
	cupid: cupid,
	blue_heart: blue_heart,
	green_heart: green_heart,
	yellow_heart: yellow_heart,
	purple_heart: purple_heart,
	gift_heart: gift_heart,
	revolving_hearts: revolving_hearts,
	heart_decoration: heart_decoration,
	diamond_shape_with_a_dot_inside: diamond_shape_with_a_dot_inside,
	bulb: bulb,
	anger: anger,
	bomb: bomb,
	zzz: zzz,
	boom: boom,
	collision: collision,
	sweat_drops: sweat_drops,
	droplet: droplet,
	dash: dash,
	hankey: hankey,
	poop: poop,
	shit: shit,
	muscle: muscle,
	dizzy: dizzy,
	speech_balloon: speech_balloon,
	thought_balloon: thought_balloon,
	white_flower: white_flower,
	moneybag: moneybag,
	currency_exchange: currency_exchange,
	heavy_dollar_sign: heavy_dollar_sign,
	credit_card: credit_card,
	yen: yen,
	dollar: dollar,
	euro: euro,
	pound: pound,
	money_with_wings: money_with_wings,
	chart: chart,
	seat: seat,
	computer: computer,
	briefcase: briefcase,
	minidisc: minidisc,
	floppy_disk: floppy_disk,
	cd: cd,
	dvd: dvd,
	file_folder: file_folder,
	open_file_folder: open_file_folder,
	page_with_curl: page_with_curl,
	page_facing_up: page_facing_up,
	date: date,
	calendar: calendar,
	card_index: card_index,
	chart_with_upwards_trend: chart_with_upwards_trend,
	chart_with_downwards_trend: chart_with_downwards_trend,
	bar_chart: bar_chart,
	clipboard: clipboard,
	pushpin: pushpin,
	round_pushpin: round_pushpin,
	paperclip: paperclip,
	straight_ruler: straight_ruler,
	triangular_ruler: triangular_ruler,
	bookmark_tabs: bookmark_tabs,
	ledger: ledger,
	notebook: notebook,
	notebook_with_decorative_cover: notebook_with_decorative_cover,
	closed_book: closed_book,
	book: book,
	open_book: open_book,
	green_book: green_book,
	blue_book: blue_book,
	orange_book: orange_book,
	books: books,
	name_badge: name_badge,
	scroll: scroll,
	memo: memo,
	pencil: pencil,
	telephone_receiver: telephone_receiver,
	pager: pager,
	fax: fax,
	satellite_antenna: satellite_antenna,
	loudspeaker: loudspeaker,
	mega: mega,
	outbox_tray: outbox_tray,
	inbox_tray: inbox_tray,
	"package": "📦",
	"e-mail": "📧",
	incoming_envelope: incoming_envelope,
	envelope_with_arrow: envelope_with_arrow,
	mailbox_closed: mailbox_closed,
	mailbox: mailbox,
	mailbox_with_mail: mailbox_with_mail,
	mailbox_with_no_mail: mailbox_with_no_mail,
	postbox: postbox,
	postal_horn: postal_horn,
	newspaper: newspaper,
	iphone: iphone,
	calling: calling,
	vibration_mode: vibration_mode,
	mobile_phone_off: mobile_phone_off,
	no_mobile_phones: no_mobile_phones,
	signal_strength: signal_strength,
	camera: camera,
	camera_with_flash: camera_with_flash,
	video_camera: video_camera,
	tv: tv,
	radio: radio,
	vhs: vhs,
	film_projector: film_projector,
	prayer_beads: prayer_beads,
	twisted_rightwards_arrows: twisted_rightwards_arrows,
	repeat: repeat,
	repeat_one: repeat_one,
	arrows_clockwise: arrows_clockwise,
	arrows_counterclockwise: arrows_counterclockwise,
	low_brightness: low_brightness,
	high_brightness: high_brightness,
	mute: mute,
	speaker: speaker,
	sound: sound,
	loud_sound: loud_sound,
	battery: battery,
	electric_plug: electric_plug,
	mag: mag,
	mag_right: mag_right,
	lock_with_ink_pen: lock_with_ink_pen,
	closed_lock_with_key: closed_lock_with_key,
	key: key,
	lock: lock,
	unlock: unlock,
	bell: bell,
	no_bell: no_bell,
	bookmark: bookmark,
	link: link,
	radio_button: radio_button,
	back: back,
	end: end,
	on: on,
	soon: soon,
	top: top,
	underage: underage,
	keycap_ten: keycap_ten,
	capital_abcd: capital_abcd,
	abcd: abcd,
	symbols: symbols,
	abc: abc,
	fire: fire,
	flashlight: flashlight,
	wrench: wrench,
	hammer: hammer,
	nut_and_bolt: nut_and_bolt,
	hocho: hocho,
	knife: knife,
	gun: gun,
	microscope: microscope,
	telescope: telescope,
	crystal_ball: crystal_ball,
	six_pointed_star: six_pointed_star,
	beginner: beginner,
	trident: trident,
	black_square_button: black_square_button,
	white_square_button: white_square_button,
	red_circle: red_circle,
	large_blue_circle: large_blue_circle,
	large_orange_diamond: large_orange_diamond,
	large_blue_diamond: large_blue_diamond,
	small_orange_diamond: small_orange_diamond,
	small_blue_diamond: small_blue_diamond,
	small_red_triangle: small_red_triangle,
	small_red_triangle_down: small_red_triangle_down,
	arrow_up_small: arrow_up_small,
	arrow_down_small: arrow_down_small,
	om_symbol: om_symbol,
	dove_of_peace: dove_of_peace,
	kaaba: kaaba,
	mosque: mosque,
	synagogue: synagogue,
	menorah_with_nine_branches: menorah_with_nine_branches,
	clock1: clock1,
	clock2: clock2,
	clock3: clock3,
	clock4: clock4,
	clock5: clock5,
	clock6: clock6,
	clock7: clock7,
	clock8: clock8,
	clock9: clock9,
	clock10: clock10,
	clock11: clock11,
	clock12: clock12,
	clock130: clock130,
	clock230: clock230,
	clock330: clock330,
	clock430: clock430,
	clock530: clock530,
	clock630: clock630,
	clock730: clock730,
	clock830: clock830,
	clock930: clock930,
	clock1030: clock1030,
	clock1130: clock1130,
	clock1230: clock1230,
	candle: candle,
	mantelpiece_clock: mantelpiece_clock,
	hole: hole,
	man_in_business_suit_levitating: man_in_business_suit_levitating,
	"female-detective": "🕵️‍♀️",
	"male-detective": "🕵️‍♂️",
	sleuth_or_spy: sleuth_or_spy,
	dark_sunglasses: dark_sunglasses,
	spider: spider,
	spider_web: spider_web,
	joystick: joystick,
	man_dancing: man_dancing,
	linked_paperclips: linked_paperclips,
	lower_left_ballpoint_pen: lower_left_ballpoint_pen,
	lower_left_fountain_pen: lower_left_fountain_pen,
	lower_left_paintbrush: lower_left_paintbrush,
	lower_left_crayon: lower_left_crayon,
	raised_hand_with_fingers_splayed: raised_hand_with_fingers_splayed,
	middle_finger: middle_finger,
	reversed_hand_with_middle_finger_extended: reversed_hand_with_middle_finger_extended,
	"spock-hand": "🖖",
	black_heart: black_heart,
	desktop_computer: desktop_computer,
	printer: printer,
	three_button_mouse: three_button_mouse,
	trackball: trackball,
	frame_with_picture: frame_with_picture,
	card_index_dividers: card_index_dividers,
	card_file_box: card_file_box,
	file_cabinet: file_cabinet,
	wastebasket: wastebasket,
	spiral_note_pad: spiral_note_pad,
	spiral_calendar_pad: spiral_calendar_pad,
	compression: compression,
	old_key: old_key,
	rolled_up_newspaper: rolled_up_newspaper,
	dagger_knife: dagger_knife,
	speaking_head_in_silhouette: speaking_head_in_silhouette,
	left_speech_bubble: left_speech_bubble,
	right_anger_bubble: right_anger_bubble,
	ballot_box_with_ballot: ballot_box_with_ballot,
	world_map: world_map,
	mount_fuji: mount_fuji,
	tokyo_tower: tokyo_tower,
	statue_of_liberty: statue_of_liberty,
	japan: japan,
	moyai: moyai,
	grinning: grinning,
	grin: grin,
	joy: joy,
	smiley: smiley,
	smile: smile,
	sweat_smile: sweat_smile,
	laughing: laughing,
	satisfied: satisfied,
	innocent: innocent,
	smiling_imp: smiling_imp,
	wink: wink,
	blush: blush,
	yum: yum,
	relieved: relieved,
	heart_eyes: heart_eyes,
	sunglasses: sunglasses,
	smirk: smirk,
	neutral_face: neutral_face,
	expressionless: expressionless,
	unamused: unamused,
	sweat: sweat,
	pensive: pensive,
	confused: confused,
	confounded: confounded,
	kissing: kissing,
	kissing_heart: kissing_heart,
	kissing_smiling_eyes: kissing_smiling_eyes,
	kissing_closed_eyes: kissing_closed_eyes,
	stuck_out_tongue: stuck_out_tongue,
	stuck_out_tongue_winking_eye: stuck_out_tongue_winking_eye,
	stuck_out_tongue_closed_eyes: stuck_out_tongue_closed_eyes,
	disappointed: disappointed,
	worried: worried,
	angry: angry,
	rage: rage,
	cry: cry,
	persevere: persevere,
	triumph: triumph,
	disappointed_relieved: disappointed_relieved,
	frowning: frowning,
	anguished: anguished,
	fearful: fearful,
	weary: weary,
	sleepy: sleepy,
	tired_face: tired_face,
	grimacing: grimacing,
	sob: sob,
	face_exhaling: face_exhaling,
	open_mouth: open_mouth,
	hushed: hushed,
	cold_sweat: cold_sweat,
	scream: scream,
	astonished: astonished,
	flushed: flushed,
	sleeping: sleeping,
	face_with_spiral_eyes: face_with_spiral_eyes,
	dizzy_face: dizzy_face,
	face_in_clouds: face_in_clouds,
	no_mouth: no_mouth,
	mask: mask,
	smile_cat: smile_cat,
	joy_cat: joy_cat,
	smiley_cat: smiley_cat,
	heart_eyes_cat: heart_eyes_cat,
	smirk_cat: smirk_cat,
	kissing_cat: kissing_cat,
	pouting_cat: pouting_cat,
	crying_cat_face: crying_cat_face,
	scream_cat: scream_cat,
	slightly_frowning_face: slightly_frowning_face,
	slightly_smiling_face: slightly_smiling_face,
	upside_down_face: upside_down_face,
	face_with_rolling_eyes: face_with_rolling_eyes,
	"woman-gesturing-no": "🙅‍♀️",
	no_good: no_good,
	"man-gesturing-no": "🙅‍♂️",
	"woman-gesturing-ok": "🙆‍♀️",
	ok_woman: ok_woman,
	"man-gesturing-ok": "🙆‍♂️",
	"woman-bowing": "🙇‍♀️",
	"man-bowing": "🙇‍♂️",
	bow: bow,
	see_no_evil: see_no_evil,
	hear_no_evil: hear_no_evil,
	speak_no_evil: speak_no_evil,
	"woman-raising-hand": "🙋‍♀️",
	raising_hand: raising_hand,
	"man-raising-hand": "🙋‍♂️",
	raised_hands: raised_hands,
	"woman-frowning": "🙍‍♀️",
	person_frowning: person_frowning,
	"man-frowning": "🙍‍♂️",
	"woman-pouting": "🙎‍♀️",
	person_with_pouting_face: person_with_pouting_face,
	"man-pouting": "🙎‍♂️",
	pray: pray,
	rocket: rocket,
	helicopter: helicopter,
	steam_locomotive: steam_locomotive,
	railway_car: railway_car,
	bullettrain_side: bullettrain_side,
	bullettrain_front: bullettrain_front,
	train2: train2,
	metro: metro,
	light_rail: light_rail,
	station: station,
	tram: tram,
	train: train,
	bus: bus,
	oncoming_bus: oncoming_bus,
	trolleybus: trolleybus,
	busstop: busstop,
	minibus: minibus,
	ambulance: ambulance,
	fire_engine: fire_engine,
	police_car: police_car,
	oncoming_police_car: oncoming_police_car,
	taxi: taxi,
	oncoming_taxi: oncoming_taxi,
	car: car,
	red_car: red_car,
	oncoming_automobile: oncoming_automobile,
	blue_car: blue_car,
	truck: truck,
	articulated_lorry: articulated_lorry,
	tractor: tractor,
	monorail: monorail,
	mountain_railway: mountain_railway,
	suspension_railway: suspension_railway,
	mountain_cableway: mountain_cableway,
	aerial_tramway: aerial_tramway,
	ship: ship,
	"woman-rowing-boat": "🚣‍♀️",
	"man-rowing-boat": "🚣‍♂️",
	rowboat: rowboat,
	speedboat: speedboat,
	traffic_light: traffic_light,
	vertical_traffic_light: vertical_traffic_light,
	construction: construction,
	rotating_light: rotating_light,
	triangular_flag_on_post: triangular_flag_on_post,
	door: door,
	no_entry_sign: no_entry_sign,
	smoking: smoking,
	no_smoking: no_smoking,
	put_litter_in_its_place: put_litter_in_its_place,
	do_not_litter: do_not_litter,
	potable_water: potable_water,
	"non-potable_water": "🚱",
	bike: bike,
	no_bicycles: no_bicycles,
	"woman-biking": "🚴‍♀️",
	"man-biking": "🚴‍♂️",
	bicyclist: bicyclist,
	"woman-mountain-biking": "🚵‍♀️",
	"man-mountain-biking": "🚵‍♂️",
	mountain_bicyclist: mountain_bicyclist,
	"woman-walking": "🚶‍♀️",
	"man-walking": "🚶‍♂️",
	walking: walking,
	no_pedestrians: no_pedestrians,
	children_crossing: children_crossing,
	mens: mens,
	womens: womens,
	restroom: restroom,
	baby_symbol: baby_symbol,
	toilet: toilet,
	wc: wc,
	shower: shower,
	bath: bath,
	bathtub: bathtub,
	passport_control: passport_control,
	customs: customs,
	baggage_claim: baggage_claim,
	left_luggage: left_luggage,
	couch_and_lamp: couch_and_lamp,
	sleeping_accommodation: sleeping_accommodation,
	shopping_bags: shopping_bags,
	bellhop_bell: bellhop_bell,
	bed: bed,
	place_of_worship: place_of_worship,
	octagonal_sign: octagonal_sign,
	shopping_trolley: shopping_trolley,
	hindu_temple: hindu_temple,
	hut: hut,
	elevator: elevator,
	hammer_and_wrench: hammer_and_wrench,
	shield: shield,
	oil_drum: oil_drum,
	motorway: motorway,
	railway_track: railway_track,
	motor_boat: motor_boat,
	small_airplane: small_airplane,
	airplane_departure: airplane_departure,
	airplane_arriving: airplane_arriving,
	satellite: satellite,
	passenger_ship: passenger_ship,
	scooter: scooter,
	motor_scooter: motor_scooter,
	canoe: canoe,
	sled: sled,
	flying_saucer: flying_saucer,
	skateboard: skateboard,
	auto_rickshaw: auto_rickshaw,
	pickup_truck: pickup_truck,
	roller_skate: roller_skate,
	large_orange_circle: large_orange_circle,
	large_yellow_circle: large_yellow_circle,
	large_green_circle: large_green_circle,
	large_purple_circle: large_purple_circle,
	large_brown_circle: large_brown_circle,
	large_red_square: large_red_square,
	large_blue_square: large_blue_square,
	large_orange_square: large_orange_square,
	large_yellow_square: large_yellow_square,
	large_green_square: large_green_square,
	large_purple_square: large_purple_square,
	large_brown_square: large_brown_square,
	pinched_fingers: pinched_fingers,
	white_heart: white_heart,
	brown_heart: brown_heart,
	pinching_hand: pinching_hand,
	zipper_mouth_face: zipper_mouth_face,
	money_mouth_face: money_mouth_face,
	face_with_thermometer: face_with_thermometer,
	nerd_face: nerd_face,
	thinking_face: thinking_face,
	face_with_head_bandage: face_with_head_bandage,
	robot_face: robot_face,
	hugging_face: hugging_face,
	the_horns: the_horns,
	sign_of_the_horns: sign_of_the_horns,
	call_me_hand: call_me_hand,
	raised_back_of_hand: raised_back_of_hand,
	"left-facing_fist": "🤛",
	"right-facing_fist": "🤜",
	handshake: handshake,
	crossed_fingers: crossed_fingers,
	hand_with_index_and_middle_fingers_crossed: hand_with_index_and_middle_fingers_crossed,
	i_love_you_hand_sign: i_love_you_hand_sign,
	face_with_cowboy_hat: face_with_cowboy_hat,
	clown_face: clown_face,
	nauseated_face: nauseated_face,
	rolling_on_the_floor_laughing: rolling_on_the_floor_laughing,
	drooling_face: drooling_face,
	lying_face: lying_face,
	"woman-facepalming": "🤦‍♀️",
	"man-facepalming": "🤦‍♂️",
	face_palm: face_palm,
	sneezing_face: sneezing_face,
	face_with_raised_eyebrow: face_with_raised_eyebrow,
	face_with_one_eyebrow_raised: face_with_one_eyebrow_raised,
	"star-struck": "🤩",
	grinning_face_with_star_eyes: grinning_face_with_star_eyes,
	zany_face: zany_face,
	grinning_face_with_one_large_and_one_small_eye: grinning_face_with_one_large_and_one_small_eye,
	shushing_face: shushing_face,
	face_with_finger_covering_closed_lips: face_with_finger_covering_closed_lips,
	face_with_symbols_on_mouth: face_with_symbols_on_mouth,
	serious_face_with_symbols_covering_mouth: serious_face_with_symbols_covering_mouth,
	face_with_hand_over_mouth: face_with_hand_over_mouth,
	smiling_face_with_smiling_eyes_and_hand_covering_mouth: smiling_face_with_smiling_eyes_and_hand_covering_mouth,
	face_vomiting: face_vomiting,
	face_with_open_mouth_vomiting: face_with_open_mouth_vomiting,
	exploding_head: exploding_head,
	shocked_face_with_exploding_head: shocked_face_with_exploding_head,
	pregnant_woman: pregnant_woman,
	"breast-feeding": "🤱",
	palms_up_together: palms_up_together,
	selfie: selfie,
	prince: prince,
	woman_in_tuxedo: woman_in_tuxedo,
	man_in_tuxedo: man_in_tuxedo,
	person_in_tuxedo: person_in_tuxedo,
	mrs_claus: mrs_claus,
	mother_christmas: mother_christmas,
	"woman-shrugging": "🤷‍♀️",
	"man-shrugging": "🤷‍♂️",
	shrug: shrug,
	"woman-cartwheeling": "🤸‍♀️",
	"man-cartwheeling": "🤸‍♂️",
	person_doing_cartwheel: person_doing_cartwheel,
	"woman-juggling": "🤹‍♀️",
	"man-juggling": "🤹‍♂️",
	juggling: juggling,
	fencer: fencer,
	"woman-wrestling": "🤼‍♀️",
	"man-wrestling": "🤼‍♂️",
	wrestlers: wrestlers,
	"woman-playing-water-polo": "🤽‍♀️",
	"man-playing-water-polo": "🤽‍♂️",
	water_polo: water_polo,
	"woman-playing-handball": "🤾‍♀️",
	"man-playing-handball": "🤾‍♂️",
	handball: handball,
	diving_mask: diving_mask,
	wilted_flower: wilted_flower,
	drum_with_drumsticks: drum_with_drumsticks,
	clinking_glasses: clinking_glasses,
	tumbler_glass: tumbler_glass,
	spoon: spoon,
	goal_net: goal_net,
	first_place_medal: first_place_medal,
	second_place_medal: second_place_medal,
	third_place_medal: third_place_medal,
	boxing_glove: boxing_glove,
	martial_arts_uniform: martial_arts_uniform,
	curling_stone: curling_stone,
	lacrosse: lacrosse,
	softball: softball,
	flying_disc: flying_disc,
	croissant: croissant,
	avocado: avocado,
	cucumber: cucumber,
	bacon: bacon,
	potato: potato,
	carrot: carrot,
	baguette_bread: baguette_bread,
	green_salad: green_salad,
	shallow_pan_of_food: shallow_pan_of_food,
	stuffed_flatbread: stuffed_flatbread,
	egg: egg,
	glass_of_milk: glass_of_milk,
	peanuts: peanuts,
	kiwifruit: kiwifruit,
	pancakes: pancakes,
	dumpling: dumpling,
	fortune_cookie: fortune_cookie,
	takeout_box: takeout_box,
	chopsticks: chopsticks,
	bowl_with_spoon: bowl_with_spoon,
	cup_with_straw: cup_with_straw,
	coconut: coconut,
	broccoli: broccoli,
	pie: pie,
	pretzel: pretzel,
	cut_of_meat: cut_of_meat,
	sandwich: sandwich,
	canned_food: canned_food,
	leafy_green: leafy_green,
	mango: mango,
	moon_cake: moon_cake,
	bagel: bagel,
	smiling_face_with_3_hearts: smiling_face_with_3_hearts,
	yawning_face: yawning_face,
	smiling_face_with_tear: smiling_face_with_tear,
	partying_face: partying_face,
	woozy_face: woozy_face,
	hot_face: hot_face,
	cold_face: cold_face,
	ninja: ninja,
	disguised_face: disguised_face,
	pleading_face: pleading_face,
	sari: sari,
	lab_coat: lab_coat,
	goggles: goggles,
	hiking_boot: hiking_boot,
	womans_flat_shoe: womans_flat_shoe,
	crab: crab,
	lion_face: lion_face,
	scorpion: scorpion,
	turkey: turkey,
	unicorn_face: unicorn_face,
	eagle: eagle,
	duck: duck,
	bat: bat,
	shark: shark,
	owl: owl,
	fox_face: fox_face,
	butterfly: butterfly,
	deer: deer,
	gorilla: gorilla,
	lizard: lizard,
	rhinoceros: rhinoceros,
	shrimp: shrimp,
	squid: squid,
	giraffe_face: giraffe_face,
	zebra_face: zebra_face,
	hedgehog: hedgehog,
	sauropod: sauropod,
	"t-rex": "🦖",
	cricket: cricket,
	kangaroo: kangaroo,
	llama: llama,
	peacock: peacock,
	hippopotamus: hippopotamus,
	parrot: parrot,
	raccoon: raccoon,
	lobster: lobster,
	mosquito: mosquito,
	microbe: microbe,
	badger: badger,
	swan: swan,
	mammoth: mammoth,
	dodo: dodo,
	sloth: sloth,
	otter: otter,
	orangutan: orangutan,
	skunk: skunk,
	flamingo: flamingo,
	oyster: oyster,
	beaver: beaver,
	bison: bison,
	seal: seal,
	guide_dog: guide_dog,
	probing_cane: probing_cane,
	bone: bone,
	leg: leg,
	foot: foot,
	tooth: tooth,
	female_superhero: female_superhero,
	male_superhero: male_superhero,
	superhero: superhero,
	female_supervillain: female_supervillain,
	male_supervillain: male_supervillain,
	supervillain: supervillain,
	safety_vest: safety_vest,
	ear_with_hearing_aid: ear_with_hearing_aid,
	motorized_wheelchair: motorized_wheelchair,
	manual_wheelchair: manual_wheelchair,
	mechanical_arm: mechanical_arm,
	mechanical_leg: mechanical_leg,
	cheese_wedge: cheese_wedge,
	cupcake: cupcake,
	salt: salt,
	beverage_box: beverage_box,
	garlic: garlic,
	onion: onion,
	falafel: falafel,
	waffle: waffle,
	butter: butter,
	mate_drink: mate_drink,
	ice_cube: ice_cube,
	bubble_tea: bubble_tea,
	woman_standing: woman_standing,
	man_standing: man_standing,
	standing_person: standing_person,
	woman_kneeling: woman_kneeling,
	man_kneeling: man_kneeling,
	kneeling_person: kneeling_person,
	deaf_woman: deaf_woman,
	deaf_man: deaf_man,
	deaf_person: deaf_person,
	face_with_monocle: face_with_monocle,
	farmer: farmer,
	cook: cook,
	person_feeding_baby: person_feeding_baby,
	mx_claus: mx_claus,
	student: student,
	singer: singer,
	artist: artist,
	teacher: teacher,
	factory_worker: factory_worker,
	technologist: technologist,
	office_worker: office_worker,
	mechanic: mechanic,
	scientist: scientist,
	astronaut: astronaut,
	firefighter: firefighter,
	people_holding_hands: people_holding_hands,
	person_with_probing_cane: person_with_probing_cane,
	red_haired_person: red_haired_person,
	curly_haired_person: curly_haired_person,
	bald_person: bald_person,
	white_haired_person: white_haired_person,
	person_in_motorized_wheelchair: person_in_motorized_wheelchair,
	person_in_manual_wheelchair: person_in_manual_wheelchair,
	health_worker: health_worker,
	judge: judge,
	pilot: pilot,
	adult: adult,
	child: child,
	older_adult: older_adult,
	woman_with_beard: woman_with_beard,
	man_with_beard: man_with_beard,
	bearded_person: bearded_person,
	person_with_headscarf: person_with_headscarf,
	woman_in_steamy_room: woman_in_steamy_room,
	man_in_steamy_room: man_in_steamy_room,
	person_in_steamy_room: person_in_steamy_room,
	woman_climbing: woman_climbing,
	person_climbing: person_climbing,
	man_climbing: man_climbing,
	woman_in_lotus_position: woman_in_lotus_position,
	person_in_lotus_position: person_in_lotus_position,
	man_in_lotus_position: man_in_lotus_position,
	female_mage: female_mage,
	mage: mage,
	male_mage: male_mage,
	female_fairy: female_fairy,
	fairy: fairy,
	male_fairy: male_fairy,
	female_vampire: female_vampire,
	vampire: vampire,
	male_vampire: male_vampire,
	mermaid: mermaid,
	merman: merman,
	merperson: merperson,
	female_elf: female_elf,
	male_elf: male_elf,
	elf: elf,
	female_genie: female_genie,
	male_genie: male_genie,
	genie: genie,
	female_zombie: female_zombie,
	male_zombie: male_zombie,
	zombie: zombie,
	brain: brain,
	orange_heart: orange_heart,
	billed_cap: billed_cap,
	scarf: scarf,
	gloves: gloves,
	coat: coat,
	socks: socks,
	red_envelope: red_envelope,
	firecracker: firecracker,
	jigsaw: jigsaw,
	test_tube: test_tube,
	petri_dish: petri_dish,
	dna: dna,
	compass: compass,
	abacus: abacus,
	fire_extinguisher: fire_extinguisher,
	toolbox: toolbox,
	bricks: bricks,
	magnet: magnet,
	luggage: luggage,
	lotion_bottle: lotion_bottle,
	thread: thread,
	yarn: yarn,
	safety_pin: safety_pin,
	teddy_bear: teddy_bear,
	broom: broom,
	basket: basket,
	roll_of_paper: roll_of_paper,
	soap: soap,
	sponge: sponge,
	receipt: receipt,
	nazar_amulet: nazar_amulet,
	ballet_shoes: ballet_shoes,
	"one-piece_swimsuit": "🩱",
	briefs: briefs,
	shorts: shorts,
	thong_sandal: thong_sandal,
	drop_of_blood: drop_of_blood,
	adhesive_bandage: adhesive_bandage,
	stethoscope: stethoscope,
	"yo-yo": "🪀",
	kite: kite,
	parachute: parachute,
	boomerang: boomerang,
	magic_wand: magic_wand,
	pinata: pinata,
	nesting_dolls: nesting_dolls,
	ringed_planet: ringed_planet,
	chair: chair,
	razor: razor,
	axe: axe,
	diya_lamp: diya_lamp,
	banjo: banjo,
	military_helmet: military_helmet,
	accordion: accordion,
	long_drum: long_drum,
	coin: coin,
	carpentry_saw: carpentry_saw,
	screwdriver: screwdriver,
	ladder: ladder,
	hook: hook,
	mirror: mirror,
	window: window$1,
	plunger: plunger,
	sewing_needle: sewing_needle,
	knot: knot,
	bucket: bucket,
	mouse_trap: mouse_trap,
	toothbrush: toothbrush,
	headstone: headstone,
	placard: placard,
	rock: rock,
	fly: fly,
	worm: worm,
	beetle: beetle,
	cockroach: cockroach,
	potted_plant: potted_plant,
	wood: wood,
	feather: feather,
	anatomical_heart: anatomical_heart,
	lungs: lungs,
	people_hugging: people_hugging,
	blueberries: blueberries,
	bell_pepper: bell_pepper,
	olive: olive,
	flatbread: flatbread,
	tamale: tamale,
	fondue: fondue,
	teapot: teapot,
	bangbang: bangbang,
	interrobang: interrobang,
	tm: tm,
	information_source: information_source,
	left_right_arrow: left_right_arrow,
	arrow_up_down: arrow_up_down,
	arrow_upper_left: arrow_upper_left,
	arrow_upper_right: arrow_upper_right,
	arrow_lower_right: arrow_lower_right,
	arrow_lower_left: arrow_lower_left,
	leftwards_arrow_with_hook: leftwards_arrow_with_hook,
	arrow_right_hook: arrow_right_hook,
	watch: watch,
	hourglass: hourglass,
	keyboard: keyboard,
	eject: eject,
	fast_forward: fast_forward,
	rewind: rewind,
	arrow_double_up: arrow_double_up,
	arrow_double_down: arrow_double_down,
	black_right_pointing_double_triangle_with_vertical_bar: black_right_pointing_double_triangle_with_vertical_bar,
	black_left_pointing_double_triangle_with_vertical_bar: black_left_pointing_double_triangle_with_vertical_bar,
	black_right_pointing_triangle_with_double_vertical_bar: black_right_pointing_triangle_with_double_vertical_bar,
	alarm_clock: alarm_clock,
	stopwatch: stopwatch,
	timer_clock: timer_clock,
	hourglass_flowing_sand: hourglass_flowing_sand,
	double_vertical_bar: double_vertical_bar,
	black_square_for_stop: black_square_for_stop,
	black_circle_for_record: black_circle_for_record,
	m: m,
	black_small_square: black_small_square,
	white_small_square: white_small_square,
	arrow_forward: arrow_forward,
	arrow_backward: arrow_backward,
	white_medium_square: white_medium_square,
	black_medium_square: black_medium_square,
	white_medium_small_square: white_medium_small_square,
	black_medium_small_square: black_medium_small_square,
	sunny: sunny,
	cloud: cloud,
	umbrella: umbrella,
	snowman: snowman,
	comet: comet,
	phone: phone,
	telephone: telephone,
	ballot_box_with_check: ballot_box_with_check,
	shamrock: shamrock,
	point_up: point_up,
	skull_and_crossbones: skull_and_crossbones,
	radioactive_sign: radioactive_sign,
	biohazard_sign: biohazard_sign,
	orthodox_cross: orthodox_cross,
	star_and_crescent: star_and_crescent,
	peace_symbol: peace_symbol,
	yin_yang: yin_yang,
	wheel_of_dharma: wheel_of_dharma,
	white_frowning_face: white_frowning_face,
	relaxed: relaxed,
	female_sign: female_sign,
	male_sign: male_sign,
	gemini: gemini,
	cancer: cancer,
	leo: leo,
	virgo: virgo,
	libra: libra,
	scorpius: scorpius,
	chess_pawn: chess_pawn,
	spades: spades,
	clubs: clubs,
	hearts: hearts,
	diamonds: diamonds,
	hotsprings: hotsprings,
	recycle: recycle,
	infinity: infinity,
	wheelchair: wheelchair,
	hammer_and_pick: hammer_and_pick,
	crossed_swords: crossed_swords,
	medical_symbol: medical_symbol,
	staff_of_aesculapius: staff_of_aesculapius,
	scales: scales,
	alembic: alembic,
	gear: gear,
	atom_symbol: atom_symbol,
	fleur_de_lis: fleur_de_lis,
	warning: warning,
	zap: zap,
	transgender_symbol: transgender_symbol,
	white_circle: white_circle,
	black_circle: black_circle,
	coffin: coffin,
	funeral_urn: funeral_urn,
	soccer: soccer,
	baseball: baseball,
	snowman_without_snow: snowman_without_snow,
	partly_sunny: partly_sunny,
	thunder_cloud_and_rain: thunder_cloud_and_rain,
	ophiuchus: ophiuchus,
	pick: pick,
	helmet_with_white_cross: helmet_with_white_cross,
	chains: chains,
	no_entry: no_entry,
	shinto_shrine: shinto_shrine,
	church: church,
	mountain: mountain,
	umbrella_on_ground: umbrella_on_ground,
	fountain: fountain,
	golf: golf,
	ferry: ferry,
	boat: boat,
	sailboat: sailboat,
	skier: skier,
	ice_skate: ice_skate,
	"woman-bouncing-ball": "⛹️‍♀️",
	"man-bouncing-ball": "⛹️‍♂️",
	person_with_ball: person_with_ball,
	tent: tent,
	fuelpump: fuelpump,
	scissors: scissors,
	airplane: airplane,
	email: email,
	envelope: envelope,
	fist: fist,
	hand: hand,
	raised_hand: raised_hand,
	v: v,
	writing_hand: writing_hand,
	pencil2: pencil2,
	black_nib: black_nib,
	heavy_check_mark: heavy_check_mark,
	heavy_multiplication_x: heavy_multiplication_x,
	latin_cross: latin_cross,
	star_of_david: star_of_david,
	eight_spoked_asterisk: eight_spoked_asterisk,
	eight_pointed_black_star: eight_pointed_black_star,
	snowflake: snowflake,
	sparkle: sparkle,
	x: x,
	negative_squared_cross_mark: negative_squared_cross_mark,
	heavy_heart_exclamation_mark_ornament: heavy_heart_exclamation_mark_ornament,
	heart_on_fire: heart_on_fire,
	mending_heart: mending_heart,
	heart: heart,
	arrow_right: arrow_right,
	curly_loop: curly_loop,
	loop: loop,
	arrow_heading_up: arrow_heading_up,
	arrow_heading_down: arrow_heading_down,
	arrow_left: arrow_left,
	arrow_up: arrow_up,
	arrow_down: arrow_down,
	black_large_square: black_large_square,
	white_large_square: white_large_square,
	star: star,
	o: o,
	wavy_dash: wavy_dash,
	part_alternation_mark: part_alternation_mark,
	congratulations: congratulations,
	secret: secret
};

/*jslint node: true*/

var toArray = toArray_1;
var emojiByName = require$$1;

/**
 * regex to parse emoji in a string - finds emoji, e.g. :coffee:
 */
var emojiNameRegex = /:([a-zA-Z0-9_\-\+]+):/g;

/**
 * regex to trim whitespace
 * use instead of String.prototype.trim() for IE8 support
 */
var trimSpaceRegex = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

/**
 * Removes colons on either side
 * of the string if present
 * @param  {string} str
 * @return {string}
 */
function stripColons (str) {
  var colonIndex = str.indexOf(':');
  if (colonIndex > -1) {
    // :emoji: (http://www.emoji-cheat-sheet.com/)
    if (colonIndex === str.length - 1) {
      str = str.substring(0, colonIndex);
      return stripColons(str);
    } else {
      str = str.substr(colonIndex + 1);
      return stripColons(str);
    }
  }

  return str;
}

/**
 * Adds colons to either side
 * of the string
 * @param {string} str
 * @return {string}
 */
function wrapColons (str) {
  return (typeof str === 'string' && str.length > 0) ? ':' + str + ':' : str;
}

/**
 * Ensure that the word is wrapped in colons
 * by only adding them, if they are not there.
 * @param {string} str
 * @return {string}
 */
function ensureColons (str) {
  return (typeof str === 'string' && str[0] !== ':') ? wrapColons(str) : str;
}

// Non spacing mark, some emoticons have them. It's the 'Variant Form',
// which provides more information so that emoticons can be rendered as
// more colorful graphics. FE0E is a unicode text version, where as FE0F
// should be rendered as a graphical version. The code gracefully degrades.
var NON_SPACING_MARK = String.fromCharCode(65039); // 65039 - '️' - 0xFE0F;
var nonSpacingRegex = new RegExp(NON_SPACING_MARK, 'g');

// Remove the non-spacing-mark from the code, never send a stripped version
// to the client, as it kills graphical emoticons.
function stripNSB (code) {
  return code.replace(nonSpacingRegex, '');
}
// Reversed hash table, where as emojiByName contains a { heart: '❤' }
// dictionary emojiByCode contains { ❤: 'heart' }. The codes are normalized
// to the text version.
var emojiByCode = Object.keys(emojiByName).reduce(function(h,k) {
  h[stripNSB(emojiByName[k])] = k;
  return h;
}, {});

/**
 * Emoji namespace
 */
var Emoji = {
  emoji: emojiByName,
};

/**
 * get emoji code from name. return emoji code back if code is passed in.
 * @param  {string} emoji
 * @return {string}
 */
Emoji._get = function _get (emoji) {
  if (emojiByCode[stripNSB(emoji)]) {
    return emoji;
  } else if (emojiByName.hasOwnProperty(emoji)) {
    return emojiByName[emoji];
  }

  return ensureColons(emoji);
};

/**
 * get emoji code from :emoji: string or name
 * @param  {string} emoji
 * @return {string}
 */
Emoji.get = function get (emoji) {
  emoji = stripColons(emoji);

  return Emoji._get(emoji);
};

/**
 * find the emoji by either code or name
 * @param {string} nameOrCode The emoji to find, either `coffee`, `:coffee:` or `☕`;
 * @return {object}
 */
Emoji.find = function find (nameOrCode) {
  return Emoji.findByName(nameOrCode) || Emoji.findByCode(nameOrCode);
};

/**
 * find the emoji by name
 * @param {string} name The emoji to find either `coffee` or `:coffee:`;
 * @return {object}
 */
Emoji.findByName = function findByName (name) {
  var stripped = stripColons(name);
  var emoji = emojiByName[stripped];

  return emoji ? ({ emoji: emoji, key: stripped }) : undefined;
};

/**
 * find the emoji by code (emoji)
 * @param {string} code The emoji to find; for example `☕` or `☔`
 * @return {object}
 */
Emoji.findByCode = function findByCode (code) {
  var stripped = stripNSB(code);
  var name = emojiByCode[stripped];

  // lookup emoji to ensure the Variant Form is returned
  return name ? ({ emoji: emojiByName[name], key: name }) : undefined;
};


/**
 * Check if an emoji is known by this library
 * @param {string} nameOrCode The emoji to validate, either `coffee`, `:coffee:` or `☕`;
 * @return {object}
 */
Emoji.hasEmoji = function hasEmoji (nameOrCode) {
  return Emoji.hasEmojiByName(nameOrCode) || Emoji.hasEmojiByCode(nameOrCode);
};

/**
 * Check if an emoji with given name is known by this library
 * @param {string} name The emoji to validate either `coffee` or `:coffee:`;
 * @return {object}
 */
Emoji.hasEmojiByName = function hasEmojiByName (name) {
  var result = Emoji.findByName(name);
  return !!result && result.key === stripColons(name);
};

/**
 * Check if a given emoji is known by this library
 * @param {string} code The emoji to validate; for example `☕` or `☔`
 * @return {object}
 */
Emoji.hasEmojiByCode = function hasEmojiByCode (code) {
  var result = Emoji.findByCode(code);
  return !!result && stripNSB(result.emoji) === stripNSB(code);
};

/**
 * get emoji name from code
 * @param  {string} emoji
 * @param  {boolean} includeColons should the result include the ::
 * @return {string}
 */
Emoji.which = function which (emoji_code, includeColons) {
  var code = stripNSB(emoji_code);
  var word = emojiByCode[code];

  return includeColons ? wrapColons(word) : word;
};

/**
 * emojify a string (replace :emoji: with an emoji)
 * @param  {string} str
 * @param  {function} on_missing (gets emoji name without :: and returns a proper emoji if no emoji was found)
 * @param  {function} format (wrap the returned emoji in a custom element)
 * @return {string}
 */
Emoji.emojify = function emojify (str, on_missing, format) {
  if (!str) return '';

  return str.split(emojiNameRegex) // parse emoji via regex
            .map(function parseEmoji(s, i) {
              // every second element is an emoji, e.g. "test :fast_forward:" -> [ "test ", "fast_forward" ]
              if (i % 2 === 0) return s;
              var emoji = Emoji._get(s);
              var isMissing = emoji.indexOf(':') > -1;

              if (isMissing && typeof on_missing === 'function') {
                return on_missing(s);
              }

              if (!isMissing && typeof format === 'function') {
                return format(emoji, s);
              }

              return emoji;
            })
            .join('') // convert back to string
  ;
};

/**
 * return a random emoji
 * @return {string}
 */
Emoji.random = function random () {
  var emojiKeys = Object.keys(emojiByName);
  var randomIndex = Math.floor(Math.random() * emojiKeys.length);
  var key = emojiKeys[randomIndex];
  var emoji = Emoji._get(key);
  return { key: key, emoji: emoji };
};

/**
 *  return an collection of potential emoji matches
 *  @param {string} str
 *  @return {Array.<Object>}
 */
Emoji.search = function search (str) {
  var emojiKeys = Object.keys(emojiByName);
  var matcher = stripColons(str);
  var matchingKeys = emojiKeys.filter(function(key) {
    return key.toString().indexOf(matcher) === 0;
  });
  return matchingKeys.map(function(key) {
    return {
      key: key,
      emoji: Emoji._get(key),
    };
  });
};

/**
 * unemojify a string (replace emoji with :emoji:)
 * @param  {string} str
 * @return {string}
 */
Emoji.unemojify = function unemojify (str) {
  if (!str) return '';
  var words = toArray(str);

  return words.map(function(word) {
    return Emoji.which(word, true) || word;
  }).join('');
};

/**
 * replace emojis with replacement value
 * @param {string} str
 * @param {function|string} the string or callback function to replace the emoji with
 * @param {boolean} should trailing whitespaces be cleaned? Defaults false
 * @return {string}
 */
Emoji.replace = function replace (str, replacement, cleanSpaces) {
  if (!str) return '';

  var replace = typeof replacement === 'function' ? replacement : function() { return replacement; };
  var words = toArray(str);

  var replaced = words.map(function(word, idx) {
    var emoji = Emoji.findByCode(word);

    if (emoji && cleanSpaces && words[idx + 1] === ' ') {
      words[idx + 1] = '';
    }

    return emoji ? replace(emoji) : word;
  }).join('');

  return cleanSpaces ? replaced.replace(trimSpaceRegex, '') : replaced;
};


/**
 * remove all emojis from a string
 * @param {string} str
 * @return {string}
 */
Emoji.strip = function strip (str) {
  return Emoji.replace(str, '', true);
};

var emoji$1 = Emoji;

(function (module) {
	module.exports = emoji$1;
} (nodeEmoji));

const supportsColor$1 = index$1.supportsColor_1;
const hasFlag$1 = index$1.hasFlag;

function parseVersion(versionString) {
	if (/^\d{3,4}$/.test(versionString)) {
		// Env var doesn't always use dots. example: 4601 => 46.1.0
		const m = /(\d{1,2})(\d{2})/.exec(versionString);
		return {
			major: 0,
			minor: parseInt(m[1], 10),
			patch: parseInt(m[2], 10)
		};
	}

	const versions = (versionString || '').split('.').map(n => parseInt(n, 10));
	return {
		major: versions[0],
		minor: versions[1],
		patch: versions[2]
	};
}

function supportsHyperlink(stream) {
	const {env} = process;

	if ('FORCE_HYPERLINK' in env) {
		return !(env.FORCE_HYPERLINK.length > 0 && parseInt(env.FORCE_HYPERLINK, 10) === 0);
	}

	if (hasFlag$1('no-hyperlink') || hasFlag$1('no-hyperlinks') || hasFlag$1('hyperlink=false') || hasFlag$1('hyperlink=never')) {
		return false;
	}

	if (hasFlag$1('hyperlink=true') || hasFlag$1('hyperlink=always')) {
		return true;
	}

	// Netlify does not run a TTY, it does not need `supportsColor` check
	if ('NETLIFY' in env) {
		return true;
	}

	// If they specify no colors, they probably don't want hyperlinks.
	if (!supportsColor$1.supportsColor(stream)) {
		return false;
	}

	if (stream && !stream.isTTY) {
		return false;
	}

	if (process.platform === 'win32') {
		return false;
	}

	if ('CI' in env) {
		return false;
	}

	if ('TEAMCITY_VERSION' in env) {
		return false;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseVersion(env.TERM_PROGRAM_VERSION);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				if (version.major === 3) {
					return version.minor >= 1;
				}

				return version.major > 3;
			case 'WezTerm':
				return version.major >= 20200620;
			case 'vscode':
				return version.major > 1 || version.major === 1 && version.minor >= 72;
			// No default
		}
	}

	if ('VTE_VERSION' in env) {
		// 0.50.0 was supposed to support hyperlinks, but throws a segfault
		if (env.VTE_VERSION === '0.50.0') {
			return false;
		}

		const version = parseVersion(env.VTE_VERSION);
		return version.major > 0 || version.minor >= 50;
	}

	return false;
}

var supportsHyperlinks$1 = {
	supportsHyperlink,
	stdout: supportsHyperlink(process.stdout),
	stderr: supportsHyperlink(process.stderr)
};

var process$1 = process__default["default"];
var os = os__default["default"];
var tty = require$$2__default["default"];
var Table = cliTable3.exports;
var cardinal = cardinal$1;
var emoji = nodeEmoji.exports;
var supportsHyperlinks = supportsHyperlinks$1;

const ANSI_BACKGROUND_OFFSET = 10;

const wrapAnsi16 = (offset = 0) => code => `\u001B[${code + offset}m`;

const wrapAnsi256 = (offset = 0) => code => `\u001B[${38 + offset};5;${code}m`;

const wrapAnsi16m = (offset = 0) => (red, green, blue) => `\u001B[${38 + offset};2;${red};${green};${blue}m`;

const styles$1 = {
	modifier: {
		reset: [0, 0],
		// 21 isn't widely supported and 22 does the same thing
		bold: [1, 22],
		dim: [2, 22],
		italic: [3, 23],
		underline: [4, 24],
		overline: [53, 55],
		inverse: [7, 27],
		hidden: [8, 28],
		strikethrough: [9, 29],
	},
	color: {
		black: [30, 39],
		red: [31, 39],
		green: [32, 39],
		yellow: [33, 39],
		blue: [34, 39],
		magenta: [35, 39],
		cyan: [36, 39],
		white: [37, 39],

		// Bright color
		blackBright: [90, 39],
		gray: [90, 39], // Alias of `blackBright`
		grey: [90, 39], // Alias of `blackBright`
		redBright: [91, 39],
		greenBright: [92, 39],
		yellowBright: [93, 39],
		blueBright: [94, 39],
		magentaBright: [95, 39],
		cyanBright: [96, 39],
		whiteBright: [97, 39],
	},
	bgColor: {
		bgBlack: [40, 49],
		bgRed: [41, 49],
		bgGreen: [42, 49],
		bgYellow: [43, 49],
		bgBlue: [44, 49],
		bgMagenta: [45, 49],
		bgCyan: [46, 49],
		bgWhite: [47, 49],

		// Bright color
		bgBlackBright: [100, 49],
		bgGray: [100, 49], // Alias of `bgBlackBright`
		bgGrey: [100, 49], // Alias of `bgBlackBright`
		bgRedBright: [101, 49],
		bgGreenBright: [102, 49],
		bgYellowBright: [103, 49],
		bgBlueBright: [104, 49],
		bgMagentaBright: [105, 49],
		bgCyanBright: [106, 49],
		bgWhiteBright: [107, 49],
	},
};

Object.keys(styles$1.modifier);
const foregroundColorNames = Object.keys(styles$1.color);
const backgroundColorNames = Object.keys(styles$1.bgColor);
[...foregroundColorNames, ...backgroundColorNames];

function assembleStyles() {
	const codes = new Map();

	for (const [groupName, group] of Object.entries(styles$1)) {
		for (const [styleName, style] of Object.entries(group)) {
			styles$1[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`,
			};

			group[styleName] = styles$1[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles$1, groupName, {
			value: group,
			enumerable: false,
		});
	}

	Object.defineProperty(styles$1, 'codes', {
		value: codes,
		enumerable: false,
	});

	styles$1.color.close = '\u001B[39m';
	styles$1.bgColor.close = '\u001B[49m';

	styles$1.color.ansi = wrapAnsi16();
	styles$1.color.ansi256 = wrapAnsi256();
	styles$1.color.ansi16m = wrapAnsi16m();
	styles$1.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
	styles$1.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
	styles$1.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);

	// From https://github.com/Qix-/color-convert/blob/3f0e0d4e92e235796ccb17f6e85c72094a651f49/conversions.js
	Object.defineProperties(styles$1, {
		rgbToAnsi256: {
			value(red, green, blue) {
				// We use the extended greyscale palette here, with the exception of
				// black and white. normal palette only has 4 greyscale shades.
				if (red === green && green === blue) {
					if (red < 8) {
						return 16;
					}

					if (red > 248) {
						return 231;
					}

					return Math.round(((red - 8) / 247) * 24) + 232;
				}

				return 16
					+ (36 * Math.round(red / 255 * 5))
					+ (6 * Math.round(green / 255 * 5))
					+ Math.round(blue / 255 * 5);
			},
			enumerable: false,
		},
		hexToRgb: {
			value(hex) {
				const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
				if (!matches) {
					return [0, 0, 0];
				}

				let [colorString] = matches;

				if (colorString.length === 3) {
					colorString = [...colorString].map(character => character + character).join('');
				}

				const integer = Number.parseInt(colorString, 16);

				return [
					/* eslint-disable no-bitwise */
					(integer >> 16) & 0xFF,
					(integer >> 8) & 0xFF,
					integer & 0xFF,
					/* eslint-enable no-bitwise */
				];
			},
			enumerable: false,
		},
		hexToAnsi256: {
			value: hex => styles$1.rgbToAnsi256(...styles$1.hexToRgb(hex)),
			enumerable: false,
		},
		ansi256ToAnsi: {
			value(code) {
				if (code < 8) {
					return 30 + code;
				}

				if (code < 16) {
					return 90 + (code - 8);
				}

				let red;
				let green;
				let blue;

				if (code >= 232) {
					red = (((code - 232) * 10) + 8) / 255;
					green = red;
					blue = red;
				} else {
					code -= 16;

					const remainder = code % 36;

					red = Math.floor(code / 36) / 5;
					green = Math.floor(remainder / 6) / 5;
					blue = (remainder % 6) / 5;
				}

				const value = Math.max(red, green, blue) * 2;

				if (value === 0) {
					return 30;
				}

				// eslint-disable-next-line no-bitwise
				let result = 30 + ((Math.round(blue) << 2) | (Math.round(green) << 1) | Math.round(red));

				if (value === 2) {
					result += 60;
				}

				return result;
			},
			enumerable: false,
		},
		rgbToAnsi: {
			value: (red, green, blue) => styles$1.ansi256ToAnsi(styles$1.rgbToAnsi256(red, green, blue)),
			enumerable: false,
		},
		hexToAnsi: {
			value: hex => styles$1.ansi256ToAnsi(styles$1.hexToAnsi256(hex)),
			enumerable: false,
		},
	});

	return styles$1;
}

const ansiStyles = assembleStyles();

// From: https://github.com/sindresorhus/has-flag/blob/main/index.js
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process$1.argv) {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}

const {env} = process$1;

let flagForceColor;
if (
	hasFlag('no-color')
	|| hasFlag('no-colors')
	|| hasFlag('color=false')
	|| hasFlag('color=never')
) {
	flagForceColor = 0;
} else if (
	hasFlag('color')
	|| hasFlag('colors')
	|| hasFlag('color=true')
	|| hasFlag('color=always')
) {
	flagForceColor = 1;
}

function envForceColor() {
	if ('FORCE_COLOR' in env) {
		if (env.FORCE_COLOR === 'true') {
			return 1;
		}

		if (env.FORCE_COLOR === 'false') {
			return 0;
		}

		return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3,
	};
}

function _supportsColor(haveStream, {streamIsTTY, sniffFlags = true} = {}) {
	const noFlagForceColor = envForceColor();
	if (noFlagForceColor !== undefined) {
		flagForceColor = noFlagForceColor;
	}

	const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;

	if (forceColor === 0) {
		return 0;
	}

	if (sniffFlags) {
		if (hasFlag('color=16m')
			|| hasFlag('color=full')
			|| hasFlag('color=truecolor')) {
			return 3;
		}

		if (hasFlag('color=256')) {
			return 2;
		}
	}

	// Check for Azure DevOps pipelines.
	// Has to be above the `!streamIsTTY` check.
	if ('TF_BUILD' in env && 'AGENT_NAME' in env) {
		return 1;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process$1.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10
			&& Number(osRelease[2]) >= 10_586
		) {
			return Number(osRelease[2]) >= 14_931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if ('GITHUB_ACTIONS' in env) {
			return 3;
		}

		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'BUILDKITE', 'DRONE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if (env.TERM === 'xterm-kitty') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = Number.parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app': {
				return version >= 3 ? 3 : 2;
			}

			case 'Apple_Terminal': {
				return 2;
			}
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function createSupportsColor(stream, options = {}) {
	const level = _supportsColor(stream, {
		streamIsTTY: stream && stream.isTTY,
		...options,
	});

	return translateLevel(level);
}

const supportsColor = {
	stdout: createSupportsColor({isTTY: tty.isatty(1)}),
	stderr: createSupportsColor({isTTY: tty.isatty(2)}),
};

// TODO: When targeting Node.js 16, use `String.prototype.replaceAll`.
function stringReplaceAll(string, substring, replacer) {
	let index = string.indexOf(substring);
	if (index === -1) {
		return string;
	}

	const substringLength = substring.length;
	let endIndex = 0;
	let returnValue = '';
	do {
		returnValue += string.slice(endIndex, index) + substring + replacer;
		endIndex = index + substringLength;
		index = string.indexOf(substring, endIndex);
	} while (index !== -1);

	returnValue += string.slice(endIndex);
	return returnValue;
}

function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
	let endIndex = 0;
	let returnValue = '';
	do {
		const gotCR = string[index - 1] === '\r';
		returnValue += string.slice(endIndex, (gotCR ? index - 1 : index)) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
		endIndex = index + 1;
		index = string.indexOf('\n', endIndex);
	} while (index !== -1);

	returnValue += string.slice(endIndex);
	return returnValue;
}

const {stdout: stdoutColor, stderr: stderrColor} = supportsColor;

const GENERATOR = Symbol('GENERATOR');
const STYLER = Symbol('STYLER');
const IS_EMPTY = Symbol('IS_EMPTY');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
	'ansi',
	'ansi',
	'ansi256',
	'ansi16m',
];

const styles = Object.create(null);

const applyOptions = (object, options = {}) => {
	if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
		throw new Error('The `level` option should be an integer from 0 to 3');
	}

	// Detect level if not set manually
	const colorLevel = stdoutColor ? stdoutColor.level : 0;
	object.level = options.level === undefined ? colorLevel : options.level;
};

const chalkFactory = options => {
	const chalk = (...strings) => strings.join(' ');
	applyOptions(chalk, options);

	Object.setPrototypeOf(chalk, createChalk.prototype);

	return chalk;
};

function createChalk(options) {
	return chalkFactory(options);
}

Object.setPrototypeOf(createChalk.prototype, Function.prototype);

for (const [styleName, style] of Object.entries(ansiStyles)) {
	styles[styleName] = {
		get() {
			const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
			Object.defineProperty(this, styleName, {value: builder});
			return builder;
		},
	};
}

styles.visible = {
	get() {
		const builder = createBuilder(this, this[STYLER], true);
		Object.defineProperty(this, 'visible', {value: builder});
		return builder;
	},
};

const getModelAnsi = (model, level, type, ...arguments_) => {
	if (model === 'rgb') {
		if (level === 'ansi16m') {
			return ansiStyles[type].ansi16m(...arguments_);
		}

		if (level === 'ansi256') {
			return ansiStyles[type].ansi256(ansiStyles.rgbToAnsi256(...arguments_));
		}

		return ansiStyles[type].ansi(ansiStyles.rgbToAnsi(...arguments_));
	}

	if (model === 'hex') {
		return getModelAnsi('rgb', level, type, ...ansiStyles.hexToRgb(...arguments_));
	}

	return ansiStyles[type][model](...arguments_);
};

const usedModels = ['rgb', 'hex', 'ansi256'];

for (const model of usedModels) {
	styles[model] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(getModelAnsi(model, levelMapping[level], 'color', ...arguments_), ansiStyles.color.close, this[STYLER]);
				return createBuilder(this, styler, this[IS_EMPTY]);
			};
		},
	};

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const {level} = this;
			return function (...arguments_) {
				const styler = createStyler(getModelAnsi(model, levelMapping[level], 'bgColor', ...arguments_), ansiStyles.bgColor.close, this[STYLER]);
				return createBuilder(this, styler, this[IS_EMPTY]);
			};
		},
	};
}

const proto = Object.defineProperties(() => {}, {
	...styles,
	level: {
		enumerable: true,
		get() {
			return this[GENERATOR].level;
		},
		set(level) {
			this[GENERATOR].level = level;
		},
	},
});

const createStyler = (open, close, parent) => {
	let openAll;
	let closeAll;
	if (parent === undefined) {
		openAll = open;
		closeAll = close;
	} else {
		openAll = parent.openAll + open;
		closeAll = close + parent.closeAll;
	}

	return {
		open,
		close,
		openAll,
		closeAll,
		parent,
	};
};

const createBuilder = (self, _styler, _isEmpty) => {
	// Single argument is hot path, implicit coercion is faster than anything
	// eslint-disable-next-line no-implicit-coercion
	const builder = (...arguments_) => applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));

	// We alter the prototype because we must return a function, but there is
	// no way to create a function with a different prototype
	Object.setPrototypeOf(builder, proto);

	builder[GENERATOR] = self;
	builder[STYLER] = _styler;
	builder[IS_EMPTY] = _isEmpty;

	return builder;
};

const applyStyle = (self, string) => {
	if (self.level <= 0 || !string) {
		return self[IS_EMPTY] ? '' : string;
	}

	let styler = self[STYLER];

	if (styler === undefined) {
		return string;
	}

	const {openAll, closeAll} = styler;
	if (string.includes('\u001B')) {
		while (styler !== undefined) {
			// Replace any instances already present with a re-opening code
			// otherwise only the part of the string until said closing code
			// will be colored, and the rest will simply be 'plain'.
			string = stringReplaceAll(string, styler.close, styler.open);

			styler = styler.parent;
		}
	}

	// We can move both next actions out of loop, because remaining actions in loop won't have
	// any/visible effect on parts we add here. Close the styling before a linebreak and reopen
	// after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
	const lfIndex = string.indexOf('\n');
	if (lfIndex !== -1) {
		string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
	}

	return openAll + string + closeAll;
};

Object.defineProperties(createChalk.prototype, styles);

const chalk = createChalk();
createChalk({level: stderrColor ? stderrColor.level : 0});

const ESC = '\u001B[';
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';

/* global window */
const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

const isTerminalApp = !isBrowser && process$1.env.TERM_PROGRAM === 'Apple_Terminal';
const isWindows = !isBrowser && process$1.platform === 'win32';
const cwdFunction = isBrowser ? () => {
	throw new Error('`process.cwd()` only works in Node.js, not the browser.');
} : process$1.cwd;

const ansiEscapes = {};

ansiEscapes.cursorTo = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	if (typeof y !== 'number') {
		return ESC + (x + 1) + 'G';
	}

	return ESC + (y + 1) + SEP + (x + 1) + 'H';
};

ansiEscapes.cursorMove = (x, y) => {
	if (typeof x !== 'number') {
		throw new TypeError('The `x` argument is required');
	}

	let returnValue = '';

	if (x < 0) {
		returnValue += ESC + (-x) + 'D';
	} else if (x > 0) {
		returnValue += ESC + x + 'C';
	}

	if (y < 0) {
		returnValue += ESC + (-y) + 'A';
	} else if (y > 0) {
		returnValue += ESC + y + 'B';
	}

	return returnValue;
};

ansiEscapes.cursorUp = (count = 1) => ESC + count + 'A';
ansiEscapes.cursorDown = (count = 1) => ESC + count + 'B';
ansiEscapes.cursorForward = (count = 1) => ESC + count + 'C';
ansiEscapes.cursorBackward = (count = 1) => ESC + count + 'D';

ansiEscapes.cursorLeft = ESC + 'G';
ansiEscapes.cursorSavePosition = isTerminalApp ? '\u001B7' : ESC + 's';
ansiEscapes.cursorRestorePosition = isTerminalApp ? '\u001B8' : ESC + 'u';
ansiEscapes.cursorGetPosition = ESC + '6n';
ansiEscapes.cursorNextLine = ESC + 'E';
ansiEscapes.cursorPrevLine = ESC + 'F';
ansiEscapes.cursorHide = ESC + '?25l';
ansiEscapes.cursorShow = ESC + '?25h';

ansiEscapes.eraseLines = count => {
	let clear = '';

	for (let i = 0; i < count; i++) {
		clear += ansiEscapes.eraseLine + (i < count - 1 ? ansiEscapes.cursorUp() : '');
	}

	if (count) {
		clear += ansiEscapes.cursorLeft;
	}

	return clear;
};

ansiEscapes.eraseEndLine = ESC + 'K';
ansiEscapes.eraseStartLine = ESC + '1K';
ansiEscapes.eraseLine = ESC + '2K';
ansiEscapes.eraseDown = ESC + 'J';
ansiEscapes.eraseUp = ESC + '1J';
ansiEscapes.eraseScreen = ESC + '2J';
ansiEscapes.scrollUp = ESC + 'S';
ansiEscapes.scrollDown = ESC + 'T';

ansiEscapes.clearScreen = '\u001Bc';

ansiEscapes.clearTerminal = isWindows
	? `${ansiEscapes.eraseScreen}${ESC}0f`
	// 1. Erases the screen (Only done in case `2` is not supported)
	// 2. Erases the whole screen including scrollback buffer
	// 3. Moves cursor to the top-left position
	// More info: https://www.real-world-systems.com/docs/ANSIcode.html
	: `${ansiEscapes.eraseScreen}${ESC}3J${ESC}H`;

ansiEscapes.enterAlternativeScreen = ESC + '?1049h';
ansiEscapes.exitAlternativeScreen = ESC + '?1049l';

ansiEscapes.beep = BEL;

ansiEscapes.link = (text, url) => [
	OSC,
	'8',
	SEP,
	SEP,
	url,
	BEL,
	text,
	OSC,
	'8',
	SEP,
	SEP,
	BEL,
].join('');

ansiEscapes.image = (buffer, options = {}) => {
	let returnValue = `${OSC}1337;File=inline=1`;

	if (options.width) {
		returnValue += `;width=${options.width}`;
	}

	if (options.height) {
		returnValue += `;height=${options.height}`;
	}

	if (options.preserveAspectRatio === false) {
		returnValue += ';preserveAspectRatio=0';
	}

	return returnValue + ':' + buffer.toString('base64') + BEL;
};

ansiEscapes.iTerm = {
	setCwd: (cwd = cwdFunction()) => `${OSC}50;CurrentDir=${cwd}${BEL}`,

	annotation(message, options = {}) {
		let returnValue = `${OSC}1337;`;

		const hasX = typeof options.x !== 'undefined';
		const hasY = typeof options.y !== 'undefined';
		if ((hasX || hasY) && !(hasX && hasY && typeof options.length !== 'undefined')) {
			throw new Error('`x`, `y` and `length` must be defined when `x` or `y` is defined');
		}

		message = message.replace(/\|/g, '');

		returnValue += options.isHidden ? 'AddHiddenAnnotation=' : 'AddAnnotation=';

		if (options.length > 0) {
			returnValue += (
				hasX
					? [message, options.length, options.x, options.y]
					: [options.length, message]
			).join('|');
		} else {
			returnValue += message;
		}

		return returnValue + BEL;
	},
};

var TABLE_CELL_SPLIT = '^*||*^';
var TABLE_ROW_WRAP = '*|*|*|*';
var TABLE_ROW_WRAP_REGEXP = new RegExp(escapeRegExp(TABLE_ROW_WRAP), 'g');

var COLON_REPLACER = '*#COLON|*';
var COLON_REPLACER_REGEXP = new RegExp(escapeRegExp(COLON_REPLACER), 'g');

var TAB_ALLOWED_CHARACTERS = ['\t'];

// HARD_RETURN holds a character sequence used to indicate text has a
// hard (no-reflowing) line break.  Previously \r and \r\n were turned
// into \n in marked's lexer- preprocessing step. So \r is safe to use
// to indicate a hard (non-reflowed) return.
var HARD_RETURN = '\r',
  HARD_RETURN_RE = new RegExp(HARD_RETURN),
  HARD_RETURN_GFM_RE = new RegExp(HARD_RETURN + '|<br />');

var defaultOptions = {
  code: chalk.yellow,
  blockquote: chalk.gray.italic,
  html: chalk.gray,
  heading: chalk.green.bold,
  firstHeading: chalk.magenta.underline.bold,
  hr: chalk.reset,
  listitem: chalk.reset,
  list: list,
  table: chalk.reset,
  paragraph: chalk.reset,
  strong: chalk.bold,
  em: chalk.italic,
  codespan: chalk.yellow,
  del: chalk.dim.gray.strikethrough,
  link: chalk.blue,
  href: chalk.blue.underline,
  text: identity,
  unescape: true,
  emoji: true,
  width: 80,
  showSectionPrefix: true,
  reflowText: false,
  tab: 4,
  tableOptions: {}
};

function Renderer(options, highlightOptions) {
  this.o = Object.assign({}, defaultOptions, options);
  this.tab = sanitizeTab(this.o.tab, defaultOptions.tab);
  this.tableSettings = this.o.tableOptions;
  this.emoji = this.o.emoji ? insertEmojis : identity;
  this.unescape = this.o.unescape ? unescapeEntities : identity;
  this.highlightOptions = highlightOptions || {};

  this.transform = compose(undoColon, this.unescape, this.emoji);
}

// Compute length of str not including ANSI escape codes.
// See http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
function textLength(str) {
  return str.replace(/\u001b\[(?:\d{1,3})(?:;\d{1,3})*m/g, '').length;
}

Renderer.prototype.textLength = textLength;

function fixHardReturn(text, reflow) {
  return reflow ? text.replace(HARD_RETURN, /\n/g) : text;
}

Renderer.prototype.text = function (text) {
  return this.o.text(text);
};

Renderer.prototype.code = function (code, lang, escaped) {
  return section(
    indentify(this.tab, highlight(code, lang, this.o, this.highlightOptions))
  );
};

Renderer.prototype.blockquote = function (quote) {
  return section(this.o.blockquote(indentify(this.tab, quote.trim())));
};

Renderer.prototype.html = function (html) {
  return this.o.html(html);
};

Renderer.prototype.heading = function (text, level, raw) {
  text = this.transform(text);

  var prefix = this.o.showSectionPrefix
    ? new Array(level + 1).join('#') + ' '
    : '';
  text = prefix + text;
  if (this.o.reflowText) {
    text = reflowText(text, this.o.width, this.options.gfm);
  }
  return section(
    level === 1 ? this.o.firstHeading(text) : this.o.heading(text)
  );
};

Renderer.prototype.hr = function () {
  return section(this.o.hr(hr('-', this.o.reflowText && this.o.width)));
};

Renderer.prototype.list = function (body, ordered) {
  body = this.o.list(body, ordered, this.tab);
  return section(fixNestedLists(indentLines(this.tab, body), this.tab));
};

Renderer.prototype.listitem = function (text) {
  var transform = compose(this.o.listitem, this.transform);
  var isNested = text.indexOf('\n') !== -1;
  if (isNested) text = text.trim();

  // Use BULLET_POINT as a marker for ordered or unordered list item
  return '\n' + BULLET_POINT + transform(text);
};

Renderer.prototype.checkbox = function (checked) {
  return '[' + (checked ? 'X' : ' ') + '] ';
};

Renderer.prototype.paragraph = function (text) {
  var transform = compose(this.o.paragraph, this.transform);
  text = transform(text);
  if (this.o.reflowText) {
    text = reflowText(text, this.o.width, this.options.gfm);
  }
  return section(text);
};

Renderer.prototype.table = function (header, body) {
  var table = new Table(
    Object.assign(
      {},
      {
        head: generateTableRow(header)[0]
      },
      this.tableSettings
    )
  );

  generateTableRow(body, this.transform).forEach(function (row) {
    table.push(row);
  });
  return section(this.o.table(table.toString()));
};

Renderer.prototype.tablerow = function (content) {
  return TABLE_ROW_WRAP + content + TABLE_ROW_WRAP + '\n';
};

Renderer.prototype.tablecell = function (content, flags) {
  return content + TABLE_CELL_SPLIT;
};

// span level renderer
Renderer.prototype.strong = function (text) {
  return this.o.strong(text);
};

Renderer.prototype.em = function (text) {
  text = fixHardReturn(text, this.o.reflowText);
  return this.o.em(text);
};

Renderer.prototype.codespan = function (text) {
  text = fixHardReturn(text, this.o.reflowText);
  return this.o.codespan(text.replace(/:/g, COLON_REPLACER));
};

Renderer.prototype.br = function () {
  return this.o.reflowText ? HARD_RETURN : '\n';
};

Renderer.prototype.del = function (text) {
  return this.o.del(text);
};

Renderer.prototype.link = function (href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0) {
      return '';
    }
  }

  var hasText = text && text !== href;

  var out = '';

  if (supportsHyperlinks.stdout) {
    let link = '';
    if (text) {
      link = this.o.href(this.emoji(text));
    } else {
      link = this.o.href(href);
    }
    out = ansiEscapes.link(link, href);
  } else {
    if (hasText) out += this.emoji(text) + ' (';
    out += this.o.href(href);
    if (hasText) out += ')';
  }
  return this.o.link(out);
};

Renderer.prototype.image = function (href, title, text) {
  if (typeof this.o.image === 'function') {
    return this.o.image(href, title, text);
  }
  var out = '![' + text;
  if (title) out += ' – ' + title;
  return out + '](' + href + ')\n';
};

// Munge \n's and spaces in "text" so that the number of
// characters between \n's is less than or equal to "width".
function reflowText(text, width, gfm) {
  // Hard break was inserted by Renderer.prototype.br or is
  // <br /> when gfm is true
  var splitRe = gfm ? HARD_RETURN_GFM_RE : HARD_RETURN_RE,
    sections = text.split(splitRe),
    reflowed = [];

  sections.forEach(function (section) {
    // Split the section by escape codes so that we can
    // deal with them separately.
    var fragments = section.split(/(\u001b\[(?:\d{1,3})(?:;\d{1,3})*m)/g);
    var column = 0;
    var currentLine = '';
    var lastWasEscapeChar = false;

    while (fragments.length) {
      var fragment = fragments[0];

      if (fragment === '') {
        fragments.splice(0, 1);
        lastWasEscapeChar = false;
        continue;
      }

      // This is an escape code - leave it whole and
      // move to the next fragment.
      if (!textLength(fragment)) {
        currentLine += fragment;
        fragments.splice(0, 1);
        lastWasEscapeChar = true;
        continue;
      }

      var words = fragment.split(/[ \t\n]+/);

      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var addSpace = column != 0;
        if (lastWasEscapeChar) addSpace = false;

        // If adding the new word overflows the required width
        if (column + word.length + addSpace > width) {
          if (word.length <= width) {
            // If the new word is smaller than the required width
            // just add it at the beginning of a new line
            reflowed.push(currentLine);
            currentLine = word;
            column = word.length;
          } else {
            // If the new word is longer than the required width
            // split this word into smaller parts.
            var w = word.substr(0, width - column - addSpace);
            if (addSpace) currentLine += ' ';
            currentLine += w;
            reflowed.push(currentLine);
            currentLine = '';
            column = 0;

            word = word.substr(w.length);
            while (word.length) {
              var w = word.substr(0, width);

              if (!w.length) break;

              if (w.length < width) {
                currentLine = w;
                column = w.length;
                break;
              } else {
                reflowed.push(w);
                word = word.substr(width);
              }
            }
          }
        } else {
          if (addSpace) {
            currentLine += ' ';
            column++;
          }

          currentLine += word;
          column += word.length;
        }

        lastWasEscapeChar = false;
      }

      fragments.splice(0, 1);
    }

    if (textLength(currentLine)) reflowed.push(currentLine);
  });

  return reflowed.join('\n');
}

function indentLines(indent, text) {
  return text.replace(/(^|\n)(.+)/g, '$1' + indent + '$2');
}

function indentify(indent, text) {
  if (!text) return text;
  return indent + text.split('\n').join('\n' + indent);
}

var BULLET_POINT_REGEX = '\\*';
var NUMBERED_POINT_REGEX = '\\d+\\.';
var POINT_REGEX =
  '(?:' + [BULLET_POINT_REGEX, NUMBERED_POINT_REGEX].join('|') + ')';

// Prevents nested lists from joining their parent list's last line
function fixNestedLists(body, indent) {
  var regex = new RegExp(
    '' +
      '(\\S(?: |  )?)' + // Last char of current point, plus one or two spaces
      // to allow trailing spaces
      '((?:' +
      indent +
      ')+)' + // Indentation of sub point
      '(' +
      POINT_REGEX +
      '(?:.*)+)$',
    'gm'
  ); // Body of subpoint
  return body.replace(regex, '$1\n' + indent + '$2$3');
}

var isPointedLine = function (line, indent) {
  return line.match('^(?:' + indent + ')*' + POINT_REGEX);
};

function toSpaces(str) {
  return ' '.repeat(str.length);
}

var BULLET_POINT = '* ';
function bulletPointLine(indent, line) {
  return isPointedLine(line, indent) ? line : toSpaces(BULLET_POINT) + line;
}

function bulletPointLines(lines, indent) {
  var transform = bulletPointLine.bind(null, indent);
  return lines.split('\n').filter(identity).map(transform).join('\n');
}

var numberedPoint = function (n) {
  return n + '. ';
};
function numberedLine(indent, line, num) {
  return isPointedLine(line, indent)
    ? {
        num: num + 1,
        line: line.replace(BULLET_POINT, numberedPoint(num + 1))
      }
    : {
        num: num,
        line: toSpaces(numberedPoint(num)) + line
      };
}

function numberedLines(lines, indent) {
  var transform = numberedLine.bind(null, indent);
  let num = 0;
  return lines
    .split('\n')
    .filter(identity)
    .map((line) => {
      const numbered = transform(line, num);
      num = numbered.num;

      return numbered.line;
    })
    .join('\n');
}

function list(body, ordered, indent) {
  body = body.trim();
  body = ordered ? numberedLines(body, indent) : bulletPointLines(body, indent);
  return body;
}

function section(text) {
  return text + '\n\n';
}

function highlight(code, lang, opts, hightlightOpts) {
  if (chalk.level === 0) return code;

  var style = opts.code;

  code = fixHardReturn(code, opts.reflowText);
  if (lang !== 'javascript' && lang !== 'js') {
    return style(code);
  }

  try {
    return cardinal.highlight(code, hightlightOpts);
  } catch (e) {
    return style(code);
  }
}

function insertEmojis(text) {
  return text.replace(/:([A-Za-z0-9_\-\+]+?):/g, function (emojiString) {
    var emojiSign = emoji.get(emojiString);
    if (!emojiSign) return emojiString;
    return emojiSign + ' ';
  });
}

function hr(inputHrStr, length) {
  length = length || process.stdout.columns;
  return new Array(length).join(inputHrStr);
}

function undoColon(str) {
  return str.replace(COLON_REPLACER_REGEXP, ':');
}

function generateTableRow(text, escape) {
  if (!text) return [];
  escape = escape || identity;
  var lines = escape(text).split('\n');

  var data = [];
  lines.forEach(function (line) {
    if (!line) return;
    var parsed = line
      .replace(TABLE_ROW_WRAP_REGEXP, '')
      .split(TABLE_CELL_SPLIT);

    data.push(parsed.splice(0, parsed.length - 1));
  });
  return data;
}

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function unescapeEntities(html) {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function identity(str) {
  return str;
}

function compose() {
  var funcs = arguments;
  return function () {
    var args = arguments;
    for (var i = funcs.length; i-- > 0; ) {
      args = [funcs[i].apply(this, args)];
    }
    return args[0];
  };
}

function isAllowedTabString(string) {
  return TAB_ALLOWED_CHARACTERS.some(function (char) {
    return string.match('^(' + char + ')+$');
  });
}

function sanitizeTab(tab, fallbackTab) {
  if (typeof tab === 'number') {
    return new Array(tab + 1).join(' ');
  } else if (typeof tab === 'string' && isAllowedTabString(tab)) {
    return tab;
  } else {
    return new Array(fallbackTab + 1).join(' ');
  }
}

var markedTerminal = Renderer;

const index = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  'default': markedTerminal
}, [markedTerminal]);

exports.index = index;
