import React, {Fragment} from 'react';
import {Redirect} from "react-router-dom";
import styles from './MypageLayout.scss';
import Header from "../../component/header/Header";
import Head from "../../component/head/head";
import {connect} from "react-redux";
import Footer from "../../component/footer/Footer";
import {getSessionAxios} from "../../action/session/sessionAxios";
import classnames from 'classnames';
import {Validations} from "../../lib/validation";


const cx = classnames.bind(styles);

class MypageLayout extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            removeBtn: false,
            error: null,
        };
        //binding
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickRemoveHandler = this.onClickRemoveHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        //ref
        this.input = React.createRef();
        this.removeBtn = React.createRef();
        this.form = React.createRef();
    }

    componentWillMount() {
        //세션 정보 불러들이기.
        getSessionAxios()
            .then((res) => {
                //isSession이 트루면 로그인 된 삳ㅇ태
                if (res.data.isSession) {

                    //로그인 되었으니 세션갱신
                    this.props.webLoginRequest(res.data.session);

                } else {
                    //세션이 없으면 issession이 false라면 에러 처리
                    throw "no session";
                }
            }).catch((err) => {
            console.log(err);
            //일단 로그아웃 처리;
            this.props.webLogoutRequest();
            //인덱스 페이지로 이동
            this.props.history.push('/');
        });//axios
    }


    onChangeHandler() {
        const ref = this.input.current.value;

        if (ref.length > 0) {
            this.setState({
                removeBtn: true
            });
        } else {
            this.setState({
                removeBtn: false
            });
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        //다음에 받는 isChecked가 트루가 되면 업데이트 한다.

    }

    onClickRemoveHandler() {
        this.input.current.value = '';
        this.input.current.focus();
        this.setState({
            removeBtn: false
        });
        this.props.passwordCheckInit();
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const password = this.input.current.value;

        //비밀번호 유효성 검사
        const validationResult = Validations.checkPassword(password);

        if (validationResult) {
            //유효성 통과시에 서버에 비밀번호 체크 값 확인 통신
            this.props.passwordCheckRequest(this.props.clientEmail, password);

        } else {
            //실패했으니 FAILURE ACTION 디스패치
            this.props.passwordCheckFail({
                error: true,
                type: 'validation'
            });
        }
    }

    componentWillUnmount() {
        this.props.passwordCheckInit();
    }

    render() {

        const {language, myPage, isLogin} = this.props;
        if (!isLogin) {
            return false;
        }

        return (
            <Fragment>
                <Head language={language} description={'회원정보를 수정하기 위하여 비밀번호를 확인 받습니다.'} title={'리틀원 - 비밀번호 확인'}/>
                <Header/>
                {/*조건 체크해서 페이지가 렌더링 하자마다 이동됨. componentwillupdate는 업데이트가 되는 순간에 이동됨 */}
                {
                    this.props.isChecked === true ? <Redirect to={'/mypage/auth/modify'}/> : null
                }
                <div className={styles['littleone-common-section']}>
                    <div className={styles['littleone-common-section--logo']}>
                        리틀원의 비밀번호 확인 페이지의 로고입니다.
                    </div>
                    <div className={styles['littleone-common-section--bar']}></div>
                    <div className={styles['littleone-common-section--desc']}>
                        <h1>비밀번호 확인</h1>
                        <p>회원정보 수정을 위해서는 비밀번호 확인이 필요합니다.</p>
                    </div>
                    <form className={styles['littleone-common-section--form']} id="password_check-form" role="form" ref={this.form}>
                        <fieldset form="password_check-form">
                            <legend>리틀원 비밀번호 확인 입력 폼 입니다.</legend>
                            <div className={styles['littleone-common-section--form--box']}>
                                <label htmlFor="__check-client-password" className={styles['__lock-icon']}></label>
                                <input type="password"
                                       ref={this.input}
                                       id="__check-client-password"
                                       maxLength="20"
                                       placeholder={'비밀번호를 입력해주세요.'}
                                       name="password"
                                       required={true}
                                       autoComplete="off"
                                       autoCapitalize="off"
                                       onChange={this.onChangeHandler}/>
                                <div className={cx(styles['__remove-input-value'], this.state.removeBtn ? styles['active'] : null)}
                                     ref={this.removeBtn}
                                     onClick={this.onClickRemoveHandler}>입력 값 삭제 버튼입니다.
                                </div>
                            </div>
                            <div className={styles['littleone-common-section--form--error']}>
                                <p className={myPage.error ? styles['active'] : null}>
                                    {
                                        myPage['error'] && myPage['type'] === 'validation' ? '알파벳,숫자,특수문자 조합의 8~20글자 사이로 입력해주세요.' : null
                                    }
                                    {
                                        myPage['error'] && myPage['type'] === 'server' ? '서버 통신 에러 입니다.' : null
                                    }
                                    {
                                        myPage['error'] && myPage['type'] === 'password' ? '비밀번호가 일치하지 않습니다.' : null
                                    }
                                </p>
                            </div>
                            <button type="submit" role="button" className={styles['__submit-btn']} onClick={this.onSubmitHandler}>확인</button>
                        </fieldset>
                    </form>
                </div>
                <Footer/>
            </Fragment>
        )
    }
}

const mapStateToProp = (state) => {
    return {
        language: state.languageReducer.language,
        isLogin: state.clientStatusReducer.login.isLogin,
        clientEmail: state.clientStatusReducer.session.email,
        myPage: state.mypageReducer.error,
        isChecked: state.mypageReducer.isChecked
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        webLoginRequest: (session) => dispatch({
            type: 'WEB_LOGIN_REQUEST',
            session: session
        }),
        webLogoutRequest: () => dispatch({
            type: 'WEB_LOGOUT_REQUEST'
        }),
        passwordCheckFail: (value) => dispatch({
            type: 'API_PASSWORD_CHECK_FAILURE',
            error: value
        }),
        passwordCheckInit: () => dispatch({
            type: 'API_PASSWORD_CHECK_INIT'
        }),
        passwordCheckRequest: (email, password) => dispatch({
            type: 'API_PASSWORD_CHECK_REQUEST',
            email: email,
            password: password
        }),
    }
};
export default connect(mapStateToProp, mapDispatchToProps)(MypageLayout);