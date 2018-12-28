import React from 'react';
import styles from './Section08.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section08 extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            active: false
        };

        /*메서드 바인딩 꼭 해주자..*/
        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate(nextProps){
        return nextProps;
    }

    handleClick() {
        this.setState(function () {
            return {
                active: !this.state.active
            }

        });
    }


    render() {
        let language = this.props.language;
        return (
            <div className={cx(styles['eighth-section'], 'section')}>
                <div className={styles['eighth-section--desc']}>
                    <div>
                        <h2>PRODUCT SPECIFICATION</h2>
                    </div>
                    <h1>{language.smarttemp.section08['00']}</h1>
                </div>
                <div className={styles['eighth-section--spec']}>
                    <div className={styles['eighth-section--spec--image']}></div>
                    <ul className={styles['eighth-section--spec--desc']}>
                        <li className={styles['eighth-section--spec--desc--list']}>
                            <h4>{language.smarttemp.section08['01']}</h4>
                            <span>{language.smarttemp.section08['02']}</span>
                        </li>
                        <li className={styles['eighth-section--spec--desc--list']}>
                            <h4>{language.smarttemp.section08['03']}</h4>
                            <span>{language.smarttemp.section08['04']}</span>
                        </li>
                        <li className={styles['eighth-section--spec--desc--list']}>
                            <h4>{language.smarttemp.section08['05']}</h4>
                            <span>{language.smarttemp.section08['06']}</span>
                        </li>
                        <li className={styles['eighth-section--spec--desc--list']}>
                            <h4>{language.smarttemp.section08['07']}</h4>
                            <span>{language.smarttemp.section08['08']}</span>
                        </li>
                        <li className={styles['eighth-section--spec--desc--list']}>
                            <h4>{language.smarttemp.section08['09']}</h4>
                            <span>{language.smarttemp.section08['10']}</span>
                        </li>
                        <li className={styles['eighth-section--spec--desc--list']}>
                            <h4>{language.smarttemp.section08['11']}</h4>
                            <span>{language.smarttemp.section08['12']}</span>
                        </li>
                        <li className={cx(styles['authentication-list'], {active: this.state.active})}
                            onClick={this.handleClick}>
                            <div>{this.state.active}</div>
                        </li>
                    </ul>
                </div>
                <div className={cx(styles['kc'], this.state.active === true ? styles['active'] : null)}
                     onClick={this.handleClick}>
                    <div className={styles['kc-image']}></div>
                    <div className={styles['kc-spec']}>
                        <div>
                            <h5>{language.smarttemp.section08['13']}</h5>
                            <span>{language.smarttemp.section08['14']}</span>
                        </div>
                        <div>
                            <h5>{language.smarttemp.section08['15']}</h5>
                            <span>{language.smarttemp.section08['16']}</span>
                        </div>
                        <div>
                            <h5>{language.smarttemp.section08['17']}</h5>
                            <span>{language.smarttemp.section08['18']}</span>
                        </div>
                        <div>
                            <h5>{language.smarttemp.section08['19']}</h5>
                            <span>{language.smarttemp.section08['20']}</span>
                        </div>
                        <div>
                            <h5>{language.smarttemp.section08['21']}</h5>
                            <span>{language.smarttemp.section08['22']}</span>
                        </div>
                        <div>
                            <h5>{language.smarttemp.section08['23']}</h5>
                            <span>{language.smarttemp.section08['24']}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Section08;