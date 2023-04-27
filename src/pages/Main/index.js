import './styles.css';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import socketIOClient from 'socket.io-client';
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
    function handleId(e){
        e.preventDefault();
        try{
            api.post('/', {id});
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
                    <p>Alunos: Flávia de Almeida Araujo e Victor Pinheiro Galvão Guimarães</p>
                </div>
            </header>   
            <div class = "container">
                <div class = "div-a">
                    <span>Temperatura</span>
                    <div>
                        <p>{temperature}ºC</p>
                    </div>
                    <span>Status</span>
                        <table>
                            <tr>
                                <td>Comunicação:</td>
                                <td>{ '' + isConnected }</td>
                            </tr>
                            <tr>
                                <td>Presença de peça no tanque:</td>
                                <td>{'' + flag }</td>
                            </tr>
                        </table>
                </div>
                <div class = "div-b">
                    <span>Aquecimento</span>
                    <form onSubmit={handleId}>
                        <input placeholder="Número da peça"
                        value={id}
                        onChange = { e => setId(e.target.value)}/>
                        <button class="submit">Iniciar aquecimento</button>
                    </form>
                </div>
            </div>         
        </div>
        );
}