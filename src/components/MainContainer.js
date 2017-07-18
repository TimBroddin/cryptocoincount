import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Layout} from 'antd';

import CurrencyPicker from './CurrencyPicker';
import TotalWorth from './TotalWorth';
import Form from './Form';
import Table from './Table';

import {fetchData} from '../actions';

const {Header, Content, Footer} = Layout;

class MainContainer extends PureComponent {
  componentDidMount() {
    const {fetchData, currency} = this.props;
    fetchData(currency);
  }

  render() {
    return <Layout>
      <Header style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <h1 style={{
          color: 'white'
        }}>CryptoCounter</h1>
        <div>
          <CurrencyPicker/>
        </div>
      </Header>
      <Content>
        <div style={{
          padding: '50px',
          minHeight: '80vh'
        }}>
          <TotalWorth/>
          <Form />
          <Table />
        </div>
      </Content>
      <Footer>&copy; 2017 Tim Broddin</Footer>
    </Layout>
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (currency) => {
      dispatch(fetchData(currency));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
