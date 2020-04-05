const service = require('../services/categoryService');
const cloudinary = require('../middleware/cloudinary')
module.exports = function categoryFunction(){

    //while uploading this images ,your postman names would bear {image} for the cover image name and {images} for the icon name
    this.create = async (req,res)=>{
        const file = req.files
         const mapped =   file.map(a => a.path)         
        var requestDetails = [
         mapped[0] != null && mapped[0] !== undefined ? mapped[0] : null,
         mapped[1] != null && mapped[1] !== undefined ? mapped[1] : null
        ];
        console.log(requestDetails, 'see this well')

          if (req.image !== null && req.files !== undefined) {
            await cloudinary.multipleUpload(requestDetails).then(img => {
                const mapResult = img.map(b => b.url)
              requestDetails.imageUrl = mapResult[0];
              requestDetails.iconUrl = mapResult[1];
              return requestDetails;
            });
          }
          service.createCategory(req.body, requestDetails).then(data =>{
            res.status(200).send(data);
          }).catch(err => {
            res.status(500).send(err);
          });
    }
    
    //get all categories
    this.getAllCategories = (req, res)=>{
      service.getAllCategories(req.params.pagenumber, req.params.pagesize).then(data =>{
        res.status(200).send(data);
      }).catch(err => {
        res.status(500).send(err);
      });
    }

    //get single category by Id
    this.getCategoryById = (req, res)=>{
      service.getCategoryById(req.query.id).then(data =>{
        res.status(200).send(data);
      }).catch(err => {
        res.status(500).send(err);
      });
    }

    this.update = async (req,res)=>{
      const file = req.files
      console.log(file , 'hhhhh')

       const mapped =   file.map(a => a.path)         
      var requestDetails = [
       mapped[0] != null && mapped[0] !== undefined ? mapped[0] : null,
       mapped[1] != null && mapped[1] !== undefined ? mapped[1] : null
      ];
      console.log(requestDetails, 'see this well')

        if (req.image !== null && req.files !== undefined) {
          await cloudinary.multipleUpload(requestDetails).then(img => {
              const mapResult = img.map(b => b.url)
            requestDetails.imageUrl = mapResult[0];
            requestDetails.iconUrl = mapResult[1];
            return requestDetails;
          });
        }
        service.updateCategory(req.body,req.query.id , requestDetails).then(data =>{
          res.status(200).send(data);
        }).catch(err => {
          res.status(500).send(err);
        });
  }

  this.deleteCategory = (req,res)=>{
    service.deleteCategory(req.query.id).then(data =>{
      res.status(200).send(data);
    }).catch(err => {
      res.status(500).send(err);
    });
  }
}