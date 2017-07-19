import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Layout, Menu} from 'antd';

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
        <div style={{ display: 'flex'}}>
        <h1 style={{
          color: 'white'
        }}>CryptocoinCount</h1>
        <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: '64px', marginLeft: '30px' }}
                selectedKeys={['1']}
              >
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">About</Menu.Item>
                <Menu.Item key="3">Donate</Menu.Item>

              </Menu>
            </div>

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
