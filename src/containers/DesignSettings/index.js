/**
 *
 * DesignSettings
 *
 */

import React, { memo } from 'react';
import PropTypes, { object } from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import colors from '@onyx/utils/colors.json';
import { useInjectSaga } from '@onyx/utils/injectSaga';
import { useInjectReducer } from '@onyx/utils/injectReducer';
import Container from '@onyx/components/Container';
import { makeSelectColor, makeSelectMode } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { changeColor, changeMode } from './actions';

export function DesignSettings({ changeColorFunc, user, changeModeFunc }) {
  useInjectReducer({ key: 'designSettings', reducer });
  useInjectSaga({ key: 'designSettings', saga });

  return (
    <div>
      <FormattedMessage {...messages.header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Design" />
          </Helmet>
        )}
      </FormattedMessage>
      <Container user={user} title={<FormattedMessage {...messages.header} />}>
        <h3>
          <FormattedMessage {...messages.main_color} />
        </h3>
        <div className="center">
          {colors.map(item => (
            <button
              type="button"
              onClick={() => changeColorFunc(item.name)}
              className={`uk-margin-small-right z-depth-4 uk-margin-bottom btn-floating uk-padding-large btn-medium darken-1 ${
                item.name
              }`}
            >
              {user.color === item.name && (
                <button
                  type="button"
                  className="btn-floating tiny-button white"
                />
              )}
            </button>
          ))}
        </div>

        <h3>
          <FormattedMessage {...messages.main_mode} />
        </h3>
        <div className="center">
          {['dark', 'light'].map(item => (
            <button
              type="button"
              onClick={() => changeModeFunc(item)}
              className={`uk-margin-small-right z-depth-4 uk-margin-bottom btn-floating uk-padding-large btn-medium darken-1 ${item}`}
            >
              {user.mode === item && (
                <button
                  type="button"
                  className="btn-floating tiny-button blue darken-4"
                />
              )}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
}

DesignSettings.propTypes = {
  changeColorFunc: PropTypes.func,
  changeModeFunc: PropTypes.func,
  user: object,
};

const mapStateToProps = createStructuredSelector({
  color: makeSelectColor(),
  mode: makeSelectMode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    changeColorFunc: color => {
      dispatch(changeColor(color));
    },
    changeModeFunc: mode => {
      dispatch(changeMode(mode));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DesignSettings);
