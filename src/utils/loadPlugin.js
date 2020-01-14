import React, { memo } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext, connect } from 'react-redux';
import { compose } from 'redux';

import getInjectorsReducer from './reducerInjectors';
import getInjectorsSaga from './sagaInjectors';

export default ({
  mapDispatchToProps,
  mapStateToProps,
  reducers,
  sagas,
}) => WrappedComponent => {
  class PluginInjector extends React.Component {
    static WrappedComponent = WrappedComponent;

    static contextType = ReactReduxContext;

    static displayName = `plugin(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    constructor(props, context) {
      super(props, context);

      getInjectorsReducer(context.store).injectReducer(
        reducers.key,
        reducers.reducer,
      );

      const { saga, mode } = sagas;

      this.injectors = getInjectorsSaga(context.store);

      this.injectors.injectSaga(sagas.key, { saga, mode }, this.props);
    }

    componentWillUnmount() {
      this.injectors.ejectSaga(sagas.key);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );

  const Plugin = compose(
    withConnect,
    memo,
  )(PluginInjector);

  return hoistNonReactStatics(Plugin, WrappedComponent);
};
