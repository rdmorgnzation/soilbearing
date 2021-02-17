import React from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import actionCreater from '../redux/actionCreators';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { IconButton } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  dropzone: {
    height: 200,
    width: 200,
    backgroundColor: '#fff',
    border: '2px dashed rgb(187, 186, 186)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: 16,
  },
  highlight: {
    backgroundColor: 'rgb(188, 185, 236)',
  }
});

//For upload form
class FileUploadFormX extends React.Component {
  constructor(props){
    super(props);
    this.fileInputRef = React.createRef();
    this.formRef = React.createRef();
    this.state = { hightlight: false };
  }

  onDragOver(evt){
    evt.preventDefault();
    if (this.props.disabled) return;
    this.setState({ hightlight: true });
  }

  onDragLeave(){
    this.setState({ hightlight: false });
  }
  
  onDrop(event){
    event.preventDefault();
    if (this.props.disabled) return;
    const files = event.dataTransfer.files;
    this.fileInputRef.current.files=files;
    this.setState({ hightlight: false });
    this.handleSubmit();
  }
  
  onFileAdded(evt){
    this.handleSubmit();
  }
  
  handleSubmit(event){
    if(event)
      event.preventDefault();
    let form = this.formRef.current;
    let formData = new FormData(form);
    fetch("./file_upload", {
      method: 'post',
      body: formData
    })
    .then(res => res.json())
    .then(res => this.props.onFileUpload(res));
  }
  
  openFileDialog() {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        className={clsx(
          classes.dropzone,
          this.state.hightlight && classes.highlight
        )}
        onDragOver={this.onDragOver.bind(this)}
        onDragLeave={this.onDragLeave.bind(this)}
        onDrop={this.onDrop.bind(this)}
        onClick={this.openFileDialog.bind(this)}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
        >
        <CloudUploadIcon style={{ fontSize: "64px" }} />
        <span>Upload File</span>
        <form 
          method="POST"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit.bind(this)}
          ref={this.formRef}
          style={{display:"none"}}
        >
          <input
            type="hidden"
            value={cookie.load("csrftoken")}
            name="csrfmiddlewaretoken"
          />
          <input
            type="file"
            name="document"
            ref={this.fileInputRef}
            onChange={this.onFileAdded.bind(this)}
            />
        </form>
      </div>
    );
  }
}

const FileUploadForm = withStyles(styles)(FileUploadFormX);

//Single option for sheet
//Display attributes, later may be change attributes too
function SheetOption(props){
  return(
    <Card style={{width: 250, height: 300}}>
      <CardContent>
        <Typography variant="h5" component="h2">
            {props.sheetName}
        </Typography>
        <Typography variant="body2" component="p">
          {Object.keys(props.attributes).map(attr=>
            <span key={attr}>{attr}: {props.attributes[attr]}<br/></span>
          )}
        </Typography>
      </CardContent>
      {props.sheetName!=props.currentSheet &&
        <CardActions>
          <Button key={props.sheetName} onClick={()=>props.setSheet(props.sheetName)}>Select</Button>
        </CardActions>
      }
      <br/>
    </Card>
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
    let sheets = props.sheets || {};
    props.saveSheets(sheets);//else save and update
    const firstKey = Object.keys(sheets)[0];
    this.state = {activeSheet: firstKey};
    if(firstKey)
      props.setSheet(sheets[firstKey]);
  }
  
  componentDidUpdate(prevProps){
    if (prevProps.sheets !== this.props.sheets) {
      if (Object.keys(this.props.sheets).length==0)
        return;
      this.props.saveSheets(this.props.sheets);
      const firstKey = Object.keys(this.props.sheets)[0];
      this.setState({activeSheet: firstKey});
      if(firstKey)
        this.props.setSheet(this.props.sheets[firstKey]);
    }
  }
  
  selectSheet(sheetName){
    let sheets = this.props.sheets || {};
    if (Object.keys(sheets).length==0)
      sheets = this.props.savedSheets || {};
    this.setState({activeSheet: sheetName});
    this.props.setSheet(sheets[sheetName]);
  }

  render(){
    let sheets = this.props.sheets || {};
    if (Object.keys(sheets).length==0)
      sheets = this.props.savedSheets || {};
    return(
      <>
        {Object.keys(sheets).map(name=>
          <Grid item key={name}>
            <SheetOption 
              sheetName={name}
              currentSheet={this.state.activeSheet}
              setSheet={this.selectSheet.bind(this)}
              attributes={sheets[name].attributes}
            />
          </Grid>
        )}
      </>
    )
  };
}

const mapStateToProps = state => {
  return {
    savedSheets: state.state.sheets
  };
};

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
    return (
      <Grid container spacing={2} style={{alignItems: 'center'}}>
        <Grid item>
          <FileUploadForm onFileUpload={this.handleOnFileUpload.bind(this)}/>
        </Grid>
        <SheetSelectorG sheets={this.state.sheets}/>
      </Grid>
    );
  }
}

export default efileupload;
