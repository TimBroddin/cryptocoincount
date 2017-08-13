import React, { PureComponent } from "react";
import { Alert, Checkbox, Spin } from 'antd';
import { connect } from "react-redux";
import { css, StyleSheet } from 'aphrodite';

import Highcharts from "highcharts/highstock";
import moment from 'moment';

import config from '../../config';

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

class WorthChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      stacked: true
    };
    this.chart = null;
  }

  componentDidMount() {
    const { coins, currency, data } = this.props;
    const url = `${config.api_base}history?coins=${coins
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
          stacking: (this.state.stacked) ? 'normal' : null
        });
      }

      this.setState({ loading: false });
      this.chart = Highcharts.stockChart("container", {
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
        xAxis: {
            type: 'datetime',
            ordinal: false
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

  componentWillUpdate(nextProps, nextState) {
    if(nextState.stacked !== this.state.stacked && this.chart) {
      this.chart.series.forEach((serie) => {
        serie.update({
          stacking: (nextState.stacked) ? 'normal' : null
        }, false);
      });
      this.chart.redraw();
    }
  }

  render() {
    const { loading, stacked } = this.state;

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

      <p className={css(styles.stackLabel)}>
        <Checkbox checked={stacked} onClick={() => this.setState({ stacked: !stacked })} />{' '}
        Stack coins

      </p>
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
