import React from 'react';
import PropTypes from 'prop-types';
import chatIconUrl from 'assets/img/chat/chat-icon.svg';
import TextMessage from './TextMessage';
import EmojiMessage from './EmojiMessage';
import FileMessage from './FileMessage';

function Message({ message, color }) {
  function renderMessageOfType(type) {
    switch (type) {
      case 'text':
        return <TextMessage color={color} message={message} />;
      case 'emoji':
        return <EmojiMessage {...message} />;
      case 'file':
        return <FileMessage {...message} />;
      default:
        return false;
    }
  }

  const contentClassList = [
    'sc-message--content',
    message.author === 'me' ? 'sent' : 'received',
  ];
  return (
    <div className="sc-message">
      <div className={contentClassList.join(' ')}>
        <div
          className="sc-message--avatar"
          style={{
            backgroundImage: `url(${chatIconUrl})`,
          }}
        />
        {renderMessageOfType(message.type)}
      </div>
    </div>
  );
}

Message.propTypes = {
  color: PropTypes.string,
  message: PropTypes.object,
};

export default Message;
