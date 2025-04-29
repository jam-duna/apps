"use strict";
// Copyright 2017-2025 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.createWsEndpoints = void 0;
var development_js_1 = require("./development.js");
var production_js_1 = require("./production.js");
var testing_js_1 = require("./testing.js");
var testingRelayPaseo_js_1 = require("./testingRelayPaseo.js");
var util_js_1 = require("./util.js");
var development_js_2 = require("./development.js");
__createBinding(exports, development_js_2, "CUSTOM_ENDPOINT_KEY");
__exportStar(require("./production.js"), exports);
__exportStar(require("./testing.js"), exports);
function defaultT(keyOrText, text, options) {
    var _a;
    return (((_a = options === null || options === void 0 ? void 0 : options.replace) === null || _a === void 0 ? void 0 : _a.host) || (text === null || text === void 0 ? void 0 : text.toString()) ||
        keyOrText);
}
function createWsEndpoints(t, firstOnly, withSort) {
    if (t === void 0) { t = defaultT; }
    if (firstOnly === void 0) { firstOnly = false; }
    if (withSort === void 0) { withSort = true; }
    return __spreadArrays(development_js_1.createCustom(t), [
        {
            isDisabled: false,
            isHeader: true,
            isSpaced: true,
            text: t('rpc.header.polkadot.relay', 'Polkadot & parachains', { ns: 'apps-config' }),
            textBy: '',
            ui: {},
            value: ''
        }
    ], util_js_1.expandEndpoints(t, [production_js_1.prodRelayPolkadot], firstOnly, withSort), [
        {
            isDisabled: false,
            isHeader: true,
            text: t('rpc.header.kusama.relay', 'Kusama & parachains', { ns: 'apps-config' }),
            textBy: '',
            ui: {},
            value: ''
        }
    ], util_js_1.expandEndpoints(t, [production_js_1.prodRelayKusama], firstOnly, withSort), [
        {
            isDisabled: false,
            isHeader: true,
            isSpaced: true,
            text: t('rpc.header.westend.relay', 'Test Westend & parachains', { ns: 'apps-config' }),
            textBy: '',
            ui: {},
            value: ''
        }
    ], util_js_1.expandEndpoints(t, [testing_js_1.testRelayWestend], firstOnly, withSort), [
        {
            isDisabled: false,
            isHeader: true,
            isSpaced: true,
            text: t('rpc.header.paseo.relay', 'Test Paseo & parachains', { ns: 'apps-config' }),
            textBy: '',
            ui: {},
            value: ''
        }
    ], util_js_1.expandEndpoints(t, [testingRelayPaseo_js_1.testRelayPaseo], firstOnly, withSort), [
        {
            isDisabled: false,
            isHeader: true,
            isSpaced: true,
            text: t('rpc.header.live', 'Live networks', { ns: 'apps-config' }),
            textBy: '',
            ui: {},
            value: ''
        }
    ], util_js_1.expandEndpoints(t, production_js_1.prodChains, firstOnly, withSort), [
        {
            isDisabled: false,
            isHeader: true,
            text: t('rpc.header.test', 'Test networks', { ns: 'apps-config' }),
            textBy: '',
            ui: {},
            value: ''
        }
    ], util_js_1.expandEndpoints(t, testing_js_1.testChains, firstOnly, withSort), [
        {
            isDisabled: false,
            isHeader: true,
            text: t('rpc.header.jam', 'JAM testnet', { ns: 'apps-config' }),
            textBy: '',
            ui: {},
            value: ''
        }
    ], util_js_1.expandEndpoints(t, testing_js_1.testChains, firstOnly, withSort), [
        {
            isDevelopment: true,
            isDisabled: false,
            isHeader: true,
            isSpaced: true,
            text: t('rpc.header.dev', 'Development', { ns: 'apps-config' }),
            textBy: '',
            ui: {},
            value: ''
        }
    ], development_js_1.createDev(t), development_js_1.createOwn(t)).filter(function (_a) {
        var isDisabled = _a.isDisabled;
        return !isDisabled;
    });
}
exports.createWsEndpoints = createWsEndpoints;
