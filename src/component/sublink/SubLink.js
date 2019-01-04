import React from 'react';
import styles from './SubLink.scss';
import {Link} from "react-router-dom";
import classnames from 'classnames';
import Anime from 'react-anime';
import App from "../../test/app";

const cx = classnames.bind(styles);

class SubLink extends React.Component {


    constructor(props) {
        super(props);
    }


    render() {

        const animation = {
            easing: "easeOutElastic",
            duration: 5000,
            direction: "alternate",
            rotate: '360deg',
            scale: [.55, 1]
        }

        const sublinkImageAni = {
            duration: 2000,
            opacity: [0, 1]
        }


        return (
            <div className={cx(styles['header--sublink'], this.props.active ? styles['active']:null)}>
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