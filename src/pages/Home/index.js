import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Meses from '../Components/Meses';
import ListaLinks from '../Components/ListaLinks';
import api from '../../services/api';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Logo from '../image/logosara.png'
import botaoCadastro from '../image/botao-cadastro.png'
import simboloMidia from '../image/simbolo-midia.png'


const Home = () => {
  const [allLinks, setAllLinks] = useState([]);
  const [filtrarLink, setFiltrarLink] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [mesSelecionado, setMesSelecionado] = useState('');
  const linksPorPagina = 9;
  const totalPaginas = Math.ceil(allLinks.length / linksPorPagina);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('home');
    return () => {
      document.body.classList.remove('home');
    };
  }, []);

  useEffect(() => {
    async function getAllLinks() {
      const response = await api.get('/links');
      setAllLinks(response.data);
    }

    getAllLinks();
  }, []);

  useEffect(() => {
    const inicioIndex = (paginaAtual - 1) * linksPorPagina;
    const finalIndex = inicioIndex + linksPorPagina;
    const mesSelecionadoLower = mesSelecionado.toLowerCase();

    let filtrado = allLinks;
  
    if (pesquisa) {
      const pesquisaLower = pesquisa.toLowerCase();
      filtrado = filtrado.filter(
        link =>
          link.title.toLowerCase().includes(pesquisaLower) ||
          link.descricao.toLowerCase().includes(pesquisaLower)
      );
    }
  
    if (mesSelecionado) {
      filtrado = filtrado.filter(link => {
        const linkMesLower = link.mes.toLowerCase();
        const mesCorrespondente = linkMesLower === mesSelecionadoLower;
        return mesCorrespondente;
      });
    }
  
    const listaInvertida = filtrado.slice().reverse();
    const linksDaPagina = listaInvertida.slice(inicioIndex, finalIndex);
  
    setFiltrarLink(linksDaPagina);
  }, [paginaAtual, allLinks, pesquisa, mesSelecionado]);


  async function handleDelete(id) {
    try {
      const accessToken = 'seuTokenAqui'; 
  
      await api.delete(`/links/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAllLinks(paginaAnterior => paginaAnterior.filter(link => link._id !== id));  
    } catch (error) {
      console.error('Erro ao deletar o link:', error);
    }
  }

  function handleFiltro(mes) {
    setMesSelecionado(mes);
    setPaginaAtual(1);
  }

  function handleButton(e) {
    e.preventDefault();
    navigate('/Cadastro');
  }

  function handleHome(e){
    e.preventDefault()
    navigate('/Home')
  }


  const generatePaginationItems = () => {
    const totalPaginas = Math.ceil(allLinks.length / linksPorPagina);
    const maxPaginasExibidas = 5;
    const paginasAdjacentes = 1;
    let paginas = [];

    if (totalPaginas <= maxPaginasExibidas) {
      for (let i = 1; i <= totalPaginas; i++) {
        const ispaginaAtual = i === paginaAtual;

        paginas.push(
          <Pagination.Item
            key={i}
            active={ispaginaAtual}
            onClick={() => setPaginaAtual(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      const paginaInicial = Math.max(1, paginaAtual - paginasAdjacentes);
      const paginaFinal = Math.min(paginaAtual + paginasAdjacentes, totalPaginas);

      for (let i = paginaInicial; i <= paginaFinal; i++) {
        const ispaginaAtual = i === paginaAtual;

        paginas.push(
          <Pagination.Item
            key={i}
            active={ispaginaAtual}
            onClick={() => setPaginaAtual(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (paginaAtual - paginasAdjacentes > 1) {
        paginas.unshift(<Pagination.Ellipsis key="leftEllipsis" />);
      }

      if (paginaAtual + paginasAdjacentes < totalPaginas) {
        paginas.push(<Pagination.Ellipsis key="rightEllipsis" />);
      }
    }

    return paginas;
  };

  return (
    <>
      <section className="section">
        <div className="logo_home">
          <img src={Logo} alt='Logo da Sara'/>
        </div>
        <div className='section_texto'>
          <img src={simboloMidia} alt='Midia'/>
        </div>
      </section>

      <div className="pesquisa_mobile">
        <input
          className="arquivos_pesquisa_mobile"
          placeholder="Pesquisar"
          value={pesquisa}
          onChange={(e) => setPesquisa(e.target.value)}
        />
        <div className="box_botao_mobile">
          <img
            src={botaoCadastro}
            className="botao_arquivo"
            onClick={handleButton}
          ></img>
        </div>
      </div>

      <main className="box">
        <div className="box_grupo">
          <ul className='box_lista'>
            {filtrarLink.map(data => (
              <ListaLinks
                key={data._id}
                data={data}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        </div>

        <aside className="arquivos">
          <div className="pesquisa">
            <input
              className="arquivos_pesquisa"
              placeholder="Pesquisar"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
            <div className="box_botao">
              <img
                src={botaoCadastro}
                className="botao_arquivo"
                onClick={handleButton}
              ></img>
            </div>
          </div>

          <h3 className='h3_texto'>MESES</h3>
          <ul className="arquivos_lista">
            <Meses handleFiltro={handleFiltro}/>
          </ul>
        </aside>
      </main>

      <Pagination className="paginacao">
        <Pagination.Prev onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))} />
        {generatePaginationItems()}
        <Pagination.Next 
          onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))}
        />
      </Pagination>

      <aside className="arquivos_mobile">
        <h3 className='h3_texto_mobile'>MESES</h3>
        <ul className="arquivos_lista_mobile">
          <Meses handleFiltro={handleFiltro}/>
        </ul>
      </aside>


      <footer className="rodape"></footer>
    </>
  );
}

export default Home;