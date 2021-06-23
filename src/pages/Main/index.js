import './styles.css';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import {FiSearch} from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import api from '../../services/api';
const socket = socketIOClient('http://localhost:3334');

export default function Main(){
    const [temperature, setTemperature] = useState();
    const [isConnected, setIsConnected] = useState(socket.connected);
    const[id, setId] = useState('');
    const [flag, setFlag]= useState(false);

    useEffect(()=> {
        socket.on('connect', () => {
            setIsConnected(true);
          });
        socket.on('temperature', data => {
            setTemperature(data);
        });
        socket.on('flag', data => {
            setFlag(true);
        });

    }, []);
    async function handleId(e){
        e.preventDefault();
        try{
            const res = await api.post('/', {id});
            localStorage.setItem('idNumber', id);
        }
        catch(err){
            alert('Falha no cadastro do item!')
        }
        console.log(id)
    }

    return(
        <div class = "main-container">
            <section class ="form">
                <img src={logo} alt = "logo" />
                <p>Connected: { '' + isConnected }</p>
                <p>Temperatura: {temperature}</p>
                <p>Flag: {'' + flag }</p>
                <form onSubmit={handleId}>
                    <h1>Digite o asset number:</h1>
                    <input 
                        placeholder="Número da peça"
                        value={id}
                        onChange = { e => setId(e.target.value)}
                    />
                    <button class="submit">Validar</button>
                    <Link to="/search">
                        <FiSearch size={16}  color= "#4682B4" />
                        Pesquisar dados
                    </Link> 
                </form>
            </section>
        </div>
        );
}