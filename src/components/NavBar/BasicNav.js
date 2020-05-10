/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * BasicNav
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Navbar, NavItem, Icon } from 'react-materialize';

// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

export function BasicNav({ logoutUserFunc, user, history }) {
  return (
    <div className="uk-hidden@xl">
      <Navbar
        alignLinks="right"
        className={`darken-1 ${user.color}`}
        brand={
          <a className="brand-logo" onClick={() => history.push('/')}>
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
        <NavItem onClick={() => history.push('/')}>
          <FormattedMessage {...messages.home} />
        </NavItem>
        <NavItem onClick={() => history.push('/screen')}>
          <FormattedMessage {...messages.screen} />
        </NavItem>
        <NavItem onClick={() => history.push('/neurons')}>
          <FormattedMessage {...messages.neurons} />
        </NavItem>
        <NavItem onClick={() => history.push('/user/manage')}>
          <FormattedMessage {...messages.myaccount} />
        </NavItem>
        <NavItem onClick={() => history.push('/settings')}>
          <FormattedMessage {...messages.settings} />
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
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default memo(withRouter(BasicNav));
