import { Link, useParams } from "react-router"
import PageHeading from "../../../components/PageHeading.tsx"
import { useEffect, useState } from "react";
import { defaultUser } from "../../../interfaces/User.ts";
import type { User } from "../../../interfaces/User.ts";
import axios from "axios";
import type { Role } from "../../../interfaces/Role.ts";
import  { baseApiUrl,api } from "../../../config.ts";

function UserEdit() {
  const { id } = useParams();
  const [user, setUser] = useState<User>(defaultUser);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    role_id: "",
    password: "",
  });
   const getuser = () =>{
        api.get("user-details?id="+id)
        .then(res=>{
            // console.log(res.data);
            setUser(res.data);
        })
        .catch(err=>{
            console.log(err);
        });
    };
    useEffect(() => {
        getuser();
    }, []);
  const [roles, setRoles] = useState<Role[]>([]);

  const [msg, setMsg] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  // useEffect(() => {
  //     console.log(user);
  // }, [user]);
   
  function getRoles(){
    api
    .get("roles")
    .then(res => {
        // console.log(res.data);
        setRoles(res.data);
    })
    .catch(err => {
        console.log(err);
    });
  }
  useEffect(() => {
    getRoles();
  }, []);

  function handleSubmit() {
    let newErrors: any = {};
    if (user.name == "") {
      newErrors.name = "Name is required";
    } else if (user.name.length > 100 || user.name.length < 3) {
      newErrors.name = "Name must be between 100 and 3 characters";
    } else {
      newErrors.name = "";
    }
    if (user.email == "") {
      newErrors.email = "Email is required";
    }
    else {
      newErrors.email = "";
    }
    setErrors(newErrors);
    if (newErrors.name == "" && newErrors.email == "") {
      // alert("Form submitted successfully"); 
      console.log(user);
      // axios.post("http://localhost/react-project-api/api/user-create", user,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // )
      api.put("user-update", user)
        .then(res => {
          console.log(res.data);
          if(res.status == 200 || res.status == 201) {
            setMsg(true);
            setErrMsg(true);
            // setUser(defaultUser);
          }
        })
        .catch(err => {
          setMsg(true);
          setErrMsg(false);
          console.log(err);
        });
    }
  }


  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading icon="person-plus" subtitle="Edit User" title="Edit User" desc="Fill out the form below to Edit user account.">
            <Link to="/users" className="btn btn-primary"><i className="bi bi-arrow-left" aria-hidden="true"></i> Back to Users</Link>
          </PageHeading>
          <section className="row g-3">
            <div className="col-12">
              {msg && (
                 <div 
                 className={`alert alert-${errMsg ? "info" :"danger "}info alert-dismissible fade show mb-3`} role="alert">
                <strong></strong> {errMsg ? "User updated successfully" : "Something went wrong! Please try again after some time."}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"
                onClick={() => setMsg(false)}></button>
              </div>
              )}
             
              <form className="panel needs-validation">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="firstName">
                      Name
                    </label>
                    <input
                      className="form-control"
                      id="firstName"
                      type="text"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                    <small className="text-danger">{errors.name}</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <small className="text-danger">{errors.email}</small>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" htmlFor="role">
                      Role
                    </label>
                    <select className="form-select" id="role" value={user.role_id} onChange={(e) => setUser({ ...user, role_id: Number(e.target.value) })}>
                      <option value={0} disabled>Choose role...</option>
                      {roles.map((item ) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <small className="text-danger">{errors.role_id}</small>
                  </div>
             
                </div>
                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
                  <button className="btn btn-outline-secondary" type="reset">
                    Cancel
                  </button>
                  <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default UserEdit