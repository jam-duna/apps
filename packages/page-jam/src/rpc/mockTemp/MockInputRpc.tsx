// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { DefinitionRpcExt } from '@polkadot/types/types';

import React, { useEffect, useState } from 'react';

interface MockInputRpcProps {
  className?: string;
  /** your generated JSON-RPC map: { jam: { block: {...}, bestBlock: {...}, … } } */
  jsonrpc: Record<string, Record<string, DefinitionRpcExt>>;
  /** initial selection */
  defaultSection?: string;
  defaultMethod?: string;
  /** fires on every change */
  onChange?: (value: DefinitionRpcExt) => void;
}

export default function MockInputRpc ({ className = '',
  defaultMethod,
  defaultSection,
  jsonrpc,
  onChange }: MockInputRpcProps): React.ReactElement {
  // 1) only one section: 'jam'
  const sections = Object.keys(jsonrpc);
  const [section, setSection] = useState<string>(defaultSection || sections[0]);

  // 2) all methods under the selected section
  const methods = Object.keys(jsonrpc[section] || {});
  const [method, setMethod] = useState<string>(
    defaultMethod && methods.includes(defaultMethod)
      ? defaultMethod
      : methods[0]
  );

  // whenever either changes, emit the new DefinitionRpcExt
  useEffect(() => {
    onChange?.(jsonrpc[section]?.[method]);
  }, [section, method, onChange, jsonrpc]);

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSection(e.target.value);
  };

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  return (
    <div className={className}>
      {/* Section selector – small */}
      <select
        className='small'
        // eslint-disable-next-line react/jsx-no-bind
        onChange={handleSectionChange}
        value={section}
      >
        {sections.map(function renderSection (sec) {
          return (
            <option
              key={sec}
              value={sec}
            >
              {sec}
            </option>
          );
        })}
      </select>
      {/* Method selector – large */}
      <select
        className='large'
        // eslint-disable-next-line react/jsx-no-bind
        onChange={handleMethodChange}
        value={method}
      >
        {methods.map(function renderMethod (m) {
          return (
            <option
              key={m}
              value={m}
            >
              {m}
            </option>
          );
        })}
      </select>
    </div>
  );
}
