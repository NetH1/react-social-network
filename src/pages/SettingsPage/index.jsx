import React from 'react';
import Input from '../../components/UI/Input';
import { useState } from 'react';
import Button from '../../components/UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { changeUser } from '../../store/userSlice';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.user)
    const [formSettings, setFormSettings] = useState({
        email:'',
        password:'',
        login:'',
    });
    const {email,password,login} = formSettings
    const onChange = (e) => {
        const {name, value} = e.target;
        setFormSettings(prev => ({
            ...prev,
            [name]:value
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const userId = user.id
        dispatch(changeUser({formSettings, userId}))
        setFormSettings({email:'',login:'',password:''})
      };
    return (
        <>
            <form onSubmit={onSubmit}>
            <Input value={email}
                onChange={onChange}
                placeholder="Your email"
                name="email"
                label="email" />
                <Input value={password}
                onChange={onChange}
                placeholder="Your password"
                name="password"
                label="password" />
                <Input value={login}
                onChange={onChange}
                placeholder="Your login"
                name="login"
                label="login" />
                <Button type='sumbit'>Save</Button>
        </form>
        <Button onClick={() => navigate(-1)}>Back</Button>
        </>
    );
};

export default SettingsPage;