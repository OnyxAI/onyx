import React from 'react';
import PropTypes from 'prop-types';

export default function Container(props) {
  return (
    <div
      className={`uk-card uk-card-default secondary ${props.user &&
        props.user.mode}`}
    >
      <div className="uk-card-header">
        <div className={`uk-card-title text ${props.user && props.user.mode}`}>
          {props.title}
        </div>
      </div>
      <div className="uk-card-body">{props.children}</div>
    </div>
  );
}

Container.propTypes = {
  title: PropTypes.object,
  user: PropTypes.object,
  children: PropTypes.object,
};
