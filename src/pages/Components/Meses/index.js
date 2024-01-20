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
          <a href="#" onClick={() => handleFiltro(mes)}>
            <span>{mes}</span>
          </a>
        </li>
      ))}
    </>
  );
}

export default Meses;