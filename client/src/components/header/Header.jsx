import React from 'react';
import { useTranslation } from 'react-i18next';
import style from '../header/Header.module.css'
import { Button } from 'antd';


const Header = ({ userName, logout, changeLanguage, totalItemsCount, language }) => {
    const { t } = useTranslation();

    const handleButton = (e) => {
        changeLanguage(e.currentTarget.value)
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
            }}>

            {/* EN / RU */}
            <div>
                <Button
                    type="button"
                    onClick={handleButton}
                    value="en"
                    disabled={language === 'en' ? false : true}>
                    EN
                </Button>
                <Button
                    type="button"
                    onClick={handleButton}
                    value="ru"
                    disabled={language === 'ru' ? false : true}>
                    RU
                </Button>
            </div>

            <div className={style.title}>ITEMS: {totalItemsCount}</div>

            {/* logout */}
            {userName && (
                <Button type="button" onClick={logout}>
                    Logout
                </Button>
            )}
        </div>
    );
};

export default Header;
