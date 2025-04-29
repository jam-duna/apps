"use strict";
// Copyright 2017-2025 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/// <reference types="@polkadot/dev-test/globals.d.ts" />
var node_assert_1 = require("node:assert");
var util_1 = require("@polkadot/util");
var index_js_1 = require("./index.js");
var allEndpoints = index_js_1.createWsEndpoints(undefined, false, false);
var INVALID_CHARS = ['%'];
describe('WS urls are all valid', function () {
    var endpoints = allEndpoints
        .filter(function (_a) {
        var value = _a.value;
        return value &&
            util_1.isString(value) &&
            !value.includes('127.0.0.1');
    })
        .map(function (_a) {
        var text = _a.text, textBy = _a.textBy, value = _a.value;
        return ({
            name: text,
            provider: textBy,
            value: value
        });
    });
    var _loop_1 = function (name, provider, value) {
        it(name + ":: " + provider, function () {
            node_assert_1.strict(value.startsWith('wss://') || value.startsWith('light://substrate-connect/'), name + ":: " + provider + " -> " + value + " should start with wss:// or light://");
            node_assert_1.strict(!INVALID_CHARS.some(function (c) { return value.includes(c); }), value + " should not contain invalid characters such as " + INVALID_CHARS.join(', '));
        });
    };
    for (var _i = 0, endpoints_1 = endpoints; _i < endpoints_1.length; _i++) {
        var _a = endpoints_1[_i], name = _a.name, provider = _a.provider, value = _a.value;
        _loop_1(name, provider, value);
    }
});
describe('urls are sorted', function () {
    var hasDevelopment = false;
    var lastHeader = '';
    var filtered = allEndpoints.filter(function (_a) {
        var isHeader = _a.isHeader, text = _a.text;
        hasDevelopment = hasDevelopment || (!!isHeader && text === 'Development');
        return !hasDevelopment;
    });
    filtered.forEach(function (_a, index) {
        var isHeader = _a.isHeader, paraId = _a.paraId, text = _a.text, textBy = _a.textBy;
        if (isHeader) {
            lastHeader = text;
        }
        else {
            it(lastHeader + ":: " + text + ":: " + textBy, function () {
                var item = filtered[index - 1];
                node_assert_1.strict((item.isHeader ||
                    item.linked ||
                    (util_1.isNumber(item.paraId) &&
                        (item.paraId < 2000
                            ? util_1.isNumber(paraId) && paraId >= 2000
                            : false)) ||
                    item.text === '' ||
                    text === item.text ||
                    text.localeCompare(item.text) === 1), lastHeader + ":: " + text + " needs to be before " + item.text);
            });
        }
    });
});
describe('urls are not duplicated', function () {
    var hasDevelopment = false;
    var lastHeader = '';
    var map = allEndpoints
        .filter(function (_a) {
        var isDisabled = _a.isDisabled, isHeader = _a.isHeader, isUnreachable = _a.isUnreachable, text = _a.text;
        hasDevelopment = hasDevelopment || (!!isHeader && text === 'Development');
        return !hasDevelopment && !isDisabled && !isUnreachable;
    })
        .reduce(function (map, _a) {
        var isHeader = _a.isHeader, text = _a.text, value = _a.value;
        if (isHeader) {
            lastHeader = text;
        }
        else {
            var path = lastHeader + " -> " + text;
            var key = value.endsWith('/')
                ? value.substring(0, value.length - 1)
                : value;
            map[key] || ;
            [];
            map[key].push(path);
        }
        return map;
    }, {});
    var _loop_2 = function (url, paths) {
        it("" + url, function () {
            node_assert_1.strict(paths.length === 1, url + " appears multiple times - " + paths.map(function (p) { return "\n\t\"" + p + "\""; }).join(''));
        });
    };
    for (var _i = 0, _a = Object.entries(map); _i < _a.length; _i++) {
        var _b = _a[_i], url = _b[0], paths = _b[1];
        _loop_2(url, paths);
    }
});
describe('endpopints naming', function () {
    var emoji = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
    var endpoints = allEndpoints
        .filter(function (_a) {
        var value = _a.value;
        return value &&
            util_1.isString(value) &&
            !value.includes('127.0.0.1');
    })
        .map(function (_a) {
        var text = _a.text, textBy = _a.textBy, value = _a.value;
        return ({
            name: text,
            provider: textBy,
            value: value
        });
    })
        .reduce(function (all, e) {
        var _a;
        return (__assign(__assign({}, all), (_a = {}, _a[e.name + ":: " + e.provider] = e, _a)));
    }, {});
    var _loop_3 = function (key, name, provider) {
        describe("" + key, function () {
            it("[" + key + "] has no emojis", function () {
                node_assert_1.strict(!emoji.test(name), name + " should not contain any emojis");
                node_assert_1.strict(!emoji.test(provider), name + ":: " + provider + " should not contain any emojis");
            });
            it("[" + key + "] not all uppercase", function () {
                node_assert_1.strict(!provider.includes(' ') || (provider.toLocaleUpperCase() !== provider), name + ":: " + provider + " should not be all uppercase");
            });
            it("[" + key + "] does not contain \"Parachain", function () {
                node_assert_1.strict(!name.includes('Parachain'), name + " should not contain \"Parachain\" (redundant)");
            });
            it("[" + key + "] does not contain a relay name", function () {
                node_assert_1.strict(!name.includes(' ') || !name.includes('Kusama'), name + " should not contain \"Kusama\" (redundant)");
                node_assert_1.strict(!name.includes(' ') || !name.includes('Polkadot'), name + " should not contain \"Polkadot\" (redundant)");
                node_assert_1.strict(!name.includes(' ') || !name.includes('Rococo'), name + " should not contain \"Rococo\" (redundant)");
                node_assert_1.strict(!name.includes(' ') || !name.includes('Westend'), name + " should not contain \"Westend\" (redundant)");
            });
        });
    };
    for (var _i = 0, _a = Object.entries(endpoints); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], _c = _b[1], name = _c.name, provider = _c.provider;
        _loop_3(key, name, provider);
    }
});
