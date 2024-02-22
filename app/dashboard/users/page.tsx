
import React from 'react'
import styles from '../../ui/dashboard/users/users.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Search from '../../ui/dashboard/search/search'
import Pagination from '@/app/ui/dashboard/pagination/pagination'
import { fetchUsers } from '@/app/lib/data'
export default async function Users({searchParams}: {searchParams:{query:string}}) {
  console.log(searchParams, 'search')
  const q = searchParams?.query || ""
  const users = await fetchUsers(q)
  console.log(users, "users")
  return (
    <div className={styles.container}>
        <div className={styles.top}>
          <Search placeholder="Search for a user..."/>
          <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add new</button>
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <td>Name</td>
              <td>Email</td>
              <td>CReated at</td>
              <td>Role</td>
              <td>Status</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {
              users?.map((user)=>{
                <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image src={user.img || "/noavatar.jpg"} alt="user" width={50} height={50} className={styles.userImage}/>
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user?.createdAt?.toString().slice(4,16)}</td>
              <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActive ? "Active" : "Passive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user._id}`}>
                  <button className={`${styles.button} ${styles.view}`}>View</button>  
                </Link>
                <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                </div>
              </td>
            </tr>
            })
          }
          </tbody>
        </table>
        <Pagination/>
    </div>
  )
}
