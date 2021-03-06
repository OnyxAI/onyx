/* eslint-disable no-nested-ternary */
/**
 *
 * Neurons
 *
 */

import React, { memo, useEffect } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@onyx/utils/injectSaga';

import { useInjectReducer } from '@onyx/utils/injectReducer';
import Container from '@onyx/components/Container';
import globalSaga from '@onyx/global/saga';
import { makeSelectNeurons } from './selectors';
import { getNeuronsStore, installNeuron, removeNeuron } from './actions';
import saga from './saga';
import reducer from './reducer';
import messages from './messages';

export function Neurons({
  getNeuronsStoreFunc,
  installNeuronFunc,
  removeNeuronFunc,
  neurons,
  user,
}) {
  useInjectReducer({ key: 'neurons', reducer });
  useInjectSaga({ key: 'neurons', saga });
  useInjectSaga({ key: 'global', saga: globalSaga });

  const isInstalled = name =>
    neurons.neurons.filter(neuron => neuron.raw_name === name).length > 0;

  const getDefaultRoute = name => {
    const neuronScope = neurons.neurons.filter(
      neuron => neuron.raw_name === name,
    )[0];

    return neuronScope.routes.filter(
      route => route.default && route.default === 'true',
    )[0];
  };

  useEffect(() => {
    getNeuronsStoreFunc();
  }, [0]);

  return (
    <div>
      <FormattedMessage {...messages.header}>
        {message => (
          <Helmet>
            <title>{message}</title>
            <meta name="description" content="Description of Neurons" />
          </Helmet>
        )}
      </FormattedMessage>
      <Container user={user} title={<FormattedMessage {...messages.header} />}>
        <div
          className="uk-grid-medium uk-child-width-1-3@m"
          data-uk-grid
          uk-height-match="target: > div > .uk-card > .uk-card-body"
        >
          {neurons.neuronsStoreList ? (
            neurons.neuronsStoreList.map(neuron => (
              <div>
                <div className="uk-card uk-card-default uk-card-small">
                  <div className="uk-card-media-top uk-cover-container">
                    <img
                      src={neuron.img}
                      alt={neuron.name}
                      style={{ height: '212px', width: '380px' }}
                    />
                  </div>
                  <div className={`uk-card-body ${user.mode} uk-text-center`}>
                    <h4 className="uk-card-title">{neuron.name}</h4>
                    <p>{neuron.description}</p>
                  </div>
                  <div className={`uk-card-footer ${user.mode} uk-text-center`}>
                    {neurons.loading && neurons.usingNeuron === neuron.raw ? (
                      <span
                        className="uk-margin-small-right"
                        uk-spinner="ratio: 1"
                      />
                    ) : isInstalled(neuron.raw) ? (
                      <div className="uk-padding-small">
                        <button
                          type="button"
                          className="uk-button uk-button-default"
                          onClick={() => removeNeuronFunc(neuron.raw)}
                        >
                          <FormattedMessage {...messages.remove} />
                        </button>
                        <Link
                          className="uk-button uk-button-default"
                          to={getDefaultRoute(neuron.raw).url}
                        >
                          <FormattedMessage {...messages.neuron_main} />
                        </Link>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="uk-button uk-button-default"
                        onClick={() =>
                          installNeuronFunc(neuron.raw, neuron.url)
                        }
                      >
                        <FormattedMessage {...messages.install} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span
              className="uk-margin-small-right uk-position-center"
              uk-spinner="ratio: 3"
            />
          )}
        </div>
      </Container>
    </div>
  );
}

Neurons.propTypes = {
  user: Proptypes.func,
  getNeuronsStoreFunc: Proptypes.func,
  installNeuronFunc: Proptypes.func,
  removeNeuronFunc: Proptypes.func,
  neurons: Proptypes.object,
};

const mapStateToProps = createStructuredSelector({
  neurons: makeSelectNeurons(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getNeuronsStoreFunc: () => {
      dispatch(getNeuronsStore());
    },
    installNeuronFunc: (name, url) => {
      dispatch(installNeuron(name, url));
    },
    removeNeuronFunc: name => {
      dispatch(removeNeuron(name));
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
)(Neurons);
