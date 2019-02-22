import React from 'react';
import classnames from 'classnames';
import styles from '../BabyRegisterModal.scss';

const cx = classnames.bind(styles);

class _BabyGenderComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            gender: this.props.gender ==='m' ? 'm':'f'
        };

        //binding
        this.onClickSetGender = this.onClickSetGender.bind(this);
    }

    onClickSetGender(val) {
        this.setState({
            gender: val
        });
    }

    render() {
        const {gender} = this.props;
        return (
            <div className={styles['baby-info-register-modal--form--container']}>
                <div className={cx(styles['__select-radio-button'],  this.state.gender === 'm' ? styles['active'] : undefined)} role={'radiogroup'}
                     onClick={(e) => {
                         this.onClickSetGender('m');
                     }}>
                </div>
                <label className={styles['__radio-label-component']}
                       htmlFor={'__radio-gender-componet-male'}
                       onClick={(e) => {
                           this.onClickSetGender('m')
                       }}>남
                    <input type="radio"
                           name="gender"
                           id="__radio-gender-component-male"
                           checked={ this.state.gender === 'm'}
                           role={'radio'}
                           value="m" onChange={(e) => {
                        this.onClickSetGender('m')
                    }}/>
                </label>

                <div className={cx(styles['__select-radio-button'], this.state.gender === 'f' ? styles['active'] : undefined)}
                     role={'radiogroup'}
                     onClick={(e) => {
                         this.onClickSetGender('f');
                     }}></div>
                <label className={styles['__radio-label-component']} htmlFor={'__radio-gender-component-female'} onClick={(e) => {
                    this.onClickSetGender('f')
                }}>여
                    <input type="radio"
                           name="gender"
                           id="__radio-gender-component-female"
                           role={'radio'}
                           value="f"
                           checked={this.state.gender === 'f'} onChange={(e) => {
                        this.onClickSetGender('f')
                    }}/>
                </label>
            </div>
        )
    }
}

export default _BabyGenderComponent