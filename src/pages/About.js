import React, {PureComponent} from 'react';
import { Row, Col, Icon } from 'antd';
import {StyleSheet, css} from 'aphrodite';
import { connect } from 'react-redux';
import { setPage } from '../actions';

const styles = StyleSheet.create({
  about: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  p: {
    marginBottom: '20px',
    fontSize: '16px'
  },
  part: {
    padding: '0 0 50px 0',
    marginTop: '25px',
    '@media (max-width: 600px)': {
      textAlign: 'center'
    }
  },
  line: {
    borderBottom: '1px solid #DDD',
    marginBottom: '50px'
  },
  qr: {
    maxHeight: '200px',
    maxWidth: '100%'
  },
  row: {
    marginBottom: '35px'
  },
});

class AboutPage extends PureComponent {
  componentDidMount() {
    const {setPage} = this.props;
    setPage('about');
  }

  render() {
    return <div className={css(styles.about)}>
      <div className={css(styles.part, styles.line)}>
        <h1>About</h1>

        <p className={css(styles.p)}>
          <strong>CryptocoinCount</strong> is created by me, Tim Broddin, a creative developer from Belgium. I was unhappy with the solutions I've found on the Internet and decided to create my own.</p>

        <p className={css(styles.p)}>All the data displayed is sourced from <a href="https://coinmarketcap.com" target="_blank" rel="noopener noreferrer">Coinmarketcap</a>.</p>

        <p className={css(styles.p)}>Created with React, Redux and <Icon type="heart" style={{ color: '#af1313'}} />.</p>
      </div>
      <div className={css(styles.part, styles.line)}>

        <h1>Roadmap</h1>

        <ul>
          <li>Native apps</li>
        </ul>
      </div>
      <div className={css(styles.part)}>

        <h1>Donate</h1>

        <p className={css(styles.p)}>If you want to donate something to help with the development of this site, you can do so by sending some coins to me. Thank you very much!
        </p>

        <Row gutter={16} className={css(styles.row)}>
          <Col md={12}>
            <p className={css(styles.coinName)}><strong>Bitcoin</strong></p>
            <p><img className={css(styles.qr)} alt="Bitcoin code" src={ require('../images/bitcoin.png') }
 /></p>
            <p className={css(styles.address)}>1NNdEmBgnYzFoyV6517QUr8xkWCTsRgYfS</p>
          </Col>

          <Col md={12}>
            <p className={css(styles.coinName)}><strong>Ethereum</strong></p>
            <p><img className={css(styles.qr)} alt="Ethereum code"  src={ require('../images/ethereum.png') } /></p>
            <p className={css(styles.address)}>0x4f46b7fDDc29A6BCAD07c73D98FBB101CaFAb58d</p>
          </Col>
        </Row>
        <Row gutter={16}>


          <Col md={12}>
            <p className={css(styles.coinName)}><strong>Litecoin</strong></p>
            <p><img className={css(styles.qr)} alt="Litecoin code"  src={ require('../images/litecoin.png') } /></p>
            <p className={css(styles.address)}>LUyVHHoALwr2hznHTrmLRMXLVyUR28y1TJ</p>
          </Col>


        </Row>

      </div>
    </div>

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (page) => {
      dispatch(setPage(page));
    }
  }
}

export default connect(null, mapDispatchToProps)(AboutPage);
