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
            <div className={'language-selector-container--list'}>

                {
                    this.state.countryList.map((ele, key) => {
                        return <button type={'button'}
                                       className={'language-selector-container--list__selector'}
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
                {/*<button type={'button'} className={'language-selector-container--list__selector'} role={'button'} aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'}>*/}
                {/*<div className={cx(styles['flag-icon'], styles['--uk'])}>국기</div>*/}
                {/*<div>&lrm;영국 +44</div>*/}
                {/*</button>*/}
                {/*<button type={'button'} className={'language-selector-container--list__selector'} role={'button'} aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'}>*/}
                {/*<div className={cx(styles['flag-icon'], styles['--ca'])}>국기</div>*/}
                {/*<div>&lrm;캐나다 +1</div>*/}
                {/*</button>*/}
                {/*<button type={'button'} className={'language-selector-container--list__selector'} role={'button'} aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'}>*/}
                {/*<div className={cx(styles['flag-icon'], styles['--au'])}>국기</div>*/}
                {/*<div>&lrm;호주 +61</div>*/}
                {/*</button>*/}
                {/*<button type={'button'} className={'language-selector-container--list__selector'} role={'button'} aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'}>*/}
                {/*<div className={cx(styles['flag-icon'], styles['--nz'])}>국기</div>*/}
                {/*<div>&lrm;뉴질랜드 +64</div>*/}
                {/*</button>*/}
                {/*<button type={'button'} className={'language-selector-container--list__selector'} role={'button'} aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'}>*/}
                {/*<div className={cx(styles['flag-icon'], styles['--sp'])}>국기</div>*/}
                {/*<div>&lrm;싱가포르 +65</div>*/}
                {/*</button>*/}
                {/*<button type={'button'} className={'language-selector-container--list__selector'} role={'button'} aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'}>*/}
                {/*<div className={cx(styles['flag-icon'], styles['--ja'])}>국기</div>*/}
                {/*<div>&lrm;일본 +81</div>*/}
                {/*</button>*/}
                {/*<button type={'button'} className={'language-selector-container--list__selector'} role={'button'} aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'}>*/}
                {/*<div className={cx(styles['flag-icon'], styles['--zh'])}>국기</div>*/}
                {/*<div>&lrm;중국 +86</div>*/}
                {/*</button>*/}
                {/*<button type={'button'} className={'language-selector-container--list__selector'} role={'button'} aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'}>*/}
                {/*<div className={cx(styles['flag-icon'], styles['--tw'])}>국기</div>*/}
                {/*<div>&lrm;대만 +886</div>*/}
                {/*</button>*/}
                {/*<button type={'button'} className={'language-selector-container--list__selector'} role={'button'} aria-roledescription={'고객님의 국가를 선택하실 수 있습니다.'}>*/}
                {/*<div className={cx(styles['flag-icon'], styles['--ko'])}>국기</div>*/}
                {/*<div>&lrm;대한민국 +82</div>*/}
                {/*</button>*/}
            </div>
        )
    }
}

export default PhoneAuthCountrySelector