import React from 'react';
import { ReactComponent as Icon } from '../../../../assets/logos/logo_VBlanc.svg';

function Logo({ width = '169px', height = '64px', color = '', className = '', onClick }) {
  return (
    <Icon
      style={{ '--color': color, 'fill': color, 'cursor': 'pointer' }}
      width={width}
      className={className + (onClick ? ' clickable-icon' : '')}
      onClick={onClick}
    />
  );
}

export default Logo;
