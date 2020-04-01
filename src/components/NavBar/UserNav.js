/**
 *
 * UserNav
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { SideNav, SideNavItem } from 'react-materialize';

import NavImg from 'assets/img/nav.png';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function UserNav({ logoutUserFunc, user }) {
  return (
    <div className="uk-visible@s">
      <SideNav
        trigger={
          <div className="avatar-button">
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
        className="side-nav"
      >
        <li>
          <div className="userView">
            <img src={NavImg} alt="" className="background" />
            <button type="button" className={`circle ${user.color} darken-1`}>
              <i className="fa fa-user" />
            </button>
            <span className="white-text name">
              {user.username !== undefined ? user.username : ''}
            </span>
            <span className="white-text email">
              {user.email !== undefined ? user.email : ''}
            </span>
          </div>
        </li>
        <SideNavItem href="/manage">
          <FormattedMessage {...messages.myaccount} />
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
  user: PropTypes.object,
};

export default memo(UserNav);
