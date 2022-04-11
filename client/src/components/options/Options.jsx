import React from 'react';
import styles from './Options.module.css';

const Options = () => {
    return (
        <div className={styles.todo__options}>
            <div className={styles.todo__options__left}>
                <button
                    className={`${styles.all} ${styles.btn_active_underline}`}>
                    all
                </button>
                <button className={styles.one}>done</button>
                <button className={styles.undone}>undone</button>
            </div>

            <div className={styles.todo__options__right}>
                <div className={styles.todo__options__name}>Sort by Date</div>
                <div className={styles.todo__options_sort}>
                    <button className={styles.new}></button>
                    <button
                        className={`${styles.last} ${styles.btn_active_bg}`}></button>
                </div>
            </div>
        </div>
    );
};

export default Options;
