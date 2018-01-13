import React, { PropTypes } from 'react';
import WorkMgmtForm from '../components/WorkMgmtForm';
import Auth from '../modules/Auth';
import axios from 'axios';
import {API_SRV_ORIGIN} from '../constants/envConfig';
import Config from '../constants/Config';

class WorkMgmtPage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      works: [],
      activePage: 1,
      remainingCout: 0,
      isVisible: null, //null代表全部 (true + false)
      showInFrontPage: null //null代表全部 (true + false)
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.processForm = this.processForm.bind(this);
    this.queryByPage = this.queryByPage.bind(this);

    this.onPageChange = (e, {name}) => {
      const newPage = parseInt(name);
      this.setState({activePage: newPage});
      this.queryByPage({page: newPage});
    };

    this.onPreviousPage = () => {
      const newPage = this.state.activePage - 1
      this.setState({activePage: newPage});
      this.queryByPage({page: newPage});
    };

    this.onNextPage = () => {
      const newPage = this.state.activePage + 1
      this.setState({activePage: newPage});
      this.queryByPage({page: newPage});
    };

    this.onDelete = (work) => {
      if(!confirm("Are you sure you want to delete?"))
        return;

      axios.delete(`${API_SRV_ORIGIN}/api/work/${work.id}`, {
        headers: {'Authorization': `bearer ${Auth.getToken()}`}
      }).then(()=>{
        let pageWorks = this.state.works;   
        let index = pageWorks.indexOf(work);
        pageWorks.splice(index, 1);
        this.setState({works: pageWorks});
        alert('done');
      });
    };
  }  

  componentDidMount() {
    this.queryByPage({page: 1});
  }

  queryByPage({page, keyWords, isVisible, showInFrontPage}) {
    const query = `
    query GetAllWorks(
      $sortBy: String, 
      $isDesc: Boolean, 
      $keyWords: String, 
      $isVisible: Boolean,
      $showInFrontPage: Boolean,
      $numPage: Int, $numPageSize: Int) {
          getWorks(
            sortBy: $sortBy, 
            isDesc: $isDesc, 
            keyWords: $keyWords,
            isVisible: $isVisible, 
            showInFrontPage: $showInFrontPage,
            page: $numPage, pageSize: $numPageSize) {
                remainingCoutForNext11Pages
                works {
                  workImgUrl
                  isVisible
                  showInFrontPage
                  title
                  createdOn
                  id
                }
          }
    }
    `;

    const sortBy = "createdOn";
    const isDesc = true;

    //can only sort if every filter is empty
    let canSort = !keyWords && isVisible == null && showInFrontPage == null;
    
    const variables = {
      sortBy: canSort ? sortBy : null,
      isDesc,
      keyWords,
      isVisible,
      showInFrontPage,
      numPage: page,
      numPageSize: Config.PAGE_SIZE
    };

    axios.post(
      `${API_SRV_ORIGIN}/graphql`, 
      {query, variables},
      {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }).then((response)=>{
        const graphqlResult = response.data;
        const works = graphqlResult.data.getWorks.works;
        const remainingCout = graphqlResult.data.getWorks.remainingCoutForNext11Pages;
        this.setState({ works, remainingCout });
        console.log('data returned:', response);
      })
      .catch((err)=>{
        console.log(err);
        alert('failed');        
      });
  }

  handleInputChange(event, semanticData) {    
    const name = semanticData ? semanticData.name : event.target.name;
    let value = semanticData ? semanticData.value : event.target.value;
    console.log(`handleInputChange ${name} : ${value}`);    

    if (value === 'true' || value === 'false') {
      value = (value == 'true');
    }    

    if (value === "")
      value = null;
    //this[name] = value;
    this.setState({
        [name]: value
    });
  }

  processForm(event) {
    event.preventDefault();
    this.queryByPage({
      page: this.state.activePage, 
      keyWords: this.state.keyWords,
      isVisible: this.state.isVisible,
      showInFrontPage: this.state.showInFrontPage
    });
  }

  render() {
    return (
      <WorkMgmtForm 
        works={this.state.works}
        onDelete={this.onDelete}
        onPageChange={this.onPageChange}
        onPreviousPage={this.onPreviousPage}
        onChange={this.handleInputChange}
        onSubmit={this.processForm}
        onNextPage={this.onNextPage}
        remainingCout={this.state.remainingCout}
        activePage={this.state.activePage}
        isVisible={this.state.isVisible}
        showInFrontPage={this.state.showInFrontPage}
      />
    );
  }

}

WorkMgmtPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default WorkMgmtPage;
