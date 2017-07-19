import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Row, Col, Input, Button, message } from 'antd';
import JSON5 from 'json5';
import Instascan from 'instascan';
import {importCoins} from '../actions';

class ImportForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
      importCode: ''
    }
  }

  scan() {
    const {importCoins, hide} = this.props;
    this.setState({ showVideo: true });

    let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
         scanner.addListener('scan', function (content) {
           try {
             const coins = JSON5.parse(content);
             importCoins(coins);

             message.success(`Import completed`);
             hide();

           } catch (e) {

           }

         });
         Instascan.Camera.getCameras().then( (cameras) => {
           if (cameras.length > 0) {
             scanner.start(cameras[0]);
           } else {
             console.error('No cameras found.');
           }
         }).catch(function (e) {
           console.error(e);
         });
  }

  importCode() {
    const {importField} = this.state;
    const {hide, importCoins} = this.props;

    try {
      console.log(importField);
      const coins = JSON5.parse(importField);
      importCoins(coins);

      message.success(`Import completed`);
      hide();

    } catch (e) {
      console.log(e);
    }

  }

  render() {

    return <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>

          <video id="preview" style={{ width: '100%', display: (this.state.showVideo) ? 'block' : 'none' }}></video>

          <Button type="primary" onClick={() => this.scan()}>Scan QR-code</Button>
        </Col>
        <Col className="gutter-row" span={12}>
          <p>Or paste your code:</p>
          <p><Input
                      type="textarea" placeholder="Code" value={this.state.importField} onChange={(e) =>this.setState({ importField: e.currentTarget.value })} autosize={{
                        minRows: 6,
                        maxRows: 10,
                      }}
                    /></p>
          <p><Button type="primary" onClick={this.importCode.bind(this)}>Import code</Button></p>

        </Col>

      </Row>



    </div>
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    importCoins: (coins) => {
      dispatch(importCoins(coins))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportForm);
