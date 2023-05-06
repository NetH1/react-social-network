import React from 'react'
import styles from './profile-user.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


export const ProfileUser = () => {
  const {user} = useSelector((state) => state.user)
  return (
    <>
    <div className={styles.user_information}>
      <div>
        <div className={styles.information}>
        <img width={250} height={250} src={user.image} alt="" />
          <span>{user.login}</span>
          <p>Desc</p>
        </div>
      </div>
      <div>
        <button><Link to={'/settings'}>Setting</Link></button>
        <button><Link to={'/createpost'}>Create POST</Link></button>
      </div>
    </div>
    </>
  )
}