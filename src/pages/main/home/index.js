import React, { useState } from 'react';
import { Popup } from 'antd-mobile';
import { useSelector } from 'dva';
import Channels from './components/Channels';
import styles from './index.less';
import Icon from '@/pages/components/Icon';
import Tabs from '@/pages/components/Tabs';

export default function Home() {
  const tabs = useSelector((state) => state.login.UserChannels);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} index={active} onChange={(e) => setActive(e)} />
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" onClick={() => setVisible(true)} />
      </div>
      <Popup visible={visible} position="left" bodyStyle={{ minWidth: '100vw' }}>
        {visible && <Channels onClose={onClose} userchannels={tabs} index={active} onChange={(e) => setActive(e)} />}
      </Popup>
    </div>
  );
}
