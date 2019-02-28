import React from 'react';
import styles from './Section08.scss';
import KakaoEmailComponent from "../../../component/email/kakaoemail/KakaoEmailComponent";
import DefaultEmailComponent from "../../../component/email/defaultemail/EmailComponent";
import InquiryEmailComponent from "../../../component/email/inquiryemail/InquiryEmailComponent";

class Section08 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.onClickHandler = this.onClickHandler.bind(this);
    };

    onClickHandler() {
        this.setState({open: !this.state.open})
    };

    render() {
        //PropsToState
        const {language} = this.props;

        return (
            <section className={styles['seventeenth-section']}>
                <div>
                    <div className={styles['seventeenth-section--article']}>
                        <h1>문의하기</h1>
                        <p>리틀원에 궁금한 점이 있으시면 이메일이나 카카오톡으로 문의하세요!</p>
                    </div>
                    <div className={styles['seventeenth-section--buttons']}>
                        {
                            language === 'ko' && <KakaoEmailComponent/>

                        }
                        {
                            !this.state.open && <DefaultEmailComponent onClick={this.onClickHandler}/>
                        }
                    </div>
                </div>
                {
                    this.state.open && <InquiryEmailComponent/>
                }
            </section>
        )
    }
}

export default Section08