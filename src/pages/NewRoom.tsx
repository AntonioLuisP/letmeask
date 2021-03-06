import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ilustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss'
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export function NewRoom() {

    const history = useHistory()
    const { user } = useAuth()
    const [newRoom, setRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()
        if (newRoom.trim() === '') {
            return
        }
        const roomRef = database.ref('rooms/')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })
        history.push('/rooms/' + firebaseRoom.key)
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
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            value={newRoom}
                            onChange={event => setRoom(event.target.value)}
                        />
                        <Button type='submit'>
                            Criar sala
                        </Button>
                        <p>
                            Quer entrar em uma sala existente? <Link to='/'>Clique aqui</Link>
                        </p>
                    </form>
                </div>
            </main>
        </div>
    )

}