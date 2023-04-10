import React from 'react';
import styles from './AppLoadingScreen.module.scss';

const LoadingScreen = () => {
    return (
        <div className={styles['loader-container']}>
            <div className={styles['loader']}>
                <div className={styles['bottom-section']}>
                    <div className={styles['bottom']}></div>
                    <div className={styles['bottom']}></div>
                    <div className={styles['bottom']}></div>
                    <div className={styles['bottom']}></div>
                </div>
                <div className={styles['top-section']}>
                    <div className={styles['bottom']}></div>
                    <div className={styles['bottom']}></div>
                    <div className={styles['bottom']}></div>
                    <div className={styles['bottom']}></div>
                </div>
                <div className={styles['middle']}></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
