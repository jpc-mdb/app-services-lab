import React from "react";
import { useState } from 'react';

export const Login = ({public_key, private_key}) => { 
    
    return (
        <div>   
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                    <input type="text" name="publicKey" className="form-control bg-light border-1 small" placeholder="API Public Key" aria-label="API Public Key" aria-describedby="basic-addon2" />
                    <input type="password" name="privateKey" className="form-control bg-light border-1 small" placeholder="API Private Key" aria-label="API Private Key" aria-describedby="basic-addon2" />
                    <div className="input-group-append">
                        <input 
                            type="submit" 
                            value="Submit" 
                            className="btn btn-primary btn-user btn-block"
                            onClick={e => {
                                public_key(e.target.publicKey);
                                private_key(e.target.privateKey);
                            }
                            } />
                    </div>
                </div>
            </form>

            {/* <form className="user ml-2 mr-2 mb-2 mt-2" onSubmit={storeInput}>
                <div className="form-group">
                    <input 
                        type="text"
                        className="form-control form-control-user" 
                        id="exampleInputEmail" 
                        aria-describedby="emailHelp" 
                        placeholder="API Public Key" />
                </div>
                <div className="form-group">
                    <input 
                        type="password"
                        className="form-control form-control-user" 
                        id="exampleInputPassword" 
                        placeholder="API Private Key" />
                </div>                        
                <input type="submit" value="Submit" className="btn btn-primary btn-user btn-block" />
            </form> */}
        </div>
    );
}