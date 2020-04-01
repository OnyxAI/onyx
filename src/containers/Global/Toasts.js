import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Toast from 'components/Toast';
import { removeToast } from 'global/actions';

const Toasts = ({ actions, toasts }) => (
  <ul className="toasts">
    {toasts.map(toast => {
      const { id } = toast;
      return (
        <Toast
          {...toast}
          key={id}
          removeToast={() => actions.removeToast(id)}
        />
      );
    })}
  </ul>
);

Toasts.propTypes = {
  actions: PropTypes.shape({
    removeToast: PropTypes.func.isRequired,
  }).isRequired,
  toasts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removeToast }, dispatch),
});

const mapStateToProps = state => ({
  toasts: state.global.toasts,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toasts);
