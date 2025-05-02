// [object Object]
// SPDX-License-Identifier: Apache-2.0

import type { ReportWithTime } from '../components/jamitem/workpackage/list.js';
import type { Block, State, Statistics } from '../db/db.js';
import type { CoreStatistics, KeyedItem, PiEntry, Preimage, Result, ServiceStatistics, ValidatorShowCase } from '../types/index.js';

import { db } from '../db/db.js';
import { fetchState } from '../hooks/useFetchState.js';
import { formatDate } from './helper.js';
import { getRpcUrlFromWs } from './ws.js';

export const sortBlocks = async (): Promise<Block[]> => {
  const data = db.blocks
    .toArray()
    .then((blocks) => {
      const sortedBlocks = blocks.sort((a, b) => {
        const aCreatedAt = a?.overview?.createdAt;
        const bCreatedAt = b?.overview?.createdAt;

        if (aCreatedAt == null && bCreatedAt == null) {
          return 0;
        }

        if (aCreatedAt == null) {
          return 1;
        }

        if (bCreatedAt == null) {
          return -1;
        }

        return bCreatedAt - aCreatedAt;
      });

      return sortedBlocks;
    })
    .catch((error) => {
      console.error('Error loading blocks from DB:', error);

      return [];
    });

  return data;
};

export const sortStates = async (): Promise<State[]> => {
  const data = await db.states
    .toArray()
    .then((states) => {
      const sortedStates = states.sort((a, b) => {
        const aCreatedAt = a?.overview?.createdAt;
        const bCreatedAt = b?.overview?.createdAt;

        if (aCreatedAt == null && bCreatedAt == null) {
          return 0;
        }

        if (aCreatedAt == null) {
          return 1;
        }

        if (bCreatedAt == null) {
          return -1;
        }

        return bCreatedAt - aCreatedAt;
      });

      return sortedStates;
    })
    .catch((error) => {
      console.error('Error loading states from DB:', error);

      return [];
    });

  return data;
};

export const filterBlocks = async (count: number): Promise<Block[]> => {
  const sortedBlocks = await sortBlocks();

  return sortedBlocks.slice(0, count);
};

export const filterBlocksFromAuthor = async (
  author: number
): Promise<Block[]> => {
  const sortedBlocks = await sortBlocks();
  const filteredBlocks = sortedBlocks.filter((item) => {
    return item.header.author_index === author;
  });

  return filteredBlocks;
};

export const filterStates = async (count: number): Promise<State[]> => {
  const sortedStates = await sortStates();

  return sortedStates.slice(0, count);
};

export const filterWorkPackages = async (
  coreIndex = -1
): Promise<ReportWithTime[]> => {
  const sortedStates = await sortStates();
  const filteredStates = sortedStates.filter((state) => {
    const filteredRhos = state.rho.filter((rhoItem) => {
      return (
        rhoItem != null &&
        (coreIndex === -1 || rhoItem.report.core_index === coreIndex)
      );
    });

    return filteredRhos !== null && filteredRhos.length > 0;
  });

  const filteredReports: ReportWithTime[] = [];

  filteredStates.forEach((state) => {
    state.rho.forEach((report) => {
      if (report) {
        filteredReports.push({
          report: report?.report,
          timestamp: state.overview?.createdAt || 0
        });
      }
    });
  });

  return filteredReports;
};

export const filterWorkPackagesFromValidator = async (
  validator: number
): Promise<ReportWithTime[]> => {
  const sortedBlocks = await sortBlocks();
  const filteredBlocks = sortedBlocks.filter((block) => {
    const filteredRhos = block.extrinsic.guarantees.filter((guarantee) => {
      const index = guarantee.signatures.findIndex(
        (item) => item.validator_index === validator
      );

      return index !== -1;
    });

    return filteredRhos !== null && filteredRhos.length > 0;
  });

  const filteredReports: ReportWithTime[] = [];

  filteredBlocks.forEach((block) => {
    block.extrinsic.guarantees.forEach((guarantee) => {
      if (
        guarantee.signatures.findIndex(
          (item) => item.validator_index === validator
        ) !== -1
      ) {
        filteredReports.push({
          report: guarantee.report,
          timestamp: block.overview?.createdAt || 0
        });
      }
    });
  });

  return filteredReports;
};

