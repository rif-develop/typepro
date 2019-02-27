import React from 'react';
import styles from '../DashboardHeader.scss';
import {connect} from "react-redux";
import DatePickerComponent from "../../datepicker/DatePickerComponent";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class _DateSelectComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }


    render() {
        //PropsToState
        const {pickerState, selectedDate} = this.props;
        //state;
        const {date} = this.state;

        //Action
        const {datepickerOpenRequest, prevDateRequest, nextDateRequest, babyIdx, clientIdx} = this.props;

        //선택된 날짜 view
        const dateObj = new Date(selectedDate);
        const selectedYear = dateObj.getFullYear();
        const selectedMonth = dateObj.getMonth() + 1 < 10 ? '0' + (dateObj.getMonth() + 1) : dateObj.getMonth() + 1;
        const selectDate = dateObj.getDate() < 10 ? '0' + (dateObj.getDate()) : dateObj.getDate();
        const result = selectedYear + '-' + selectedMonth + '-' + selectDate;

        console.log(selectedDate);
        const todayYear = date.getFullYear();
        const todayMonth = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const todayDate = date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate();
        const todayResult = todayYear + '-' + todayMonth + '-' + todayDate;

        const condition = result === todayResult;


        return (
            <div className={styles['dashboard-header-component--date-selector']}>
                <label htmlFor="dashboard--header--date__calendar" onClick={datepickerOpenRequest}></label>
                {
                    pickerState && <DatePickerComponent/>
                }
                <div className={styles['dashboard-header-component--date-selector--nav']}>
                    <button type={'button'} className={styles['dashboard-header-component--date-selector--nav__prev']} role="button" onClick={(e) => {
                        const obj = {
                            clientIdx:clientIdx,
                            babyIdx:babyIdx,
                            date:selectedDate
                        };
                        prevDateRequest(obj)
                    }}></button>
                    <time id="selected_date">
                        {
                            result
                        }
                    </time>
                    <button type={'button'} className={cx(styles['dashboard-header-component--date-selector--nav__next'], condition ? styles['disabled'] : undefined)} role="button" onClick={condition ? undefined : (e) => {
                        const obj = {
                            clientIdx:clientIdx,
                            babyIdx:babyIdx,
                            date:selectedDate
                        };
                        nextDateRequest(obj)
                    }}></button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        pickerState: state.dateReducer.dateModal,
        selectedDate: state.dateReducer.date.selected,//선택된 날짜, 기본 값은 오늘
        clientIdx: state.clientStatusReducer.session._id,
        babyIdx: state.babyInfoReducer.currentBaby._id //현재 선택된 아이의 _id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        datepickerOpenRequest: () => dispatch({
            type: 'SET_DATE_PICKER_TOGGLE'
        }),
        prevDateRequest: (obj) => dispatch({
            type: 'SET_CHANGE_PREV_DATE_REQUEST',
            obj
        }),
        nextDateRequest: (obj) => dispatch({
            type: 'SET_CHANGE_NEXT_DATE_REQUEST',
            obj
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(_DateSelectComponent);