import React from 'react';
import styles from './ScreenBlockComponent.scss';

class ScreenBlockComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {action, secondAction} = this.props;
        return (
            <div className={styles['screen-block-component']} style={this.props.zIndex} onClick={(e) => {
                if (action) {
                    action();
                }
                if (secondAction) {
                    secondAction();
                }
            }}></div>
        )
    }
}

export default ScreenBlockComponent;