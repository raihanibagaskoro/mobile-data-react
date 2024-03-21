import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CardCustomer from '../Components/CardCustomer/CardCustomer'


function Customer() {
    const navigate = useNavigate()
    useEffect(() => {
        let token = localStorage.getItem('id')
        if(token === '' || token === null){
            navigate('/login')
        }
    }, [])

  return (
    <div>
        <CardCustomer />
    </div>
  )
}

export default Customer