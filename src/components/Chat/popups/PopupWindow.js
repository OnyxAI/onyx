import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function PopupWindow({ isOpen, children, onInputChange, onClickedOutside }) {
  let scLauncher = null;
  const [emojiPopup, setEmoji] = useState({});

  function interceptLauncherClick(e) {
    const clickedOutside = !emojiPopup.contains(e.target) && isOpen;
    if (clickedOutside) {
      onClickedOutside(e);
    }
  }

  useEffect(() => {
    scLauncher = document.querySelector('#sc-launcher');
    if (scLauncher) {
      scLauncher.addEventListener('click', interceptLauncherClick);
    }

    return () => {
      if (scLauncher) {
        scLauncher.removeEventListener('click', interceptLauncherClick);
      }
    };
  });

  return (
    <div className="sc-popup-window" ref={e => setEmoji(e)}>
      <div className={`sc-popup-window--cointainer ${isOpen ? '' : 'closed'}`}>
        <input
          onChange={onInputChange}
          className="sc-popup-window--search"
          placeholder="Search emoji..."
        />
        {children}
      </div>
    </div>
  );
}

PopupWindow.propTypes = {
  isOpen: PropTypes.bool,
  onClickedOutside: PropTypes.func,
  onInputChange: PropTypes.func,
  children: PropTypes.object,
};

export default PopupWindow;
