//import mocha framework, chai assertion library
const chai = require("chai"),
  chaiHttp = require("chai-http"),
  server = require("../../server"),
  faker = require("faker"),
  should = chai.should();

chai.use(chaiHttp);

//Test '/' status code
describe("Entry Point test", () => {
  it("check app status code", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        done();
      });
  });
});