import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Redirect, Switch} from 'react-router-dom';
import '../../lib/_reset.scss';

import Loadable from 'react-loadable';
import Loading from '../../component/loading/DefaultLoading';


const Promotionload = Loadable({
    loader: () => import('../promotion/promotionLayout'),
    loading: Loading,
});

const BottleLoad = Loadable({
    loader:()=> import('./bottle/index'),
    loading: Loading,

});

const PeepeeLoad = Loadable({
    loader:()=> import('./peepee/index'),
    loading: Loading,
});

const TempLoad = Loadable({
    loader:()=> import('./temp/index'),
    loading: Loading,
});

const ErrorLoad = Loadable({
    loader:()=> import('../promotion/page/ErrorPage'),
    loading: Loading,
});

const root = document.getElementById('app');


ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Promotionload}/>
            <Route exact path="/device/smartpeepee" component={PeepeeLoad}/>
            <Route exact path="/device/smartbottle" component={BottleLoad}/>
            <Route exact path="/device/smarttemp" component={TempLoad}/>
            <Route path="/404error" component={ErrorLoad} notFound/>
            <Redirect from="*" to="/404error"/>
        </Switch>
    </HashRouter>, root
);

