import React from 'react';
import * as styles from './Index.scss';
import '../../library/_reset.scss';
import fullpage from 'fullpage.js';
import Section01 from "./section01/Section01";
import Section02 from "./section02/Section02";
import Section03 from "./section03/Section03";
import Head from "../../promotion/head/Head";
import Section04 from "./section04/Section04";
import Section05 from "./section05/Section05";
import Section06 from "./section06/Section06";
import Section07 from "./section07/Section07";
import Section08 from "./section08/Section08";
import Section09 from "./section09/Section09";
import {getCookie, setCookie} from "../../library/_LittleoneScript";
import anime from 'animejs';


class BottleLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: getCookie('lang') === 'ko' ? require('../../landing/language/korean/product/smartbottle') : null ||
            getCookie('lang') === 'en' ? require('../../landing/language/english/product/smartbottle') : null ||
            getCookie('lang') === 'cn' ? require('../../landing/language/chinese/product/smartbottle') : null ||
            getCookie('lang') === 'ja' ? require('../../landing/language/japanese/product/smartbottle') : null ||
            getCookie('lang') === undefined || null || false ? require('../../landing/language/english/product/smartbottle') : require('../../landing/language/english/product/smartbottle')
        };
        this.setLanguage = this.setLanguage.bind(this);

    }

    setLanguage(e) {
        const langBox = document.getElementById('react-header');
        const body = document.getElementsByTagName('body')[0];
        langBox.classList.toggle(styles['active']);
        let dataSet = e.currentTarget.dataset['lang'];
        let target = document.getElementsByClassName('current-language')[0];
        if (dataSet === 'ko') {
            setCookie('lang', 'ko', 14);
            this.setState(function () {
                return {
                    language: require('../../landing/language/korean/product/smartbottle')
                }
            });
            target.style.background = '#fff url(' + require('../../landing/head/web-footer-icn-ko.svg') + ') no-repeat center/contain';
            document.getElementsByTagName('html')[0].lang = 'ko';
            body.setAttribute('class', 'lang-korean');


        } else if (dataSet === 'en') {
            setCookie('lang', 'en', 14);
            this.setState(function () {
                return {
                    language: require('../../landing/language/english/product/smartbottle')
                }
            });
            target.style.background = '#fff url(' + require('../../landing/head/web-footer-icn-us.svg') + ') no-repeat center/contain';
            document.getElementsByTagName('html')[0].lang = 'en';
            body.setAttribute('class', 'lang-english');

        }
        else if (dataSet === 'cn') {
            setCookie('lang', 'cn', 14);
            this.setState(function () {
                return {
                    language: require('../../landing/language/chinese/product/smartbottle')
                }
            });
            target.style.background = '#fff url(' + require('../../landing/head/web-footer-icn-cn.svg') + ') no-repeat center/contain';
            document.getElementsByTagName('html')[0].lang = 'zh';
            body.setAttribute('class', 'lang-chinese');


        }
        else if (dataSet === 'ja') {
            setCookie('lang', 'ja', 14);
            this.setState(function () {
                return {
                    language: require('../../landing/language/japanese/product/smartbottle')
                }
            });
            target.style.background = '#fff url(' + require('../../landing/head/web-footer-icn-jp.svg') + ') no-repeat center/contain';
            document.getElementsByTagName('html')[0].lang = 'ja';
            body.setAttribute('class', 'lang-japanese');

        }
    }
    
    
    
    componentDidMount() {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const a1 = document.querySelector("[data-action='anime-01']");
        const a2 = document.querySelector("[data-action='anime-02']");
        const a3 = document.querySelectorAll('[data-action="anime-03"]');
        const a4 = document.querySelectorAll('[data-action="anime-04"]');
        const a5 = document.querySelectorAll('[data-action="anime-05"]');
        const a6 = document.querySelector("[data-action='anime-06']");
        const a7 = document.querySelector("[data-action='anime-07']");
        const a8 = document.querySelectorAll('[data-action="anime-08"]');
        const a9 = document.querySelector("[data-action='anime-09']");
        const a10 = document.querySelector("[data-action='anime-10']");
        const a11 = document.querySelector("[data-action='anime-11']");
        const a12 = document.querySelector("[data-action='anime-12']");
        const a13 = document.querySelectorAll('[data-action="anime-13"]');
        const a14 = document.querySelectorAll('[data-action="anime-14"]');
        const a15 = document.querySelectorAll('[data-action="anime-15"]');
        const a16 = document.querySelector("[data-action='anime-16']");
        const a17 = document.querySelector("[data-action='anime-17']");
        const a18 = document.querySelector("[data-action='anime-18']");
        const a19 = document.querySelectorAll('[data-action="anime-19"]');
        const a20= document.querySelector("[data-action='anime-20']");





        const body = document.getElementsByTagName('body')[0];
        if (getCookie('lang') === 'en') {
            document.getElementsByTagName('html')[0].lang = 'en';
            body.setAttribute('class', 'lang-english');

        } else if (getCookie('lang') === 'ja') {
            document.getElementsByTagName('html')[0].lang = 'ja';
            body.setAttribute('class', 'lang-japanese');

        } else if (getCookie('lang') === 'cn') {
            document.getElementsByTagName('html')[0].lang = 'zh';
            body.setAttribute('class', 'lang-chinese');

        } else if (getCookie('lang') === 'ko') {
            document.getElementsByTagName('html')[0].lang = 'ko';
            body.setAttribute('class', 'lang-korean');

        } else {
            document.getElementsByTagName('html')[0].lang = 'en';
            body.setAttribute('class', 'lang-english');
        }

        new fullpage('#product-section', {
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
            afterLoad: function (anchorLink, component) {
                const index = component.index;
                console.log(index);
                if (index === 0) {

                }
                if (index === 1) {
                    const anime01 = anime({
                        targets: a1,
                        translateY: 0,
                        opacity: 1,
                        easing: 'easeOutQuint',
                        duration: 1000
                    });

                    const anime02 = anime({
                        targets: a2,
                        translateY: 0,
                        opacity: 1,
                        easing: 'easeOutQuint',
                        duration: 1000,
                        delay: 240
                    });
                    if (windowWidth > 640) {
                        a3.forEach(function (ele, idx) {
                            setTimeout(function () {
                                const anime03 = anime({
                                    targets: ele,
                                    opacity: 1,
                                    scale: 1,
                                    delay: 140,
                                })
                            }, 190 * idx);

                        });
                    } else {
                        a3.forEach(function (ele, idx) {
                            setTimeout(function () {
                                const anime03 = anime({
                                    targets: ele,
                                    opacity: 1,
                                    scale: 1,
                                })
                            }, 300 * idx);

                        });
                    }


                    a4.forEach(function (ele, idx) {
                        setTimeout(function () {
                            const anime04 = anime({
                                targets: ele,
                                translateY: 0,
                                opacity: 1,
                                easing: 'easeOutQuint',
                                duration: 1000,
                                delay: 240
                            });
                        });
                    });

                    a5.forEach(function (ele, idx) {
                        setTimeout(function () {
                            const anime05 = anime({
                                targets: ele,
                                translateY: 0,
                                opacity: 1,
                                easing: 'easeOutQuint',
                                duration: 1300,
                                delay: 500
                            });
                        });
                    })


                }
                if (index !== 1) {
                    const actions01 = anime({
                        targets: a1,
                        translateY: 100,
                        opacity: 0,
                        duration: 0
                    });
                    const anime02 = anime({
                        targets: a2,
                        translateY: 100,
                        opacity: 0,
                        duration: 0
                    });
                    if (windowWidth > 640) {
                        const actions03 = anime({
                            targets: a3,
                            opacity: 0,
                            delay: 50,
                            scale: 0
                        });
                    } else {
                        const actions03 = anime({
                            targets: a3,
                            opacity: 0,
                            delay: 0,
                            scale: 0,
                        });
                    }

                    const anime04 = anime({
                        targets: a4,
                        translateY: 100,
                        opacity: 0,
                        duration: 0
                    });
                    const anime05 = anime({
                        targets: a5,
                        translateY: 100,
                        opacity: 0,
                        duration: 0
                    });
                    const anime06 = anime({
                        targets: a6,
                        translateY: 100,
                        opacity: 0,
                        duration: 0
                    });

                }
                if (index === 2) {
                    const anime01 = anime({
                        targets: a6,
                        translateY: 0,
                        opacity: 1,
                        easing: 'easeOutQuint',
                        duration: 1000
                    });

                    const anime02 = anime({
                        targets: a7,
                        translateY: 0,
                        opacity: 1,
                        easing: 'easeOutQuint',
                        duration: 1000,
                        delay: 240
                    });

                    a8.forEach(function (ele, idx) {
                        setTimeout(function () {
                            const anime03 = anime({
                                targets: ele,
                                opacity: 1,
                                scale: 1,
                                delay: 140,
                            })
                        }, 190 * idx);
                    });

                    const anime09 = anime({
                        targets: a9,
                        width: "85%",
                        easing: 'easeOutBack',
                        duration: 1200,
                        delay: 850
                    });

                    const anime10 = anime({
                        targets: a10,
                        translateX: '0',
                        duration: 600,
                    });

                    const anime11 = anime({
                        targets: a11,
                        translateX: '0',
                        duration: 600,
                    });

                }
                if (index !== 2) {
                    const anime05 = anime({
                        targets: a6,
                        translateY: 100,
                        opacity: 0,
                        duration: 0
                    });
                    const anime06 = anime({
                        targets: a7,
                        translateY: 100,
                        opacity: 0,
                        duration: 0
                    });
                    const anime08 = anime({
                        targets: a8,
                        opacity: 0,
                        scale: 0,
                        duration: 0
                    });
                    const anime09 = anime({
                        targets: a9,
                        width: 0,
                        duration: 1
                    });
                    const anime10 = anime({
                        targets: a10,
                        translateX: '100',
                        duration: 0,
                    });

                    const anime11 = anime({
                        targets: a11,
                        translateX: '-100',
                        duration: 0,
                    });
                }
                if (index === 3) {
                    const anime12 = anime({
                        targets: a12,
                        translateY: '0',
                        opacity: 1,
                        easing: 'easeOutQuint',
                        duration: 1000
                    });

                    a13.forEach(function (ele, idx) {
                        setTimeout(function () {
                            const anime03 = anime({
                                targets: ele,
                                opacity: 1,
                                scale: 1,
                                delay: 140,
                            })
                        }, 190 * idx);
                    });
                    const anime14 = anime({
                        targets: a14,
                        translateY: '0',
                        opacity: 1,
                        easing: 'easeOutQuint',
                        duration: 800,
                        delay: 500
                    });

                    const anime15 = anime({
                        targets: a15,
                        translateY: '0',
                        opacity: 1,
                        easing: 'easeOutQuint',
                        duration: 900,
                        delay: 750
                    });

                    const anime16 = anime({
                        targets: a16,
                        rotate: 0,
                        translateY:0,
                        opacity: 1,
                        duration: 1200,
                    });
                }
                if (index !== 3) {
                    const anime12 = anime({
                        targets: a12,
                        translateY: '100',
                        opacity: 0,
                        duration: 0,
                    });

                    const anime13 = anime({
                        targets: a13,
                        scale: 0,
                        opacity: 0,
                        duration: 0,
                    });
                    const anime14 = anime({
                        targets: a14,
                        translateY: '100',
                        opacity: 0,
                        duration: 0,
                    });
                    const anime15 = anime({
                        targets: a15,
                        translateY: '100',
                        opacity: 0,
                        duration: 0,
                    });

                    const anime16 = anime({
                        targets: a16,
                        rotate: -45,
                        translateY:200,
                        opacity: 0,
                        duration: 0,
                    });
                }
                if (index === 4) {
                    const anime17 = anime({
                        targets: a17,
                        translateY: '0',
                        opacity: 1,
                        duration: 1000,
                        easing: 'easeOutQuint',
                    });
                    const anime18 = anime({
                        targets: a18,
                        translateY: '0',
                        opacity: 1,
                        duration: 1000,
                        delay:240,
                        easing: 'easeOutQuint',

                    });
                }
                if (index !== 4) {
                    const anime17 = anime({
                        targets: a17,
                        translateY: '100',
                        opacity: 0,
                        duration: 0,
                    });
                    const anime18 = anime({
                        targets: a18,
                        translateY: '100',
                        opacity: 0,
                        duration: 0,
                    });
                }
                if(index === 5){
                    const anime20 = anime({
                        targets: a20,
                        translateY: '0',
                        opacity: 1,
                        duration: 1000,
                        easing: 'easeOutQuint',
                    });
                    a19.forEach(function(ele,idx){
                       setTimeout(function(){
                           let actions = anime({
                               targets: ele,
                               easing: 'easeInSine',
                               color: 'rgba(0,0,0,1)',
                               paddingLeft: '20',
                               paddingRight: '20',
                               textIndent: '0',
                               duration: '200',
                           });
                       },100*idx);
                    });

                } else if(index!==5){
                    let actions = anime({
                        targets: a19,
                        easing: 'easeInSine',
                        color: 'rgba(0,0,0,0)',
                        paddingLeft: '0',
                        paddingRight: '0',
                        duration: '0',
                    });
                    const anime20 = anime({
                        targets: a20,
                        translateY: '100',
                        opacity: 0,
                        duration: 0,
                    });
                }
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


    shouldComponentUpdate(nextState) {
        return nextState;
    }

    componentWillUnmount() {
        fullpage_api.destroy();
    }

    render() {
        return (
            <div className={styles['smart-bottle-article']} id={'product-section'}>
                <Head title={"LITTLEONE, SMART BOTTLE"}/>
                <Section01 language={this.state.language}/>
                <Section02 language={this.state.language}/>
                <Section03 language={this.state.language}/>
                <Section04 language={this.state.language}/>
                <Section05 language={this.state.language}/>
                <Section06 language={this.state.language}/>
                <Section07 language={this.state.language}/>
                <Section08 language={this.state.language}/>
                <Section09 language={this.state.language} position={'absolute'} action={this.setLanguage}/>
            </div>
        )

    }
}

export default BottleLayout;