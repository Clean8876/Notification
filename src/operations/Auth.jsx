import React from 'react'
import { authEndpoint } from '../Services/api'



const{SIGNUP_API,SIGNIN_API}=authEndpoint

export function signUp(
    name,
    email,
    password,
    confirmPassword,
    navigate
  ) {
    return async (dispatch) => {
      
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
            name,
            email,
            password,
            confirmPassword
          
        })
  
        console.log("SIGNUP API RESPONSE............", response)
        if(!response.data){
          throw new Error(response.data.message)
  
        }
        toast.success("Account Created Successfully")
        navigate("/")
        } catch (error) {
          console.log("SIGNUP API ERROR............", error)
          toast.error("Could Not Create Account")
          navigate('/')
          }
  
      dispatch(setLoading(false))
     
    }
  }
  export async function signin(email, password) {
    try {
        const response = await axios.post(
          SIGNIN_API,
            { email, password },
            {
              headers: {
                'ngrok-skip-browser-warning': 'true', // Bypass ngrok warning
                'Content-Type': 'application/json',
                'Origin': window.location.origin // Explicit origin header
              }
            }
        );

        if (response.status === 200) {
            window.location.href = '/home'; // Direct redirect
        }
    } catch (error) {
        alert(error.response?.data?.message || 'Login failed');
    }
  }