import React from 'react';
import {connect} from "react-redux";
import styles from './FlagComponent.scss';
import classnames from 'classnames';
import CountryListComponent from "./list/CountryListComponent";

const cx = classnames.bind(styles);

class FlagComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            country: ['ko', 'ja', 'en', 'zh'],
            listActive: false,
        };
        this.onClickHandler = this.onClickHandler.bind(this);

    }

    onClickHandler() {
        this.setState({
            listActive: !this.state.listActive,
        })
    }

    render() {
        const {language, fetching, error} = this.props;
        return (
            <div id={styles['footer-language-box']} onMouseLeave={() => {
                this.setState({
                    listActive: false
                })
            }}>
                <ul onClick={this.onClickHandler} className={this.state.listActive ? styles['active'] : null} style={this.props.index ? null:{'backgroundColor':'#3f348f'}}>
                    <li>
                        <a href="javascript:void(0)" className={styles['__change-locale']}>
                            <div className={styles['locale-container']}>
                                <div className={cx(styles['locale-container--flag'], styles[`${language}-flag`])}></div>
                                <div className={styles['locale-container--country']}>{language === 'ko' ? '한국' : language === 'en' ? 'USA' : language === 'ja' ? '日本' : language === 'zh' ? '中國' : '한국'}</div>
                                <div className={cx(styles['locale-container--down-arrow'],this.state.listActive ? styles['active']:null)}></div>
                            </div>
                        </a>
                    </li>
                </ul>
                <ol className={this.state.listActive ? styles['active'] : null} style={this.props.index ? null:{'backgroundColor':'#3f348f'}}>
                    {this.state.country.map((key, i) => {
                        return <CountryListComponent country={key} key={i.toString()} id={i.toString()}/>
                    })}
                </ol>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.languageReducer.language,
        fetching: state.languageReducer.fetching,
        error: state.languageReducer.error
    }
};


export default connect(mapStateToProps)(FlagComponent)