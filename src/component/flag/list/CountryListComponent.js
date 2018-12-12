import React from "react";
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from '../../../reducers/Reducer';
import styles from '../FlagComponent.scss';
import classnames from 'classnames';
import {setCookie} from "../../../action/cookie/Cookie";
import rootSaga from "../../../action/dispatch/saga";

const cx = classnames.bind(styles);


class CountryListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            countryList: ['usa', 'korea', 'japan', 'china'],
            countryName: ['USA', '한국', '日本', '中國']
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(props){
        let cookieToday = new Date();
        let expiryDate = new Date(cookieToday.getTime() + (365 * 86400000)); // 1년
        //쿠키 설정
        this.state.countryList.map((key,i)=>{
           if(key===props){
               props ==='korea'?  setCookie('lang','ko',expiryDate,'/',false,false) :
               props==='japan' ? setCookie('lang','jp',expiryDate,'/',false,false) :
               props==='china' ? setCookie('lang','zh',expiryDate,'/',false,false) :
               props==='usa' ? setCookie('lang','us',expiryDate,'/',false,false) :
               setCookie('lang','us',expiryDate,'/',false,false)
           }
        });

        const sagaMiddleWare = createSagaMiddleware();

        const store = createStore(
            reducer,
            applyMiddleware(sagaMiddleWare)
        );


        sagaMiddleWare.run(rootSaga);

        store.getState();
    }


    render() {
        return (
            <li className={styles['footer-language-box--list']} data-select-value={this.props.country} data-react-key={this.props.id} onClick={()=>{
                this.onClickHandler(this.props.country)
            }}>
                <a href="javascript:void(0)" className={styles['__change-locale']}>
                    <div className={styles['locale-container']}>
                        <div className={cx(styles['locale-container--flag'], styles[`${this.props.country}-flag`])}></div>
                        <div className={styles['locale-container--country']}>{
                            this.state.countryList.map((key, i) => {
                                if (this.props.country === key) {
                                    return this.state.countryName[i];
                                }
                            })}</div>
                    </div>
                </a>
            </li>
        )
    }
}

export default CountryListComponent