import React, {Fragment} from 'react';
import styles from './AddressComponent.scss';
import classnames from 'classnames';
import Proptypes from 'prop-types';
import {execDaumPostcode} from "../../api/daumPostCode";
import {innerCenter} from "../../lib/script";
import ScreenBlockComponent from "../screenblock/ScreenBlockComponent";
import {connect} from "react-redux";

const cx = classnames.bind(styles);

class RegisterAddressComponent extends React.Component {

    constructor(props) {
        super(props);
        this.findAddress = this.findAddress.bind(this);
        this.onScrollingHandler = this.onScrollingHandler.bind(this);
        this.modal = React.createRef();
    }

    findAddress() {
        execDaumPostcode('zipcode', 'address1', 'address2')
    }

    componentDidMount() {
        innerCenter(this.modal.current);
    }

    render() {
        return (
            <Fragment>
                <ScreenBlockComponent action={()=>{this.props.action('add')}}/>
                <div className={styles['delivery-add-modal']} data-modal-name="delivery-add" ref={this.modal}>
                    <div className={styles['delivery-add-modal--logo']}>리틀원의 배송지 추가 로고입니다.</div>
                    <div className={styles['delivery-add-modal--bar']}></div>
                    <div className={styles['delivery-add-modal--desc']}>
                        <h1>배송지 추가</h1>
                        <p>필수 정보(<em>*</em>)는 빠짐없이 기입해주세요.</p>
                    </div>
                    <form id="delivery-add-form" className={styles['delivery-add-modal--form']} role="form">
                        <fieldset form="delivery-add-form">
                            <legend>배송지를 추가할 수 있는 모달폼 입니다.(최대 3개까지 추가 가능합니다.)</legend>
                            <div className={styles['delivery-add-modal--form--container']} data-input-component="address_name">
                                <label htmlFor="address_name" className={styles['delivery-add-modal--form--container--info']}>배송지 이름<span>*</span></label>
                                <div className={cx(styles['delivery-add-modal--form--container--input-box'], styles['--default-input'])}>
                                    <input type="text" name="address-name" maxLength="30" id="address_name" autoComplete="none" placeholder="배송지 이름을 입력하세요."/>
                                    <div className={styles['__remove-txt-button']}>지우기</div>
                                </div>
                                <div className={styles['__set-default-delivery-address']}>
                                <span>
                                    <svg></svg>
                                </span>
                                    <label>기본배송지
                                        <input type="checkbox" name="default" value="false"/>
                                    </label>
                                </div>
                            </div>
                            <div className={styles['delivery-add-modal--form--container']} data-input-component="recipient_name">
                                <label htmlFor="recipient_name" className={styles['delivery-add-modal--form--container--info']}>이름<span>*</span></label>
                                <div className={cx(styles['delivery-add-modal--form--container--input-box'], styles['long'])}>
                                    <input type="text" name="recipient_name" id="recipient_name" maxLength="30" autoComplete="none" placeholder="받으시는 분의 전체 성함을 입력하세요."/>
                                    <button type="button" className="__remove-txt-button">지우기</button>
                                </div>
                            </div>
                            <div className={styles['delivery-add-modal--form--container']} data-input-component="recipient_phone">
                                <label htmlFor="recipient_phone"
                                       className={styles['delivery-add-modal--form--container--info']}>휴대전화<span>*</span></label>
                                <div className={cx(styles['delivery-add-modal--form--container--input-box'], styles['long'])}>
                                    <input type="text" name="recipient_phone" id="recipient_phone" maxLength="30" autoComplete="none" placeholder=" - 없이 연락처를 입력하세요."/>
                                    <button type="button" className={styles['__remove-txt-button']}>지우기</button>
                                </div>
                            </div>
                            <div className={styles['delivery-add-modal--form--container']}>
                                <label htmlFor="recipient_phone2" className={styles['delivery-add-modal--form--container--info']}>기타 연락처
                                    &nbsp;&nbsp;</label>
                                <div className={cx(styles['delivery-add-modal--form--container--input-box'], styles['long'])}>
                                    <input type="text" name="recipient_phone2" id="recipient_phone2" maxLength="30" autoComplete="none" placeholder=" - 없이 연락처를 입력하세요."/>
                                    <button type="button" className={styles['__remove-txt-button']}>지우기</button>
                                </div>
                            </div>
                            <div className="delivery-add-modal--form--container" data-input-component="zipcode">
                                <label htmlFor="zipcode" className={styles['delivery-add-modal--form--container--info']}>주소<span>*</span></label>
                                <div className={cx(styles['delivery-add-modal--form--container--input-box'], styles['short'])}>
                                    <input type="text" name="zipcode" id="zipcode" maxLength="30" autoComplete="none" readOnly="readonly"/>
                                </div>
                                <button type="button" className={styles['__find-post']} onClick={this.findAddress}>
                                    우편번호
                                </button>
                            </div>
                            <div className={styles['delivery-add-modal--form--container']}>
                                <div className={styles['delivery-add-modal--form--container--info']}></div>
                                <div className={cx(styles['delivery-add-modal--form--container--input-box'], styles['long'])}>
                                    <input type="text" name="address1" id="address1" maxLength="30" autoComplete="none" readOnly="readonly"/>
                                </div>
                            </div>
                            <div className={styles['delivery-add-modal--form--container']}>
                                <div className={styles['delivery-add-modal--form--container--info']}></div>
                                <div className={cx(styles['delivery-add-modal--form--container--input-box'], styles['long'])}>
                                    <input type="text" name="address2" id="address2" maxLength="36" autoComplete="none" placeholder="상세 주소를 기입하세요."/>
                                    <button type="button" className={styles['__remove-txt-button']}>지우기</button>
                                </div>
                            </div>
                        </fieldset>
                        <div className={styles['delivery-add-modal--form--submit']}>
                            <button type="reset" className={styles['__cancel-delivery-button']} data-join-modal="delivery-add" onClick={()=>{
                                this.props.action('add');
                            }}>취소</button>
                            <button type="submit" className={styles['__add-delivery-button']} data-join-modal="delivery-add">확인</button>
                        </div>
                    </form>
                    <button type="button" className={styles['__close-modal-form']} data-join-modal="delivery-add" onClick={()=>{
                        this.props.action('add');
                    }}>close</button>
                </div>
            </Fragment>
        )
    }
}



export default RegisterAddressComponent;