import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import 'antd/dist/antd.min.css';

const Add_task = (props) => {
    const { showUserMessage, addTask } = props;
    // Initial State
    const [userInput, setUserInput] = useState('');

    const { t } = useTranslation();

    // Set input value
    const handleChange = (e) => {
        setUserInput(e.currentTarget.value);
    };

    // Add task and clear input value
    const hanldeSubmit = () => {
        if (userInput === '') {
            showUserMessage();
            return;
        }
        addTask(userInput);
        setUserInput('');
    };

    return (
        <Form
            onFinish={hanldeSubmit}
            name='basic'
            layout='inline'
            style={{ width: '100%', marginBottom: '20px' }}>
            <Form.Item style={{ flex: 1 }}>
                <Input
                    name='content'
                    type='text'
                    onChange={handleChange}
                    value={userInput}
                    placeholder={t('Plaseholder')}
                    autoFocus={true}
                />
            </Form.Item>
            <Form.Item style={{ margin: 0 }}>
                <Button type='primary' htmlType='submit'>
                    {t('buttons.buttonAdd')}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Add_task;
