import React from 'react';
import styles from '../BabyRegisterModal.scss';
import {Validations} from "../../../lib/validation";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class _BabyHeightComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            error:{
                error:false,
                type:null
            }
        };
        //ref
        this.height = React.createRef();
        //binding
        this.inputFocusHandler = this.inputFocusHandler.bind(this);
        this.inputBlurHandler = this.inputBlurHandler.bind(this);
        this.inputKeyHandler = this.inputKeyHandler.bind(this);

    }


    inputFocusHandler() {
        this.setState({
            focus: true,
            error:{
                error:false,
                type:null
            }
        });

    }

    inputBlurHandler() {
        const ref = this.height.current;
        const value = ref.value;
        const len = value.length;
        //값이 잇다면
        if (len > 0) {
            const validHeight = Validations.checkFloatDoublePoint(value);
            console.log(validHeight);
            //유효성 검사에 통과하묜
            if (validHeight) {
                this.setState({
                    error:{
                        error:false,
                        type:null
                    }
                });
            } else {
                this.setState({
                    error:{
                        error:true,
                        type:'notValidHeight'
                    }
                });
                this.height.current.value = '';
            }

        } else {
            //글자가 없으면 레이블 내리기
            this.setState({
                error:{
                    error:true,
                    type:'emptyHeight'
                }
            })
        }
    }

    inputKeyHandler() {
        const maxLen = this.height.current.maxLength;
        const len = this.height.current.value.length;
        const val = this.height.current.value;
        if (len > maxLen) {
            this.height.current.value = val.substring(0, maxLen);
        }
    }

    render() {

        let {error} = this.state;
        const {height} = this.props;

        const validatedCon = error.error && error.type === 'notValidHeight' ;
        const emptyCon = error.error && error.type ==='emptyHeight';

        return (
            <div className={cx(styles['baby-info-register-modal--form--container'], this.state.focus || height ? styles['active'] : undefined)}>
                <label htmlFor="client-baby-height" className={cx(styles['__default-label-component'], this.state.focus ||height ? styles['active'] : undefined)}>
                    {this.state.focus ? '키' : '키를 입력해주세요.'}
                    {validatedCon ? <span>는 정수 3자리, 소수점 2자리까지 가능합니다.</span> : undefined}
                    {emptyCon ? <span>를 입력해주세요.</span> : undefined}
                </label>
                <input type={'number'} name="height" id="client-baby-height"
                       ref={this.height}
                       className={cx(styles['__default-input-component'], validatedCon || emptyCon ? styles['__warn'] : undefined)}
                       maxLength={6}
                       placeholder={this.state.focus ? '키를 입력해주세요.' : null}
                       required={true}
                       autoCapitalize={'off'}
                       defaultValue={height}
                       onFocus={this.inputFocusHandler}
                       onBlur={this.inputBlurHandler}
                       onKeyDown={(e) => {
                           if (e.keyCode === 69) {
                               e.preventDefault();
                               return false;
                           }
                           this.inputKeyHandler();
                       }}
                       onKeyUp={(e) => {
                           if (e.keyCode === 69) {
                               e.preventDefault();
                               return false;
                           }
                           this.inputKeyHandler();
                       }}
                />
            </div>
        )
    }
}

export default _BabyHeightComponent;