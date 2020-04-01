import {
  Example,
  mapDispatchToProps,
  mapStateToProps,
  reducer,
  saga,
} from './containers/Example';

const Routes = [
  {
    name: 'Example',
    url: '/example',
    component: Example,
    mapDispatchToProps,
    mapStateToProps,
    reducers: { key: 'example', reducer },
    sagas: { key: 'example', saga },
  },
  {
    name: 'Example Test',
    url: '/example/test',
    component: Example,
    mapDispatchToProps,
    mapStateToProps,
    reducers: { key: 'example', reducer },
    sagas: { key: 'example', saga },
  },
];

export default Routes;
