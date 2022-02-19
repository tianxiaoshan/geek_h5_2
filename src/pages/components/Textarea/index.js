import React from 'react';
import styles from './index.less';

const Textarea = ({ maxLength = 200, ...rest }) => {
  return (
    <div className={styles.root}>
      <textarea className="textarea" {...rest} maxLength={maxLength}  />
      <div className="count">
        {rest.value.length}/{maxLength}
      </div>
    </div>
  );
};

export default Textarea;
