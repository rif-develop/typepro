import React from 'react';
import {Link} from 'react-router-dom';
import * as styles from './ErrorPage.scss';
import Head from "../../component/head/head";

class NotValidPage extends React.Component {
    render() {
        return (
            <div className={styles['error-section']}>
                <Head title={'리틀원 - 잘못된 접근법'}/>
                <div>
                    <div className={styles['error-section-type']}>
                        <h3>더 이상 유효한 페이지가 아닙니다.</h3>
                    </div>
                    <Link to="/" className={styles['__link-return-home']}></Link>
                </div>
                <img src={require('./404-littleone-graphic@2x.png')} alt="유효하지 않은 페이지"/>
            </div>
        )
    }
}

export default NotValidPage;