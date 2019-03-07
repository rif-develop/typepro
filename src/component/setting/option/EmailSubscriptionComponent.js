import React from 'react';
import styles from './DefaultOptionComponent.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);
import {connect} from "react-redux";

/*
* @props switch : 스위치가 켜져있는지 꺼져 있는지 체크할 값
*
*
* */
class EmailSubscriptionComponent extends React.Component {

    static defaultProps = {
        name: 'no-option-name',
        desc: 'no-desc',
        optionName: 'input 옵션을 설정해주세요.'
    };

    constructor(props) {
        super(props);
        this.subscribeHandler = this.subscribeHandler.bind(this);
    }

    subscribeHandler() {
        const clientIdx = this.props.clientIdx;
        const clientEmail = this.props.clientEmail;

        let formData = new FormData();

        formData.set('clientIdx', clientIdx);
        formData.set('email',clientEmail);

        this.props.emailSubscribeRequest(formData);
    }

    render() {
        //propsToState
        const {emailOption} = this.props;
        return (
            <li className={styles['option-component']}>
                <h2>{'이메일 구독'}</h2>
                <p>{'리틀원의 이벤트 및 소식 등에 대한 메일링을 받습니다.'}</p>
                <a href="javascript:void(0)" className={cx(styles['__switch'], emailOption ? styles['active'] : undefined)} id="group-member-activity-option" onClick={this.subscribeHandler}>
                    <div className={emailOption ? styles['active'] : undefined}></div>
                    <input type="hidden" name={'email-subscription'} defaultValue={emailOption} readOnly="readonly"/>
                </a>
            </li>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        emailOption:state.clientStatusReducer.session.option.emailSubscription,
        clientEmail:state.clientStatusReducer.session.email
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        emailSubscribeRequest: (formData) => dispatch({
            type: 'API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_REQUEST',
            formData
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailSubscriptionComponent);