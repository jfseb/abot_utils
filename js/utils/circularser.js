/**
 * (c) gerd forstmann 2017
 */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var JSONx = require('circular-json');
var fs = require("fs");
var debug = require("debug");
var zlib = require("zlib");
var debuglog = debug('circularser');
function zipData(data) {
    var r = zlib.deflateSync(Buffer.from(data, 'utf-8'));
    //console.log("here r" + typeof r + " r" + r.length + " to string" + r.toString().length);
    var k = zlib.inflateSync(r);
    //  var k = zlib.inflateSync(Buffer.from(r.toString()));
    return r;
}
function unzipData(r) {
    //console.log("here data  " + typeof r + " r" + r.length + " to string" + r.toString().length);
    r = new Buffer(r, 'binary');
    //console.log("here data  " + typeof r + " r" + r.length + " to string" + r.toString().length);
    return zlib.inflateSync(r).toString();
}
/* this from http://stackoverflow.com/questions/12075927/serialization-of-regexp */
function replacer(key, value) {
    if (value instanceof RegExp)
        return ("__REGEXP " + value.toString());
    else
        return value;
}
function reviver(key, value) {
    if (value && value.toString().indexOf("__REGEXP ") == 0) {
        var m = value.split("__REGEXP ")[1].match(/\/(.*)\/(.*)?/);
        return new RegExp(m[1], m[2] || "");
    }
    else
        return value;
}
//console.logJSON.parse(JSON.stringify(obj, replacer, 2), reviver));
function stringify(obj) {
    var s = JSONx.stringify(obj, replacer);
    return s;
}
exports.stringify = stringify;
function parse(s) {
    var obj;
    try {
        obj = JSONx.parse(s, reviver);
    }
    catch (e) {
        //console.log("here e" + e);
        return undefined;
    }
    return obj;
}
exports.parse = parse;
function save(fn, obj) {
    var s = stringify(obj);
    var u = zipData(s);
    fs.writeFileSync(fn + ".zip", u, 'binary'); // { encoding : 'utf-8'});
}
exports.save = save;
function load(fn) {
    var obj;
    try {
        debuglog("read file " + fn);
        var d = fs.readFileSync(fn + ".zip", 'binary'); // utf-8'); //utf-8');
        debuglog("start unzip : " + (typeof d) + " length ? " + ('' + d).length);
        var s = '' + unzipData(d);
        debuglog('loaded file' + s.length);
        debuglog("end unzip");
        if (global && global.gc) {
            global.gc();
        }
        obj = parse(s);
        if (global && global.gc) {
            global.gc();
        }
        debuglog("end parse");
    }
    catch (e) {
        debuglog('here e :' + e);
        return undefined;
    }
    return obj;
}
exports.load = load;

//# sourceMappingURL=circularser.js.map
