import React from 'react';
import { ReactComponent as Icon } from '../../../../../assets/icons/global/add.svg';

function Add({ width = '30px', color = '#FF5733', className = '', onClick }) {
  return (
    <Icon
      style={{ '--color': color, 'fill': color, 'cursor': onClick ? 'pointer' : 'auto' }}
      width={width}
      height={width}
      className={className + (onClick ? ' clickable-icon' : '')}
      onClick={onClick}
    />
  );
}

export default Add;
