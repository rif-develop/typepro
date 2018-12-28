import React from 'react';
import * as styles from './Section06.scss';
import classNames from 'classnames';
import anime from 'animejs';

const cx = classNames.bind(styles);

class Section06 extends React.Component {

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps;
    }

    render() {
        let language = this.props.language;
        return (
            <div className={cx(styles['sixth-section'], 'section')}>
                <div className={styles['sixth-section--desc']}>
                    <div>
                        <h2>PRODUCT DETAILS</h2>
                    </div>
                    <h1 data-action="anime-20">{language.smartbottle.section06['00']}<br/>
                        {language.smartbottle.section06['01']}
                    </h1>
                </div>
                <div className={styles['sixth-section--bottle-image']}>
                    <a href={"javascript:void(0)"} className={cx(styles['sixth-section--float-txt'], styles['active'], styles['bottle-cap'])}>
                        <span className={cx(styles['sixth-section--float-txt__circle'],styles['active'])} data-action="anime-19">
                            {language.smartbottle.section06['02']}
                        </span>
                    </a>
                    <a href={"javascript:void(0)"} className={cx(styles['sixth-section--float-txt'], styles['active'], styles['handle'])}>
                        <span className={cx(styles['sixth-section--float-txt__circle'],styles['active'])} data-action="anime-19">
                              {language.smartbottle.section06['03']}
                        </span>
                    </a>
                    <a href={"javascript:void(0)"} className={cx(styles['sixth-section--float-txt'], styles['active'], styles['straw'])}>
                        <span className={cx(styles['sixth-section--float-txt__circle'],styles['active'])} data-action="anime-19">
                             {language.smartbottle.section06['04']}
                        </span>
                    </a>
                    <a href={"javascript:void(0)"} className={cx(styles['sixth-section--float-txt'], styles['active'], styles['smart-base'])}>
                        <span className={cx(styles['sixth-section--float-txt__circle'],styles['active'])} data-action="anime-19">
                            {language.smartbottle.section06['05']}
                        </span>
                    </a>
                    <a href={"javascript:void(0)"} className={cx(styles['sixth-section--float-txt'], styles['active'], styles['nipple'])}>
                        <span className={cx(styles['sixth-section--float-txt__circle'],styles['active'])} data-action="anime-19">
                            {language.smartbottle.section06['06']}
                        </span>

                    </a>
                    <a href={"javascript:void(0)"} className={cx(styles['sixth-section--float-txt'], styles['active'], styles['glass'])}>
                        <span className={cx(styles['sixth-section--float-txt__circle'],styles['active'])} data-action="anime-19">
                            {language.smartbottle.section06['07']}
                        </span>
                    </a>
                </div>
            </div>
        )
    }
}

export default Section06;