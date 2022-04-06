
import axios from "axios"
import { useState } from "react"
import {useNavigate , Link } from "react-router-dom"


export const SignIn = () => {
    const navigate = useNavigate ()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const singInUser = (e) => {
        e.preventDefault()
        const user = {
            email,
            password
        }
        axios.post(`http://localhost:8000/signin`, user).then(res => {
            alert('signIn sucessfully')
            navigate('/')
        }).catch((e) => {
            console.log(e)
        })
    }

    return (<div class="container" style={{width: '40%'}}>
        <form onSubmit={singInUser}>
            <h1 class="nav justify-content-center">SignIn</h1>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} />
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <button type="submit" class="btn btn-primary">Submit</button> 
                <span>Don't have account? <Link to="/signup">SignUp</Link></span>
            </div>
            </form>
    </div>)
}

