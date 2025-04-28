// Copyright 2017-2025 @polkadot/app-jam authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

interface Props {
  className?: string;
}

function Utilities ({ className }: Props): React.ReactElement<Props> {
  // you can pull in t() if you want any text,
  // but for now leave it empty
  return (
    <div className={className}>
      <p>JAM Utils Page goes here</p>
    </div>
  );
}

export default React.memo(Utilities);