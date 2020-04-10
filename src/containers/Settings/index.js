/**
 *
 * Settings
 *
 */

import React, { memo } from 'react';
import Proptypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@onyx/utils/injectSaga';
import { useInjectReducer } from '@onyx/utils/injectReducer';
import Loader from '@onyx/components/Loader';
import Container from '@onyx/components/Container';
import { getOnyxData } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSettings } from './selectors';
import messages from './messages';

export function Settings({ getOnyxDataFunc, settings, user }) {
  useInjectReducer({ key: 'settings', reducer });
  useInjectSaga({ key: 'settings', saga });

  return (
    <div>
      <FormattedMessage {...messages.header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Settings" />
          </Helmet>
        )}
      </FormattedMessage>
      {settings ? (
        <Container title={<FormattedMessage {...messages.header} />}>
          {settings.loadingData ? (
            <span className="uk-margin-small-right" uk-spinner="ratio: 1" />
          ) : (
            <button
              type="button"
              onClick={() => getOnyxDataFunc()}
              className={`btn ${user.color} secondary`}
            >
              <FormattedMessage {...messages.onyx_data} />
            </button>
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
}

Settings.propTypes = {
  getOnyxDataFunc: Proptypes.func,
  settings: Proptypes.object,
  user: Proptypes.object,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getOnyxDataFunc: () => {
      dispatch(getOnyxData());
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
)(Settings);
