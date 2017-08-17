import React, {PureComponent} from 'react';
import {StyleSheet, css} from 'aphrodite';
import { connect } from 'react-redux';
import { setPage } from '../actions';

import ImportForm from '../components/Sync/ImportForm';
import ExportForm from '../components/Sync/ExportForm';
import LegacySync from '../components/Sync/Legacy';

const styles = StyleSheet.create({
  sync: {
    maxWidth: '800px',
    margin: '0 auto'
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
  }
});

class SyncPage extends PureComponent {
  componentDidMount() {
    const {setPage} = this.props;
    setPage('sync');
  }


  render() {
    const {history} = this.props;

    return <div className={css(styles.sync)}>


            <div className={css(styles.part, styles.line)}>
              <h1>Export your currencies to another device</h1>
              <ExportForm />
            </div>


            <div className={css(styles.part, styles.line)}>

            <h1>Import your currencies from another device</h1>
            <ImportForm history={history} />
            </div>
            <div className={css(styles.part)}>

              <LegacySync  />
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

export default connect(null, mapDispatchToProps)(SyncPage);
