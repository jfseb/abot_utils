'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
function deepFreeze(o) {
    if (typeof o === "object") {
        Object.keys(o).forEach(function (sKey) {
            deepFreeze(o[sKey]);
        });
        Object.freeze(o);
    }
}
exports.deepFreeze = deepFreeze;
function listToQuotedCommaWord(list, quote, word) {
    quote = quote || "";
    if (list.length === 0) {
        return quote + quote;
    }
    var base = list.slice(0, list.length - 1).join(quote + ", " + quote);
    if (base) {
        base = quote + base + quote + ' ' + word + ' ' + quote + list[list.length - 1] + quote;
        return base;
    }
    return quote + list[0] + quote;
}
exports.listToQuotedCommaWord = listToQuotedCommaWord;
function listToCommaAnd(list, quote) {
    return listToQuotedCommaWord(list, quote, 'and');
}
exports.listToCommaAnd = listToCommaAnd;
function listToCommaOr(list, quote) {
    return listToQuotedCommaWord(list, '', 'or');
}
exports.listToCommaOr = listToCommaOr;
function listToQuotedCommaAnd(list) {
    return listToQuotedCommaWord(list, '"', 'and');
}
exports.listToQuotedCommaAnd = listToQuotedCommaAnd;
function listToQuotedCommaOr(list) {
    return listToQuotedCommaWord(list, '"', 'or');
}
exports.listToQuotedCommaOr = listToQuotedCommaOr;
function stripQuotes(str) {
    if (str.length > 2 && str.charAt(0) === '"' && str.charAt(str.length - 1) === '"') {
        return str.substring(1, str.length - 1);
    }
    return str;
}
exports.stripQuotes = stripQuotes;
// courtesy of
// http://stackoverflow.com/questions/4459928/how-to-deep-clone-in-javascript
function cloneDeep(item) {
    if (!item) {
        return item;
    } // null, undefined values check
    var types = [Number, String, Boolean], result;
    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function (type) {
        if (item instanceof type) {
            result = type(item);
        }
    });
    if (typeof result == "undefined") {
        if (Object.prototype.toString.call(item) === "[object Array]") {
            result = [];
            item.forEach(function (child, index, array) {
                result[index] = cloneDeep(child);
            });
        }
        else if ((typeof item === 'undefined' ? 'undefined' : typeof item) == "object") {
            // testing that this is DOM
            if (!item.prototype) {
                if (item instanceof Date) {
                    result = new Date(item);
                }
                else {
                    // it is an object literal
                    result = {};
                    for (var i in item) {
                        result[i] = cloneDeep(item[i]);
                    }
                }
            }
            else {
                // depending what you would like here,
                //   // just keep the reference, or create new object
                //   if (false && item.constructor) {
                // would not advice to do that, reason? Read below
                //        result = new item.constructor();
                //    } else {
                result = item;
            }
        }
        else {
            result = item;
        }
    }
    return result;
}
exports.cloneDeep = cloneDeep;
exports.ArrayUtils = {
    indexOf: function (oMember, aArr, fnComp) {
        fnComp = fnComp || function (a, b) { return a === b; };
        var resIndex = -1;
        aArr.every(function (oMemberArr, index) {
            var u = fnComp(oMemberArr, oMember);
            if (u) {
                resIndex = index;
                return false;
            }
            return true;
        });
        return resIndex;
    },
    presentIn: function (oMember, aArr, fnComp) {
        return exports.ArrayUtils.indexOf(oMember, aArr, fnComp) >= 0;
    },
    setMinus: function (aRR1, aRR2, fnComp) {
        fnComp = fnComp || function (a, b) { return a === b; };
        return aRR1.reduce(function (Result, oMember, index) {
            if (!exports.ArrayUtils.presentIn(oMember, aRR2, fnComp) && !exports.ArrayUtils.presentIn(oMember, Result, fnComp)) {
                Result.push(oMember);
            }
            return Result;
        }, []);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOztBQUNiLG9CQUEyQixDQUFPO0lBQ2hDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBUyxJQUFJO1lBQ2xDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQztBQUNILENBQUM7QUFQRCxnQ0FPQztBQUdELCtCQUFzQyxJQUFlLEVBQUUsS0FBYyxFQUFFLElBQVk7SUFDL0UsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7SUFDcEIsRUFBRSxDQUFBLENBQUUsSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2xFLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDTixJQUFJLEdBQUcsS0FBSyxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNyRixNQUFN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