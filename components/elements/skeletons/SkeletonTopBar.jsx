import React from 'react';
import { Skeleton } from 'antd';

const SkeletonTopBar = () => {
    return (
        <Skeleton.Input
            active={true}
            size={'large'}
            style={{ height: 105 }}
            block={true}
        />
    );
};

export default SkeletonTopBar;
