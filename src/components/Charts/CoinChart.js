import React, { PureComponent } from "react";
import { Spin } from 'antd';
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
  },
  stackLabel: {
    marginTop: '20px',
    marginBottom: '20px'
  }
});

class CoinChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.chart = null;
  }

  componentDidMount() {
    const { coin, coins, currency, data, worth } = this.props;
    const url = `https://h.cryptocoincount.com/?coins=${coin}&convert=${currency}`;

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

          seriesData.push([new Date(row.date).getTime(), (worth) ? row.price * amount : row.price]);
        });

        series.push({
          name: name,
          data: seriesData,
          tooltip: {
            valueDecimals: 2,

            shared: true
          },
        });
      }

      this.setState({ loading: false });
      this.chart = Highcharts.stockChart("container", {
        title: {
          text: ``
        },
        xAxis: {
            type: 'datetime',
            ordinal: false
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
        rangeSelector: {
          allButtonsEnabled: true,
          selected: 3,
          buttons: [
            {
              type: "day",
              count: 1,
              text: "1d"
            },
            {
              type: "week",
              count: 1,
              text: "1w"
            },
            {
              type: "month",
              count: 1,
              text: "1m"
            },
            {
              type: "month",
              count: 3,
              text: "3m"
            },
            {
              type: "month",
              count: 6,
              text: "6m"
            },
            {
              type: "ytd",
              text: "YTD"
            },
            {
              type: "year",
              count: 1,
              text: "1y"
            },
            {
              type: "all",
              text: "All"
            }
          ]
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
    currency: state.currency,
    data: state.data,
    coins: state.coins
  };
};

export default connect(mapStateToProps)(CoinChart);
