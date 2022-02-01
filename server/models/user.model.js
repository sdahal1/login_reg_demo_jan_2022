const mongoose = require ('mongoose');
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema ({
    firstName: {
      type: String,
      required: [true, 'First name is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test (val), //tests the value from form with this regular expression pattern to validate if the pattern is in an email format
        message: 'Please enter a valid email',
      }
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be 8 characters or longer'],
    },
  },
  {timestamps: true}
);


//create a virtual field called "confirm" that is used just to validate the password matches confirm--> the getter and setter above are just creating temporary fields for _confirm
UserSchema.virtual('confirm')
  .get( () => this._confirm )
  .set( value => this._confirm = value ); 



//before (pre) running the other validations on the model the user to the db, validate the user objects password matches. If they dont match, this.invalidate() will create a validation error message 
UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirm) {
      this.invalidate('confirm', 'Password must match confirm password');
    }
    next(); //after the above process is done, go to the next usual step
  });


//before (pre) saving the user to the db (this means we have passed the validations), hash the users password (encrypt it)
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });




module.exports = mongoose.model ('User', UserSchema);
