import React from 'react';
import styles from './ScreenBlockComponent.scss';

class ScreenBlockComponent extends React.Component{

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={styles['screen-block-component']} onClick={this.props.action}></div>
        )
    }
}

export default ScreenBlockComponent;