/**
 *
 * Manage Button
 *
 */

import React from 'react';
import { Modal } from 'react-materialize';
import PropTypes from 'prop-types';
import { getMessage } from '@onyx/i18n';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

export function ManageButton({
  buttonNumber,
  onChangeManage,
  onManage,
  selected,
}) {
  return (
    <button type="button" className="sub-circle-manage button-nav-manage">
      <input
        className="hidden-sub-trigger"
        id={`sub${buttonNumber}_9`}
        name="sub-circle"
        checked={onManage && selected === buttonNumber}
        type="checkbox"
        onChange={evt => onChangeManage(evt, buttonNumber)}
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

export function ManageIcon({
  buttonNumber,
  currentIcon,
  onChangeNavCustomIcon,
  onChangeButton,
  user,
  customIconInput,
  onManage,
  selected,
  language,
}) {
  return onManage ? (
    selected === buttonNumber && (
      <Modal
        header={getMessage(
          language.substring(0, 2),
          messages.modal_header_icon.id,
        )}
        actions={<p />}
        options={{
          onOpenStart: () => onChangeNavCustomIcon(currentIcon),
        }}
        trigger={
          <button
            type="button"
            className={`manage-button-${buttonNumber} uk-animation-fade secondary ${
              user.color
            }`}
          >
            <i
              className="fa fa-cog"
              style={{
                fontSize: '25px',
                color: 'white',
                position: 'relative',
              }}
            />
          </button>
        }
      >
        <div>
          <form onSubmit={evt => onChangeButton(evt)}>
            <div className="uk-padding-small">
              <label htmlFor="icon">
                <FormattedMessage {...messages.custom_icon} />
              </label>
              <input
                type="text"
                className="uk-input uk-form-large"
                value={customIconInput}
                name="icon"
                id="icon"
                onChange={onChangeNavCustomIcon}
              />
            </div>
            <div className="uk-padding-small center">
              <button
                type="submit"
                className="uk-button uk-button-primary uk-button-large"
              >
                <FormattedMessage {...messages.send} />
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  ) : (
    <div />
  );
}

ManageIcon.propTypes = {
  onChangeNavCustomIcon: PropTypes.func,
  currentIcon: PropTypes.string,
  onChangeButton: PropTypes.func,
  customIconInput: PropTypes.string,
  selected: PropTypes.string,
  user: PropTypes.object,
  onManage: PropTypes.bool,
  buttonNumber: PropTypes.string,
  language: PropTypes.string,
};

ManageButton.propTypes = {
  selected: PropTypes.string,
  onChangeManage: PropTypes.func,
  onManage: PropTypes.bool,
  buttonNumber: PropTypes.string,
};
