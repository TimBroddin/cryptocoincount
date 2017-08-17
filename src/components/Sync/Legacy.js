import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Alert, Button, Input, Col, Row, message } from "antd";
import JSON5 from "json5";
import { css, StyleSheet } from "aphrodite";
import history from "../../history";
import { doImport } from "../../actions";

const styles = StyleSheet.create({
  alert: {
    margin: "20px 0px"
  },
  p: {
    marginBottom: "10px"
  }
});

class LegacySync extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showLegacy: false,
      code: ""
    };
  }

  getData() {
    const { coins, watchlist, version } = this.props;
    return JSON5.stringify({ coins, watchlist, version });
  }

  import() {
    const { doImport } = this.props;
    try {
      const c = JSON5.parse(this.state.code);
      doImport(c);
      message.success(`Import completed`);
      history.push("/");
    } catch (e) {
      message.error(`Something went wrong.`);
      this.setState({ code: "" });
    }
  }

  render() {
    const { showLegacy, code } = this.state;
    if (!showLegacy) {
      return (
        <p>
          Or,{" "}
          <a
            href="#showLegacy"
            onClick={e => {
              e.preventDefault();
              this.setState({ showLegacy: true });
            }}
          >
            click here
          </a>{" "}
          to use the legacy sync method.
        </p>
      );
    } else {
      return (
        <Row gutter={16}>
          <Col md={12}>
            <h1>At the source device</h1>
            <Alert
              className={css(styles.alert)}
              message="Copy the code below."
              type="info"
              showIcon
            />
            <p className={css(styles.p)}>
              <Input.TextArea value={this.getData()} />
            </p>
          </Col>
          <Col md={12}>
            <h1>At the destination device</h1>
            <Alert
              className={css(styles.alert)}
              message="Paste the copied code below."
              type="info"
              showIcon
            />
            <p className={css(styles.p)}>
              <Input.TextArea
                value={code}
                onChange={e => this.setState({ code: e.currentTarget.value })}
              />
            </p>
            <p className={css(styles.p)}>
              <Button type="primary" onClick={this.import.bind(this)}>
                Import data
              </Button>
            </p>
          </Col>
        </Row>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    coins: state.coins,
    watchlist: state.watchlist,
    version: state.version
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doImport: data => {
      dispatch(doImport(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LegacySync);
