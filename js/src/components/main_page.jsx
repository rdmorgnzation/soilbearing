import React from "react";

import Attributes from './attributes';

class results extends React.Component {
  render() {
    return (
      <div>
        <h2>How to use</h2>
        - Upload excel file if available(optional)<br/>
        - Edit datas as necessary<br/>
        - Calculate result<br/>
        - Map page is available for Bearing capacity map<br/>
        <a href="https://github.com/rdmorgnzation/soilbearing">Click here</a> to go to github page.
        <h2>Attributes</h2>
        <Attributes />
      </div>
    );
  }
}

export default results;
