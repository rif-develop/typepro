import styles from "../../pages/signup/SignupLayout.scss";
import React from "react";
import classnames from 'classnames';
import axios from 'axios';

const cx = classnames.bind(styles);

class InputUpdateSubmitComponent extends React.Component {

    constructor(props) {
        super(props);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler(e) {
        e.preventDefault();
        const target = document.getElementById(this.props.form);
        const formData = new FormData(target);
        formData.append('clientIdx', this.props.clientIdx);
        this.props.action(formData);
        //정보수정 요청

    }

    render() {
        return (
            <div>
                <button type="submit" role="button" className={cx(styles['__join-member-button'], styles['__submit-default-button'])} onClick={this.onSubmitHandler}>회원 정보 수정</button>
            </div>
        )
    }
}

export default InputUpdateSubmitComponent;