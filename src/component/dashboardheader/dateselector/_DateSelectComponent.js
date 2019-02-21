import React from 'react';
import styles from '../DashboardHeader.scss';



class _DateSelectComponent extends React.PureComponent{
    render(){
        return(
            <div className={styles['dashboard-header-component--date-selector']}>
                <label htmlFor="dashboard--header--date__calendar">
                    <input type="text" id="dashboard--header--date__calendar" className={styles['dashboard-header-component--date-selector__calendar']}/>
                </label>
                <div className={styles['dashboard-header-component--date-selector--nav']}>
                    <button type={'button'} className={styles['dashboard-header-component--date-selector--nav__prev']} role="button"></button>
                    <time id="selected_date">선택 날짜</time>
                    <button type={'button'} className={styles['dashboard-header-component--date-selector--nav__next']} role="button"></button>
                </div>
            </div>
        )
    }
}

export default _DateSelectComponent;