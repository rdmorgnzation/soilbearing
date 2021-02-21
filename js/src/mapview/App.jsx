import React from "react";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputOverlay from './InputOverlay';
import Canvas from './Canvas';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { ThemeProvider } from '@material-ui/core/styles';

export class App extends React.Component {
  loadFile(file){
    _SB.storedFetch(file)
    .then(res => this.setState({file: res}));
  }

  constructor(props){
    super(props);
    let selectedFile=props.selectedFile;
    if(!selectedFile){
      // Select first option
        if(props.fileList){
          selectedFile=props.fileList[0];
          selectedFile.id=0;
          props.setSelectedFile(selectedFile);
        }
      }
    this.state = {file: null};
    if(selectedFile)
      this.loadFile(selectedFile.file);
  }

  componentDidUpdate(prevProps) {
    //Config updated
    if (prevProps.fileList !== this.props.fileList) {
      const selectedFile=this.props.fileList[0];
      selectedFile.id = 0;
      this.props.setSelectedFile(selectedFile);
      this.loadFile(selectedFile.file);
    }
    if (prevProps.selectedFile !== this.props.selectedFile) {
      this.loadFile(this.props.selectedFile.file);
    }
  };
  
  changeFile(id) {
   return () =>
    {
      const selectedFile=this.props.fileList[id];
      selectedFile.id = id;
      this.props.setSelectedFile(selectedFile);
      this.setState({file: null});
    }
  }
  
  render() {
    // Show loader till file is loaded
    // and leaflet is available
    if(this.state.file && window.L){
      return(
        <Box display='flex' height='100%' >
          <Paper style={{width:200,overflow:'auto'}}>
            <List>
              <ListItem>
                <ListItemText primary="Latitude" secondary={(this.props.latitude||0).toFixed(6)} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Longitude" secondary={(this.props.longitude||0).toFixed(6)} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Depth" secondary={this.props.depth} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Capacity" secondary={(this.props.BC||0).toFixed(2)} />
              </ListItem>
            <Divider/>
            <Typography>Load file</Typography>
            {this.props.fileList.map((d,i)=>
              <ListItem button key={i} onClick={this.changeFile(i).bind(this)}>
                <ListItemText primary={d.text} secondary={d.description} />
              </ListItem>
            )}
            </List>            
          </Paper>
          <ThemeProvider theme={_SB.themes.light}>
            <Box flexGrow={1} style={{position:'relative'}}>
                <InputOverlay file={this.state.file}/>
                <Canvas file={this.state.file}/>
            </Box>
          </ThemeProvider>
        </Box>
      );
    }else{
      return (
        <Box style={{height:'100%', textAlign:'center'}}>
          <CircularProgress />
        </Box>
        );
    }
  }
};

import { connect } from "react-redux";
const mapStateToProps = state => {
  return {
    depth: state.state.depth,
    latitude: state.state.latitude,
    longitude: state.state.longitude,
    BC: state.state.BC,
    selectedFile: state.state.selectedFile,
    fileList: state.config.mapFiles,    
  };
};

import actionCreater from '../redux/actionCreators';
const mapDispatchToProps = dispatch => ({
  setSelectedFile: (d) => dispatch(actionCreater.setState('selectedFile',d)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
