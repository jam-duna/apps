"use strict";
// Copyright 2017-2025 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.testRelayPaseo = exports.testParasPaseoCommon = exports.testParasPaseo = void 0;
var chains_1 = require("@polkadot/apps-config/ui/logos/chains");
var nodes_1 = require("@polkadot/apps-config/ui/logos/nodes");
var constants_js_1 = require("../api/constants.js");
// import { testnetParachainSVG } from '../ui/logos/nodes/index.js';
var util_js_1 = require("./util.js");
// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @polkadot/networks)
//   text: The text to display on the dropdown
//   providers: The actual hosted secure websocket endpoint
//
// IMPORTANT: Alphabetical based on text
exports.testParasPaseo = [
    // {
    //   homepage: 'https://testPaseoParachainExample.com',
    //   info: 'paseoparachain',
    //   paraId: 2345,
    //   providers: {
    //     Acurast: 'wss://paseo-parachain-testnet-ws.prod.gke.papers.tech'
    //   },
    //   text: 'Testnet Parachain',
    //   ui: {
    //     color: '#000000',
    //     logo: testnetParachainSVG
    //   }
    // }
    {
        homepage: 'https://ajuna.io/',
        info: 'Ajuna(paseo)',
        paraId: 2051,
        providers: {
            BajunNetwork: 'wss://rpc-paseo.ajuna.network'
        },
        text: 'Ajuna Network (Paseo)',
        ui: {
            color: '#161212',
            logo: nodes_1.nodesAjunaPNG
        }
    },
    {
        info: 'paseoAmplitude',
        paraId: 2124,
        providers: {
        // PendulumChain: 'wss://rpc-foucoco.pendulumchain.tech' // https://github.com/polkadot-js/apps/issues/11267
        },
        text: 'Amplitude testnet (Foucoco)',
        ui: {
            color: '#5DEFA7',
            logo: chains_1.chainsAmplitudeSVG
        }
    },
    {
        homepage: 'https://www.aventus.io/',
        info: 'paseoAventus',
        paraId: 2056,
        providers: {
            Aventus: 'wss://public-rpc.testnet.aventus.io'
        },
        text: 'Aventus',
        ui: {
            color: '#E6E6FA',
            logo: nodes_1.nodesAventusSVG
        }
    },
    {
        homepage: 'https://ajuna.io/',
        info: 'Bajun(paseo)',
        paraId: 2119,
        providers: {
        // BajunNetwork: 'wss://rpc-paseo.bajun.network'  https://github.com/polkadot-js/apps/issues/11026
        },
        text: 'Bajun Network (Paseo)',
        ui: {
            color: '#161212',
            logo: nodes_1.nodesBajunPNG
        }
    },
    {
        homepage: 'https://bifrost.finance',
        info: 'Bifrost(Paseo)',
        paraId: 2030,
        providers: {
            Liebi: 'wss://bifrost-rpc.paseo.liebi.com/ws'
        },
        text: 'Bifrost',
        ui: {
            color: '#5a25f0',
            logo: nodes_1.nodesBifrostSVG
        }
    },
    {
        homepage: 'https://darwinia.network/',
        info: 'Darwinia Koi',
        paraId: 2105,
        providers: {
        // Darwinia: 'wss://koi-rpc.darwinia.network' // https://github.com/polkadot-js/apps/issues/11279
        },
        text: 'Darwinia Koi',
        ui: {
            color: '#FF0083',
            logo: nodes_1.nodesDarwiniaKoiSVG
        }
    },
    {
        homepage: 'https://www.frequency.xyz',
        info: 'Frequency',
        paraId: 4000,
        providers: {
            'Amplica Labs': 'wss://0.rpc.testnet.amplica.io'
        },
        text: 'Frequency',
        ui: {
            color: '#19455E',
            logo: chains_1.chainsFrequencyPaseoSVG
        }
    },
    {
        homepage: 'https://heima.network/',
        info: 'heima-paseo',
        paraId: 2106,
        providers: {
            Heima: 'wss://rpc.paseo-parachain.heima.network'
        },
        text: 'Heima paseo',
        ui: {
            color: '#ECDA38',
            logo: nodes_1.nodesHeimaPaseoPNG
        }
    },
    {
        homepage: 'https://hydration.net',
        info: 'rococoHydraDX',
        paraId: 2034,
        providers: {
            'Galactic Council': 'wss://paseo-rpc.play.hydration.cloud'
        },
        text: 'Hydration (Paseo)',
        ui: {
            color: '#b3d7fa',
            logo: chains_1.chainsHydrationPaseoSVG
        }
    },
    {
        homepage: 'https://hyperbridge.network',
        info: 'Hyperbridge',
        paraId: 4009,
        providers: {
            BlockOps: 'wss://hyperbridge-paseo-rpc.blockops.network'
        },
        text: 'Hyperbridge (Gargantua)',
        ui: {
            color: '#ED6FF1',
            logo: nodes_1.nodesHyperbridgePNG
        }
    },
    {
        homepage: 'https://idealabs.network/',
        info: 'Ideal Network',
        paraId: 4502,
        providers: {
        // 'IDN Node': 'wss://idn0-testnet.idealabs.network' // https://github.com/polkadot-js/apps/issues/11263
        },
        text: 'Ideal Network',
        ui: {
            color: 'rgb(17, 35, 77)',
            logo: nodes_1.nodesIdealNetworkSVG
        }
    },
    {
        homepage: 'https://integritee.network',
        info: 'integritee',
        paraId: 2039,
        providers: {
            Integritee: 'wss://paseo.api.integritee.network'
        },
        text: 'Integritee Network (Paseo)',
        ui: {
            color: '#658ea9',
            logo: nodes_1.nodesIntegriteeSVG
        }
    },
    {
        info: 'kilt',
        paraId: 2086,
        providers: {
            'KILT Foundation': 'wss://peregrine.kilt.io/parachain-public-ws/'
        },
        text: 'KILT Peregrine',
        ui: {
            color: 'linear-gradient(45deg, #D73D80 0%, #161B3B 100%)',
            logo: nodes_1.nodesKiltIconSVG
        }
    },
    {
        homepage: 'https://laosnetwork.io/',
        info: 'laos-sigma',
        paraId: 4006,
        providers: {
            'freeverse.io': 'wss://rpc.laossigma.laosfoundation.io'
        },
        text: 'Laos Sigma',
        ui: {
            color: '#363435',
            logo: chains_1.chainsLaosSigmaPNG
        }
    },
    {
        info: 'muse',
        paraId: 3369,
        providers: {
            Parity: 'wss://paseo-muse-rpc.polkadot.io'
        },
        text: 'Muse network',
        ui: {
            color: '#110ff9',
            logo: nodes_1.nodesMusePNG
        }
    },
    {
        homepage: 'https://myriad.social',
        info: 'Myriad Social',
        paraId: 4005,
        providers: {
            myriadPaseo: 'wss://ws-rpc.paseo.myriad.social'
        },
        text: 'Myriad Social Testnet',
        ui: {
            color: '#d5e3e4',
            logo: nodes_1.nodesMyriadPaseoSVG
        }
    },
    {
        homepage: 'https://neuroweb.ai',
        info: 'NeuroWeb',
        paraId: 2043,
        providers: {
            TraceLabs: 'wss://parachain-testnet-rpc.origin-trail.network/'
        },
        text: 'NeuroWeb Testnet',
        ui: {
            color: '#646566',
            logo: chains_1.chainsNeurowebTestnetPNG
        }
    },
    {
        homepage: 'https://mandalachain.io',
        info: 'Niskala',
        paraId: 4022,
        providers: {
            'Baliola 1': 'wss://mlg1.mandalachain.io',
            'Baliola 2': 'wss://mlg2.mandalachain.io'
        },
        text: 'Niskala',
        ui: {
            color: '#0036ac',
            logo: nodes_1.nodesMandalaPNG
        }
    },
    {
        homepage: 'https://www.nodle.com/',
        info: 'NodleParadis',
        paraId: 2026,
        providers: {
            OnFinality: 'wss://node-7273232234617282560.nv.onfinality.io/ws?apikey=b937a7d7-7395-49b9-b745-60a0342fa365'
        },
        text: 'Nodle',
        ui: {
            color: '#1ab394',
            logo: nodes_1.nodesNodleSVG
        }
    },
    {
        info: 'paseoEwx',
        paraId: 3345,
        providers: {
            'Energy Web': 'wss://public-rpc.testnet.energywebx.com/'
        },
        text: 'PEX',
        ui: {
            color: '#452E66',
            logo: nodes_1.nodesRexSVG
        }
    },
    {
        homepage: 'https://popnetwork.xyz/',
        info: 'Pop Network',
        paraId: 4001,
        providers: {
            'R0GUE-RPC1': 'wss://rpc1.paseo.popnetwork.xyz',
            'R0GUE-RPC2': 'wss://rpc2.paseo.popnetwork.xyz',
            'R0GUE-RPC3': 'wss://rpc3.paseo.popnetwork.xyz'
        },
        text: 'Pop Network',
        ui: {
            color: 'linear-gradient(to right, rgb(230, 0, 122), rgb(83, 15, 160))',
            logo: chains_1.chainsPopNetworkSVG
        }
    },
    {
        info: 'regionxCocos',
        paraId: 4509,
        providers: {
        // RegionX: 'wss://regionx-paseo.regionx.tech' // https://github.com/polkadot-js/apps/issues/11098
        },
        text: 'RegionX(Paseo)',
        ui: {
            color: '#0CC184',
            logo: nodes_1.nodesRegionxPNG
        }
    },
    {
        info: 'paseoWatr',
        paraId: 2058,
        providers: {
            Watr: 'wss://rpc.dev.watr.org'
        },
        text: 'Watr Network',
        ui: {
            color: '#373b39',
            logo: chains_1.chainsWatrPNG
        }
    },
    {
        homepage: 'https://wetee.app/',
        info: 'TEE cloud',
        paraId: 4545,
        providers: {
            WeTEEDAO: 'wss://paseo.asyou.me/ws'
        },
        text: 'WeTEE (Paseo)',
        ui: {
            color: '#000',
            logo: chains_1.chainsWeTEESVG
        }
    },
    {
        homepage: 'https://xcavate.io/',
        info: 'Xcavate',
        paraId: 4683,
        providers: {
            Xcavate: 'wss://rpc2-paseo.xcavate.io'
        },
        text: 'Xcavate',
        ui: {
            color: '#FF0083',
            logo: chains_1.chainsMyxcavPNG
        }
    },
    {
        homepage: 'https://xode.net',
        info: 'paseoXode',
        paraId: 4607,
        providers: {
            XodeCommunity: 'wss://testrpcnodea01.xode.net/aRoyklGrhl9m2LlhX8NP/rpc'
        },
        text: 'Xode',
        ui: {
            color: '#ed1f7a',
            logo: nodes_1.nodesXodePNG
        }
    },
    {
        homepage: 'zeitgeist.pm',
        info: 'ZeitgeistBatteryStation',
        paraId: 2101,
        providers: {
            Zeitgeist: 'wss://bsr.zeitgeist.pm'
        },
        text: 'Zeitgeist Battery Station',
        ui: {
            color: 'linear-gradient(180deg, rgba(32,90,172,1) 0%, rgba(26,72,138,1) 50%, rgba(13,36,69,1) 100%)',
            logo: nodes_1.nodesZeitgeistPNG
        }
    }
];
exports.testParasPaseoCommon = [
    {
        info: 'PaseoAssetHub',
        isPeopleForIdentity: true,
        paraId: 1000,
        providers: {
            Dwellir: 'wss://asset-hub-paseo-rpc.dwellir.com',
            IBP1: 'wss://sys.ibp.network/asset-hub-paseo',
            IBP2: 'wss://asset-hub-paseo.dotters.network',
            StakeWorld: 'wss://pas-rpc.stakeworld.io/assethub',
            TurboFlakes: 'wss://sys.turboflakes.io/asset-hub-paseo'
        },
        relayName: 'paseo',
        teleport: [-1],
        text: 'AssetHub',
        ui: {
            color: '#77bb77',
            logo: nodes_1.nodesAssetHubSVG
        }
    },
    {
        info: 'PaseoBridgeHub',
        isPeopleForIdentity: true,
        paraId: 1002,
        providers: {
            IBP1: 'wss://sys.ibp.network/bridgehub-paseo',
            IBP2: 'wss://bridge-hub-paseo.dotters.network'
        },
        relayName: 'paseo',
        teleport: [-1],
        text: 'BridgeHub',
        ui: {
            color: '#AAADD7',
            logo: nodes_1.nodesBridgeHubSVG
        }
    },
    {
        info: 'PaseoCoretime',
        isPeopleForIdentity: true,
        paraId: 1005,
        providers: {
            IBP1: 'wss://sys.ibp.network/coretime-paseo',
            IBP2: 'wss://coretime-paseo.dotters.network',
            ParaNodes: 'wss://paseo-coretime.paranodes.io'
        },
        relayName: 'paseo',
        teleport: [-1],
        text: 'Coretime',
        ui: {
            color: '#113911',
            logo: chains_1.chainsCoretimeKusamaSVG
        }
    },
    {
        info: 'PaseoPeopleChain',
        isPeople: true,
        isPeopleForIdentity: false,
        paraId: 1004,
        providers: {
            Amforc: 'wss://people-paseo.rpc.amforc.com',
            IBP1: 'wss://sys.ibp.network/people-paseo',
            IBP2: 'wss://people-paseo.dotters.network'
        },
        relayName: 'paseo',
        teleport: [-1],
        text: 'People',
        ui: {
            color: '#e84366',
            logo: chains_1.chainsPeoplePolkadotSVG
        }
    }
];
exports.testRelayPaseo = {
    dnslink: 'paseo',
    genesisHash: constants_js_1.PASEO_GENESIS,
    info: 'paseo',
    isPeopleForIdentity: true,
    isRelay: true,
    linked: __spreadArrays(exports.testParasPaseoCommon, exports.testParasPaseo),
    providers: {
        Amforc: 'wss://paseo.rpc.amforc.com',
        Dwellir: 'wss://paseo-rpc.dwellir.com',
        IBP1: 'wss://rpc.ibp.network/paseo',
        IBP2: 'wss://paseo.dotters.network',
        StakeWorld: 'wss://pas-rpc.stakeworld.io'
        // Zondax: 'wss://api2.zondax.ch/pas/node/rpc' // https://github.com/polkadot-js/apps/issues/11199
        // 'light client': 'light://substrate-connect/paseo'
    },
    teleport: util_js_1.getTeleports(exports.testParasPaseoCommon),
    text: 'Paseo',
    ui: {
        color: '#38393F',
        identityIcon: 'polkadot',
        logo: chains_1.chainsPaseoPNG
    }
};
