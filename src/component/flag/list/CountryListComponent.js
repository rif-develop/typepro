import React from "react";
import styles from '../FlagComponent.scss';
import classnames from 'classnames';
import {setCookie} from "../../../action/cookie/Cookie";
import {connect} from 'react-redux';

const cx = classnames.bind(styles);

class CountryListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            langList: ['en', 'ko', 'ja', 'zh'],
            countryName: ['USA', '한국', '日本', '中國']
        };
    }

    render() {
        const {language, fetching, error, onClickHandler} = this.props;

        return (
            <li className={styles['footer-language-box--list']} data-select-value={this.props.country} data-react-key={this.props.id} onClick={()=>{
                onClickHandler(this.props.country)
            }}>
                <a href="javascript:void(0)" className={styles['__change-locale']}>
                    <div className={styles['locale-container']}>
                        <div className={cx(styles['locale-container--flag'], styles[`${this.props.country}-flag`])}></div>
                        <div className={styles['locale-container--country']}>{
                            this.state.langList.map((key, i) => {
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

const mapStateToProps = state =>{
    return {
        language:state.languageReducer.language,
        fetching:state.languageReducer.fetching,
        error:state.languageReducer.error
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        onClickHandler:(lang)=> dispatch({
            type:"SET_LANGUAGE_REQUEST",
            lang
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryListComponent);