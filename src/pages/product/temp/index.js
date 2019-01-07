import React from 'react';
import styles from './Index.scss';
import Section01 from "./section01/Section01";
import fullpage from "fullpage.js";
import Head from "../../../component/head/head";
import Section02 from "./section02/Section02";
import Section03 from "./section03/Section03";
import Section04 from "./section04/Section04";
import Section05 from "./section05/Section05";
import Section06 from "./section06/Section06";
import Section07 from "./section07/Section07";
import Section08 from "./section08/Section08";
import Section09 from "./section09/Section09";
import {getCookie, setCookie} from "../../../action/cookie/Cookie";

class TempLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: getCookie('lang') === 'ko' ? require('../../../language/korean/product/smarttemp') : null ||
            getCookie('lang') === 'en' ? require('../../../language/english/product/smarttemp') : null ||
            getCookie('lang') === 'zh' ? require('../../../language/chinese/product/smarttemp') : null ||
            getCookie('lang') === 'ja' ? require('../../../language/japanese/product/smarttemp') : null ||
            getCookie('lang') === undefined ||  getCookie('lang') ===false || getCookie('lang') === null || '' ? require('../../../language/korean/product/smarttemp') : require('../../../language/korean/product/smarttemp')
        }

    }

    componentDidMount() {
        document.body.scrollTo(0,0);

        new fullpage('#smart-temp-section', {
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
        })
    }

    componentWillUnmount() {
        fullpage_api.destroy();
        document.getElementsByTagName('html')[0].style.overflow = null;
        document.getElementsByTagName('html')[0].style.height = null;
        document.getElementsByTagName('html')[0].classList.remove('fp-enabled');
        document.getElementsByTagName('body')[0].style.overflow = null;
        document.getElementsByTagName('body')[0].style.height = null;
    }

    shouldComponentUpdate(nextProps) {
        return nextProps;
    }

    render() {
        return (
            <div className={styles['smart-temp-article']} id={'smart-temp-section'}>
                <Head title={'LITTLEONE, SMART TEMP'}/>
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

export default TempLayout;