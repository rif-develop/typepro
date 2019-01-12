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

class IndexLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data:null
        }
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
        document.body.scrollTo(0,0);
        // this.callBackendAPI()
        //     .then(res => this.setState({ data: res.express }))
        //     .catch(err => console.log(err));
        //
        // axios.get('/user', {
        //     params: { id: 'velopert' }
        // })
        //     .then( response => { console.log(response) } )
        // .catch( response => { console.log(response) } );
    }

    // callBackendAPI = async () => {
    //     const response = await fetch('/express_backend');
    //     const body = await response.json();
    //
    //     if (response.status !== 200) {
    //         throw Error(body.message)
    //     }
    //     return body;
    // };

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
        onClickHandler: () => dispatch({

        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(IndexLayout);