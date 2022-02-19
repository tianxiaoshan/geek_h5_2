import React, { useState } from 'react';
import styles from './index.less';
import Input from '@/pages/components/Input';
import NavBar from '@/pages/components/NavBar';
import Textarea from '@/pages/components/Textarea';

const EditInput = ({ onClose, type, getUser, onCommit }) => {
  // console.log(getUser[type]);
  const defaultValue = getUser[type];
  const [value, setValue] = useState(defaultValue || '');
  return (
    <div className={styles.root}>
      <NavBar
        onClose={onClose}
        extra={
          <div className="commit-btn" onClick={() => onCommit(type, value)}>
            提交
          </div>
        }
      >
        编辑个人{type === 'name' ? '昵称' : '简介'}
      </NavBar>
      <div className="content">
        {type === 'name' ? (
          <Input placeholder="请输入昵称" value={value} onChange={(e) => setValue(e.target.value)} />
        ) : (
          <Textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="请输入简介" />
        )}
      </div>
    </div>
  );
};

export default EditInput;
