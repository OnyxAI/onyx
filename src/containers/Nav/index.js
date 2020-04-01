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

import { getLogo } from 'utils/colors';
import SubCircle from 'components/NavBar/SubCircle';
import UserNav from 'components/NavBar/UserNav';
import BasicNav from 'components/NavBar/BasicNav';
import Buttons from 'components/NavBar/Buttons';
import ManageButton from 'components/NavBar/ManageButton';
import RemoveButtons from 'components/NavBar/RemoveButtons';

import Chat from 'components/Chat/index';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import makeSelectNav from './selectors';

import {
  getNav,
  addNav,
  changeNavColor,
  changeNavUrl,
  changeNavIcon,
  changeOnManage,
  removeNav,
} from './actions';

import reducer from './reducer';
import saga from './saga';

export function Nav({
  sockyx,
  nav,
  user,
  logoutUserFunc,
  getNavFunc,
  removeNavFunc,
  addNavFunc,
  onChangeNavColor,
  onChangeNavIcon,
  onChangeNavUrl,
  onChangeManage,
}) {
  useInjectReducer({ key: 'nav', reducer });
  useInjectSaga({ key: 'nav', saga });

  useEffect(() => {
    getNavFunc();
  }, [0]);

  return (
    <div>
      <div className="uk-visible@xl">
        <div>
          <input className="hidden-trigger_top" id="toogle1" type="checkbox" />
          <label
            className={`button-top1 uk-position-fixed btn-floating btn-large ${
              user.color
            } darken-1`}
            htmlFor="toogle1"
          >
            <i className="fa fa-table" />
          </label>
          <div className="subs1 subs">
            <Buttons
              addNavFunc={addNavFunc}
              nav={nav.nav}
              onChangeNavIcon={onChangeNavIcon}
              onChangeManage={onChangeManage}
              onChangeNavUrl={onChangeNavUrl}
              onChangeNavColor={onChangeNavColor}
              onManage={nav.onManage}
              color={nav.color}
              url={nav.url}
              icon={nav.icon}
              language={user.language}
              buttonNumber="1"
            />
            <ManageButton
              onChangeManage={onChangeManage}
              onManage={nav.onManage}
              buttonNumber="1"
            />
            <RemoveButtons
              removeNavFunc={removeNavFunc}
              nav={nav.nav}
              onManage={nav.onManage}
              buttonNumber="1"
            />
          </div>
        </div>
        <div>
          <input className="hidden-trigger_top" id="toogle2" type="checkbox" />
          <label
            className={`button-top2 uk-position-fixed btn-floating btn-large ${
              user.color
            } darken-1`}
            htmlFor="toogle2"
          >
            <i className="fa fa-suitcase" />
          </label>
          <div className="subs2 subs">
            <Buttons
              addNavFunc={addNavFunc}
              nav={nav.nav}
              onChangeNavIcon={onChangeNavIcon}
              onChangeManage={onChangeManage}
              onChangeNavUrl={onChangeNavUrl}
              onChangeNavColor={onChangeNavColor}
              onManage={nav.onManage}
              color={nav.color}
              url={nav.url}
              icon={nav.icon}
              language={user.language}
              buttonNumber="2"
            />
            <ManageButton
              onChangeManage={onChangeManage}
              onManage={nav.onManage}
              buttonNumber="2"
            />
            <RemoveButtons
              removeNavFunc={removeNavFunc}
              nav={nav.nav}
              onManage={nav.onManage}
              buttonNumber="2"
            />
          </div>
        </div>
        <div>
          <input className="hidden-trigger_top" id="toogle3" type="checkbox" />
          <label
            className={`button-top3 uk-position-fixed btn-floating btn-large ${
              user.color
            } darken-1`}
            htmlFor="toogle3"
          >
            <i className="material-icons">add</i>
          </label>
          <div className="subs3 subs">
            <Buttons
              addNavFunc={addNavFunc}
              nav={nav.nav}
              onChangeNavIcon={onChangeNavIcon}
              onChangeManage={onChangeManage}
              onChangeNavUrl={onChangeNavUrl}
              onChangeNavColor={onChangeNavColor}
              onManage={nav.onManage}
              color={nav.color}
              url={nav.url}
              icon={nav.icon}
              language={user.language}
              buttonNumber="3"
            />
            <ManageButton
              onChangeManage={onChangeManage}
              onManage={nav.onManage}
              buttonNumber="3"
            />
            <RemoveButtons
              removeNavFunc={removeNavFunc}
              nav={nav.nav}
              onManage={nav.onManage}
              buttonNumber="3"
            />
          </div>
        </div>
        <div>
          <input className="hidden-trigger_top" id="toogle4" type="checkbox" />
          <label
            className={`button-top4 uk-position-fixed btn-floating btn-large ${
              user.color
            } darken-1`}
            htmlFor="toogle4"
          >
            <i className="fa fa-video-camera" />
          </label>
          <div className="subs4 subs">
            <Buttons
              addNavFunc={addNavFunc}
              nav={nav.nav}
              onChangeNavIcon={onChangeNavIcon}
              onChangeManage={onChangeManage}
              onChangeNavUrl={onChangeNavUrl}
              onChangeNavColor={onChangeNavColor}
              onManage={nav.onManage}
              color={nav.color}
              url={nav.url}
              icon={nav.icon}
              language={user.language}
              buttonNumber="4"
            />
            <ManageButton
              onChangeManage={onChangeManage}
              onManage={nav.onManage}
              buttonNumber="4"
            />
            <RemoveButtons
              removeNavFunc={removeNavFunc}
              nav={nav.nav}
              onManage={nav.onManage}
              buttonNumber="4"
            />
          </div>
        </div>
        <div>
          <input className="hidden-trigger_top" id="toogle5" type="checkbox" />
          <label
            className={`button-top5 uk-position-fixed btn-floating btn-large ${
              user.color
            } darken-1`}
            htmlFor="toogle5"
          >
            <i className="material-icons">add</i>
          </label>
          <div className="subs5 subs">
            <Buttons
              addNavFunc={addNavFunc}
              nav={nav.nav}
              onChangeNavIcon={onChangeNavIcon}
              onChangeManage={onChangeManage}
              onChangeNavUrl={onChangeNavUrl}
              onChangeNavColor={onChangeNavColor}
              onManage={nav.onManage}
              color={nav.color}
              url={nav.url}
              icon={nav.icon}
              language={user.language}
              buttonNumber="5"
            />
            <ManageButton
              onChangeManage={onChangeManage}
              onManage={nav.onManage}
              buttonNumber="5"
            />
            <RemoveButtons
              removeNavFunc={removeNavFunc}
              nav={nav.nav}
              onManage={nav.onManage}
              buttonNumber="5"
            />
          </div>
        </div>
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
            <SubCircle
              buttonNumber="6"
              position="1"
              classColor={user.color}
              icon="fa fa-paint-brush"
              url="/user/design"
            />
            <SubCircle
              buttonNumber="6"
              position="2"
              classColor={user.color}
              icon="fa fa-user"
              url="/user/manage"
            />
            <SubCircle buttonNumber="6" position="3" classColor={user.color} />
            <SubCircle buttonNumber="6" position="4" classColor={user.color} />
            <SubCircle buttonNumber="6" position="5" classColor={user.color} />
            <SubCircle buttonNumber="6" position="6" classColor={user.color} />
            <SubCircle buttonNumber="6" position="7" classColor={user.color} />
            <SubCircle buttonNumber="6" position="8" classColor={user.color} />
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
      <UserNav logoutUserFunc={logoutUserFunc} user={user} />
      <BasicNav logoutUserFunc={logoutUserFunc} user={user} />
    </div>
  );
}

Nav.propTypes = {
  user: PropTypes.object,
  logoutUserFunc: PropTypes.func,
  getNavFunc: PropTypes.func,
  nav: PropTypes.object,
  removeNavFunc: PropTypes.func,
  addNavFunc: PropTypes.func,
  onChangeNavUrl: PropTypes.func,
  onChangeNavIcon: PropTypes.func,
  onChangeNavColor: PropTypes.func,
  onChangeManage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  nav: makeSelectNav(),
});

function mapDispatchToProps(dispatch) {
  return {
    getNavFunc: () => {
      dispatch(getNav());
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
    onChangeManage: evt => {
      dispatch(changeOnManage(evt.target.checked));
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
