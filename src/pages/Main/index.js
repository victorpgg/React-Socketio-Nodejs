import './styles.css';
import {useEffect, useState} from 'react';
import { Link , useHistory } from 'react-router-dom';
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
    const history = useHistory();

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
            await api.post('/', id);
            localStorage.setItem('idNumber', id);
            history.push('/id');
        }
        catch(err){
            alert('Falha ao validar número da peça!')
        }
    }

    return(
        <div class = "main-container">
            <header>
                <img src={logo} alt = "logo" />
                <div>
                    <span>Sistema Supervisório para Sistema de Aquecimento de Fluidos Líquidos</span>
                    <p>Trabalho de Conclusão de Curso</p>
                    <p>Instituto Federal Fluminense - Campus Macaé</p>
                    <p>Alunos: Flávia de Almeida Araujo e Galvone não sei seu nome todo</p>
                </div>
            </header>   
            <div class = "container">
                <div class = "div-a">
                    <span>Temperatura</span>
                    <div>
                        <p>95ºC</p>
                    </div>
                </div>
                <div class = "div-b">
                    <span>Aquecimento</span>
                    <form onSubmit={handleId}>
                    <input 
                        placeholder="Número da peça"/>
                    <button class="submit">Iniciar aquecimento</button>
                </form>
                </div>
                <div class = "div-c">
                    <span>Consultar Gráficos</span>
                    <p>Connected: { '' + isConnected }</p>
                    <p>Temperatura: {temperature}</p>
                    <p>Flag: {'' + flag }</p>
                </div>
            </div>         
        </div>
        );
}