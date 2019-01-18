import React, {Fragment} from 'react';
import styles from '../signup/SignupLayout.scss';
import classnames from 'classnames';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import InputEmailComponent from "../../component/input/InputEmailComponent";
import {getSessionAxios} from "../../action/session/sessionAxios";
import InputNicknameComponent from "../../component/input/InputNicknameComponent";
import InputNameComponent from "../../component/input/InputNameComponent";
import InputGenderComponent from "../../component/input/InputGenderComponent";
import InputBirthdateComponent from "../../component/input/InputBirthdateComponent";
import InputUpdateSubmitComponent from "../../component/input/InputUpdateSubmitComponent";
import ModalComponent from "../../component/modal/ModalComponent";

const cx = classnames.bind(styles);

class MypageUpdateLayout extends React.Component {


    constructor(props) {
        super(props);

        //ref
        this.form = React.createRef();
    }


    componentWillMount() {


        //세션이 있는 지 확인한다.
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

    componentDidMount() {
        //페이지에 접근할 수 있는 상태인지 확인한다.
        if (!this.props.isChecked) {
            console.log('접근 권한이 없습니다.');
            //돌려보낸다.
            this.props.history.push('/')
        }
    }

    componentWillUnmount() {
        this.props.pageInit()
    }


    render() {

        const {language, updateClientRequest, clientIdx, success, clientStatus} = this.props;
        return (
            <Fragment>
                <Head language={language} title={'리틀원 - 회원 정보 수정'} description={'리틀원 회원님의 개인 정보를 수정하실 수 있는 페이지입니다.'}/>
                <Header/>
                {success ? <ModalComponent action={(e) => {this.props.history.push('/')}}
                                           subject={'성공'}
                                           desc={'회원님의 정보가 수정되었습니다.'}/> : null}
                <section className={styles['client-join-section']}>
                    <div className={styles['client-join-section--logo']}>
                        리틀원의 회원 정보 수정 섹션의 로고입니다.
                    </div>
                    <div className={styles['client-join-section--bar']}></div>
                    <div className={styles['client-join-section--desc']}>
                        <h1>회원 정보 수정</h1>
                        <p>회원님의 개인정보를 수정하실 수 있습니다.</p>
                    </div>
                    <div>
                        <form className={styles['client-join-section--form']} id={'client-update-form'} role="form" ref={this.form}>
                            <fieldset form="client-update-form">
                                <legend>리틀원의 회원정보 수정 폼입니다.</legend>
                                <InputEmailComponent clientEmail={clientStatus.email}/>
                                <InputNicknameComponent clientNickName={clientStatus.nickname}/>
                                <InputNameComponent clientName={clientStatus.name.first}/>
                                <InputGenderComponent clientGender={clientStatus.gender}/>
                                <InputBirthdateComponent year={clientStatus.birth.year} month={clientStatus.birth.month} date={clientStatus.birth.date}/>
                                <InputUpdateSubmitComponent clientIdx={clientIdx} form={'client-update-form'} action={updateClientRequest}/>
                            </fieldset>
                        </form>
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
        clientIdx: state.clientStatusReducer.session._id,
        success: state.mypageReducer.success,
        isChecked: state.mypageReducer.isChecked,
        clientStatus:state.clientStatusReducer.session
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
        updateClientRequest: (formData) => dispatch({
            type: 'UPDATE_CLIENT_INFO_REQUEST',
            formData
        }),
        pageInit:()=>dispatch({
            type:'API_MYPAGE_UPDATE_INIT'
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MypageUpdateLayout);
