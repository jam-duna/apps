// Copyright 2017-2025 @polkadot/app-parachains authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { BN } from '@polkadot/util';
import type { AuctionInfo, WinnerData } from '../types.js';

import React from 'react';

import { AddressMini, ParaLink, Table } from '@polkadot/react-components';
import { formatNumber } from '@polkadot/util';

import { useTranslation } from '../translate.js';

interface Props {
  auctionInfo: AuctionInfo;
  blockNumber?: BN;
  className?: string;
  isFirst: boolean;
  isLatest: boolean;
  value: WinnerData;
}

function WinRanges ({ auctionInfo, blockNumber, className = '', isFirst, isLatest, value: { accountId, firstSlot, isCrowdloan, lastSlot, paraId, value } }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  return (
    <tr className={className}>
      <td>
        {isFirst && (
          <h1>{isLatest
            ? t('latest')
            : <>#{formatNumber((!blockNumber || blockNumber.isZero()) ? auctionInfo.endBlock : blockNumber)}</>
          }</h1>
        )}
      </td>
      <Table.Column.Id value={paraId} />
      <td className='badge'><ParaLink id={paraId} /></td>
      <td className='address'><AddressMini value={accountId} /></td>
      <td className='all number'>{isCrowdloan ? t('Yes') : t('No')}</td>
      <td className='all number together'>
        {firstSlot.eq(lastSlot)
          ? formatNumber(firstSlot)
          : `${formatNumber(firstSlot)} - ${formatNumber(lastSlot)}`
        }
      </td>
      <Table.Column.Balance value={value} />
    </tr>
  );
}

export default React.memo(WinRanges);
