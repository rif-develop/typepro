import React from 'react';
import styles from '../../pages/signup/SignupLayout.scss';
import './FirebaseAuth.scss';
import classnames from 'classnames';

const cx = classnames.bind(this);

import {innerCenter} from "../../lib/script";
import {FirebaseAuthComponent} from "./FirebaseAuthComponent";


class PhoneAuthComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: this.props.auth
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        this.setState({
            auth: !this.state.auth
        });
    }

    componentDidMount() {
        const target = document.getElementById('firebase-container')
        FirebaseAuthComponent(target);
        window.addEventListener('resize', () => {
            innerCenter(target);
        });
        innerCenter(target);

    }

    componentWillUnmount() {
        window.removeEventListener('resize', null);
    }

    render() {
        return (
            <div>
                {
                    this.state.auth ? '됐어!':'아노대..'
                }
                <div className={styles['client-join-section--form--authorization-box']}>
                    <a href="javascript:void(0)" className={styles['__auth-client-phone-button']} role="button" id="buttons" onClick={this.props.action || null}>
                        <span className={styles['--mobile-icon']}>휴대폰 인증</span>
                        <input type="hidden" name="phone" id={'auth-phone-component'} onChange={this.props.action || null}/>
                        <span className={styles['__authorization']}></span>
                    </a>
                </div>
                <div className={styles['client-join-section--form--warning']}>
                    <em></em>
                </div>
            </div>
        )
    }
}


export default PhoneAuthComponent;
