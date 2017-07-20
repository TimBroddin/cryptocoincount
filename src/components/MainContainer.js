import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {LocaleProvider, Layout, Menu, Icon} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { StyleSheet, css } from 'aphrodite';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import CurrencyPicker from './CurrencyPicker';
import ListPage from '../pages/List';
import SyncPage from '../pages/Sync';
import AboutPage from '../pages/About';

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
  logo: {
    display: 'flex',
  },
  h1: {
    color: 'white',
    fontSize: '24px',
    '@media (max-width: 600px)': {
      display: 'none'
    }
  },
  menu: {
    lineHeight: '64px',
    marginLeft: '20px',
    '@media (max-width: 600px)': {
      marginLeft: '0px'
    }
  },
  menuLabel: {
    '@media (max-width: 600px)': {
      display: 'none'
    }
  },
  menuItem: {
    fontSize: '14px',
    '@media (max-width: 600px)': {
      padding: '0px 15px',
    }
  },
})

class MainContainer extends PureComponent {
  componentDidMount() {
    const {fetchData, currency} = this.props;
    fetchData(currency);
  }

  render() {
    return   <Router>
    <LocaleProvider locale={enUS}>
      <Layout>
        <Header className={css(styles.header)}>
          <div className={css(styles.logo)}>
            <h1 className={css(styles.h1)}>CryptocoinCount</h1>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[]}
                className={css(styles.menu)}
              >
                <Menu.Item key="1" className={css(styles.menuItem)}><Link to="/"><Icon type="file-text" className={css(styles.menuIcon)} /> <span className={css(styles.menuLabel)}>List</span></Link></Menu.Item>
                <Menu.Item key="2" className={css(styles.menuItem)}><Link to="/sync"><Icon type="sync" className={css(styles.menuIcon)}  /> <span className={css(styles.menuLabel)}>Import/Export</span></Link></Menu.Item>
                <Menu.Item key="3" className={css(styles.menuItem)}><Link to="/about"><Icon type="question-circle-o" className={css(styles.menuIcon)}  /> <span className={css(styles.menuLabel)}>About</span></Link></Menu.Item>
              </Menu>
          </div>
          <div>
            <CurrencyPicker/>
          </div>
        </Header>
        <Content>
          <div className={css(styles.content)}>
            <Route exact path="/" component={ListPage}/>
            <Route path="/sync" component={SyncPage}/>
            <Route path="/about" component={AboutPage}/>

          </div>
        </Content>


        <Footer>&copy; 2017 Tim Broddin</Footer>
      </Layout>
    </LocaleProvider>
    </Router>
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
