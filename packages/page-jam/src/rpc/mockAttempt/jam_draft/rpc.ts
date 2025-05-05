// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

export const rpc = {
  auditWorkPackage: {
    description: 'Returns work report given work package hash by fetching the bundle and reexecuting the work package',
    params: [
      {
        description: 'The hash of the work package to audit.',
        name: 'WorkPackageHash',
        type: 'Hash'
      }
    ],
    result: {
      description: 'The work report from reexecution.',
      type: 'Object'
    },
    type: 'Method'
  },
  beefyRoot: {
    description: 'Returns the BEEFY root of the block with the given header hash, or null if this is not known.',
    params: [
      {
        description: 'The header hash.',
        name: 'Hash',
        type: 'Text'
      }
    ],
    result: {
      description: 'Either null or the BEEFY root.',
      type: 'Hash | null'
    },
    type: 'Method'
  },
  bestBlock: {
    description: 'Returns the header hash and slot of the head of the "best" chain.',
    params: [],
    result: {
      description: 'The header hash and slot.',
      fields: [
        {
          name: 'Hash',
          type: 'text'
        },
        {
          name: 'Slot',
          type: 'text'
        }
      ],
      type: 'Object'
    },
    type: 'Method'
  },
  block: {
    description: 'Returns block with the given header hash, or null if this is not known.',
    params: [
      {
        description: 'The header hash of the block to retrieve.',
        name: 'Hash',
        type: 'Text'
      }
    ],
    result: {
      description: 'The block or null if not known.',
      type: 'Object | null'
    },
    type: 'Method'
  },
  code: {
    description: 'Given a service ID, returns the code hash and code of the service',
    params: [
      {
        description: 'The ID of the service.',
        name: 'ServiceId',
        type: 'Text'
      }
    ],
    result: {
      description: 'The code hash and code of the service.',
      fields: [
        {
          name: 'CodeHash',
          type: 'Hash'
        },
        {
          name: 'Code',
          type: 'Blob'
        }
      ],
      type: 'Object'
    },
    type: 'Method'
  },
  decode: {
    description: 'Returns back JSON object same as the UI given 0x... input same as the UI',
    params: [
      {
        description: 'The hex-encoded data to decode.',
        name: 'EncodedData',
        type: 'Text'
      }
    ],
    result: {
      description: 'The decoded JSON object.',
      type: 'Object'
    },
    type: 'Method'
  },
  encode: {
    description: 'Returns back 0x... encoded version of an object same as the UI',
    params: [
      {
        description: 'The object to encode.',
        name: 'Object',
        type: 'Object'
      }
    ],
    result: {
      description: 'The hex-encoded representation of the object.',
      type: 'Text'
    },
    type: 'Method'
  },
  finalizedBlock: {
    description: 'Returns the header hash and slot of the latest finalized block.',
    params: [],
    result: {
      description: 'The header hash and slot.',
      fields: [
        {
          name: 'Hash',
          type: 'text'
        },
        {
          name: 'Slot',
          type: 'text'
        }
      ],
      type: 'Object'
    },
    type: 'Method'
  },
  listServices: {
    description: 'Returns a list of all services currently known to be on JAM. This is a best-effort list and may not reflect the true state.',
    params: [
      {
        description: 'The header hash indicating the block whose posterior state should be used for the query.',
        name: 'Hash',
        type: 'Text'
      }
    ],
    result: {
      description: 'Array of ServiceId',
      type: 'array of ServiceId'
    },
    type: 'Method'
  },
  parent: {
    description: 'Returns the header hash and slot of the parent of the block with the given header hash, or null if this is not known.',
    params: [
      {
        description: 'The hash of a child\'s header.',
        name: 'Hash',
        type: 'Text'
      }
    ],
    result: {
      description: 'Either null or the parent\'s header hash and slot.',
      fields: [
        {
          name: 'Hash',
          type: 'text'
        },
        {
          name: 'Slot',
          type: 'text'
        }
      ],
      type: 'Object | null'
    },
    type: 'Method'
  },
  segment: {
    description: 'Returns back segment given (requestedHash, index) (either work package hash or exported segments root) from Segments DA',
    params: [
      {
        description: 'Either work package hash or exported segments root.',
        name: 'RequestedHash',
        type: 'Hash'
      },
      {
        description: 'The index of the segment to retrieve.',
        name: 'Index',
        type: 'u32'
      }
    ],
    result: {
      description: 'The requested segment.',
      type: 'Blob'
    },
    type: 'Method'
  },
  serviceData: {
    description: 'Returns the service data for the given service ID. The data are encoded as per the GP. null is returned if the block\'s posterior state is not known. Some(None) is returned if there is no value associated with the given service ID.',
    params: [
      {
        description: 'The header hash indicating the block whose posterior state should be used for the query.',
        name: 'Hash',
        type: 'Text'
      },
      {
        description: 'The ID of the service.',
        name: 'ServiceId',
        type: 'Text'
      }
    ],
    result: {
      description: 'The service data encoded as per the GP.',
      type: 'Blob | null'
    },
    type: 'Method'
  },
  serviceInfo: {
    description: 'Returns the service info for the given service ID. The data are encoded as per the GP. null is returned if the block\'s posterior state is not known. Some(None) is returned if there is no value associated with the given service ID.',
    params: [
      {
        description: 'The header hash indicating the block whose posterior state should be used for the query.',
        name: 'Hash',
        type: 'Text'
      },
      {
        description: 'The ID of the service.',
        name: 'ServiceId',
        type: 'Text'
      }
    ],
    result: {
      description: 'The service info encoded as per the GP.',
      type: 'Blob | null'
    },
    type: 'Method'
  },
  servicePreimage: {
    description: 'Returns the preimage associated with the given service ID and hash in the posterior state of the block with the given header hash. null is returned if there is no preimage associated with the given service ID and hash.',
    params: [
      {
        description: 'The header hash indicating the block whose posterior state should be used for the query.',
        name: 'Hash',
        type: 'Text'
      },
      {
        description: 'The ID of the service.',
        name: 'ServiceId',
        type: 'Text'
      },
      {
        description: 'The hash of the preimage to look up.',
        name: 'PreimageHash',
        type: 'Hash'
      }
    ],
    result: {
      description: 'The preimage or null if not found.',
      type: 'Blob | null'
    },
    type: 'Method'
  },
  serviceRequest: {
    description: 'Returns the preimage request associated with the given service ID and hash/len in the posterior state of the block with the given header hash. null is returned if there is no preimage request associated with the given service ID, hash and length.',
    params: [
      {
        description: 'The header hash indicating the block whose posterior state should be used for the query.',
        name: 'Hash',
        type: 'Text'
      },
      {
        description: 'The ID of the service.',
        name: 'ServiceId',
        type: 'Text'
      },
      {
        description: 'The hash of the requested preimage.',
        name: 'PreimageHash',
        type: 'Hash'
      },
      {
        description: 'The length of the requested preimage.',
        name: 'Length',
        type: 'u32'
      }
    ],
    result: {
      description: 'The preimage request details or null if not found.',
      type: 'array of Slot | null'
    },
    type: 'Method'
  },
  serviceValue: {
    description: 'Returns the value associated with the given service ID and key in the posterior state of the block with the given header hash. null is returned if there is no value associated with the given service ID and key.',
    params: [
      {
        description: 'The header hash indicating the block whose posterior state should be used for the query.',
        name: 'Hash',
        type: 'Text'
      },
      {
        description: 'The ID of the service.',
        name: 'ServiceId',
        type: 'Text'
      },
      {
        description: 'The key to look up.',
        name: 'Key',
        type: 'Blob'
      }
    ],
    result: {
      description: 'The value associated with the key or null if not found.',
      type: 'Blob | null'
    },
    type: 'Method'
  },
  state: {
    description: 'Returns C1-C15 with the given header hash, or null if this is not known.',
    params: [
      {
        description: 'The header hash of the block to retrieve state from.',
        name: 'Hash',
        type: 'Text'
      }
    ],
    result: {
      description: 'The state components C1-C15 or null if not known.',
      type: 'Object | null'
    },
    type: 'Method'
  },
  stateRoot: {
    description: 'Returns the posterior state root of the block with the given header hash, or null if this is not known.',
    params: [
      {
        description: 'The header hash.',
        name: 'Hash',
        type: 'Text'
      }
    ],
    result: {
      description: 'Either null or the state_root.',
      type: 'Hash | null'
    },
    type: 'Method'
  },
  statistics: {
    description: 'Returns the activity statistics stored in the posterior state of the block with the given header hash. The statistics are encoded as per the GP. null is returned if the block\'s posterior state is not known.',
    params: [
      {
        description: 'The header hash indicating the block whose posterior state should be used for the query.',
        name: 'Hash',
        type: 'Text'
      }
    ],
    result: {
      description: 'The statistics encoded as per the GP.',
      type: 'Blob | null'
    },
    type: 'Method'
  },
  submitPreimage: {
    description: 'Submit a preimage which is being requested by a given service.',
    params: [
      {
        description: 'The ID of the service which has an outstanding request.',
        name: 'ServiceId',
        type: 'Text'
      },
      {
        description: 'The preimage requested.',
        name: 'Preimage',
        type: 'Blob'
      },
      {
        description: 'The block which must be in the best-chain for the preimage request to be valid.',
        name: 'BlockHash',
        type: 'Hash'
      }
    ],
    result: {
      description: 'None',
      type: 'null'
    },
    type: 'Method'
  },
  submitWorkPackage: {
    description: 'Submit a work-package to the guarantors currently assigned to the given core.',
    params: [
      {
        description: 'The index of the core.',
        name: 'CoreIndex',
        type: 'Text'
      },
      {
        description: 'The encoded work-package.',
        name: 'Blob',
        type: 'Bytes'
      },
      {
        description: 'The extrinsics.',
        name: 'extrinsics',
        type: 'BlobArray'
      }
    ],
    result: {
      description: 'None',
      type: 'null'
    },
    type: 'Method'
  },
  workPackage: {
    description: 'Returns work report (including availability spec) with the given work package hash',
    params: [
      {
        description: 'The hash of the work package to retrieve.',
        name: 'WorkPackageHash',
        type: 'Hash'
      }
    ],
    result: {
      description: 'The work report including availability spec.',
      type: 'Object'
    },
    type: 'Method'
  }
};
