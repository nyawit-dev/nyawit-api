import React from 'react';
import StyledWrapper from './StyledWrapper';
import { IconDatabase } from '@tabler/icons';
import { formatSize } from 'utils/common';

const ResponseSize = ({ size }) => {
  if (!Number.isFinite(size)) {
    return null;
  }

  const sizeToDisplay = formatSize(size, 2);

  return (
    <StyledWrapper title={(size?.toLocaleString() || '0') + 'B'} className="ml-2">
      <IconDatabase size={12} strokeWidth={2} className="metric-icon" aria-hidden="true" />
      <span>{sizeToDisplay}</span>
    </StyledWrapper>
  );
};

export default ResponseSize;
