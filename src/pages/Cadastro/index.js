import React, { useState } from 'react'
import './Cadastro.css'
import { useNavigate } from 'react-router-dom'

const Cadastro = () => {
  const navigate = useNavigate()

  function handleButton(){
    navigate('/Home')
  }

  return (
    <>
      <container>
        <form className="container__formulario" data-formulario onSubmit={handleButton}>
            <h2 className="formulario__titulo">Adicione um novo Arquivo!</h2>
                <div className="formulario__campo">
                    <label className="campo__etiqueta" for="titulo">Titulo</label>
                    <input name="titulo" className="campo__escrita" required placeholder="Titulo"
                        id='titulo'  data-titulo />
                </div>

                <div className="formulario__campo">
                    <label className="campo__etiqueta" for="url">Link</label>
                    <input name="url" className="campo__escrita" required
                        placeholder="Link" id='url' data-url />
                </div>
                <input 
                  className="formulario__botao" 
                  type="submit"
                 />
        </form>
     </container>
    </>
  )
}

export default Cadastro