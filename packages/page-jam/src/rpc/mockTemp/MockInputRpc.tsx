import React, { useEffect, useState } from 'react';
import type { DefinitionRpcExt } from '@polkadot/types/types';

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

export default function MockInputRpc({
  className = '',
  jsonrpc,
  defaultSection,
  defaultMethod,
  onChange
}: MockInputRpcProps): React.ReactElement {
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
    if (onChange && jsonrpc[section] && jsonrpc[section][method]) {
      onChange(jsonrpc[section][method]);
    }
  }, [section, method, onChange, jsonrpc]);

  return (
    <div className={className}>
      {/* Section selector – small */}
      <select
        className="small"
        value={section}
        onChange={(e) => setSection(e.target.value)}
      >
        {sections.map((sec) => (
          <option key={sec} value={sec}>
            {sec}
          </option>
        ))}
      </select>

      {/* Method selector – large */}
      <select
        className="large"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        {methods.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}
