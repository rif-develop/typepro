import React from 'react';
import {Link} from "react-router-dom";
import styles from "../../pages/signup/SignupLayout.scss";
import classnames from 'classnames';
import {checkAnimation} from "../../lib/script";
import {connect} from "react-redux";

const cx = classnames.bind(styles);

class InputTermsagreeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.check = React.createRef();
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e){
        this.props.action()
        checkAnimation(this.check.current);
    }


    render() {
        return (
            <div>
                <div className={styles['client-join-section--form--terms-box']}>
                    <a href="javascript:void(0)" className={styles['__check-terms-agree-button']}
                       role="button"
                       aria-labelledby="term-check-input-component"
                       onClick={this.onChangeHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={cx(styles['__check-animation'], this.props.terms ? styles['active'] : null)} ref={this.check}>
                            <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit={"10"} d="M1.1,5.6"/>
                        </svg>
                    </a>
                    <label htmlFor="term-check-input-component" className={styles['__terms-and-agree']}>
                        리틀원의
                        <Link to="/privacypolicy" role="link" target="_blank"> 개인정보보호정책 </Link>
                        및
                        <Link to="/termsofuse" role="link" target="_blank"> 모든 약관</Link>
                        에 동의합니다.
                        <input type="checkbox" name="terms" id="term-check-input-component" role="checkbox" defaultChecked={this.props.terms} onChange={this.onChangeHandler}/>
                    </label>
                </div>
                <div className={styles['client-join-section--form--warning']}>
                    <em></em>
                </div>
            </div>
        )
    }
}

export default InputTermsagreeComponent;