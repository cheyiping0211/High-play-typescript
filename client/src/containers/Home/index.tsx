import React, { useState, useEffect } from "react"
import { Switch, Statistic } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import Area from '../../components/Dashboard/Area'
const Home = () => {

    const [data, setData] = useState([
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

    const listData = [
        {
            title: 'SETTING',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];

    useEffect(() => {
        setInterval(() => {
            // setData(data.map((item, _index) => _index < 5 ? { ...item, value: item.value + 5000 } : item))
        }, 2000)
    })

    return (
        <div className="home" >
            <div className="chart">
                <Area elId="messageChart" width={530} height={280} data={data} />
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
                {listData.map((item, index) =>
                    <div className="item" key={index}>
                        <p>KEY</p>
                        <p>STATUS</p>
                        <Switch checkedChildren="NO" unCheckedChildren="OFF" defaultChecked />
                    </div>
                )
                }
            </div>
        </div>
    );
};

export default Home;