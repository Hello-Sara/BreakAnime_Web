import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ text, style, backgroundColor }) => {
    const tagStyle = {
        display: 'inline-block',
        padding: '4px 8px',
        borderRadius: '4px',
        backgroundColor: backgroundColor,
        color: '#fff',
        ...style,
    };

    return <span style={tagStyle}>{text}</span>;
};

Tag.propTypes = {
    text: PropTypes.string.isRequired,
    style: PropTypes.object,
    backgroundColor: PropTypes.string,
};

export default Tag;