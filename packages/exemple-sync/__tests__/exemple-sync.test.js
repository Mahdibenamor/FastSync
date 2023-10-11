'use strict';

const exempleSync = require('..');
const assert = require('assert').strict;

assert.strictEqual(exempleSync(), 'Hello from exempleSync');
console.info('exempleSync tests passed');
