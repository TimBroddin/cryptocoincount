import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Row, Col, Input, Button, message } from 'antd';
import JSON5 from 'json5';
import {importCoins, setScanning} from '../actions';
import QrReader from 'react-qr-reader'
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  p: {
    marginBottom: '10px'
  }
})

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
    const {importCoins, setScanning, isScanning, history} = this.props;

    if(!isScanning) return;

    let coins = {}
    if(result) {
      try {
        let pairs = result.split('|');
        pairs.forEach((pair) => {
          let s = pair.split(':');
          coins[s[0]] = parseFloat(s[1]);
        })
        setScanning(false);


        importCoins(coins);
        history.push('/');

        message.success(`Import completed`);
      } catch(e) {
        setScanning(false);
        message.error(`Something went wrong: ${result} ${e.message}`);
      }
    }
  }

  importCode() {
    const {importField} = this.state;
    const {importCoins, history} = this.props;


    try {
      const coins = JSON5.parse(importField);
      importCoins(coins);

      message.success(`Import completed`);
      history.push('/');

    } catch (e) {
      console.log(e);
    }

  }

  render() {
    const { isScanning, setScanning } = this.props;
    const previewStyle = {
          width: '100%',
        }


    return <div>
      <Row gutter={16}>
        <Col md={24} lg={12} >
          <p className={css(styles.p)}>Scan QR-code:</p>
          {(isScanning) ? <div>

          <QrReader
            delay={500}
            style={previewStyle}
            onScan={this.scan.bind(this)}
            onError={(err) => console.log(err)}
            legacyMode={this.state.legacy}
            facingMode="rear"
            ref="qrReader"
            className={css(styles.p)}
            >

            </QrReader>

            {(this.state.legacy) ? <Button type="primary" onClick={() => this.refs.qrReader.openImageDialog()}>Take QR-code</Button> : null}

          </div>
          : <Button type="primary" onClick={() => setScanning(true) }>Scan</Button>
        }
        </Col>
        <Col md={24} lg={12}>
          <p className={css(styles.p)}>Or paste your code:</p>
          <p className={css(styles.p)}><Input
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
    isScanning: state.sync.isScanning
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    importCoins: (coins) => {
      dispatch(importCoins(coins))
    },
    setScanning: (scanning) => {
      dispatch(setScanning(scanning));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportForm);
