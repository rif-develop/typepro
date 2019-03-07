import React from 'react';
import styles from './DefaultOptionComponent.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

/*
* @props switch : 스위치가 켜져있는지 꺼져 있는지 체크할 값
*
*
* */
class DefaultOptionComponent extends React.Component {

    static defaultProps = {
        name: 'no-option-name',
        desc: 'no-desc',
        optionName: 'input 옵션을 설정해주세요.'
    };

    constructor(props) {
        super(props);
        this.setOption = this.setOption.bind(this);
    }

    setOption() {
        const option = this.props.optionName;
        const clientIdx = this.props.clientIdx;

        let formData = new FormData();
        formData.set('option', option);
        formData.set('clientIdx', clientIdx);

        if (this.props.setOptionRequest) {
            this.props.setOptionRequest(formData);
        }
    }

    render() {
        //propsToState
        const {name, desc, optionName, switchToggle} = this.props;
        return (
            <li className={styles['option-component']}>
                <h2>{name || DefaultOptionComponent.defaultProps.name}</h2>
                <p>{desc || DefaultOptionComponent.defaultProps.desc}</p>
                <a href="javascript:void(0)" className={cx(styles['__switch'], switchToggle ? styles['active'] : undefined)} id="group-member-activity-option" onClick={this.setOption}>
                    <div className={switchToggle ? styles['active'] : undefined}></div>
                    <input type="hidden" name={optionName || DefaultOptionComponent.defaultProps.optionName} defaultValue={switchToggle} readOnly="readonly"/>
                </a>
            </li>
        )
    }
}

export default DefaultOptionComponent;