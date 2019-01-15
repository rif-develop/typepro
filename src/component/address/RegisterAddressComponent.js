import React, {Fragment} from 'react';
import styles from './AddressComponent.scss';
import classnames from 'classnames';
import Proptypes from 'prop-types';
import {execDaumPostcode} from "../../api/daumPostCode";
import {innerCenter} from "../../lib/script";
import ScreenBlockComponent from "../screenblock/ScreenBlockComponent";
import {connect} from "react-redux";
import AddressInputComponent from "./input/AddressInputComponent";
import AddressDeliveryInputComponent from "./input/AddressDeliveryInputComponent";
import axios from 'axios';

global.$ = require('jquery-ajax');
const cx = classnames.bind(styles);

class RegisterAddressComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {};

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.modalRepositioning = this.modalRepositioning.bind(this);
        this.modal = React.createRef();
        this.form = React.createRef();

    }

    componentDidMount() {

        this.modalRepositioning();
        window.addEventListener('resize', this.modalRepositioning);
    }

    modalRepositioning() {
        innerCenter(this.modal.current);
    }

    onSubmitHandler(e) {

        e.preventDefault();
        const formData = new FormData(this.form.current);

        axios({
            url: '/address/register',
            method: 'POST',
            data: {
                idx:formData.get('idx'),
                addressName: formData.get('addressName'),
                recipientName: formData.get('recipientName'),
                recipientPhone: formData.get('recipientPhone'),
                otherPhone: formData.get('otherPhone'),
                zipcode: formData.get('zipcode'),
                address1: formData.get('address1'),
                address2: formData.get('address2'),
                default: formData.get('default') || false,
            },
            processData: false,
            contentType: false,
            cache: false
        }).then((res) => {
            console.log(res);
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.modalRepositioning)
    }

    render() {
        return (
            <Fragment>
                <ScreenBlockComponent action={() => {
                    this.props.action('add')
                }}/>
                <div className={styles['delivery-add-modal']} ref={this.modal}>
                    <div className={styles['delivery-add-modal--logo']}>리틀원의 배송지 추가 로고입니다.</div>
                    <div className={styles['delivery-add-modal--bar']}></div>
                    <div className={styles['delivery-add-modal--desc']}>
                        <h1>배송지 추가</h1>
                        <p>필수 정보(<em>*</em>)는 빠짐없이 기입해주세요.</p>
                    </div>
                    <form id="delivery-add-form"
                          className={styles['delivery-add-modal--form']}
                          ref={this.form}>
                        <fieldset form="delivery-add-form">
                            <legend>배송지를 추가할 수 있는 모달폼 입니다.(최대 3개까지 추가 가능합니다.)</legend>
                            <input type={'hidden'} name={'idx'} defaultValue={this.props.idx || '5c3c1f60a7c05b351efae09c'}/>
                            <AddressInputComponent id={'address-name'}
                                                   type={'text'}
                                                   placeholder={'배송지 이름을 입력하세요.'}
                                                   title={'배송지 이름'}
                                                   name={'addressName'}
                                                   maxLength={30}
                                                   long={false}/>
                            <AddressInputComponent id={'recipient-name'}
                                                   type={'text'}
                                                   placeholder={'받으시는 분의 전체 성함을 입력하세요.'}
                                                   title={'이름'}
                                                   name={'recipientName'}
                                                   maxLength={30}
                                                   long={true}/>
                            <AddressInputComponent id={'recipient-phone'}
                                                   type={'tel'}
                                                   placeholder={' - 없이 연락처를 입력하세요.'}
                                                   title={'휴대전화'}
                                                   name={'recipientPhone'}
                                                   maxLength={20}
                                                   long={true}/>
                            <AddressInputComponent id={'other-recipient-phone'}
                                                   type={'tel'}
                                                   placeholder={' - 없이 연락처를 입력하세요.'}
                                                   title={'기타 연락처'}
                                                   name={'otherPhone'}
                                                   maxLength={20}
                                                   long={true}/>
                            <AddressDeliveryInputComponent language={this.props.language}/>
                        </fieldset>
                        <div className={styles['delivery-add-modal--form--submit']}>
                            <button type="reset" className={styles['__cancel-delivery-button']} onClick={() => {
                                this.props.action('add');
                            }}>취소
                            </button>
                            <button type="submit" className={styles['__add-delivery-button']} onClick={this.onSubmitHandler}>확인</button>
                        </div>
                    </form>
                    <button type="button" className={styles['__close-modal-form']} onClick={() => {
                        this.props.action('add');
                    }}>close
                    </button>
                </div>
            </Fragment>
        )
    }
}


export default RegisterAddressComponent;