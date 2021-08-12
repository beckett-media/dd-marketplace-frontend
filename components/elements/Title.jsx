import { Typography } from 'antd';
import React from 'react';
const Title = ({ title, subtitle }) => {
    return (
        <div className="main-title">
            <Typography.Title className="text-left text-white">
                {title}
            </Typography.Title>
            <Typography className="text-white text-left mt-5 mb-5">
                {subtitle}
            </Typography>
        </div>
    );
};

export default Title;
