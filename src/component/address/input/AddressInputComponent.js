import React from 'react';
import styles from "../AddressComponent.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class AddressInputComponent extends React.Component {


    static defaultState = {
        id: 'default-id',
        type:'text',
        title: '타이틀을 설정해주세요.',
        placeholder: '플레이스홀더를 입력해주세요.',
        maxLength: 30,
        name: 'default-name'
    };

    constructor(props) {
        super(props);
        this.state = {
            removeBtn: false
        };
        //ref
        this.addressName = React.createRef();
        //func
        this.onInputHandler = this.onInputHandler.bind(this);
        this.onRemoveHandler = this.onRemoveHandler.bind(this);
    }

    onInputHandler() {
        const val = this.addressName.current.value;

        if (val.length > 0) {
            this.setState({
                removeBtn:true
            });
        } else{
            this.setState({
                removeBtn:false
            });
        }
    }

    onRemoveHandler(){
        this.addressName.current.value = null;
        this.setState({
            removeBtn:false
        });
        this.addressName.current.focus();
    }

    render() {
        return (
            <div className={styles['delivery-add-modal--form--container']}>
                <label htmlFor={this.props.id || AddressInputComponent.defaultState.id}
                       className={styles['delivery-add-modal--form--container--info']}>{this.props.title || AddressInputComponent.defaultState.title}<span>*</span></label>
                <div className={cx(styles['delivery-add-modal--form--container--input-box'], this.props.long ? styles['long'] : styles['--default-input'])}>
                    <input type={this.props.type || AddressInputComponent.defaultState.type}
                           ref={this.addressName}
                           name={this.props.name || AddressInputComponent.defaultState.name}
                           maxLength={this.props.maxLength || AddressInputComponent.defaultState.maxLength}
                           id={this.props.id || AddressInputComponent.defaultState.id} autoComplete={'off'} autoCapitalize={'off'}
                           placeholder={this.props.placeholder || AddressInputComponent.defaultState.placeholder}
                           onChange={this.onInputHandler}
                           onBlur={this.onInputHandler}/>
                    <div className={cx(styles['__remove-txt-button'], this.state.removeBtn ? styles['active'] : null)} role={'button'} onClick={this.onRemoveHandler}>지우기</div>
                </div>
                {
                    this.props.long ?
                        null :
                        <div className={styles['__set-default-delivery-address']}>
                            <span><svg></svg></span>
                            <label>기본배송지
                                <input type="checkbox" name="default" defaultValue={false}/>
                            </label>
                        </div>
                }

            </div>
        )
    }
}

export default AddressInputComponent;