import React from 'react';
import styels from './SubLink.scss';
import styles from "../header/Header.scss";
import {Link} from "react-router-dom";

class SubLink extends React.Component{
    render(){
        return(
            <div className={styles['header--sublink']}>
                <nav className={styles['header--sublink__device']}>
                    <Link to="/device/smartbottle" className={styles['header--sublink__device__smart-bottle']}>
                        <div></div>
                        <span>스마트 보틀</span>
                    </Link>
                    <Link to="/device/smartpeepee" className={styles['header--sublink__device__smart-peepee']}>
                        <div></div>
                        <span>스마트 피피</span>
                    </Link>
                    <Link to="/device/smarttemp" className={styles['header--sublink__device__smart-temp']}>
                        <div></div>
                        <span>스마트 템프</span>
                    </Link>
                </nav>
            </div>
        )
    }
}

export default SubLink