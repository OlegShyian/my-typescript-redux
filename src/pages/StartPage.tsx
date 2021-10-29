import React from 'react'
import { Link } from 'react-router-dom'

const StartPage: React.FC = () => {
    return (
        <div className="wrapper__start__page">
            <h1>Hellow it is start pages for "Todo" application.</h1>
            <Link to="/login" className="href__button">login</Link>
            <h2>If you are a new user put the "register" button</h2>
            <Link to="/registration" className="href__button">registration</Link>
        </div>
    )
}

export default StartPage
