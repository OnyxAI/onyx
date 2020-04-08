/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '@onyx/assets/img/chat/close-icon.png';

function Header(props) {
  return (
    <div className={`sc-header darken-1 ${props.color}`}>
      <img className="sc-header--img" src={props.imageUrl} alt="" />
      <div className="sc-header--team-name"> {props.teamName} </div>
      <div
        className={`sc-header--close-button darken-1 secondary ${props.color}`}
        onClick={props.onClose}
      >
        <img src={closeIcon} alt="" />
      </div>
    </div>
  );
}

Header.propTypes = {
  color: PropTypes.string,
  imageUrl: PropTypes.string,
  teamName: PropTypes.string,
  onClose: PropTypes.func,
};

export default Header;
