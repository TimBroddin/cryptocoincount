import React, { PureComponent } from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  ul: {
    marginLeft: '40px',
    marginTop: '10px',
    listStyleType: 'disc'
  },
  version: {
    marginBottom: '30px'
  }
});

class Changelog extends PureComponent {
  render() {
    return (
      <div>
        <div className={css(styles.version)}>
          <h1>1.2 (August 6th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Charts!</li>
          </ul>
        </div>

        <div className={css(styles.version)}>
          <h1>1.1.2 (August 4th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Added changelog</li>
            <li>You can now add CryptocoinCount to your iOS homescreen</li>
            <li>Add Appcache manifest for iOS</li>
          </ul>
        </div>

        <div className={css(styles.version)}>
          <h1>1.1.1 (July 27th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Added refresh button</li>
          </ul>
        </div>

        <div className={css(styles.version)}>
          <h1>1.1 (July 22th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Added watchlist</li>
          </ul>
        </div>

        <div className={css(styles.version)}>
          <h1>1.0.1 (July 20th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>More coins</li>
            <li>Fixes</li>
          </ul>
        </div>

        <div className={css(styles.version)}>
          <h1>1.0 (July 18th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Initial release</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Changelog;
