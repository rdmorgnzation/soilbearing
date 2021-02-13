import React, { Component, PropType } from "react";
import cookie from "react-cookies";

//For upload form
class FileUploadForm extends React.Component {
    handleSubmit(event){
        event.preventDefault();
        const form = this.refs.submit_form;
        const self = this;
        var formData = new FormData(form);
        fetch("./file_upload", {
            method: 'post',
            body: formData
        })
        .then((response)=>{
            response.json().then((data)=> {
                this.props.onFileUpload(data);
            });
        });
    }
    render() {
        return (
            <div>
                <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)} ref='submit_form'>
                    <input
                        type="hidden"
                        value={cookie.load("csrftoken")}
                        name="csrfmiddlewaretoken"
                    />
                    <input type="file" name="document" ></input>
                    <button type="submit">Upload</button>
                </form>
            </div>
        );
    }
}

//Single option for sheet
//Display attributes, later may be change attributes too
function SheetOption(props){
    return(
        <div>
            {props.sheetName}
            {props.sheetName==props.currentSheet?
            `[Selected]`:
            [<button onClick={()=>props.setSheet(props.sheetName)}>Select</button>]
            }
        </div>
    );
};

//Selection between sheets
//Connects to react store
class SheetSelector extends React.Component {
    constructor(props){
        super(props);
        const firstKey = Object.keys(props.sheets)[0];
        this.state = {activeSheet: firstKey};
        if(!!firstKey){
            this.props.setSheet(props.sheets[firstKey]);
        }else{//set empty
            this.props.setSheet({"attributes": {}, "values": {}});
        }
    }
    componentDidUpdate(prevProps){
        if (prevProps.sheets !== this.props.sheets) {
            const firstKey = Object.keys(this.props.sheets)[0];
            this.setState({activeSheet: firstKey});
            if(!!firstKey){
                this.props.setSheet(this.props.sheets[firstKey]);
            }
        }
    }
    selectSheet(sheetName){
        this.setState({activeSheet: sheetName});
        this.props.setSheet(this.props.sheets[sheetName]);
    }

    render(){
        return(
            <div>
                {Object.keys(this.props.sheets).map(name=>
                    <SheetOption 
                        key={name} sheetName={name}
                        currentSheet={this.state.activeSheet}
                        setSheet={this.selectSheet.bind(this)}
                        />
                )}
            </div>
        )
    };
}

import { connect } from "react-redux";
import actionCreater from '../redux/actionCreators.jsx';
const mapDispatchToProps = dispatch => ({
  setSheet: (d) => dispatch(actionCreater.setState('sheet',d))
})

const SheetSelectorG = connect(null, mapDispatchToProps)(SheetSelector);

//Full page
class efileupload extends React.Component {
    constructor(props){
        super(props);
        this.state = {sheets: {}};
    }

    handleOnFileUpload(content){
        this.setState({sheets: content});
    }
    
    render(){
        return(
            <div>
                <FileUploadForm onFileUpload={this.handleOnFileUpload.bind(this)}/>
                <SheetSelectorG sheets={this.state.sheets}/>
                <span>*You can skip this step and directly go to editing.</span>
            </div>
        );
    }
}

export default efileupload;
