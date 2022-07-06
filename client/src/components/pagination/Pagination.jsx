import React from 'react';
import styles from './Pagination.module.css';
import { useState } from 'react';

const Pagination = (props) => {
    // Tasks total number
    const totalItemsCount = props.totalItemsCount;

    // Total count of pages
    const pagetTotal = Math.ceil(totalItemsCount / props.pageSize);

    // Page-buttons total number
    const pagesArr = [];

    for (let i = 1; i <= pagetTotal; i++) {
        pagesArr.push(i);
    }

    return (
        <>
            {totalItemsCount > 5 && (
                <div className={styles.todo__pagination}>
                    {/* Button Last page */}
                    {pagetTotal > 1 && (
                        <button
                            className={styles.btnFirst}
                            onClick={() => props.paginate(1)}>
                            First
                        </button>
                    )}
                    {/* Button 'Prev' */}
                    <button
                        className={styles.btnPrev}
                        disabled={props.currentPage <= 1 && true}
                        onClick={() => props.paginate(props.currentPage - 1)}>
                        {' '}
                        «{' '}
                    </button>
                    {/* Pages */}
                    {pagesArr.map((page, index) => (
                        <span
                            className={
                                props.currentPage === page
                                    ? styles.paginationSelected
                                    : undefined
                            }
                            key={index}
                            onClick={() => {
                                props.paginate(page);
                            }}>
                            {page}
                        </span>
                    ))}
                    {/* Button 'Next' */}
                    <button
                        className={styles.btnNext}
                        disabled={props.currentPage === pagetTotal && true}
                        onClick={() => props.paginate(props.currentPage + 1)}>
                        {' '}
                        »{' '}
                    </button>
                    {/* Button Last page */}
                    {pagetTotal > 1 && (
                        <button
                            className={styles.btnLast}
                            onClick={() => props.paginate(pagetTotal)}>
                            Last
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default Pagination;
