import React, { Component, PropType } from "react";
import cookie from "react-cookies";


class efileupload extends React.Component {
    render() {
        return (
            <div>
                <form method="POST" encType="multipart/form-data">
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

export default efileupload;