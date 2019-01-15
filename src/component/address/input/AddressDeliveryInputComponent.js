import React, {Fragment} from 'react';
import styles from "../AddressComponent.scss";
import {execDaumPostcode} from "../../../api/daumPostCode";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class AddressDeliveryInputComponent extends React.Component {

    static defaultState = {
        titleText: '주소',
        buttonText: '우편번호'
    };

    constructor(props) {
        super(props);
        this.findAddress = this.findAddress.bind(this);
        this.onRemoveHandler = this.onRemoveHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        //ref
        this.zipCode = React.createRef();
        this.firstAddress = React.createRef();
        this.secondAddress = React.createRef();
        this.zipcodeBtn = React.createRef();
        this.firstAddressBtn = React.createRef();
        this.secondAddressBtn = React.createRef();
    }


    findAddress() {
        execDaumPostcode('zipcode', 'address1', 'address2')
    }

    onRemoveHandler(ref,e) {
        const btn = e.currentTarget;
        ref.value = null;
        btn.classList.remove(styles['active']);
        ref.focus();
    }

    onChangeHandler(ref) {
        const value = ref.value;
        if (value.length > 0) {
            if (ref.name === 'zipcode') {
                this.zipcodeBtn.current.classList.add(styles['active']);
            } else if (ref.name === 'address1') {
                this.firstAddressBtn.current.classList.add(styles['active']);
            } else if (ref.name === 'address2') {
                this.secondAddressBtn.current.classList.add(styles['active']);
            }
        } else {
            if (ref.name === 'zipcode') {
                this.zipcodeBtn.current.classList.remove(styles['active']);
            } else if (ref.name === 'address1') {
                this.firstAddressBtn.current.classList.remove(styles['active']);
            } else if (ref.name === 'address2') {
                this.secondAddressBtn.current.classList.remove(styles['active']);
            }
        }
    }

    render() {
        return (
            <Fragment>
                <div className="delivery-add-modal--form--container">
                    <label htmlFor="zipcode" className={styles['delivery-add-modal--form--container--info']}>{this.props.titleText || AddressDeliveryInputComponent.defaultState.titleText}<span>*</span></label>
                    <div className={cx(styles['delivery-add-modal--form--container--input-box'], this.props.language === 'ko' ? styles['short'] : styles['long'])}>
                        <input type="text"
                               ref={this.zipCode}
                               name="zipcode"
                               id="zipcode"
                               maxLength="30"
                               autoComplete="none"
                               autoCapitalize={'off'}
                               readOnly={this.props.language === 'ko'}
                               placeholder={'우편번호'}
                               onChange={() => {
                                   this.onChangeHandler(this.zipCode.current)
                               }}
                               onBlur={() => {
                                   this.onChangeHandler(this.zipCode.current)
                               }}/>
                        {this.props.language === 'ko' ? null : <div role={'button'} ref={this.zipcodeBtn} className={styles['__remove-txt-button']} onClick={(e) => {
                            this.onRemoveHandler(this.zipCode.current, e);
                        }}>지우기</div>}
                    </div>
                    {
                        this.props.language === 'ko' ? <button type="button" className={styles['__find-post']} onClick={this.findAddress}>
                            {AddressDeliveryInputComponent.defaultState.buttonText}
                        </button> : null
                    }

                </div>
                <div className={styles['delivery-add-modal--form--container']}>
                    <div className={styles['delivery-add-modal--form--container--info']}></div>
                    <div className={cx(styles['delivery-add-modal--form--container--input-box'], styles['long'])}>
                        <input type="text"
                               name="address1"
                               ref={this.firstAddress}
                               id="address1"
                               maxLength="30"
                               autoComplete="none"
                               autoCapitalize={'off'}
                               readOnly={this.props.language === 'ko'}
                               placeholder={'도로명 주소'}
                               onChange={() => {
                                   this.onChangeHandler(this.firstAddress.current)
                               }}
                               onBlur={() => {
                                   this.onChangeHandler(this.firstAddress.current)
                               }}/>

                        <div role={'button'} ref={this.firstAddressBtn} className={styles['__remove-txt-button']} onClick={(e) => {
                            this.onRemoveHandler(this.firstAddress.current ,e)
                        }}>지우기</div>

                    </div>
                </div>
                <div className={styles['delivery-add-modal--form--container']}>
                    <div className={styles['delivery-add-modal--form--container--info']}></div>
                    <div className={cx(styles['delivery-add-modal--form--container--input-box'], styles['long'])}>
                        <input type="text"
                               ref={this.secondAddress}
                               name="address2"
                               id="address2"
                               maxLength="36"
                               autoComplete="off"
                               autoCapitalize={'off'}
                               placeholder="상세 주소를 기입하세요."
                               onChange={() => {
                                   this.onChangeHandler(this.secondAddress.current)
                               }}
                               onBlur={() => {
                                   this.onChangeHandler(this.secondAddress.current)
                               }}/>
                        <div role={'button'} ref={this.secondAddressBtn} className={styles['__remove-txt-button']} onClick={(e) => {
                            this.onRemoveHandler(this.secondAddress.current, e);
                        }}>지우기
                        </div>
                    </div>
                </div>
            </Fragment>

        )
    }
}

export default AddressDeliveryInputComponent