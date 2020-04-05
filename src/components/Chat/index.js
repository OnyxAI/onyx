import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Launcher from './Launcher';

import 'assets/css/chat/index';

function Chat({ sockyx, user }) {
  const [messageList, addMessage] = useState([]);

  useEffect(() => {
    sockyx.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data);
      if (message.type === 'speak') {
        const addingMessage = {
          author: 'them',
          type: 'text',
          data: { text: message.data.utterance },
        };
        addMessage([...messageList, addingMessage]);
      }
    };
  });

  function onMessageWasSent(message) {
    addMessage([...messageList, message]);

    const onyxMessage = {
      type: 'onyx_recognizer:utterance',
      data: {
        utterance: message.data.text,
        token: localStorage.getItem('access_token'),
      },
    };
    sockyx.send(JSON.stringify(onyxMessage));
  }

  return (
    <div className="chat-wrapper">
      <Launcher
        agentProfile={{
          teamName: 'Onyx',
        }}
        color={user.color}
        onMessageWasSent={onMessageWasSent}
        messageList={messageList}
        showEmoji
      />
    </div>
  );
}

Chat.propTypes = {
  sockyx: PropTypes.object,
  user: PropTypes.object,
};

export default Chat;
