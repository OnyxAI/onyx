import React from 'react';
import PropTypes from 'prop-types';
import FileIcon from '../icons/FileIcon';

const FileMessage = props => (
  <a
    className="sc-message--file"
    href={props.data.url}
    download={props.data.fileName}
  >
    <FileIcon />
    <p>{props.data.fileName}</p>
  </a>
);

FileMessage.propTypes = {
  data: PropTypes.array,
};

export default FileMessage;
