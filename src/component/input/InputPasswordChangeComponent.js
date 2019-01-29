import React, {Fragment} from 'react';
import styles from "../../pages/password/PasswordChangeLayout.scss";
import classnames from 'classnames';
import {Validations} from "../../lib/validation";

const cx = classnames.bind(styles);

class InputPasswordChangeComponent extends React.Component {

    static defaultState = {
        name: 'no-name',
        id: 'no-id',
        placeholder: '플레이스 홀더를 입력해주세요.',
        required: true,
        maxLength: 20,
    };

    constructor(props) {
        super(props);

        this.state = {
            removeBtn: false,
            error: false
        };
        //bind
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onClickRemove = this.onClickRemove.bind(this);
        this.onBlurHandler = this.onBlurHandler.bind(this);

        //ref
        this.input = React.createRef();
        this.removeBtn = React.createRef();

    }

    onChangeHandler() {
        const ref = this.input.current.value;

        if (ref.length > 0) {
            this.setState({
                removeBtn: true,
                error:false
            });
        } else {
            this.setState({
                removeBtn: false
            });
        }
    }

    onBlurHandler() {
        const ref = this.input.current.value;
        const isValidated = Validations.checkPassword(ref);
        if (isValidated) {
            this.setState({
                error: false
            })
        } else {

            //0이면 포커스 벗어날 수 있게

            if(ref.length === 0){
                this.setState({
                    error:false,
                });
                return;
            }

            this.setState({
                error: 'validation',
                removeBtn:false
            });

            this.input.current.value = null;
            this.input.current.focus();
        }

    }

    onClickRemove() {
        this.input.current.value = null;

        this.setState({
            removeBtn: false
        });

        this.input.current.focus();
    }

    render() {
        return (
            <Fragment>
                <div className={styles['littleone-common-section--form--box']}>
                    <label htmlFor={this.props.id || InputPasswordChangeComponent.defaultState.id} className={styles['__lock-icon']}></label>
                    <input type="password"
                           id={this.props.id || InputPasswordChangeComponent.defaultState.id}
                           ref={this.input}
                           className={styles['__input-component']}
                           maxLength={this.props.maxLength || InputPasswordChangeComponent.defaultState.maxLength}
                           name={this.props.name || InputPasswordChangeComponent.defaultState.name}
                           required={this.props.required || InputPasswordChangeComponent.defaultState.required}
                           placeholder={this.props.placeholder || InputPasswordChangeComponent.defaultState.placeholder}
                           onChange={this.onChangeHandler}
                           onBlur={this.onBlurHandler}/>
                    <div className={cx(styles['__remove-input-value'], this.state.removeBtn ? styles['active'] : null)}
                         ref={this.removeBtn} onClick={this.onClickRemove}>입력 값 삭제 버튼입니다.
                    </div>
                </div>
                <div className={styles['littleone-common-section--form--error']}>
                    <p>
                        {
                            this.state.error === 'validation' ? '알파벳, 숫자, 특수문자로 조합된 8~20자 사이로 입력해주세요.' : null
                        }
                    </p>
                </div>
            </Fragment>
        )
    }
}

export default InputPasswordChangeComponent;