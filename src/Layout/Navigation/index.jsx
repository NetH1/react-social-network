import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../store/userSlice";

import s from "./Navigation.module.scss";
import { Link } from "react-router-dom";

function Navigation() {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className={s.navigation}>
      <div className={s.nav_user}>
        <Link to={'/profile'}>
          <span>{user.login}</span>
          <img src={user.userImg} alt="" />
        </Link>
        <Link to={'/'}>Feed</Link>
        <Link to={'/friends'}>Friends</Link>
      </div>
      <button onClick={onLogOut}>LogOut</button>
    </div>
  );
}

export default Navigation;
