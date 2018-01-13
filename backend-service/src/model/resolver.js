const Work = require('gstore-node').model('Work');
const GraphQLJSON = require('graphql-type-json');
const GraphQLDate = require('graphql-date');
const getWords = require('../utils/getWords');

const NEXT_PAGES_COUNT = 11;

//"no matching index found. recommended index is:<br/>- kind: Work<br/>  properties:<br/>  - name: isVisible<br/>  - name: title<br/>"
// .order('title')//, { descending: true })

// The root provides a resolver function for each API endpoint
const root = {
  GraphQLDate: GraphQLDate,
  JSON: GraphQLJSON,
  Query: {
    getWorks(obj, {sortBy, isDesc, keyWords, isVisible, showInFrontPage ,page, pageSize}) {
      let pageQuery = Work.query();
      let remainingQuery = Work.query();

      if (sortBy) {
        pageQuery = pageQuery.order(sortBy, { descending: isDesc });
        remainingQuery = remainingQuery.order(sortBy, { descending: isDesc });
      }

      if (keyWords) {
        let words = getWords(keyWords);
        for (let word of words) {
          pageQuery = pageQuery.filter('titleArray', word);
          remainingQuery = remainingQuery.filter('titleArray', word);           
        }
      }

      if (typeof isVisible === 'boolean'){
        pageQuery = pageQuery.filter('isVisible', isVisible);
        remainingQuery = remainingQuery.filter('isVisible', isVisible);
      }        

      if (typeof showInFrontPage === 'boolean') {
        pageQuery = pageQuery.filter('showInFrontPage', showInFrontPage);
        remainingQuery = remainingQuery.filter('showInFrontPage', showInFrontPage);
      }        

      pageQuery = pageQuery.offset((page - 1) * pageSize);
      remainingQuery = remainingQuery.offset(page * pageSize);

      pageQuery = pageQuery.limit(pageSize);
      remainingQuery = remainingQuery.limit(pageSize * NEXT_PAGES_COUNT);
      
      const worksConnection = {
        remainingCoutForNext11Pages: 0,
        works: []
      };

      return pageQuery.run().then((data) => {
        worksConnection.works = data[0].entities;
        return remainingQuery.select('__key__').run();
      })
      .then((data)=>{
        worksConnection.remainingCoutForNext11Pages = data[0].entities.length;
        return worksConnection;
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
};

module.exports = root;