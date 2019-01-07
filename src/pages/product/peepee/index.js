import React from 'react';
import styles from './Index.scss';
import Section01 from "./section01/Section01";
import Section02 from "./section02/Section02";
import Section03 from "./section03/Section03";
import Section07 from "./section07/Section07";
import Section08 from "./section08/Section08";
import Section04 from "./section04/Section04";
import Section05 from "./section05/Section05";
import fullpage from "fullpage.js";
import Section06 from "./section06/Section06";
import Section09 from "./section09/Section09";
import {getCookie, setCookie} from "../../../action/cookie/Cookie";
import Head from "../../../component/head/head";

class PeepeeLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: getCookie('lang') === 'ko' ? require('../../../language/korean/product/smartpeepee') : null ||
            getCookie('lang') === 'en' ? require('../../../language/english/product/smartpeepee') : null ||
            getCookie('lang') === 'zh' ? require('../../../language/chinese/product/smartpeepee') : null ||
            getCookie('lang') === 'ja' ? require('../../../language/japanese/product/smartpeepee') : null ||
            getCookie('lang') === undefined || getCookie('lang') === null || getCookie('lang') === false ? require('../../../language/korean/product/smartpeepee') : require('../../../language/korean/product/smartpeepee')
        };
    }

    componentDidMount() {
        document.body.scrollTo(0,0);

        new fullpage('#smart-peepee-section', {
            //options here
            licenseKey: 'C1CC5B53-80DD44AD-B875A4EB-2F0182E3',
            autoScrolling: true,
            keyboardScrolling: true,
            animateAnchor: true,
            recordHistory: false,
            lazyLoading: true,
            scrollingSpeed: 580,
            onLeave: function (origin, destination, direction) {
            },
            afterLoad: function (origin, destination, direction) {
            },
            afterRender: function () {
            },
            afterResize: function (width, height) {
            },
            afterResponsive: function (isResponsive) {
            },
            afterSlideLoad: function (section, origin, destination, direction) {
            },
            onSlideLeave: function (section, origin, destination, direction) {
            }
        });
    }

    componentWillUnmount() {
        fullpage_api.destroy();
        document.getElementsByTagName('html')[0].style.overflow = null;
        document.getElementsByTagName('html')[0].style.height = null;
        document.getElementsByTagName('html')[0].classList.remove('fp-enabled');
        document.getElementsByTagName('body')[0].style.overflow = null;
        document.getElementsByTagName('body')[0].style.height = null;
    }

    render() {
        return (
            <div className={styles['smart-peepee-article']} id={'smart-peepee-section'}>
                <Head title={"LITTLEONE, SMART PEEPEE"} description={'리틀원의 스마트피피 제품입니다.'}/>
                <Section01 language={this.state.language}/>
                <Section02 language={this.state.language}/>
                <Section03 language={this.state.language}/>
                <Section04 language={this.state.language}/>
                <Section05 language={this.state.language}/>
                <Section06 language={this.state.language}/>
                <Section07 language={this.state.language}/>
                <Section08 language={this.state.language}/>
                <Section09 language={this.state.language}/>
            </div>
        )
    }
}

export default PeepeeLayout;
