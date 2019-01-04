import React from 'react';
import styles from './SwitchOptionComponent.scss';
import classnames from 'classnames';
const cx = classnames.bind(styles);

class SwitchOptionComponent extends React.Component{

    static defaultState = {
        title:'타이틀을 입력해주세요.',
        desc:'컴포넌트를 설명해주세요 ',
        name:'컴포넌트의 namer값을 입력해주세요.',
        value:'컴포넌트의 value값을 입력해주세요.',
        id:'label과 연결될 input의 아이디 값을 입력해주세요.'
    };

    constructor(props){
        super(props);
    }


    render(){
        return(
            <li className={cx(styles['switch-option-component'], styles['active'])}>
                <div className={styles['switch-option-component--desc']}>
                    <div className={styles['__checked']}></div>
                    <h2>{this.props.title || SwitchOptionComponent.defaultState.title}</h2>
                    <p>{this.props.desc || SwitchOptionComponent.defaultState.desc}</p>
                    <label htmlFor={this.props.id || SwitchOptionComponent.defaultState.id}>
                        <input type="radio" name={this.props.name || SwitchOptionComponent.defaultState.name} value={this.props.value || SwitchOptionComponent.defaultState.value} readOnly="readonly" id={this.props.id || SwitchOptionComponent.defaultState.id} aria-readonly="true"/>
                    </label>
                </div>
            </li>
        )
    }
}

export default SwitchOptionComponent