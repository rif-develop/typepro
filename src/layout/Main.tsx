import React ,{Fragment}from 'react';
import styles from './Main.scss';
console.log(styles);
class Main extends React.Component {

    constructor(props:any) {
        super(props);
        this.state = {
            number:1111111
        }
    }

    render(){
        return(
            <Fragment>
            <div className={styles['main']}>dd
                <div className={styles['main--dev']}>g</div>
            </div>
                </Fragment>

        )
    }
}

export default Main;


