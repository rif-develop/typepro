import React from 'react'
import styles from './DefaultLoading.scss';

class DefaultLoading extends React.Component{
    render(){
        return(
            <div className={styles['preloader']}>
                <div className={styles['container-fluid']}>
                    <div className={styles['spinner']}>
                        <span className={styles['ball-1']}></span>
                        <span className={styles['ball-2']}></span>
                        <span className={styles['ball-3']}></span>
                        <span className={styles['ball-4']}></span>
                    </div>
                </div>
                <p>LITTLEONE, NEXT LEVEL PARENTING</p>
            </div>
        )
    }
}

export default DefaultLoading