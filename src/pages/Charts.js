import React, {PureComponent} from 'react';
import {StyleSheet, css} from 'aphrodite';
import { connect } from 'react-redux';
import WorthChart from '../components/Charts/WorthChart';
import SpreadChart from '../components/Charts/SpreadChart';
import { setPage } from '../actions';

const styles = StyleSheet.create({
  charts: {
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

class ChartsPage extends PureComponent {
  componentDidMount() {
    const {setPage} = this.props;
    setPage('charts');
  }

  render() {
    return <div className={css(styles.charts)}>
      <WorthChart />
      <SpreadChart />
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

export default connect(null, mapDispatchToProps)(ChartsPage);
