process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.should();
let www = require('../src/bin/www');
const testTools = require('./testTools');
const Category = require('gstore-node').model('Category');

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

let adminToken;

describe('Categories Test Suit', () => {
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

  describe('/POST category', () => {
    it('it should POST category without parent', (done) => {
      let data = {
        name: 'BC1',
        order: 1,
        isVisible: true
      };

      chai.request(www)
        .post('/api/category')
        .send(data)
        .set('Authorization', `bearer ${adminToken}`)
        .end((err, res) => {
          res.should.have.status(200);        
          res.body.should.have.property('id');
          res.body.name.should.equal('BC1');
          Category.delete(res.body.id).then((data) => {
            data[0].should.eql(true);
            done();
          });          
        });
    });
  });

  describe('/DELETE/:id category', () => {
    it('it should delet category', (done) => {
      new Category({ name: 'BC1', order: 1, isVisible: true}).save().then((data) => {    
        let id = data[0].entityKey.id;    
          chai.request(www)
            .delete('/api/category/' + id)
            .set('Authorization', `bearer ${adminToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
      });//then
    });//it
  });//describe

  describe('/PUT/:id category', ()=>{
    it('it should modify categroy', (done)=>{
      new Category({ name: 'BC1', order: 1, isVisible: true}).save().then((data) => {    
        let id = data[0].entityKey.id;    
          chai.request(www)
            .put('/api/category/' + id)
            .send({ name: 'BC22', order: 1, isVisible: true})
            .set('Authorization', `bearer ${adminToken}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.name.should.eql('BC22');
              res.body.order.should.eql(1);
              res.body.isVisible.should.eql(true);
              done();
            });
      });//then
    });
  });

  describe('/GET categories', ()=>{
    it('it should get all categories', (done)=>{
      new Category({ name: 'BC1', order: 1, isVisible: true}).save().then(() => {    
          chai.request(www)
            .get('/api/categories')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.not.eql(0);
              done();
            });
      });//then
    });
  });

  describe('/GET/:id category', ()=>{
    it('it should get one category', (done)=>{
      new Category({ name: 'BC77', order: 11, isVisible: true}).save().then((data) => {    
          let id = data[0].entityKey.id;
          chai.request(www)
            .get('/api/category/' + id)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.name.should.equal('BC77');
              res.body.order.should.equal(11);
              done();
            });
      });//then
    });
  });

});