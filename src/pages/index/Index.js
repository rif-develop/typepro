import React, {Fragment} from 'react';
import Head from "../../component/head/head";
import Section01 from "./section01/Section01";
import Section02 from "./section02/Section02";
import Section03 from "./section03/Section03";
import Section04 from "./section04/Section04";
import Section05 from "./section05/Section05";
import Section06 from "./section06/Section06";
import styles from './Index.scss';
import Section07 from "./section07/Section07";
import Section08 from "./section08/Section08";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";
import {connect} from "react-redux";
import axios from 'axios';
import {getSessionAxios} from "../../action/session/sessionAxios";
import {store} from "../../store/StoreComponent";

class IndexLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentWillMount() {
        //세션을 받아와서 상태 갱신
        getSessionAxios().then((res) => {
            //isSession이 트루면 로그인 된 삳ㅇ태
            if (res.data.isSession) {
                store.dispatch({
                    type: 'WEB_LOGIN_REQUEST',
                    session: res.data.session
                });
            } else {
                console.log('세션 없음');
            }
        }).catch((err) => {
            console.log(err);
            store.dispatch({
                type: 'WEB_LOGOUT_REQUEST',
            });
        });//axios
    }

    componentWillReceiveProps(nextProps, nextContext) {
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const evalValue = this.props.language !== nextProps.language;
        return evalValue
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('업데이트 완료');
    }

    componentDidMount() {
        document.body.scrollTo(0, 0);

    }


    render() {
        const {language} = this.props;
        return (
            <Fragment>
                <main>
                    <Head title={'LITTLEONE'} language={language}/>
                    <Header/>
                    <Section01/>
                    {this.state.data}
                    <Section02/>
                    <Section03/>
                    <Section04/>
                    <div className={styles['index-background']}>
                        <Section05/>
                        <Section06/>
                        <Section07/>
                        <Section08/>
                    </div>
                </main>
                <Footer index={true}/>
            </Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.languageReducer.language
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onClickHandler: () => dispatch({})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexLayout);