/*! copyright gerd forstmann, all rights reserved */
//var debug = require('debug')('utils.nunit');
var process = require('process');
var root = (process.env.FSD_COVERAGE) ? '../../js_cov' : '../../js';

var utils = require(root + '/utils/utils.js');

'use strict';
/**
 * Unit test for sth
 */
exports.testdeepFreeze = function (test) {
  'use strict';
  test.expect(3);
  var u;
  u = { a: 1 , b : [], c : undefined,
    d : { dd : 1, dd2: 2}
  };
  utils.deepFreeze(u);

  try {
    delete u.d.dd2;
    test.ok(false);
  } catch(ex) {
    test.ok(true, 'cannot alter');
  }
  try {
    u.a = 5;
    test.ok(false);
  } catch(ex) {
    test.ok(true, 'cannot alter');
  }
  try {
    u.next = 5;
    test.ok(false);
  } catch(ex) {
    test.ok(true, 'cannot alter');
  }
  test.done();
};

exports.testStripQuotes = function(test) {
  var u = utils.stripQuotes('"abc"');
  test.equal(u,'abc');
  var u2 = utils.stripQuotes('abc');
  test.equal(u2,'abc');
  var u3 = utils.stripQuotes('"abc');
  test.equal(u3,'"abc');
  var u4 = utils.stripQuotes('abc"');
  test.equal(u4,'abc"');
  test.done();
};

/**
 * Unit test for sth
 */
exports.testCloneDeep = function (test) {
  'use strict';
  var u;
  u = { a: 1 , b : [], c : undefined,
    d : { dd : 1, dd2: 2}
  };

  var u2 = utils.cloneDeep(u);

  u.d.dd = 2;
  test.equal(u2.d.dd,1);
  test.equal(u.d.dd,2);
  test.done();
};

/**
 * Unit test for sth
 */
exports.testCloneDeepProtox = function (test) {
  'use strict';
  var u;
  function Abc() {
    this.x = 1;
  }
  Abc.prototype.amethod = function() {
    return this.x*2;
  };
  var j = new Abc();
  j.prototype = {};
  u = { a: 1 , b : [], c : undefined,
    k : j,
    d : { dd : 1, dd2: 2}
  };

  var u2 = utils.cloneDeep(u);

  u.d.dd = 2;
  test.equal(u2.k ===u.k, true, ' what happedn to object');
  test.equal(u2.d.dd,1);
  test.equal(u.d.dd,2);
  test.done();
};





/**
 * Unit test for sth
 */
exports.testCloneDeepPrimitive = function (test) {
  'use strict';
  var u2 = utils.cloneDeep(1);
  test.equal(u2, 1);
  test.equal(utils.cloneDeep(undefined), undefined, 'undefined');
  test.equal(utils.cloneDeep(null), null, 'undefined');
  test.deepEqual(utils.cloneDeep({ a: undefined}), {a: undefined}, 'object with empty property');
  test.deepEqual(utils.cloneDeep([1,2,'a']), [1,2,'a'], 'undefined');
  test.deepEqual(utils.cloneDeep({ a : String('1')}), { a : '1'}, 'undefined');
  var a = new Date();
  test.deepEqual(utils.cloneDeep({ a : a}), { a : a }, 'undefined');
  test.deepEqual(utils.cloneDeep({ a : {}}), { a : {} }, 'undefined');
  test.deepEqual(utils.cloneDeep(new String('abc')), new String('abc'), 'undefined');
  test.deepEqual(utils.cloneDeep(JSON.parse(JSON.stringify({}))), {}, 'undefined');

  test.done();
};

/**
 * Unit test for sth
 */
exports.testSetMinus = function (test) {
  'use strict';
  var u2 = utils.ArrayUtils.setMinus(['A','D', 'B', 'A', 'C'], ['B', 'A']);
  test.deepEqual(u2, ['D', 'C']);
  test.done();
};


/**
 * Unit test for sth
 */
exports.testindexOf = function (test) {
  'use strict';
  // act
  var u1 = utils.ArrayUtils.indexOf('D',['d','D', 'B', 'A', 'C']);
  // check
  test.deepEqual(u1, 1);
  // act
  var u2 = utils.ArrayUtils.indexOf('D',['d','D', 'B', 'A', 'C'], function(a, b) {
    return a.toLowerCase()=== b.toLowerCase();
  });
  // check
  test.deepEqual(u2, 0, 'where is d');

  // act
  var u3 = utils.ArrayUtils.indexOf('Da',['d','D', 'B', 'A', 'C'], function(a, b) {
    return a.toLowerCase()=== b.toLowerCase();
  });
  // check
  test.deepEqual(u3, -1, 'where is Da');
  test.done();
};



exports.testListToQuotedCommaWord = function (test) {
  'use strict';
  var u2 = utils.listToCommaAnd(['A','B']);
  test.deepEqual(u2, 'A and B');
  test.done();
};

exports.testListToQuotedCommaAndQuote = function (test) {
  'use strict';
  var u2 = utils.listToCommaAnd(['A','B']);
  test.deepEqual(u2, 'A and B');
  test.done();
};

exports.testListToQuotedCommae = function (test) {
  'use strict';
  var u2 = utils.listToQuotedCommaAnd(['A','B']);
  test.deepEqual(u2, '"A" and "B"');
  test.done();
};



exports.testListToQuotedCommaOrQuote3 = function (test) {
  'use strict';
  var u2 = utils.listToQuotedCommaOr(['A','B', 'C']);
  test.deepEqual(u2, '"A", "B" or "C"');
  test.done();
};


exports.testListToQuotedCommaOrOne = function (test) {
  'use strict';
  var u2 = utils.listToCommaOr(['A'],'"');
  test.deepEqual(u2, 'A');
  test.done();
};


exports.testListToQuotedCommaOrNone = function (test) {
  'use strict';
  var u2 = utils.listToQuotedCommaOr([]);
  test.deepEqual(u2, '""');
  test.done();
};

exports.testListToQuotedCommaOrNoQuote = function (test) {
  'use strict';
  var u2 = utils.listToCommaOr(['A','B', 'C']);
  test.deepEqual(u2, 'A, B or C');
  test.done();
};
