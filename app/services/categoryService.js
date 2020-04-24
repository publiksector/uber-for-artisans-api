const model = require('../models/category');

//create category
exports.createCategory = (data, image) => {
    return new Promise((resolve, reject) => {
        const detail = {
            name: data.name,
            imageUrl: image.imageUrl,
            iconUrl: image.iconUrl,
        }
        model.create(detail).then(created => {
            if (created) {
                resolve({ success: true, message: 'Category created successfully !!!' })
            } else {
                resolve({ success: false, message: 'Error creating category!!!' })
            }
        }).catch(err => reject(err));
    })
}

//get all categories with pagination
exports.getAllCategories = (data) => {
    return new Promise((resolve, reject) => {
        model.find({'viewLocation.location':data.location})
            .exec((err, found) => {
                if (err) reject(err);
                if (found.length !== 0) {
                    model.aggregate([
                        {
                            $project:{
                                name:1,
                                imageUrl:1,
                                iconUrl:1,
                                dateCreated:1,
                                viewLocation:{
                                    $filter:{
                                        input: "$viewLocation",
                                        as: "viewLocations",
                                        cond:{$eq :["$$viewLocations.location", data.location]}
                                    }
                                }
                            }
                        }
                    ]).exec((err , gotten)=>{
                        if(err)reject(err);
                        if(gotten){
                          var maps = gotten.sort(function (a, b) {
                        return b.views - a.views;

                    })
                    resolve({ success: true, message: 'categories found', data: maps })
                        }else{
                            resolve({ success: false, message: ' no categories found', }) 
                        }
                    })

                } else {
                    model.updateMany({}, {$push:{"viewLocation":{"location":data.location}}}).exec((err , updated)=>{
                        if(err)reject(err)
                        if(updated){
                            model.aggregate([
                                {
                                    $project:{
                                        name:1,
                                        imageUrl:1,
                                        iconUrl:1,
                                        dateCreated:1,
                                        viewLocation:{
                                            $filter:{
                                                input: "$viewLocation",
                                                as: "viewLocations",
                                                cond:{$eq :["$$viewLocations.location", data.location]}
                                            }
                                        }
                                    }
                                }
                            ]).exec((err , gottens)=>{
                                if(err)reject(err);
                                if(gottens){
                                  var mapx = gottens.sort(function (c, d) {
                                return d.views - c.views;
        
                            })
                            resolve({ success: true, message: 'categories found', data: mapx })
                                }else{
                                    resolve({ success: false, message: ' no categories found', }) 
                                }
                            })
                        }
                    })
                }
            })
    })
}

exports.getCategoryById = (id ,state) => {
    return new Promise((resolve, reject) => {
        model.findById({ _id: id }, { viewLocation:0}).exec((err, result) => {
            if (err) reject(err);
            if (result) {
                model.update({ _id: id ,"viewLocation.location":state}, { $inc: { "viewLocation.$.views": 1 } }).exec((err, found) => {
                    if (err) reject(err);
                    resolve({ success: true, message: 'found category', data: result })
                })
            } else {
                resolve({ success: false, message: 'unable to find category' });
            }
        })
    })
}

exports.updateCategory = (data, id, image) => {
    return new Promise((resolve, reject) => {
        const detail = {
            name: data.name,
            imageUrl: image.imageUrl,
            iconUrl: image.iconUrl,
        }
        model.update({ _id: id }, detail).then(created => {
            if (created) {
                resolve({ success: true, message: 'Category updated successfully !!!' })
            } else {
                resolve({ success: false, message: 'Error updating category!!!' })
            }
        }).catch(err => reject(err));
    })
}

exports.deleteCategory = (id) => {
    return new Promise((resolve, reject) => {
        model.findByIdAndRemove({ _id: id }).exec((err, deleted) => {
            if (err) reject(err);
            if (deleted) {
                resolve({ success: true, message: 'Category deleted successfully !!' })
            } else {
                resolve({ success: true, message: 'Error enocuntered while deleting category !!' })
            }
        })
    })
}