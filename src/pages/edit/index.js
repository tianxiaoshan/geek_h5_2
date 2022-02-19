import React, { useState, memo, useRef } from 'react';
import { List, Popup, DatePicker, Toast } from 'antd-mobile';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useDispatch } from 'dva';
import { connect } from 'umi';
import EditInput from './components/EditInput';
import EditList from './components/EditList';
import styles from './index.less';
import NavBar from '@/pages/components/NavBar';

const { Item } = List;
const now = new Date();
const sex = {
  0: '男',
  1: '女',
};
const Edit = ({ getUser }) => {
  const fileRef = useRef();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState({
    visible: false,
    type: '',
  });
  const [dateHide, setDateHide] = useState(false);
  const [leftHide, setLeftHide] = useState({
    visible: false,
    type: '',
  });

  const onClose = () => {
    setLeftHide({
      visible: false,
      type: '',
    });
    setVisible({
      visible: false,
      type: '',
    });
  };
  const onCommit = async (type, value) => {
    await dispatch({
      type: 'login/editUserInfo',
      payload: { [type]: value },
    });
    onClose();
    Toast.show({
      icon: 'success',
      content: '修改成功',
    });
  };
  const config = {
    photo: [
      {
        title: '拍照',
        onClick: () => {
          console.log('拍照');
        },
      },
      {
        title: '上传',
        onClick: () => {
          fileRef.current.click();
        },
      },
    ],
    gender: [
      {
        title: '男',
        onClick: () => {
          onCommit('gender', 0);
        },
      },
      {
        title: '女',
        onClick: () => {
          onCommit('gender', 1);
        },
      },
    ],
  };
  const onFileChange = async (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
    const fd = new FormData();
    fd.append('photo', file);
    await dispatch({
      type: 'login/uploadPhoto',
      payload: fd,
    });
    onClose();
    Toast.show({
      icon: 'success',
      content: '修改成功',
    });
  };
  const onBirthday = (e) => {
    // console.log(e);
    onCommit('birthday', dayjs(e).format('YYYY-MM-DD'));
  };
  const onLogout = () => {
    console.log('退出');
  };
  return (
    <div className={styles.root}>
      <NavBar>个人信息</NavBar>
      <div className="wrapper">
        <List className="profile-list">
          <Item
            onClick={() => {
              setVisible({
                visible: true,
                type: 'photo',
              });
            }}
            extra={
              <span className="avatar-wrapper">
                <img src={getUser.photo} alt="" />
              </span>
            }
          >
            头像
          </Item>
          <input type="file" hidden ref={fileRef} onChange={onFileChange} />
          <Item
            onClick={() => {
              setLeftHide({
                visible: true,
                type: 'name',
              });
            }}
            extra={getUser.name}
          >
            昵称
          </Item>
          <Item
            onClick={() => {
              setLeftHide({
                visible: true,
                type: 'intro',
              });
            }}
            extra={<span className={classNames('intro', getUser.intro && 'normal')}>{getUser.intro || '未填写'}</span>}
          >
            简介
          </Item>
        </List>
        <List>
          <Item
            onClick={() => {
              setVisible({
                visible: true,
                type: 'gender',
              });
            }}
            extra={sex[getUser.gender]}
          >
            性别
          </Item>
          <Item
            onClick={() => {
              setDateHide(true);
            }}
            extra={getUser.birthday}
          >
            生日
          </Item>
          <DatePicker
            title="年月日"
            max={now}
            min={new Date('1900-1-1')}
            value={new Date(getUser.birthday)}
            visible={dateHide}
            onClose={() => {
              setDateHide(false);
            }}
            onConfirm={onBirthday}
          />
        </List>
        <div className="logout">
          {/* <WhiteSpace size="lg" /> */}
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="btn" onClick={onLogout}>
            退出登录
          </button>
        </div>
      </div>
      {/* 下面弹出层 */}
      <Popup
        visible={visible.visible}
        onMaskClick={() => {
          setVisible({
            visible: false,
            type: '',
          });
        }}
        bodyStyle={{ minHeight: '20vh' }}
        destroyOnClose
      >
        {visible.visible && <EditList onClose={onClose} type={visible.type} config={config} />}
      </Popup>
      {/* 左边弹出层 */}
      <Popup visible={leftHide.visible} position="left" bodyStyle={{ minWidth: '57vh' }} destroyOnClose>
        {leftHide.visible && <EditInput onClose={onClose} type={leftHide.type} getUser={getUser} onCommit={onCommit} />}
      </Popup>
    </div>
  );
};

export default connect(({ login }) => ({
  getUser: login.getUser,
}))(memo(Edit));
