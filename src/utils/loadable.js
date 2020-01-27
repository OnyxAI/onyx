import React, { lazy, Suspense } from 'react';
import Loader from 'components/Loader';

const loadable = (
  importFunc,
  { fallback = <Loader /> } = { fallback: null },
) => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
