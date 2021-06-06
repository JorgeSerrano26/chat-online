import { useContext, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import IMessage from '../../classes/IMessage';
import userContext from '../../hooks/userContext';
import './styles.scss';

const ENDPOINT = process.env.REACT_APP_ENDPOINT || "http://localhost:5000";
let socket: any;

const ChatView: React.FC = () => {
    const refChatBox = useRef<any>();
    const [messages, setMessages] = useState<Array<IMessage>>([]);
    const [users, setUsers] = useState<Array<any>>([]);
    const { userData } = useContext(userContext);
    const [message, setMessage] = useState<string>("");

    const emmitMessage = (e: any) => {
        e.preventDefault();
        socket.emit("sendMessage", message, (error: any) => {
            if (error) alert(error);
        });
        setMessage("");
    }
    useEffect((): any => {
        socket = io(ENDPOINT);

        socket.emit('join', userData, (error: any) => {
            if (error) alert(error);
        });

        return () => socket.disconnect();
    }, []);

    useEffect((): any => {
        socket.on("bot_message", (data: IMessage) => {
            setMessages(messages => [...messages, data]);
        });

        socket.on("message", (data: IMessage) => {
            setMessages(messages => [...messages, data]);
            refChatBox.current.scrollTop = refChatBox.current.scrollHeight;
        });

        socket.on('roomData', (data: any) => {
            setUsers(data.users)
        })
    }, []);

    const isMyMessage = (name: string) => {
        switch (name) {
            case "admin":
                return "adminMessage";
            default:
                return name.toLowerCase() === userData.name.toLowerCase() ? "myMessage" : "";
        }
    }
    
    return <div className="chat">
        <div className="chat__sidebar">
            <h1 className="sidebar-title">{userData.room}</h1>
            <ul className="sidebar__listusers">
                {users.map((user,i) => {
                    return <li className="listusers__item" key={`${user}-${i}`}>{user.name}</li>
                })}
            </ul>
        </div>
        <div className="chat__right">
            <ul className="chat__chatbox" ref={refChatBox}>          
                {messages.map((m: IMessage) => <li className={`message ${isMyMessage(m.user)}`}>
                    {m.user.toLowerCase() !== "admin" && <div>{m.user}</div>}
                    <div>{m.text}</div>
                    <div>{m.createdAt}</div>
                </li>)}
            </ul>
            <div className="chat__send-box">
                <form onSubmit={emmitMessage}>
                    <input value={message} onChange={(e: any) => setMessage(e.target.value)} />
                    <button type="submit" disabled={message.length === 0}>Enviar</button>
                </form>
            </div>
        </div>

    </div>
}

export default ChatView;