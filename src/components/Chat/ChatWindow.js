import PropTypes from 'prop-types';
import React from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';

function ChatWindow(props) {
  const messageList = props.messageList || [];
  const classList = ['sc-chat-window', props.isOpen ? 'opened' : 'closed'];

  function onUserInputSubmit(message) {
    props.onUserInputSubmit(message);
  }

  function onFilesSelected(filesList) {
    props.onFilesSelected(filesList);
  }

  return (
    <div className={classList.join(' ')}>
      <Header
        color={props.color}
        teamName={props.agentProfile.teamName}
        imageUrl={props.agentProfile.imageUrl}
        onClose={props.onClose}
      />
      <MessageList
        color={props.color}
        messages={messageList}
        imageUrl={props.agentProfile.imageUrl}
      />
      <UserInput
        onSubmit={onUserInputSubmit}
        onFilesSelected={onFilesSelected}
        showEmoji={props.showEmoji}
      />
    </div>
  );
}

ChatWindow.propTypes = {
  color: PropTypes.string,
  agentProfile: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func,
  onUserInputSubmit: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
  messageList: PropTypes.array,
};

export default ChatWindow;
