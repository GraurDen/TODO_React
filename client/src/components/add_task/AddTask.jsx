import React from 'react';
import styles from './AddTask.module.css';

const Add_task = () => {
    return (
        <form>
            <div className={styles.todo__input}>
                <div className={styles.todo__task}>
                    <input type='text/' placeholder='I want to...' />
                </div>
                <div className={styles.todo__button}>
                    <button>Add</button>
                </div>
            </div>
        </form>
    );
};

export default Add_task;
