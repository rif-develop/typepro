import React from 'react';
import classnames from 'classnames';
import styles from '../BabyRegisterModal.scss';
import {Validations} from "../../../lib/validation";

const cx = classnames.bind(styles);

class _BabynameComponent extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            focus: false,
            error: {
                error: false,
                type: null
            }
        };

        //ref
        this.name = React.createRef();

        this.inputFocusHandler = this.inputFocusHandler.bind(this);
        this.inputBlurHandler = this.inputBlurHandler.bind(this);
    }

    inputFocusHandler() {
        //레이블을 위로 옮기기 위해서 트루로 바꿔준다.
        this.setState({
            focus: true,
            error: {
                error: false,
                type: null
            }
        });
    }

    inputBlurHandler() {
        const ref = this.name.current;
        //0보다 크면 레이블을 아래로 내려오지 않게 하기 위해 리턴시켜준다.
        if (ref.value.length > 0) {
            const isEmpty = Validations.isEmpty(ref.value);

            this.setState({
                error: {
                    error: false,
                    type: null
                }
            })
        } else {
            this.setState({
                focus: true,
                error: {
                    error: true,
                    type: 'emptyName'
                }
            });
        }


    }

    render() {
        const {error} = this.state;
        const {name} = this.props;
        const errorCondition = error.error && error.type === 'emptyName';
        return (
            <div className={cx(styles['baby-info-register-modal--form--container'], this.state.focus ? styles['active'] : undefined)}>
                <label htmlFor="client-baby-name" className={cx(styles['__default-label-component'], this.state.focus || name ? styles['active'] : undefined)}>
                    {this.state.focus || name ? "이름" : "이름을 입력해주세요."}
                    {errorCondition ? <span>을 정확히 입력해주세요.</span> : undefined}
                </label>
                <input type="text" name="name"
                       ref={this.name}
                       id="client-baby-name"
                       className={cx(styles['__default-input-component'], errorCondition ? styles['__warn'] : undefined)}
                       required={true} autoCapitalize="off"
                       autoComplete={'none'}
                       maxLength={20}
                       defaultValue={name || ''}
                       placeholder={this.state.focus ? '이름을 입력해주세요.' : undefined}
                       onFocus={this.inputFocusHandler}
                       onBlur={this.inputBlurHandler}/>
            </div>
        )
    }
}

export default _BabynameComponent
