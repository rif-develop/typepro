import React from "react";
import Helmet from 'react-helmet-async';
import styles from '../../lib/_reset.scss';
class Head extends React.Component {

    static defaultState = {
        title: '리틀원',
        description: '육아의 넘버 원 리틀원',
        keyword: ['육아', '초보엄마', '스마트보틀', '스마트피피', '스마트템프', '정기배송', '기저귀', '분유', '커뮤니티', '아기', '아이', '엄마', '아빠', '가족', '육아일기', '다이어리'],
    };

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.language !== nextProps.language;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('ok')
    }


    render() {
        return (
            <Helmet key={window.location.href}>
                <html lang={this.props.language}/>
                <body className={styles[`lang-${this.props.language}`]}/>
                <meta charSet="UTF-8"/>
                <meta name="description" content={this.props.description || Head.defaultState.description}/>
                <meta name="keywords" content={Head.defaultState.keyword}/>
                <meta name="google" content="notranslate"/>
                <meta name="author" content="리틀원"/>
                <meta name="title" content={this.props.title || Head.defaultState.title}/>
                <title>{this.props.title}</title>
                <meta name="twitter:title" content={this.props.title || Head.defaultState.title}/>
                <meta name="twitter:description" content={this.props.description || Head.defaultState.description}/>
                <meta name="twitter:image" content="/favicon/icon-144.png"/>
                <meta name="twitter:card" content="summary"/>
                <meta name="theme-color" content="#2d3039"/>
                <meta name="twitter:site" content="http://www.littleone.kr"/>
                <meta name="twitter:title" content={this.props.title}/>
                <meta name="twitter:player" content="https://player.vimeo.com/video/292078292"/>
                <meta name="twitter:player:width" content="1280"/>
                <meta name="twitter:player:height" content="720"/>
                <meta property="og:description" content={this.props.description || Head.defaultState.description}/>
                <meta property="og:site_name" content="LITTLEONE"/>
                <meta property="og:url" content="http://littleone.kr"/>
                <meta property="og:title" content={this.props.title || Head.defaultState.title}/>
                <meta property="og:image" content="/favicon/icon-144.png"/>
                <meta property="og:image:secure_url" content="http://littleone.kr"/>
                <meta property="og:image:type" content="image/png"/>
                <meta property="og:image:width" content="1280"/>
                <meta property="og:image:height" content="720"/>
                <meta property="og:video:url" content="https://player.vimeo.com/video/292078292"/>
                <meta property="og:video:secure_url" content="https://player.vimeo.com/video/292078292"/>
                <meta property="og:video:type" content="application/x-shockwave-flash"/>
                <meta property="og:video:width" content="1280"/>
                <meta property="og:video:height" content="720"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
                <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
                <meta name="format-detection" content="telephone=no, address=no, email=no"/>
                <meta name="msapplication-TileColor" content="#da532c"/>
                <meta name="msapplication-TileImage" content="/favicon/icon-144.png"/>
                <link rel="apple-touch-icon" sizes="57x57" href="/favicon/icon-57.png"/>
                <link rel="apple-touch-icon" sizes="60x60" href="/favicon/icon-60.png"/>
                <link rel="apple-touch-icon" sizes="72x72" href="/favicon/icon-72.png"/>
                <link rel="apple-touch-icon" sizes="76x76" href="/favicon/icon-76.png"/>
                <link rel="apple-touch-icon" sizes="114x114" href="/favicon/icon-114.png"/>
                <link rel="apple-touch-icon" sizes="120x120" href="/favicon/icon-120.png"/>
                <link rel="apple-touch-icon" sizes="144x144" href="/favicon/icon-144.png"/>
                <link rel="apple-touch-icon" sizes="152x152" href="/favicon/icon-152.png"/>
                <link rel="apple-touch-icon" sizes="167x167" href="/favicon/icon-167.png"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/favicon/icon-180.png"/>
                <link rel="icon" type="image/png" href="/favicon/icon-16.png" sizes="16x16"/>
                <link rel="icon" type="image/png" href="/favicon/icon-32.png" sizes="32x32"/>
                <link rel="icon" type="image/png" href="/favicon/icon-96.png" sizes="96x96"/>
                <link rel="icon" type="image/png" href="/favicon/icon-144.png" sizes="144x144"/>
                <link rel="icon" type="image/png" href="/favicon/icon-192.png" sizes="192x192"/>
                <link rel="icon" type="image/png" href="/favicon/icon-196.png" sizes="196x196"/>
                <link rel="shortcut icon" href="/favicon/favicon.ico"/>
                <link rel="mask-icon" color="#fff" href="/favicon/safari-pinned-tag-icon.svg"/>
                <link rel="manifest" href="/manifest.json"/>
            </Helmet>
        );
    }
}

export default Head;
