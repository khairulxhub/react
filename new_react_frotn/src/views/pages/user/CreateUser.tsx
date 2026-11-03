import { useEffect, useState } from 'react'
import type { Role } from '../../interfaces/Role';
import { api } from '../../api';
// import { get } from 'http';
import { defaultUser, errorUser, type User } from "../../interfaces/user";
import { useNavigate } from 'react-router';

export default function CreateUser() {

    const [roles, setRoles] = useState<Role[]>([]);
    const [users, setUsers] = useState<User>(defaultUser);
    const [errUser, setErrUser] = useState<User>(errorUser);
    const navigate = useNavigate();
    const getRole = () => {
        api.get("roles")
            .then(function (res) {
                console.log(res.data);
                setRoles(res.data);
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    useEffect(() => {
        getRole();
    }, []);

    const handleSubmit = function () {
        console.log(users);
        api.post("users", users)
            .then(function (res) {
                console.log(res.data);
                if (res.data.success) {
                    alert(res.data.success);
                    setUsers(defaultUser);
                    setErrUser(errorUser);
                    navigate("/users");
                }
                // setUsers(defaultUser);
            })
            .catch(function (err) {
                // console.log(err.response.data);
                if (err.response.status === 422) {
                    // setErrUser(err.response.data.errors);
                    // console.log(err.response.data.errors.email[0]);
                    console.log(err.response?.data);

                    // console.log(err.response.data.errors.password_confirmation[0]);
                    setErrUser(err.response.data.errors);
                }
            })
    }
    return (
        <div className="w-1/2 mx-auto mt-4 bg-slate-400">
            <h1 className="text-2xl font-bold mb-4 text-center bg-yellow-200">Add User</h1>

            <form>
                <label>Name</label>
                <input
                    type="text"
                    className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                    placeholder="Name"
                    value={users.name}
                    onChange={(e) => setUsers({ ...users, name: e.target.value })}

                />
                <small className="text-red-600">{errUser.name ? errUser.name[0] : ""}</small>
                <br />
                <br />
                <label>Email</label>
                <input
                    type="text"
                    className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                    placeholder="Email"
                    value={users.email}
                    onChange={(e) => setUsers({ ...users, email: e.target.value })}

                />
                <small className="text-red-600">{errUser.email ? errUser.email[0] : ""}</small>
                <br />
                <br />
                {/* <label>Role</label>

                <select
                    className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                >
                    <option value="0">Select role</option>

                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.name}
                        </option>
                    ))}
                </select> */}

                <label>Role</label>

                <select
                    value={users.role} onChange={(e) => setUsers({ ...users, role: e.target.value })} className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                >
                    <option value="0" disabled >Select role...</option>

                    {roles.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </select>
                <small className="text-red-600">{errUser.role ? errUser.role[0] : ""}</small>
                <br />
                <br />
                <label>Password</label>
                <input
                    type="password"
                    className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                    placeholder="******"
                    value={users.password}
                    onChange={(e) => setUsers({ ...users, password: e.target.value })}

                />
                <small className="text-red-600">{errUser.password ? errUser.password[0] : ""}</small>
                <br />
                <br />
                <label>Confirm Password</label>
                <input
                    type="password"
                    className="w-full p-2 border border-1 focus:border-2 rounded-md border-gray-200 focus:border-green-400 focus:outline-none"
                    placeholder="******"
                    value={users.password_confirmation}
                    onChange={(e) => setUsers({
                        ...users,
                        password_confirmation: e.target.value
                    })}

                />
                <small className="text-red-600">{errUser.password_confirmation ? errUser.password_confirmation[0] : ""}</small>
                <br />
                <br />
                <div className="text-center">
                    <button
                        className="bg-emerald-600 rounded-lg text-gray-50 py-2 px-4 hover:bg-emerald-800 focus:bg-emerald-600 duration-300"

                        type="button" onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}
