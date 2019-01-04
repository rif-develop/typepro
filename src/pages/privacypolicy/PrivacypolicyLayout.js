import React, {Fragment} from 'react';
import styles from './PrivacypolicyLayout.scss';
import classnames from 'classnames';
import Footer from "../../component/footer/Footer";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Terms01 from '../../component/terms/_PrivacyPolicyComponent01';
import Terms02 from '../../component/terms/_PrivacyPolicyComponent02';
import Terms03 from '../../component/terms/_PrivacyPolicyComponent03';
import Terms04 from '../../component/terms/_PrivacyPolicyComponent04';
import Terms05 from '../../component/terms/_PrivacyPolicyComponent05';
import Terms06 from '../../component/terms/_PrivacyPolicyComponent06';
import Terms07 from '../../component/terms/_PrivacyPolicyComponent07';
import Terms08 from '../../component/terms/_PrivacyPolicyComponent08';
import Terms09 from '../../component/terms/_PrivacyPolicyComponent09';
import Terms10 from '../../component/terms/_PrivacyPolicyComponent10';

const cx = classnames.bind(styles);

class PrivacypolicyLayout extends React.Component {
    render() {
        return (
            <Fragment>
                <Head title={'리틀원 - 개인정보보호정책'} desc={'리틀원의 개인정보보호정책 페이지입니다.'}/>
                <Header/>
                <section className={styles['terms-section']}>
                    <article>
                        <div className={styles['terms-section--heading']}>
                            <h1>개인정보보호정책</h1>
                            <p>
                                리틀원주식회사(이하 “회사”)는 이용자의 개인정보보호를 중요시하며 [정보통신망 이용 촉진 및 정보보호]에 관한 법률을 준수하고 있습니다. 회사는 개인정보처리방침을 통하여 이용자께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                            </p>
                        </div>
                        <div className={styles['terms-section--terms-contents']}>
                            <ol>
                                <Terms01/>
                                <Terms02/>
                                <Terms03/>
                                <Terms04/>
                                <Terms05/>
                                <Terms06/>
                                <Terms07/>
                                <Terms08/>
                                <Terms09/>
                                <Terms10/>
                            </ol>
                        </div>
                    </article>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

export default PrivacypolicyLayout;