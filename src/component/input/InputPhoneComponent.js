import React from 'react';
import styles from "../../pages/signup/SignupLayout.scss";

class InputPhoneComponent extends React.PureComponent {
    render() {
        return (
            <div className={styles['client-join-section--form--box']}>
                <label htmlFor="phone-input-component" className="phone-icon" title="회원님이 인증하신 전화번호입니다."></label>
                <input type="tel" defaultValue={this.props.clientPhone} id="phone-input-component" className={styles['__default-input-component']} maxLength="24" readOnly="readonly" disabled="disabled"/>
            </div>
        )
    }
}

export default InputPhoneComponent