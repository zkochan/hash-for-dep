'use strict';
var path = require('path');
var assert = require('assert');
var getModuleBaseDir = require('../lib/module-base-dir');

describe('moduleBaseDir', function() {
  it('Locates the true root directory for a module', function() {
    var fixturesPath = path.join(__dirname, 'fixtures');
    var moduleName = 'foo';
    var moduleBaseDir = path.join(fixturesPath, 'node_modules', moduleName);

    assert.equal(getModuleBaseDir(moduleBaseDir, moduleName), moduleBaseDir);
    assert.equal(getModuleBaseDir(moduleBaseDir + '/asdf.js', moduleName), moduleBaseDir);
    assert.equal(getModuleBaseDir(moduleBaseDir + '/index.js', moduleName), moduleBaseDir);
    assert.equal(getModuleBaseDir(moduleBaseDir + '/lib/index.js', moduleName), moduleBaseDir);
  });

  it('Handles going up a folder', function() {
    var moduleBaseDir = path.join('broccoli-persistent-filter', 'node_modules', 'hash-for-dep');
    var modulePath = path.join(moduleBaseDir, 'index.js');
    var moduleName = '..';

    var expected = moduleBaseDir;
    var actual = getModuleBaseDir(modulePath, moduleName);

    assert.equal(actual, expected);
  });

  it('Handles separator after module name', function() {
    var moduleBaseDir = path.join('broccoli-persistent-filter', 'node_modules', 'broccoli-kitchen-sink-helpers', 'node_modules', 'glob');
    var modulePath = path.join(moduleBaseDir, 'glob.js');
    var moduleName = 'glob' + path.sep;

    var expected = moduleBaseDir + path.sep;
    var actual = getModuleBaseDir(modulePath, moduleName);

    assert.equal(actual, expected);
  });
});