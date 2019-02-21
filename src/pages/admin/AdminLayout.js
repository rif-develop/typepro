import React from 'react';
import styles from './AdminLayout.scss';
import axios from 'axios';

class AdminLayout extends React.PureComponent {

    constructor(props) {
        super(props);

        this.title = React.createRef();
        this.contents = React.createRef();
        this.appPushHandler = this.appPushHandler.bind(this);
    }

    appPushHandler(e) {
        e.preventDefault();
        console.log('ddd');

        axiosTest(this.title.current.value, this.contents.current.value);

        function axiosTest(name, contents){
            return axios({
                method:'POST',
                url: '/app/push',
                data: {
                    name:name,
                    contents:contents
                }
            });
        }

    }

    render() {
        return (
            <div>
                <h1>관리자 페이지입니다.</h1>
                <form method={'POST'} role={'form'}>
                    <fieldset>
                        <input type={'text'} id={'a'} name={'title'} placeholder={'앱 푸쉬 알림 제목'} ref={this.title}/>
                        <input type={'text'} id={'d'} name={'contents'} placeholder={'앱 푸쉬 알림을 입력하세요.'} ref={this.contents}/>
                        <button type={'submit'} role={'button'} onClick={this.appPushHandler}>submit</button>
                    </fieldset>
                </form>
            </div>
        )
    }
}

export default AdminLayout
