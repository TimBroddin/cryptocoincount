import React, { PureComponent } from "react";
import { Alert, Spin } from 'antd';
import { connect } from "react-redux";
import { css, StyleSheet } from 'aphrodite';

import Highcharts from "highcharts/highstock";
import moment from 'moment';

const styles = StyleSheet.create({
  alert: {
    marginBottom: '20px'
  },
  loadingContainer: {
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

class WorthChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { coins, currency, data } = this.props;
    const url = `https://h.cryptocoincount.com/?coins=${coins
      .map(c => c.id)
      .join(",")}&convert=${currency}`;

    let series = [];

    fetch(url).then(response => response.json()).then(json => {
      for (let coin in json) {
        let seriesData = [];
        let rows = json[coin];
        // find amount in coins;
        let amount = 0;
        let name = coin;
        coins.forEach(c => {
          if (c.id === coin) {
            amount = c.amount;
          }
        });

        if (data && data.data) {
          data.data.forEach(d => {
            if (d.id === coin) {
              name = d.name;
            }
          });
        }

        rows.forEach(row => {
          seriesData.push([new Date(row.date).getTime(), row.price * amount]);
        });

        series.push({
          name: name,
          data: seriesData,
          tooltip: {
            valueDecimals: 2,

            shared: true
          },
          showCheckbox: true,
          stacking: 'normal'
        });
      }

      this.setState({ loading: false });
      Highcharts.stockChart("container", {
        rangeSelector: {
          selected: 1
        },

        title: {
          text: "Portfolio evolution"
        },

        series,

        tooltip: {
          formatter: function() {
              var s = `<strong>${new moment(this.x).format('MMMM Do YYYY')}</strong><br/>`;
              let sum = 0;
              this.points.forEach(function( point, i) {
                  s += `<br/><span style="color: ${point.color}">\u25CF</span> ${point.series.name}: ${point.y.toFixed(2)} ${currency}`;
                  sum += point.y;
              });
              s += `<br/><br/><strong>Total: ${sum.toFixed(2)} ${currency}</p>`;
              return s;
          },
        },

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500
              },
              chartOptions: {
                chart: {
                  height: 300
                },
                subtitle: {
                  text: null
                },
                navigator: {
                  enabled: false
                }
              }
            }
          ]
        }
      });
    });
  }

  render() {
    const { loading } = this.state;

    return <div>
      <Alert
        message="What was your portfolio worth in the past?"
        description={ <div>This chart gives you an overview of your different coins through time. All your coins are multiplied by the amount you own, and converted to their historical prices.</div>}
        type="info"
        showIcon
        className={css(styles.alert)}
      />
      {(loading) ?
        <div className={css(styles.loadingContainer)}>
            <Spin />
        </div>
        : null}
      <div id="container" />
    </div>

  }
}

const mapStateToProps = state => {
  return {
    coins: state.coins,
    currency: state.currency,
    data: state.data
  };
};

export default connect(mapStateToProps)(WorthChart);
