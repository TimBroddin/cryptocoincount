import React, {PureComponent} from 'react';
import TotalWorth from '../components/TotalWorth';
import AddCoinForm from '../components/AddCoinForm';
import Table from '../components/Table';
import { connect } from 'react-redux';
import { setPage } from '../actions';

class ListPage extends PureComponent {
  componentDidMount() {
    const {setPage} = this.props;
    setPage('home');
  }

  render() {
    return <div>
            <TotalWorth/>
            <AddCoinForm/>
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

export default connect(null, mapDispatchToProps)(ListPage);
