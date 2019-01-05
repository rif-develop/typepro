import React from 'react';
import styles from "../../pages/signup/SignupLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);
import {Validations} from "../../lib/validation";
import Snap from 'snapsvg-cjs';

console.log(Snap)
class InputEmailComponent extends React.Component {

    static defaultState = {
        type: 'email',
        name: 'email',
        id: 'email-input-component',
        required: true,
        placeholder: '이메일 (id@email.com)',
        maxLength: 42,
        removeBtn: '클릭시 현재 작성 중인 태그의 입력값을 지우는 버튼입니다.',
        autoCapitalize: 'off',
        autoComplete: 'off',
        title: '사용자님의 아이디로 사용 될 이메일을 입력할 수 있습니다.'
    };

    constructor(props) {
        super(props);
        this.state = {
            emailValue: null,
            length: 0,
            error: false
        };

        this.inputComponent = React.createRef();
        this.check = React.createRef();
        this.onBlurHandler = this.onBlurHandler.bind(this);
    }

    onBlurHandler() {
        console.log(Snap);
        const val = this.inputComponent.current.value;
        const result = Validations.checkEmail(val);

        if (result) {
            this.check.current.classList.add(styles['active']);
            const path = {
                one: 'M1.1,5.6',
                two: 'M1.1 5.6l4.1 4.2',
                three: 'M1.1 5.6l4.1 4.2 8.6-8.7'
            };

            const target = this.check.current;
            /*svg선택*/
            const snap = Snap(target);
            /*path요소 선택*/
            let check = snap.select('path');
            /*체크 애니메이션 함수 */
            let checkAction = function () {
                check.animate({
                    d: path.one,
                    stroke: '#9013fe'
                }, 50, mina.easeBounce, function () {
                    check.animate({
                        d: path.two
                    }, 100, mina.easeElastic, function () {
                        check.animate({
                            d: path.three,
                            stroke: '#19ebdd'
                        }, 250, mina.easeElastic);
                    })
                });
            };

            checkAction();
        } else {
            this.setState({
                error: true
            })
        }
    }

    render() {
        return (
            <div key={'EmailComponent_' + Date.now()}>
                <div className={styles['client-join-section--form--box']}>
                    <label htmlFor={InputEmailComponent.defaultState.id} className={styles['email-icon']}
                           title={InputEmailComponent.defaultState.title}></label>
                    <input type={InputEmailComponent.defaultState.type}
                           name={InputEmailComponent.defaultState.name}
                           id={InputEmailComponent.defaultState.id}
                           required={InputEmailComponent.defaultState.required}
                           placeholder={InputEmailComponent.defaultState.placeholder}
                           aria-placeholder={InputEmailComponent.defaultState.placeholder}
                           autoCapitalize={InputEmailComponent.defaultState.autoCapitalize}
                           autoComplete={InputEmailComponent.defaultState.autoComplete}
                           maxLength={InputEmailComponent.defaultState.maxLength}
                           className={styles['__default-input-component']} ref={this.inputComponent} onBlur={this.onBlurHandler}/>
                    <div className={styles['__remove-input-button']}>{InputEmailComponent.defaultState.removeBtn}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={styles['__check-animation']} ref={this.check}>
                        <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit={"10"} d="M1.1,5.6"/>
                    </svg>
                </div>
                <div className={styles['client-join-section--form--warning']}>
                    <em>{this.state.error ? 'error' : null}</em>
                </div>
            </div>
        )
    }
}

export default InputEmailComponent;