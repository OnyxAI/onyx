/* eslint-disable no-self-compare */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-this-in-sfc */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import launcherIcon from 'assets/img/chat/logo-no-bg.svg';
import incomingMessageSound from 'assets/img/chat/sounds/notification.mp3';
import launcherIconActive from 'assets/img/chat/close-icon.png';

import ChatWindow from './ChatWindow';

function Launcher(props) {
  const [isOpen, setIsOpen] = useState(false);

  if (props.isOpen) {
    setIsOpen(props.isOpen);
  }

  const classList = [
    'sc-launcher darken-1',
    isOpen ? 'opened' : '',
    props.color,
  ];

  function playIncomingMessageSound() {
    const audio = new Audio(incomingMessageSound);
    audio.play();
  }

  function handleClick() {
    if (props.handleClick !== undefined) {
      props.handleClick();
    } else {
      setIsOpen(!isOpen);
    }
  }

  useEffect(() => {
    if (props.mute) {
      return;
    }
    const nextMessage = props.messageList[props.messageList.length - 1];
    const isIncoming = (nextMessage || {}).author === 'them';
    const isNew = props.messageList.length > props.messageList.length;
    if (isIncoming && isNew) {
      playIncomingMessageSound();
    }
  }, [props]);

  return (
    <div id="sc-launcher">
      <div className={classList.join(' ')} onClick={handleClick}>
        <MessageCount count={props.newMessagesCount} isOpen={isOpen} />
        <img className="sc-open-icon" alt="" src={launcherIconActive} />
        <img className="sc-closed-icon" alt="" src={launcherIcon} />
      </div>
      <ChatWindow
        color={props.color}
        messageList={props.messageList}
        onUserInputSubmit={props.onMessageWasSent}
        onFilesSelected={props.onFilesSelected}
        agentProfile={props.agentProfile}
        isOpen={isOpen}
        onClose={handleClick}
        showEmoji={props.showEmoji}
      />
    </div>
  );
}

const MessageCount = props => {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return <div className="sc-new-messages-count">{props.count}</div>;
};

MessageCount.propTypes = {
  count: PropTypes.number,
  isOpen: PropTypes.bool,
}

Launcher.propTypes = {
  color: PropTypes.string,
  onMessageWasSent: PropTypes.func,
  agentProfile: PropTypes.object,
  onFilesSelected: PropTypes.array,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
  showEmoji: PropTypes.bool,
};

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true,
};

export default Launcher;
