import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import styles from '../signup/SignupLayout.scss';
import classnames from 'classnames';
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import InputPropsEmailComponent from "../../component/input/InputPropsEmailComponent";
import DefaultLoading from "../../component/loading/DefaultLoading";
import ModalComponent from "../../component/modal/ModalComponent";
import NexmoVerifyComponent from "../../component/modal/NexmoVerifyComponent";
import PasswordChangeLayout from "../password/PasswordChangeLayout";
import PasswordChangeByPhoneComponent from "../password/PasswordChangeByPhoneLayout";

const cx = classnames.bind(styles);

class FindClientPasswordLayout extends React.Component {

    constructor(props) {
        super(props);
        //binding
        this.state = {
            isValidEmail: false,
            error: {
                error: false,
                type: null
            },
        };

        this.findByEmail = this.findByEmail.bind(this);
        this.findByPhone = this.findByPhone.bind(this);
        this.onChangeEmailHandler = this.onChangeEmailHandler.bind(this);
        //ref
        this.form = React.createRef();
    }

    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    componentWillMount() {
        this.props.getSession();

    }

    onChangeEmailHandler(boolean) {
        this.setState({
            isValidEmail: boolean
        });
    }

    findByEmail() {
        const form = this.form.current;
        const formData = new FormData(form);
        if (this.props.findByEmail) {
            this.props.findByEmail(formData);
        }
    }

    findByPhone() {
        const form = this.form.current;
        const formData = new FormData(form);
        if (this.props.findByPhone) {
            this.props.findByPhone(formData);
        }

    }

    render() {
        const {language, error, loading, success, email, findInit, onChangeEmail, modalOpen, openModalRequest, phoneAuthSuccess, isLogin} = this.props;

        //로그인한 유저는 접근할 수 없는 페이지.
        if (isLogin) {
            window.location.replace('/');
            return false;
        }

        return (
            <Fragment>
                {/*핸듷폰 인증 성공시에 비밀번호 변경 페이지로 이동*/}
                {
                    phoneAuthSuccess ? <Redirect to={'/phone/passwordchange'}/> : null
                }
                {
                    loading ? <DefaultLoading/> : null
                }
                {
                    success && email ? <ModalComponent subject={'성공'} desc={'해당 이메일로 비밀번호 변경 링크를 전송했습니다.'} action={findInit}/> : null
                }
                {
                    error.error && error.type === 'noResult' ? <ModalComponent subject={'알림'} desc={'리틀원에 가입된 이메일이 아닙니다.'} action={findInit}/> : null
                }
                {
                    error.error && error.type === 'required' ? <ModalComponent subject={'알림'} desc={'이메일을 입력해주세요.'} action={findInit}/> : null
                }
                {
                    error.error && error.type === 'server' ? <ModalComponent subject={'서버'} desc={'서버 에러 입니다.'} action={findInit}/> : null
                }
                {/*핸드폰 인증 모달*/}
                {modalOpen ? <NexmoVerifyComponent actionType={'findPassword'} toggle={openModalRequest}/> : null}
                <Head title={'리틀원 - 비밀번호 찾기'} desc={'휴대폰 인증을 통하여 회원님의 아이디를 찾을 수 있는 페이지입니다.'} language={language}/>
                <Header/>
                <section className={styles['client-join-section']}>
                    <div className={styles['client-join-section--logo']}>
                        리틀원의 비밀번호 찾기 섹션의 로고입니다.
                    </div>
                    <div className={styles['client-join-section--bar']}></div>
                    <div className={styles['client-join-section--desc']}>
                        <h1>비밀번호 찾기</h1>
                        <p style={{
                            'lineHeight': 'normal'
                        }}>이메일 아이디를 입력하신 후, 이메일 혹은<br/> 휴대폰 인증으로 비밀번호를 찾으실 수 있습니다.</p>
                    </div>
                    <div>
                        <form className={styles['client-join-section--form']} id="client-join-section--form" role="form" ref={this.form}>
                            <fieldset form="client-join-section--form">
                                <legend>리틀원의 비밀번호 찾기 입력 폼입니다.</legend>
                                <InputPropsEmailComponent title={'찾으시려는 이메일을 입력해주세요.'} onChangeEmail={onChangeEmail} error={error} parentState={this.onChangeEmailHandler}/>
                                <div className={styles['client-join-section--form--select-box']}>
                                    <button type={'button'} role="button" onClick={this.state.isValidEmail ? this.findByEmail : null}>이메일로 찾기</button>
                                    <button type={'button'} role="button" onClick={this.state.isValidEmail ? openModalRequest : null}>휴대폰 인증으로 찾기</button>
                                </div>
                            </fieldset>
                        </form>
                        <div></div>
                    </div>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.languageReducer.language,
        error: state.findAccountReducer.error,
        loading: state.findAccountReducer.loading,
        success: state.findAccountReducer.success,
        email: state.findAccountReducer.eventType.email,
        modalOpen: state.phoneAuthReducer.open,
        phoneAuthSuccess: state.phoneAuthReducer.auth.success,
        isLogin: state.clientStatusReducer.login.isLogin

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        findByEmail: (formData) => dispatch({
            type: 'API_FIND_ACCOUNT_REQUEST',
            eventType: 'password',
            formData
        }),
        findByPhone: (formData) => dispatch({
            type: 'API_FIND_ACCOUNT_REQUEST',
            eventType: 'password',
            formData
        }),
        findInit: () => dispatch({
            type: 'API_FIND_ACCOUNT_INIT'
        }),
        onChangeEmail: (email) => dispatch({
            type: 'SET_PHONE_AUTH_EMAIL_REQUEST',
            email
        }),
        openModalRequest: () => dispatch({
            type: 'SET_PHONE_AUTH_MODAL_OPEN_TOGGLE'
        }),
        getSession: () => dispatch({
            type: 'REFRESH_SESSION_REQUEST'
        })


    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FindClientPasswordLayout);
