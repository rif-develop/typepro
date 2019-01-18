import React, {Fragment} from 'react';
import styles from './SignupLayout.scss';
import classnames from 'classnames';
import {connect} from "react-redux";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import InputEmailComponent from "../../component/input/InputEmailComponent";
import InputPasswordComponent from "../../component/input/InputPasswordComponent";
import InputTermsagreeComponent from "../../component/input/InputTermsagreeComponent";
import InputSubmitComponent from "../../component/input/InputSubmitComponent";
import ModalComponent from "../../component/modal/ModalComponent";

const cx = classnames.bind(styles);

class SignupLayout extends React.Component {

    constructor(props) {


        super(props);
        this.state = {
            isEmailDuplicated: false,
            validatedEmail: false,
            validatedPassword: false,
            validatedTerms: false,
        };
        //ref

        //바인딩을 부모 요소에게 걸었기에, 부모요소의state가 바뀔 것임.
        this.emailDuplicatedCheck = this.emailDuplicatedCheck.bind(this);
        this.passwordValidationHandler = this.passwordValidationHandler.bind(this);
        this.termsStateHandler = this.termsStateHandler.bind(this);
    }


    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    //이메일 중복 여부 및 유효성 검사 핸들러
    emailDuplicatedCheck(boolean) {
        //중복되었니 ? //유효성 실패
        if (boolean === true) {
            //응
            this.setState({
                isEmailDuplicated: true,
                validatedEmail: false,
            });
        } else {
            //아니 사용가능한 이메일이야 ^^;
            this.setState({
                isEmailDuplicated: false,
                validatedEmail: true
            });
        }
    }

    //비밀번호 유효성 테스트 핸들러
    passwordValidationHandler(boolean) {
        //유효성 통과시
        if (boolean === true) {
            this.setState({
                validatedPassword: true
            })
        } else {
            //통과하지 못했을 경우
            this.setState({
                validatedPassword: false
            })
        }
    }

    //약관 동의 상태 변경 핸들러
    termsStateHandler() {
        this.setState({
            validatedTerms: !this.state.validatedTerms
        })
    }

    componentWillUnmount() {
        this.props.storeInit();
    }

    render() {
        const {language, requestSignUp, requestFailure, error, success, storeInit} = this.props;
        return (
            <Fragment>
                <Head title={'리틀원 - 회원가입'} description={'리틀원에 회원가입하고 다양한 육아정보를 얻어보세요.'} language={language}/>
                <Header/>
                {error.error && error.type === 'email' ? <ModalComponent subject={'알림'} desc={'이메일을 입력해 주세요.'} action={storeInit}/> : null}
                {error.error && error.type === 'password' ? <ModalComponent subject={'알림'} desc={'비밀번호를 입력해 주세요.'} action={storeInit}/> : null}
                {error.error && error.type === 'terms' ? <ModalComponent subject={'알림'} desc={'약관에 동의해 주세요.'} action={storeInit}/> : null}
                {error.error && error.type === 'server' ? <ModalComponent subject={'알림'} desc={'서버 에러'} action={storeInit}/> : null}
                {error.error && error.type === 'duplicated' ? <ModalComponent subject={'알림'} desc={'중복된 이메일입니다.'} action={storeInit}/> : null}
                {error.error && error.type === 'required' ? <ModalComponent subject={'알림'} desc={'입력요소를 전부 입력해주세요.'} action={storeInit}/> : null}

                {success ? <ModalComponent subject={'성공'} desc={'회원가입이 완료되었습니다.'} action={() => {
                    this.props.history.push('/')
                }}/> : null}
                <section className={styles['client-join-section']}>
                    <div className={styles['client-join-section--logo']}>
                        리틀원의 회원가입 섹션의 로고입니다.
                    </div>
                    <div className={styles['client-join-section--bar']}></div>
                    <div className={styles['client-join-section--desc']}>
                        <h1>회원가입</h1>
                        <p>간단한 가입으로 리틀원의 서비스를 이용하실 수 있습니다.</p>
                    </div>
                    <div>
                        <form className={styles['client-join-section--form']} id="client-join-section--form" role="form">
                            <fieldset form="client-join-section--form">
                                <legend>리틀원의 회원가입 폼입니다.</legend>
                                <InputEmailComponent action={this.emailDuplicatedCheck}/>
                                <InputPasswordComponent action={this.passwordValidationHandler}/>
                                <InputTermsagreeComponent action={this.termsStateHandler} terms={this.state.validatedTerms}/>
                                <InputSubmitComponent action={requestSignUp}
                                                      validatedEmail={this.state.validatedEmail}
                                                      validatedPassword={this.state.validatedPassword}
                                                      validatedTerms={this.state.validatedTerms}
                                                      isEmailDuplicated={this.state.isEmailDuplicated}
                                                      failAction={requestFailure}/>
                            </fieldset>
                        </form>
                        {/*<div className={styles['client-join-section-horizontal-line']}>*/}
                        {/*<em>OR</em>*/}
                        {/*<span className={styles['client-join-section-horizontal-line--bar']}></span>*/}
                        {/*</div>*/}
                        {/*<SocialSignButton/>*/}
                    </div>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

//왠만하면 자식 컴포넌트들이 전달받아서 shouldcomponentupdate 할 수 있도록  밖에서 넘겨주자
const mapStateToProps = (state) => {
    return {
        language: state.languageReducer.language,
        error: state.clientSignUpReducer.error,
        success: state.clientSignUpReducer.success
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        requestSignUp: (formData) => dispatch({
            type: 'API_SIGN_UP_COMPLETE_REQUEST',
            formData
        }),
        storeInit: () => dispatch({
            type: 'API_SIGN_UP_INIT'
        }),
        requestFailure: (error) => dispatch({
            type: 'API_SIGN_UP_COMPLETE_FAILURE',
            error:error
        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SignupLayout);