import './styles.css';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import {FiSearch} from 'react-icons/fi';
import logo from '../../assets/logo.svg'

const socket =socketIOClient('localhost:3000');

export default function Main(){
    const [temperature, setTemperature] = useState();
    const [isConnected, setIsConnected] = useState(socket.connected);
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

    return(
        <div class = "main-container">
            <section class ="form">
                <img src={logo} alt = "logo" />
                <p>Connected: { '' + isConnected }</p>
                <p>Temperatura: {temperature}</p>
                <p>Flag: {'' + flag }</p>
                <form>
                    <h1>Digite o asset number:</h1>
                    <input placeholder="ASSET NUMBER"/>
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