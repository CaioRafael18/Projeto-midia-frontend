import React from "react";

function Meses({ handleFiltro }) {
  const meses = [
    "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
    "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
  ];

  return (
    <>
      {meses.map((mes, index) => (
        <li className="arquivos_item" key={index}>
          <a className="arquivos_item_a" href="#" onClick={() => handleFiltro(mes)}>
            <span className="arquivos_item_span">{mes}</span>
          </a>
        </li>
      ))}
    </>
  );
}

export default Meses;