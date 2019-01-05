import React from 'react';

const login = (props) => {
    return (
        <div className ='loginPageContainer'>
            <h1>Hourly</h1>
            <form onSubmit={props.loginHandler}>
                <input type='text' placeholder='Username' name='username' onChange={props.changeHandler}/>
                <input type='text' placeholder='Password' name='password' onChange={props.changeHandler}/>
                <button onClick={props.loginHandler}>Login</button>
            </form>
        </div>
    );
}

export default login;