import React, { memo } from 'react';
import { history, Link, connect, Redirect } from 'umi';
import styles from './index.less';
import Icon from '@/pages/components/Icon';
import { hasToken } from '@/utils/storage';

const Profile = ({ getUserInfo }) => {
  if (!hasToken()) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }
  return (
    <div className={styles.root}>
      <div className="profile">
        {/* 顶部个人信息区域 */}
        <div className="user-info">
          <div className="avatar">
            <img src={getUserInfo.photo} alt="" />
          </div>
          <div className="user-name">{getUserInfo.name}</div>
          <Link to="/edit">
            个人信息 <Icon type="iconbtn_right" />
          </Link>
        </div>

        {/* 今日阅读区域 */}
        <div className="read-info">
          <Icon type="iconbtn_readingtime" />
          今日阅读 <span>10</span> 分钟
        </div>

        {/* 统计信息区域 */}
        <div className="count-list">
          <div className="count-item">
            <p>{getUserInfo.art_count}</p>
            <p>动态</p>
          </div>
          <div className="count-item">
            <p>{getUserInfo.follow_count}</p>
            <p>关注</p>
          </div>
          <div className="count-item">
            <p>{getUserInfo.fans_count}</p>
            <p>粉丝</p>
          </div>
          <div className="count-item">
            <p>{getUserInfo.like_count}</p>
            <p>被赞</p>
          </div>
        </div>

        {/* 主功能菜单区域 */}
        <div className="user-links">
          <div className="link-item">
            <Icon type="iconbtn_mymessages" />
            <div>消息通知</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_mycollect" />
            <div>收藏</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_history1" />
            <div>浏览历史</div>
          </div>
          <div className="link-item">
            <Icon type="iconbtn_myworks" />
            <div>我的作品</div>
          </div>
        </div>
      </div>

      {/* 更多服务菜单区域 */}
      <div className="more-service">
        <h3>更多服务</h3>
        <div className="service-list">
          <div className="service-item" onClick={() => history.push('/main/profile/feedback')}>
            <Icon type="iconbtn_feedback" />
            <div>用户反馈</div>
          </div>
          <div className="service-item" onClick={() => history.push('/chat')}>
            <Icon type="iconbtn_xiaozhitongxue" />
            <div>小智同学</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(({ login }) => ({
  getUserInfo: login.getUserInfo,
}))(memo(Profile));
