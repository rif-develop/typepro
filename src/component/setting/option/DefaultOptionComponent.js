import React from 'react';
import styles from './DefaultOptionComponent.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

class DefaultOptionComponent extends React.Component{
    static defaultState = {
        name:'no-option-name',
        desc:'no-desc',
        optionName:'input 옵션을 설정해주세요.'
    }

    constructor(props){
        super(props);
    }
    render(){

        return(
            <li className={styles['option-component']}>
                <h2>{this.props.name || DefaultOptionComponent.defaultState.name}</h2>
                <p>{this.props.desc || DefaultOptionComponent.defaultState.desc}</p>
                <a href="javascript:void(0)" className={cx(styles['__switch'], styles['active'])} id="group-member-activity-option">
                    <div className={styles['active']}></div>
                    <input type="hidden" name={this.props.optionName || DefaultOptionComponent.defaultState.optionName} value="false" readOnly="readonly"/>
                </a>
            </li>
        )
    }
}

export default DefaultOptionComponent;