import React from "react";
import cookie from "react-cookies";
import actionCreater from '../redux/actionCreators';
import { connect } from "react-redux";

// Show results from calculation
class calcResults extends React.Component {
    constructor(props){
        super(props);
        this.state = {results: {}}
    }

    calculate(){
        if(!this.props.sheet)
            alert("Data not set");
        if(!this.props.foundation)
            alert("Foundation info not set");
        const request = new Request(
            "./get_result",
            {headers: {
                'X-CSRFToken': cookie.load("csrftoken"),
                "Content-Type": "application/json"
                }}
        );
        fetch(request, {
            method: 'post',
            mode: 'same-origin',
            body: JSON.stringify({sheet: this.props.sheet, footing: this.props.foundation})
        })
        .then((response)=>{
            response.json().then((data)=> {
                this.setState(data);
            });
        });
    }

    render() {
        console.log(this.state)
        return (
            <div style={{border: "2px solid", margin: 1}}>
                <button onClick={this.calculate.bind(this)}>Calculate</button>
                <div>{
                    Object.keys(this.state.results).map((method)=>
                        <div key="{method}">{method}: {this.state.results[method]}</div>
                    )
                }</div>
            </div>
        )
   }
}

const mapStateToProps = state => {
  return {
    sheet: state.state.sheet,
    foundation: state.state.foundation
  };
};
const mapDispatchToProps = dispatch => ({
  //setSheet: (d) => dispatch(actionCreater.setState('sheet',d)),
})

const CalcResults = connect(mapStateToProps, mapDispatchToProps)(calcResults);

// Show results based on location info
class LocResults extends React.Component {
    render() {
        return (
            <div style={{border: "2px solid", margin: 1}}>
                *Need to add this later
            </div>
        )
   }
}

class results extends React.Component {
    render() {
        return (
            <div>
                <CalcResults/>
                <LocResults/>
            </div>
        );
    }
}

export default results;
