import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import { Table, Icon, Modal, Popconfirm, message } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import sortBy from 'lodash/sortBy';

import { removeFromWatchList } from '../../actions';
import CoinChart from '../Charts/CoinChart';

const styles = StyleSheet.create({
  symbol: {
    display: 'inline-block',
    '@media (max-width: 600px)': {
      display: 'none',
    }
  }
})



class DataTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      coinChart: null
    };
  }

  removeCoin(coin, e) {
    const {removeFromWatchList} = this.props;
    e.preventDefault();
    removeFromWatchList(coin.id);
    message.success(`${coin.name} has been removed.`);

  }

  render() {
    const { data, watchlist, currency } = this.props;
    const dataSource = [];
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <div>{record.name} <span className={css(styles.symbol)}>({record.symbol})</span></div>
      },
    }, {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => {
        return <span>{text} <a href="#chart" onClick={(e) => { e.preventDefault(); this.setState({ coinChart: { name: record.name, id: record.id, symbol: record.symbol, worth: false }})}}><Icon type="line-chart" /></a></span>
      }
    },
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


    sortBy(watchlist, 'id').forEach((coin) => {
      data.forEach((d) => {
        if(coin && coin === d.id) {
            dataSource.push({
              id: d.id,
              name: d.name,
              symbol: d.symbol,
              price: parseFloat(d[`price_${currency.toLowerCase()}`]),
              percent_change_1h: parseFloat(d.percent_change_1h),
              percent_change_24h: parseFloat(d.percent_change_24h),
              percent_change_7d: parseFloat(d.percent_change_7d),
              key: d.id
            });
        }
      })
    });


    return <div><Table
      style={{ marginTop: '50px' }}
      pagination={false}
      columns={columns}
      dataSource={dataSource}
    />
    <Modal
      visible={this.state.coinChart ? true : false}
      title={`${ (this.state.coinChart && this.state.coinChart.worth) ? 'Worth' : 'Price' } evolution of ${(this.state.coinChart)
        ? this.state.coinChart.name
        : ''}`}
      onCancel={() => this.setState({ coinChart: false })}
      footer={null}
    >
      {(this.state.coinChart) ? <CoinChart coin={this.state.coinChart.id} worth={this.state.coinChart.worth} /> : null}

    </Modal>
  </div>

  }
}

const mapStateToProps = (state) => {
  return {
    data: (state.data && state.data.data) ? state.data.data : [],
    watchlist: state.watchlist,
    currency: state.currency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromWatchList: (coin) => {
      dispatch(removeFromWatchList(coin));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
