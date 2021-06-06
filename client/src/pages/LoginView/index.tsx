import { useContext, useState } from 'react';
import IUserData from '../../classes/IUserData';
import userContext from '../../hooks/userContext';
import './styles.scss';

interface IFields { 
    name: "name" | "room", 
    value: string 
}

const LoginView: React.FC = () => {
    const [fields, setFields] = useState<IUserData>({ name: "", room: "" });
    const { connect } = useContext(userContext);

    const submit = (event: any) => {
        event.preventDefault();
        connect(fields);
    }

    const onChange = (e: any) => {
        const { name, value }: IFields = e.target;
        const copyFields = { ...fields };
        copyFields[name] = value;
        setFields(copyFields);
    }


    return <div className="login-box">
        <h1>LOGIN</h1>
        <form onSubmit={submit}>
            <input type="text" name="name" value={fields.name} onChange={onChange}  required placeholder="Name" />
            <input type="text" name="room" value={fields.room} onChange={onChange} required placeholder="Room" />
            <button type="submit">ENTRAR</button>
        </form>
    </div>
}

export default LoginView;