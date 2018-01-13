import React, { PropTypes } from 'react';
import CategoryMgmtForm from '../components/CategoryMgmtForm';
import axios from 'axios';
import {API_SRV_ORIGIN} from '../constants/envConfig';

class CategoryMgmtPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
      axios.get(`${API_SRV_ORIGIN}/api/works`).then((response) => {
        const elements = response.data.map((_) => {
          return {
            imgUrl: _.workImgUrl,
            title: _.title,
            desc: _.workDesc,
            workId: _.id
          };
        });//end map
        this.setState({ elements });
      });//end then
  }

  /**
   * @param {object} event - the JavaScript event object
   */
  handleInputChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
        [name]: value
    });
  }

  render() {
    return (
      <CategoryMgmtForm
      />
    );
  }

}

CategoryMgmtPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default CategoryMgmtPage;
