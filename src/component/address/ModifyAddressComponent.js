import React, {Fragment} from 'react';
import styles from './AddressComponent.scss';
import classnames from 'classnames';
import Proptypes from 'prop-types';
import {innerCenter} from "../../lib/script";
import ScreenBlockComponent from "../screenblock/ScreenBlockComponent";
import {connect} from "react-redux";
import AddressInputComponent from "./input/AddressInputComponent";
import AddressDeliveryInputComponent from "./input/AddressDeliveryInputComponent";
import axios from 'axios'

const cx = classnames.bind(styles);

class ModifyAddressComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            addressName: null,
            recipient: null,
            phone: null,
            otherPhone: null,
            zipCode: null,
            address1: null,
            address2: null,
            default: null
        };

        this.modalRepositioning = this.modalRepositioning.bind(this);
        this.modal = React.createRef();
        this.form = React.createRef();

    }

    componentDidMount() {

        this.modalRepositioning();
        window.addEventListener('resize', this.modalRepositioning);
    }

    componentWillMount() {
        //통신을 시작할 배송지 도큐먼트의 id
        console.log(this.props.docsIdx);
        console.log(this.props.idx);
        try {
            let result = axios({
                url: '/address/fetchingdata',
                method: 'POST',
                data: {
                    docsIdx: this.props.docsIdx,
                    writerIdx: this.props.idx
                }
            }).then((res) => {
                console.log(res);
                this.setState({
                    addressName: res.data.address.name,
                    recipient: res.data.address.recipient,
                    phone: res.data.address.phone[0],
                    otherPhone: res.data.address.phone[1],
                    zipCode: res.data.address.zipCode,
                    address1: res.data.address.address1,
                    address2: res.data.address.address2,
                    default: res.data.address.default
                })
            });


        } catch (err) {
            //modal리듀서에 에러 보내기

        }

    }

    modalRepositioning() {
        innerCenter(this.modal.current);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.modalRepositioning)
    }

    render() {
        const {modifyAddress, addressList} = this.props;

        if (!this.props.isLogin) {
            return false;
        }
        return (
            <Fragment>
                <ScreenBlockComponent action={this.props.onClick}/>
                <div className={styles['delivery-add-modal']} ref={this.modal}>
                    <div className={styles['delivery-add-modal--logo']}>리틀원의 배송지 수정 로고입니다.</div>
                    <div className={styles['delivery-add-modal--bar']}></div>
                    <div className={styles['delivery-add-modal--desc']}>
                        <h1>배송지 수정</h1>
                        <p>필수 정보(<em>*</em>)는 빠짐없이 기입해주세요.</p>
                    </div>
                    <form id="delivery-add-form"
                          className={styles['delivery-add-modal--form']}
                          ref={this.form}>
                        <fieldset form="delivery-add-form">
                            <legend>배송지를 수정할 수 있는 모달폼 입니다.</legend>
                            <AddressInputComponent id={'address-name'}
                                                   type={'text'}
                                                   placeholder={'배송지 이름을 입력하세요.'}
                                                   title={'배송지 이름'}
                                                   name={'addressName'}
                                                   maxLength={30}
                                                   long={false}
                                                   addressList={addressList.length}
                                                   update={true}
                                                   originValue={this.state.addressName}/>
                            <AddressInputComponent id={'recipient-name'}
                                                   type={'text'}
                                                   placeholder={'받으시는 분의 전체 성함을 입력하세요.'}
                                                   title={'이름'}
                                                   name={'recipientName'}
                                                   maxLength={30}
                                                   long={true}
                                                   update={true}
                                                   originValue={this.state.recipient}/>
                            <AddressInputComponent id={'recipient-phone'}
                                                   type={'tel'}
                                                   placeholder={' - 없이 연락처를 입력하세요.'}
                                                   title={'휴대전화'}
                                                   name={'recipientPhone'}
                                                   maxLength={20}
                                                   long={true}
                                                   update={true}
                                                   originValue={this.state.phone}/>
                            <AddressInputComponent id={'other-recipient-phone'}
                                                   type={'tel'}
                                                   placeholder={' - 없이 연락처를 입력하세요.'}
                                                   title={'기타 연락처'}
                                                   name={'otherPhone'}
                                                   maxLength={20}
                                                   long={true}
                                                   update={true}
                                                   originValue={this.state.otherPhone}/>
                            <AddressDeliveryInputComponent language={this.props.language}
                                                           zipCode={this.state.zipCode}
                                                           address1={this.state.address1}
                                                           address2={this.state.address2}/>
                        </fieldset>
                        <div className={styles['delivery-add-modal--form--submit']}>
                            <button type="reset" className={styles['__cancel-delivery-button']} onClick={this.props.onClick}>취소</button>
                            <button type="submit" className={styles['__add-delivery-button']} onClick={(e) => {
                                e.preventDefault();
                                let formData = new FormData(this.form.current);
                                formData.set('writerIdx', this.props.idx);
                                formData.set('docsIdx', this.props.docsIdx);
                                modifyAddress(formData);
                                this.props.onClick();
                            }}>수정
                            </button>
                        </div>
                    </form>
                    <button type="button" className={styles['__close-modal-form']} onClick={this.props.onClick}>닫기</button>
                </div>
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        addressList: state.addressReducer.data//배송지 목록
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAddressList: () => dispatch({
            type: 'GET_ADDRESS_LIST_REQUEST',
        }),
        modifyAddress: (formData) => dispatch({
            type: 'UPDATE_ADDRESS_REQUEST',
            formData
        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ModifyAddressComponent);