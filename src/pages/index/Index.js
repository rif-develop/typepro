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

class IndexLayout extends React.Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //세션을 받아와서 상태 갱신
        this.props.getSession();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        const evalValue = this.props.language !== nextProps.language;
        return evalValue
    }

    render() {
        const {language} = this.props;
        return (
            <Fragment>
                <Head title={'리틀원'} desc={'육아의 넘버원 리틀원'} language={language}/>
                <Header/>
                <main>
                    <Section01/>
                    <Section02/>
                    <Section03/>
                    <Section04/>
                    <div className={styles['index-background']}>
                        <Section05/>
                        <Section06/>
                        <Section07 language={language}/>
                        <Section08 language={language}/>
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
        getSession: () => dispatch({
            type: 'REFRESH_SESSION_REQUEST'
        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexLayout);