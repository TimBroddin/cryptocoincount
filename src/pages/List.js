import React, { PureComponent } from "react";
import TotalWorth from "../components/CoinList/TotalWorth";
import AddCoinForm from "../components/CoinList/AddCoinForm";
import Table from "../components/CoinList/Table";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Alert, Spin } from "antd";
import { setPage } from "../actions";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  link: {
    color: "black",
    fontWeight: "bold",
    textDecoration: "underline"
  },
  alert: {
    marginBottom: "20px"
  }
});

class ListPage extends PureComponent {
  componentDidMount() {
    const { setPage } = this.props;
    setPage("home");
  }

  login(e) {
    e.preventDefault();
    this.props.auth.login();
  }

  close() {
    localStorage.setItem("hide_register_cta", true);
  }

  closeBeta() {
    localStorage.setItem("hide_beta_cta", true);
  }


  showRegister() {
    const { auth } = this.props;
    if (!auth.isAuthenticated() && (typeof localStorage === "undefined" || !localStorage.getItem("hide_register_cta"))) {
      return true;
    }
  }

  showBeta() {
    if ((typeof localStorage === "undefined" || !localStorage.getItem("hide_beta_cta"))) {
      return true;
    }
  }

  render() {
    const {loading} = this.props;
    if(loading) {
      return <Spin />
    }

    return (
      <div>
        {this.showBeta() ?
        <Alert
            className={css(styles.alert)}
            type="info"
            showIcon
            message="📱 CryptocoinCount is coming to your mobile device!"
            description={
              <div>
              <p>
                I'm currently working on a native version of CryptocoinCount. This will pack everything you've come to love about the site, and add a bunch more.
              </p>
              <p>
                Want to join the iOS beta? <a href="https://tim546.typeform.com/to/MwZMpU" rel="noopener noreferrer"  className={css(styles.link)} target="_blank">Apply now!</a>
              </p>

            </div>
            }
            closable
            onClose={this.closeBeta.bind(this)}
          />

          : null }


        {this.showRegister()
          ? <Alert
              className={css(styles.alert)}
              type="info"
              showIcon
              message="👮 You are not logged in "
              description={
                <p>
                  All data is saved on your device. You can sync with other
                  devices by using the{" "}
                  <Link className={css(styles.link)} to="/sync">
                    sync function
                  </Link>, or{" "}
                  <a
                    href="#login"
                    className={css(styles.link)}
                    onClick={this.login.bind(this)}
                  >
                    register an account
                  </a>{" "}
                  and have your data wherever you go.
                </p>
              }
              closable
              onClose={this.close.bind(this)}
            />
          : null}

        <TotalWorth />
        <AddCoinForm />
        <Table />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPage: page => {
      dispatch(setPage(page));
    }
  };
};

export default connect(null, mapDispatchToProps)(ListPage);
