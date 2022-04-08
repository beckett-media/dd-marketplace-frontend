import React, { useState } from 'react';
import { Modal } from 'antd';
import Login from '~/components/partials/account/Login-modal';

const LoginModal = (props) => {
    const [visible, setVisible] = useState(false);
    const confirmLoading = false;

    const handleCancel = () => {
        console.log('Clicked cancel button');
        props.setOpen(false);
        setVisible(false);
    };

    return (
        <div>
            <Modal
                visible={props.open ? props.open : visible}
                // onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
                width={500}
                closable={false}
                // cancelButtonProps={{ disabled: true }}
            >
                <div>
                    <Login
                        height={'80%'}
                        subtitle={'You have to login to Place Your Bid!!'}
                        bidding={props.bidding}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default LoginModal;
