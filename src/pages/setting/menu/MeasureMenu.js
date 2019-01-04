import React from 'react';
import styles from '../SettingLayout.scss';
import SwitchOptionComponent from "../../../component/setting/option/SwitchOptionComponent";

class MeasureMenu extends React.Component{
    render() {
        return(
            <ul className={styles['web-setting-section--container--options--measure-list']}>
                <SwitchOptionComponent title={'미터 단위'} desc={'e.g. 미터(m), 킬로그램(kg), 섭씨(℃) 등'} name={'measure'} id={'meter-measure'} value={'common'}/>
                <SwitchOptionComponent title={'미국식 도량형 단'} desc={'e.g. 야드(yd), 파운드(lb), 화씨(℉) 등'} name={'measure'} id={'yd-measure'} value={'usa'}/>
            </ul>
        )
    }
}

export default MeasureMenu