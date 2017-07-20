import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {LocaleProvider, Layout, Menu, Icon} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import { StyleSheet, css } from 'aphrodite';
import {
   Router,
  Route,
  Link
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import ReactGA from 'react-ga';



import CurrencyPicker from './CurrencyPicker';
import ListPage from '../pages/List';
import SyncPage from '../pages/Sync';
import AboutPage from '../pages/About';

import {fetchData} from '../actions';

const {Header, Content, Footer} = Layout;
ReactGA.initialize('UA-102915004-1');


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
  logoImage: {
    maxHeight: '54px',
    marginRight: '10px'
  },
  h1: {
    color: 'white',
    fontSize: '24px',
    '@media (max-width: 600px)': {
      display: 'none'
    },
    display: 'flex',
    alignItems: 'center'
  },
  menuLink: {
    color: 'white',
    textDecoration: 'none'
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
  footer: {
    textAlign: 'center'
  },
  social: {
    margin: '0 auto',
    maxWidth: '200px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px'
  }
})

const history = createHistory()
history.listen((location, action) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});


class MainContainer extends PureComponent {
  componentDidMount() {
    const {fetchData, currency} = this.props;
    fetchData(currency);
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);

    if(window.FB) {
      window.FB.XFBML.parse();
    }

    if(window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }



  }

  render() {
    const {navigation} = this.props;

    return   <Router history={history} >
    <LocaleProvider locale={enUS}>
      <Layout>
        <Header className={css(styles.header)}>
          <div className={css(styles.logo)}>
            <h1 className={css(styles.h1)}>
              <img src={require('../images/coin.png')} alt="Coin" className={css(styles.logoImage)} />
              <Link to="/" className={css(styles.menuLink)}>CryptocoinCount</Link>
            </h1>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[`nav-${navigation}`]}
                className={css(styles.menu)}
              >
                <Menu.Item key="nav-home" className={css(styles.menuItem)}><Link to="/"><Icon type="home" className={css(styles.menuIcon)} /> <span className={css(styles.menuLabel)}>Home</span></Link></Menu.Item>
                <Menu.Item key="nav-sync" className={css(styles.menuItem)}><Link to="/sync"><Icon type="sync" className={css(styles.menuIcon)}  /> <span className={css(styles.menuLabel)}>Import/Export</span></Link></Menu.Item>
                <Menu.Item key="nav-about" className={css(styles.menuItem)}><Link to="/about"><Icon type="question-circle-o" className={css(styles.menuIcon)}  /> <span className={css(styles.menuLabel)}>About</span></Link></Menu.Item>
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


        <Footer className={css(styles.footer)}>


          <div className={css(styles.social)}>
            <div>
              <iframe title="Reddit" src={`//www.redditstatic.com/button/button2.html?url=${encodeURIComponent('https://cryptocoincount.com')}`} height="69" width="51" scrolling="no" frameBorder="0"></iframe>
            </div>
            <div className="fb-like" data-href="https://cryptocoincount.com" data-layout="box_count" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>
            <div>
              <a className="twitter-share-button" data-size="large" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://cryptocoincount.com')}&text=${encodeURIComponent('Keep track of your cryptocoins with CryptocoinCount:')}`}>Tweet</a>
            </div>
          </div>

          <p>&copy; 2017 Tim Broddin</p>
        </Footer>
      </Layout>
    </LocaleProvider>
    </Router>
  }
}

const mapStateToProps = (state) => {
  return {currency: state.currency, navigation: state.navigation}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (currency) => {
      dispatch(fetchData(currency));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
