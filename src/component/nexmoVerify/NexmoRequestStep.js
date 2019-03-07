import React from "react";
import styles from "./PhoneAuthModalComponent.scss";
import classnames from 'classnames';
import PhoneAuthCountrySelector from "../selector/PhoneAuthCountrySelector";
import {Validations} from "../../lib/validation";
import {getCookie} from "../../action/cookie/Cookie";
import FocusLock from 'react-focus-lock';

const cx = classnames.bind(styles);


class NexmoRequestStep extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            inputFocus: false,
        };

        this.map = {};


        //ref
        this.phone = React.createRef();
        this.nextBtn = React.createRef();
        this.selectCountryBtn = React.createRef();
        //binding
        this.onClickCountrySelector = this.onClickCountrySelector.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.inputBlur = this.inputBlur.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onProcessPhoneAuth = this.onProcessPhoneAuth.bind(this);
        this.onKeyEnter = this.onKeyEnter.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);

    }

    componentDidMount() {
        this.phone.current.focus();
        //ESC누르면 모달창 꺼지게
    }

    inputFocus(e) { //인풋에 포커스 갔을 시, 애니메이션
        this.setState({
            inputFocus: true
        });
    }

    inputBlur() { //인풋에서 벗어날 경우, 애니메이션 삭제
        this.setState({
            inputFocus: false
        });
        const ref = this.phone.current;
        Validations.handleBlur(ref);
    }

    onClickCountrySelector(e) { //나라 선택
        this.props.countrySelector(e.target.dataset.country);
        this.phone.current.focus();
    }

    onProcessPhoneAuth(e) {     //서버에 4자리 인증 번호 요청
        e.preventDefault();
        const country = this.props.country;
        const phone = this.props.phoneNumber;
        this.props.nexmoVerifyRequest(country, phone);
        this.phone.current.value = null;
    }

    onChangeHandler(event) { //리덕스 스토어에 인증 요청할 전화번호 저장
        const ref = this.phone.current;
        //한글 자음들어간 문자 제거(리덕스 스토어에 숫자만 들어가도록)
        ref.value = ref.value.replace(/[^0-9]/g, "");
        if (ref.value.length > 1) {
            this.props.onChangePhone(ref.value);

        }

    }

    onKeyEnter(e) { //엔터키 누를 상황

        Validations.handleKeyDown(e);
        if (e.keyCode === 13) {
            e.preventDefault();
            this.nextBtn.current.click();
        }

    }

    onKeyUp(e) {
        Validations.handleKeyUp(e);
    }


    render() {
        const {country, countryList, openCountryList, phoneNumber, locale} = this.props;

        let style = null;
        if (getCookie('lang') === 'en') {
            style = {'fontSize': '16px'};
        }


        return (
            <div id={'phone-auth-form'} role={'form'}>
                <h1 className={styles['phone-auth-modal--container--title']} style={style}>{locale.string['01']}</h1>
                <div className={styles['language-selector-container']}>
                    {
                        countryList ? <PhoneAuthCountrySelector action={this.onClickCountrySelector} locale={locale}/> : null
                    }

                </div>
                <FocusLock>
                    <button className={cx(styles['language-selector-container--list__selector'], styles['phone-prefix-button'])}
                            type={'button'}
                            tabIndex={101}
                            role={'button'}
                            aria-roledescription={locale.description['01']}
                            onClick={openCountryList}
                            ref={this.selectCountryBtn}>
                                            <span className={cx(styles['flag-icon'],
                                                country === 'us' ? styles['--us'] :
                                                    country === 'ko' ? styles['--ko'] :
                                                        country === 'uk' ? styles['--uk'] :
                                                            country === 'ca' ? styles['--ca'] :
                                                                country === 'ja' ? styles['--ja'] :
                                                                    country === 'zh' ? styles['--zh'] :
                                                                        country === 'nz' ? styles['--nz'] :
                                                                            country === 'au' ? styles['--au'] :
                                                                                country === 'sp' ? styles['--sp'] :
                                                                                    country === 'tw' ? styles['--tw'] : null)}></span>
                        <span>+{country === 'us' ? 1 :
                            country === 'ko' ? 82 :
                                country === 'uk' ? 44 :
                                    country === 'ca' ? 1 :
                                        country === 'ja' ? 81 :
                                            country === 'zh' ? 86 :
                                                country === 'nz' ? 64 :
                                                    country === 'au' ? 61 :
                                                        country === 'sp' ? 65 :
                                                            country === 'tw' ? 886 : null}</span>
                    </button>

                    <div className={styles['phone-text-field']}>
                        <label className={this.state.inputFocus ? styles['active'] : null} htmlFor={'phone-number'}>{locale.string['02']}</label>
                        <input type={'tel'} name={'request-phone'}
                               autoCapitalize={'off'}
                               autoComplete={'off'}
                               ref={this.phone}
                               id={'phone-number'}
                               onFocus={this.inputFocus}
                               onBlur={this.inputBlur}
                               placeholder={locale.placeholder['01']}
                               onKeyDown={this.onKeyEnter}
                               onKeyUp={this.onKeyUp}
                               onChange={this.onChangeHandler}
                               tabIndex={102}/>
                    </div>
                    <div className={styles['phone-error-field']}>
                        <p></p>
                    </div>
                    <div className={styles['phone-auth-modal--container--button-box']}>
                        <button type={'button'}
                                tabIndex={103}
                                ref={this.nextBtn}
                                onClick={country && phoneNumber ? this.onProcessPhoneAuth : null} className={styles['__request-verify-btn']}>{locale.string['03']}</button>
                    </div>
                </FocusLock>
            </div>
        )
    }
}

export default NexmoRequestStep