import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { QRCode } from 'react-qr-svg';
import { Row, Col, Input } from 'antd';
import JSON5 from 'json5';
import LZ from "lz-string";
import stringify from "json-stringify-safe";

import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  p: {
    marginBottom: '10px'
  }
})

class ExportForm extends PureComponent {
  render() {
    const { coins, watchlist } = this.props;
    let json = {
      coins,
      watchlist
    };

    const code =  LZ.compressToBase64(stringify(json));


    return <div>
      <Row gutter={16}>
        <Col md={24} lg={12}>
          <p className={css(styles.p)}>Scan this QR-code:</p>
          <QRCode
                              bgColor="#FFFFFF"
                              fgColor="#000000"
                              level="L"
                              style={{ width: 256 }}
                              value={code}
                               className={css(styles.p)}
                          />
        </Col>
        <Col  md={24} lg={12}>
          <p className={css(styles.p)}>Or copy this code:</p>
          <Input
                      type="textarea" placeholder="Code" value={JSON5.stringify(json, null, 4)} autosize={{
                        minRows: 6,
                        maxRows: 10,
                      }}
                    />

        </Col>

      </Row>



    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    coins: state.coins,
    watchlist: state.watchlist
  }
}

export default connect(mapStateToProps)(ExportForm);
