// import chai, {expect} from 'chai';
// import sinonChai from 'sinon-chai';
// import {getShortDesc} from './WorkCard';

// chai.use(sinonChai);

// describe('<WorkCard />', () => {
//   it('should get short desc', () => {

//     const htmlString =`<p class="md-block-unstyled">60歲的阿爾瓦雷茲和他的25歲嚮導瓦拉達瑞斯(Adriac Valladares)，是在21日摔落馬沙亞火山(Masaya Volcano)的火山口。尼加拉瓜政府在官方網頁上指出，事發時他們正在火山口邊緣進行研究，結果因為繩子斷裂而滑落到這座活火山內部，據傳因為高溫出現脫水。消防人員利用繩索和吊具將倆人救起。政府官員說，他們的「情況良好且穩定」。馬沙亞火山位於首都馬納瓜(Managua)南方20公里處。 </p><figure class="md-block-image"}><img src="https://storage.googleapis.com/ps-store1.appspot.com/works/5639445604728832/2017-02-23_01:21:16_10ecf86a-86dc-4bc8-8a49-17d713a62685.jpg" alt="" /><figcaption className="md-block-image-caption"></figcaption></figure> `;

//     const actual = getShortDesc(htmlString);
//     const expected = `60歲的阿爾瓦雷茲和他的25歲嚮導瓦拉達瑞斯(Adriac Valladares)，是在21日摔落馬沙亞火山(Masaya Volcano)的火山口。尼加拉瓜政府在官方網頁上指出，...`;
//     expect(actual).to.equal(expected);
//   });
// });

// describe('<WorkCard />', () => {
//   it('should get no desc', () => {

//     const htmlString =`<figure class="md-block-image"}><img src="https://storage.googleapis.com/ps-store1.appspot.com/works/5649391675244544/2017-02-22_13:34:33_1a34d390-cb27-40d5-b50d-6d3e4697cfec.png" alt="" /><figcaption className="md-block-image-caption"></figcaption></figure>`;

//     const actual = getShortDesc(htmlString);
//     const expected = '';
//     expect(actual).to.equal(expected);
//   });
// });
