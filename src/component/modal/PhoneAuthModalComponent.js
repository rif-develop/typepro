import React, {Fragment} from 'react';
import styles from './PhoneAuthModalComponent.scss';
import classnames from 'classnames';
import ScreenBlockComponent from "../screenblock/ScreenBlockComponent";
import {innerCenter} from "../../lib/script";
import PhoneAuthCountrySelector from "../selector/PhoneAuthCountrySelector";
import axios from 'axios'

const cx = classnames.bind(styles);

class PhoneAuthModalComponent extends React.Component {
    static defaultState = {
        country: 'us'
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            nextStep: false,
            countryList: false,
            inputFocus: false,
            phoneNumber: null,
            country: PhoneAuthModalComponent.defaultState.country,
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
        this.fetchCountryList = this.fetchCountryList.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
        this.onCancelNextStep = this.onCancelNextStep.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
        this.inputBlur = this.inputBlur.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickCountrySelector = this.onClickCountrySelector.bind(this);
        this.checkDigitCode = this.checkDigitCode.bind(this);
    }

    componentDidMount() {
        innerCenter(this.phoneModal.current);
        this.phone.current.focus();
    }

    //서버에 4자리 코드를 보내서 맞는지 확인
    checkDigitCode(e) {
        e.preventDefault();
        //클라리언트가 휴대번호로 전송된 4자리 코드, 국가, 요청아이디 등 필수 값들을 검증받기 위해 전송
        axios({
            method: 'POST',
            url: '/nexmo/codecheck',
            data: {
                phone: this.state.phoneNumber,
                country: this.state.country,
                code: this.codeInput.current.value,
                requestId: this.state.requestId,
                clientIdx: this.props.clientIdx
            }
        }).then((res) => {
            console.log(res);

            if (res.data.success) {
                //성공을 true로 변경시키고 , 나머지 스테이트는 초기화
                this.setState({
                    success: true,
                    loading: false,
                    nextStep: false,
                    countryList: false,
                    inputFocus: false,
                    phoneNumber: null,
                    country: PhoneAuthModalComponent.defaultState.country,
                    error: false,
                    requestId: null,
                });
                this.props.toggle();
            }

        }).catch((err) => {
            console.log(err);
        });
    }

    onProcessPhoneAuth(e) {
        e.preventDefault();
        //로딩 창 보여주기
        this.setState({
            loading: true,
        });


        
        axios({
            method: 'post',
            url: '/nexmo/request',
            data: {
                country: this.state.country,
                phone: this.state.phoneNumber
            }
        }).then((res) => {

            //로딩창 닫기
            this.setState({
                loading: false,
            });

            //서버에서 받는 값 : success:true면
            if (res.data.success) {
                //서버에 전달 성공시에
                this.setState({
                    nextStep: true,
                    requestId: res.data.requestId
                });

                this.codeInput.current.focus();


            }
        }).catch((e) => {
            this.setState({
                loading: false,
            });
            console.log(e);
        });


    }

    fetchCountryList() {
        this.setState({
            countryList: !this.state.countryList
        });

    }

    onFocusHandler(e) {

    }

    onCancelNextStep() {
        this.setState({
            nextStep: false,
            inputFocus: false,
            phoneNumber: null
        });

    }

    inputFocus() {
        this.setState({
            inputFocus: true
        })
    }

    inputBlur() {
        this.setState({
            inputFocus: false
        })
    }

    onChangeHandler() {
        const ref = this.phone.current.value;
        this.setState({
            phoneNumber: ref
        })
    }

    onClickCountrySelector(e) {
        this.setState({
            country: e.target.dataset.country,
            countryList: false
        });

        this.phone.current.focus();
    }

