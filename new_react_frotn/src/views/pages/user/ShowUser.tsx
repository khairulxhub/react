import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { api } from '../../api';
import { defaultUser, type User } from '../../interfaces/user';

export default function ShowUser () {
    const {id} = useParams();
    const [users, setUsers] = useState(defaultUser);
    const getItem = () => {
        api
        .get(`users/${id}`)
        .then(function (res) {
            // console.log(res.data);
            setUsers(res.data.user);
        })
        .catch(function (err) {
            console.log(err);
        });
    };
    useEffect(() => {
        getItem();
    }, []);
  return (
    <div className="w-1/2 mx-auto mt-4 bg-slate-400">
            <h1 className="text-2xl font-bold mb-4 text-center bg-yellow-200">User Details</h1>
      <div className="mb-3 pb-3 border-b border-b-green-200"><b>ID: </b>{id}</div>
      <div className="mb-3 pb-3 border-b border-b-green-200"><b>Name: </b>{users.name}</div>
      <div className="mb-3 pb-3 border-b border-b-green-200"><b>Email: </b>{users.email}</div>
      <div className="mb-3 pb-3 border-b border-b-green-200"><b>Role: </b>{users.role}</div>
    </div>
  )
}
