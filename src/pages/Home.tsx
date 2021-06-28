import illustrationImg from "../assets/images/illustration.svg";
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss';
import { Button } from "../components/Button";
import {useHistory} from 'react-router-dom';
import { useAuth } from "../hooks/useAuth";
import { FormEvent } from "react";
import { useState } from "react";
import { database } from "../services/firebase";
import { useTheme } from "../hooks/useTheme";
//Para fazer deploy:
//yarn build
//firebase deploy
export function Home(){ 
    const [roomCode, setRoomCode]=useState('');
    const {user, signInWithGoogle} = useAuth();
    const {theme, toggleTheme} = useTheme();
    const history= useHistory();
    async function handleCreateRoom() {
        if (!user) {
          await signInWithGoogle()
        }
    
        history.push('/rooms/new');
      }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists.');
            return;
        }

        if(roomRef.val().endedAt){
            alert('Room already closed.');
            return;
        }

        history.push(`rooms/${roomCode}`);
    }
    
    return (
        <div id='page-auth' className={theme}>
            <aside>
                <img src={illustrationImg} alt='Illustration of Answers and Questions'/>                
                <strong>Crie salas de Q&amp;A ao-ivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
                <main>
                <Button onClick={toggleTheme} >{theme}</Button>
                    <div className="main-content">
                        <img src={logoImg} alt='Letmesask'/>
                        <button onClick={handleCreateRoom} className={ `create-room ${theme ? theme : ''}`}>
                            <img src={googleIconImg} alt='Logo do Google'/>
                            Crie sua sala com o Google
                        </button>
                        <div className={ `separator ${theme ? theme : ''}`}>Ou entre em uma sala</div>
                        <form onSubmit={handleJoinRoom}>
                            <input 
                            value={roomCode}
                            onChange={event=>setRoomCode(event.target.value)}
                            type='text'
                            placeholder='Digite o código da sala'
                            />
                            <Button type="submit">
                                Entrar na sala
                            </Button>
                        </form>
                    </div>
                </main>
        </div>
    )
}