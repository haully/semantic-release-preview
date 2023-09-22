'use strict';

const index = require('./index-27f3aec5.js');

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

var typescriptExports = index.requireTypescript();

const typescript = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	'default': typescriptExports
}, [typescriptExports]);

exports.typescript = typescript;
