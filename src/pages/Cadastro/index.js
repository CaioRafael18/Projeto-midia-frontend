import React, { useEffect, useState } from 'react'
import './Cadastro.css'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import Logo from '../image/logosara.png'
import simboloMidia from '../image/simbolo-midia.png'
import ListaMeses from '../Components/listaMeses'

const Cadastro = () => {
  const [title, setTitle] = useState('')
  const [descricao, setDescricao] = useState('')
  const [mes, setMes] = useState('')
  const navigate = useNavigate()
 
  useEffect(() => {
    document.body.classList.add('cadastro');
    return () => {
      document.body.classList.remove('cadastro');
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      const response = await api.post('/links', {
        title,
        descricao,
        mes
      });
  
      setTitle('');
      setDescricao('');
      setMes('');
  
      navigate('/Home');
    } catch (error) {
      alert('Ocorreu um erro ao enviar o formulário. Por favor, verifique se todos os campos foram preenchidos corretamente.');
      console.error('Erro ao enviar formulário:', error);
    }
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
                    <label className="campo__etiqueta">Título</label>
                    <input 
                      className="campo__escrita" 
                      required 
                      placeholder="Titulo"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      title="Por favor, preencha este campo."
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
                  <label className="campo__etiqueta">Mês</label>
                  <ListaMeses 
                    value={mes}
                    onChange={setMes} 
                  />
                </div>

                <input 
                  className="formulario__botao" 
                  type="submit"
                  value={'Salvar'}
                 />
        </form>

        <footer className="rodape"></footer>
     </div>
    </>
  )
}

export default Cadastro
