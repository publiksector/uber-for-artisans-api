const chai = require("chai"),
  chaiHttp = require("chai-http"),
  server = require("../../server"),
  should = chai.should();

//Assertion style
// chai.should();

chai.use(chaiHttp);

describe("User Routes test", () => {
  /**
   * Test the /register route
   */
  describe("Register user", () => {
    it("Should return user auth token", (done) => {
      let obj = {
        phoneNumber: "07037141150",
        countryCode: "+234",
      };
      chai
        .request(server)
        .post("/api/user/register")
        .send(obj)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          //Test for expected message when post request is sent more than once
          res.body.message == 'Token re-sent successfully!!!' ?
          res.body.should.have
          .property("message")
          .eql("Token re-sent successfully!!!") :
          res.body.should.have
            .property("message")
            .eql("proceed to verifying account registration !!!");
        });
        done();
    });
  });

  /**
   * Test the /verify route
   */
  describe("Verify User", () => {
    it("Should return a JSON with success and message keys", (done) => {
      let obj = {
        phoneNumber: "07037141150",
        countryCode: "+234",
        statusCode: "3156",
      };
      chai
        .request(server)
        .put("/api/user/verify")
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZ1bGxuYW1lIjoiICIsInBob25lIjoiMDcwMzcxNDExNTAiLCJwdWJsaWNJZCI6IjVmMTk4M2YyOWYwNWFhNDdjODdlZDM1MiIsInVzZXJUeXBlIjoiY2xpZW50IiwiaW1hZ2VVcmwiOiIiLCJsYXN0TG9nZ2VkSW4iOm51bGwsImFjdGl2ZSI6ZmFsc2UsInN0YXR1cyI6ZmFsc2UsImlhdCI6MTU5NTUwNzkwNSwiZXhwIjoxNTk1NTk0MzA1fQ.b1vvdRJJSaoRVtNR13yIOmu3zpicWcOYEW6gkAsQmcw"
        )
        .send(obj)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          // res.body.should.have.property("success").eql(false);
          // res.body.should.have.property("message").eql("account verification failed !!!")
          res.body.should.have.property("message");
          res.body.should.have.property("success");
        });
        done()
    });
  });

  /**
   * Test the /complete_signup route
//    */
  describe("Complete User Sign up", () => {
    it("Should return a JSON", (done) => {
      let obj = {
        firstName: "Johnmicheal",
        lastName: "ekene",
        password: "password123",
        imageUrl:
          "https://image.shutterstock.com/image-vector/hello-quote-message-bubble-calligraphic-260nw-547134268.jpg",
        imageID: "547134268",
      };
      chai
        .request(server)
        .put("/api/user/complete_signup")
        .send(obj)
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZ1bGxuYW1lIjoiICIsInBob25lIjoiMDcwMzcxNDExNTAiLCJwdWJsaWNJZCI6IjVmMTk4M2YyOWYwNWFhNDdjODdlZDM1MiIsInVzZXJUeXBlIjoiY2xpZW50IiwiaW1hZ2VVcmwiOiIiLCJsYXN0TG9nZ2VkSW4iOm51bGwsImFjdGl2ZSI6ZmFsc2UsInN0YXR1cyI6ZmFsc2UsImlhdCI6MTU5NTUwNzkwNSwiZXhwIjoxNTk1NTk0MzA1fQ.b1vvdRJJSaoRVtNR13yIOmu3zpicWcOYEW6gkAsQmcw"
        )
        .end((err, res) => {
          should.not.exist(err);
          res.body.should.be.a("object");
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
        });
        done()

    });
  });

  /**
   * Test the /update route
   */
  describe("Update user profile", () => {
    it("Should return JSON", (done) => {
      let obj = {
        firstName: "Johnmicheal",
        lastName: "Zendus",
        email: "uzendujmike@gmail.com",
      };
      chai
        .request(server)
        .put("/api/user/update")
        .send(obj)
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZ1bGxuYW1lIjoiICIsInBob25lIjoiMDcwMzcxNDExNTAiLCJwdWJsaWNJZCI6IjVmMTk4M2YyOWYwNWFhNDdjODdlZDM1MiIsInVzZXJUeXBlIjoiY2xpZW50IiwiaW1hZ2VVcmwiOiIiLCJsYXN0TG9nZ2VkSW4iOm51bGwsImFjdGl2ZSI6ZmFsc2UsInN0YXR1cyI6ZmFsc2UsImlhdCI6MTU5NTUwNzkwNSwiZXhwIjoxNTk1NTk0MzA1fQ.b1vvdRJJSaoRVtNR13yIOmu3zpicWcOYEW6gkAsQmcw"
)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
        });
        done()

    });
  });

  /**
   * Test the /logout route
   */
  describe("Logout user", () => {
    it("Should return JSON [success = true]", (done) => {
      chai
        .request(server)
        .post("/api/user/logout")
        .send()
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZ1bGxuYW1lIjoiICIsInBob25lIjoiMDcwMzcxNDExNTAiLCJwdWJsaWNJZCI6IjVmMTk4M2YyOWYwNWFhNDdjODdlZDM1MiIsInVzZXJUeXBlIjoiY2xpZW50IiwiaW1hZ2VVcmwiOiIiLCJsYXN0TG9nZ2VkSW4iOm51bGwsImFjdGl2ZSI6ZmFsc2UsInN0YXR1cyI6ZmFsc2UsImlhdCI6MTU5NTUwNzkwNSwiZXhwIjoxNTk1NTk0MzA1fQ.b1vvdRJJSaoRVtNR13yIOmu3zpicWcOYEW6gkAsQmcw"
        )
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("user logged out successfully");
        });
        done();
    });
  });

  /**
   * Test the /forgotpassword_token route
   * commented to avoid running multiple times
   */
  describe("Forgotten password token", () => {
    it("Should return password token", (done) => {
      let obj = {
        phoneNumber: "07037141150",
        countryCode: "+234",
      };
      chai
        .request(server)
        .post("/api/user/forgotpassword_token")
        .send(obj)
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZ1bGxuYW1lIjoiICIsInBob25lIjoiMDcwMzcxNDExNTAiLCJwdWJsaWNJZCI6IjVmMTk4M2YyOWYwNWFhNDdjODdlZDM1MiIsInVzZXJUeXBlIjoiY2xpZW50IiwiaW1hZ2VVcmwiOiIiLCJsYXN0TG9nZ2VkSW4iOm51bGwsImFjdGl2ZSI6ZmFsc2UsInN0YXR1cyI6ZmFsc2UsImlhdCI6MTU5NTUwNzkwNSwiZXhwIjoxNTk1NTk0MzA1fQ.b1vvdRJJSaoRVtNR13yIOmu3zpicWcOYEW6gkAsQmcw"
        )
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("data");
        });
        done();
    });
  });

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
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
        });
        done();
    });
  });

  /**
   * Test the /edit_user_profile route
   */
  describe("Edit user profile details", () => {
    it("Should return JSON {success = true}", (done) => {
      let obj = {
        publicId: "5f1983f49f05aa47c87ed353",
        firstName: "John",
        lastName: "Uzendu",
        address: "No 1 new haven road",
      };
      chai
        .request(server)
        .put("/api/user/edit_user_profile")
        .send(obj)
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZ1bGxuYW1lIjoiICIsInBob25lIjoiMDcwMzcxNDExNTAiLCJwdWJsaWNJZCI6IjVmMTk4M2YyOWYwNWFhNDdjODdlZDM1MiIsInVzZXJUeXBlIjoiY2xpZW50IiwiaW1hZ2VVcmwiOiIiLCJsYXN0TG9nZ2VkSW4iOm51bGwsImFjdGl2ZSI6ZmFsc2UsInN0YXR1cyI6ZmFsc2UsImlhdCI6MTU5NTUwNzkwNSwiZXhwIjoxNTk1NTk0MzA1fQ.b1vvdRJJSaoRVtNR13yIOmu3zpicWcOYEW6gkAsQmcw"
        )
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
        });
        done();
    });
  });

  /**
   * Test the /add_home_address route
   *
   */
  describe("Change User Address", () => {
    it("Should return JSON { success: true, message: 'Address added successfully !!' }", (done) => {
      let obj = {
        address: "No 1 new haven",
      };
      chai
        .request(server)
        .put("/api/user/add_home_address")
        .send(obj)
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZ1bGxuYW1lIjoiICIsInBob25lIjoiMDcwMzcxNDExNTAiLCJwdWJsaWNJZCI6IjVmMTk4M2YyOWYwNWFhNDdjODdlZDM1MiIsInVzZXJUeXBlIjoiY2xpZW50IiwiaW1hZ2VVcmwiOiIiLCJsYXN0TG9nZ2VkSW4iOm51bGwsImFjdGl2ZSI6ZmFsc2UsInN0YXR1cyI6ZmFsc2UsImlhdCI6MTU5NTUwNzkwNSwiZXhwIjoxNTk1NTk0MzA1fQ.b1vvdRJJSaoRVtNR13yIOmu3zpicWcOYEW6gkAsQmcw"
        )
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
        });
        done();
    });
  });

  /**
   * Test the /new_password route
   *
   */
  describe("Change User Password", () => {
    it("Should return JSON { success: true, message: 'password was changed successfully !!' }", (done) => {
      let obj = {
        password: "password123",
        newPassword: "password1234",
      };
      chai
        .request(server)
        .put("/api/user/new_password")
        .send(obj)
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiIsImZ1bGxuYW1lIjoiICIsInBob25lIjoiMDcwMzcxNDExNTAiLCJwdWJsaWNJZCI6IjVmMTk4M2YyOWYwNWFhNDdjODdlZDM1MiIsInVzZXJUeXBlIjoiY2xpZW50IiwiaW1hZ2VVcmwiOiIiLCJsYXN0TG9nZ2VkSW4iOm51bGwsImFjdGl2ZSI6ZmFsc2UsInN0YXR1cyI6ZmFsc2UsImlhdCI6MTU5NTUwNzkwNSwiZXhwIjoxNTk1NTk0MzA1fQ.b1vvdRJJSaoRVtNR13yIOmu3zpicWcOYEW6gkAsQmcw"
        )
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a("object");
        });
        done();
    });
  });
});
