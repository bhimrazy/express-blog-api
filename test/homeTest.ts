import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";

chai.should();

chai.use(chaiHttp);

describe("Express API", () => {
  describe("/GET Home", () => {
    it("it should GET home page of API", (done) => {
      chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("/GET Home", () => {
    it("it should GET v1 page of API", (done) => {
      chai
        .request(app)
        .get("/api/v1/")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
