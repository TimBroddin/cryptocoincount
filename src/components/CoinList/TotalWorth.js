import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { Button, Tooltip, Icon } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import { fetchData } from '../../actions';

const styles = StyleSheet.create({
  h1: {
    textAlign: 'center',
    fontSize: '36px',
    marginRight: '20px'
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
    '@media (max-width: 600px)': {
      display: 'block',
      textAlign: 'center',

    }
  }
});

class TotalWorth extends PureComponent {
  fetch() {
    const { fetchData } = this.props;
    fetchData();
  }

  renderUpDown(totalWorth, totalHistoryWorth) {
    if(totalWorth && totalHistoryWorth) {
      const title = <p>Price now: <strong>{totalWorth}</strong><br />Price an hour ago: <strong>{totalHistoryWorth.toFixed(2)}</strong></p>;

      if(totalWorth > totalHistoryWorth) {
        return <span><Tooltip title={title}><Icon type="arrow-up" style={{ color: 'green'}}/></Tooltip> </span>
      } else {
        return <span><Tooltip title={title}><Icon type="arrow-down"  style={{ color: 'red'}} /></Tooltip> </span>

      }
    } else if(totalWorth && !totalHistoryWorth) {
      return <span><Icon type="loading" /> </span>;
    } else {
      return null;
    }

  }

  render() {
    const { data, coins, currency, dataLoading, history } = this.props;
    let totalWorth = 0;
    let totalHistoryWorth = 0;

    let button = (dataLoading) ? <Button icon="loading" shape="circle"  /> : <Button onClick={this.fetch.bind(this)} icon="reload" shape="circle" />


    coins.forEach((coin) => {
      data.forEach((d) => {
        if(coin && coin.id === d.id) {
            totalWorth += coin.amount * parseFloat(d[`price_${currency.toLowerCase()}`]);

        }
      });

      if(history[coin.id]) {
        totalHistoryWorth += coin.amount * history[coin.id].price;
      }


    });


    return <div className={css(styles.row)}>
      <h1 className={css(styles.h1)}>Your total crypto worth is: {this.renderUpDown(totalWorth, totalHistoryWorth)} {(!isNaN(totalWorth)) ? totalWorth.toFixed(2) : <Icon type="loading" />} {currency}</h1>
      {button}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    data: (state.data && state.data.data) ? state.data.data : [],
    dataLoading: (state.data && state.data.loading) ? true : false,
    coins: state.coins,
    currency: state.currency,
    history: (state.data && state.history.data) ? state.history.data : {}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => {
      dispatch(fetchData())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalWorth);
