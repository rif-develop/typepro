import React from 'react';
import styles from "./PhoneAuthCountrySelector.scss";
import classnames from 'classnames';
const cx = classnames.bind(styles);

class PhoneAuthCountrySelector extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            countryList: ['us', 'uk', 'ko', 'ja', 'zh', 'ca', 'au', 'nz', 'sp', 'tw']
        }

    }


    render() {
        const {locale} = this.props;
        return (
            <div className={styles['language-selector-container--list']}>
                {
                    this.state.countryList.map((ele, key) => {
                        return <button type={'button'}
                                       className={styles['language-selector-container--list__selector']}
                                       role={'button'}
                                       key={Date.now() + key}
                                       aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'} onClick={this.props.action} data-country={ele} tabIndex={key}>
                            <div className={cx(styles['flag-icon'], styles[`--${ele}`])} data-country={ele}>{locale.string['10']}</div>
                            <div data-country={ele}>
                                {
                                    ele === 'us' ? locale.country['us'] :
                                        ele === 'uk' ? locale.country['uk'] :
                                            ele === 'ca' ? locale.country['ca'] :
                                                ele === 'au' ? locale.country['au'] :
                                                    ele === 'nz' ? locale.country['nz'] :
                                                        ele === 'sp' ? locale.country['sp'] :
                                                            ele === 'ja' ? locale.country['ja'] :
                                                                ele === 'zh' ? locale.country['zh'] :
                                                                    ele === 'tw' ? locale.country['tw'] :
                                                                        ele === 'ko' ? locale.country['ko'] : null
                                }
                            </div>
                        </button>
                    })
                }
            </div>
        )
    }
}

export default PhoneAuthCountrySelector