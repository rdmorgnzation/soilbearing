//Display data related to footing
//Include location too
//Location is in sheet attributes,
//other values in footing
import React from 'react';

const foundation_default = {
            Type: "Square",
            Depth: 1.5,
            Width: 2,
            Length: 2
        };

class finfo extends React.Component {
    constructor(props){
        super(props);
        //Check sheet if already created?
        if(!props.sheet)
            props.setSheet({attributes: {location: ''},values:[]});
        if(props.foundation)
            return;
        //if foundation is not previously created create it
        props.setFoundation(foundation_default)
    };
    
    handleChange(evt){
        if(evt.target.name=='location'){
            this.props.setSheet({
                ...this.props.sheet,
                attributes: {
                    ...this.props.sheet.attributes,
                    location: evt.target.value
                }
            })
        }else{
            this.props.setFoundation({
                ...this.props.foundation,
                [evt.target.name]: evt.target.value
            })
        }
    };

    render(){
        var loc = '',
            foundation=foundation_default;
        if (this.props.sheet)
            loc=this.props.sheet.attributes.location;
        if (this.props.foundation)
            foundation=this.props.foundation
        return(
            <div>
                Location: <input name="location" value={loc} onChange={this.handleChange.bind(this)}/><br/>
                Footing Type: 
                <select name="Type" value={foundation.Type} onChange={this.handleChange.bind(this)}>
                    <option value="Circular">Circular</option>
                    <option value="Square">Square</option>
                    <option value="Strip">Strip</option>
                    <option value="Rectangular">Rectangular</option>
                </select><br/>
                Depth: <input name="Depth" type="number" value={foundation.Depth} onChange={this.handleChange.bind(this)}/><br/>
                Width: <input name="Width" type="number" value={foundation.Width} onChange={this.handleChange.bind(this)}/><br/>
                {foundation.Type=="Rectangular" && 
                <span> Length: <input name="Length" type="number" value={foundation.Length} onChange={this.handleChange.bind(this)}/> </span>
                }
                <br/>
            </div>
        );
    };
};


import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    sheet: state.state.sheet,
    foundation: state.state.foundation
  };
};

import actionCreater from '../redux/actionCreators.jsx';
const mapDispatchToProps = dispatch => ({
  setSheet: (d) => dispatch(actionCreater.setState('sheet',d)),
  setFoundation: (d) => dispatch(actionCreater.setState('foundation',d))
})
export default connect(mapStateToProps, mapDispatchToProps)(finfo);

/*
import React, { Component, useRef, useEffect } from "react";

class finfo extends Component {

    render() {
        const Canvas = props => {

            const canvasRef = useRef(null)



            const draw = ctx => {
                ctx.fillStyle = '#00ff00';
                ctx.fillRect(0, 200, 600, 600);
                ctx.fillStyle = '#ff00ff';
                ctx.beginPath()
                ctx.fillRect(200, 0, 200, 250);
                ctx.fillStyle = '#ff00ff';
                ctx.fillRect(0, 250, 600, 100);
                ctx.beginPath();
                ctx.fillStyle = '#ff000f';
                ctx.fillRect(0, 350, 600, 200);
                ctx.beginPath();
                ctx.fillStyle = '#f3370f';
                ctx.fillRect(0, 550, 600, 50);
            }

            useEffect(() => {

                const canvas = canvasRef.current;
                const context = canvas.getContext('2d')

                draw(context)
            }, [draw])

            return <canvas width="600" height="600" ref={canvasRef} {...props} />
        }

        return (
            <div>
                <Canvas />
            </div >
        );
    }
}
*/
