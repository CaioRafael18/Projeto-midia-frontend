import React, { useState } from 'react'
import iconeDelete from '../../image/icone-lixeira.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ListaLinks = ({data, handleDelete}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <li className="box_item">
      <div className='box_descricao'>
        <a  href={data.descricao}>
          <strong>{data.title}</strong> 
        </a>
        
        <img 
          className='iconeDelete'
          src={iconeDelete} 
          onClick={() => handleShow()}
        >
        </img>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Atenção!</Modal.Title>
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