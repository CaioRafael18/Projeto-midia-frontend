import React from 'react'
import './Home.css'
import Logo from '../image/logosara.png'
import { useNavigate } from 'react-router-dom'
import Meses from '../../Components/Meses'

const Home = () => {
  const navigate = useNavigate()

  function handleButton(e){
    e.preventDefault()
    navigate('/Cadastro')
  }

  return (
    <>
      {/* <header>
        <nav className="cabecalho">

        </nav>
      </header>    */}

      <section className="section">
        <div className='section__img'>
          {/* <a href="#" className="cabecalho__logo">
            <img src={Logo} className="cabecalho__imagem" alt="Sara Guarabira"></img>
          </a> */}
        </div>
        <div className='section__texto'>
          <h1 className="section_item"> MIDIAS</h1>
        </div>

      </section>

      <main className="box">

        <div className="box_grupo">  
        
        </div>

        <aside className="arquivos">

            <div className="pesquisa">
                <input type="search" className="arquivos_pesquisa" placeholder="Pesquisar" data-pesquisa/>

                <button className="botao_lupa" data-botao-pesquisa>
                    <img src="./image/sem fundo.png" alt="icone lupa"/>
                </button>
                
                <div className="box_botao">
                  <button 
                    className="botao_arquivo"
                    botao-novo-arquivo
                    onClick={handleButton}
                  >+</button>
                </div>  
            </div>


            <h3>ARQUIVOS</h3>
            <ul className="arquivos_lista">
                <Meses/>
            </ul>
        </aside>
     </main>

      <nav aria-label="pagination">
          <ul className="pagination justify-content-center">
            <li className="prev">
              {/* <a className="page-link"><</a> */}
            </li>
            {/* <li className="goTo"><a className="page-link" href="#">1</a></li> */}
            <li className="next">
              {/* <a className="page-link" href="#">></a> */}
            </li>
          </ul>
      </nav>

    <footer className="rodape"></footer>
    </>
  )
}

export default Home