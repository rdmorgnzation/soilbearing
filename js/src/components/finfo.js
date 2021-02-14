//Display data related to footing
//Include location too
import React from 'react';

class finfo extends React.Component {
    render(){
        return(
            <div>
                Location: {this.props.sheet.attributes.location}<br/>
                Footing Type: Circular, Square, Strip<br/>
                Depth: <br/>
                Width: <br/>
                Length: <br/>
            </div>
        );
    };
};


import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    sheet: state.state.sheet
  };
};

import actionCreater from '../redux/actionCreators.jsx';
const mapDispatchToProps = dispatch => ({
  //setDepth: (d) => dispatch(actionCreater.setState('depth',d))
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
