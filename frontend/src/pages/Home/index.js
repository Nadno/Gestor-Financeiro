import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

import { FiSettings, FiInfo, FiDollarSign } from 'react-icons/fi';

export default function Header() {
    const [items, setItems] = useState([]);
    const [category, setCategory] = useState([]);
    const [amounts, setAmounts] = useState([]);

    const [page, setPage] = useState(1);
    const [pages, setPages] = useState();

    function recipesAndExpenses(isGeral, name, type) {
        let amount = 0;
        let recipe = 0;

        items.map(item => {
            if(isGeral) {
                if(item.type === "Receita") recipe += item.amount;
                if(item.type !== "Receita") amount += item.amount;
            }

            if(item.name === name) {
                if(item.type === "Receita") recipe = item.amount;
                if(item.type !== "Receita") amount = item.amount;
            };

            if(item.type === type) amount += item.amount;
        });

        amount *= 12;
        recipe *= 12;

        if(isGeral) {
            if(amount > recipe) {
                const name = "Prejuizo";
                const sub = amount - recipe;

                const amountOb = {recipe, amount, name, sub}

                return amountOb;
            } else {
                const name = "Lucro";
                const sub = recipe - amount;

                const amountOb = {recipe, amount, name, sub}

                return amountOb;
            }
        } 

        const amountOb = {recipe, amount};

        return amountOb;
    };

    useEffect(() => {
        api.get(`/model?page=${page}`).then(response => {
            setItems(response.data.docs);
            setPages(response.data.pages);
            setCategory(items);
            setAmounts(recipesAndExpenses(true));

        })
    }, [items.length]);

    function changeCat(type) {
        const amount = recipesAndExpenses(false, "", type);
        const pEl = document.querySelector('p#item-amount');

        const newItem = items.filter(item => {
            if (type !== "Geral") return item.type === type;
    
            return item;
        });
        const hEl = document.querySelector('h2#cat');

        pEl.setAttribute('style', 'color:black;');
        hEl.innerHTML = `Categoria: ${type}`;
        
        if(type !== "Geral" && amount.amount === 0 && amount.recipe === 0) {
            pEl.setAttribute('style', 'color:red;');
            pEl.innerHTML = "SEM ITENS NESTA CATEGORIA!";

        } else if(type !== "Receita" && type !== "Geral") {
            pEl.innerHTML = `Gasto ${type} por ano: 
            ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
            .format(amount.amount)}`;

        } else {
            pEl.innerHTML = "";
        }
        
        setCategory(newItem);
    };

    function itemAmount(name, type) {
        const amount = recipesAndExpenses(false, name);
        const pEl = document.querySelector('p#item-amount');
        
        if(type !== "Receita") {
            pEl.innerHTML = `Gasto por ano de ${name}: ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                                                         .format(amount.amount)}`;
        } else {
            pEl.innerHTML = `Receita por ano de ${name}: ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                                                           .format(amount.recipe)}`;
        }
    };

    function pageButtons(action) {
        if(action === "next" && pages > page) setPage(page + 1);
        if(action === "return" && pages === page) setPage(page - 1);
    }

    return (
        <div className="home-container">
            <header className="head">
                <h1>Gestor</h1>
                <Link to="/info">
                    <FiInfo size={18} color="#f5f5f5" />
                </Link>
            </header>

            <main>
                <div className="buttons">
                    <Link to="/newitem">
                        <button id="new">Novo</button>
                    </Link>

                    <button onClick={() => changeCat("Geral")}>Geral</button>
                    <button onClick={() => changeCat("Receita")}>Receitas</button>
                    <button onClick={() => changeCat("Mensal")}>Mensal</button>
                    <button onClick={() => changeCat("Variável")}>Variável</button>
                    <button onClick={() => changeCat("Fixo")}>Fixo</button>
                </div>

                <div id="count">
                    <strong id="recipes-and-expenses">
                        <p>Receita total por ano: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                                    .format(amounts.recipe)} </p>
                        <p>Gasto total por ano:  {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                                                    .format(amounts.amount)}</p>
                        <p>{amounts.name} anual: {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
                                                    .format(amounts.sub)}</p>
                        <p id="item-amount"></p>
                    </strong>
                </div>

                <h2 id="cat">Categoria: Geral</h2>

                <ul>
                    {category.map(item => {
                            return (
                                <li key={item._id}>
                                    <section>
                                        <strong>{item.name}</strong>
                                        <p>Tipo: {item.type}</p>
                                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                                            .format(item.amount)}</p>
                                    </section>

                                    <div id="config-and-amount">
                                        <button type="button" onClick={() => itemAmount(item.name, item.type)}>
                                            <FiDollarSign size={18} color="#000" />
                                        </button>

                                        <a className="button" href={`/item/${item._id}`}>
                                            <FiSettings size={18} color="#000" />
                                        </a>
                                    </div>
                                </li>
                            );
                        })

                    }
                </ul>
                <div className="buttons">
                    <p>
                        <button disabled={page === 1} onClick={() => pageButtons("return")} type="button">
                            Return
                        </button>
                        {page}
                        <button disabled={page === pages} onClick={() => pageButtons("next")} type="button">
                            Next
                        </button>
                    </p>
                </div>
            </main>
        </div>
    );

}
