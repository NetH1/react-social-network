import React, { useState } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import s from './registration.module.scss'
import { useDispatch,useSelector } from 'react-redux';
import { RegistrateUser,authUser } from '../../store/userSlice';

const Registration = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((store) => store.user);
    const [form, setForm] = useState({
        login: '',
        password: ''
    });
    const { login, password } = form;

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(RegistrateUser(form)).then(() => setForm({login:'', password: ''}))
    }
    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    return (
        <form onSubmit={onSubmit} className={s.email_address}>
            <div className={s.inputs}>
                <Input onChange={onChange} name='login' placeholder='login' value={login} label='Введите email' />
                <Input onChange={onChange} name='password' placeholder='password' value={password} label='Введите пароль' />
            </div>
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading" : "Sign up"}
            </Button>
        </form>
    );
};


export default Registration;