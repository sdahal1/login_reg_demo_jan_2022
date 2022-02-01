import React from 'react';

const RegistrationForm = () => {
    return (
        <div>
           <h3>Register</h3> 
           <form>
               <div className="form-group">
                   <label htmlFor="">First Name</label>
                   <input type="text" name="firstName" id="" className = 'form-control' />
               </div>
               <div className="form-group">
                   <label htmlFor="">Last Name</label>
                   <input type="text" name="lastName" id="" className = 'form-control' />
               </div>
               <div className="form-group">
                   <label htmlFor="">Email</label>
                   <input type="text" name="email" id="" className = 'form-control' />
               </div>
               <div className="form-group">
                   <label htmlFor="">Password</label>
                   <input type="password" name="password" id="" className = 'form-control' />
               </div>
               <div className="form-group">
                   <label htmlFor="">Confirm Password</label>
                   <input type="password" name="confirm" id="" className = 'form-control' />
               </div>
               <input type="submit" value="Register" className="btn btn-primary mt-3" />
           </form>
        </div>
    );
};

RegistrationForm.propTypes = {};

export default RegistrationForm;