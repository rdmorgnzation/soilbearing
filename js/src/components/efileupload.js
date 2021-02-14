import React from "react";
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
        <div style={{border: "2px solid", margin: 1}}>
            {props.sheetName}
            {props.sheetName==props.currentSheet?
            `[Selected]`:
            <button key={props.sheetName} onClick={()=>props.setSheet(props.sheetName)}>Select</button>
            }
            <br/>
            {Object.keys(props.attributes).map(attr=>
                <span key={attr}>{attr}: {props.attributes[attr]}<br/></span>
            )}
        </div>
    );
};

//Selection between sheets
//Connects to react store
class SheetSelector extends React.Component {
    constructor(props){
        super(props);
        if (props.savedSheets){
            this.state = {activeSheet: null};
            return;//Do noting if there are previously saved sheets
        }
        //Check if no uploaded contents search in saved if any
        var sheets = props.sheets || {};
        props.saveSheets(sheets);//else save and update
        const firstKey = Object.keys(sheets)[0];
        this.state = {activeSheet: firstKey};
        if(firstKey){
            props.setSheet(sheets[firstKey]);
        }
    }
    componentDidUpdate(prevProps){
        if (prevProps.sheets !== this.props.sheets) {
            if (Object.keys(this.props.sheets).length==0)
                return;
            this.props.saveSheets(this.props.sheets);
            const firstKey = Object.keys(this.props.sheets)[0];
            this.setState({activeSheet: firstKey});
            if(firstKey){
                this.props.setSheet(this.props.sheets[firstKey]);
            }
        }
    }
    selectSheet(sheetName){
        var sheets = this.props.sheets || {};
        if (Object.keys(sheets).length==0)
            sheets = this.props.savedSheets || {};
        this.setState({activeSheet: sheetName});
        this.props.setSheet(sheets[sheetName]);
    }

    render(){
        var sheets = this.props.sheets || {};
        if (Object.keys(sheets).length==0)
            sheets = this.props.savedSheets || {};
        return(
            <div>
                {Object.keys(sheets).map(name=>
                    <SheetOption 
                        key={name} sheetName={name}
                        currentSheet={this.state.activeSheet}
                        setSheet={this.selectSheet.bind(this)}
                        attributes={sheets[name].attributes}
                        />
                )}
            </div>
        )
    };
}

import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    savedSheets: state.state.sheets
  };
};

import actionCreater from '../redux/actionCreators.jsx';
const mapDispatchToProps = dispatch => ({
  setSheet: (d) => dispatch(actionCreater.setState('sheet',d)),
  saveSheets: (d) => dispatch(actionCreater.setState('sheets',d))
})

const SheetSelectorG = connect(mapStateToProps, mapDispatchToProps)(SheetSelector);

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
