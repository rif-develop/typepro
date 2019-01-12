import React, {Fragment} from 'react';
import styles from './ModalComponent.scss';
import classnames from 'classnames';
import {innerCenter} from "../../lib/script";
import ScreenBlockComponent from "../screenblock/ScreenBlockComponent";
import {store} from "../../store/StoreComponent";

const cx = classnames.bind(styles);

class ModalComponent extends React.Component {

    static defaultState = {
        subject: '제목을 입력해주세요.',
        desc: '내용을 입력해주세요',
        cancel: '취소',
        confirm: '확인'

    };

    constructor(props) {
        super(props);
        this.modal = React.createRef();
        this.confirmBtn = React.createRef();

        this.rePositionModal = this.rePositionModal.bind(this);
        this.confirmModal = this.confirmModal.bind(this);
        this.cancelModal = this.cancelModal.bind(this);
        this.onKeyHandler = this.onKeyHandler.bind(this);
    }

    componentDidMount() {
        innerCenter(this.modal.current);
        window.addEventListener('resize', this.rePositionModal)

        this.confirmBtn.current.focus();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.rePositionModal);
        store.dispatch({
            type:'SET_MODAL_CLOSE_REQUEST'
        });
    }

    rePositionModal() {
        innerCenter(this.modal.current);
    }

    confirmModal() {
        this.props.modalAction()
    }

    cancelModal() {
        store.dispatch({
            type:'SET_MODAL_CLOSE_REQUEST'
        });
    }
    onKeyHandler(e){
        const k = e.keyCode
        if (k===9){
            e.stopPropagation();
            e.preventDefault();
        }
    }

    render() {
        return (
            <Fragment>
                <ScreenBlockComponent action={this.cancelModal}/>
                <div className={styles['alarm-modal-component']} ref={this.modal}>
                    <div className={styles['alarm-modal-component--head']}>
                        <h2 className={styles['alarm-modal-component--head--title']}>{this.props.subject || ModalComponent.defaultState.subject}</h2>
                    </div>
                    <div className={styles['alarm-modal-component--text']}>
                        <p className={styles['alarm-modal-component--text--paragraph']}>{this.props.desc || ModalComponent.defaultState.desc}</p>
                    </div>
                    <div className={styles['alarm-modal-component--buttons']}>
                        {
                            this.props.confirm ? <Fragment>
                                <button type="reset"
                                        role="button"
                                        className={styles['__cancel-modal-button']}
                                        onClick={this.cancelModal}>{this.props.cancel || ModalComponent.defaultState.cancel}</button>
                                <button type="button"
                                        role="button"
                                        className={styles['__confirm-modal-button']}>{this.props.check || ModalComponent.defaultState.confirm}</button>
                            </Fragment> : null
                        }
                        <button type="button"
                                role="button" ref={this.confirmBtn}
                                className={cx(styles['__confirm-modal-button'], styles['single-button'])} onClick={this.props.action || this.cancelModal} onKeyDown={this.onKeyHandler}>{this.props.check || ModalComponent.defaultState.confirm}</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ModalComponent