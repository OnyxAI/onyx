import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Message from './Messages';

function MessageList(props) {
  const [scrollList, setScroll] = useState({});

  useEffect(() => {
    scrollList.scrollTop = scrollList.scrollHeight;
  });

  return (
    <div
      className="sc-message-list"
      scrolllist={scrollList}
      ref={el => setScroll(el)}
    >
      {props.messages.map((message, i) => (
        <Message color={props.color} message={message} key={i.toString()} />
      ))}
    </div>
  );
}

MessageList.propTypes = {
  color: PropTypes.string,
  messages: PropTypes.array,
};

export default MessageList;
