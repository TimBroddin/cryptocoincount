import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {QRCode} from 'react-qr-svg';
import {Row, Col, Input} from 'antd';
import JSON5 from 'json5';
import {StyleSheet, css} from 'aphrodite';

const styles = StyleSheet.create({
  p: {
    marginBottom: '10px'
  },
  center: {
    textAlign: 'center',
  },
  code: {
    opacity: 1,
    transition: 'all 1s ease-in',
  },
  hidden: {
    opacity: 0
  }
})

class ExportForm extends PureComponent {
  render() {
    const {coins, isScanning} = this.props;
    let str = [];
    let json = {};

    coins.forEach((coin) => {
      str.push(`${coin.id}:${coin.amount}`);
      json[coin.id] = coin.amount;

    });

    return <div>
      <Row gutter={16}>
        <Col md={24} lg={12}>
          <div className={css(styles.code,
          (isScanning)
            ? styles.hidden
            : styles.code)}>

            <p className={css(styles.p)}>Scan this QR-code:</p>
            <QRCode bgColor="#FFFFFF" fgColor="#000000" level="L" style={{
              width: 256
            }} value={str.join('|')} className={css(styles.p)}/>
          </div>

        </Col>
        <Col md={24} lg={12}>
          <p className={css(styles.p)}>Or copy this code:</p>
          <Input type="textarea" placeholder="Code" value={JSON5.stringify(json, null, 4)} autosize={{
            minRows: 6,
            maxRows: 10
          }}/>

        </Col>

      </Row>

    </div>
  }
}

const mapStateToProps = (state) => {
  return {coins: state.coins, isScanning: state.sync.isScanning}
}

export default connect(mapStateToProps)(ExportForm);
