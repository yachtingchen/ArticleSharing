process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
let www = require('../src/bin/www');
const urlHelper = require('../src/utils/urlHelper');
const testTools = require('./testTools');
const Work = require('gstore-node').model('Work');

chai.use(chaiHttp);

//http://chaijs.com/guide/styles/
// foo.should.be.a('string');
// foo.should.equal('bar');
// foo.should.have.lengthOf(3);
// beverages.should.have.property('tea').with.lengthOf(3);

// should.exist
// should.not.exist
// should.equal
// should.not.equal
// should.Throw
// should.not.Throw

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let adminToken;

describe('Works Test Suit', () => {
  before((done) => { 
    testTools.createAndGetAdminToken().then((data)=>{
      adminToken = data;
      done();
    });
  });

  after((done) => { 
    testTools.deleteUnitTestAdmin().then(()=>{
      done();
    });
  });

  describe('/GET api/work:id', () => {
    it.only('it should get by id', (done) => {

      //for (let i = 0; i < 1; i++) {
        // Work.query().limit(500).select('__key__').run()
        // .then((data)=>{
        //   let ids = data[0].entities.map((_)=>_.id);
        //   return Work.delete(ids);
        // })
        // .then((msg)=>{
        //   console.log('done');
        // })
        // .catch((err)=>{
        //   console.log(err);
        // });      
      //}
      //return;

      let id = 6174484981612544;

      chai.request(www)
        .get(`/api/work/${id}`)
        .end((err, res) => {        
          res.should.have.status(200);
          res.body.should.be.a('object');

          const body = res.body;
          body.should.have.property('id');
          body.id.should.equal(id);
          body.should.have.property('downloadInstruction');
          body.should.have.property('isVisible');
          body.should.have.property('title');
          body.workDesc.should.be.a('object');

          delete body.id;
          delete body.createdOn;
          for (let i = 1; i < 300; i++){
            body.isVisible = (i % 2) === 0;
            body.showInFrontPage = (i % 2) !== 0;
            body.title = i.toString();
            sleep(20).then(()=>{
              new Work(body).save();
            });                        
          }          
          

          //done();
        });
    });
  });

  describe('/POST work', () => {
    it('it should add a work', (done) => {
      let book = {
        isVisible: true,
        showInFrontPage: true,
        workDesc: ''
      };
      chai.request(www)
        .post('/api/work')
        .send(book)
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('title');
          done();
        });
    });

  });	

  describe('getWorkImgMoveInfo', () => {
    it('it should return both', (done) => {
      //arrange
      const tmpUrl = `https://storage.googleapis.com/ps-store1.appspot.com/temp/work_temp_images/2017-02-23_01%3A20%3A53_0d9c5367-a0d0-4f91-bbd9-16624984352c.png`;
      const workId = '889516577';
      const origin = `https://storage.googleapis.com/ps-store1.appspot.com`;
      //act
      const result = urlHelper.getWorkImgMoveInfo(tmpUrl, origin, workId);
      //assert
      result.newUrl.should.eql(`https://storage.googleapis.com/ps-store1.appspot.com/works/889516577/cover.png`);
      result.moveList[0].source.eql(`temp/work_temp_images/2017-02-23_01%3A20%3A53_0d9c5367-a0d0-4f91-bbd9-16624984352c.png`);
      result.moveList[0].destination.eql(`works/889516577/cover.png`);
      done();
    });
  }); 

  describe('getOriginFromTmpUrl', () => {
    it('it should return origin', (done) => {
      //arrange
      const tmpUrl = `https://storage.googleapis.com/ps-store1.appspot.com/temp/work_temp_images/2017-02-23_01%3A20%3A53_0d9c5367-a0d0-4f91-bbd9-16624984352c.png`;
      //act
      const actual = urlHelper.getOriginFromTmpUrl(tmpUrl);
      //assert
      actual.should.eql(`https://storage.googleapis.com/ps-store1.appspot.com`);
      done();
    });
  });

  describe('/GET api/works', () => {
    it('it should GET all the works', (done) => {
      chai.request(www)
        .get('/api/works')
        .end((err, res) => {        
          res.should.have.status(200);
          res.body.should.be.a('array');

          const firstBody = res.body[0];
          firstBody.should.have.property('id');
          firstBody.should.have.property('downloadInstruction');
          firstBody.should.have.property('isVisible');
          firstBody.should.have.property('title');
          firstBody.workDesc.should.be.a('object');
          done();
        });
    });
  });

  describe('/POST work', () => {
    it('it should not POST a work without title field', (done) => {
      let book = {
        isVisible: true,
        showInFrontPage: true,
        workDesc: ''
      };
      chai.request(www)
        .post('/api/work')
        .send(book)
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('title');
          done();
        });
    });

  });	


//   describe('/POST work', () => {
//     it('it add many works', (done) => {
//     //for (let i = 0; i < 30; i++) {
//     let book = {
//       isVisible: true,
//       showInFrontPage: true,
//       title: 'Work一',
//       serial: '型號一',
//       workDesc: `<p class="md-block-unstyled"> 60歲的阿爾瓦雷茲和他的25歲嚮導瓦拉達瑞斯(Adriac Valladares)，是在21日摔落馬沙亞火山(Masaya Volcano)的火山口。尼加拉瓜政府在官方網頁上指出，事發時他們正在火山口邊緣進行研究，結果因為繩子斷裂而滑落到這座活火山內部，據傳因為高溫出現脫水。消防人員利用繩索和吊具將倆人救起。政府官員說，他們的「情況良好且穩定」。馬沙亞火山位於首都馬納瓜(Managua)南方20公里處。 </p><figure class="md-block-image"}><img src="https://storage.googleapis.com/ps-store1.appspot.com/works/5639445604728832/2017-02-23_01:21:16_10ecf86a-86dc-4bc8-8a49-17d713a62685.jpg" alt="" /><figcaption className="md-block-image-caption"></figcaption></figure> `,
//       workImgUrl: `https://storage.googleapis.com/ps-store1.appspot.com/works/5639445604728832/cover.png `,
//       downloadInstruction: `<figure class="md-block-image"}><img src="https://storage.googleapis.com/ps-store1.appspot.com/works/5639445604728832/2017-02-23_01:21:28_4c90dd16-48bc-4a67-b2c0-39c3d62dc03b.jpg" alt="" /><figcaption className="md-block-image-caption"></figcaption></figure> `
//     };
//     chai.request(www)
//       .post('/api/work_edit')
//       .send(book)
//       .set('Authorization', `bearer ${adminToken}`)
//       .end((err, res) => {
//         res.should.have.status(200);
//         done();
//       });
//      //} //end for
//     });

//   });

});