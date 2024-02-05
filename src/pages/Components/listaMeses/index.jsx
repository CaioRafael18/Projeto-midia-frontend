import React from 'react';

const ListaMeses = ({ value, onChange }) => {
    const meses = [
        "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
        "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
    ];

    const handleSelectChange = (event) => {
        onChange(event.target.value);
    };
    
    return (
        <select value={value} onChange={handleSelectChange}>
            <option value="" disabled hidden className='label_meses'>Selecione um mês</option>
            {meses.map((mes, index) => (
                <option key={index} value={mes}>{mes}</option>
            ))}
        </select>
    );
};

export default ListaMeses;