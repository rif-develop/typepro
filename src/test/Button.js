import React from 'react';
import {connect} from "react-redux";

class Button extends React.Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log(nextProps, nextState,nextContext)
        return nextProps;
    }

    render() {

        const button = {
            type: 'button',
            text: 'click'
        };
        const {fetching, language, error, onClickHandler, count} = this.props;

        return (
            <div>
                {fetching ? '<div>zz</div>':''}
                {count}
                {language}
                <button type={button.type} onClick={()=>{
                    onClickHandler('korea')
                }}>{button.text}</button>
                <button type={button.type} onClick={()=>{
                    onClickHandler('japan')
                }}>{button.text}</button>
                <button type={button.type} onClick={()=>{
                    onClickHandler('usa')
                }}>{button.text}</button>
                <button type={button.type} onClick={()=>{
                    onClickHandler('china')
                }}>{button.text}</button>
            </div>
        )
    }
}

let mapStateToProps = state => {
    return {
        fetching: state.languageReducer.fetching,
        language: state.languageReducer.language,
        error: state.languageReducer.error,
        count:state.counterReducer.count,
    }
};

let mapDispatchToProps = (dispatch,props) => {
    console.log(props)
    return {
        onClickHandler: (lang) => dispatch({
            type: 'SET_LANGUAGE_REQUEST',
            language:lang
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Button);