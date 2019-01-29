import React from 'react';
import styles from "../modal/PhoneAuthModalComponent.scss";
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
        return (
            <div className={styles['language-selector-container--list']}>

                {
                    this.state.countryList.map((ele, key) => {
                        return <button type={'button'}
                                       className={styles['language-selector-container--list__selector']}
                                       role={'button'}
                                       key={Date.now() + key}
                                       aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'} onClick={this.props.action} data-country={ele} tabIndex={key}>
                            <div className={cx(styles['flag-icon'], styles[`--${ele}`])} data-country={ele}>국기</div>
                            <div data-country={ele}>
                                {
                                    ele === 'us' ? '미국 +1' :
                                        ele === 'uk' ? '영국 +44' :
                                            ele === 'ca' ? '캐나다 +1' :
                                                ele === 'au' ? '호주 +1' :
                                                    ele === 'nz' ? '뉴질랜드 +64' :
                                                        ele === 'sp' ? '싱가포르 +65' :
                                                            ele === 'ja' ? '일본 +81' :
                                                                ele === 'zh' ? '중국 +86' :
                                                                    ele === 'tw' ? '대만 +886' :
                                                                        ele === 'ko' ? '한국 +82' : null
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