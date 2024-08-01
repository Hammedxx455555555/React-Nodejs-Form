// eslint-disable-next-line no-unused-vars
import React,{useState} from 'react'
import axios from 'axios'
import { Link,useNavigate} from 'react-router-dom'
const Login = () => {
  const [email,setEmail] = useState(" ")
  const [password,setPassword] = useState(" ")
   const nav = useNavigate()
  const handleLogin =async (event)=>{
    event.preventDefault();
    try{
    const response = axios.post("http://localhost:3000/login",{
      email,
      password
    },{
       "Content-Type": "application/json",
          Accept: "text/json"
    })
    setTimeout(()=>{
      nav('/home')
    },3000)
    console.log('Response:', response.data);
  } catch (err) {
    console.log("Error:", err);
  }
};
  return (
    
    <>
        <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleLogin} method='post' className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h3 className="text-center text-2xl">Sign in</h3>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            name="email"
            onChange={((e)=>setEmail(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
         <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={((e)=>setPassword(e.target.value))}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
        <p className="text-gray-600">Dont have an account yet ? <span color='green'><Link to='/' color='green'>Signup</Link></span></p>
      </form>
    </div>
    </>
  )
}

export default Login
