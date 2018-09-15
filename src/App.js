import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'content': null,
      'rawContent': null
    };

    this.openFile = this.openFile.bind(this);
    this.prepareContent = this.prepareContent.bind(this);
  }
  
  openFile(event) {
    let input = event.target,
      reader = new FileReader(),
      that = this;

    reader.onload = function () {
      that.setState({ 'content': that.prepareContent(reader.result) });
    };

    reader.readAsText(input.files[0]);
  }

  prepareContent(raw) {
    let lines = [],
      output = '',
      tmp = '';

    for (let i in raw) {
      if (raw[i].match(/\n/)) {
        lines.push(tmp);
        tmp = '';
      } else {
        tmp += raw[i];
      }
    }

    this.setState({'content': output});
  }

  render() {
    return (
      <div id="main">
      <input type="file" accept="text/plain" onChange={this.openFile} />
      <pre>
        {this.state.content}
      </pre>
      </div>
      );
  }
}

export default App;