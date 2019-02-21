import React from 'react';
import styles from '../BabyRegisterModal.scss';
import {Validations} from "../../../lib/validation";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class _BabyWeightComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            valid: null
        };
        //ref
        this.weight = React.createRef();
        //binding
        this.inputFocusHandler = this.inputFocusHandler.bind(this);
        this.inputBlurHandler = this.inputBlurHandler.bind(this);
        this.inputKeyHandler = this.inputKeyHandler.bind(this);

    }

    inputFocusHandler() {
        this.setState({
            focus: true
        })
    }

    inputBlurHandler() {
        const val = this.weight.current.value;

        if (val.length > 0) {
            const isValid = Validations.checkFloatDoublePoint(val);
            //유효성 통과하면
            console.log(isValid);
            if (isValid) {
                this.setState({
                    valid: true
                });
            } else {
                this.setState({
                    valid: false
                });
            }
        } else {
            this.setState({
                focus: false,
                valid:null
            });
        }


    }

    inputKeyHandler() {
        const maxLen = this.weight.current.maxLength;
        const len = this.weight.current.value.length;
        const val = this.weight.current.value;
        if (len > maxLen) {
            this.weight.current.value = val.substring(0, maxLen);
        }
    }

    render() {
        const {valid} = this.state;

        return (
            <div className={cx(styles['baby-info-register-modal--form--container'], this.state.focus ? styles['active'] : undefined)}>
                <label htmlFor="client-baby-weight" className={cx(styles['__default-label-component'], this.state.focus ? styles['active'] : undefined)}>
                    {this.state.focus ? '몸무게' : '몸무게를 입력해주세요.'}
                    {!valid && valid !== null ? <span>를 정확히 입력해주세요.</span>:undefined}
                </label>
                <input type={'number'}
                       name={'weight'}
                       id={'client-baby-weight'}
                       ref={this.weight}
                       className={cx(styles['__default-input-component'],!valid && valid !== null ?  styles['__warn']:undefined)}
                       maxLength={5}
                       placeholder={this.state.focus ? '몸무게를 입력해주세요.' : null}
                       required={true}
                       autoCapitalize={'off'}
                       onFocus={this.inputFocusHandler}
                       onBlur={this.inputBlurHandler}
                       onKeyUp={(e) => {
                           if (e.keyCode === 69) {
                               e.preventDefault();
                               return false;
                           }
                           this.inputKeyHandler();
                       }}
                       onKeyDown={(e) => {
                           if (e.keyCode === 69) {
                               e.preventDefault();
                               return false;
                           }
                           this.inputKeyHandler();

                       }}/>
            </div>
        )
    }
}

export default _BabyWeightComponent;