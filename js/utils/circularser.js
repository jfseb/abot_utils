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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY3VsYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvY2lyY3VsYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0dBRUc7QUFDSCxZQUFZLENBQUM7O0FBRWIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRXJDLHVCQUF5QjtBQUN6Qiw2QkFBK0I7QUFFL0IsMkJBQTZCO0FBRTdCLElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUd0QyxpQkFBaUIsSUFBYTtJQUMxQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDcEQsMEZBQTBGO0lBQzFGLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0Isd0RBQXdEO0lBQ3ZELE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDYixDQUFDO0FBRUQsbUJBQW1CLENBQU87SUFDdEIsK0ZBQStGO0lBQy9GLENBQUMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUIsK0ZBQStGO0lBQ2pHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzFDLENBQUM7QUFFRCxtRkFBbUY7QUFDbkYsa0JBQWtCLEdBQUcsRUFBRSxLQUFLO0lBQzFCLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxNQUFNLENBQUM7UUFDMUIsTUFBTSxDQUFDLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLElBQUk7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRCxpQkFBaUIsR0FBRyxFQUFFLEtBQUs7SUFD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