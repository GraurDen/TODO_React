import React from 'react';
import styles from './Pagination.module.css';

const Pagination = () => {
    return (
        <div className={styles.todo__pagination}>
            <button className={styles.btnPrev} disabled='true'>
                {' '}
                «{' '}
            </button>
            <span className={styles.paginationSelected}>1</span>
            <span>2</span>
            <span>3</span>
            <button className={styles.btnNext}> » </button>
        </div>
    );
};

export default Pagination;
