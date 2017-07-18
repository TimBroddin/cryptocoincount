import React, { PureComponent } from 'react';
import {connect} from 'react-redux';

class TotalWorth extends PureComponent {
  render() {
    const { data, coins, currency } = this.props;
    let totalWorth = 0;

    coins.forEach((coin) => {
      data.forEach((d) => {
        if(coin && coin.id === d.id) {

            totalWorth += coin.amount * parseFloat(d[`price_${currency.toLowerCase()}`]);
        }
      })
    });

    return <div>
      <h1 style={{ textAlign: 'center', fontSize: '36px'}}>Your total worth is: {totalWorth.toFixed(2)} {currency}</h1>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    coins: state.coins,
    currency: state.currency
  }
}

export default connect(mapStateToProps)(TotalWorth);
