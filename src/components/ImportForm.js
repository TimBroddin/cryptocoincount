import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Row, Col, Input, Button, message } from 'antd';
import JSON5 from 'json5';
import {importCoins} from '../actions';
import QrReader from 'react-qr-reader'


class ImportForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showVideo: false,
      importCode: '',
      legacy: (navigator && !navigator.mediaDevices)
    }
  }



  scan(result) {
    const {hide, importCoins} = this.props;
    console.log(result);
    if(result) {
      try {
        importCoins(JSON5.parse(result.result));
        hide();
        message.success(`Import completed`);
      } catch(e) {
        hide();
        message.error('Something went wrong');
      }
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
    const previewStyle = {
          height: 100,
          width: '100%',
        }


    return <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={12} >
          <p>Scan QR-code:</p>
          <div>
          <QrReader
            delay={100}
            style={previewStyle}
            onScan={this.scan.bind(this)}
            onError={(err) => console.log(err)}
            legacyMode={this.state.legacy}
            ref="qrReader"
            >

            </QrReader>

            {(this.state.legacy) ? <Button type="primary" onClick={() => this.refs.qrReader.openImageDialog()}>Take QR-code</Button> : null}

          </div>
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
