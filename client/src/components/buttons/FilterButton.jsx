import React from 'react';
import styles from './../options/Options.module.css';

const FilterButton = (props) => {
    const { filterButtonBy, filterBy, name, onSetFilterBy } = props;
    return (
        <button
            className={
                filterButtonBy === filterBy
                    ? styles.btn_active_underline
                    : undefined
            }
            onClick={() => onSetFilterBy(filterBy)}>
            {name}
        </button>
    );
};

export default FilterButton;
