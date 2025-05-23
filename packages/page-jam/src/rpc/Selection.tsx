// Copyright 2017-2025 @polkadot/app-rpc authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { QueueTxRpcAdd } from '@polkadot/react-components/Status/types';
import type { ParamDef, RawParam } from '@polkadot/react-params/types';
import type { DefinitionRpcExt } from '@polkadot/types/types';

import React, { useCallback, useMemo, useState } from 'react';

import { Button, InputRpc } from '@polkadot/react-components';
// import { Button } from '@polkadot/react-components';
// import MockInputRpc from './mockTemp/MockInputRpc.js'
// import { jsonrpc } from './mockTemp/jsonRpc.js';
import Params from '@polkadot/react-params';
import { getTypeDef } from '@polkadot/types/create';
import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import { isNull } from '@polkadot/util';

import { useTranslation } from '../translate.js';

interface Props {
  queueRpc: QueueTxRpcAdd;
}

interface State {
  isValid: boolean;
  rpc: DefinitionRpcExt;
  values: RawParam[];
}

console.log(jsonrpc);
// const defaultMethod = jsonrpc.jam.block;
const defaultMethod = jsonrpc.author.submitExtrinsic;

function Selection ({ queueRpc }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const [{ isValid, rpc, values }, setState] = useState<State>({
    isValid: false,
    rpc: defaultMethod,
    values: []
  });

  const params = useMemo(
    () => rpc.params.map(({ isOptional, name, type }): ParamDef => ({
      name,
      type: getTypeDef(isOptional ? `Option<${type}>` : type)
    })),
    [rpc]
  );

  const _nextState = useCallback(
    (newState: Partial<State>) => setState((prevState: State): State => {
      const { rpc = prevState.rpc, values = prevState.values } = newState;
      const reqCount = rpc.params.reduce((count, { isOptional }) => count + (isOptional ? 0 : 1), 0);
      const isValid = values.reduce((isValid, value) => isValid && value.isValid === true, reqCount <= values.length);

      return {
        isValid,
        rpc,
        values
      };
    }),
    []
  );

  const _onChangeMethod = useCallback(
    (rpc: DefinitionRpcExt) => _nextState({ rpc, values: [] }),
    [_nextState]
  );

  const _onChangeValues = useCallback(
    (values: RawParam[]) => _nextState({ values }),
    [_nextState]
  );

  const _onSubmit = useCallback(
    (): void => queueRpc({
      rpc,
      values: values
        .filter(({ value }, idx) => !rpc.params[idx].isOptional || !isNull(value))
        .map(({ value }): any => value)
    }),
    [queueRpc, rpc, values]
  );

  return (
    <section className='rpc--Selection'>

      <InputRpc
        defaultValue={defaultMethod}
        label={t('call the selected endpoint')}
        onChange={_onChangeMethod}
      />
      {/*
      <MockInputRpc
        jsonrpc={{ jam: jsonrpc.jam }}
        defaultSection='jam'
        defaultMethod={rpc.method}
        className='input-rpc'
        onChange={_onChangeMethod}
      />
      */}

      <Params
        key={`${rpc.section}.${rpc.method}:params` /* force re-render on change */}
        onChange={_onChangeValues}
        params={params}
      />
      <Button.Group>
        <Button
          icon='sign-in-alt'
          isDisabled={!isValid}
          label={t('Submit RPC call')}
          onClick={_onSubmit}
        />
      </Button.Group>
    </section>
  );
}

export default React.memo(Selection);
