import React, {Fragment} from 'react';
import styles from "./PhoneAuthCountrySelector.scss";
import classnames from 'classnames';
import FocusLock from 'react-focus-lock';

const cx = classnames.bind(styles);

class PhoneAuthCountrySelector extends React.PureComponent {


    constructor(props) {
        super(props);

        this.state = {
            countryList: ['us', 'uk', 'ko', 'ja', 'zh', 'ca', 'au', 'nz', 'sp', 'tw']
        };
        //ref
        this.firstBtn = React.createRef();
        //binding
        this.onKeyHandler = this.onKeyHandler.bind(this);

    }

    componentDidMount() {
        this.firstBtn.current.focus();
    }



    onKeyHandler(e) {
        const btnIndex = Number(e.target.getAttribute('data-len'));

        const isShiftKey = e.shiftKey;
        const isTabKey = e.keyCode === 9;

        const countryLen = this.state.countryList.length - 1;

        //마지막 버튼이면
        if (countryLen === btnIndex) {
            const target = document.getElementsByClassName(styles['language-selector-container--list__selector'])[0];
            target.focus();
        } else if (isShiftKey && isTabKey && btnIndex === 0) {
            const target = document.getElementsByClassName(styles['language-selector-container--list__selector'])[9];
            target.focus();
        }

        //첫 번째 버튼이면
    }

    render() {
        const {locale} = this.props;

        const {countryList} = this.state;

        return (
            <div className={styles['language-selector-container--list']}>
                <FocusLock>
                    {
                        countryList.map((ele, key) => {
                            return <button type={'button'}
                                           className={styles['language-selector-container--list__selector']}
                                           role={'button'}
                                           key={key + new Date()}
                                           tabIndex={0}
                                           ref={key === 0 ? this.firstBtn : null}
                                           aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'}
                                           onClick={this.props.action}
                                           data-country={ele}
                                           data-len={key}
                                           onKeyDown={this.keyDownEsc}
                                         >
                                <div className={cx(styles['flag-icon'], styles[`--${ele}`])} data-country={ele}>{locale.string['10']}</div>
                                <div data-country={ele}>
                                    {
                                        ele === 'us' ? locale.country['us'] :
                                            ele === 'uk' ? locale.country['uk'] :
                                                ele === 'ca' ? locale.country['ca'] :
                                                    ele === 'au' ? locale.country['au'] :
                                                        ele === 'nz' ? locale.country['nz'] :
                                                            ele === 'sp' ? locale.country['sp'] :
                                                                ele === 'ja' ? locale.country['ja'] :
                                                                    ele === 'zh' ? locale.country['zh'] :
                                                                        ele === 'tw' ? locale.country['tw'] :
                                                                            ele === 'ko' ? locale.country['ko'] : null
                                    }
                                </div>
                            </button>
                        })
                    }
                </FocusLock>
            </div>
        )
    }
}

export default PhoneAuthCountrySelector