import React from 'react';
import {Link} from "react-router-dom";
import styles from './Footer.scss';
import classnames from 'classnames';
import FlagComponent from "../flag/FlagComponent";
import Anime from 'react-anime';

const cx = classnames.bind(styles);
import {connect} from "react-redux";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maxlength: 42,
            removeBtn: false
        };

        //ref
        this.email = React.createRef();
        //binding
        this.sendSubscription = this.sendSubscription.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickRemoveBtn = this.onClickRemoveBtn.bind(this);
    }

    sendSubscription(email) {
        this.props.sendSubscribe(email);
    }

    onChangeHandler() {
        const email = this.email.current.value;
        if (email.length > 0) {
            this.setState({
                removeBtn: true
            })
        } else {
            this.setState({
                removeBtn: false
            });
            this.props.subscriptionReducerInit();
        }
    }

    onClickRemoveBtn() {
        this.setState({
            removeBtn: false
        });
        const email = this.email.current;
        this.props.subscriptionReducerInit();
        email.focus();

    }

    componentWillUnmount() {
        this.props.subscriptionReducerInit();
    }

    render() {

        //status-props;
        const {subscription} = this.props;
        const error = subscription.error;
        //state
        const {removeBtn} = this.state;

        return (
            <footer role="contentinfo" className={cx(styles['footer-section'], this.props.index ? null : styles['theme-02'])}>
                <div className={styles['footer-section--upper']}>
                    <div>
                        <div className={styles['footer-section--upper--email']}>
                            {
                                subscription.success ?
                                    <Anime opacity={[0, 1]} easing={'easeOutQuad'} duration={800} delay={100}>
                                        <label htmlFor="email-subscription-input" className={styles['footer-section--upper--email--desc']}>
                                            만나서 반가워요!
                                        </label>
                                    </Anime> :
                                    <label htmlFor="email-subscription-input" className={styles['footer-section--upper--email--desc']}>
                                        구독하고 생생한 육아정보를 얻어가세요!
                                    </label>
                            }

                            <div className={cx(styles['footer-section--upper--email--component'], subscription.success ? styles['active'] : null)}>
                                {
                                    subscription.success ?
                                        <Anime opacity={[0, 1]} translateY={['-1.5em', 0]} easing={'easeOutQuad'} duration={500} delay={300}>
                                            <div>
                                                <span className={styles['__success-subscription']}>구독해주셔서 감사합니다</span>
                                            </div>
                                        </Anime> :
                                        <form id="email-subscription-form">
                                            <fieldset form="email-subscription-form">
                                                <legend>리틀원을 구독하고 새로운 육아정보를 매일 얻어가세요.</legend>
                                                <input type="text" name="subscrbe_email" ref={this.email} id="email-subscription-input"
                                                       autoCapitalize="off"
                                                       maxLength={this.state.maxlength}
                                                       required={true}
                                                       placeholder="이메일을 입력하세요."
                                                       onChange={this.onChangeHandler}/>
                                                <button type="reset" className={cx(styles['__remove-input-button'], removeBtn ? styles['active'] : undefined)} onClick={this.onClickRemoveBtn}></button>
                                                <button type="submit" className={cx(styles['__subscribe-email-button'],subscription.loading ? styles['active']:undefined)}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            const email = this.email.current.value;
                                                            this.sendSubscription(email);
                                                        }}></button>
                                            </fieldset>
                                        </form>
                                }

                                {/*에러 메시지*/}
                                <div className={cx(styles['error-container'], error.error ? styles['active'] : undefined)}>
                                    {
                                        error.type === 'duplicated' ? '이미 구독하신 이메일입니다.' : null
                                    }
                                    {
                                        error.type === 'emptyEmail' ? '이메일을 입력해주세요.' : null
                                    }
                                    {
                                        error.type === 'notValidEmail' ? '올바른 이메일을 입력해주세요.' : null
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles['footer-section--upper--links']}>
                            <a href="https://www.facebook.com/littleonesns" className={styles['__link-facebook']} target="_blank"></a>
                            <a href="https://twitter.com/littleonesns" className={styles['__link-twitter']} target="_blank"></a>
                            <a href="https://www.instagram.com/littleonesns/" className={styles['__link-instagram']} target="_blank"></a>
                            <a href="https://www.youtube.com/channel/UC2viX5InWtasFUGrRRw3rwQ/" className={styles['__link-youtube']} target="_blank"></a>
                        </div>
                    </div>
                </div>
                <div className={styles['footer-section--lower']}>
                    <div>
                        <div className={styles['footer-section--lower--store']}>
                            <a href="https://play.google.com/store/apps/details?id=com.xrz.xxkko" role="button" className={styles['__link-apple-store']} target="_blank">App Store</a>
                            <a href="https://play.google.com/store/apps/details?id=com.xrz.xxkko" role="button" className={styles['__link-play-store']} target="_blank">Google Play</a>
                        </div>
                        <div className={styles['footer-section--lower--list']}>
                            <ul className={styles['footer-section--lower--list--about']}>
                                <li>
                                    <a href="#">회사소개</a> <span className={styles['vertical-bar']}>│</span>
                                </li>
                                <li>
                                    <a href="#">채용안내</a> <span className={styles['vertical-bar']}>│</span>
                                </li>
                                <li>
                                    <a href="">파트너</a> <span className={styles['vertical-bar']}>│</span>
                                </li>
                                <li>
                                    <a href="#">도움말</a> <span className={styles['vertical-bar']}>│</span>
                                </li>
                                <li>
                                    <a href="">고객센터</a>
                                </li>
                            </ul>
                            <em className={styles['littleone-inc']}>리틀원 주식회사</em>
                            <ul className={styles['footer-section--lower--list--info']}>
                                <li>대표이사 : 이병규 <span className={styles['vertical-bar']}>│</span></li>
                                <li>통신판매번호 : 2017-광주북구-485 <span className={styles['vertical-bar']}>│</span></li>
                                <li>
                                    <span className={styles['__crn-text']}>사업자등록번호 : 324-87-00848</span>
                                    <a href="http://ftc.go.kr/www/bizCommView.do?key=232&apv_perm_no=2017362014530200487&pageUnit=10&searchCnd=rkr_no&searchKrwd=3248700848&pageIndex=1" className={styles['__check-crn-info']}
                                       target="_blank" title="리틀원의 사업자등록번호를 확인하실 수 있습니다.">사업자정보확인</a>
                                </li>
                                <li>주소 : 광주광역시 북구 첨단벤처로 60번길 2, 305호 <span className={styles['vertical-bar']}>│</span></li>
                                <li className={styles['mobile-break']}>전화번호 : 1661-2503<span className={styles['vertical-bar']}>│</span></li>
                                <li>팩스번호 : 050-8090-2503</li>
                            </ul>
                            <div className={styles['footer-section--lower--list--terms']}>
                                <div className={styles['footer-section--lower--list--terms--desc']}>
                                    <em>ⓒ 2018 LITTLEONE All rights reserved.</em>
                                    <div>
                                        <Link to="/privacypolicy">개인정보보호정책</Link>
                                        <Link to="/termsofuse" className={styles['__link-service-terms']}>서비스 약관</Link>
                                    </div>
                                </div>
                                <FlagComponent index={this.props.index}/>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        subscription: state.subscriptionReducer
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        sendSubscribe: (email) => dispatch({
            type: 'API_EMAIL_SUBSCRIBE_REQUEST',
            email
        }),
        subscriptionReducerInit: () => dispatch({
            type: 'SET_EMAIL_SUBSCRIBE_INIT'
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);