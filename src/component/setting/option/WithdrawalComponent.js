import React from 'react';
import styles from './WithdrawalComponent.scss';
import classnames from 'classnames';
const cx = classnames.bind(styles);

class WithdrawalComponent extends React.Component {
    render() {
        return (
            <li className={styles['option-leave-component']}>
                <div className={styles['option-leave-component--desc']}>
                    <h2>회원 탈퇴</h2>
                    <p>리틀원을 탈퇴하시려면 비밀번호를 입력해주세요.</p>
                    <div className={styles['client-leaving-component']}>
                        <form id="client-withdrawal-form" method="post">
                            <fieldset form="client-withdrawal-form">
                                <legend>리틀원 회원 탈퇴 이력 폼입니다.</legend>
                                <div className={styles['client-leaving-component--container']}>
                                    <input type="password" name="withdrawal-password" role="textbox" placeholder="비밀번호를 입력하세요."/>
                                    <div className={styles['__remove-input-button']}>엔터키를 입력시 비밀번호 입력을 초기화합니다.</div>
                                </div>
                                <button type="submit" className={styles['__leaving-submit-button']}>탈퇴</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </li>
        )
    }
}

export default WithdrawalComponent