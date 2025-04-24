export const rpc = {
    block: {
        description: 'Returns block with the given header hash, or null if this is not known.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash of the block to retrieve.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The block or null if not known.',
            type: 'Object | null'
        }
    },
    bestBlock: {
        description: 'Returns the header hash and slot of the head of the "best" chain.',
        params: [],
        type: 'Method',
        result: {
            description: 'The header hash and slot.',
            type: 'Object',
            fields: [
                {
                    name: 'Hash',
                    type: 'text'
                },
                {
                    name: 'Slot',
                    type: 'text'
                }
            ]
        }
    },
    finalizedBlock: {
        description: 'Returns the header hash and slot of the latest finalized block.',
        params: [],
        type: 'Method',
        result: {
            description: 'The header hash and slot.',
            type: 'Object',
            fields: [
                {
                    name: 'Hash',
                    type: 'text'
                },
                {
                    name: 'Slot',
                    type: 'text'
                }
            ]
        }
    },
    statistics: {
        description: 'Returns the activity statistics stored in the posterior state of the block with the given header hash. The statistics are encoded as per the GP. null is returned if the block\'s posterior state is not known.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash indicating the block whose posterior state should be used for the query.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The statistics encoded as per the GP.',
            type: 'Blob | null'
        }
    },
    serviceData: {
        description: 'Returns the service data for the given service ID. The data are encoded as per the GP. null is returned if the block\'s posterior state is not known. Some(None) is returned if there is no value associated with the given service ID.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash indicating the block whose posterior state should be used for the query.'
            },
            {
                name: 'ServiceId',
                type: 'Text',
                description: 'The ID of the service.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The service data encoded as per the GP.',
            type: 'Blob | null'
        }
    },
    serviceInfo: {
        description: 'Returns the service info for the given service ID. The data are encoded as per the GP. null is returned if the block\'s posterior state is not known. Some(None) is returned if there is no value associated with the given service ID.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash indicating the block whose posterior state should be used for the query.'
            },
            {
                name: 'ServiceId',
                type: 'Text',
                description: 'The ID of the service.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The service info encoded as per the GP.',
            type: 'Blob | null'
        }
    },
    serviceValue: {
        description: 'Returns the value associated with the given service ID and key in the posterior state of the block with the given header hash. null is returned if there is no value associated with the given service ID and key.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash indicating the block whose posterior state should be used for the query.'
            },
            {
                name: 'ServiceId',
                type: 'Text',
                description: 'The ID of the service.'
            },
            {
                name: 'Key',
                type: 'Blob',
                description: 'The key to look up.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The value associated with the key or null if not found.',
            type: 'Blob | null'
        }
    },
    servicePreimage: {
        description: 'Returns the preimage associated with the given service ID and hash in the posterior state of the block with the given header hash. null is returned if there is no preimage associated with the given service ID and hash.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash indicating the block whose posterior state should be used for the query.'
            },
            {
                name: 'ServiceId',
                type: 'Text',
                description: 'The ID of the service.'
            },
            {
                name: 'PreimageHash',
                type: 'Hash',
                description: 'The hash of the preimage to look up.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The preimage or null if not found.',
            type: 'Blob | null'
        }
    },
    serviceRequest: {
        description: 'Returns the preimage request associated with the given service ID and hash/len in the posterior state of the block with the given header hash. null is returned if there is no preimage request associated with the given service ID, hash and length.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash indicating the block whose posterior state should be used for the query.'
            },
            {
                name: 'ServiceId',
                type: 'Text',
                description: 'The ID of the service.'
            },
            {
                name: 'PreimageHash',
                type: 'Hash',
                description: 'The hash of the requested preimage.'
            },
            {
                name: 'Length',
                type: 'u32',
                description: 'The length of the requested preimage.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The preimage request details or null if not found.',
            type: 'array of Slot | null'
        }
    },
    submitWorkPackage: {
        description: 'Submit a work-package to the guarantors currently assigned to the given core.',
        params: [
            {
                name: 'CoreIndex',
                type: 'Text',
                description: 'The index of the core.'
            },
            {
                name: 'Blob',
                type: 'Bytes',
                description: 'The encoded work-package.'
            },
            {
                name: 'extrinsics',
                type: 'BlobArray',
                description: 'The extrinsics.'
            }
        ],
        type: 'Method',
        result: {
            description: 'None',
            type: 'null'
        }
    },
    submitPreimage: {
        description: 'Submit a preimage which is being requested by a given service.',
        params: [
            {
                name: 'ServiceId',
                type: 'Text',
                description: 'The ID of the service which has an outstanding request.'
            },
            {
                name: 'Preimage',
                type: 'Blob',
                description: 'The preimage requested.'
            },
            {
                name: 'BlockHash',
                type: 'Hash',
                description: 'The block which must be in the best-chain for the preimage request to be valid.'
            }
        ],
        type: 'Method',
        result: {
            description: 'None',
            type: 'null'
        }
    },
    listServices: {
        description: 'Returns a list of all services currently known to be on JAM. This is a best-effort list and may not reflect the true state.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash indicating the block whose posterior state should be used for the query.'
            }
        ],
        type: 'Method',
        result: {
            description: 'Array of ServiceId',
            type: 'array of ServiceId'
        }
    },
    state: {
        description: 'Returns C1-C15 with the given header hash, or null if this is not known.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash of the block to retrieve state from.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The state components C1-C15 or null if not known.',
            type: 'Object | null'
        }
    },
    workPackage: {
        description: 'Returns work report (including availability spec) with the given work package hash',
        params: [
            {
                name: 'WorkPackageHash',
                type: 'Hash',
                description: 'The hash of the work package to retrieve.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The work report including availability spec.',
            type: 'Object'
        }
    },
    segment: {
        description: 'Returns back segment given (requestedHash, index) (either work package hash or exported segments root) from Segments DA',
        params: [
            {
                name: 'RequestedHash',
                type: 'Hash',
                description: 'Either work package hash or exported segments root.'
            },
            {
                name: 'Index',
                type: 'u32',
                description: 'The index of the segment to retrieve.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The requested segment.',
            type: 'Blob'
        }
    },
    auditWorkPackage: {
        description: 'Returns work report given work package hash by fetching the bundle and reexecuting the work package',
        params: [
            {
                name: 'WorkPackageHash',
                type: 'Hash',
                description: 'The hash of the work package to audit.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The work report from reexecution.',
            type: 'Object'
        }
    },
    encode: {
        description: 'Returns back 0x... encoded version of an object same as the UI',
        params: [
            {
                name: 'Object',
                type: 'Object',
                description: 'The object to encode.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The hex-encoded representation of the object.',
            type: 'Text'
        }
    },
    decode: {
        description: 'Returns back JSON object same as the UI given 0x... input same as the UI',
        params: [
            {
                name: 'EncodedData',
                type: 'Text',
                description: 'The hex-encoded data to decode.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The decoded JSON object.',
            type: 'Object'
        }
    },
    code: {
        description: 'Given a service ID, returns the code hash and code of the service',
        params: [
            {
                name: 'ServiceId',
                type: 'Text',
                description: 'The ID of the service.'
            }
        ],
        type: 'Method',
        result: {
            description: 'The code hash and code of the service.',
            type: 'Object',
            fields: [
                {
                    name: 'CodeHash',
                    type: 'Hash'
                },
                {
                    name: 'Code',
                    type: 'Blob'
                }
            ]
        }
    },
    parent: {
        description: 'Returns the header hash and slot of the parent of the block with the given header hash, or null if this is not known.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The hash of a child\'s header.'
            }
        ],
        type: 'Method',
        result: {
            description: 'Either null or the parent\'s header hash and slot.',
            type: 'Object | null',
            fields: [
                {
                    name: 'Hash',
                    type: 'text'
                },
                {
                    name: 'Slot',
                    type: 'text'
                }
            ]
        }
    },
    stateRoot: {
        description: 'Returns the posterior state root of the block with the given header hash, or null if this is not known.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash.'
            }
        ],
        type: 'Method',
        result: {
            description: 'Either null or the state_root.',
            type: 'Hash | null'
        }
    },
    beefyRoot: {
        description: 'Returns the BEEFY root of the block with the given header hash, or null if this is not known.',
        params: [
            {
                name: 'Hash',
                type: 'Text',
                description: 'The header hash.'
            }
        ],
        type: 'Method',
        result: {
            description: 'Either null or the BEEFY root.',
            type: 'Hash | null'
        }
    }
};