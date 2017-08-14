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
          <h1>1.5 (August 14th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Introduce user accounts</li>
          </ul>
        </div>
        <div className={css(styles.version)}>
          <h1>1.4.1 (August 13th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Bugfix</li>
          </ul>
        </div>
        <div className={css(styles.version)}>
          <h1>1.4 (August 13th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>New import/export system</li>
          </ul>
        </div>
        <div className={css(styles.version)}>
          <h1>1.3.3 (August 13th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>All API stuff is now serverd locally</li>
            <li>Service worker optimizations</li>
          </ul>
        </div>
        <div className={css(styles.version)}>
          <h1>1.3.2 (August 13th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Bugfix</li>
          </ul>
        </div>
        <div className={css(styles.version)}>
          <h1>1.3.1 (August 11th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Infrastructure for server side rendering</li>
            <li>Fix chart scale</li>
          </ul>
        </div>
        <div className={css(styles.version)}>
          <h1>1.2.4 (August 10th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Up/down indicators</li>
          </ul>
        </div>
        <div className={css(styles.version)}>
          <h1>1.2.3 (August 10th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Price/total worth graphs</li>
          </ul>
        </div>
        <div className={css(styles.version)}>
          <h1>1.2.2 (August 8th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Sort columns</li>
          </ul>
        </div>

        <div className={css(styles.version)}>
          <h1>1.2.1 (August 7th, 2017)</h1>
          <ul className={css(styles.ul)}>
            <li>Portfolio evolution chart can now be unstacked</li>
          </ul>
        </div>

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
