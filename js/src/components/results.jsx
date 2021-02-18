import React from "react";
import cookie from "react-cookies";
import actionCreater from '../redux/actionCreators';
import { connect } from "react-redux";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ForwardIcon from '@material-ui/icons/Forward';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Show results from calculation
class calcResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {results: {}}
  }

  calculate(){
    if(!this.props.sheet)
      _SB.toast.error("Data not set");
    if(!this.props.foundation)
      _SB.toast.error("Foundation info not set");
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
    return (
      <Paper>
        <Typography variant="h5" component="h2">
          Calculate Result From Excel And Foundation Data
        </Typography>
        <Divider/>
        <Button
        variant="contained"
        color="primary"
        endIcon={<ForwardIcon/>}
        onClick={this.calculate.bind(this)}
        style={{margin:3}}
        >
        Calculate
        </Button>
        <Box style={{padding:6}}>
          {Object.keys(this.state.results).length!=0 &&
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Method</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.keys(this.state.results).map((method)=>
                      <TableRow key="{method}">
                        <TableCell>{method}</TableCell>
                        <TableCell align="right">{this.state.results[method]}</TableCell>
                      </TableRow>
                    )
                  }              
                </TableBody>
              </Table>
            </TableContainer>
          }
        </Box>
      </Paper>
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
      <Paper>
        <Typography variant="h5" component="h2">
          Calculate Interpolated Data From Saved Results
        </Typography>
        <Divider/>

      </Paper>
    )
  }
}

class results extends React.Component {
  render() {
    return (
      <Box style={{padding: 5}}>
        <CalcResults/><br/>
        <LocResults/>
      </Box>
    );
  }
}

export default results;
