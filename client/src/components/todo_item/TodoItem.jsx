import React from 'react';
import styles from './TodoItem.module.css';

const TodoItem = () => {
    return (
        <div className={styles.todo__item}>
            <div className={styles.todo__item__input}>
                <input type='checkbox' />
            </div>
            <div className={styles.todo__item__text}>Do somthing</div>
            <div className={styles.todo__item__date}>11/01/2022</div>
            <div className={styles.todo__item__del}>
                <button type='button'></button>
            </div>
        </div>
    );
};

export default TodoItem;
