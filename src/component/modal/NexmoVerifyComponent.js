import React, {Fragment} from 'react';
import styles from './PhoneAuthModalComponent.scss';
import classnames from 'classnames';
import ScreenBlockComponent from "../screenblock/ScreenBlockComponent";
import {innerCenter} from "../../lib/script";
import PhoneAuthCountrySelector from "../selector/PhoneAuthCountrySelector";
import axios from 'axios'
import {connect} from "react-redux";

const cx = classnames.bind(styles);

class NexmoVerifyComponent extends React.Component {
    static defaultState = {
        country: 'us'
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            nextStep: false,
            countryList: false, //
            inputFocus: false,
            phoneNumber: null,
            country: NexmoVerifyComponent.defaultState.country,
            error: false,
            requestId: null,
            success: false
        };

        //ref
        this.phoneModal = React.createRef();
        this.phone = React.createRef();
        this.codeInput = React.createRef();

        //bind
        this.onProcessPhoneAuth = this.onProcessPhoneAuth.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.inputBlur = this.inputBlur.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickCountrySelector = this.onClickCountrySelector.bind(this);
        this.checkDigitCode = this.checkDigitCode.bind(this);
        this.onChangeCodeHandler = this.onChangeCodeHandler.bind(this);
    }

    componentDidMount() {
        innerCenter(this.phoneModal.current);
        this.phone.current.focus();
    }

    //서버에 4자리 코드를 보내서 맞는지 확인
    checkDigitCode(e) {
        e.preventDefault();

        const code = this.props.code;
        const requestId = this.props.requestId;
        const country = this.props.selectedCountry;
        const clientIdx = this.props.clientIdx;
        const phone = this.props.phoneNumber;
        const email = this.props.email;

        if (this.props.actionType === 'updatePhone') {
            //유저정보에 핸드폰 번호를 업데이트 한다.(update)
            this.props.nexmoVerifyCheck(phone, code, requestId, country, clientIdx);
        } else if (this.props.actionType === 'findPassword') {
            //비밀번호를 찾는다.
            console.log('# 비밀번호 찾기 요청');
            this.props.nexmoFindPassword({code, requestId, country, phone, email});

        } else if (this.props.actionType === 'findEmail') {
            //아이디를 찾는다. 전화번호
            this.props.nexmoFindId({phone, requestId, code, country});

        }

    }

    //인증 번호 요청
    onProcessPhoneAuth(e) {
        e.preventDefault();
        const country = this.props.selectedCountry;
        const phone = this.props.phoneNumber;
        this.props.nexmoVerifyRequest(country, phone);
    }


    inputFocus() {
        this.setState({
            inputFocus: true
        })
    }

    inputBlur() {
        this.setState({
            inputFocus: false
        });
    }

    onChangeHandler() {
        const ref = this.phone.current.value;
        this.props.onChangePhone(ref);
    }

    onClickCountrySelector(e) {
        this.props.countrySelector(e.target.dataset.country);
        this.phone.current.focus();
    }

    onChangeCodeHandler() {
        const ref = this.codeInput.current.value;
        this.props.digitCodeHandler(ref);
    }

    render() {
        const {countryList, openCountryList, selectedCountry, phoneNumber, email, nextStep, loading, onClickCancelNextStep} = this.props;
        return (
            <Fragment>
                <ScreenBlockComponent action={this.props.toggle}/>

                <div className={styles['phone-auth-modal']} ref={this.phoneModal}>
                    {
                        loading ? '로딩 중...' : null
                    }
                    {
                        countryList ? <ScreenBlockComponent zIndex={{zIndex: 10}} action={openCountryList}/> : null
                    }
                    <div className={styles['phone-auth-modal--container']}>
                        {
                            nextStep ? <form id={'phone-auth-form'} role={'form'}>
                                    <h1 className={'phone-auth-modal--container--title'}>리틀원 전화번호 인증</h1>
                                    <fieldset form={'phone-auth-form'}>
                                        <legend>리틀원 전화번호를 인증 폼</legend>
                                        <div className={styles['phone-auth-modal--container--process-text']}>
                                            <p><em>{phoneNumber || '123455667'}</em>으로 4자리 코드를 보냈습니다.</p>
                                            <div>
                                                <span>혹시 받지 못하셨나요 ? </span>
                                                <button type={'button'}>재전송</button>
                                            </div>
                                        </div>
                                        {loading ? '처리중..' : null}
                                        <div className={'phone-text-field'}>
                                            <label className={this.state.inputFocus ? styles['active'] : null} htmlFor={'code-component'}>4자리 코드</label>
                                            <input type={'number'}
                                                   name={'code'}
                                                   id={'code-component'}
                                                   autoCapitalize={'off'}
                                                   autoComplete={'off'}
                                                   ref={this.codeInput}
                                                   maxLength={4}
                                                   onFocus={this.inputFocus}
                                                   onBlur={this.inputBlur}
                                                   onChange={this.onChangeCodeHandler}/>
                                        </div>
                                        <div className={'phone-error-field'}>
                                            <p></p>
                                        </div>
                                        <div className={styles['phone-auth-modal--container--button-box']}>
                                            <button type={'reset'} tabIndex={0} className={cx(styles['__request-verify-btn'], styles['cancel-btn'])} onClick={onClickCancelNextStep}>취소</button>
                                            <button type={'submit'} tabIndex={1} onClick={this.checkDigitCode} className={styles['__request-verify-btn']}>인증 완료</button>
                                        </div>
                                    </fieldset>
                                </form> :
                                <form id={'phone-auth-form'} role={'form'}>
                                    <h1 className={'phone-auth-modal--container--title'}>리틀원 전화번호 인증</h1>
                                    <fieldset form={'phone-auth-form'}>
                                        <legend>리틀원 전화번호를 인증 폼</legend>
                                        <div className={"language-selector-container"}>
                                            {
                                                countryList ? <PhoneAuthCountrySelector action={this.onClickCountrySelector}/> : null
                                            }

                                        </div>
                                        <button className={cx(styles['language-selector-container--list__selector'], styles['phone-prefix-button'])} type={'button'} tabIndex={0} role={'button'}
                                                aria-roledescription={'국가 목록을 호출합니다.'}
                                                onClick={openCountryList}>
                                            <span className={cx(styles['flag-icon'],
                                                selectedCountry === 'us' ? styles['--us'] :
                                                    selectedCountry === 'ko' ? styles['--ko'] :
                                                        selectedCountry === 'uk' ? styles['--uk'] :
                                                            selectedCountry === 'ca' ? styles['--ca'] :
                                                                selectedCountry === 'ja' ? styles['--ja'] :
                                                                    selectedCountry === 'zh' ? styles['--zh'] :
                                                                        selectedCountry === 'nz' ? styles['--nz'] :
                                                                            selectedCountry === 'au' ? styles['--au'] :
                                                                                selectedCountry === 'sp' ? styles['--sp'] :
                                                                                    selectedCountry === 'tw' ? styles['--tw'] : null)}></span>
                                            <span>+{selectedCountry === 'us' ? 1 :
                                                selectedCountry === 'ko' ? 82 :
                                                    selectedCountry === 'uk' ? 44 :
                                                        selectedCountry === 'ca' ? 1 :
                                                            selectedCountry === 'ja' ? 81 :
                                                                selectedCountry === 'zh' ? 86 :
                                                                    selectedCountry === 'nz' ? 64 :
                                                                        selectedCountry === 'au' ? 61 :
                                                                            selectedCountry === 'sp' ? 65 :
                                                                                selectedCountry === 'tw' ? 886 : null}</span>
                                        </button>

                                        <div className={'phone-text-field'}>
                                            <label className={this.state.inputFocus ? styles['active'] : null} htmlFor={'phone-number'}>전화번호</label>
                                            <input type={'tel'} name={'request-phone'}
                                                   autoCapitalize={'off'}
                                                   autoComplete={'off'}
                                                   ref={this.phone}
                                                   id={'phone-number'}
                                                   onFocus={this.inputFocus}
                                                   onBlur={this.inputBlur}
                                                   onChange={this.onChangeHandler}/>
                                        </div>
                                        <div className={'phone-error-field'}>
                                            <p>{this.state.error ? '통신에 실패했습니다.' : null}</p>
                                        </div>
                                        <div className={styles['phone-auth-modal--container--button-box']}>
                                            <button type={'button'} tabIndex={1} onClick={selectedCountry && phoneNumber ? this.onProcessPhoneAuth : null} className={styles['__request-verify-btn']}>인증</button>
                                        </div>
                                    </fieldset>
                                </form>
                        }

                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.phoneAuthReducer.loading,
        countryList: state.phoneAuthReducer.auth.countryList,
        selectedCountry: state.phoneAuthReducer.auth.country,
        phoneNumber: state.phoneAuthReducer.auth.phone,
        nextStep: state.phoneAuthReducer.auth.nextStep,
        requestId: state.phoneAuthReducer.auth.requestId,
        code: state.phoneAuthReducer.auth.code,
        clientIdx: state.clientStatusReducer.session._id,
        email: state.phoneAuthReducer.auth.email,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openCountryList: () => dispatch({
            type: 'SET_COUNTRY_LIST_TOGGLE_REQUEST'
        }),
        countrySelector: (value) => dispatch({
            type: 'SET_COUNTRY_SELECTOR_REQUEST',
            country: value
        }),
        onChangePhone: (value) => dispatch({
            type: 'SET_PHONE_NUMBER_REQUEST',
            phone: value
        }),
        nexmoVerifyRequest: (country, phone) => dispatch({
            type: 'API_PHONE_AUTH_REQUEST',
            phone: phone,
            country: country
        }),
        digitCodeHandler: (digitCode) => dispatch({
            type: 'SET_PHONE_AUTH_DIGIT_CODE_REQUEST',
            code: digitCode
        }),
        nexmoVerifyCheck: (phone, code, requestId, country, clientIdx) => dispatch({
            type: 'API_PHONE_AUTH_VERIFY_CODE_REQUEST',
            phone: phone,
            code: code,
            requestId: requestId,
            country: country,
            clientIdx: clientIdx
        }),
        nexmoFindPassword: (object) => dispatch({
            type: 'API_FIND_BY_PHONE_REQUEST',
            object
        }),
        onClickCancelNextStep: () => dispatch({
            type: 'SET_PHONE_AUTH_CANCEL_NEXT_STEP_REQUEST'
        }),
        nexmoFindId: (object) => dispatch({
            type: 'API_FIND_ID_BY_PHONE_REQUEST',
            object

        })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(NexmoVerifyComponent);