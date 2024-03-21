import React, { useState } from 'react'
import { Avatar, Grid, Paper, TextField, Box, Button } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PasswordIcon from '@mui/icons-material/Password';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const paperStyle = {padding: 20, height: '45vh', width: 300, margin: '20px auto'}

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleSubmit = () => {
        if(validate){
            axios.get('http://localhost:3001/users')
            .then(result => {
                result.data.map(user => {
                    if(user.username === username){
                        if(user.password === password){
                            toast.success('Success')
                            localStorage.setItem('id', user.id)
                            navigate('/paket')
                            window.location.reload()
                        } else {
                            toast.error('Please enter valid credential')
                        }
                    }
                })
            })
            .catch((err) => {
                toast.error('Login failed due to :' + err.message)
            })
        }
    }

    const validate = () => {
        let result = true
        if (username === '' || username === null){
            result = false
            toast.warning('Please Enter Username')
        }
        if (password === '' || password === null){
            result = false
            toast.warning('Please Enter Password')
        }
        return result
    }

  return (
    <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center">
                <Avatar><LockIcon /></Avatar>
                <h2>Login</h2> 
            </Grid>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField value={username} onChange={e=>setUsername(e.target.value)} label="Username" placeholder='Enter Username' variant="standard" fullWidth required/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField value={password} onChange={e=>setPassword(e.target.value)} label="Password" placeholder='Enter Password' type='password' variant="standard" fullWidth required/>
            </Box>
            <Button onClick={handleSubmit} style={{margin: '20px 0'}} type='submit' color='primary' variant="contained" fullWidth>Sign in</Button>
        </Paper>
    </Grid>
  )
}

export default Login