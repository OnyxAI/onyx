/**
 *
 * BasicNav
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Navbar, NavItem, Icon } from 'react-materialize';

// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function BasicNav({ logoutUserFunc, user }) {
  return (
    <div className="uk-hidden@xl">
      <Navbar
        alignLinks="left"
        className={` darken-1 ${user.color}`}
        brand={
          <a className="brand-logo center" href="/">
            Onyx
          </a>
        }
        menuIcon={<Icon>menu</Icon>}
        options={{
          draggable: true,
          edge: 'left',
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          outDuration: 200,
          preventScrolling: true,
        }}
      >
        <NavItem href="/">
          <FormattedMessage {...messages.home} />
        </NavItem>
        <NavItem href="/user/manage">
          <FormattedMessage {...messages.myaccount} />
        </NavItem>
        <NavItem onClick={() => logoutUserFunc()}>
          <FormattedMessage {...messages.logout} />
        </NavItem>
      </Navbar>
    </div>
  );
}

BasicNav.propTypes = {
  logoutUserFunc: PropTypes.func,
  user: PropTypes.object,
};

export default memo(BasicNav);
