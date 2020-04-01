/**
 *
 * RemoveButton
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

function RemoveButtons({ nav, onManage, removeNavFunc, buttonNumber }) {
  return (
    <div>
      {onManage &&
        nav.map(
          (item, index) =>
            item.buttonNumber === buttonNumber && (
              <button
                key={index.toString()}
                type="button"
                className={`sub-circle-remove uk-animation-fade button-nav-remove-${
                  item.position
                }`}
                style={{ backgroundColor: 'rgba(187, 0, 0)' }}
                onClick={() => removeNavFunc(item.buttonNumber, item.position)}
              >
                <input
                  className="hidden-sub-trigger"
                  name="sub-circle-remove"
                />
                <i
                  className="fa fa-remove"
                  style={{
                    fontSize: '10px',
                    color: 'white',
                    position: 'relative',
                    bottom: '7.5%',
                  }}
                />
              </button>
            ),
        )}
    </div>
  );
}

RemoveButtons.propTypes = {
  nav: PropTypes.array,
  removeNavFunc: PropTypes.func,
  onManage: PropTypes.bool,
  buttonNumber: PropTypes.string,
};

export default memo(RemoveButtons);
