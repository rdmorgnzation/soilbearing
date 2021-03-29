import React from "react";
import {TextEditor} from "react-data-grid";

// Just proxy or filter
function FilteredInput(props){
  // Return new value or fale
  function filter(key, value){
    if(key=='GI'){
      if(/^[a-zA-Z]*$/.test(value))
        return value.toUpperCase();
      else
        return false;
    }else{
      if(isNaN(value))
        return false;
    }
    return value;
  }

  return <TextEditor
          row={props.row}
          column={props.column}
          onRowChange={(newRow)=>{
            let filtered = filter(props.column.key, newRow[props.column.key]);
            if(filtered)
              props.onRowChange({
                ...newRow,
                [props.column.key]: filtered,
                });
          }}
          onClose={props.onClose}
        />
}

export default FilteredInput;
