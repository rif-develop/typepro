import styles from './PinkSpinnerComponent.scss';
import React from 'react';

const PinkSpinnerComponent = (text) => {
    return (
       <div className={styles['pink-spinner-component']}>
           <div></div>
       </div>
    )
};

export default PinkSpinnerComponent