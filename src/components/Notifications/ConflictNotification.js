import React, { Component } from 'react';
import { Modal } from 'antd';
import { connect } from 'react-redux';
import { loadUserData, saveUserData, bumpVersion } from '../../actions';

class ConflictNotification extends Component {
  render() {
    const { conflict, saveUserData, loadUserData } = this.props;
    console.log(conflict);

    if(conflict) {
      return <Modal
        title="You have unsaved changes"
        visible={true}
        onOk={() => {
          saveUserData();
        }}
        onCancel={() => {
          loadUserData();
        }}
      >
        <p>
          Your local data is newer than the data stored online. Click OK to save your current data, or click Cancel to load the data stored on the server.
        </p>
      </Modal>
    } else {
      return null;
    }
  }

}

const mapStateToProps = (state) => {
  return {
    conflict: (state.cloud && state.cloud.conflict)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserData: () => {
      dispatch(bumpVersion());
      dispatch(saveUserData());
    },
    loadUserData: (skipVersionCheck=true) => {
      dispatch(loadUserData(skipVersionCheck));

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConflictNotification);
