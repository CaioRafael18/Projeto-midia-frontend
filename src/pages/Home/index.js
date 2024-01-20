import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Meses from '../Components/Meses';
import ListaLinks from '../Components/ListaLinks';
import api from '../../services/api';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import './Home.css';

const Home = () => {
  const [allLinks, setAllLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState('');
  const linksPerPage = 7;
  const totalPages = Math.ceil(allLinks.length / linksPerPage);
  const navigate = useNavigate();

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
  
    // Aplica o filtro e a pesquisa diretamente na lista original
    let filtered = allLinks;
  
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        link =>
          link.title.toLowerCase().includes(searchTermLower) ||
          link.descricao.toLowerCase().includes(searchTermLower)
      );
    }
  
    // Converte selectedMonth para minúsculas
    const selectedMonthLower = selectedMonth.toLowerCase();
  
    // Aplica o filtro do mês
    if (selectedMonth) {
      console.log('Filtrando por mês:', selectedMonth);
      filtered = filtered.filter(link => {
        // Converte o valor do mês no link para minúsculas
        const linkMonthLower = link.mes.toLowerCase();
        const isMatchingMonth = linkMonthLower === selectedMonthLower;
        console.log(`Link: ${link.title}, Mês: ${link.mes}, Coincide: ${isMatchingMonth}`);
        return isMatchingMonth;
      });
    }
  
    // Reverte a ordem da lista completa
    const reversedList = filtered.slice().reverse();
  
    // Exibir apenas os links da página corrente
    const linksDaPagina = reversedList.slice(startIndex, endIndex);
  
    setFilteredLinks(linksDaPagina);
    console.log('filteredLinks:', filteredLinks);
  }, [currentPage, allLinks, searchTerm, selectedMonth]);


  async function handleDelete(id) {
    await api.delete(`/links/${id}`);
    setAllLinks(prevLinks => prevLinks.filter(link => link._id !== id));
  }

  function handleFiltro(mes) {
    console.log(`Filtrar por mês: ${mes}`);
    setSelectedMonth(mes);
    setCurrentPage(1);
  }

  function handleSearch() {
    setCurrentPage(1);
  }

  function handleSearchButton() {
    console.log('Botão de Pesquisa clicado');
    handleSearch();
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
          <h1 className="section_item"> MIDIAS</h1>
      </section>

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
              type="search"
              className="arquivos_pesquisa"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button className="botao_lupa" onClick={handleSearchButton}>
              <FaMagnifyingGlass />
            </button>

            <div className="box_botao">
              <button
                className="botao_arquivo"
                onClick={handleButton}
              >+</button>
            </div>
          </div>

          <h3 className='h3_texto'>ARQUIVOS</h3>
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


      <footer className="rodape"></footer>
    </>
  );
}

export default Home;