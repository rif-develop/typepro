import React, {Fragment} from 'react';
import '../../lib/_reset.scss';
import Head from "../../component/head/head";
import Section01 from "./section01/Section01";
import Section02 from "./section02/Section02";
import Section03 from "./section03/Section03";
import Section04 from "./section04/Section04";
import korean from '../../language/korean/index.json';
import Section05 from "./section05/Section05";
import Section06 from "./section06/Section06";

import styles from './Index.scss';
import Section07 from "./section07/Section07";
import Section08 from "./section08/Section08";
import Footer from "../../component/footer/Footer";
import Header from "../../component/header/Header";

class IndexLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            language: korean
        }
    }

    render() {
        return (
            <Fragment>
                <main>
                    <Head title={'LITTLEONE'}/>
                    <Header/>
                    <Section01 language={this.state.language}/>
                    <Section02 language={this.state.language}/>
                    <Section03 language={this.state.language}/>
                    <Section04 language={this.state.language}/>
                    <div className={styles['index-background']}>
                        <Section05 language={this.state.language}/>
                        <Section06 language={this.state.language}/>
                        <Section07 language={this.state.language}/>
                        <Section08 language={this.state.language}/>
                    </div>
                </main>
                <Footer/>
            </Fragment>

        )
    }
}

export default IndexLayout;