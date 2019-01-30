import React, {Fragment} from 'react';
import styles from './PhoneAuthModalComponent.scss';
import classnames from 'classnames';
import ScreenBlockComponent from "../screenblock/ScreenBlockComponent";
import {innerCenter} from "../../lib/script";
import axios from 'axios'
import {connect} from "react-redux";
import NexmoVerifyStep from "./NexmoVerifyStep";
import NexmoRequestStep from "./NexmoRequestStep";
import PinkSpinnerComponent from "../loading/PinkSpinnerComponent";

const cx = classnames.bind(styles);

class NexmoVerifyComponent extends React.Component {

    constructor(props) {
        super(props);
        //ref
        this.phoneModal = React.createRef();
    }

    componentDidMount() {
        innerCenter(this.phoneModal.current);
    }

    render() {
        const {
            countryList, openCountryList,
            country, phoneNumber, email,
            requestId, code, nextStep,
            clientIdx, loading, onClickCancelNextStep,
            digitCodeHandler, nexmoFindId, onChangePhone,
            nexmoVerifyCheck, nexmoFindPassword,nexmoVerifyRequest,countrySelector
        } = this.props;

        return (
            <Fragment>
                <ScreenBlockComponent action={this.props.toggle}/>

                <div className={styles['phone-auth-modal']} ref={this.phoneModal}>
                    {
                        loading && <PinkSpinnerComponent/>
                    }

                    {
                        countryList && <ScreenBlockComponent zIndex={{zIndex: 10}} action={openCountryList}/>
                    }

                    <div className={styles['phone-auth-modal--container']}>
                        {
                            nextStep ?
                                <NexmoVerifyStep digitCodeHandler={digitCodeHandler}
                                                 onClickCancelNextStep={onClickCancelNextStep}
                                                 nexmoVerifyCheck={nexmoVerifyCheck}
                                                 nexmoFindPassword={nexmoFindPassword}
                                                 nexmoFindId={nexmoFindId}
                                                 phoneNumber={phoneNumber}
                                                 loading={loading}
                                                 actionType={this.props.actionType}
                                                 code={code}
                                                 clientIdx={clientIdx}
                                                 email={email}
                                                 requestId={requestId}
                                                 country={country}/> :
                                <NexmoRequestStep country={country}
                                                  countryList={countryList}
                                                  openCountryList={openCountryList}
                                                  phoneNumber={phoneNumber}
                                                  onChangePhone={onChangePhone}
                                                  nexmoVerifyRequest={nexmoVerifyRequest} countrySelector={countrySelector}/>
                        }

                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.phoneAuthReducer.loading,
        countryList: state.phoneAuthReducer.auth.countryList,
        country: state.phoneAuthReducer.auth.country,
        phoneNumber: state.phoneAuthReducer.auth.phone,
        nextStep: state.phoneAuthReducer.auth.nextStep,
        requestId: state.phoneAuthReducer.auth.requestId,
        code: state.phoneAuthReducer.auth.code,
        clientIdx: state.clientStatusReducer.session._id,
        email: state.phoneAuthReducer.auth.email,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        openCountryList: () => dispatch({
            type: 'SET_COUNTRY_LIST_TOGGLE_REQUEST'
        }),
        countrySelector: (value) => dispatch({
            type: 'SET_COUNTRY_SELECTOR_REQUEST',
            country: value
        }),
        onChangePhone: (value) => dispatch({
            type: 'SET_PHONE_NUMBER_REQUEST',
            phone: value
        }),
        nexmoVerifyRequest: (country, phone) => dispatch({
            type: 'API_PHONE_AUTH_REQUEST',
            phone: phone,
            country: country
        }),
        digitCodeHandler: (digitCode) => dispatch({
            type: 'SET_PHONE_AUTH_DIGIT_CODE_REQUEST',
            code: digitCode
        }),
        nexmoVerifyCheck: (phone, code, requestId, country, clientIdx) => dispatch({
            type: 'API_PHONE_AUTH_VERIFY_CODE_REQUEST',
            phone: phone,
            code: code,
            requestId: requestId,
            country: country,
            clientIdx: clientIdx
        }),
        nexmoFindPassword: (object) => dispatch({
            type: 'API_FIND_BY_PHONE_REQUEST',
            object
        }),
        onClickCancelNextStep: () => dispatch({
            type: 'SET_PHONE_AUTH_CANCEL_NEXT_STEP_REQUEST'
        }),
        nexmoFindId: (object) => dispatch({
            type: 'API_FIND_ID_BY_PHONE_REQUEST',
            object

        })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(NexmoVerifyComponent);