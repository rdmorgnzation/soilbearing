import React from "react";

import Attributes from './attributes';

class results extends React.Component {
    render() {
        return (
            <div>
                <h2>Main content</h2>
                
                <h2>Attributes</h2>
                <Attributes />
            </div>
        );
    }
}

export default results;
