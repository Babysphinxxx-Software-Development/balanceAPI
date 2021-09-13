const app = require("./index");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  it("welcomes user to the api", done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        console.log("body : " , res);
        expect(res).to.have.status(200);
        expect(res.text).to.equals("Hello World!");
        done();
      });
  });
  it("welcomes user to the api", done => {
  chai
    .request(app)
    .get('/getTotalUsdBalance/user-1')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.have.property('user');
      expect(res.body).to.have.property('USD');
      done();
    });
  });
});
