/**
 *
 * Manage Button
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

function ManageButton({ buttonNumber, onChangeManage, onManage }) {
  return (
    <button type="button" className="sub-circle-manage button-nav-manage">
      <input
        className="hidden-sub-trigger"
        id={`sub${buttonNumber}_9`}
        name="sub-circle"
        checked={onManage}
        type="checkbox"
        onChange={onChangeManage}
        onClick={onChangeManage}
      />
      <label htmlFor={`sub${buttonNumber}_9`}>
        <i
          className="fa fa-wrench"
          style={{
            color: 'white',
            position: 'relative',
            bottom: '15%',
          }}
        />
      </label>
    </button>
  );
}

ManageButton.propTypes = {
  onChangeManage: PropTypes.func,
  onManage: PropTypes.bool,
  buttonNumber: PropTypes.string,
};

export default memo(ManageButton);
