import React from "react";

class results extends React.Component {
    render() {
        return (
            <div>
                    FavIcon (&nbsp;
                    <img style={{height:16}} src="/static/favicon.ico"/>
                    &nbsp;): &nbsp;
                    <span>
                      Icons made by &nbsp;
                      <a href="https://www.flaticon.com/authors/ultimatearm" title="ultimatearm">
                        ultimatearm
                      </a>&nbsp;
                      from&nbsp;
                      <a href="https://www.flaticon.com/" title="Flaticon">
                        www.flaticon.com
                      </a>
                    </span>
            </div>
        );
    }
}

export default results;
