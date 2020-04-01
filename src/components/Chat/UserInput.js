import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import SendIcon from './icons/SendIcon';
import FileIcon from './icons/FileIcon';
import EmojiIcon from './icons/EmojiIcon';
import PopupWindow from './popups/PopupWindow';
import EmojiPicker from './emoji-picker/EmojiPicker';

function UserInput(props) {
  const [fileUploadButton, setFileUploadButton] = useState(null);
  const [emojiPickerButton, setEmojiPickerButton] = useState(null);
  const [userInput, setUserInput] = useState(null);
  const [state, setState] = useState({
    inputActive: false,
    inputHasText: false,
    emojiPickerIsOpen: false,
    emojiFilter: '',
  });

  useEffect(() => {
    setEmojiPickerButton(document.querySelector('#sc-emoji-picker-button'));
  });

  function handleKeyDown(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      return submitText(event);
    }
  }

  function handleKeyUp(event) {
    const inputHasText =
      event.target.innerHTML.length !== 0 && event.target.innerText !== '\n';
    setState({ ...state, inputHasText });
  }

  function showFilePicker() {
    fileUploadButton.click();
  }

  function toggleEmojiPicker(e){
    e.preventDefault();
    if (!state.emojiPickerIsOpen) {
      setState({ ...state, emojiPickerIsOpen: true });
    }
  }

  function closeEmojiPicker(e){
    if (emojiPickerButton.contains(e.target)) {
      e.stopPropagation();
      e.preventDefault();
    }
    setState({ ...state, emojiPickerIsOpen: false });
  }

  function submitText(event) {
    event.preventDefault();
    const text = userInput.textContent;
    if (text && text.length > 0) {
      props.onSubmit({
        author: 'me',
        type: 'text',
        data: { text },
      });
      userInput.innerHTML = '';
    }
  }

  function onFilesSelected(event) {
    if (event.target.files && event.target.files.length > 0) {
      props.onFilesSelected(event.target.files);
    }
  }

  function handleEmojiPicked(emoji){
    setState({ ...state, emojiPickerIsOpen: false });
    if (state.inputHasText) {
      userInput.innerHTML += emoji;
    } else {
      props.onSubmit({
        author: 'me',
        type: 'emoji',
        data: { emoji },
      });
    }
  };

  function handleEmojiFilterChange(event) {
    const emojiFilter = event.target.value;
    setState({ emojiFilter });
  }

  function renderEmojiPopup() {
    return (
      <PopupWindow
        isOpen={state.emojiPickerIsOpen}
        onClickedOutside={closeEmojiPicker}
        onInputChange={handleEmojiFilterChange}
      >
        <EmojiPicker
          onEmojiPicked={handleEmojiPicked}
          filter={state.emojiFilter}
        />
      </PopupWindow>
    );
  }

  function renderSendOrFileIcon() {
    if (state.inputHasText) {
      return (
        <div className="sc-user-input--button">
          <SendIcon onClick={submitText} />
        </div>
      );
    }
    return (
      <div className="sc-user-input--button">
        <FileIcon onClick={showFilePicker} />
        <input
          type="file"
          name="files[]"
          multiple
          ref={e => {
            setFileUploadButton(e)
          }}
          onChange={onFilesSelected}
        />
      </div>
    );
  }

  return (
    <form className={`sc-user-input ${state.inputActive ? 'active' : ''}`}>
      <div
        role="button"
        tabIndex="0"
        onFocus={() => {
          setState({ ...state, inputActive: true });
        }}
        onBlur={() => {
          setState({ ...state, inputActive: false });
        }}
        ref={e => {
          setUserInput(e)
        }}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        contentEditable="true"
        placeholder="Écrire une réponse..."
        className="sc-user-input--text"
      />
      <div className="sc-user-input--buttons">
        <div className="sc-user-input--button" />
        <div className="sc-user-input--button">
          {props.showEmoji && (
            <EmojiIcon
              onClick={toggleEmojiPicker}
              isActive={state.emojiPickerIsOpen}
              tooltip={renderEmojiPopup()}
            />
          )}
        </div>
        {renderSendOrFileIcon()}
      </div>
    </form>
  );
}

UserInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFilesSelected: PropTypes.func.isRequired,
  showEmoji: PropTypes.bool,
};

export default UserInput;
