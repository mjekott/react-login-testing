import axios from 'axios'
import React, { useState } from 'react'

function Login() {
    const [error, setError] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPsssword] = useState("")
    const [loading, setLoading] = useState(false)
    const [user,setUser] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const { data } = await axios.get("https://jsonplaceholder.typicode.com/users/1")
            setUser(data)
        } catch (error) {
            setError(true)

        }
        setLoading(false)


    }
  return (
      <div className='container'>
          {user && <span data-testid="user-text">{user.name}</span>}
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)} />
              <input type="password" placeholder='password' value={password} onChange={(e)=>setPsssword(e.target.value)}/>
              <button disabled={!username || !password} >{loading ? "loading..." : "Submit"}</button>
              <span data-testid="error" style={{display:`${error ? "flex":"none"}`}}>Something went wrong</span>
          </form>
    </div>
  )
}

export default Login