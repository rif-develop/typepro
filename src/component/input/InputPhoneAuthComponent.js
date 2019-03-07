import React from 'react';
import styles from "../../pages/signup/SignupLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class InputPhoneAuthComponent extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        const {clientPhone, phoneVerified} = this.props;
        return (
            <div className={cx(styles['client-join-section--form--authorization-box'], phoneVerified || clientPhone ? styles['active'] : undefined)}>
                <div className={styles['client-join-section--form--select-box']}>
                    <button type="button" role="button" className={cx(styles['__auth-client-phone-button'], styles['active'])} onClick={this.props.toggle}>
                        <span className={styles['--mobile-icon']}></span>
                        휴대폰 인증                        <span className={styles['__authorization']}></span>
                    </button>
                </div>
            </div>
        )
    }
}

export default InputPhoneAuthComponent;