export const filterActiveValidators = async (
  coreIndex: number
): Promise<ValidatorShowCase[]> => {
  const sortedBlocks = await sortBlocks();

  const validators: ValidatorShowCase[] = [];

  sortedBlocks.forEach((block) => {
    block.extrinsic.guarantees.forEach((guarantee) => {
      if (guarantee.report.core_index === coreIndex) {
        guarantee.signatures.forEach((validator) => {
          const isExist: boolean =
            validators.findIndex(
              (item) => item.index === validator.validator_index
            ) !== -1;

          if (isExist === false) {
            validators.push({
              index: validator.validator_index,
              hash: block.overview?.headerHash || '0x00',
              lastSeenTime: block.overview?.createdAt || 0
            });
          }
        });
      }
    });
  });

  return validators;
};

export const filterWorkPackagesFromService = async (
  serviceId: number
): Promise<ReportWithTime[]> => {
  const sortedStates = await sortStates();
  const filteredStates = sortedStates.filter((state) => {
    const filteredRhos = state.rho.filter((rhoItem) => {
      const filteredResults: Result[] | undefined =
        rhoItem?.report.results.filter((resultItem) => {
          return resultItem.service_id === serviceId;
        });

      return filteredResults !== undefined && filteredResults.length > 0;
    });

    return filteredRhos !== null && filteredRhos.length > 0;
  });

  const filteredReports: ReportWithTime[] = [];

  filteredStates.forEach((state) => {
    state.rho.forEach((report) => {
      if (report) {
        filteredReports.push({
          report: report?.report,
          timestamp: state.overview?.createdAt || 0
        });
      }
    });
  });

  return filteredReports;
};

export interface PreimageProps {
  preimage: Preimage;
  package_hash: string;
  timestamp: number;
}

export const filterPreimagesFromService = async (
  serviceId: number
): Promise<PreimageProps[]> => {
  const fetchedData: PreimageProps[] = [];

  const sortedBlocks = await sortBlocks();

  sortedBlocks.forEach((block) => {
    block.extrinsic.preimages.forEach((preimg) => {
      if (preimg.requester === serviceId) {
        let hashes = '';

        block.extrinsic.guarantees.forEach((guarantee) => {
          hashes = hashes + (guarantee.report.package_spec.hash + ' ');
        });
        const preimage: PreimageProps = {
          preimage: preimg,
          package_hash: hashes,
          timestamp: block.overview?.createdAt || 0
        };

        fetchedData.push(preimage);
      }
    });
  });

  return fetchedData;
};

export const getServiceLastSeenTime = async (
  serviceId: number
): Promise<string> => {
  const sortedBlocks = await sortBlocks();

  let lastTime = 0;

  sortedBlocks.forEach((block) => {
    block.extrinsic.guarantees.forEach((guarantee) => {
      guarantee.report.results.forEach((result) => {
        if (result.service_id === serviceId && lastTime === 0) {
          lastTime = block.overview?.createdAt || 0;
        }
      });
    });
  });

  return lastTime === 0 ? '-' : formatDate(lastTime);
};

export const sortStatistics = async (): Promise<Statistics[]> => {
  const statistics = await db.statistics
    .toArray()
    .then((items) => {
      const sortedItems = items.sort((a, b) => {
        const aCreatedAt = a.timestamp;
        const bCreatedAt = b.timestamp;

        if (aCreatedAt == null && bCreatedAt == null) {
          return 0;
        }

        if (aCreatedAt == null) {
          return 1;
        }

        if (bCreatedAt == null) {
          return -1;
        }

        return bCreatedAt - aCreatedAt;
      });

      return sortedItems;
    })
    .catch((error) => {
      console.error('Error sorting statistics from DB:', error);

      return [];
    });

  return statistics;
};

export const isActiveBlock = async (hash: string) => {
  const blocks = await sortBlocks();
  const block = blocks.find((item) => item.header_hash === hash);
  let isBusy = false;

  block?.extrinsic.guarantees.forEach((guarantee) => {
    if (guarantee.report.package_spec.hash.startsWith('0x')) {
      isBusy = true;
    }
  });

  return isBusy;
};

