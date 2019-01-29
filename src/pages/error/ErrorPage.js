import React from 'react';
import {Link} from 'react-router-dom';
import * as styles from './ErrorPage.scss';
import Head from "../../component/head/head";

class ErrorPage extends React.Component {
    render() {
        return (
            <div className={styles['error-section']}>
                <Head title={'LITTLEONE 404ERROR'}/>
                <div>
                    <div className={styles['error-section-type']}>
                        <h3>{this.props.desc || '404ERROR'}</h3>
                    </div>
                    <Link to="/" className={styles['__link-return-home']}></Link>
                </div>
                <img src={require('./404-littleone-graphic@2x.png')} alt="404 ERROR"/>
            </div>
        )
    }
}

export default ErrorPage;