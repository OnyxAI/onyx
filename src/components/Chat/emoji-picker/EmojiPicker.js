/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import EmojiConvertor from 'emoji-js';
import emojiData from './emojiData.json';

const emojiConvertor = new EmojiConvertor();
emojiConvertor.init_env();

const EmojiPicker = ({ onEmojiPicked, filter }) => (
  <div className="sc-emoji-picker">
    {emojiData.map(category => {
      const filteredEmojis = category.emojis.filter(({ name }) =>
        name.includes(filter),
      );
      return (
        <div className="sc-emoji-picker--category" key={category.name}>
          {filteredEmojis.length > 0 && (
            <div className="sc-emoji-picker--category-title">
              {category.name}
            </div>
          )}
          {filteredEmojis.map(({ char }) => (
            <span
              key={char}
              className="sc-emoji-picker--emoji"
              onClick={() => onEmojiPicked(char)}
            >
              {char}
            </span>
          ))}
        </div>
      );
    })}
  </div>
);

EmojiPicker.propTypes = {
  onEmojiPicked: PropTypes.func,
  filter: PropTypes.string,
};

export default EmojiPicker;
