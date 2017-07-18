import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Table, Input } from 'antd';
import { changeCoinAmount, removeCoin } from '../actions';

class DataTable extends PureComponent {
  constructor(props) {
    super(props);

  }

  handleChange(coin, e) {
    const {changeCoinAmount} = this.props;
    changeCoinAmount(coin, parseFloat(e.currentTarget.value.replace(',', '.')));
  }

  removeCoin(coin, e) {
    const {removeCoin} = this.props;
    e.preventDefault();

    removeCoin(coin);
  }

  render() {
    const { data, coins, currency } = this.props;
    const dataSource = [];
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => {
        return <Input value={text} onChange={this.handleChange.bind(this, record.id)} />
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
    ,
    {
      title: 'Change (7D/24H/1H)',
      dataIndex: 'change',
      render: (text, record) => {
        return <div>
          {(record.percent_change_7d > 0) ? <span style={{ color: 'green'}}>{record.percent_change_7d}%</span> : <span style={{ color: 'red'}}>{record.percent_change_7d}%</span> }
          { " / " }
          {(record.percent_change_24h > 0) ? <span style={{ color: 'green'}}>{record.percent_change_24h}%</span> : <span style={{ color: 'red'}}>{record.percent_change_24h}%</span> }
          { " / " }
          {(record.percent_change_1h > 0) ? <span style={{ color: 'green'}}>{record.percent_change_1h}%</span> : <span style={{ color: 'red'}}>{record.percent_change_1h}%</span> }
        </div>
      }

    },
    {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#" onClick={this.removeCoin.bind(this, record.id)}>Delete</a>
    </span>
  ),
}

  ];


    coins.forEach((coin) => {
      data.forEach((d) => {
        if(coin && coin.id === d.id) {
            dataSource.push({
              id: d.id,
              name: `${d.name} (${d.symbol})`,
              amount: parseFloat(coin.amount).toFixed(10),
              price: parseFloat(d[`price_${currency.toLowerCase()}`]),
              total: coin.amount * parseFloat(d[`price_${currency.toLowerCase()}`]),
              percent_change_1h: parseFloat(d.percent_change_1h),
              percent_change_24h: parseFloat(d.percent_change_24h),
              percent_change_7d: parseFloat(d.percent_change_7d),
              key: d.id
            });
        }
      })
    });


    return <Table  style={{ marginTop: '50px' }} columns={columns} dataSource={dataSource} />

  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
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
