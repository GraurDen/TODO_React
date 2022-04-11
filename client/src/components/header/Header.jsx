import React from 'react';
import styles from './Header.module.css';
import { useTranslation } from 'react-i18next';

const Header = (props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.title}>
            <h1>{t('title')}</h1>
            <span>{props.task}</span>
        </div>
    );
};

export default Header;
