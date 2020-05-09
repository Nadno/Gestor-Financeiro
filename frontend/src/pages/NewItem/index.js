import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';

import '../../services/api';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

export default function NewItem() {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [amount, setAmount] = useState("");

    const history = useHistory();

    async function createItem(e) {
        e.preventDefault();

        const data = {
            name,
            type,
            amount,
        };

        try {
            await api.post('model', data);

            alert("Item criado com sucesso!");

            history.push('/');
        } catch (err) {
            alert("Erro ao criar item: " + err);
        }

    };

    return (
        <div className="new-item-container">
            <header className="head">
                <h1>Gestor</h1>
                <Link to="/">
                    <FiArrowLeft size={18} color="#f5f5f5" />
                </Link>
            </header>

            <main>
                <form onSubmit={createItem}>
                    <h1>Gasto ou Receita mensal</h1>

                    <p><input type="text" required
                        placeholder="Nome" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    /></p>

                    <p><select required
                        placeholder="Escolha o tipo"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <option></option>
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

                    <button type="submit">CRIAR</button>
                </form>
            </main>
        </div>
    );
}