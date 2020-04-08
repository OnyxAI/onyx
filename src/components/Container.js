import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardHeader, CardTitle } from 'uikit-react';

export default function Container(props) {
  return (
    <Card hover>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardBody>{props.children}</CardBody>
      </CardHeader>
    </Card>
  );
}

Container.propTypes = {
  title: PropTypes.object,
  children: PropTypes.object,
};
