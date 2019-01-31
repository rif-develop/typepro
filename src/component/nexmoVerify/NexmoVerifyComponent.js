import React, {Fragment} from 'react';
import styles from './PhoneAuthModalComponent.scss';
import classnames from 'classnames';
import ScreenBlockComponent from "../screenblock/ScreenBlockComponent";
import {innerCenter} from "../../lib/script";
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

    componentWillUnmount() {
        //리덕스 스토어 초기화
        this.props.componentInit();

    }

    render() {
        const {
            countryList, openCountryList,
            country, phoneNumber, email,
            requestId, code, nextStep, error,
            clientIdx, loading, onClickCancelNextStep,
            digitCodeHandler, nexmoFindId, onChangePhone, nexmoFindPassword, nexmoVerifyRequest, nexmoClientUpdateRequest,
            countrySelector, backPage
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
                                                 nexmoFindPassword={nexmoFindPassword}
                                                 nexmoClientUpdateRequest={nexmoClientUpdateRequest}
                                                 nexmoFindId={nexmoFindId}
                                                 phoneNumber={phoneNumber}
                                                 loading={loading}
                                                 actionType={this.props.actionType}
                                                 code={code}
                                                 clientIdx={clientIdx}
                                                 email={email}
                                                 requestId={requestId}
                                                 country={country}
                                                 error={error}
                                                 backPage={backPage}/> :
                                <NexmoRequestStep country={country}
                                                  countryList={countryList}
                                                  openCountryList={openCountryList}
                                                  phoneNumber={phoneNumber}
                                                  onChangePhone={onChangePhone}
                                                  nexmoVerifyRequest={nexmoVerifyRequest}
                                                  countrySelector={countrySelector}
                                                  error={error}/>
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
        error: state.phoneAuthReducer.error
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
        nexmoFindPassword: (object) => dispatch({
            type: 'API_FIND_BY_PHONE_REQUEST',
            object
        }),
        nexmoClientUpdateRequest: (phone, code, requestId, country, clientIdx) => dispatch({
            type: 'API_UPDATE_INFO_BY_PHONE_REQUEST',
            phone: phone,
            code: code,
            requestId: requestId,
            country: country,
            clientIdx: clientIdx
        }),
        onClickCancelNextStep: () => dispatch({
            type: 'SET_PHONE_AUTH_CANCEL_NEXT_STEP_REQUEST'
        }),
        nexmoFindId: (object) => dispatch({
            type: 'API_FIND_ID_BY_PHONE_REQUEST',
            object
        }),
        backPage: () => dispatch({
            type: 'API_PHONE_AUTH_FIRST_PHASE'
        }),
        componentInit: () => dispatch({
            type: 'API_PHONE_AUTH_INIT'
        })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(NexmoVerifyComponent);