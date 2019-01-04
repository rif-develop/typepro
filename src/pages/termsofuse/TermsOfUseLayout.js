import React, {Fragment} from 'react';
import styles from './TermsOfUseLayout.scss';
import classnames from 'classnames';
import {connect} from "react-redux";

const cx = classnames.bind(styles);
import TermsComponent01 from '../../component/terms/_TermsComponent01';
import TermsComponent02 from '../../component/terms/_TermsComponent02';
import TermsComponent03 from '../../component/terms/_TermsComponent03';
import TermsComponent04 from '../../component/terms/_TermsComponent04';
import TermsComponent05 from '../../component/terms/_TermsComponent05';
import TermsComponent06 from '../../component/terms/_TermsComponent06';
import TermsComponent07 from '../../component/terms/_TermsComponent07';
import TermsComponent08 from '../../component/terms/_TermsComponent08';
import TermsComponent09 from '../../component/terms/_TermsComponent09';
import TermsComponent10 from '../../component/terms/_TermsComponent10';
import TermsComponent11 from '../../component/terms/_TermsComponent11';
import TermsComponent12 from '../../component/terms/_TermsComponent12';
import TermsComponent13 from '../../component/terms/_TermsComponent13';
import TermsComponent14 from '../../component/terms/_TermsComponent14';
import TermsComponent15 from '../../component/terms/_TermsComponent15';
import TermsComponent16 from '../../component/terms/_TermsComponent16';
import TermsComponent17 from '../../component/terms/_TermsComponent17';
import TermsComponent18 from '../../component/terms/_TermsComponent18';
import TermsComponent19 from '../../component/terms/_TermsComponent19';
import TermsComponent20 from '../../component/terms/_TermsComponent20';
import TermsComponent21 from '../../component/terms/_TermsComponent21';
import TermsComponent22 from '../../component/terms/_TermsComponent22';
import TermsComponent23 from '../../component/terms/_TermsComponent23';
import TermsComponent24 from '../../component/terms/_TermsComponent24';
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

class TermsOfUseLayout extends React.Component {
    render() {
        const {language} = this.props;
        return (
            <Fragment>
                <Head title={'리틀원 - 서비스 약관'} desc={'리틀원의 서비스 약관 페이지입니다.'} language={language}/>
                <Header/>
                <section className={styles['terms-section']}>
                    <article>
                        <div className={styles['terms-section--heading']}>
                            <h1>서비스 약관</h1>
                            <p>
                                이용자님의 권리 및 의무를 이해하기 위하여 사이트 이용약관(이하 "본 약관")을 주의 깊게 읽어주시길 바랍니다.
                            </p>
                        </div>
                        <div className={styles['terms-section--terms-contents']}>
                            <ol id="terms-container">
                                <TermsComponent01/>
                                <TermsComponent02/>
                                <TermsComponent03/>
                                <TermsComponent04/>
                                <TermsComponent05/>
                                <TermsComponent06/>
                                <TermsComponent07/>
                                <TermsComponent08/>
                                <TermsComponent09/>
                                <TermsComponent10/>
                                <TermsComponent11/>
                                <TermsComponent12/>
                                <TermsComponent13/>
                                <TermsComponent14/>
                                <TermsComponent15/>
                                <TermsComponent16/>
                                <TermsComponent17/>
                                <TermsComponent18/>
                                <TermsComponent19/>
                                <TermsComponent20/>
                                <TermsComponent21/>
                                <TermsComponent22/>
                                <TermsComponent23/>
                                <TermsComponent24/>
                            </ol>
                            <h6>본 약관은 2019월 1월 1일부터 시행됩니다.</h6>
                        </div>
                    </article>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        language:state.languageReducer.language
    }
};

export default connect(mapStateToProps)(TermsOfUseLayout);