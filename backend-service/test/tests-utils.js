process.env.NODE_ENV = 'test';
const deltaHelper = require('../src/utils/deltaHelper');
const chai = require('chai');
const {expect} = require('chai');
chai.should();

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


describe('Utils Test Suit', () => {

  describe('getImgUrls', () => {
    it('get all images urls in delta', (done) => {
      //arrange
      const delta = `{"ops":[{"insert":"幼稚園\n\n"},{"insert":{"image":"https://storage.googleapis.com/ps-store1.appspot.com/people/5730450056151040/2017-02-28_01-39-44/2017-02-28_06-05-27_a5626a9d-fbd6-4f23-94a5-c1c999feb732.jpg"}},{"insert":"\n\n國中\n\n"},{"insert":{"image":"https://storage.googleapis.com/ps-store1.appspot.com/people/5730450056151040/2017-02-28_01-39-44/2017-02-28_06-05-41_71252c73-2e84-45cb-ae26-a95850a72a78.jpg"}},{"insert":"\n"}]}`;
      //act
      const actual = deltaHelper.getImgUrls(delta);
      //assert
      actual.should.have.lengthOf(2);
      expect(actual).to.include("https://storage.googleapis.com/ps-store1.appspot.com/people/5730450056151040/2017-02-28_01-39-44/2017-02-28_06-05-27_a5626a9d-fbd6-4f23-94a5-c1c999feb732.jpg");
      expect(actual).to.include("https://storage.googleapis.com/ps-store1.appspot.com/people/5730450056151040/2017-02-28_01-39-44/2017-02-28_06-05-41_71252c73-2e84-45cb-ae26-a95850a72a78.jpg");
      done();
    });
  });

});