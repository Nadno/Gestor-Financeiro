import React from 'react';
import { Link } from 'react-router-dom';
 
import './styles.css';

import { FiArrowLeft } from 'react-icons/fi'

export default function Info() {
    return(
        <div className="info-container">
            <header className="head">
                <h1>Gestor</h1>
                <Link to="/">
                    <FiArrowLeft size={18} color="#f5f5f5" />
                </Link>
            </header>
            <div id="center-container">
            <h1>Bem vindo ao Gestor!</h1>
            <p>
                Para seu primeiro passo no site você pode clicar no botão novo, onde será
                levado para criação de items.
            </p>
            <p>Há algumas coisas que você precisa saber para criar um item:</p>
            <ul>
                <li><strong>1 -</strong> O nome escolhido será escolhido por você.</li>
                <li><strong>2 -</strong> Há 4 tipos de items:</li>
                    <ul>
                        <li><strong>Receita </strong>- Item no qual será colocado o valor que você recebe por mês. Ex.: (Salário).</li>
                        <li><strong>Mensal </strong>- Todo tipo de gasto que você tem em um mês. Ex.:(Netflix, Internet, Aluguel, etc).</li>
                        <li><strong>Variável </strong>- Gasto total por mês em coisas aleátórias. Ex.:(Coxinha, Refrigerante, Balinhas).</li>
                        <li><strong>Fixo </strong>- Gasto com coisas que fixas. Ex.:(Conta de energia, água)</li>
                    </ul>
                <li><strong>3 -</strong> O valor deve ser passo apenas em números inteiros</li>
            </ul>
            <p>Caso queira alterar as informações em um item, bastar clicar na engrenagem e depis em editar.</p>
            <p>Caso queira excluir, basta clicar em excluir.</p>
            <p><strong>E por último, o botão de dinheir mostra o gasto ou receita de um determinado item por ano.</strong></p>
            </div>
        </div>
    )
}