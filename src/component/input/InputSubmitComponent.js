import styles from "../../pages/signup/SignupLayout.scss";
import React from "react";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class InputSubmitComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.props.action();
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