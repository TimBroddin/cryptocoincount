import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Row, Col, Input, Button, message } from 'antd';
import JSON5 from 'json5';
import {importCoins} from '../actions';
import QrCode from 'qrcode-reader';

class ImportForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
      importCode: ''
    }
  }

  scan(evt) {
    const {hide, importCoins} = this.props;

    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const f = evt.target.files[0];

           // Only process image files.
           if (!f.type.match('image.*')) {
             return;
           }

           var reader = new FileReader();

           // Closure to capture the file information.
           reader.onload = ((theFile) => {
             return (e) => {
               const qr = new QrCode();
               qr.callback = (error, result) => {
                 if(error) {
                   message.error(error);
                   return;
                 }

                 try {
                   importCoins(JSON5.parse(result.result));
                   hide();
                   message.success(`Import completed`);
                 } catch(e) {
                   hide();
                   message.error('Something went wrong');
                 }


               }
               qr.decode(e.target.result);

             };
           })(f);

           // Read in the image file as a data URL.
           reader.readAsDataURL(f);


    }
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

          <input type="file" capture="camera" accept="image/*" onChange={this.scan.bind(this)}  />


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
