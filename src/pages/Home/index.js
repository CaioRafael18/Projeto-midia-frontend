import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Meses from '../Components/Meses';
import ListaLinks from '../Components/ListaLinks';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import './Home.css';
import Logo from '../image/logosara.png'
import botaoCadastro from '../image/botao-cadastro.png'
import simboloMidia from '../image/simbolo-midia.png'


const Home = () => {
  const [allLinks, setAllLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState('');
  const linksPerPage = 9;
  const totalPages = Math.ceil(allLinks.length / linksPerPage);
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
    const startIndex = (currentPage - 1) * linksPerPage;
    const endIndex = startIndex + linksPerPage;
    const selectedMonthLower = selectedMonth.toLowerCase();

    let filtered = allLinks;
  
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        link =>
          link.title.toLowerCase().includes(searchTermLower) ||
          link.descricao.toLowerCase().includes(searchTermLower)
      );
    }
  
    if (selectedMonth) {
      filtered = filtered.filter(link => {
        const linkMonthLower = link.mes.toLowerCase();
        const isMatchingMonth = linkMonthLower === selectedMonthLower;
        return isMatchingMonth;
      });
    }
  
    const reversedList = filtered.slice().reverse();
    const linksDaPagina = reversedList.slice(startIndex, endIndex);
  
    setFilteredLinks(linksDaPagina);
  }, [currentPage, allLinks, searchTerm, selectedMonth]);


  async function handleDelete(id) {
    try {
      const accessToken = 'seuTokenAqui'; 
  
      await api.delete(`/links/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAllLinks(prevLinks => prevLinks.filter(link => link._id !== id));  
    } catch (error) {
      console.error('Erro ao deletar o link:', error);
    }
  }

  function handleFiltro(mes) {
    setSelectedMonth(mes);
    setCurrentPage(1);
  }

  function handleButton(e) {
    e.preventDefault();
    navigate('/Cadastro');
  }

  const generatePaginationItems = () => {
    const totalPages = Math.ceil(allLinks.length / linksPerPage);
    const maxPagesToShow = 5;
    const adjacentPages = 1;
    let pages = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        const isCurrentPage = i === currentPage;

        pages.push(
          <Pagination.Item
            key={i}
            active={isCurrentPage}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
    } else {
      const startPage = Math.max(1, currentPage - adjacentPages);
      const endPage = Math.min(currentPage + adjacentPages, totalPages);

      for (let i = startPage; i <= endPage; i++) {
        const isCurrentPage = i === currentPage;

        pages.push(
          <Pagination.Item
            key={i}
            active={isCurrentPage}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage - adjacentPages > 1) {
        pages.unshift(<Pagination.Ellipsis key="leftEllipsis" />);
      }

      if (currentPage + adjacentPages < totalPages) {
        pages.push(<Pagination.Ellipsis key="rightEllipsis" />);
      }
    }

    return pages;
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            {filteredLinks.map(data => (
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
        <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} />
        {generatePaginationItems()}
        <Pagination.Next 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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