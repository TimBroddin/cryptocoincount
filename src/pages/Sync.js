import React, {PureComponent} from 'react';
import {StyleSheet, css} from 'aphrodite';
import { Alert } from 'antd';

import ImportForm from '../components/ImportForm';
import ExportForm from '../components/ExportForm';

const styles = StyleSheet.create({
  sync: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  part: {
    padding: '0 0 50px 0',
    marginTop: '25px'
  },
  line: {
    borderBottom: '1px solid #DDD',
    marginBottom: '50px'
  }
});

class SyncPage extends PureComponent {

  render() {
    return <div className={css(styles.sync)}>
      <Alert
        message="Everything is safe!"
        description={ <div><strong>CryptocoinCount.com</strong> saves all its data locally on your device. Because we value your privacy nothing gets sent to our server ever. If you want to sync data between two devices you can use the QR-code below, or copy the code.</div>}
        type="info"
        showIcon
      />

            <div className={css(styles.part, styles.line)}>
              <h1>Export your currencies to another device</h1>
              <ExportForm />
            </div>


            <div className={css(styles.part)}>

            <h1>Import your currencies from another device</h1>
            <ImportForm />
            </div>
          </div>

  }
}

export default SyncPage;
