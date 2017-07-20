import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import config from '../config';
import { setCurrency } from '../actions';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  label: {
    color: 'white',
    '@media (max-width: 600px)': {
      display: 'none'
    }
  }
})


const Option = Select.Option;

class CurrencyPicker extends PureComponent {
  render() {
    const { currency, setCurrency } = this.props;

      return (
        <div>
          <span className={css(styles.label)}>Currency: </span>&nbsp;
          <Select style={{ width: 120 }} onChange={setCurrency} value={currency}>
            {config.currencies.map((currency) => <Option value={currency} key={`currency-${currency}`}>{currency}</Option>)}
          </Select>
        </div>
      );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currency) => {
      dispatch(setCurrency(currency));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyPicker);
