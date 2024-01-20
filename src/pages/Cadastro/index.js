import React, { useState } from 'react'
import './Cadastro.css'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

const Cadastro = () => {
  const [title, setTitle] = useState('')
  const [descricao, setDescricao] = useState('')
  const [mes, setMes] = useState('')
  const navigate = useNavigate()
  const [allLinks, setAllLinks] = useState([]);
 
  async function handleSubmit(e) {
    e.preventDefault();
  
    const response = await api.post('/links', {
      title,
      descricao,
      mes
    });
  
    // Limpe os campos do formulário
    setTitle('');
    setDescricao('');
    setMes('');
  
    // Navegue para a página '/Home'
    navigate('/Home');
  }

  return (
    <>
      <div>
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
     </div>
    </>
  )
}

export default Cadastro