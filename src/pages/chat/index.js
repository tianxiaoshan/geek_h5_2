import React, { useState, useEffect, useRef } from 'react';
import styles from './index.less';
import io from 'socket.io-client';
import Icon from '@/pages/components/Icon';
import Input from '@/pages/components/Input';
import NavBar from '@/pages/components/NavBar';
import { getTokenInfo } from '@/utils/storage';

const Chat = () => {
  const [messageList, setMessageList] = useState([
    { type: 'robot', text: '你好呀！我是小智' },
    { type: 'user', text: '小智，你好呢' },
  ]);
  const [msg, setMsg] = useState();
  const clientRef = useRef(null);
  const scrollRef = useRef(null);
  useEffect(() => {
    const client = io('http://toutiao.itheima.net', {
      query: {
        token: getTokenInfo(),
      },
      transports: ['websocket'],
    });
    clientRef.current = client;
    client.on('connect', () => {
      setMessageList((messageList) => [...messageList, { type: 'robot', text: '我是小智，你有什么需要问我的吗？' }]);
    });
    // 小智回复消息
    client.on('message', (e) => setMessageList((messageList) => [...messageList, { type: 'robot', text: e.msg }]));
    return () => {
      client.close();
    };
  }, []);
  const onKeyUp = (e) => {
    // console.log('触发了');
    if (e.keyCode !== 13) return;
    if (!msg) return;
    setMessageList([...messageList, { type: 'user', text: msg }]);
    clientRef.current.emit('message', { msg, timestamp: Date.now() });
    setMsg('');
  };
  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight - scrollRef.current.offsetHeight;
  }, [messageList]);
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header">小智同学</NavBar>

      {/* 聊天记录列表 */}
      <div className="chat-list" ref={scrollRef}>
        {messageList.map((item, index) => {
          if (item.type === 'robot') {
            return (
              <div className="chat-item" key={index}>
                <Icon type="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
            );
          }
          return (
            <div className="chat-item user" key={index}>
              <img src="http://toutiao.itheima.net/images/user_head.jpg" alt="" />
              <div className="message">{item.text}</div>
            </div>
          );
          /* 用户的消息 */
        })}
        {/* 机器人的消息 */}
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input className="no-border" placeholder="请描述您的问题" value={msg} onChange={(e) => setMsg(e.target.value)} onKeyUp={onKeyUp} />
        <Icon type="iconbianji" />
      </div>
    </div>
  );
};

export default Chat;
