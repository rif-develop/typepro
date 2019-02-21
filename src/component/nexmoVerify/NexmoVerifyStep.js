import styles from "./PhoneAuthModalComponent.scss";
import React from "react";
import classnames from 'classnames';
import {Validations} from "../../lib/validation";
import PinkSpinnerComponent from "../loading/PinkSpinnerComponent";
import {getCookie} from "../../action/cookie/Cookie";

const cx = classnames.bind(styles);

class NexmoVerifyStep extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            inputFocus: false
        };
        //ref
        this.codeInput = React.createRef();
        //binding
        this.inputFocus = this.inputFocus.bind(this);
        this.inputBlur = this.inputBlur.bind(this);
        this.backToRequestStep = this.backToRequestStep.bind(this);
        this.checkDigitCode = this.checkDigitCode.bind(this);
        this.onChangeCodeHandler = this.onChangeCodeHandler.bind(this);
        this.onKeyDownHandler = this.onKeyDownHandler.bind(this);
        this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    }

    componentDidMount() {
        //컴포넌트가 마운트되면 인풋에 포커스주기
        this.codeInput.current.focus();
    }

    inputFocus(e) {   //인풋에 포커스가 갈 때
        this.setState({
            inputFocus: true
        });
    }

    inputBlur() {    //인풋에서 벗어날 때
        this.setState({
            inputFocus: false
        });
        const ref = this.codeInput.current;
        Validations.handleBlur(ref);
    }

    backToRequestStep() { //이전 단계로 (전화 번호 입력후 인증번호 요청단계)
        this.props.backPage();
    }

    onChangeCodeHandler(e) { //코드를 리덕스 스토어에 디스패치
        const ref = this.codeInput.current;
        let val = ref.value;
        const maxLen = this.codeInput.current.maxLength;
        if (val.length > maxLen) {
            ref.value = ref.value.slice(0, maxLen);
        } else {
            this.props.digitCodeHandler(val);
        }


    }

    onKeyDownHandler(e) {
        Validations.handleKeyDown(e);
    }

    onKeyUpHandler(e) {
        Validations.handleKeyUp(e);

    }


    checkDigitCode(e) {     //서버에 4자리 코드를 보내서 맞는지 확인
        e.preventDefault();

        const code = this.props.code;
        const requestId = this.props.requestId;
        const country = this.props.country;
        const clientIdx = this.props.clientIdx;
        const phone = this.props.phoneNumber;
        const email = this.props.email;

        if (this.props.actionType === 'updatePhone') {
            //유저정보에 핸드폰 번호를 업데이트 한다.(update)
            this.props.nexmoClientUpdateRequest(phone, code, requestId, country, clientIdx);
        } else if (this.props.actionType === 'findPassword') {
            //비밀번호를 찾는다.
            console.log('# 비밀번호 찾기 요청');
            this.props.nexmoFindPassword({code, requestId, country, phone, email});

        } else if (this.props.actionType === 'findEmail') {
            //아이디를 찾는다. 전화번호
            this.props.nexmoFindId({phone, requestId, code, country});

        }
    }

    render() {
        const {locale} = this.props;

        let style = null;
        if (getCookie('lang') === 'en') {
            style = {'fontSize': '16px'};
        }
        return (
            <form id={'phone-auth-form'} role={'form'}>
                <h1 className={styles['phone-auth-modal--container--title']} style={style}>{locale.string['01']}</h1>
                <fieldset form={'phone-auth-form'}>
                    <legend>{locale.string['04']}</legend>
                    <div className={styles['phone-auth-modal--container--process-text']}>
                        {
                            getCookie('lang') === 'en' ? <p>{locale.string['05']}<em> {this.props.phoneNumber}</em></p>
                                : getCookie('lang')==='zh' ? <p>已向<em> {this.props.phoneNumber}</em> {locale.string['05']}</p>:<p><em>{this.props.phoneNumber || '123455667'}</em>{locale.string['05']}</p>

                        }

                        <div>
                            <span>{locale.string['11']}</span>
                            <button type={'button'} tabIndex={4} role={'button'}>{locale.string['06']}</button>
                        </div>
                    </div>
                    {this.props.loading && <PinkSpinnerComponent/>}
                    <div className={styles['phone-text-field']}>
                        <label className={this.state.inputFocus ? styles['active'] : undefined} htmlFor={'code-component'}>{locale.string['07']}</label>
                        <input type={'number'}
                               name={'code'}
                               id={'code-component'}
                               autoCapitalize={'off'}
                               autoComplete={'off'}
                               ref={this.codeInput}
                               maxLength={4}
                               onFocus={this.inputFocus}
                               onBlur={this.inputBlur}
                               tabIndex={1}
                               onChange={this.onChangeCodeHandler} onKeyDown={this.onKeyDownHandler}/>
                    </div>
                    <div className={styles['phone-error-field']}>
                        <p>
                            {this.props.error.error && this.props.error.type === 'emptyPhone' ? locale.error['01'] : undefined}
                            {this.props.error.error && this.props.error.type === 'emptyRequestId' ? locale.error['02'] : undefined}
                            {this.props.error.error && this.props.error.type === 'emptyCode' ? locale.error['03'] : undefined}
                            {this.props.error.error && this.props.error.type === 'emptyCountry' ? locale.error['04'] : undefined}
                            {this.props.error.error && this.props.error.type === 'wrongCode' ? locale.error['05'] : undefined}
                            {this.props.error.error && this.props.error.type === 'manyRequest' ? locale.error['06'] : undefined}
                            {this.props.error.error && this.props.error.type === 'requestExpired' ? locale.error['07'] : undefined}
                            {this.props.error.error && this.props.error.type === 'server' ? locale.error['08'] : undefined}
                        </p>
                    </div>
                    <div className={styles['phone-auth-modal--container--button-box']}>
                        <button type={'reset'} tabIndex={3} className={cx(styles['__request-verify-btn'], styles['cancel-btn'])} onClick={this.backToRequestStep}>{locale.string['08']}</button>
                        <button type={'submit'} tabIndex={2} onClick={this.checkDigitCode} className={styles['__request-verify-btn']}>{locale.string['09']}</button>
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default NexmoVerifyStep