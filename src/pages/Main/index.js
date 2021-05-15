import './styles.css';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import {FiSearch} from 'react-icons/fi';
import logo from '../../assets/logo.svg'

export default function Main(){
    const [temperature, setTemperature] = useState();
    useEffect(()=> {
        const socket =socketIOClient("http://localhost:3000");
        socket.on("Temperature", data => {
            setTemperature(data);
        });
    }, []);

    return(
        <div class = "main-container">
            <section class ="form">
                <img src={logo} alt = "logo" />
                <strong>Temperatura: {temperature}</strong>
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