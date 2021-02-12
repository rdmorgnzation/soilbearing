import React, { Component, PropType } from "react";
import cookie from "react-cookies";


class efileupload extends React.Component {
    constructor(props){
        super(props);
    }

    handleSubmit(event){
        event.preventDefault();
        const form = this.refs.submit_form;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "./file_upload");
        xhr.onload = function(event){ 
            alert("Success, server responded with: " + event.target.response); // raw response
        }; 
        // or onerror, onabort
        var formData = new FormData(form);
        xhr.send(formData);
    }

    render() {
        return (
            <div>
                <form method="POST" encType="multipart/form-data" onSubmit={this.handleSubmit.bind(this)} ref='submit_form'>
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
