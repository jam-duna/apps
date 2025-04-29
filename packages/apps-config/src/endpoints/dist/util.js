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
exports.getTeleports = exports.expandEndpoints = void 0;
var dummyId = 0;
function sortNoop() {
    return 0;
}
function sortLinks(a, b) {
    return !!a.isUnreachable !== !!b.isUnreachable
        ? a.isUnreachable
            ? 1
            : -1
        : 0;
}
function expandLinked(input) {
    var valueRelay = input.map(function (_a) {
        var value = _a.value;
        return value;
    });
    return input.reduce(function (result, entry) {
        result.push(entry);
        return entry.linked
            ? result.concat(expandLinked(entry.linked).map(function (child) {
                var _a;
                child.genesisHashRelay = entry.genesisHash;
                child.isChild = true;
                child.textRelay = input.length
                    ? input[0].text
                    : undefined;
                child.valueRelay = valueRelay;
                if (((_a = entry.ui) === null || _a === void 0 ? void 0 : _a.identityIcon) && child.paraId && child.paraId < 2000) {
                    if (!child.ui) {
                        child.ui = { identityIcon: entry.ui.identityIcon };
                    }
                    else if (!child.ui.identityIcon) {
                        child.ui.identityIcon = entry.ui.identityIcon;
                    }
                }
                return child;
            }))
            : result;
    }, []);
}
function expandEndpoint(t, _a, firstOnly, withSort) {
    var dnslink = _a.dnslink, genesisHash = _a.genesisHash, homepage = _a.homepage, info = _a.info, isChild = _a.isChild, isDisabled = _a.isDisabled, isPeople = _a.isPeople, isPeopleForIdentity = _a.isPeopleForIdentity, isUnreachable = _a.isUnreachable, linked = _a.linked, paraId = _a.paraId, providers = _a.providers, relayName = _a.relayName, teleport = _a.teleport, text = _a.text, ui = _a.ui;
    var hasProviders = Object.keys(providers).length !== 0;
    var base = {
        genesisHash: genesisHash,
        homepage: homepage,
        info: info,
        isChild: isChild,
        isDisabled: isDisabled,
        isPeople: isPeople,
        isPeopleForIdentity: isPeopleForIdentity,
        isUnreachable: isUnreachable || !hasProviders,
        paraId: paraId,
        providers: Object.keys(providers).map(function (k) { return providers[k]; }),
        relayName: relayName,
        teleport: teleport,
        text: text,
        ui: ui
    };
    var result = Object
        .entries(hasProviders
        ? providers
        : { Placeholder: "wss://" + ++dummyId })
        .filter(function (_, index) { return !firstOnly || index === 0; })
        .map(function (_a, index) {
        var host = _a[0], value = _a[1];
        return (__assign(__assign({}, base), { dnslink: index === 0 ? dnslink : undefined, isLightClient: value.startsWith('light://'), isRelay: false, textBy: value.startsWith('light://')
                ? t('lightclient.experimental', 'light client (experimental)', { ns: 'apps-config' })
                : t('rpc.hosted.via', 'via {{host}}', { ns: 'apps-config', replace: { host: host } }), value: value }));
    })
        .sort(function (a, b) {
        return a.isLightClient
            ? 1
            : b.isLightClient
                ? -1
                : a.textBy.toLocaleLowerCase().localeCompare(b.textBy.toLocaleLowerCase());
    });
    if (linked) {
        var last = result[result.length - 1];
        var options_1 = [];
        linked
            .sort(withSort ? sortLinks : sortNoop)
            .filter(function (_a) {
            var paraId = _a.paraId;
            return paraId;
        })
            .forEach(function (o) {
            return options_1.push.apply(options_1, expandEndpoint(t, o, firstOnly, withSort));
        });
        last.isRelay = true;
        last.linked = options_1;
    }
    return expandLinked(result);
}
function expandEndpoints(t, input, firstOnly, withSort) {
    return input
        .sort(withSort ? sortLinks : sortNoop)
        .reduce(function (all, e) {
        return all.concat(expandEndpoint(t, e, firstOnly, withSort));
    }, []);
}
exports.expandEndpoints = expandEndpoints;
function getTeleports(input) {
    return input
        .filter(function (_a) {
        var teleport = _a.teleport;
        return !!teleport && teleport[0] === -1;
    })
        .map(function (_a) {
        var paraId = _a.paraId;
        return paraId;
    })
        .filter(function (id) { return !!id; });
}
exports.getTeleports = getTeleports;
