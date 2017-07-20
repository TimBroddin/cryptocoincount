import React, {PureComponent} from 'react';
import TotalWorth from '../components/TotalWorth';
import Form from '../components/Form';
import Table from '../components/Table';


class ListPage extends PureComponent {

  render() {
    return <div>
            <TotalWorth/>
            <Form/>
            <Table/>
          </div>

  }
}

export default ListPage;
