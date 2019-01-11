import React, {Fragment} from 'react';
import styles from './ModalComponent.scss';
import classnames from 'classnames';
import {innerCenter} from "../../lib/script";
import ScreenBlockComponent from "../screenblock/ScreenBlockComponent";

const cx = classnames.bind(styles);

class ModalComponent extends React.Component {

    static defaultState = {
        subject: '제목을 입력해주세요.',
        desc: '내용을 입력해주세요',
        cancel: '취소',
        confirm: '확cccccccc인'

    };

    constructor(props) {
        super(props);
        this.modal = React.createRef();
        this.rePositionModal = this.rePositionModal.bind(this);
    }

    componentDidMount() {
        innerCenter(this.modal.current);
        window.addEventListener('resize', this.rePositionModal)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.rePositionModal);
    }

    rePositionModal() {
        innerCenter(this.modal.current);
    }

    render() {
        return (
            <Fragment>
                <ScreenBlockComponent/>
                <div className={styles['alarm-modal-component']} ref={this.modal}>
                    <div className={styles['alarm-modal-component--head']}>
                        <h2 className={styles['alarm-modal-component--head--title']}>{this.props.subject || ModalComponent.defaultState.subject}</h2>
                    </div>
                    <div className={styles['alarm-modal-component--text']}>
                        <p className={styles['alarm-modal-component--text--paragraph']}>{this.props.desc || ModalComponent.defaultState.desc}</p>
                    </div>
                    <div className={styles['alarm-modal-component--buttons']}>
                        {
                            this.props.confirm ?  <Fragment>
                                <button type="reset" role="button" className={styles['__cancel-modal-button']}>{this.props.cancel || ModalComponent.defaultState.cancel}</button>
                                <button type="button" role="button" className={styles['__confirm-modal-button']}>{this.props.confirm || ModalComponent.defaultState.confirm}</button>
                            </Fragment> : null
                        }
                        <button type="button" role="button" className={cx(styles['__confirm-modal-button'], styles['single-button'])}>{this.props.confirm || ModalComponent.defaultState.confirm}</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ModalComponent