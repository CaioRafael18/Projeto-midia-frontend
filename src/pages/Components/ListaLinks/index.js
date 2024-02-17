import React, { useState } from 'react'
import iconeDelete from '../../image/icone-lixeira.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


const ListaLinks = ({data, handleDelete}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate()

  function handleEdit(id){
    navigate(`/Cadastro/${id}`, {state: {linkData: data}})
  }

  return (
    <>
    <li className="box_item">
      <div className='box_descricao'>
        <a className='box_texto' href={data.descricao}>
          <strong>{data.title}</strong> 
        </a>

        <div className='IconesLinks'>
          <FiEdit
            className='iconeEdit'
            onClick={() => handleEdit(data._id)}
          />

          <img 
            className='iconeDelete'
            src={iconeDelete} 
            onClick={() => handleShow()}
          >
          </img>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ATENÇÃO!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>
          <Button variant="primary" onClick={() => handleDelete(data._id)}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>

      <div className='box_tag'>
        <span className='categoria'>{data.mes}</span>  
      </div>
    </li>  
    </>
  )
}

export default ListaLinks