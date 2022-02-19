import React from 'react';
import styles from './index.less';
import Icon from '@/pages/components/Icon';
import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import { setLocalChannels } from '@/utils/storage';
/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */
const Channels = ({ index, onClose, userchannels, onChange }) => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const allChannels = useSelector((state) => state.login.getallchannels);
  const selectChannels = allChannels.filter((item) => userchannels.findIndex((v) => v.id == item.id) == -1);
  setLocalChannels(selectChannels);

  const changeChannel = (i) => {
    if (edit) return;
    onChange(i);
    onClose();
  };
  const onDelChannels = (channlesId) => {
    dispatch({
      type: 'login/delUserChannels',
      payload: channlesId,
    });
  };
  return (
    <div className={styles.root}>
      {/* 顶部栏：带关闭按钮 */}
      <div className="channel-header">
        <Icon type="iconbtn_channel_close" onClick={onClose} />
      </div>

      {/* 频道列表 */}
      <div className="channel-content">
        {/* 当前已选择的频道列表 */}
        <div className={classNames('channel-item', { edit: edit })}>
          <div className="channel-item-header">
            <span className="channel-item-title">我的频道</span>
            <span className="channel-item-title-extra">{edit ? '点击删除频道' : '点击进入频道'}</span>
            <span className="channel-item-edit" onClick={() => setEdit(!edit)}>
              {edit ? '完成' : '编辑'}
            </span>
          </div>

          <div className="channel-list">
            {userchannels.map((item, i) => (
              <span className={classNames('channel-list-item', { selected: index === i })} key={item.id} onClick={() => changeChannel(i)}>
                {item.name}
                {item.id !== 0 && <Icon type="iconbtn_tag_close" onClick={() => onDelChannels(item.id)} />}
              </span>
            ))}
          </div>
        </div>

        {/* 推荐的频道列表 */}
        <div className="channel-item">
          <div className="channel-item-header">
            <span className="channel-item-title">频道推荐</span>
            <span className="channel-item-title-extra">点击添加频道</span>
          </div>
          <div className="channel-list">
            {selectChannels.map((item) => (
              <span className="channel-list-item" key={item.id}>
                + {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Channels;