    render() {
        return (
            <Fragment>
                <ScreenBlockComponent action={this.props.toggle}/>

                <div className={styles['phone-auth-modal']} ref={this.phoneModal}>
                    {
                        this.state.loading ? '로딩 중...' : null
                    }
                    {
                        this.state.countryList ? <ScreenBlockComponent zIndex={{zIndex: 10}} action={this.fetchCountryList}/> : null
                    }
                    <div className={styles['phone-auth-modal--container']}>
                        {
                            this.state.nextStep ? <form id={'phone-auth-form'} role={'form'}>
                                    <h1 className={'phone-auth-modal--container--title'}>리틀원 전화번호 인증</h1>
                                    <fieldset form={'phone-auth-form'}>
                                        <legend>리틀원 전화번호를 인증 폼</legend>
                                        <div className={styles['phone-auth-modal--container--process-text']}>
                                            <p><em>{this.state.phoneNumber || '123455667'}</em>으로 4자리 코드를 보냈습니다.</p>
                                            <div>
                                                <span>혹시 받지 못하셨나요 ? </span>
                                                <button type={'button'}>재전송</button>
                                            </div>
                                        </div>
                                        <div className={'phone-text-field'}>
                                            <label className={this.state.inputFocus ? styles['active'] : null}>4자리 코드</label>
                                            <input type={'number'} name={'request-phone'} autoCapitalize={'off'} autoComplete={'off'} ref={this.codeInput} maxLength={4} onFocus={this.inputFocus}
                                                   onBlur={this.inputBlur}/>
                                        </div>
                                        <div className={'phone-error-field'}>
                                            <p></p>
                                        </div>
                                        <div className={styles['phone-auth-modal--container--button-box']}>
                                            <button type={'reset'} tabIndex={0} className={cx(styles['__request-verify-btn'], styles['cancel-btn'])} onClick={this.onCancelNextStep}>취소</button>
                                            <button type={'submit'} tabIndex={1} onClick={this.checkDigitCode} onFocus={this.onFocusHandler} className={styles['__request-verify-btn']}>인증 완료</button>
                                        </div>
                                    </fieldset>
                                </form> :
                                <form id={'phone-auth-form'} role={'form'}>
                                    <h1 className={'phone-auth-modal--container--title'}>리틀원 전화번호 인증</h1>
                                    <fieldset form={'phone-auth-form'}>
                                        <legend>리틀원 전화번호를 인증 폼</legend>
                                        <div className={"language-selector-container"}>
                                            {
                                                this.state.countryList ? <PhoneAuthCountrySelector action={this.onClickCountrySelector}/> : null
                                            }

                                        </div>
                                        <button className={cx(styles['language-selector-container--list__selector'], styles['phone-prefix-button'])} type={'button'} tabIndex={0} role={'button'}
                                                aria-roledescription={'국가 목록을 호출합니다.'} onClick={this.fetchCountryList}>
                                            <span className={cx(styles['flag-icon'],
                                                this.state.country === 'us' ? styles['--us'] :
                                                    this.state.country === 'ko' ? styles['--ko'] :
                                                        this.state.country === 'uk' ? styles['--uk'] :
                                                            this.state.country === 'ca' ? styles['--ca'] :
                                                                this.state.country === 'ja' ? styles['--ja'] :
                                                                    this.state.country === 'zh' ? styles['--zh'] :
                                                                        this.state.country === 'nz' ? styles['--nz'] :
                                                                            this.state.country === 'au' ? styles['--au'] :
                                                                                this.state.country === 'sp' ? styles['--sp'] :
                                                                                    this.state.country === 'tw' ? styles['--tw'] : null)}></span>
                                            <span>+{this.state.country === 'us' ? 1 :
                                                this.state.country === 'ko' ? 82 :
                                                    this.state.country === 'uk' ? 44 :
                                                        this.state.country === 'ca' ? 1 :
                                                            this.state.country === 'ja' ? 81 :
                                                                this.state.country === 'zh' ? 86 :
                                                                    this.state.country === 'nz' ? 64 :
                                                                        this.state.country === 'au' ? 61 :
                                                                            this.state.country === 'sp' ? 65 :
                                                                                this.state.country === 'tw' ? 886 : null}</span>
                                        </button>

                                        <div className={'phone-text-field'}>
                                            <label className={this.state.inputFocus ? styles['active'] : null}>전화번호</label>
                                            <input type={'tel'} name={'request-phone'}
                                                   autoCapitalize={'off'}
                                                   autoComplete={'off'}
                                                   ref={this.phone}
                                                   onFocus={this.inputFocus}
                                                   onBlur={this.inputBlur}
                                                   onChange={this.onChangeHandler}

                                            />
                                        </div>
                                        <div className={'phone-error-field'}>
                                            <p>{this.state.error ? '통신에 실패했습니다.' : null}</p>
                                        </div>
                                        <div className={styles['phone-auth-modal--container--button-box']}>
                                            <button type={'submit'} tabIndex={1} onClick={this.onProcessPhoneAuth} onFocus={this.onFocusHandler} className={styles['__request-verify-btn']}>인증</button>
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

export default PhoneAuthModalComponent