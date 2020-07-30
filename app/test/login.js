const chai = require("chai"),
  chaiHttp = require("chai-http"),
  server = require("../../server"),
  should = chai.should();

chai.use(chaiHttp);

/**
 * Test the /authenticate route
 *
 */
// describe("Login User", () => {
//   it("Should return {message: authentication successful !!!}", (done) => {
//     let obj = {
//       phoneNumber: "07058433895",
//       password: "password123",
//     };
//     chai
//       .request(server)
//       .put("/api/user/authenticate")
//       .send(obj)
//       .set(
//         "x-access-token",
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZ1bGxuYW1lIjoiICIsInBob25lIjoiMDcwMzcxNDExNTAiLCJwdWJsaWNJZCI6IjVmMTk4M2YyOWYwNWFhNDdjODdlZDM1MiIsInVzZXJUeXBlIjoiY2xpZW50IiwiaW1hZ2VVcmwiOiIiLCJsYXN0TG9nZ2VkSW4iOm51bGwsImFjdGl2ZSI6ZmFsc2UsInN0YXR1cyI6ZmFsc2UsImlhdCI6MTU5NTUwNzkwNSwiZXhwIjoxNTk1NTk0MzA1fQ.b1vvdRJJSaoRVtNR13yIOmu3zpicWcOYEW6gkAsQmcw"
//       )
//       .end((err, res) => {
//         should.not.exist(err);
//         console.log(res.body)
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body != {}
//           ? res.body.should.have
//               .property("message")
//               .eql("authentication successfull !!!")
//           : res.body.success == false;
//           done();
//       });
//   });
// });


/**
   * Test the /user_profile route
//    */
describe("Fetch User profile details", () => {
  it("Should return JSON containing full user details", (done) => {
    chai
      .request(server)
      .get("/api/user/user_profile")
      .send()
      .set(
        "x-access-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZ1bGxuYW1lIjoiICIsInBob25lIjoiMDcwMzcxNDExNTAiLCJwdWJsaWNJZCI6IjVmMTk4M2YyOWYwNWFhNDdjODdlZDM1MiIsInVzZXJUeXBlIjoiY2xpZW50IiwiaW1hZ2VVcmwiOiIiLCJsYXN0TG9nZ2VkSW4iOm51bGwsImFjdGl2ZSI6ZmFsc2UsInN0YXR1cyI6ZmFsc2UsImlhdCI6MTU5NTUwNzkwNSwiZXhwIjoxNTk1NTk0MzA1fQ.b1vvdRJJSaoRVtNR13yIOmu3zpicWcOYEW6gkAsQmcw"
      )
      .end((err, res) => {
        console.log(res.body)
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.be.a("object");
      });
    done();
  });
});
