import React from 'react';
import PropTypes from 'prop-types';

const EmojiMessage = props => (
  <div className="sc-message--emoji">{props.data.emoji}</div>
);

EmojiMessage.propTypes = {
  data: PropTypes.array,
};

export default EmojiMessage;
