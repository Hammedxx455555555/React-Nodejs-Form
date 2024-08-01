// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom'
import axios from 'axios';
import {FaSpinner} from "react-icons/fa"

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleSubmit = async (event) => { 
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/sign", {
        email,
        fname,
        lname,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
          Accept: "text/json"
        }
      });

      console.log('Response:', response.data);
      
      setTimeout(()=>{
     
        navigate('/login')
      },<FaSpinner className='animate spin' size={100}/>,4000)
      
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10">
        <form id='signup' onSubmit={handleSubmit} method='post' className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
                  <h3 className="text-center text-2xl">Sign-Up</h3>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="email shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname">
              First Name
            </label>
            <input
              id="fname"
              type="text"
              name="fname"
              required
              onChange={(e) => setFname(e.target.value)}
              className="fname shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">
              Last Name
            </label>
            <input
              id="lname"
              type="text"
              name="lname"
              required
              onChange={(e) => setLname(e.target.value)}
              className="lname shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
              required
              onChange={(e) => setPassword(e.target.value)}
              className="password shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
          <p className="text-gray-600">Have an account already? <Link to='/login' color='green'>Login</Link></p>
        </form>
      </div>
    </>
  );
};

export default Signup;
