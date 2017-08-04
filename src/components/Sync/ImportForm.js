import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Row, Col, Input, Button, message } from 'antd';
import JSON5 from 'json5';
import QrReader from 'react-qr-reader'
import { StyleSheet, css } from 'aphrodite';
import LZ from "lz-string";


import {importData, setScanning} from '../../actions';


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

    const {importData, setScanning, isScanning, history} = this.props;

    console.log('scan');


    if(!isScanning) return;

    if(result) {
      try {
        let data = JSON.parse(LZ.decompressFromBase64(result));
        setScanning(false);
        importData(data);
        history.push('/');
        message.success(`Import completed`);
      } catch(e) {
        setScanning(false);
        console.log(e.message);
        message.error(`Something went wrong: ${result} ${e.message}`);
      }
    }
  }

  importCode() {
    const {importField} = this.state;
    const {importData, history} = this.props;


    try {
      const data = JSON5.parse(importField);
      importData(data);

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

            {(this.state.legacy) ? <div>
              <p className={css(styles.p)}>Your browser does not support QR-code scanning. Use the button below to take a picture of a QR-code. If nothing happens, try again with a better picture or copy/paste the code.</p>
              <p className={css(styles.p)}><Button type="primary" onClick={() => this.refs.qrReader.openImageDialog()}>Take picture of QR-code</Button></p></div> : null}



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
    importData: (data) => {
      dispatch(importData(data))
    },
    setScanning: (scanning) => {
      dispatch(setScanning(scanning));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportForm);
