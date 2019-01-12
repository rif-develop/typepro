import styles from "../../pages/signup/SignupLayout.scss";
import React from "react";
import classnames from 'classnames';
import {store} from "../../store/StoreComponent";
import {Validations} from '../../lib/validation';

const cx = classnames.bind(styles);

class InputSubmitComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }


    onSubmitHandler(e) {
        e.preventDefault();
        if (this.props.emailCheck && this.props.passwordCheck && this.props.termsCheck && !this.props.duplicatedEmail) {
            this.props.action()
        } else if (!this.props.emailCheck) {
            store.dispatch({
                type: 'SET_MODAL_OPEN_REQUEST',
                desc: 'notEmail'
            });
        } else if (!this.props.passwordCheck) {
            store.dispatch({
                type: 'SET_MODAL_OPEN_REQUEST',
                desc: 'notPassword'
            });
        } else if (!this.props.termsCheck) {
            store.dispatch({
                type: 'SET_MODAL_OPEN_REQUEST',
                desc: 'notTerms'
            });
        } else if(this.props.duplicatedEmail){
            store.dispatch({
                type: 'SET_SIGN_UP_EMAIL_DUPLICATE_TRUE',
            });
        }
        else {
            store.dispatch({
                type: 'SET_MODAL_OPEN_REQUEST',
                desc: 'server'
            });
        }

    }

    render() {
        return (
            <div>
                <button type="submit" role="button" className={cx(styles['__join-member-button'], styles['__submit-default-button'])} onClick={this.onSubmitHandler}>회원가입</button>
            </div>
        )
    }
}

export default InputSubmitComponent;