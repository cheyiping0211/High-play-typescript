import React, { useState, useEffect } from "react"
import { Switch, Statistic } from 'antd'
import {
    useDispatch
} from 'react-redux'
import { watch_users, get_userList } from '../../store/actions'
import { ArrowUpOutlined } from '@ant-design/icons'

import Area from '../../components/Dashboard/Area'
import Pie from '../../components/Dashboard/Pie'

const Home = () => {

    const [data] = useState([
        { year: '1991', value: 15468 },
        { year: '1992', value: 16100 },
        { year: '1993', value: 15900 },
        { year: '1994', value: 17409 },
        { year: '1995', value: 17000 },
        { year: '1996', value: 31056 },
        { year: '1997', value: 31982 },
        { year: '1998', value: 32040 },
        { year: '1999', value: 33233 },
    ]);

    const categoryData = [
        { type: '分类一', value: 20 },
        { type: '分类二', value: 18 },
        { type: '分类三', value: 32 },
        { type: '分类四', value: 15 },
        { type: 'Other', value: 15 },
    ];

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(watch_users());
    })

    const getUsers = () => {
        dispatch(get_userList());
    }

    return (
        <div className="home" >
            <div className="chart">
                <Area elId="messageChart" width={530} height={260} data={data} />
                <Pie elId="categoryChart" width={530} height={180} data={categoryData} />
                <div className="statistic">
                    <Statistic
                        title="User"
                        value={9}
                        precision={2}
                        valueStyle={{ color: '#12d284' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="用户"
                    />
                    <Statistic
                        title="Online user"
                        value={9}
                        precision={2}
                        valueStyle={{ color: '#12d284' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="在线用户"
                    />
                    <Statistic
                        title="Message"
                        value={9}
                        precision={2}
                        valueStyle={{ color: '#12d284' }}
                        prefix={<ArrowUpOutlined />}
                        suffix="信息"
                    />
                </div>
            </div>
            <div className="settingList">
                <div className="title">
                    SETTING
                </div>
                {categoryData.map((item, index) =>
                    <div className="item" key={index}>
                        <p>KEY</p>
                        <p>STATUS</p>
                        <Switch checkedChildren="NO" unCheckedChildren="OFF" defaultChecked onClick={getUsers} />
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default Home;