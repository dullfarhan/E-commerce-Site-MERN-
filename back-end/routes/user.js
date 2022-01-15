const User = require("../models/User");
/*const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
*/

const router = require("express").Router();
var globaluserid='61d25e75ca0f11c405214952';

//UPDATE user
router.put("/:id", /*verifyTokenAndAuthorization,*/ async (req, res) => {
 /* if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  */

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id",/* verifyTokenAndAuthorization,*/ async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get("/find/:id", /*verifyTokenAndAdmin, */async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get("/",/* verifyTokenAndAdmin,*/ async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", /*verifyTokenAndAdmin,*/ async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});

// add to the user cart 


router.post("/addtocart/:prodid", /*verifyTokenAndAdmin,*/ async (req, res) => {
  res.send("we are on cart");
  console.log(req.params.prodid);

  await User.findOneAndUpdate(

    {
     //_id:'61d25e75ca0f11c405214952'

     _id:globaluserid
        },
    {
      $push:{
        // this code is used when we have product id and quantity
        // cartitemlist:[{productId :req.params.prodid}]
      cartitemlist:req.params.prodid
        
      }}
  )
 
});


router.post("/order/:prodid", /*verifyTokenAndAdmin,*/ async (req, res) => {
  console.log(req.params.prodid);
  console.log(globaluserid);
  console.log('after try');


  try{
    const user1 = await User.findOne(
        {
            _id: globaluserid,
        },
        
    );
   const vvv = [...user1.cartitemlist];
   console.log(vvv);

   await User.findOneAndUpdate(

    {

     _id:globaluserid
        },
    {
      $push:{
        // this code is used when we have product id and quantity
        // cartitemlist:[{productId :req.params.prodid}]
      currentorderlist:vvv
        
      }}
  )

  await User.findOneAndUpdate(

    {

     _id:globaluserid
        },
    {
      $set:{
        // this code is used when we have product id and quantity
        // cartitemlist:[{productId :req.params.prodid}]
      cartitemlist:[]
      }}
  )


  }catch(err){
    res.status(500).json(err);
}
        

  
 // User.findByIdAndUpdate(globaluserid, { prevorder : {...cartitemlist} })
 
}); 

//REGISTER
router.post("/register", async (req, res) => {
  res.send('we are on register');
  console.log(req.body.username);
console.log(req.body.email);
  const newUser = new User({
    
    username: req.body.username,
    email: req.body.email,
  
   password:req.body.password,
   address:req.body.address
  });

  try {
    const savedUser = await newUser.save();
  

    //res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  //res.send('we are on login');


    try{
        const user1 = await User.findOne(
            {
                userName: req.body.username,
                password:req.body.password
            }
        );

     console.log("hello    world ");
        console.log(user1.username);
        console.log(user1.email);
        console.log(user1.password);



        !user1 && res.status(401).json("Wrong User Name");

        

        const originalPassword = user1.password;

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");

            if(inputPassword==originalPassword)
            {
                console.log('Password matched');
                globaluserid=user1.id;
                console.log(globaluserid);


            }
            else{
                console.log('Password not matched');
        
            }
              
      
       
       
    }catch(err){
        res.status(500).json(err);
    }

});

module.exports = router;