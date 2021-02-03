import React,{useState} from 'react';

const LoginForm =({handle_login})=> {
  const [user,setuser]=useState({username: '',password: ''})

 const handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setuser({...user,[name]:value});
  };


    return (
      <form onSubmit={e =>handle_login(e, user)}>
        <h4>Log In</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={(e)=>handle_change(e)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={(e)=>handle_change(e)}
        />
        <input type="submit" />
      </form>
    );

}

export default LoginForm;
