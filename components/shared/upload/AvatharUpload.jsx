import React from 'react';
import { Avatar, Upload } from 'antd';
import { useDispatch } from 'react-redux';
import { updateProfilePhoto } from '~/store/userInfo/action';
import { baseUrl } from '~/repositories/Repository';

const AvatarUpload = ({ profilePhoto }) => {
    console.log('profilePhoto: ', profilePhoto);
    const dispatch = useDispatch();

    const onChange = ({ fileList }) => {
        dispatch(updateProfilePhoto(fileList[0]));
    };

    return (
        <>
            <Upload onChange={onChange}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <Avatar
                        {...(profilePhoto
                            ? { src: `${baseUrl}/${profilePhoto}` }
                            : {})}
                        size={200}>
                        {'user'}
                    </Avatar>
                </div>
            </Upload>
        </>
    );
};

export default AvatarUpload;
