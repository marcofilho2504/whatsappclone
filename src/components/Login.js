import React from 'react';
import './Login.css';
import api from '../api';

function Login ({ onReceive }) {
    const handleLogin = async () => {
        let result = await api.fbPopup();
        if(result) {
            onReceive(result.user);
        }else {
            alert('error!');
        }
    }

    return (
        <div className = 'login' >
            <button onClick = {handleLogin} >
                logar com o facebook
            </button>
        </div>
    )
}

export default Login;