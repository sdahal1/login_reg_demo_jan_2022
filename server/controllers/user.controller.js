const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");





class UserController {

    //admin controller features for getting all users
    getAllUsers= (req,res)=>{
        User.find()
            .then(allUsers=>{
                res.json({results: allUsers})
            })
            .catch(err=>{
                res.json({error: err})
            })
    }



    register = (req, res) => {
        User.create(req.body)
          .then(user => {
              const userToken = jwt.sign({
                  id: user._id
              }, process.env.SECRET_KEY);
       
              res
                  .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                      httpOnly: true
                  })
                  .json({ msg: "success!", user: user });
          })
          .catch(err => res.json(err));
      }

    login = async(req, res) => {
        const user = await User.findOne({ email: req.body.email });
     
        if(user === null) {
            // email not found in users collection
            return res.json({msg: "User not found. Who YOU?!"})
        }
     
        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
     
        if(!correctPassword) {
            // password wasn't a match!
            return res.json({msg: "Password is incorrect!"})
        }
     
        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
     
        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "success!" });
    }

    //this is the same way to do login without the aync await
    // login(req, res) {
    //     User.findOne({email: req.body.email})
    //       .then(user => {
    //         if(user === null) {
    //           res.json({msg: "invalid login attempt"});
    //         } else {
    //           bcrypt.compare(req.body.password, user.password)
    //             .then(passwordIsValid => {
    //               if(passwordIsValid) {
    //                 res
    //                   .cookie("usertoken", jwt.sign({_id: user._id}, process.env.SECRET_KEY), {httpOnly: true})
    //                   .json({msg: "success!"});
    //               } else {
    //                 res.json({msg: "invalid login attempt, incorrect password"});
    //               }
    //             })
    //             .catch(err => res.json({msg: "invalid login attempt", err}));
    //         }
    //       })
    //       .catch(err => res.json(err));
    // }

    logout= (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
}


module.exports = new UserController();