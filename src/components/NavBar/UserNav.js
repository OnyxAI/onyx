/* eslint-disable no-unused-vars */
/**
 *
 * UserNav
 *
 */

import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SideNav, SideNavItem } from 'react-materialize';
import M from 'materialize-css';
import NavImg from '@onyx/assets/img/nav.png';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

export function UserNav({ logoutUserFunc, user, history, notifications }) {
  const getUnseenNotifications = allNotifications => {
    if (allNotifications) {
      return allNotifications.notifications.filter(
        notification => !notification.seen,
      ).length;
    }
    return 0;
  };

  return (
    <div className="uk-visible@s">
      <SideNav
        trigger={
          <div className="avatar-button">
            {getUnseenNotifications(notifications) !== 0 && (
              <span className={`uk-badge avatar-badge ${user.color} secondary`}>
                {getUnseenNotifications(notifications)}
              </span>
            )}

            <button
              type="button"
              className={`vertical button-collapse btn-floating btn-large ${
                user.color
              } darken-1`}
            >
              <i className="fa fa-user" />
            </button>
          </div>
        }
        options={{ closeOnClick: true }}
        className={`side-nav secondary ${user.mode}`}
      >
        <li>
          <div className="userView">
            <img src={NavImg} alt="" className="background" />
            <button type="button" className={`circle ${user.color} darken-1`}>
              <i className="fa fa-user" style={{ color: 'white' }} />
            </button>
            <span className="white-text name">
              {user.username !== undefined ? user.username : ''}
            </span>
            <span className="white-text email">
              {user.email !== undefined ? user.email : ''}
            </span>
          </div>
        </li>
        <SideNavItem onClick={() => history.push('/user/manage')}>
          <FormattedMessage {...messages.myaccount} />
        </SideNavItem>
        <SideNavItem onClick={() => history.push('/notifications')}>
          <FormattedMessage {...messages.notifications} />
        </SideNavItem>
        <SideNavItem divider />
        <SideNavItem waves onClick={() => logoutUserFunc()}>
          <FormattedMessage {...messages.logout} />
        </SideNavItem>
      </SideNav>
    </div>
  );
}

UserNav.propTypes = {
  logoutUserFunc: PropTypes.func,
  notifications: PropTypes.object,
  user: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default memo(withRouter(UserNav));
