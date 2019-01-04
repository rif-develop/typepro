import React, {Fragment} from 'react';
import styles from './AddressLayout.scss';
import classnames from 'classnames';
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import RegisterAddressComponent from "../../component/address/RegisterAddressComponent";
const cx = classnames.bind(styles);
import {loadScript} from "../../lib/script";

class AddressLayout extends React.Component {

    constructor(props){
        super(props);
        this.state={
            register:false,
            modify:false
        };

        this.addressRegister = this.addressRegister.bind(this);
    }

    addressRegister(){
        this.setState({
            register:!this.state.register
        });
    }
    componentDidMount() {
        loadScript('http://dmaps.daum.net/map_js_init/postcode.v2.js?autoload=false','daum-map','');
    }

    render() {
        return (
            <Fragment>
                {
                    this.state.register ? <RegisterAddressComponent/>:null
                }
                <Head tittle={'리틀원 - 배송지 관리'} desc={'고객님의 배송지를 관리할 수 있는 페이지입니다.'}/>
                <section className={styles['delivery-manage-section']}>
                    <div className={styles['delivery-manage-section--logo']}>리틀원의 배송지 관리 페이지의 로고 이미지입니다.</div>
                    <div>
                        <div className={styles['delivery-manage-section-horizontal-bar']}></div>
                    </div>
                    <div className={styles['delivery-manage-section--desc']}>
                        <h1>배송지 관리</h1>
                        <p>자주 쓰는 배송지를 등록 및 관리하실 수 있습니다. (최대 3개)</p>
                    </div>
                    <div className={styles['delivery-manage-section--button-box']}>
                        <button type="button" className={styles['__register-address-btn']} onClick={this.addressRegister}>배송지 등록</button>
                    </div>
                    <ul className={styles['delivery-manage-section--list']}>
                        <li className={styles['delivery-manage-section--list--info']}>
                            <div className={styles['delivery-manage-section--list--info--head']}>
                                <h2>address name</h2><span>(기본 배송지)</span>
                            </div>
                            <div className={styles['delivery-manage-section--list--info--desc']}>
                                <div>
                                    <div className={styles['client-delivery-info']}>주소</div>
                                    <div className={styles['client-delivery-address']}></div>
                                </div>
                                <div>
                                    <div className={styles['client-delivery-info']}>받는 사람</div>
                                    <div className={styles['client-delivery-getter']}></div>
                                </div>
                                <div>
                                    <div className={styles['client-delivery-info']}>휴대전화</div>
                                    <div className={styles['client-delivery-mobile']}>010-8396-3007</div>
                                </div>
                                <div className={styles['__last-components']}>
                                    <div className={styles['client-delivery-info']}>기타 연락처</div>
                                    <div className={styles['client-delivery-other']}>01083963007754
                                    </div>
                                </div>
                            </div>
                            <div className={styles['delivery-manage-section--list--info--button-box']}>
                                <button type="button" className={styles['__set-default-btn']}>기본 배송지로 설정</button>
                                <button type="button" className={styles['__modify-delivery-btn']}>수정</button>
                                <button type="button" className={styles['__remove-delivery-btn']}>삭제</button>
                            </div>
                        </li>
                        <li className={styles['none-address']}>
                            등록된 배송지가 없습니다.
                        </li>
                    </ul>
                </section>
                <Header/>
                <Footer/>
            </Fragment>
        )
    }
}

export default AddressLayout;