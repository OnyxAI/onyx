import PropTypes from 'prop-types';
import React, { Component } from 'react';

import '@onyx/assets/css/toast.css';

class Toast extends Component {
  componentDidMount() {
    this.duration = setInterval(this.props.removeToast, this.props.duration);
  }

  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.duration);
  }

  render() {
    return (
      <li
        className="toast uk-animation-slide-top"
        style={{ backgroundColor: this.props.color }}
      >
        <p className="toast__content">{this.props.text}</p>
        <button
          type="button"
          className="toast__dismiss"
          onClick={this.props.removeToast}
        >
          x
        </button>
      </li>
    );
  }

  shouldComponentUpdate() {
    return false;
  }
}

Toast.propTypes = {
  color: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  removeToast: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Toast;
