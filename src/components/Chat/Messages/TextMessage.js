import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';

const TextMessage = props => (
  <div
    className={`sc-message--text darken-1 ${
      props.message.author === 'me' ? props.color : `${props.color} secondary`
    }`}
  >
    <Linkify properties={{ target: '_blank' }}>
      {props.message.data.text}
    </Linkify>
  </div>
);

TextMessage.propTypes = {
  color: PropTypes.string,
  message: PropTypes.object,
};

export default TextMessage;
