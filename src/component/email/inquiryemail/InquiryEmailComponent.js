import React from 'react';
import styles from './InquiryEmailComponent.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);
import Anime from 'react-anime';

class InquiryEmailComponent extends React.PureComponent {
    render() {
        return (
            <Anime>
                <div className={styles['inquiry-email-component']}>
                    <form>
                        <fieldset>
                            <legend></legend>
                            <input type={'email'}/>
                            <button type={'submit'}></button>
                        </fieldset>
                    </form>
                </div>
            </Anime>
        )
    }
}

export default InquiryEmailComponent