import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {LocaleProvider, Layout, Menu, Modal, Button} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import CurrencyPicker from './CurrencyPicker';
import TotalWorth from './TotalWorth';
import Form from './Form';
import Table from './Table';
import Export from './Export';
import ImportForm from './ImportForm';

import {fetchData} from '../actions';

const {Header, Content, Footer} = Layout;

class MainContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showExport: false
    }
  }

  componentDidMount() {
    const {fetchData, currency} = this.props;
    fetchData(currency);
  }

  render() {
    return <LocaleProvider locale={enUS}>
      <Layout>
        <Header style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex'
          }}>
            <h1 style={{
              color: 'white'
            }}>CryptocoinCount</h1>
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
            <Form/>
            <Table/>

            <div style={{
              marginTop: '100px'
            }}>
              <Button onClick={() => this.setState({showExport: true})}>Export</Button> {" "}
              <Button onClick={() => this.setState({showImport: true})}>Import</Button>

            </div>

          </div>
        </Content>

        <Modal title="Export" visible={this.state.showExport} footer={null} onCancel={() => this.setState({showExport: false})} width="600">
          <Export/>
        </Modal>

        <Modal title="Import" visible={this.state.showImport} footer={null} onCancel={() => this.setState({showImport: false})} width="600">
          <ImportForm hide={() => this.setState({showImport: false})}/>
        </Modal>


        <Footer>&copy; 2017 Tim Broddin</Footer>
      </Layout>
    </LocaleProvider>
  }
}

const mapStateToProps = (state) => {
  return {currency: state.currency}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (currency) => {
      dispatch(fetchData(currency));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
