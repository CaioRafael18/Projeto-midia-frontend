import React, { useEffect, useState } from 'react'
import './Login.css'
import botaoEntrar from '../image/botao-entrar.png'
import LogoSara from '../image/logosara.png'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [autenticando, setAutenticando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.add('login');

    return () => {
      document.body.classList.remove('login');
    };
  }, []);

  function handleLogin(e){
    e.preventDefault();
    if(usuario === 'saraguarabira' && senha === 'guarabira'){
      navigate('/Home')
    }else{
      setAutenticando(true)
    }

    document.body.classList.add('login');
  }

  return (
    <div className='Container'> 
      <div className="container_login">
        <div className="image_login">
            <img src={LogoSara} alt='Logo da Sara'/>
        </div>

        <form className="form" id="form" method="post" onSubmit={handleLogin}>
            <div className={`form-control-input ${autenticando ? 'error-input' : ''}`}>
              <input 
                  type="text" 
                  value={usuario} 
                  placeholder="Usuário"
                  onChange={e => setUsuario(e.target.value)}
              />
              {autenticando && <small>Usuário ou senha incorreta</small>}
            </div>
            <div className={`form-control-input ${autenticando ? 'error-input' : ''}`}>
                <input 
                  type="password" 
                  id={senha} 
                  placeholder="Senha"
                  onChange={e => setSenha(e.target.value)}
                />
                {autenticando && <small>Usuário ou senha incorreta</small>}
            </div>
            <img
              src={botaoEntrar}
              alt="Botão Entrar"
              className="botao-entrar"
              onClick={handleLogin}
            />
        </form> 
      </div>
    </div>
  )
}

export default Login