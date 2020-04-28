/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

export default function Widget(props) {
  return (
    <div className="uk-card uk-card-default">
      <div className="uk-card-header">
        <div className="uk-card-title">
          {props.title}{' '}
          <i
            className="fas fa-times-circle"
            style={{ cursor: 'pointer' }}
            onClick={() => props.delete()}
          />
        </div>
      </div>
      <div className="uk-card-body">{props.children}</div>
    </div>
  );
}

Widget.propTypes = {
  delete: PropTypes.func,
  title: PropTypes.object,
  children: PropTypes.object,
};
