import React from 'react';
import SkeletonHomePageProduct from './SkeletonHomePageProduct';
import SkeletonTopBar from './SkeletonTopBar';

const SkeletonHomePage = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
            }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <SkeletonTopBar />
                <SkeletonTopBar />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 20,
                    margin: 30,
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }}>
                <SkeletonHomePageProduct />
                <SkeletonHomePageProduct />
                <SkeletonHomePageProduct />
                <SkeletonHomePageProduct />
                {/* <SkeletonHomePageProduct /> */}
            </div>
        </div>
    );
};

export default SkeletonHomePage;
