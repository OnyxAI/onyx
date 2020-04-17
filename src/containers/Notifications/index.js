/**
 *
 * Notifications
 *
 */

import React, { memo, useEffect } from 'react';
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
import { deleteNotification, viewNotification } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectNotifications } from './selectors';
import messages from './messages';

export function Notifications({
  deleteNotificationFunc,
  viewNotificationFunc,
  notifications,
  user,
}) {
  useInjectReducer({ key: 'notifications', reducer });
  useInjectSaga({ key: 'notifications', saga });

  useEffect(() => {
    viewNotificationFunc();
  }, [0]);

  return (
    <div>
      <FormattedMessage {...messages.header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Notifications" />
          </Helmet>
        )}
      </FormattedMessage>
      {notifications ? (
        <Container title={<FormattedMessage {...messages.header} />}>
          {notifications.notifications.length === 0 ? (
            <h5 className="center">
              <FormattedMessage {...messages.no_notifications} />
            </h5>
          ) : (
            <ul className="collection">
              {notifications.notifications.map(notification => (
                <li className="collection-item avatar">
                  <i
                    className={`large circle ${
                      notification.icon !== undefined
                        ? notification.icon
                        : 'fas fa-bell'
                    } ${
                      notification.color !== undefined
                        ? notification.color
                        : user.color
                    }`}
                  />
                  <span className="title">{notification.title}</span>
                  <p>{notification.content}</p>
                  <button
                    type="button"
                    onClick={() => deleteNotificationFunc(notification.id)}
                    className="secondary-content"
                  >
                    <i className="fa fa-times" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
}

Notifications.propTypes = {
  user: Proptypes.object,
  deleteNotificationFunc: Proptypes.func,
  viewNotificationFunc: Proptypes.func,
  notifications: Proptypes.object,
};

const mapStateToProps = createStructuredSelector({
  notifications: makeSelectNotifications(),
});

export function mapDispatchToProps(dispatch) {
  return {
    deleteNotificationFunc: id => {
      dispatch(deleteNotification(id));
    },
    viewNotificationFunc: () => {
      dispatch(viewNotification());
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
)(Notifications);
