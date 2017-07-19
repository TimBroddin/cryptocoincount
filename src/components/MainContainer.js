import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {LocaleProvider, Layout, Modal, Button} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { StyleSheet, css } from 'aphrodite';


import CurrencyPicker from './CurrencyPicker';
import TotalWorth from './TotalWorth';
import Form from './Form';
import Table from './Table';
import ExportForm from './ExportForm';
import ImportForm from './ImportForm';

import {fetchData} from '../actions';

const {Header, Content, Footer} = Layout;

const styles = StyleSheet.create({
  header: {
    background: '#404040',
    padding: '0 50px',
    height: '64px',
    lineHeight: '64px',
    display: 'flex',
    justifyContent: 'space-between',
    '@media (max-width: 600px)': {
      padding: '0 10px'
    }
  },
  content: {
    padding: '50px',
    minHeight: '80vh',
    '@media (max-width: 600px)': {
      padding: '10px'
    }
  },
  h1: {
    color: 'white',
    fontSize: '24px',
    '@media (max-width: 600px)': {
      fontSize: '16px'
    }
  }
})

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
        <Header className={css(styles.header)}>

          <h1 className={css(styles.h1)}>CryptocoinCount</h1>

          <div>
            <CurrencyPicker/>
          </div>
        </Header>
        <Content>
          <div className={css(styles.content)}>
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
          <ExportForm />
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