export const getActiveBlocks = async () => {
  const blocks = await sortBlocks();
  const hashes: string[] = [];

  blocks.forEach((block) => {
    let isBusy = false;

    block?.extrinsic.guarantees.forEach((guarantee) => {
      if (guarantee.report.package_spec.hash.startsWith('0x')) {
        isBusy = true;
      }
    });

    if (isBusy) {
      hashes.push(block.header_hash);
    }
  });

  return hashes;
};

export const filterCoreStatistics = async (
  coreIndex: number,
  active: boolean
): Promise<Record<number, CoreStatistics>> => {
  const statistics = await sortStatistics();
  const hashes = await getActiveBlocks();

  const result: Record<number, CoreStatistics> = {};

  statistics.forEach((item) => {
    (() => {
      const isActive =
        active === false
          ? true
          : hashes.findIndex((hash) => hash === item.hash) !== -1;

      if (isActive) {
        result[item.timestamp] = item.cores[coreIndex];
      }
    })();
  });

  return result;
};

export const fetchServiceStatisticsFromId = async (
  serviceId: number,
  active: boolean
): Promise<{ time: number; stat: ServiceStatistics }[]> => {
  const statistics = await sortStatistics();
  const hashes = await getActiveBlocks();

  const data: { time: number; stat: ServiceStatistics }[] = [];

  statistics.forEach((item) => {
    const isActive =
      active === false
        ? true
        : hashes.findIndex((hash) => hash === item.hash) !== -1;

    if (isActive) {
      const serviceStat = item.services.find(
        (stat) => stat.id.toString() === serviceId.toString()
      );

      if (serviceStat !== undefined) {
        data.push({ time: item.timestamp, stat: serviceStat.record });
      }
    }
  });

  return data.length > 9 ? data.slice(0, 8) : data;
};

export const fetchAggregateCoreStatistics = async (active: boolean) => {
  const statistics = await sortStatistics();
  const hashes = await getActiveBlocks();

  const result: Record<number, CoreStatistics> = {};

  statistics.forEach((item) => {
    (() => {
      const isActive =
        active === false
          ? true
          : hashes.findIndex((hash) => hash === item.hash) !== -1;

      if (isActive) {
        result[item.timestamp] = {
          gas_used: item.cores[0].gas_used + item.cores[1].gas_used,
          imports: item.cores[0].imports + item.cores[1].imports,
          extrinsic_count:
            item.cores[0].extrinsic_count + item.cores[1].extrinsic_count,
          extrinsic_size:
            item.cores[0].extrinsic_size + item.cores[1].extrinsic_size,
          exports: item.cores[0].exports + item.cores[1].exports,
          bundle_size: item.cores[0].bundle_size + item.cores[1].bundle_size,
          da_load: item.cores[0].da_load + item.cores[1].da_load,
          popularity: item.cores[0].popularity + item.cores[1].popularity
        };
      }
    })();
  });

  return result;
};

export const fetchAggregateServiceStatistics = async (active: boolean) => {
  const statistics = await sortStatistics();
  const hashes = await getActiveBlocks();

  const data: { time: number; stat: ServiceStatistics }[] = [];

  statistics.forEach((item) => {
    (async () => {
      const isActive =
        active === false
          ? true
          : hashes.findIndex((hash) => hash === item.hash) !== -1;

      if (isActive) {
        let aggStatistics: ServiceStatistics | undefined;

        item.services.forEach((service) => {
          if (aggStatistics === undefined) {
            aggStatistics = service.record;
          } else {
            aggStatistics = {
              provided_count:
                aggStatistics.provided_count + service.record.provided_count,
              provided_size:
                aggStatistics.provided_size + service.record.provided_size,
              refinement_count:
                aggStatistics.refinement_count +
                service.record.refinement_count,
              refinement_gas_used:
                aggStatistics.refinement_gas_used +
                service.record.refinement_gas_used,
              imports: aggStatistics.imports + service.record.imports,
              exports: aggStatistics.exports + service.record.exports,
              extrinsic_size:
                aggStatistics.extrinsic_size + service.record.extrinsic_size,
              extrinsic_count:
                aggStatistics.extrinsic_count + service.record.extrinsic_count,
              accumulate_count:
                aggStatistics.accumulate_count +
                service.record.accumulate_count,
              accumulate_gas_used:
                aggStatistics.accumulate_gas_used +
                service.record.accumulate_gas_used,
              on_transfers_count:
                aggStatistics.on_transfers_count +
                service.record.on_transfers_count,
              on_transfers_gas_used:
                aggStatistics.on_transfers_gas_used +
                service.record.on_transfers_gas_used
            };
          }
        });

        if (aggStatistics !== undefined) {
          data.push({ time: item.timestamp, stat: aggStatistics });
        }
      }
    })();
  });

  return data.length > 9 ? data.slice(0, 8) : data;
};

