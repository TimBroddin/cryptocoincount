import React, {PureComponent} from 'react';
import {Form, Icon, Input, Button, Select} from 'antd';
import { StyleSheet, css } from 'aphrodite';

import {connect} from 'react-redux';
import {addCoin} from '../actions';

const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const styles = StyleSheet.create({
  select: {
    width: '200px',
    '@media (max-width: 600px)': {
      width: '80px'
    }
  }
});


class CoinForm extends PureComponent {
  handleSubmit(e) {
    const {addCoin, form} = this.props;

    e.preventDefault();
      form.validateFields((err, values) => {
        values.amount = parseFloat(values.amount.replace(',', '.'));
        addCoin(values.coin, values.amount);
        form.resetFields();
      });
  }


  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    const {data} = this.props;

    const coinError = isFieldTouched('coin') && getFieldError('coin');
    const amountError = isFieldTouched('amount') && getFieldError('amount');

    return <div>
      <h1>Add a coin</h1>
    <Form layout="inline" onSubmit={this.handleSubmit.bind(this)}>
      <FormItem validateStatus={coinError
        ? 'error'
        : ''} help={coinError || ''}>
        {getFieldDecorator('coin', {
          rules: [
            {
              required: true,
              message: 'Please select a coin'
            }
          ]
        })(
          <Select showSearch className={css(styles.select)} placeholder="Select a coin" optionFilterProp="children" filterOption={(input, option) => option.props.children.join(' ').toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {data.map((coin) => {
              return <Option value={coin.id} key={`coin-${coin.id}`}>{coin.name}{" "}
                ({coin.symbol})</Option>
            })}
          </Select>

        )}
      </FormItem>
      <FormItem validateStatus={amountError
        ? 'error'
        : ''} help={amountError || ''}>
        {getFieldDecorator('amount', {
          rules: [
            {
              required: true,
              message: 'Please select an amount'
            }
          ]
        })(
          <Input prefix={<Icon type="calculator" style={{ fontSize: 13 }} />} placeholder="Amount" />

        )}
      </FormItem>

      <FormItem>
         <Button
           type="primary"
           htmlType="submit"
           disabled={hasErrors(getFieldsError())}
         >
           <Icon type="plus-square-o" style={{ fontSize: 13 }} /> Add
         </Button>
       </FormItem>


    </Form>
  </div>
  }
}

const mapStateToProps = (state) => {
  return {data: state.data}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCoin: (coin, amount) => {
      dispatch(addCoin(coin, amount));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(CoinForm));
