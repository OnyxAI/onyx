/**
 *
 * NavBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import SubCircle from './SubCircle';

function Buttons({
  addNavFunc,
  nav,
  onChangeNavIcon,
  onChangeManage,
  onChangeNavUrl,
  onChangeNavColor,
  onManage,
  color,
  url,
  icon,
  language,
  buttonNumber,
}) {
  return (
    <div>
      {nav.map(
        (item, index) =>
          item.buttonNumber === buttonNumber && (
            <SubCircle
              key={index.toString()}
              buttonNumber={buttonNumber}
              position={item.position}
              addNavFunc={addNavFunc}
              onChangeNavColor={onChangeNavColor}
              onChangeNavUrl={onChangeNavUrl}
              onChangeNavIcon={onChangeNavIcon}
              onChangeManage={onChangeManage}
              onManage={onManage}
              iconInput={icon}
              colorInput={color}
              urlInput={url}
              icon={item.icon}
              language={language}
              url={item.url}
              color={item.color}
            />
          ),
      )}
    </div>
  );
}

Buttons.propTypes = {
  nav: PropTypes.array,
  addNavFunc: PropTypes.func,
  onChangeNavColor: PropTypes.func,
  onChangeNavUrl: PropTypes.func,
  onChangeNavIcon: PropTypes.func,
  onChangeManage: PropTypes.func,
  onManage: PropTypes.bool,
  icon: PropTypes.string,
  url: PropTypes.string,
  color: PropTypes.string,
  buttonNumber: PropTypes.string,
  language: PropTypes.string,
};

export default memo(Buttons);
