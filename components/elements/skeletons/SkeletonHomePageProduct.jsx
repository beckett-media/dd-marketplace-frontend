import React from 'react';
import { Skeleton } from 'antd';

const SkeletonHomePageProduct = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 5,
            }}>
            <Skeleton.Input active={true} size={300} style={{ height: 200 }} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <Skeleton.Input
                    active={true}
                    size={20}
                    style={{ width: 300 }}
                />
                <Skeleton.Input
                    active={true}
                    size={20}
                    style={{ width: 300 }}
                />
                <Skeleton.Input
                    active={true}
                    size={20}
                    style={{ width: 300 }}
                />
                <Skeleton.Input
                    active={true}
                    size={20}
                    style={{ width: 300 }}
                />
                <Skeleton.Input
                    active={true}
                    size={20}
                    style={{ width: 300 }}
                />
                <Skeleton.Input
                    active={true}
                    size={20}
                    style={{ width: 300 }}
                />
                <Skeleton.Input
                    active={true}
                    size={20}
                    style={{ width: 300 }}
                />
            </div>
        </div>
    );
};

export default SkeletonHomePageProduct;
