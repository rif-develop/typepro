import React from 'react';
import styles from './WithdrawalComponent.scss';
import classnames from 'classnames';
import {Validations} from "../../../lib/validation";

const cx = classnames.bind(styles);
import {connect} from "react-redux";

class WithdrawalComponent extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            removeBtn: false,
            validPassword:false
        };

        //ref
        this.password = React.createRef();
        this.removeBtn = React.createRef();
        //binding
        this.withDrawalRequest = this.withDrawalRequest.bind(this);
        this.onClickRemoveValue = this.onClickRemoveValue.bind(this);
        this.onKeyHandler = this.onKeyHandler.bind(this);
        this.onBlurValidationHandler = this.onBlurValidationHandler.bind(this);
    }

    withDrawalRequest(e) {
        e.preventDefault();
        const email = this.props.clientEmail;
        const clientIdx = this.props.clientIdx;
        const password = this.password.current.value;

        const formData = new FormData();
        formData.set('email', email);
        formData.set('clientIdx', clientIdx);
        formData.set('password', password);

        this.props.withDrawalRequest(formData);
    }

    onBlurValidationHandler(){
        const isValid = Validations.checkPassword(this.password.current.value);
        if(isValid){
            this.setState({
                validPassword:true
            })
        } else{
            this.setState({
                validPassword:false
            })
        }
    }

    onKeyHandler() {
        const password = this.password.current.value;
        const isValid = Validations.checkPassword(password);

        if (password.length > 0) {
            this.setState({
                removeBtn: true,
            });
            this.props.withDrawalInit();
            if(isValid){
                this.setState({
                    validPassword:true
                })
            }

        } else {
            this.setState({
                removeBtn: false,
                validPassword:false
            });
        }
    }

    onClickRemoveValue() {
        this.password.current.value = null;
        this.setState({
            removeBtn: false,
            validPassword:false
        });
        this.password.current.focus();
    }

    componentWillUnmount() {
        this.props.withDrawalInit();
    }


    render() {
        //propsToState
        const {loading,error} = this.props;
        const {removeBtn,validPassword} = this.state;
        return (
            <li className={styles['option-leave-component']}>
                <div className={styles['option-leave-component--desc']}>
                    <h2>회원 탈퇴</h2>
                    <p>리틀원을 탈퇴하시려면 비밀번호를 입력해주세요.</p>
                    <div className={styles['client-leaving-component']}>
                        <form id="client-withdrawal-form" method="post">
                            <fieldset form="client-withdrawal-form">
                                <legend>리틀원 회원 탈퇴 이력 폼입니다.</legend>
                                <div className={cx(styles['client-leaving-component--container'], error.error ? styles['__warn'] : undefined)}>
                                    <input type="password" name="withdrawal-password" role="textbox" placeholder="비밀번호를 입력하세요." ref={this.password} disabled={loading} onKeyDown={this.onKeyHandler} onKeyUp={this.onKeyHandler} onBlur={this.onBlurValidationHandler}/>
                                    <div className={cx(styles['__remove-input-button'], removeBtn ? styles['active'] : undefined)} ref={this.removeBtn} onClick={removeBtn ? this.onClickRemoveValue : undefined}>엔터키를 입력시 비밀번호 입력을
                                        초기화합니다.
                                    </div>
                                </div>
                                {
                                    loading ?
                                        <button type={'button'} className={cx(styles['__leaving-submit-button'], loading ? styles['__removing'] : null)}>처리</button> :
                                        <button type={'button'} className={cx(styles['__leaving-submit-button'], validPassword ? styles['active'] : null)} onClick={validPassword ? this.withDrawalRequest:null }>탈퇴</button>
                                }
                            </fieldset>
                        </form>
                    </div>
                    <p className={styles['__warn-text']}>
                        {error.error && error.type === 'notValidPassword' && '유효한 비밀번호가 아닙니다.'}
                        {error.error && error.type === 'notValidEmail' && '이메일을 올바르게 입력해주세요.'}
                        {error.error && error.type === 'emptyEmail' && '이메일을 입력해주세요.'}
                        {error.error && error.type === 'emptyPassword' && '비밀번호를 입력해주세요.'}
                        {error.error && error.type === 'emptyClientIdx' && '유효한 세션이 아닙니다.다시 로그인해 주세요.'}
                        {error.error && error.type === 'wrongPassword' && '비밀번호가 틀렸습니다.'}
                        {error.error && error.type === 'server' && '서버에러, 잠시 후 다시 시도해 주세요.'}
                    </p>

                </div>
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.settingReducer.loading,
        clientEmail: state.clientStatusReducer.session.email,
        clientIdx: state.clientStatusReducer.session._id,
        error: state.settingReducer.error,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        withDrawalRequest: (formData) => dispatch({
            type: 'API_CLIENT_WITHDRAWAL_REQUEST',
            formData
        }),
        withDrawalInit:()=> dispatch({
            type:'API_CLIENT_WITHDRAWAL_INIT'
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawalComponent);