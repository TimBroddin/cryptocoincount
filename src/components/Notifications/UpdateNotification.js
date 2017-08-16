import React, { PureComponent } from 'react';
import { Modal, message } from 'antd';

class UpdateNotification extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updateVisible: false
    }
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      // service worker support
      window.addEventListener(
        "message",
        msg => {
          if (msg.data === "refresh") {
            this.updateReady();
          }
          if (msg.data === "offline") {
            message.warning(
              "No Internet connection available. Working in offline mode."
            );
          }
        },
        false
      );

      // appcache support
      if (typeof window["applicationCache"] !== "undefined" && typeof navigator['serviceWorker'] === "undefined") {
        window.applicationCache.addEventListener(
          "updateready",
          this.updateReady.bind(this)
        );
        if (
          window.applicationCache.status === window.applicationCache.UPDATEREADY
        ) {
          this.updateReady();
        }
      }
    }
  }

  updateReady() {
    this.setState({ updateVisible: true });
  }

  render() {
    const { updateVisible } = this.state;
    if(updateVisible) {
      return <Modal
        title="Update available"
        visible={this.state.updateVisible}
        onOk={() => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }}
        onCancel={() => this.setState({ updateVisible: false })}
      >
        <p>
          An update is available for <strong>CryptocoinCount</strong>.
          Please click ok to reload this page.
        </p>
      </Modal>
    } else {
      return null;
    }
  }

}

export default UpdateNotification;
