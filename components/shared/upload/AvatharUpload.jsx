import React from 'react';
import { Avatar, Upload, Spin, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { updateProfilePhoto } from '~/store/userInfo/action';
import { baseUrl } from '~/repositories/Repository';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

const AvatarUpload = ({ profilePhoto, userInfo = '' }) => {
    const [isloadingComplete, setLoading] = useState(true);

    const dispatch = useDispatch();

    const onFileUploadComplete = (file) => {
        if (!file) return setLoading(true);
        getBase64(file.originFileObj).then((base64) => {
            setLoading(base64);
        });
    };

    const onChange = (payload) => {
        const { file } = payload;

        if (!isloadingComplete) return;

        setLoading(true);
        dispatch(updateProfilePhoto(file, () => onFileUploadComplete(file)));
    };

    const url = `${baseUrl}/${profilePhoto}`;

    const name = userInfo?.username || userInfo?.fullName || '';

    return (
        <>
            <Upload
                accept="image/png,image/jpeg"
                multiple={false}
                maxCount={1}
                onChange={onChange}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                    }}>
                    <div
                        style={{
                            position: 'absolute',
                            right: 10,
                            bottom: 30,
                            zIndex: 500,
                            background: 'white',
                            width: 30,
                            height: 30,
                            borderRadius: 30,
                            textAlign: 'center',
                        }}>
                        <UploadOutlined />
                    </div>
                    <Avatar
                        {...(profilePhoto && isloadingComplete
                            ? {
                                  src:
                                      typeof isloadingComplete === 'string'
                                          ? isloadingComplete
                                          : url,
                              }
                            : {})}
                        size={200}>
                        {!isloadingComplete ? (
                            <Spin />
                        ) : (
                            ((name || '').charAt(0) || '').toUpperCase()
                        )}
                    </Avatar>
                </div>
            </Upload>
        </>
    );
};

export default AvatarUpload;
