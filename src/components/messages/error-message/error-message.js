import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../typography/text';

const ErrorMessage = props => (
  <Text.Detail tone="negative">{props.children}</Text.Detail>
);
ErrorMessage.displayName = 'ErrorMessage';
ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
