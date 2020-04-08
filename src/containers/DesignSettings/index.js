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
import { makeSelectColor } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { changeColor } from './actions';

export function DesignSettings({ changeColorFunc, user }) {
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
      <Container title={<FormattedMessage {...messages.header} />}>
        <h3>
          <FormattedMessage {...messages.main_color} />
        </h3>
        <div className="center">
          {colors.map(item => (
            <button
              type="button"
              onClick={() => changeColorFunc(item.name)}
              className={`uk-margin-small-right uk-margin-bottom btn-floating uk-padding-large btn-medium darken-1 ${
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
      </Container>
    </div>
  );
}

DesignSettings.propTypes = {
  changeColorFunc: PropTypes.func,
  user: object,
};

const mapStateToProps = createStructuredSelector({
  color: makeSelectColor(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeColorFunc: color => {
      dispatch(changeColor(color));
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
