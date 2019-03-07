import React from 'react';
import styles from '../SettingLayout.scss';
import SwitchOptionComponent from "../../../component/setting/option/SwitchOptionComponent";
import {connect} from "react-redux";

class MeasureMenu extends React.Component {

    render() {
        //action
        const {optionChangeRequest} = this.props;
        //propstostate
        const {unit, clientIdx} = this.props;

        return (
            <ul className={styles['web-setting-section--container--options--measure-list']}>
                <SwitchOptionComponent title={'미터 단위'}
                                       desc={'e.g. 미터(m), 킬로그램(kg), 섭씨(℃) 등'}
                                       name={'measure'} id={'meter-measure'}
                                       value={'si'}
                                       optionValue={'si'}
                                       active={unit === 'si'}
                                       clientIdx={clientIdx}
                                       optionChangeRequest={optionChangeRequest}/>
                <SwitchOptionComponent title={'미국식 도량형 단'}
                                       desc={'e.g. 야드(yd), 파운드(lb), 화씨(℉) 등'}
                                       name={'measure'}
                                       id={'yd-measure'}
                                       value={'usa'}
                                       active={unit === 'usa'}
                                       optionValue={'usa'}
                                       clientIdx={clientIdx}
                                       optionChangeRequest={optionChangeRequest}/>
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        optionChangeRequest: (formData) => dispatch({
            type: 'API_UNIT_OPTION_CHANGE_REQUEST',
            formData
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasureMenu);