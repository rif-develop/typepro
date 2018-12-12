import React from 'react';
import styles from './FlagComponent.scss';
import classnames from 'classnames';
import CountryListComponent from "./list/CountryListComponent";

const cx = classnames.bind(styles);

class FlagComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            country: ['korea', 'japan', 'usa', 'china'],
            listActive: false
        };
        this.onClickHandler = this.onClickHandler.bind(this);

    }

    onClickHandler() {
        this.setState({
            listActive: !this.state.listActive
        })
    }

    render() {
        return (
            <div id={styles['footer-language-box']}>
                <ul onClick={this.onClickHandler}>
                    <li>
                        <a href="javascript:void(0)" className={styles['__change-locale']}>
                            <div className={styles['locale-container']}>
                                <div className={cx(styles['locale-container--flag'], styles['korea-flag'])}></div>
                                <div className={styles['locale-container--country']}>한국</div>
                                <div className={styles['locale-container--down-arrow']}></div>
                            </div>
                        </a>
                    </li>
                </ul>
                <ol className={this.state.listActive ? styles['active'] : null}>
                    {this.state.country.map((key, i)=>{
                        return <CountryListComponent country={key} key={i.toString()} id={i.toString()}/>
                    })}
                </ol>
            </div>
        )
    }
}

export default FlagComponent