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
            minYear: null,
            maxYear: null,
            error: {
                error: false,
                type: null
            }
        };
        //ref
        this.year = React.createRef();
        this.month = React.createRef();
        this.date = React.createRef();
        //binding

        this.inputFocusHandler = this.inputFocusHandler.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.birthdateOnBlurHandler = this.birthdateOnBlurHandler.bind(this);
        this.setStateFocusTrue = this.setStateFocusTrue.bind(this);
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
            focus: true,
            error:{
                error:false,
                type:null
            }
        });
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

        //모든 인풋 값이 비었다면 focus:false로 label내린다.
        const yearLen = this.year.current.value.length;
        const monthLen = this.month.current.value.length;
        const dateLen = this.date.current.value.length;

        //벗어 났을 때 year가 비었다면
        if (yearLen < 4) {
            this.setState({
                focus: true,
                error: {
                    error: true,
                    type: 'emptyBirth',
                }
            });
        } else if (monthLen < 1) {
            this.setState({
                focus: true,
                error: {
                    error: true,
                    type: 'emptyBirth',
                }
            });
        } else if (dateLen < 1) {
            this.setState({
                focus: true,
                error: {
                    error: true,
                    type: 'emptyBirth',
                }
            });
        } else{
            this.setState({
                focus: true,
                error: {
                    error: false,
                    type: null,
                }
            });
        }


        if (yearLen === 0 && monthLen === 0 && dateLen === 0) {
            this.setState({
                focus: true,
                error: {
                    error: true,
                    type: 'emptyBirth',
                }
            });
            return;
        }


        if (value.length > maxlength) {
            value = value.slice(0, maxlength);
            ref.value = value;
        }

        if ('year' === dataSet) {

            if (value < this.state.minYear || value > this.state.maxYear) {
                ref.value = '';
                return;
            }


        } else if ('month' === dataSet) {
            if (value < 1 || value > 12) {
                ref.value = '';
                return;
            } else if (value.length === 1 && value > 0 && value < 10) {
                ref.value = '0' + ref.value;
            }


        } else if ('date' === dataSet) {
            if (value < 1 || value > 31) {
                ref.value = '';
                return;
            } else if (value.length === 1 && value > 0 && value < 10) {
                ref.value = '0' + ref.value;
            }
        }
    }

    setStateFocusTrue() {
        this.setState({
            focus: true
        })
    }

    render() {
        const {valid} = this.state;
        const {year, month, date} = this.props;

        const condition = this.state.error.error && this.state.error.type === 'emptyBirth';

        return (
            <div className={cx(styles['baby-info-register-modal--form--container'], this.state.focus || year || month || date ? styles['active'] : undefined)}>
                <label htmlFor="client-baby-year" className={cx(styles['__default-label-component'], this.state.focus || year || month || date ? styles['active'] : undefined)}>
                    생년월일
                    {
                        condition? <span>을 입력해주세요.</span> : null
                    }
                </label>
                <div className={cx(styles['birthdate--input-box'], this.state.focus ? undefined : styles['active'])}>
                    <input type={'number'}
                           name="year"
                           id={styles['client-baby-year']}
                           ref={this.year}
                           className={cx(styles['__default-input-component'], condition ? styles['__warn'] : undefined)}
                           maxLength="4"
                           required={true}
                           autoCapitalize={'off'}
                           placeholder={this.state.focus ? 'Year' : '생년월일을 입력해주세요.'}
                           data-react-type={'year'}
                           defaultValue={year}
                           onFocus={this.inputFocusHandler}
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
                           id={styles['client-baby-month']}
                           ref={this.month}
                           className={cx(styles['__default-input-component'], condition ? styles['__warn'] : undefined)}
                           maxLength="2"
                           required={true}
                           autoCapitalize={'off'}
                           placeholder={'Month'}
                           defaultValue={month}
                           data-react-type={'month'}
                           onFocus={this.inputFocusHandler}
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
                           id={styles['client-baby-date']}
                           ref={this.date}
                           className={cx(styles['__default-input-component'], condition ? styles['__warn'] : undefined)}
                           maxLength="2"
                           required={true}
                           autoCapitalize={'off'}
                           defaultValue={date}
                           placeholder={'Day'}
                           data-react-type={'date'}
                           onFocus={this.inputFocusHandler}
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
