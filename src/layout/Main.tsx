import React from 'react';
import styles from './Main';
class Main extends React.Component {

    constructor(props:any) {
        super(props)
    }

    componentDidMount(){
        window.onunload = function(){
          return alert("!");
        }
    }


    render(){
        return(
            <div className={styles['main']}>
                테스트 완료dfdf하였습닌다!
            </div>
        )
    }
}

export default Main;


