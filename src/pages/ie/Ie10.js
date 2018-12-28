import React from 'react';
import styles from './Ie10.scss';
import Head from "../../component/head/head";

class Ie10 extends React.Component {
    render() {
        return (
            <div className={styles["warning-ie-9"]}>
                <Head title={'인터넷 익스플로러 10미만은 지원하지 않습니다.'}/>
                <div className={styles["warning-ie-9--box"]}>
                    <div className={styles['outer']}>
                        <div className={styles['inner']}>
                            <div className={styles['centered']}>
                                <p>리틀원 웹 애플리케이션은 구글 크롬 브라우저에서의<br/>
                                    사용을 권장하고 있습니다.</p>
                                <p> 인터넷 익스플로러 10 미만에서는 원활한 사용이 어려우니,<br/>
                                    아래의 링크를 따라 크롬 최신 버전을 다운받아주세요.</p>
                                <a href={'https://www.google.com/chrome/'} className={styles['__link']} target="_blank">
                                    <span>구글 크롬 다운로드</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Ie10;