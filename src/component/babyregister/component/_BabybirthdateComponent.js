import React from 'react';
import classnames from 'classnames';
import styles from '../BabyRegisterModal.scss';
import {removeChar} from "../../../lib/script";
import {Validations} from "../../../lib/validation";

const cx = classnames.bind(styles);

class _BabybirthdateComponent extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            focus: false,
            valid: null,
            minYear: null,
            maxYear: null
        };
        //ref
        this.year = React.createRef();
        this.month = React.createRef();
        this.date = React.createRef();
        //binding

        this.inputBlurHandler = this.inputBlurHandler.bind(this);
        this.inputFocusHandler = this.inputFocusHandler.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.birthdateOnBlurHandler = this.birthdateOnBlurHandler.bind(this);
    }

    componentDidMount() {
        const date = new Date();
        const minYear = date.getFullYear() - 100;
        const maxYear = date.getFullYear() + 2;

        this.setState({
            minYear: minYear,
            maxYear: maxYear
        });
    }


    inputFocusHandler() {
        //레이블 위로
        this.setState({
            focus: true
        });
    }

    inputBlurHandler() {
        const yearVal = this.year.current.value;
        const monthVal = this.month.current.value;
        const dateVal = this.date.current.value;
        //칸이 한 개라도 글 자가 있다면 리턴시킨다.
        if (yearVal.length > 0 || monthVal.length > 0 || dateVal.length > 0) {
            const isEmptyYear = Validations.isEmpty(yearVal);
            const isEmptyMonth = Validations.isEmpty(monthVal);
            const isEmptyDate = Validations.isEmpty(dateVal);
            //하나라도 빈 값인지 체크하기

            if (isEmptyYear && isEmptyMonth && isEmptyDate) {
                this.setState({
                    valid: 'isEmpty'
                });
            } else {
                this.setState({
                    valid: null
                });
            }

        } else {
            //레이블 아래로 내리기
            this.setState({
                focus: false
            });
        }


    }

    inputChangeHandler(ref) {
        const len = ref.value.length;
        const maxLen = ref.maxLength;

        if (len > maxLen) {
            ref.value = ref.value.slice(0, maxLen);
        }
    }

    birthdateOnBlurHandler(ref) {
        let value = ref.value;
        const maxlength = ref.maxLength;
        const dataSet = ref.dataset.reactType;

        if (value.length === 0) {
            return;
        }

        if (value.length > maxlength) {
            value = value.slice(0, maxlength);
            ref.value = value;
        }

        if ('year' === dataSet) {
            if (value < this.state.minYear || value > this.state.maxYear) {
                ref.value = '';
                ref.focus();
                return;
            }


        } else if ('month' === dataSet) {
            if (value < 1 || value > 12) {
                ref.value = '';
                ref.focus();
                return;
            } else if (value.length === 1 && value > 0 && value < 10) {
                ref.value = '0' + ref.value;
            }


        } else if ('date' === dataSet) {
            if (value < 1 || value > 31) {
                ref.value = '';
                ref.focus();
                return;
            } else if (value.length === 1 && value > 0 && value < 10) {
                ref.value = '0' + ref.value;
            }
        }
    }

    render() {
        const {valid} = this.state;
        return (
            <div className={cx(styles['baby-info-register-modal--form--container'], this.state.focus ? styles['active'] : undefined)}>
                <label htmlFor="client-baby-year" className={cx(styles['__default-label-component'], this.state.focus ? styles['active'] : undefined)}>
                    생년월일
                    {
                        valid === 'isEmpty' ? <span>을 입력해주세요.</span> : null
                    }
                </label>
                <div className={styles['birthdate--input-box']}>
                    <input type={'number'}
                           name="year"
                           id="client-baby-year"
                           ref={this.year}
                           className={styles['__default-input-component']}
                           maxLength="4"
                           required={true}
                           autoCapitalize={'off'}
                           placeholder={'Year'}
                           data-react-type={'year'}
                           onFocus={this.inputFocusHandler}
                           onBlur={this.inputBlurHandler}
                           onBlurCapture={(e) => {
                               this.birthdateOnBlurHandler(this.year.current);
                           }}
                           onKeyDown={(e) => {
                               if (e.keyCode === 69) {
                                   e.preventDefault();
                                   return false;
                               }
                               removeChar(e);
                               this.inputChangeHandler(this.year.current);
                           }}
                           onKeyUp={(e) => {
                               if (e.keyCode === 69) {
                                   e.preventDefault();
                                   return false;
                               }
                               removeChar(e);
                               this.inputChangeHandler(this.year.current);
                           }}/>
                    <input type={'number'}
                           name="month"
                           id="client-baby-month"
                           ref={this.month}
                           className={styles['__default-input-component']}
                           maxLength="2"
                           required={true}
                           autoCapitalize={'off'}
                           placeholder={'Month'}
                           data-react-type={'month'}
                           onFocus={this.inputFocusHandler}
                           onBlur={this.inputBlurHandler}
                           onBlurCapture={(e) => {
                               this.birthdateOnBlurHandler(this.month.current);
                           }}
                           onKeyDown={(e) => {
                               if (e.keyCode === 69) {
                                   e.preventDefault();
                                   return false;
                               }
                               removeChar(e);
                               this.inputChangeHandler(this.month.current);
                           }}
                           onKeyUp={(e) => {
                               if (e.keyCode === 69) {
                                   e.preventDefault();
                                   return false;
                               }
                               removeChar(e);
                               this.inputChangeHandler(this.month.current);
                           }}/>
                    <input type={'number'}
                           name="date"
                           id="client-baby-date"
                           ref={this.date}
                           className={styles['__default-input-component']}
                           maxLength="2"
                           required={true}
                           autoCapitalize={'off'}
                           placeholder={'Day'}
                           data-react-type={'date'}
                           onFocus={this.inputFocusHandler}
                           onBlur={this.inputBlurHandler}
                           onBlurCapture={(e) => {
                               this.birthdateOnBlurHandler(this.date.current);
                           }}
                           onKeyDown={(e) => {
                               if (e.keyCode === 69) {
                                   e.preventDefault();
                                   return false;
                               }
                               removeChar(e);
                               this.inputChangeHandler(this.date.current);
                           }}
                           onKeyUp={(e) => {
                               if (e.keyCode === 69) {
                                   e.preventDefault();
                                   return false;
                               }
                               removeChar(e);
                               this.inputChangeHandler(this.date.current);
                           }}/>
                </div>
            </div>
        )
    }
}

export default _BabybirthdateComponent
