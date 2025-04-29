"use strict";
// Copyright 2017-2025 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
exports.__esModule = true;
exports.createDev = exports.createOwn = exports.createCustom = exports.CUSTOM_ENDPOINT_KEY = void 0;
exports.CUSTOM_ENDPOINT_KEY = 'polkadot-app-custom-endpoints';
function createCustom(t) {
    var _a, _b;
    var WS_URL = ((typeof process !== 'undefined' ? (_a = process.env) === null || _a === void 0 ? void 0 : _a.WS_URL : undefined) ||
        (typeof window !== 'undefined' ? (_b = window.process_env) === null || _b === void 0 ? void 0 : _b.WS_URL : undefined));
    return WS_URL
        ? [
            {
                isHeader: true,
                text: t('rpc.dev.custom', 'Custom environment', { ns: 'apps-config' }),
                textBy: '',
                ui: {},
                value: ''
            },
            {
                info: 'WS_URL',
                text: t('rpc.dev.custom.entry', 'Custom {{WS_URL}}', { ns: 'apps-config', replace: { WS_URL: WS_URL } }),
                textBy: WS_URL,
                ui: {},
                value: WS_URL
            }
        ]
        : [];
}
exports.createCustom = createCustom;
function createOwn(t) {
    try {
        // this may not be available, e.g. when running via script
        var storedItems = typeof localStorage === 'object' && typeof localStorage.getItem === 'function'
            ? localStorage.getItem(exports.CUSTOM_ENDPOINT_KEY)
            : null;
        if (storedItems) {
            var items = JSON.parse(storedItems);
            return items.map(function (textBy) { return ({
                info: 'local',
                text: t('rpc.dev.custom.own', 'Custom', { ns: 'apps-config' }),
                textBy: textBy,
                ui: {},
                value: textBy
            }); });
        }
    }
    catch (e) {
        console.error(e);
    }
    return [];
}
exports.createOwn = createOwn;
function createDev(t) {
    return [
        {
            dnslink: 'local',
            info: 'local',
            text: t('rpc.dev.local', 'Local Node', { ns: 'apps-config' }),
            textBy: '127.0.0.1:9944',
            ui: {},
            value: 'ws://127.0.0.1:9944'
        }
    ];
}
exports.createDev = createDev;
