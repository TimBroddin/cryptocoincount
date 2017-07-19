import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { QRCode } from 'react-qr-svg';
import { Row, Col, Input } from 'antd';
import JSON5 from 'json5';

class Export extends PureComponent {
  render() {
    const { coins } = this.props;
    let str = [];
    let json = {};


    coins.forEach((coin) => {
      str.push(`${coin.id}:${coin.amount}`);
      json[coin.id] = coin.amount;

    });

    return <div>
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <p>Scan this QR-code:</p>
          <QRCode
                              bgColor="#FFFFFF"
                              fgColor="#000000"
                              level="L"
                              style={{ width: 256 }}
                              value={str.join('|')}
                          />
        </Col>
        <Col className="gutter-row" span={12}>
          <p>Or copy this code:</p>
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
    coins: state.coins
  }
}

export default connect(mapStateToProps)(Export);
