/**
 *
 * SubCircle
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Modal, Collapsible, CollapsibleItem } from 'react-materialize';

import { getMessage } from '@onyx/i18n';

import { ChromePicker } from 'react-color';
import { Link } from 'react-router-dom';
import messages from './messages';

function SubCircle({
  buttonNumber,
  position,
  addNavFunc,
  onChangeNavColor,
  onChangeNavIcon,
  onChangeNavUrl,
  urlInput,
  iconInput,
  colorInput,
  language,
  url,
  color,
  classColor,
  icon,
  allRoutes,
}) {
  return url === '' ? (
    <Modal
      header={getMessage(language.substring(0, 2), messages.modal_header.id)}
      actions={<p />}
      trigger={
        <button
          type="button"
          className={`sub-circle button-nav-${position}`}
          style={{ backgroundColor: color }}
        >
          <input
            className="hidden-sub-trigger"
            id={`sub${buttonNumber}_${position}`}
            name="sub-circle"
          />
          <label htmlFor={`sub${buttonNumber}_${position}`}>
            <i
              className={icon}
              style={{ color: 'white', position: 'relative', bottom: '-1%' }}
            />
          </label>
        </button>
      }
    >
      <div>
        <form onSubmit={evt => addNavFunc(evt, buttonNumber, position)}>
          <div className="uk-padding-small uk-position-top-center uk-position-relative">
            <ChromePicker
              color={colorInput}
              onChangeComplete={onChangeNavColor}
            />
          </div>
          <div className="uk-padding-small">
            <label htmlFor="url">
              <FormattedMessage {...messages.url} />
            </label>
            <select
              name="url"
              className="uk-select uk-form-large"
              value={urlInput}
              onChange={onChangeNavUrl}
              required
            >
              {allRoutes.map((item, index) => (
                <option
                  key={index.toString()}
                  value={item.url}
                  onClick={() => onChangeNavIcon(item.icon)}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="uk-padding-small center">
            <button
              type="submit"
              className="uk-button uk-button-primary uk-button-large"
            >
              <FormattedMessage {...messages.send} />
            </button>
          </div>
          <Collapsible>
            <CollapsibleItem
              header={<FormattedMessage {...messages.other_settings} />}
              icon={<i className="fa fa-cogs" />}
            >
              <div className="uk-padding-small">
                <label htmlFor="icon">
                  <FormattedMessage {...messages.custom_icon} />
                </label>
                <FormattedMessage {...messages.custom_icon}>
                  {message => (
                    <input
                      type="text"
                      className="uk-input uk-form-large"
                      value={iconInput}
                      name="icon"
                      id="icon"
                      onChange={onChangeNavIcon}
                      placeholder={message}
                    />
                  )}
                </FormattedMessage>
              </div>
            </CollapsibleItem>
          </Collapsible>
        </form>
      </div>
    </Modal>
  ) : (
    <Link to={url !== undefined ? url : '/'}>
      <button
        type="button"
        className={`sub-circle button-nav-${position} ${classColor} secondary`}
        style={{ backgroundColor: color }}
      >
        <input
          className="hidden-sub-trigger"
          id={`sub${buttonNumber}_${position}`}
          name="sub-circle"
        />
        <label htmlFor={`sub${buttonNumber}_${position}`}>
          <i
            className={icon}
            style={{ color: 'white', position: 'relative', bottom: '-1%' }}
          />
        </label>
      </button>
    </Link>
  );
}

SubCircle.propTypes = {
  position: PropTypes.string,
  buttonNumber: PropTypes.string,
  addNavFunc: PropTypes.func,
  onChangeNavColor: PropTypes.func,
  onChangeNavUrl: PropTypes.func,
  onChangeNavIcon: PropTypes.func,
  colorInput: PropTypes.string,
  urlInput: PropTypes.string,
  iconInput: PropTypes.string,
  color: PropTypes.string,
  classColor: PropTypes.string,
  url: PropTypes.string,
  icon: PropTypes.string,
  language: PropTypes.string,
  allRoutes: PropTypes.array,
};

export default memo(SubCircle);
