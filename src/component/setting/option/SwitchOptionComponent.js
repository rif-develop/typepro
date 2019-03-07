import React from 'react';
import styles from './SwitchOptionComponent.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

class SwitchOptionComponent extends React.Component {

    static defaultState = {
        title: '타이틀을 입력해주세요.',
        desc: '컴포넌트를 설명해주세요 ',
        name: '컴포넌트의 namer값을 입력해주세요.',
        value: '컴포넌트의 value값을 입력해주세요.',
        id: 'label과 연결될 input의 아이디 값을 입력해주세요.'
    };

    constructor(props) {
        super(props);
        //binding
        this.onClickOptionChange = this.onClickOptionChange.bind(this);
    }

    onClickOptionChange() {
        //옵션 밸류
        const optionValue = this.props.optionValue;

        const clientIdx = this.props.clientIdx;
        console.log(optionValue, clientIdx)


        let formData = new FormData();
        formData.set('unit', optionValue);
        formData.set('clientIdx', clientIdx);

        if (this.props.optionChangeRequest) {
            this.props.optionChangeRequest(formData);
        }
    }

    render() {
        return (
            <button type={'button'} role={'button'} tabIndex={0} className={cx(styles['switch-option-component'], this.props.active ? styles['active'] : null)} onClick={this.onClickOptionChange}>
                <div className={styles['switch-option-component--desc']}>
                    <div className={styles['__checked']}></div>
                    <h2>{this.props.title || SwitchOptionComponent.defaultState.title}</h2>
                    <p>{this.props.desc || SwitchOptionComponent.defaultState.desc}</p>
                </div>
            </button>
        )
    }
}

export default SwitchOptionComponent