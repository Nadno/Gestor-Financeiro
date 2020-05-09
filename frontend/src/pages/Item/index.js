import React, { useState, useEffect } from 'react';

import { useHistory, useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiTrash2, FiEdit3 } from 'react-icons/fi'

import './styles.css';

import api from '../../services/api';


export default function Item() {
    const { id } = useParams();
    const [item, setItem] = useState({});
    const [isedit, setIsEdit] = useState(false);

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const history = useHistory();

    useEffect(() => {
        api.get(`/model/${id}`).then(response => {
            setItem(response.data);
        })
    }, [id]);

    function edit(bool) {
        setIsEdit(bool);
    }

    async function itemUpdate(e) {
        e.preventDefault();

        const data = {
            name,
            type,
            amount,
        };

        try {
            await api.put(`/model/${id}`, data);

            alert('Item alterado com sucesso');
        } catch (err) {
            alert('Erro na alteração, tente mais tarde' + err);
        }

        history.push(`/`);
    }

    async function itemDelete(itemId) {
        try {
            await api.delete(`/model/${itemId}`);
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente mais tarde');
        }

        history.push(`/`);
    }

    if (isedit) {
        return (
            <div className="item-container">
                <header>
                    <h1>Gestor</h1>
                    <Link to="/">
                        <FiArrowLeft size={18} color="#f5f5f5" />
                    </Link>
                </header>

                <main>
                    <div id="buttons">
                        <button type="button" onClick={() => edit(false)}>                        
                            <FiEdit3 id="edit" size={18} color="#000" />Editar    
                        </button>
                    </div>

                    <form onSubmit={itemUpdate}>
                        <p><input type="text" required 
                                placeholder="Nome"
                                value={name}
                                onChange={e => setName(e.target.value)}                                
                        /></p>

                        <p><select
                                value={type}
                                onChange={e => setType(e.target.value)}
                        >
                                <option value=""></option>
                                <option value="Receita">Receita</option>
                                <option value="Mensal">Mensal</option>
                                <option value="Variável">Variável</option>
                                <option value="Fixo">Fixo</option>
                        </select></p>  

                        <p><input type="number" min="0" required 
                               placeholder="Valor" 
                               value={amount}
                               onChange={e => setAmount(e.target.value)}
                        /></p>

                            <button type='submit'>Feito</button>
                    </form>
                </main>
            </div>
        );
    }

    return (
        <div className="item-container">
            <header>
                <h1>Gestor</h1>
                <Link to="/">
                    <FiArrowLeft size={18} color="#f5f5f5" />
                </Link>
            </header>
            <main>
                <div id="buttons">
                <button type="button" onClick={() => edit(true)}>                        
                    <FiEdit3 id="edit" size={18} color="#000" />Editar       
                </button>

                <Link className="home" to="/">
                    <button type="button" onClick={() => itemDelete(id)}>                                                  
                        <FiTrash2 id="trash" size={18} color="#000" />                                
                        Excluir
                    </button>
                </Link>
                </div>

                <p>Nome: {item.name}</p>
                <p>Tipo: {item.type}</p>
                <p>
                    Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                        .format(item.amount)}
                </p>

                <footer id="created-at">
                    <p>Criado em: {item.createdAt}</p>
                </footer>
            </main>
        </div>
    )
}