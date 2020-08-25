const model = require('../models/artisanAccountDetails');
const artisan = require('../models/artisan')
exports.AddAccount = (options , Id , publicId)=>{
    return new Promise((resolve , reject)=>{
        model.findOne({artisanId:Id ,AccountNumber:options.AccountNumber }).exec((err , found)=>{
            if(err) reject(err)
            if(!found){
                let details = {
                    AccountNumber:options.AccountNumber,
                    artisanId: Id,
                    AccountName:options.AccountName,
                    BankName:options.BankName
                }
                model.create(details).then(created =>{
                    if(created){
                    artisan.findOneAndUpdate({publicId:publicId}, {status:true}).exec((err , updated)=>{
                        if(err) reject(err)
                        if(updated){
                            resolve({success:true , message:"artisan account details created successfully"})
                        }else{
                            resolve({success:false , message:"could not complete artisan account creation"})
                        }
                    })
                    }else{
                        resolve({success:false , message:"could not complete artisan account creation"}) 
                    }
                }).catch(err => reject(err))
            }else{
                resolve({success:false , message:"account already exists"})
            }
        })
    })
}

exports.getArtisanAccount = (id)=>{
    return new Promise((resolve , reject)=>{
        model.findOne({artisanId:id},{__v:0 , dateCreated:0 , _id:0 }).exec((err , exists)=>{
            if(err) reject(err)
            if(exists){
                resolve({success:true , data:exists})
            }else{
                resolve({success:false , message:"could not get artisan account details"})
            }
        })
    })
}