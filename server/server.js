const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config();




const app = express()

mongoose.Promise = global.Promise; 
mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieParser())

//Models
const {User} = require('./models/user')
const {Brand} = require('./models/Brand')
const {Wood} = require('./models/Wood')
const {Product} = require('./models/product')
//middlewares
 const {auth} = require('./middleware/auth')
const {admin} = require('./middleware/admin')


//====================================================
//                   Products                 //
//=====================================================

app.get('/api/product/articles',(req,res)=>{
    let order = req.query.order? req.query.order: 'asc'
    let sortBy = req.query.sortBy ? req.query.sortBy: '_id' 
    let limit = req.query.limit ? parseInt(req.query.limit): 100

    Product.find().
    populate('brand').
    populate('wood').
    sort([[sortBy,order]]).
    limit(limit).
    exec((err,docs)=>{
        if(err) return res.status(400).json({success:false,err})
        return res.status(200).json({success:true,docs})
    })
})




app.get('/api/product/articles_by_id',(req,res)=>{
    
    let type =req.query.type
    let items = req.query.id;
    if(type=== "array"){
        let ids = req.query.id.split(',');
        items = []
        items = ids.map(item=>{
             return mongoose.Types.ObjectId(item)
        })
    }

    Product.find({'_id': {$in: items}}).
    populate('brand').
    populate('wood').
    exec((err,docs)=>{
        if(err) return res.status(400).json({success:false,err})
        return res.status(200).json({success:true,docs})
    })
})



app.post('/api/product/article',auth,admin,(req,res)=>{
    const product = new Product(req.body)

    product.save((err,doc)=>{
        if(err) return res.status(400).json({success: false,err})
        return res.status(200).json({success:true,article:doc})
    })
})

//====================================================
//                   Wood Categories                 //
//=====================================================

app.post('/api/product/wood',auth,admin,(req,res)=>{
    const wood = new Wood(req.body)
    wood.save((err,wood)=>{
        if(err) return res.status(400).json({success: false,err})
        return res.status(200).json({wood})
    })
})

app.get('/api/product/wood',(req,res)=>{
     Wood.find((err,wood)=>{
        if(err) return res.status(400).send(err)
        return res.status(200).json({wood})
    })
})



//====================================================
//              Brand categories                     //
//=====================================================

app.post('/api/product/brand',auth,admin,(req,res)=>{
    const brand = new Brand(req.body)

    brand.save((err,doc)=>{
        if(err) return res.json({success: false,err})

        res.status(200).json({
            success: true,
            brand: doc
        })
    })
})

app.get('/api/product/brand',(req,res)=>{
     Brand.find({},(err,brands)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send({brands})
    })
})


  
//====================================================
//                   user route                      //
//=====================================================
app.post('/api/users/register',(req,res)=>{
    const user = new User(req.body) 
    user.save((err,doc)=>{
        if(err){
            return res.json({success: false,err})
        }
        res.status(200).json({
            success: true,
            userData: doc
        })
    })
})

app.post('/api/users/login', (req,res)=> {
    User.findOne({email: req.body.email},(err,user)=>{
        if(!user) return res.status(400).json({loginSuccess: false, message: "Auth failed, Email not found"})
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.status(400).json({loginSuccess: 'false', message: "wrong password"})
            user.generateToken((err,user)=>{
                
                if(err) return res.status(400).send(err)
                res.cookie('w_auth',user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    })
     
}
)

app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        isAmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        cart: req.user.cart,
        history: req.user.history,
        role: req.user.role
    })
})

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id: req.user._id},
        {token: ''},
        (err,doc)=>{
            if(err) return res.status(500).json({success: false,err})
            return res.status(200).send({
                success: true
            })
        }
        )
})

const port  = 3002 || process.env.PORT
app.listen(port,()=>console.log(`Server Running on ${port}`))