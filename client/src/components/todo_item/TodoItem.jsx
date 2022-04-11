import React from 'react';
import { useState } from 'react';
import { Checkbox, Typography, Input, Button, Divider } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
const { Text } = Typography;

const TodoItem = (props) => {
    const { item, editTask, removeTask, toggleTask } = props;

    const [editMode, setEditMode] = useState(false);
    const [userInput, setUserInput] = useState(item.name);

    // Change task status
    const handleChange = () => {
        toggleTask(item.id, !item.done);
    };
    // Toggle task to 'edit mode'
    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    // Deactivate 'edit mode' and update task name
    const deactivateEditMode = () => {
        setEditMode(!editMode);
        editTask(item.id, userInput);
    };
    // Set new task name
    const handleTaskName = (e) => {
        setUserInput(e.currentTarget.value);
    };
    // Discard changes input 'onBlur' and on 'Esc' click
    const discardChanges = (e) => {
        if (e.keyCode === 27) {
            setUserInput(item.name);
            e.target.blur();
        }
        if (e.keyCode === 13) {
            setUserInput(
                e.currentTarget.value === '' ? item.name : e.currentTarget.value
            );
            e.target.blur();
        }
    };

    const handleRemove = (e) => {
        e.currentTarget.disabled = true;
        removeTask(item.id);
    };

    return (
        <div>
            <div
                style={{
                    fontFamily: 'Montserrat',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                {/* Checkbox */}
                <Checkbox
                    style={{ marginRight: '10px' }}
                    onChange={handleChange}
                    checked={item.done}></Checkbox>

                {/* User input */}

                {!editMode && (
                    <div
                        style={{ marginRight: '10px', maxWidth: '200px' }}
                        onClick={toggleEditMode}>
                        <Text>{userInput}</Text>
                    </div>
                )}

                {editMode && (
                    <div style={{ width: '242px' }}>
                        <Input
                            type='text'
                            placeholder={userInput}
                            onBlur={deactivateEditMode}
                            autoFocus={true}
                            onChange={handleTaskName}
                            onKeyDown={discardChanges}
                        />
                    </div>
                )}

                {/* Creates at */}
                <Text
                    style={{
                        fontSize: '11px',
                        flexGrow: '1',
                        textAlign: 'right',
                    }}
                    type='secondary'>
                    {new Date(item.createdAt)
                        .toLocaleString('ru-RU', { hour12: false })
                        .split(' ')}
                </Text>

                {/* Delete */}
                <Button
                    style={{ marginLeft: 'auto' }}
                    icon={<DeleteOutlined />}
                    danger
                    type='text'
                    onClick={handleRemove}></Button>
            </div>
            <Divider style={{ margin: '10px 0 10px 0' }} />
        </div>
    );
};

export default TodoItem;
