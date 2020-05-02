/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

export default function Widget(props) {
  return (
    <div
      style={{ width: props.style.width, height: props.style.height }}
      className={`round-widget ${props.className}`}
    >
      {props.children}
    </div>
  );
}

Widget.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
};
