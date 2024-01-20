import React, { useEffect, useState } from 'react'
import './Cadastro.css'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Logo from '../image/logosara.png'
import simboloMidia from '../image/simbolo-midia.png'

const Cadastro = () => {
  const [title, setTitle] = useState('')
  const [descricao, setDescricao] = useState('')
  const [mes, setMes] = useState('')
  const navigate = useNavigate()
  const [allLinks, setAllLinks] = useState([]);
 
  useEffect(() => {
    document.body.classList.add('cadastro');
    return () => {
      document.body.classList.remove('cadastro');
    };
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
  
    const response = await api.post('/links', {
      title,
      descricao,
      mes
    });
  
    setTitle('');
    setDescricao('');
    setMes('');
  
    navigate('/Home');
  }

  
  function handleHome(e){
    e.preventDefault()
    navigate('/Home')
  }

  return (
    <>
      <div>
      <section className="section">
        <div className="logo_home">
          <img src={Logo} alt='Logo da Sara' onClick={handleHome}/>
        </div>
        <div className='section_texto'>
          <img src={simboloMidia} alt='Midia'/>
        </div>
      </section>

        <form className="container__formulario" data-formulario onSubmit={handleSubmit}>
            <h2 className="formulario__titulo">Adicione um novo Arquivo!</h2>
                <div className="formulario__campo">
                    <label className="campo__etiqueta">Titulo</label>
                    <input 
                      className="campo__escrita" 
                      required 
                      placeholder="Titulo"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                </div>

                <div className="formulario__campo">
                    <label className="campo__etiqueta">Link</label>
                    <input 
                      className="campo__escrita" 
                      required
                      placeholder="Link" 
                      value={descricao}
                      onChange={e => setDescricao(e.target.value)}
                    />
                </div>
                
                <div className="formulario__campo">
                    <label className="campo__etiqueta">Mes</label>
                    <input 
                      className="campo__escrita" 
                      required
                      placeholder="Mes"
                      value={mes}
                      onChange={e => setMes(e.target.value)}
                    />
                </div>

                <input 
                  className="formulario__botao" 
                  type="submit"
                 />
        </form>

        <footer className="rodape"></footer>
     </div>
    </>
  )
}

export default Cadastro