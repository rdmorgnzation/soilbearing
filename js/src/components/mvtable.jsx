import React from "react";
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function MVTable(props){
  return(
    <Box style={{padding:6}}>
      {Object.keys(props.results).length!=0 &&
        <TableContainer component={Paper}>
          <Table size="small">
          {!props.showValuesOnly &&
            <TableHead>
              <TableRow>
                <TableCell>Method</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            }
            <TableBody>
              {
                Object.keys(props.results).map((method)=>
                  <TableRow key="{method}">
                    <TableCell>{method}</TableCell>
                    <TableCell align="right">{props.results[method]}</TableCell>
                  </TableRow>
                )
              }              
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Box>
  )
}

export default MVTable;
