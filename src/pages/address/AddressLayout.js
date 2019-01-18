import React, {Fragment} from 'react';
import styles from './AddressLayout.scss';
import classnames from 'classnames';
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import {connect} from "react-redux";
import RegisterAddressComponent from "../../component/address/RegisterAddressComponent";

const cx = classnames.bind(styles);
import {loadScript} from "../../lib/script";
import {getSessionAxios} from "../../action/session/sessionAxios";
import {store} from "../../store/StoreComponent";
import axios from 'axios';
import ModifyAddressComponent from "../../component/address/ModifyAddressComponent";
import ModalComponent from "../../component/modal/ModalComponent";

class AddressLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arrayLen: 0,
            modifyDocsId:null
        };
        this.onModifyHandler = this.onModifyHandler.bind(this);

    }

    componentWillMount() {
        //새션은 컴포넌트가 마운트 되기 전에 가저오기
        //세션을 받아와서 상태 갱신
        getSessionAxios()
            .then((res) => {
                //isSession이 트루면 로그인 된 삳ㅇ태
                if (res.data.isSession) {

                    //로그인 되었으니 세션갱신
                    store.dispatch({
                        type: 'WEB_LOGIN_REQUEST',
                        session: res.data.session
                    });
                } else {
                    console.log('세션 없음');
                    this.props.history.push('/');

                }
            })
            .then(() => {
                //배송지 목록 가져오기
                this.props.getAddressList();

            }).catch((err) => {
            console.log(err);
            //에러일 경우
            store.dispatch({
                type: 'WEB_LOGOUT_REQUEST',
            })
        });//axios

    }

    componentDidMount() {
        loadScript('http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false', 'daum-map', '');
        //유저의 배송지 목록을 불러온다.(나중에 리덕스 사가로 바꾸자.);
    }

    //수정창 열기
    onModifyHandler(id) {
        console.log(id);

    }

    render() {
        const {onClickModalOpener, error,closeModal, onClickUpdateModalOpener, clientIdx, registerModal, modifyModal, language, addressList, isLogin, onClickRemoveList, setDefaultAddress} = this.props;

        //로그인 되어 있지 않으면 리턴 시키기, 여러번 렌더링 막음;
        if (!isLogin) {
            return false
        }
        return (
            <Fragment>

                {
                    error.error && error.type==='required' ? <ModalComponent action={closeModal} subject={'알림'} desc={'필수 입력 사항들을 입력해주세요.'}/>:null
                }
                {/*배송지 등록 모달*/}
                {
                    registerModal ? <RegisterAddressComponent idx={clientIdx} active={registerModal} language={language} onClick={onClickModalOpener} isLogin={isLogin}/> : null
                }
                {
                    modifyModal ? <ModifyAddressComponent docsIdx={this.state.modifyDocsId} idx={clientIdx} active={registerModal} language={language} onClick={onClickUpdateModalOpener} isLogin={isLogin}/> : null
                }

                <Head language={language} tittle={'리틀원 - 배송지 관리'} desc={'고객님의 배송지를 관리할 수 있는 페이지입니다.'}/>
                <Header/>

                <section className={styles['delivery-manage-section']}>
                    <div className={styles['delivery-manage-section--logo']}>리틀원의 배송지 관리 페이지의 로고 이미지입니다.</div>
                    <div>
                        <div className={styles['delivery-manage-section-horizontal-bar']}></div>
                    </div>
                    <div className={styles['delivery-manage-section--desc']}>
                        <h1>배송지 관리</h1>
                        <p>자주 쓰는 배송지를 등록 및 관리하실 수 있습니다. (최대 3개)</p>
                    </div>
                    {/*에러 모달*/}

                    <div className={styles['delivery-manage-section--button-box']}>
                        <button type="button" className={cx(styles['__register-address-btn'], addressList.length < 3 ? styles['active'] : null)}
                                onClick={addressList.length < 3 ? onClickModalOpener : null}>배송지 등록
                        </button>
                    </div>
                    <ul className={styles['delivery-manage-section--list']}>
                        {
                            addressList.length > 0 ? addressList.map((ele, i) => {
                                return <li key={ele._id} className={styles['delivery-manage-section--list--info']}>
                                    <div className={cx(styles['delivery-manage-section--list--info--head'], ele.address.default ? styles['active'] : null)}>
                                        <h2>{ele.address.name}</h2>{ele.address.default ? <span>(기본 배송지)</span> : null}
                                    </div>
                                    <div className={styles['delivery-manage-section--list--info--desc']}>
                                        <div>
                                            <div className={styles['client-delivery-info']}>주소</div>
                                            <div className={styles['client-delivery-address']}>{`${ele.address.address1}, ${ele.address.address2} (우)${ele.address.zipCode} `}</div>
                                        </div>
                                        <div>
                                            <div className={styles['client-delivery-info']}>받는 사람</div>
                                            <div className={styles['client-delivery-getter']}>{ele.address.recipient}</div>
                                        </div>
                                        <div>
                                            <div className={styles['client-delivery-info']}>휴대전화</div>
                                            <div className={styles['client-delivery-mobile']}>{ele.address.phone[0]}</div>
                                        </div>
                                        <div className={styles['__last-components']}>
                                            <div className={styles['client-delivery-info']}>기타 연락처</div>
                                            <div className={styles['client-delivery-other']}>{ele.address.phone[1] ? ele.address.phone[1]:'미등록'}</div>
                                        </div>
                                    </div>
                                    <div className={styles['delivery-manage-section--list--info--button-box']}>
                                        {
                                            ele.address.default ? null : <button type="button" className={styles['__set-default-btn']} onClick={(e) => {
                                                e.preventDefault();
                                                setDefaultAddress(ele._id)
                                            }
                                            }>기본 배송지로 설정</button>
                                        }
                                        <button type="button" className={styles['__modify-delivery-btn']} onClick={(e)=>{
                                            e.preventDefault();
                                            this.setState({
                                                modifyDocsId:ele._id
                                            });
                                            onClickUpdateModalOpener();
                                        }}>수정</button>
                                        <button type="button" className={styles['__remove-delivery-btn']} onClick={(e) => {
                                            e.preventDefault();
                                            onClickRemoveList(ele._id);
                                        }}>삭제
                                        </button>
                                    </div>
                                </li>
                            }) : <li className={styles['none-address']}>
                                등록된 배송지가 없습니다.
                            </li>
                        }
                    </ul>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.addressReducer.loading,
        error: state.addressReducer.error,
        registerModal: state.addressReducer.registerModal,
        modifyModal: state.addressReducer.modifyModal,
        language: state.languageReducer.language,
        clientIdx:state.clientStatusReducer.session._id,
        isLogin: state.clientStatusReducer.login.isLogin, //로그인 여부
        addressList: state.addressReducer.data,//배송지 목록
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAddressList: () => dispatch({
            type: 'GET_ADDRESS_LIST_REQUEST',
        }),
        onClickModalOpener: () => dispatch({
            type: 'TOGGLE_ADDRESS_REGISTER'
        }),
        onClickUpdateModalOpener: () => dispatch({
            type: 'TOGGLE_ADDRESS_MODIFY',
        }),
        onClickRemoveList: (docsIdx) => dispatch({
            type: 'DELETE_ADDRESS_REQUEST',
            docsIdx: docsIdx,
        }),
        setDefaultAddress: (docsIdx) => dispatch({
            type: 'SET_DEFAULT_ADDRESS_REQUEST',
            docsIdx: docsIdx
        }),
        closeModal:()=> dispatch({
            type:'CLOSE_ERROR_MODAL'
        })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AddressLayout);