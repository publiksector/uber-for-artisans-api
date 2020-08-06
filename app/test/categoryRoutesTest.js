var fs = require("fs");
const chai = require("chai"),
  chaiHttp = require("chai-http"),
  server = require("../../server"),
  assert = chai.assert,
  expect = chai.expect,
  should = chai.should();

chai.use(chaiHttp);

/**
 * Test the /create route
 */
it("Should Create a new category", async () => {
  const response = await chai
    .request(server)
    .post("/api/category/create")
    .set("Content-Type", "application/form-data")
    .field("name", "Johnmicheal")
    .attach(
      "image",
      fs.readFileSync("C:/Users/uzend/Pictures/donotdisturb.jpg"),
      "donotdisturb.jpg"
    )
    .attach(
      "image",
      fs.readFileSync("C:/Users/uzend/Pictures/skele.png"),
      "skele.png"
    );
//   console.log(response.body);
  expect(response.body).to.be.an("object");
  response.should.have.status(200);
  expect(response.body).to.have.property("success").equal(true);
});

/**
 * Test the /update route
 */
it("Should Update Category", async () => {
  const response = await chai
    .request(server)
    .put("/api/category/update")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .field("name", "Johnmicheal")
    .attach(
      "image",
      fs.readFileSync("C:/Users/uzend/Pictures/donotdisturb.jpg"),
      "donotdisturb.jpg"
    )
    .attach(
      "image",
      fs.readFileSync("C:/Users/uzend/Pictures/skele.png"),
      "skele.png"
    );
    // console.log(response.body)
    expect(response.body).to.be.an("object");
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("success").equal(true);
});


/**
 * Test the / route
 */
it("Should Get all Categories", async () => {
    const response = await chai
      .request(server)
      .post("/api/category/")
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field("location", "Ekiti")
    //   console.log(response.body)
      expect(response.body).to.be.an("object");
      expect(response.statusCode).to.equal(200);
  });
  

  
/**
 * Test the /single_category route
 */
it("Should Get a single Category", async () => {
    const response = await chai
      .request(server)
      .get("/api/category/single_category")
      .query({id:"5f2bdef68b29f10b0891d85c"})
      .set("Content-Type", "application/x-www-form-urlencoded")
      .field("location", "Ekiti")
      console.log(response.body)
      expect(response.body).to.be.an("object");
      expect(response.statusCode).to.equal(200);
  });

  /**
 * Test the delete route
 */
it("Should Delete single Category", async () => {
    const response = await chai
      .request(server)
      .delete("/api/category/")
      .query({id:"5f2bdef68b29f10b0891d85c"})
      console.log(response.body)
      expect(response.body).to.be.an("object");
      expect(response.statusCode).to.equal(200);
  });