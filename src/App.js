import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { configureAmplify, SetS3Config } from "./services";
import Storage from "@aws-amplify/storage";

import logo from './logo.svg';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

class App extends Component {
  state = {
    imageName: "",
    imageFile: "",
    response: "",
    uploadProgress: null,
  };

  uploadImage = () => {
    SetS3Config("rnd-dl-v2-amplify", "protected");
    const foo = this
    this.setState({uploadProgress: foo.state.uploadProgress})
    Storage.put(`userimages/${this.upload.files[0].name}`,
                this.upload.files[0],
                { contentType: this.upload.files[0].type,
                  progressCallback(progress) {
                    let prog = 100.00 * progress.loaded / progress.total
                    foo.setState({uploadProgress: `Progress: ${prog.toFixed(2)}%`})
                    } 
                })
      .then(result => {
        this.upload = null;
        this.setState({ uploadProgress: null });
        this.setState({ response: "Success uploading file!" });
        console.log(result)
      })
      .catch(err => {
        this.setState({ response: `Cannot upload file: ${err}` });
      });
  };
  render() {
    return (
      <div className="App">
        
          <h2>S3 Upload example...</h2>
          <input
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            ref={ref => (this.upload = ref)}
            onChange={e =>
              this.setState({
                imageFile: this.upload.files[0],
                imageName: this.upload.files[0].name
              })
            }
          />
          <input value={this.state.imageName} placeholder="Select file" />
          <button
            onClick={e => {
              this.upload.value = null;
              this.upload.click();
            }}
            loading={this.state.uploading}
          >
            Browse
          </button>

          <button onClick={this.uploadImage.bind(this)}> Upload File </button>

          {!!this.state.response && <div>{this.state.response}</div>}
          {<div>{this.state.uploadProgress}</div>}
      </div>
    );
  }
}

export default withAuthenticator(App, true);
