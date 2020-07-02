import React from 'react'
import { Avatar } from 'antd'
import { Link } from "react-router-dom";
import {
    HomeFilled,
    DashboardFilled,
    MessageFilled,
    SettingFilled
} from '@ant-design/icons';
import { Menu } from 'antd';


interface PropsType {
    user?: any
}

const Aside = (props: PropsType) => {
    const { user } = props;

    return (
        <div className="aside">
            <div className="avatar">
                <div className="avatarBg">
                    <Avatar src={user.avatar} size="large" shape="square" />
                </div>
                <div className="user">
                    {user.username}
                </div>
            </div>
            <div className="config">
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    inlineCollapsed={false}
                >
                    <Menu.Item key="1" icon={<HomeFilled />}>
                        <Link to='/'>
                            Home
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DashboardFilled />}>
                        <Link to='/dashboard'>
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<MessageFilled />}>
                        <Link to='/setting'>
                            Message
                       </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<SettingFilled />}>
                        <Link to='/setting'>
                            Setting
                       </Link>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
};

export default Aside;