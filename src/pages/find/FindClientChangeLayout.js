import React, {Fragment} from 'react';
import styles from "../password/PasswordChangeLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import {getParams} from "../../lib/script";
import axios from 'axios';
import InputPasswordComponent from "../../component/input/InputPasswordComponent";
import {connect} from "react-redux";
import ModalComponent from "../../component/modal/ModalComponent";

class FindClientChangeLayout extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            token: null,
            email: null,
            validPassword: false
        };
        //ref
        this.form = React.createRef();
        //binding
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.stateHandler = this.stateHandler.bind(this);
    }

    componentWillMount() {
        //url주소에서 이메일과 토큰 값을 가져와서 서버와 통신
        const param = getParams();
        console.log(param.email);
        console.log(param.token);

        //토큰 통신
        axios({
            method: 'post',
            url: '/find/tokencheck',
            data: {
                token: param.token,
                email: param.email
            }
        }).then((res) => {
            //토큰이 없으면 접근 에러페이지로
            if (!res.data.success) {
                this.props.history.push('/notvalid');
            } else {
                //성공하면
                this.setState({
                    token: res.data.token,
                    email: res.data.email
                })
            }
        }).catch((err) => {
            console.log(err)
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        //리덕스 스토어 초기화
        this.props.pageInit();
    }

    stateHandler(boolean) {
        this.setState({
            validPassword: boolean
        });
    }

    onClickSubmit(e) {
        e.preventDefault();
        const ref = this.form.current;
        let formData = new FormData(ref);
        formData.set('token', this.state.token);
        formData.set('email', this.state.email);

        this.props.changeRequest(formData);
    }

    render() {
        const {success, loading, error} = this.props;


        return (
            <Fragment>
                {/*변경 성공 후 모달*/}
                {
                    success ? <ModalComponent subject={'성공'} desc={'비밀번호가 변경 되었습니다.'} action={(e) => {
                        this.props.history.push('/');
                    }}/> : null

                }
                {/*에러*/}
                {
                    error.error && error.type === 'emptyEmail' ? <ModalComponent subject={'알림'} desc={'이메일이 없습니다.'} action={this.props.pageInit}/> : null
                }
                {
                    error.error && error.type === 'emptyPassword' ? <ModalComponent subject={'알림'} desc={'비밀번호를 입력해주세요.'} action={this.props.pageInit}/> : null
                }
                {
                    error.error && error.type === 'emptyToken' ? <ModalComponent subject={'알림'} desc={'유효하지 않은 토큰입니다.'} action={this.props.pageInit}/> : null
                }
                {
                    error.error && error.type === 'emailValidation' ? <ModalComponent subject={'알림'} desc={'사용할 수 없는 이메일 형식입니다.'} action={this.props.pageInit}/> : null
                }
                {
                    error.error && error.type === 'passwordValidation' ? <ModalComponent subject={'알림'} desc={'사용할 수 없는 비밀번호 형식입니다.'} action={this.props.pageInit}/> : null
                }

                <Head title={'리틀원 - 비밀번호 변경'} desc={'이메일을 인증을 통해 비밀번호를 변경하실 수 있습니다.'}/>
                <Header/>
                <section className={cx(styles['littleone-common-section'], styles['password-change-section'])}>
                    <div className={styles['littleone-common-section--logo']}>
                        리틀원의 비밀번호 변경 페이지의 로고입니다.
                    </div>
                    <div className={styles['littleone-common-section--bar']}></div>
                    <div className={styles['littleone-common-section--desc']}>
                        <h1>비밀번호 변경</h1>
                    </div>
                    <form className={styles['littleone-common-section--form']} id="password-change-form" role="form" ref={this.form}>
                        <fieldset form="password-change-form">
                            <legend>리틀원 비밀번호 변경 폼 입니다.</legend>
                            <InputPasswordComponent action={this.stateHandler}/>
                            <button type="submit" role="button" className={styles['__submit-btn']} onClick={this.state.validPassword ? this.onClickSubmit : null}>확인</button>
                        </fieldset>
                    </form>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.passwordChangeReducer.success,
        error: state.passwordChangeReducer.error,
        loading: state.passwordChangeReducer.loading,
        isLogin: state.clientStatusReducer.login.isLogin
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeRequest: (formData) => dispatch({
            type: 'API_LINK_PASSWORD_CHANGE_REQUEST',
            formData
        }),
        pageInit: () => dispatch({
            type: 'API_LINK_PASSWORD_CHANGE_INIT'
        })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FindClientChangeLayout);