import React, { PureComponent } from "react";
import changes from '../changelog';
import { Input } from 'antd';
const { TextArea } = Input;



class Changelog extends PureComponent {
  renderChanges() {
    let text = '';
    changes.reverse().forEach((change) => {
      text += `Version ${change.version} (${change.date})`;
      text += "\n";
      change.changes.forEach((c) => {
        text += `- ${c}`;
        text += "\n";
      });
      text += "\n";
    });
    return text;
  }

  render() {
    return (
      <div>
        <TextArea rows={20} value={this.renderChanges()} />
      </div>
    );
  }
}

export default Changelog;
