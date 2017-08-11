import React, {PureComponent} from 'react';
import AddWatchForm from '../components/WatchList/AddWatchForm';
import Table from '../components/WatchList/Table';
import { Alert } from 'antd';
import { connect } from 'react-redux';
import { setPage } from '../actions';


class WatchlistPage extends PureComponent {
  componentDidMount() {
    const {setPage} = this.props;
    setPage('watchlist');
  }

  render() {
    return <div>
      <Alert
        message="Keep an eye on those coins!"
        description={ <div>Use the Watchlist to keep track of coins you might buy in the future.</div>}
        type="info"
        showIcon
      />
            <AddWatchForm/>
            <Table/>
          </div>

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPage: (page) => {
      dispatch(setPage(page));
    }
  }
}

export default connect(null, mapDispatchToProps)(WatchlistPage);
