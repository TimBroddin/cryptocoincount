import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import config from '../config';
import { setCurrency } from '../actions';

const Option = Select.Option;

class CurrencyPicker extends PureComponent {
  render() {
    const { currency, setCurrency } = this.props;

      return (
        <div>
          <span style={{ color: 'white' }}>Currency: </span>&nbsp;
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
