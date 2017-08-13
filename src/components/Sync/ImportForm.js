import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Alert, Button, message } from 'antd';
import { StyleSheet, css } from 'aphrodite';


import {importData} from '../../actions';


const styles = StyleSheet.create({
  p: {
    marginBottom: '10px'
  },
  alert: {
    margin: '20px 0px',
  },
  input: {
    padding: '20px',
    width: '100%',
    textAlign: 'center',
    fontSize: '36px'
  },
  center: {
    textAlign: 'center'
  }
})

class ImportForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { history } = this.props;

    if(nextProps.importReducer.success !== this.props.importReducer.success) {
      if(nextProps.importReducer.success) {
        message.success(`Import completed`);
        history.push('/');
      } else {
        message.error(`Something went wrong.`);
        this.setState({ code: ''});

      }
    }
  }

  import() {
    const {importData} = this.props;
    importData(this.state.code);
  }

  render() {
    const {importReducer} = this.props;

    return <div>
      <Alert className={css(styles.alert)} message="Enter the code displayed on your other device below." type="info" showIcon />


      <p className={css(styles.p)}><input className={css(styles.input)} type="text" value={this.state.code} onChange={e => this.setState({ code: e.target.value.toUpperCase() })} /></p>

      <p className={css(styles.p, styles.center)}><Button type="primary" onClick={() => this.import()} disabled={this.state.code.length !== 6 && !importReducer.loading}>Sync</Button></p>


    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    importReducer: state.import
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    importData: (code) => {
      dispatch(importData(code))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportForm);
