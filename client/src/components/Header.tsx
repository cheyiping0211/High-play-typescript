import React from 'react'
import { Badge } from 'antd';
const Header = () => {

    return (
        <div className="header">
            <div className="module">
                <Badge status="success" text="Home" />
            </div>
        </div>
    );
};

export default Header;