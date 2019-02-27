import React from "react";
import DatePicker from "react-datepicker";
import styles from './DatePickerComponent.scss';
import classnames from 'classnames';
import {connect} from "react-redux";

const cx = classnames.bind(styles);

class DatePickerComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            warn: null,
            clientIdx:null,
            babyIdx:null,
            selectedDate:null
        };

        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props, state){
        if(props.clientIdx !== state.clientIdx){
            return {
                clientIdx:props.clientIdx
            }
        }
        if(props.babyIdx !== state.babyIdx){
            return {
                babyIdx:props.babyIdx
            }
        }
        // if(props.selectedDate !== state.selectedDate){
        //     return{
        //         selectedDate:props.selectedDate
        //     }
        // }
        return null
    }


    handleChange(date) {
        //달력에서 선택할 날짜
        const selectedDate = date;
        //오늘 날짜
        const today = this.state.date;

        console.log(selectedDate);
        selectedDate.setHours(0);
        selectedDate.setMinutes(0);
        selectedDate.setMilliseconds(0);

        today.setHours(0);
        today.setMinutes(0);
        today.setMilliseconds(0);

        //만약 오늘 날짜보다 이후에 날짜라면 안내 메시지 띄워주자
        if (selectedDate >= today) {
            this.setState({
                warn: '오늘 이후의 날짜는 선택할 수 없습니다.'
            });
            return;
        }

        this.setState({
            warn: null
        });


        const obj = {
            clientIdx:this.props.clientIdx,
            babyIdx:this.props.babyIdx,
            date:selectedDate
        };

        //선택된 날짜로 리덕스 앣견 디스패치
        this.props.selectedDateRequest(selectedDate,obj);
    }

    render() {
        //PropsToState
        const {selectedDate} = this.props;
        //action dispatch

        return (
            <div className={styles['date-picker-container']}>
                <DatePicker inline
                            dropdownMode={'select'}
                            selected={selectedDate}
                            onChange={this.handleChange}>
                    <p className={styles['__warn-text']}>{this.state.warn}</p>
                </DatePicker>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedDate: state.dateReducer.date.selected,//선택된 날짜, 기본 값은 오늘
        clientIdx:state.clientStatusReducer.session._id,
        babyIdx:state.babyInfoReducer.currentBaby._id //현재 선택된 아이의 _id
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectedDateRequest: (selected, obj) => dispatch({
            type: 'SET_CHANGE_DATE_REQUEST',
            selected,
            obj
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerComponent);