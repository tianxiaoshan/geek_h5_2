import React from 'react';
import classNames from 'classnames';
import { history } from 'umi';
import styles from './index.less';
import Icon from '@/pages/components/Icon';

const NavBar = ({ children, extra, onClose, className }) => {
  const onBack = () => {
    if (onClose) {
      onClose();
    } else {
      history.go(-1);
    }
  };
  return (
    <>
      <div className={classNames(styles.root, className)}>
        {/* 后退按钮 */}
        <div className="left">
          <Icon type="iconfanhui" onClick={onBack} />
        </div>
        {/* 居中标题 */}
        <div className="title">{children}</div>

        {/* 右侧内容 */}
        <div className="right">{extra}</div>
      </div>
    </>
  );
};

export default NavBar;
