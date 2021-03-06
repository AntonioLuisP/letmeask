import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom'
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button';
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function Home() {

    const history = useHistory()

    const { user, signIWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom() {
        if (!user) {
            await signIWithGoogle()
        }
        history.push('/rooms/new')
    }


    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault()

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref('rooms/' + roomCode).get()

        if (!roomRef.exists()) {
            alert('Room does not exists.')
            return
        }
        if (roomRef.val().endedAt) {
            alert('Room already close')
            return;
        }

        history.push('/rooms/' + roomCode)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A Ao vivo</strong>
                <p>Tire suas dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <button className='create-room'
                        onClick={handleCreateRoom}
                    >
                        <img src={googleIconImg} alt="logo do google" />
                        Crie sua sala com o google
                    </button>
                    <div className='separator'>
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            value={roomCode}
                            onChange={event => setRoomCode(event.target.value)}
                        />
                        <Button type='submit'>
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )

}