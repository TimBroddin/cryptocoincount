import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Alert, Button, Spin } from 'antd';
import { exportData } from '../../actions';

import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  p: {
    marginBottom: '10px'
  },
  alert: {
    margin: '20px 0px',
  },
  characters: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 50px',
    margin: '50px 0px',
  },
  character: {
    backgroundColor: 'white',
    padding: '30px 40px',
    fontSize: '36px',
    borderRadius: '30px',
    "@media (max-width: 600px)": {
      padding: '10px',
      fontSize: '18px'
    }
  },
  center: {
    textAlign: 'center'
  }
})

class ExportForm extends PureComponent {
  componentDidMount() {
    const {exportData} = this.props;
    exportData();
  }

  renderCode() {
    const characters = this.props.exportProps.code.split('');

    return <div className={css(styles.characters)}>
      {characters.map((l, k) => {
        return <div key={`char-${l}-${k}`} className={css(styles.character)}>{l}</div>
      })}
    </div>

  }

  render() {
    const { exportProps, exportData } = this.props;


    return <div>
      <Alert className={css(styles.alert)} message="Surf to this page on another device and copy the code below." type="info" showIcon />
      {(exportProps.loading || !exportProps.code) ? <Spin /> : <div>
        {this.renderCode()}
        <p className={css(styles.p, styles.center)}>
          <Button type="primary" onClick={() => exportData()}>Refresh</Button>
        </p>
        
      </div>}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    exportProps: state.export
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    exportData: () => {
      dispatch(exportData());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportForm);
