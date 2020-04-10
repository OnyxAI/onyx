/* eslint-disable no-self-compare */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-this-in-sfc */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import launcherIcon from '@onyx/assets/img/chat/logo-no-bg.svg';
// import incomingMessageSound from 'assets/img/chat/sounds/notification.mp3';
import launcherIconActive from '@onyx/assets/img/chat/close-icon.png';

import ChatWindow from './ChatWindow';

/**
export function playIncomingMessageSound() {
  const audio = new Audio(incomingMessageSound);
  audio.play();
}
*/

function Launcher(props) {
  const [isOpen, setIsOpen] = useState(false);

  const classList = [
    'sc-launcher darken-1',
    isOpen ? 'opened' : '',
    props.color,
  ];

  function handleClick() {
    setIsOpen(!isOpen);
  }

  /** Play a sound
  useEffect(() => {
    if (props.mute) {
      return;
    }
    const nextMessage = props.messageList[props.messageList.length - 1];
    const isIncoming = (nextMessage || {}).author === 'them';
    if (isIncoming) {
      playIncomingMessageSound();
    }
  }, [props.messageList.length]);
  */

  return (
    <div id="sc-launcher">
      <KeyboardEventHandler
        handleKeys={['esc']}
        onKeyEvent={() => setIsOpen(false)}
      />
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

export const MessageCount = props => {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return <div className="sc-new-messages-count">{props.count}</div>;
};

MessageCount.propTypes = {
  count: PropTypes.number,
  isOpen: PropTypes.bool,
};

Launcher.propTypes = {
  color: PropTypes.string,
  onMessageWasSent: PropTypes.func,
  agentProfile: PropTypes.object,
  onFilesSelected: PropTypes.func,
  newMessagesCount: PropTypes.number,
  messageList: PropTypes.arrayOf(PropTypes.object),
  showEmoji: PropTypes.bool,
};

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true,
};

export default Launcher;
