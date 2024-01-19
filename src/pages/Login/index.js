import React, { useState } from 'react'
import './Login.css'
import Logo from '../image/logosara.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [autenticando, setAutenticando] = useState(false)
  const navigate = useNavigate()

  function handleLogin(e){
    e.preventDefault();
    if(usuario === 'caio' && senha === 'caio'){
      navigate('/Home')
    }else{
      setAutenticando(true)
    }
  }

  return (
    <container className='Container'> 
      <div className="login">
        <div className="image_login">
            <img src={Logo} alt='Logo da Sara'/>
        </div>

        <form className="form" id="form" method="post" onSubmit={handleLogin}>
            <div className={`form-control ${autenticando  ? 'error' : ''}`}>
                <input 
                  type="text" 
                  value={usuario} 
                  placeholder="Usuário"
                  onChange={e => setUsuario(e.target.value)}
                  className={autenticando ? 'error' : ''}
                />
                {autenticando && <small>Usuário ou senha incorreta</small>}
            </div>
            <div className={`form-control ${autenticando  ? 'error' : ''}`}>
                <input 
                  type="password" 
                  id={senha} 
                  placeholder="Senha"
                  onChange={e => setSenha(e.target.value)}
                  className={autenticando ? 'error' : ''}
                />
                {autenticando && <small>Usuário ou senha incorreta</small>}
            </div>
            <button 
              type="submit" 
            >ENTRAR</button>
        </form> 
      </div>
    </container>
  )
}

export default Login
