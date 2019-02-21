import React from 'react';
import styles from '../BabyRegisterModal.scss';
import {Validations} from "../../../lib/validation";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class _BabyBloodtypeComponent extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            bloodTypeSelector: false,
            bloodType: 'A',
        };

        this.bloodTypeSelectorToggle = this.bloodTypeSelectorToggle.bind(this);
        this.bloodTypeHandler = this.bloodTypeHandler.bind(this);

    }

    bloodTypeSelectorToggle() {
        this.setState({
            bloodTypeSelector: true
        })
    }

    bloodTypeHandler(bloodType) {
        this.setState({
            bloodType: bloodType,
            bloodTypeSelector: false
        });
    }

    render(){
        return(
            <div className={styles['baby-info-register-modal--form--container']}>
                <div className={styles['__default-label-component']}>혈액형</div>
                <input type={'text'}
                       name="bloodType"
                       className={styles['__default-input-component']}
                       maxLength="5"
                       required={true}
                       value={this.state.bloodType}
                       autoCapitalize={'off'}
                       readOnly={true}
                       onClick={this.bloodTypeSelectorToggle} style={{textAlign: 'right', paddingRight: '10px', color: '#9013fe'}}/>
                <div className={cx(styles['__blood-type-selector'], this.state.bloodTypeSelector ? styles['active'] : undefined)}>
                    <button type={'button'} role={'button'} onClick={(e) => {
                        e.preventDefault();
                        this.bloodTypeHandler('A')
                    }}>A
                    </button>
                    <button type={'button'} role={'button'} onClick={(e) => {
                        e.preventDefault();
                        this.bloodTypeHandler('B')
                    }}>B
                    </button>
                    <button type={'button'} role={'button'} onClick={(e) => {
                        e.preventDefault();
                        this.bloodTypeHandler('AB')
                    }}>AB
                    </button>
                    <button type={'button'} role={'button'} onClick={(e) => {
                        e.preventDefault();
                        this.bloodTypeHandler('O')
                    }}>O
                    </button>
                </div>
            </div>
        )
    }
}

export default _BabyBloodtypeComponent;