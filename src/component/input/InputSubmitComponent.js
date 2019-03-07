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
        if (this.props.validatedEmail && this.props.validatedPassword && this.props.validatedTerms && !this.props.isEmailDuplicated) {
            const target = document.getElementById('client-join-section--form');
            const form = new FormData(target);
            this.props.action(form);
        } else if (!this.props.validatedEmail) {
            this.props.failAction({
                error: true,
                type: 'email'
            });
        } else if (!this.props.validatedPassword) {
            this.props.failAction({
                error: true,
                type: 'password'
            });
        } else if (!this.props.validatedTerms) {
            this.props.failAction({
                error: true,
                type: 'terms'
            });
        } else if (this.props.isEmailDuplicated) {
            this.props.failAction({
                error: true,
                type: 'duplicated'
            });
        } else {
            this.props.failAction({
                error: true,
                type: 'server'
            });
        }

    }

    render() {
        return (
            <div>
                <button type="submit" role="button" className={cx(styles['__join-member-button'], styles['__submit-default-button'])} onClick={this.onSubmitHandler} onKeyDown={(e)=>{
                    if(e.keyCode===13){
                        this.onSubmitHandler(e);
                    }
                }}>회원가입</button>
            </div>
        )
    }
}

export default InputSubmitComponent;