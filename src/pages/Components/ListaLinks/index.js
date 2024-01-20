import React, { useState } from 'react'
import { TiDelete } from "react-icons/ti";

const ListaLinks = ({data, handleDelete}) => {
  return (
    <>
    <li className="box_item">
      <TiDelete onClick={() => handleDelete(data._id)} />
      <a href={data.descricao} target="_blank" title={data.title}>
          <strong>{data.title}</strong> 
      </a>
      <div className='box_tag'>
        <span className='categoria'>{data.mes}</span>  
      </div>
    </li>  
    </>
  )
}

export default ListaLinks