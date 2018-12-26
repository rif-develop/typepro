import React from 'react';
import {connect} from "react-redux";


class Counter extends React.Component{
    render(){
        const {fetching, count ,error, onClickCount} = this.props;

        return(
            <div>
                {count? count:null}
                {fetching ? '<div>dd</div>':null}
                {error ? 'error':null}
                <button type={'button'} onClick={onClickCount}>{count}</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        fetching:state.counterReducer.fetching,
        count:state.counterReducer.count,
        error:state.counterReducer.error
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        onClickCount:()=> dispatch({
            type:'INCREMENT_REQUEST'
        })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);