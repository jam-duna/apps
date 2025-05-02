// Copyright 2017-2025 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HeaderExtended } from '@polkadot/api-derive/types';
import type { KeyedEvent } from '@polkadot/react-hooks/ctx/types';

import React from 'react';

import { Columar } from '@polkadot/react-components';
import { useBlockAuthors, useBlockEvents } from '@polkadot/react-hooks';

import BlockHeaders from './BlockHeaders.js';
import Events from './Events.js';
import Query from './Query.js';
import Summary from './Summary.js';

interface Props {
  eventCount: number;
  events: KeyedEvent[];
  headers: HeaderExtended[];
}

function BlockMain (): React.ReactElement<Props> {
  const { lastHeaders } = useBlockAuthors(); // * change this to eth blocks hook
  // const { eventCount, events } = useBlockEvents();

  return (
    <>
      {/*
        <Query />
        <Summary eventCount={eventCount} />
      */}

      <Columar>
        <BlockHeaders headers={lastHeaders} />
        {/*
        <Columar.Column>
          <BlockHeaders headers={lastHeaders} />
        </Columar.Column>
        <Columar.Column>
          <Events events={events} />
        </Columar.Column>
        */}
      </Columar>
    </>
  );
}

export default React.memo(BlockMain);
