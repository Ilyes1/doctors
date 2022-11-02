import { useState } from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"

const Home = () => {

    const [username, setUsername] = useState('')

  return (
    <div>
        
        <Header />

        <div className="banner">
            <div className="container">
                <h1>Everything you are. <br /> In one simple link.</h1>
                <h4>Join 25M+ people and share everything you create, <br /> curate and sell online. All from the one link in bio.</h4>
                <form action="/signup" className="link-input" onSubmit={() => localStorage.setItem('username', username)}>
                    <input type="text" placeholder="Username..." onChange={(e) => setUsername(e.target.value)} />
                    <button type="submit">Claim your Link</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Home