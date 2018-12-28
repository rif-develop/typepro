import React from 'react';
import * as styles from "./Section06.scss";
import classNames from 'classnames';
import anime from "animejs";

const cx = classNames.bind(styles);
class Section06 extends React.Component {

    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(e) {
        const target = e.currentTarget.childNodes[0];

        target.classList.toggle(styles['active']);

        const isActive = target.classList.contains(styles['active']);

        if(isActive){
            let actions = anime({
                targets: target,
                width: '120',
                easing: 'easeInSine',
                color: 'rgba(0,0,0,1)',
                paddingLeft: '15',
                paddingRight: '15',
                textIndent: '0',
                duration: '200',
                letterSpacing:'-0.3px'
            });
        } else{
            let actions = anime({
                targets: target,
                width: '38',
                easing: 'easeInSine',
                color: 'rgba(0,0,0,0)',
                paddingLeft: '0',
                paddingRight: '0',
                duration: '200',
                letterSpacing:'0'
            });
        }


    }



    shouldComponentUpdate(nextProps){
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
                    <h1>{language.smarttemp.section06['00']}<br/>
                        {language.smarttemp.section06['01']}
                    </h1>
                    <p>{language.smarttemp.section06['02']}<br/>
                        {language.smarttemp.section06['03']}</p>
                </div>
                <div className={styles['sixth-section--bottle-image']}>
                    <a href={"javascript:void(0)"} className={cx(styles['sixth-section--float-txt'],  styles['display'])} onClick={this.onClickHandler}>
                        <span className={styles['sixth-section--float-txt__circle']}>
                            {language.smarttemp.section06['04']}
                        </span>
                    </a>
                    <a href={"javascript:void(0)"} className={cx(styles['sixth-section--float-txt'],   styles['band'])} onClick={this.onClickHandler}>
                        <span className={styles['sixth-section--float-txt__circle']}>
                              {language.smarttemp.section06['05']}
                        </span>
                    </a>
                    <a href={"javascript:void(0)"} className={cx(styles['sixth-section--float-txt'],  styles['sensor'])} onClick={this.onClickHandler}>
                        <span className={styles['sixth-section--float-txt__circle']}>
                             {language.smarttemp.section06['06']}
                        </span>
                    </a>
                </div>
            </div>
        )
    }
}

export default Section06;