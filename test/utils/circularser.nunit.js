/*! copyright gerd forstmann, all rights reserved */
//var debug = require('debug')('utils.nunit');
var process = require('process');
var root = (process.env.FSD_COVERAGE) ? '../../js_cov' : '../../js';

var CircularSer = require(root + '/utils/circularser.js');

// test to serialize object structure,
// including regexp



var circular = require('circular-json');

'use strict';



/**
 * Unit test for sth
 */
exports.testCircular = function (test) {
  'use strict';
  var  a = { a :  1};
  var b = { a: 2 };


  var obj = {
    arr : [a,a,b,{ a: 1}],
    'b' : { a : a, b : {a: 1 } },
    circ : [a, b]
  };

  obj.circ[4] = obj.circ;

  //console.log(JSON.stringify(obj.arr));
  test.equal(obj.arr[0] == obj.arr[1],true,' 1 arr ref ok');
  test.equal(obj.arr[0] !== obj.arr[3],true,' 2 same ref 2');
  test.equal(obj.circ === obj.circ[4], true,' 3 same cir ref');

  var s = circular.stringify(obj);
  //console.log(s + '\n');
  obj = circular.parse(s);
  test.equal(obj.arr[0] == obj.arr[1],true,' 1 arr ref ok');
  test.equal(obj.arr[0] !== obj.arr[3],true,' 2 same ref 2');
  test.equal(obj.circ === obj.circ[4],true,' 3 same cir ref');

  test.done();
};




/**
 * Unit test for sth
 */
exports.testCircularSer = function (test) {
  'use strict';
  var  a = { a :  1};
  var b = { a: 2 };


  var obj = {
    arr : [a,a,b,{ a: 1}],
    'b' : { a : a, b : {a: 1 } },
    circ : [a, b],
    b1 : /a(b+)c/gi
  };

  obj.circ[4] = obj.circ;

  //console.log(JSON.stringify(obj.arr));
  test.equal(obj.arr[0] == obj.arr[1],true,' 1 arr ref ok');
  test.equal(obj.arr[0] !== obj.arr[3],true,' 2 same ref 2');
  test.equal(obj.circ === obj.circ[4], true,' 3 same cir ref');
  test.deepEqual(obj.b1.exec('efAbbc')[1], 'bb',' regex ame cir ref');


  var s = CircularSer.stringify(obj);
  //console.log(s + '\n');
  obj = CircularSer.parse(s);
  test.equal(obj.arr[0] == obj.arr[1],true,' 1 arr ref ok');
  test.equal(obj.arr[0] !== obj.arr[3],true,' 2 same ref 2');
  test.equal(obj.circ === obj.circ[4],true,' 3 same cir ref');
  test.deepEqual(obj.b1.exec('efAbbc')[1], 'bb',' regex ame cir ref');

  test.done();
};






/**
 * Unit test for sth
 */
exports.testCircularSerNoJSON = function (test) {
  'use strict';
  var a = '{     aa';

  var res = CircularSer.parse(a);
  test.equal(res,undefined);
  test.done();
};


/**
 * Unit test for sth
 */
exports.testCircularSerWrite = function (test) {
  'use strict';
  var  a = { a :  1};
  var b = { a: 2 };


  var obj = {
    arr : [a,a,b,{ a: 1}],
    'b' : { a : a, b : {a: 1 } },
    circ : [a, b],
    b1 : /a(b+)c/gi
  };

  obj.circ[4] = obj.circ;

  //console.log(JSON.stringify(obj.arr));
  test.equal(obj.arr[0] == obj.arr[1],true,' 1 arr ref ok');
  test.equal(obj.arr[0] !== obj.arr[3],true,' 2 same ref 2');
  test.equal(obj.circ === obj.circ[4], true,' 3 same cir ref');
  test.deepEqual(obj.b1.exec('efAbbc')[1], 'bb',' regex ame cir ref');

  var res = CircularSer.load('abc.def');
  test.deepEqual(res, undefined, 'nonexistent file');
  CircularSer.save('tmp.json', obj);

  obj = CircularSer.load('tmp.json');

  //var s = CircularSer.stringify(obj);
  //console.log(s + '\n');
  //obj = CircularSer.parse(s);
  test.equal(obj.arr[0] == obj.arr[1],true,' 1 arr ref ok');
  test.equal(obj.arr[0] !== obj.arr[3],true,' 2 same ref 2');
  test.equal(obj.circ === obj.circ[4],true,' 3 same cir ref');
  test.deepEqual(obj.b1.exec('efAbbc')[1], 'bb',' regex ame cir ref');

  test.done();
};