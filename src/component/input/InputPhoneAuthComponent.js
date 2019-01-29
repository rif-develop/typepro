import React from 'react';
import styles from "../../pages/signup/SignupLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class InputPhoneAuthComponent extends React.Component {


    constructor(props) {
        super(props);

        this.onNexmoRequest = this.onNexmoRequest.bind(this);
    }

    onNexmoRequest() {

    }



    render() {
        return (
            <div className={styles['client-join-section--form--authorization-box']}>
                <a href="javascript:void(0)" className={styles['__auth-client-phone-button']} role="button" onClick={this.props.toggle}>
                    <span className={styles['--mobile-icon']}>휴대폰 인증</span>
                    <span className={styles['__authorization']}></span>
                </a>
            </div>
        )
    }
}

export default InputPhoneAuthComponent;

