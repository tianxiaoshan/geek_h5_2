import React, { useState, useEffect } from 'react';
import { history } from 'umi';

import styles from './index.less';

export default function NotFound() {
  const [time, setTime] = useState(3);
  useEffect(() => {
    let timeId = setInterval(() => {
      setTime((time) => {
        if (time == 1) {
          clearInterval(timeId);
          history.push('/main/home');
        }
        return time - 1;
      });
    }, 1000);
  }, []);
  return (
    <>
      <div className={styles.wrap}>404</div>
      <div>{time}s后返回首页</div>
    </>
  );
}
