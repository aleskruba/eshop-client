import React from 'react'
import styles from './adminuserchangepasswordcomponent.module.css';

function AdminUserChangePasswordComponent({cancelFunction}) {
  return (
    <div>AdminUserChangePasswordComponent

      <h1>PASS</h1>
                <button onClick={cancelFunction}>cancel</button>
    </div>
  )
}

export default AdminUserChangePasswordComponent