import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import Login from '~/components/partials/account/Login';

const LoginModal = (props) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

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
                bodyStyle={{ height: 650 }}
                // cancelButtonProps={{ disabled: true }}
            >
                <div>
                    <Login
                        height={'600px'}
                        subtitle={'You have to login to Place Your Bid!!'}
                        bidding={props.bidding}
                    />
                </div>
            </Modal>
        </div>
    );
};

export default LoginModal;
