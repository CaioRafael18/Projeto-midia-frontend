import React, { useState } from 'react'
import iconeDelete from '../../image/icone-lixeira.png'

const ListaLinks = ({data, handleDelete}) => {
  return (
    <>
    <li className="box_item">
      <div className='box_descricao'>
        <a  href={data.descricao} target="_blank">
          <strong>{data.title}</strong> 
        </a>
        
        <img 
          className='iconeDelete'
          src={iconeDelete} 
          onClick={() => handleDelete(data._id)}
        >
        </img>
      </div>

      <div className='box_tag'>
        <span className='categoria'>{data.mes}</span>  
      </div>
    </li>  
    </>
  )
}

export default ListaLinks