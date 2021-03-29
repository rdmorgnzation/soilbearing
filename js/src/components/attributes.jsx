import React from "react";
import Link from '@material-ui/core/Link';

class results extends React.Component {
  render() {
    return (
      <div>
        FavIcon (&nbsp;
        <img style={{height:16}} src="/static/favicon.ico"/>
        &nbsp;): &nbsp;
        <span>
          Icons made by &nbsp;
          <Link href="https://www.flaticon.com/authors/ultimatearm" title="ultimatearm">
            ultimatearm
          </Link>&nbsp;
          from&nbsp;
          <Link href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </Link>
        </span>
      </div>
    );
  }
}

export default results;