export const getTimeFromSlot = async (slot: number): Promise<number> => {
  const sortedBlocks = await sortBlocks();

  const block = sortedBlocks.find(
    (block) => block.header.slot.toString() === slot.toString()
  );

  return block?.overview?.createdAt || 0;
};

export interface ValidatorResult {
  previous: KeyedItem;
  current: KeyedItem;
  next: KeyedItem;
  staging: KeyedItem;
}

export const getValidator = async (
  index: number,
  hash: string
): Promise<ValidatorResult | null> => {
  const state = await fetchState(hash, getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org'));

  let result = null;

  if (state !== null) {
    result = {
      previous: state.iota[index],
      current: state.kappa[index],
      next: state.lambda[index],
      staging: state.gamma.gamma_k[index]
    };
  }

  return result;
};

export interface ValidatorStatistics {
  current: PiEntry;
  last: PiEntry;
}

export const fetchValidatorStatistics = async (
  index: number,
  hash: string
): Promise<ValidatorStatistics | null> => {
  const state = await fetchState(hash, getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org'));

  let result: ValidatorStatistics | null = null;

  if (state !== null) {
    result = {
      current: state.pi.vals_current[index],
      last: state.pi.vals_last[index]
    };
  }

  return result;
};

export interface ValidatorKey {
  previous: number;
  current: number;
  next: number;
  staging: number;
  item: KeyedItem;
}

export const fetchValidatorFromKey = async (
  key: string,
  hash: string
): Promise<ValidatorKey | null> => {
  const state = await fetchState(hash, getRpcUrlFromWs(localStorage.getItem('jamUrl') || 'dot-0.jamduna.org'));

  let result: ValidatorKey | null = null;

  if (state !== null) {
    const prevIndex = state.iota.findIndex(
      (item: { bandersnatch: string; bls: string; ed25519: string; }) =>
        item.bandersnatch === key || item.bls === key || item.ed25519 === key
    );
    const curIndex = state.kappa.findIndex(
      (item: { bandersnatch: string; bls: string; ed25519: string; }) =>
        item.bandersnatch === key || item.bls === key || item.ed25519 === key
    );
    const nextIndex = state.lambda.findIndex(
      (item: { bandersnatch: string; bls: string; ed25519: string; }) =>
        item.bandersnatch === key || item.bls === key || item.ed25519 === key
    );
    const stagIndex = state.gamma.gamma_k.findIndex(
      (item: { bandersnatch: string; bls: string; ed25519: string; }) =>
        item.bandersnatch === key || item.bls === key || item.ed25519 === key
    );

    if (prevIndex !== -1) {
      result = {
        previous: prevIndex,
        current: curIndex,
        next: nextIndex,
        staging: stagIndex,
        item: state.iota[prevIndex]
      };
    } else if (curIndex !== -1) {
      result = {
        previous: prevIndex,
        current: curIndex,
        next: nextIndex,
        staging: stagIndex,
        item: state.kappa[curIndex]
      };
    } else if (nextIndex !== -1) {
      result = {
        previous: prevIndex,
        current: curIndex,
        next: nextIndex,
        staging: stagIndex,
        item: state.lambda[nextIndex]
      };
    } else if (stagIndex !== -1) {
      result = {
        previous: prevIndex,
        current: curIndex,
        next: nextIndex,
        staging: stagIndex,
        item: state.gamma.gamma_k[stagIndex]
      };
    }
  }

  return result;
};
