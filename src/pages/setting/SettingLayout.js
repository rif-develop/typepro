import React, {Fragment} from 'react';
import styles from './SettingLayout.scss';
import classnames from 'classnames';
import Footer from "../../component/footer/Footer";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import {connect} from "react-redux";
import AlarmMenu from "./menu/AlarmMenu";
import MeasureMenu from "./menu/MeasureMenu";
import SubscribeMenu from "./menu/SubscribeMenu";
import WithdrawalMenu from "./menu/WithdrawalMenu";

const cx = classnames.bind(styles);

class SettingLayout extends React.Component {
    render() {
        const {language, error, loading, menu,onClickHandler} = this.props;
        return (
            <Fragment>
                <Head title={'리틀원 - 환경설정'} language={language}/>
                <Header/>
                <section className={styles['web-setting-section']}>
                    <div className={styles['mobile-header']}>환경 설정</div>
                    <div className={cx(styles['web-setting-section--container'], styles['menu-=list'])}>
                        <ul className={styles['web-setting-section--container--menu']}>
                            <li className={cx(styles['default-list'], 'alarm' === menu ? styles['active'] : null)} onClick={()=>{
                                onClickHandler('alarm');
                            }}>
                                <a href="javascript:void(0)" className={styles['__alarm']} data-link="notification"><span></span>알람</a><span className={styles['vertical-bar']}>│</span>
                            </li>
                            <li className={cx(styles['default-list'], 'measure' === menu ? styles['active'] : null)} onClick={()=>{
                                onClickHandler('measure');
                            }}>
                                <a href="javascript:void(0)" className={styles['__measure']} data-link="measure"><span></span>단위</a><span className={styles['vertical-bar']}>│</span>
                            </li>
                            <li className={cx(styles['default-list'], 'subscription' === menu ? styles['active'] : null)} onClick={()=>{
                                onClickHandler('subscription');
                            }}>
                                <a href="javascript:void(0)" className={styles['__subscribe']} data-link="subscribe"><span></span>구독</a><span className={styles['vertical-bar']}>│</span>
                            </li>
                            <li className={cx(styles['default-list'], 'leave' === menu ? styles['active'] : null)} onClick={()=>{
                                onClickHandler('withdrawal');
                            }}>
                                <a href="javascript:void(0)" className={styles['__leave']} data-link="withdrawal"><span></span>회원 탈퇴</a><span className={styles['vertical-bar']}>│</span>
                            </li>
                        </ul>
                    </div>
                    <div className={styles['web-setting-section--container']}>
                        <div className={styles['web-setting-section--container--options']} id="option-container">
                            <h1 className={cx(styles['web-setting-section--container--options--head'], styles[`${menu}-icon`])}>{'alarm' === menu ? '알람':'measure' === menu ? '단위': 'subscription' === menu ? '구독':'withdrawal' === menu ? '회원 탈퇴':null}</h1>
                            {
                                menu ==='alarm' ? <AlarmMenu/>: menu === 'measure' ? <MeasureMenu/> : menu ==='subscription' ? <SubscribeMenu/> : menu === 'withdrawal' ? <WithdrawalMenu/>:null
                            }
                        </div>
                    </div>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.settingReducer.loading,
        error: state.settingReducer.error,
        menu: state.settingReducer.menu,
        language: state.languageReducer.language
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickHandler: (data) => dispatch({
            type: 'SET_MENU_REQUEST',
            data
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingLayout);