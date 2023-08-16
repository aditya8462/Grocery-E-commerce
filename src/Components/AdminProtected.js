import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function AdminProtected(props) {
    const navigate=useNavigate()

    const {Component}=props
    useEffect(()=>{
        const Admin = localStorage.getItem('ADMIN')
   if(!Admin){
          alert('hi')
            navigate('/admin')
        }
       
    })
  return (
    <div><Component/></div>
  )
}