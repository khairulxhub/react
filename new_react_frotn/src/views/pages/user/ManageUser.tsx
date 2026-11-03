import React, { useEffect, useState } from "react";
import { api } from "../../api";
import type { User } from "../../interfaces/user";
import { Link } from "react-router";

export default function ManageUser() {
    const [users, setUsers] = useState<User[]>([]);
 function getAll() {
    api.get("users")
    .then(function(res) {
      console.log(res.data.users);
      setUsers(res.data.users);
    })
    .catch(function(err){
      console.log(err);

    })
 }
useEffect(() => {
    getAll();
  }, []);

 const handleDelete = (id: number, name: string) => {
    let result = confirm("Are you sure you want to delete " + name + "?");
    if(result){
      
    api
    .delete(`users/${id}`)
    .then(function(res){
      getAll();
      alert(res.data.message);
    })
    .catch(function(err){
      console.log(err);
    });
    }
 };
  return (
   <div className="w-fit mx-auto mt-4">
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
        <h1 className="font-bold text-2xl text-green-800 mb-4">Users List</h1>
      <a
  href="/users/create"
  className="bg-emerald-600 rounded-lg text-gray-50 py-2 px-4 hover:bg-emerald-800 focus:bg-emerald-600 duration-300"
>
  Create New
</a>

      </div>

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-green-100 border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-bold">
                ID
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Role
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Email
              </th>
              <th scope="col" className="px-6 py-3 font-bold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) =>(
                       <tr key={item.id} className="bg-neutral-primary border-b border-default">
              <th scope="row" className="px-6 py-4 font-bold">
                {item.id}
              </th>
              <td className="px-6 py-4">{item.name}</td>
              <td className="px-6 py-4">{item.role}</td>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">
                <div className="inline-flex rounded-lg shadow-sm">
                  <Link  to={`/users/${item.id}`} className="rounded-l-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-100 ">
                    Show
                  </Link>

                  <Link  to={`/users/${item.id}/update`} className="-ml-px border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-100">
                    Edit
                  </Link>

                  <button type="button" onClick={() => handleDelete(item.id, item.name)} className="-ml-px rounded-r-lg border border-gray-300 bg-white px-4 py-2 text-sm hover:bg-gray-100">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
            ) )}
     
          </tbody>
        </table>
      </div>
    </div>
  );
}
