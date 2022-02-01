import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = () => {
    return (
        <div>
           <h3>Login</h3> 
           <form>
              
               <div className="form-group">
                   <label htmlFor="">Email</label>
                   <input type="text" name="email" id="" className = 'form-control' />
               </div>
               <div className="form-group">
                   <label htmlFor="">Password</label>
                   <input type="password" name="password" id="" className = 'form-control' />
               </div>
               
               <input type="submit" value="Login" className="btn btn-secondary mt-3" />
           </form>
        </div>
    );
};

LoginForm.propTypes = {};

export default LoginForm;