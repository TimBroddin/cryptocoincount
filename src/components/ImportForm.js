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
      imported: false,
      importCode: '',
      legacy: (navigator && !navigator.mediaDevices)
    }
  }



  scan(result) {
    const {hide, importCoins} = this.props;

    if(this.state.imported) {
      return;
    }

    let coins = {}
    if(result) {
      try {
        let pairs = result.split('|');
        pairs.forEach((pair) => {
          let s = pair.split(':');
          coins[s[0]] = parseFloat(s[1]);
        })
        this.setState({ imported: true });


        importCoins(coins);
        hide();
        message.success(`Import completed`);
      } catch(e) {
        hide();
        message.error(`Something went wrong: ${result} ${e.message}`);
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
            delay={500}
            style={previewStyle}
            onScan={this.scan.bind(this)}
            onError={(err) => console.log(err)}
            legacyMode={this.state.legacy}
            facingMode="rear"
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
