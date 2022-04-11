import React from 'react';
import { useState } from 'react';
import { Form, Input, Button, Space } from 'antd';
import 'antd/dist/antd.min.css';
import { useTranslation } from 'react-i18next';

const Auth = (props) => {
    const { setUserName, authentication } = props;
    const [userInputName, setUserInputName] = useState('');
    const [userInputPass, setUserInputPass] = useState('');
    const { t } = useTranslation();

    // Get name
    const nameSubmit = (e) => {
        setUserInputName(e.currentTarget.value);
    };
    // Get password
    const passwordSubmit = (e) => {
        setUserInputPass(e.currentTarget.value);
    };

    // Login
    const onButtonAuth = () => {
        setUserName(userInputName);
        authentication(userInputName, userInputPass, 'auth');
    };

    // Registration
    const onButtonRegister = () => {
        setUserName(userInputName);
        authentication(userInputName, userInputPass, 'register');
    };

    // Set Username
    setUserName(userInputName);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                minHeight: '500px',
            }}>
            <Form
                name='auth'
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                autoComplete='off'>
                {/* Name */}
                <Form.Item
                    label={t('Username')}
                    name='username'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}>
                    <Input
                        name='username'
                        type='text'
                        onChange={nameSubmit}
                        value={userInputName}
                        placeholder='Username'
                        autoFocus={true}
                    />
                </Form.Item>
                {/* Password */}
                <Form.Item
                    label={t('Password')}
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}>
                    <Input.Password
                        name='password'
                        type='text'
                        onChange={passwordSubmit}
                        value={userInputPass}
                        placeholder='Password'
                        autoFocus={true}
                    />
                </Form.Item>
                {/* Buttons */}
                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}>
                    <Space>
                        <Button
                            type='primary'
                            htmlType='submit'
                            onClick={onButtonAuth}>
                            {t('buttons.Login')}
                        </Button>

                        <Button
                            type='secondary'
                            htmlType='submit'
                            onClick={onButtonRegister}>
                            {t('buttons.Registration')}
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};
export default Auth;
