import React from 'react';
import styles from './Section02.scss';

class Section02 extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <section className={styles['secondary-section']}>
                <div className={styles['secondary-section--content']}>
                    <div className={styles['secondary-section--content--head']}>
                        <div className={styles['outer']}>
                            <div className={styles['inner']}>
                                <div className={styles['centered']}>
                                    <h1>리틀원</h1><span>은</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p>블루투스와 센서를 이용한 사물인터넷과 앱 연동으로 이상을 감지하고 알리는 <em>똑똑한 육아 보조 서비스</em>를 제공합니다.</p>
                </div>
            </section>
        )
    }
}

export default Section02;