import React, { PureComponent } from "react";
import { Alert, Spin } from "antd";
import { connect } from "react-redux";
import { css, StyleSheet } from "aphrodite";

import Highcharts from "highcharts";

const styles = StyleSheet.create({
  alert: {
    marginTop: "20px",
    marginBottom: "20px"
  },
  loadingContainer: {
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

class SpreadChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    const { coins, data, currency } = this.props;
    const series = [];

    coins.forEach(coin => {
      if (data && data.data) {
        data.data.forEach(d => {
          if (d.id === coin.id) {
            series.push({
              name: d.name,
              y: coin.amount * d[`price_${currency.toLowerCase()}`]
            });
          }
        });
      }
    });

    setTimeout(() => {
      this.setState({ loading: false });

      Highcharts.chart("spread-container", {
        chart: {
          type: "pie"
        },
        title: {
          text: "Your coin spread"
        },
        tooltip: {
          pointFormat: `{point.name}: <b>{point.y:.2f} ${currency} ({point.percentage:.1f}%)</b>`
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [
          {
            name: "Coins",
            data: series
          }
        ],
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
        },
        
      });
    }, 1500);
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Alert
          message="How is your portfolio spread?"
          description={
            <div>
              This chart gives you an overview of how much you own of
              everything.
            </div>
          }
          type="info"
          showIcon
          className={css(styles.alert)}
        />
        {loading
          ? <div className={css(styles.loadingContainer)}>
              <Spin />
            </div>
          : null}
        <div id="spread-container" style={{ width: "100% !important" }} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    coins: state.coins,
    currency: state.currency,
    data: state.data
  };
};

export default connect(mapStateToProps)(SpreadChart);
