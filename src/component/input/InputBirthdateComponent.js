import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/signup/SignupLayout.scss";
import {acceptOnlyNumber, removeChar} from "../../lib/script";

const cx = classnames.bind(styles);

class InputBirthdateComponent extends React.Component {

    static defaultState = {
        id: 'birthdate-input-component',
        title: '사용자님의 생년월일을 입력할 수 있습니다',
        autoCapitalize: 'off',
    };

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            validationYear:false,
            validationMonth:false,
            validationDate:false,
            minYear: null,
            maxYear: null
        };
        this.year = React.createRef();
        this.month = React.createRef();
        this.date = React.createRef();
        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onKeyHandler = this.onKeyHandler.bind(this);

    }

    componentDidMount() {
        const date = new Date();
        const minYear = date.getFullYear() - 100;
        const maxYear = date.getFullYear();

        this.setState({
            minYear: minYear,
            maxYear: maxYear
        });
    }

    onBlurHandler(ref) {
        let value = ref.value;
        const maxlength = ref.maxLength;
        const dataSet = ref.dataset.reactType;


        if(value.length === 0){
            return;
        }

        if (value.length > maxlength) {
            value = value.slice(0, maxlength);
            ref.value = value;
        }
        if ('year' === dataSet) {
            if (value < this.state.minYear || value > this.state.maxYear) {
                ref.value = '';
                this.setState({
                    validationYear:true,
                    validationMonth:false,
                    validationDate:false
                });
                ref.focus();
                return;
            }
            this.setState({
                validationYear:false
            })

        } else if ('month' === dataSet) {
            if (value < 1 || value > 12) {
                ref.value = '';
                this.setState({
                    validationYear:false,
                    validationMonth:true,
                    validationDate:false
                });
                ref.focus();
                return;
            } else if (value.length === 1 && value > 0 && value < 10) {
                ref.value = '0' + ref.value;
            }

            this.setState({
                validationMonth:false
            })

        } else if ('date' === dataSet) {
            if (value < 1 || value > 31) {
                ref.value = '';
                this.setState({
                    validationYear:false,
                    validationMonth:false,
                    validationDate:true
                });
                ref.focus();
                return;
            } else if (value.length === 1 && value > 0 && value < 10) {
                ref.value = '0' + ref.value;
            }
            this.setState({
                validationDate:false
            })
        }
    }

    onKeyHandler(ref) {
        const len = ref.value.length;
        const maxLen = ref.maxLength;

        if (len > maxLen) {
            ref.value = ref.value.slice(0, maxLen);
        }
    }


    render() {
        return (
            <div>
                <div className={cx(styles['client-join-section--form--box'], styles['multiple-input-box'])}>
                    <div className={styles['multiple-input-box--icon']}>
                        <label htmlFor={InputBirthdateComponent.defaultState.id}
                               className={styles['birthdate-icon']}
                               title={InputBirthdateComponent.defaultState.title}></label>
                    </div>
                    <input type="number"
                           name="year"
                           id={InputBirthdateComponent.defaultState.id}
                           placeholder="YYYY"
                           autoCapitalize={InputBirthdateComponent.defaultState.autoCapitalize}
                           className={styles['__birth-date-input-component']}
                           required={true}
                           min={this.state.minYear}
                           max={this.state.maxYear}
                           maxLength={4}
                           defaultValue={this.props.year}
                           ref={this.year}
                           onBlur={() => {
                               this.onBlurHandler(this.year.current);
                           }}
                           data-react-type={'year'}
                           onKeyUp={(e) => {
                               removeChar(e);
                               this.onKeyHandler(this.year.current);
                           }}
                           onKeyDown={(e) => {
                               removeChar(e);
                               this.onKeyHandler(this.year.current);
                           }}
                    />

                    <input type="number"
                           name="month"
                           placeholder="MM"
                           autoCapitalize={InputBirthdateComponent.defaultState.autoCapitalize}
                           className={styles['__birth-date-input-component']}
                           required={true}
                           min={1}
                           max={12}
                           maxLength={2}
                           defaultValue={this.props.month}
                           ref={this.month}
                           onBlur={() => {
                               this.onBlurHandler(this.month.current);
                           }}
                           data-react-type={'month'}
                           onKeyUp={(e) => {
                               removeChar(e);
                               this.onKeyHandler(this.month.current);
                           }}
                           onKeyDown={(e) => {
                               removeChar(e);
                               this.onKeyHandler(this.month.current);
                           }}
                    />
                    <input type="number"
                           name="date"
                           placeholder="DD"
                           autoCapitalize={InputBirthdateComponent.defaultState.autoCapitalize}
                           className={styles['__birth-date-input-component']}
                           required={true}
                           min={1}
                           max={31}
                           maxLength={2}
                           defaultValue={this.props.date}
                           ref={this.date}
                           onBlur={() => {
                               this.onBlurHandler(this.date.current);
                           }}
                           data-react-type={'date'}
                           onKeyUp={(e) => {
                               removeChar(e);
                               this.onKeyHandler(this.date.current)
                           }}
                           onKeyDown={(e) => {
                               removeChar(e);
                               this.onKeyHandler(this.date.current);
                           }}
                    />
                </div>
                <div className={styles['client-join-section--form--warning']}>
                    <em>
                        {
                             this.state.validationYear ? `년도를 입력해주세요. (${this.state.minYear}~${this.state.maxYear})`:null
                        }
                        {
                            this.state.validationMonth ? '월을 입력해주세요.':null
                        }
                        {
                            this.state.validationDate ? '일을 입력해주세요.':null
                        }
                    </em>
                </div>
            </div>
        )
    }
}

export default InputBirthdateComponent;