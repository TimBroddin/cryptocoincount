import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { Button, Icon } from 'antd';
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
    const { fetchData, currency } = this.props;
    fetchData(currency);
  }

  render() {
    const { data, coins, currency, dataLoading } = this.props;
    let totalWorth = 0;

    let button = (dataLoading) ? <Button icon="loading" shape="circle"  /> : <Button onClick={this.fetch.bind(this)} icon="reload" shape="circle" />


    coins.forEach((coin) => {
      data.forEach((d) => {
        if(coin && coin.id === d.id) {
            totalWorth += coin.amount * parseFloat(d[`price_${currency.toLowerCase()}`]);
        }
      })
    });



    return <div className={css(styles.row)}>
      <h1 className={css(styles.h1)}>Your total crypto worth is: {totalWorth.toFixed(2)} {currency} </h1>
      {button}
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    data: (state.data && state.data.data) ? state.data.data : [],
    dataLoading: (state.data && state.data.loading) ? true : false,
    coins: state.coins,
    currency: state.currency
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (currency) => {
      dispatch(fetchData(currency))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalWorth);
