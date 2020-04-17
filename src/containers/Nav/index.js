/**
 *
 * Nav
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { getLogo } from '@onyx/utils/colors';
import SubCircle from '@onyx/components/NavBar/SubCircle';
import UserNav from '@onyx/components/NavBar/UserNav';
import BasicNav from '@onyx/components/NavBar/BasicNav';
import Buttons from '@onyx/components/NavBar/Buttons';
import { ManageButton, ManageIcon } from '@onyx/components/NavBar/ManageButton';
import RemoveButtons from '@onyx/components/NavBar/RemoveButtons';

import Chat from '@onyx/components/Chat/index';

import { getRoutes } from '@onyx/utils/getRoutes';

import { useInjectSaga } from '@onyx/utils/injectSaga';
import { useInjectReducer } from '@onyx/utils/injectReducer';

import makeSelectNav from './selectors';
import { makeSelectNeurons } from '../Neurons/selectors';

import { makeSelectNotifications } from '../Notifications/selectors';
import { getNotifications } from '../Notifications/actions';
import notificationsSaga from '../Notifications/saga';
import notificationsReducer from '../Notifications/reducer';

import {
  getNav,
  addNav,
  changeNavColor,
  changeNavUrl,
  changeNavIcon,
  changeOnManage,
  changeNavCustomIcon,
  removeNav,
  changeButton,
} from './actions';

import settingsButton from './settingsButton.json';

import reducer from './reducer';
import saga from './saga';

export const getButtonIcon = (buttonNumber, buttons) => {
  if (buttons) {
    const currentButton = buttons.filter(
      button => button.buttonNumber === buttonNumber,
    );
    if (currentButton.length === 1) {
      return currentButton[0].icon;
    }
    return 'fa fa-circle';
  }
  return 'fa fa-circle';
};

export function Nav({
  sockyx,
  neurons,
  getNotificationsFunc,
  notifications,
  nav,
  user,
  logoutUserFunc,
  getNavFunc,
  removeNavFunc,
  addNavFunc,
  onChangeNavColor,
  onChangeNavIcon,
  onChangeNavCustomIcon,
  onChangeNavUrl,
  onChangeManage,
  onChangeButton,
}) {
  useInjectReducer({ key: 'nav', reducer });
  useInjectSaga({ key: 'nav', saga });
  useInjectReducer({ key: 'notifications', reducer: notificationsReducer });
  useInjectSaga({ key: 'notifications', saga: notificationsSaga });

  const allRoutes = getRoutes(user.language, neurons.neurons);

  useEffect(() => {
    getNotificationsFunc();
    getNavFunc();
  }, [0]);

  return (
    <div>
      <div className="uk-visible@xl">
        {['1', '2', '3', '4', '5'].map(buttonNumber => (
          <div>
            <ManageIcon
              user={user}
              onChangeNavCustomIcon={onChangeNavCustomIcon}
              currentIcon={getButtonIcon(buttonNumber, nav.buttons)}
              customIconInput={nav.customIcon}
              onChangeButton={onChangeButton}
              onManage={nav.onManage}
              selected={nav.selectedButton}
              language={user.language}
              buttonNumber={buttonNumber}
            />
            <input
              className="hidden-trigger_top"
              id={`toogle${buttonNumber}`}
              type="checkbox"
            />
            <label
              className={`button-top${buttonNumber} uk-position-fixed btn-floating btn-large ${
                user.color
              } darken-1`}
              htmlFor={`toogle${buttonNumber}`}
            >
              <i className={getButtonIcon(buttonNumber, nav.buttons)} />
            </label>
            <div className={`subs${buttonNumber} subs`}>
              <Buttons
                addNavFunc={addNavFunc}
                allRoutes={allRoutes}
                nav={nav.nav}
                onChangeNavIcon={onChangeNavIcon}
                onChangeNavUrl={onChangeNavUrl}
                onChangeNavColor={onChangeNavColor}
                onManage={nav.onManage}
                color={nav.color}
                url={nav.url}
                icon={nav.icon}
                language={user.language}
                buttonNumber={buttonNumber}
              />
              <ManageButton
                onChangeManage={onChangeManage}
                onManage={nav.onManage}
                selected={nav.selectedButton}
                buttonNumber={buttonNumber}
              />
              <RemoveButtons
                removeNavFunc={removeNavFunc}
                nav={nav.nav}
                selected={nav.selectedButton}
                onManage={nav.onManage}
                buttonNumber={buttonNumber}
              />
            </div>
          </div>
        ))}
        <div>
          <input className="hidden-trigger_top" id="toogle6" type="checkbox" />
          <label
            className={`button-top6 uk-position-fixed btn-floating btn-large ${
              user.color
            } darken-1`}
            htmlFor="toogle6"
          >
            <i className="fa fa-cog" />
          </label>
          <div className="subs6 subs">
            {settingsButton.map((button, index) => {
              if (button.admin !== 'true') {
                return (
                  <SubCircle
                    buttonNumber="6"
                    position={(index + 1).toString()}
                    language={user.language}
                    classColor={user.color}
                    icon={button.icon}
                    url={button.url}
                  />
                );
              }
              if (
                button.admin &&
                button.admin === 'true' &&
                user.account_type === 1
              ) {
                return (
                  <SubCircle
                    buttonNumber="6"
                    position={(index + 1).toString()}
                    language={user.language}
                    classColor={user.color}
                    icon={button.icon}
                    url={button.url}
                  />
                );
              }
              return (
                <SubCircle
                  buttonNumber="6"
                  position={(index + 1).toString()}
                  language={user.language}
                  classColor={user.color}
                  icon={undefined}
                  url={undefined}
                />
              );
            })}
          </div>
        </div>
        <Link to="/">
          <Img
            alt="Logo"
            className="uk-position-fixed uk-position-top-center logo-top"
            src={getLogo(user.color)}
          />
        </Link>
      </div>
      <Chat sockyx={sockyx} user={user} />
      {notifications && !notifications.loading && (
        <UserNav
          logoutUserFunc={logoutUserFunc}
          user={user}
          notifications={notifications}
        />
      )}
      <BasicNav logoutUserFunc={logoutUserFunc} user={user} />
    </div>
  );
}

Nav.propTypes = {
  sockyx: PropTypes.object,
  notifications: PropTypes.object,
  user: PropTypes.object,
  logoutUserFunc: PropTypes.func,
  getNavFunc: PropTypes.func,
  nav: PropTypes.object,
  neurons: PropTypes.object,
  getNotificationsFunc: PropTypes.func,
  removeNavFunc: PropTypes.func,
  addNavFunc: PropTypes.func,
  onChangeNavUrl: PropTypes.func,
  onChangeNavIcon: PropTypes.func,
  onChangeNavCustomIcon: PropTypes.func,
  onChangeNavColor: PropTypes.func,
  onChangeManage: PropTypes.func,
  onChangeButton: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  nav: makeSelectNav(),
  neurons: makeSelectNeurons(),
  notifications: makeSelectNotifications(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getNavFunc: () => {
      dispatch(getNav());
    },
    getNotificationsFunc: () => {
      dispatch(getNotifications());
    },
    addNavFunc: (evt, buttonNumber, position) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(addNav(buttonNumber, position));
    },
    removeNavFunc: (buttonNumber, position) => {
      dispatch(removeNav(buttonNumber, position));
    },
    onChangeNavColor: color => {
      dispatch(changeNavColor(color.hex));
    },
    onChangeManage: (evt, button) => {
      dispatch(changeOnManage(evt.target.checked, button));
    },
    onChangeNavUrl: evt => {
      dispatch(changeNavUrl(evt.target.value));
    },
    onChangeNavIcon: evt => {
      if (evt.target) {
        dispatch(changeNavIcon(evt.target.value));
      } else {
        dispatch(changeNavIcon(evt));
      }
    },
    onChangeNavCustomIcon: evt => {
      if (evt.target) {
        dispatch(changeNavCustomIcon(evt.target.value));
      } else {
        dispatch(changeNavCustomIcon(evt));
      }
    },
    onChangeButton: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(changeButton());
    },
  };
}

const Img = styled.img`
  top: 20px;
  width: 200px;
  height: 200px;
`;

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Nav);
