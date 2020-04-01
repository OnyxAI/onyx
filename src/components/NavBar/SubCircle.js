/**
 *
 * SubCircle
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Modal, Collapsible, CollapsibleItem } from 'react-materialize';

import { getRoutes } from 'utils/getRoutes';

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
}) {
  return url === '' ? (
    <Modal
      header={<FormattedMessage {...messages.modal_header} />}
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
            <FormattedMessage {...messages.url}>
              {message => (
                <select
                  name="url"
                  className="uk-select uk-form-large"
                  value={urlInput}
                  onChange={onChangeNavUrl}
                  required
                >
                  <option defaultValue>{message}</option>
                  {getRoutes(language).map((item, index) => (
                    <option
                      key={index.toString()}
                      value={item.url}
                      onClick={() => onChangeNavIcon(item.icon)}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              )}
            </FormattedMessage>
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
};

export default memo(SubCircle);
