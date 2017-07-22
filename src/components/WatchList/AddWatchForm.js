import React, {PureComponent} from 'react';
import {Form, Icon, Button, Select} from 'antd';
import { StyleSheet, css } from 'aphrodite';

import {connect} from 'react-redux';
import {addToWatchList} from '../../actions';

const FormItem = Form.Item;
const Option = Select.Option;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const styles = StyleSheet.create({
  form: {
    marginTop: '50px'
  },
  select: {
    width: '200px',
    '@media (max-width: 600px)': {
      width: '100px'
    }
  },
});


class AddWatchForm extends PureComponent {
  handleSubmit(e) {
    const {addToWatchList, form} = this.props;

    e.preventDefault();
      form.validateFields((err, values) => {
        addToWatchList(values.coin);
        form.resetFields();
      });
  }


  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    const {data} = this.props;

    const coinError = isFieldTouched('coin') && getFieldError('coin');

    return <div className={css(styles.form)}>
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

      <FormItem>
         <Button
           type="primary"
           htmlType="submit"
           disabled={hasErrors(getFieldsError())}
         >
           <Icon type="plus-square-o"  />
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
    addToWatchList: (coin) => {
      dispatch(addToWatchList(coin));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(AddWatchForm));
