import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Table, Input, Icon, Button, Popconfirm, message } from 'antd';
import { StyleSheet, css } from 'aphrodite';

import { changeCoinAmount, removeCoin } from '../../actions';
import sortBy from 'lodash/sortBy';

const styles = StyleSheet.create({
  symbol: {
    display: 'inline-block',
    '@media (max-width: 600px)': {
      display: 'none',
    }
  }
})


class EditField extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editAmount: props.amount
    }
  }

  componentWillReceiveProps(newProps) {
    if(newProps.amount !== this.props.amount) {
      this.setState({ editAmount: newProps.amount });
    }
  }

  startEdit(e) {
    e.preventDefault();
    this.setState({ editing: true });
  }

  handleChange(e) {
    this.setState({ editAmount: e.currentTarget.value });
  }

  save() {
    const {changeCoinAmount, coin} = this.props;
    changeCoinAmount(coin, this.state.editAmount);
    this.setState({ editing: false });
  }

  render() {
      const { amount } = this.props;
      const { editing, editAmount } = this.state;

      if(editing) {
         return <span><Input value={editAmount} onChange={this.handleChange.bind(this)} style={{ width: '200px'}} /> <Button type="primary" onClick={this.save.bind(this)}><Icon type="check" /></Button></span>
      } else {
        return <span>{amount} <a href="#edit"><Icon type="edit" onClick={this.startEdit.bind(this)} /></a></span>
      }

  }
}


class DataTable extends PureComponent {
  removeCoin(coin, e) {
    const {removeCoin} = this.props;
    e.preventDefault();
    removeCoin(coin.id);

    message.success(`${coin.name} has been removed.`);

  }

  render() {
    const { data, coins, currency, changeCoinAmount } = this.props;
    const dataSource = [];
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <div>{record.name} <span className={css(styles.symbol)}>({record.symbol})</span></div>
      },
    }, {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => {
        return <EditField amount={text} coin={record.id} changeCoinAmount={changeCoinAmount} />
      }
    }, {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
  title: '',
  key: 'action',
  render: (text, record) => (
    <span>
      <Popconfirm title={ `Are you sure you want to delete ${record.name}?` }onConfirm={this.removeCoin.bind(this, record)}  okText="Yes" cancelText="No">
        <a href="#delete"><Icon type="delete" /></a>
      </Popconfirm>
    </span>
  ),
}

  ];


    sortBy(coins, 'id').forEach((coin) => {
      data.forEach((d) => {
        if(coin && coin.id === d.id) {
            dataSource.push({
              id: d.id,
              name: d.name,
              symbol: d.symbol,
              amount: parseFloat(coin.amount),
              price: parseFloat(d[`price_${currency.toLowerCase()}`]),
              total: (coin.amount * parseFloat(d[`price_${currency.toLowerCase()}`])).toFixed(2),
              percent_change_1h: parseFloat(d.percent_change_1h),
              percent_change_24h: parseFloat(d.percent_change_24h),
              percent_change_7d: parseFloat(d.percent_change_7d),
              key: d.id
            });
        }
      })
    });


    return <Table
      style={{ marginTop: '50px' }}
      pagination={false}
      columns={columns}
      dataSource={dataSource}
      expandedRowRender={record => <p><strong>Change (7D/24H/1H):</strong> {(record.percent_change_7d > 0) ? <span style={{ color: 'green'}}>{record.percent_change_7d}%</span> : <span style={{ color: 'red'}}>{record.percent_change_7d}%</span> }
        { " / " }
        {(record.percent_change_24h > 0) ? <span style={{ color: 'green'}}>{record.percent_change_24h}%</span> : <span style={{ color: 'red'}}>{record.percent_change_24h}%</span> }
        { " / "}
        {(record.percent_change_1h > 0) ? <span style={{ color: 'green'}}>{record.percent_change_1h}%</span> : <span style={{ color: 'red'}}>{record.percent_change_1h}%</span> }</p>}

    />

  }
}

const mapStateToProps = (state) => {
  return {
    data: (state.data && state.data.data) ? state.data.data : [],
    coins: state.coins,
    currency: state.currency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCoinAmount: (coin, amount) => {
      dispatch(changeCoinAmount(coin, amount));
    },
    removeCoin: (coin) => {
      dispatch(removeCoin(coin));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
