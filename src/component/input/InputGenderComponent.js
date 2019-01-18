import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/signup/SignupLayout.scss";

const cx = classnames.bind(styles);

class InputGenderComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: this.props.clientGender || 'f'
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({
            gender:e.target.value
        });
    }

    render() {
        return (
            <div>
                <div className={styles['client-join-section--form--box']} style={{'overflow': 'hidden', 'borderBottom': 'none'}}>
                    <label htmlFor="gender-input-component--female" className={styles['gender-icon']} title="성별을 선택해주세요."></label>
                    <label htmlFor="gender-input-component--female" className={cx(styles['__check-button'], this.state.gender === 'f' ? styles['active'] : null)}>여성
                        <input type="radio"
                               name="gender"
                               id="gender-input-component--female"
                               defaultValue="f"
                               checked={this.state.gender === 'f'}
                               aria-checked={true}
                               className={styles['__radio-input-component']}
                               onChange={this.onChangeHandler}/>
                    </label>
                    <label htmlFor="gender-input-component--male" className={cx(styles['__check-button'], this.state.gender === 'm' ? styles['active'] : null)}>남성
                        <input type="radio"
                               name="gender"
                               id="gender-input-component--male"
                               defaultValue="m"
                               checked={this.state.gender === 'm'}
                               aria-checked={false}
                               className={styles['__radio-input-component']}
                               onChange={this.onChangeHandler}/>
                    </label>
                </div>
                <div className={styles['client-join-section--form--warning']}></div>
            </div>
        )
    }
}

export default InputGenderComponent;