import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading";
// import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "../../../interfaces/User";
import {api} from "../../../config";



function UserManage() {

 const [users, setUsers] = useState<User[]>([]);
  const [deleteItem, setDeleteItem] = useState({ id: 0, name: "" });
  const [msg, setMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  const getUsers=()=>{
    api.get("users")
    .then(res =>{
      // console.log(res.data);
      setUsers(res.data);
    })
    .catch(err=>{
      console.log(err);
    });
  };
  useEffect(()=>{
    getUsers();
  },[]);
  
    function handleDelete(id: number) {
    api.delete("user-delete?id=" + id)
    .then((res) => {
      if(res.status == 200){
        getUsers();
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
    return (
        <>
        
        <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
       <PageHeading subtitle="Users" title="Manage Users"> 
        <Link to="/user-create" className="btn btn-primary">
        <i className="bi bi-plus-lg me-1" ></i>Add New</Link>
         </PageHeading> 
          
          <section className="row g-3 mt-1" aria-label="User summary">
            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-primary">
                <div className="metric-top">
                  <span className="metric-label">Total Users</span>
                  <span className="metric-icon"><i className="bi bi-people" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">{users.length}</div>
               
              </article>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-success">
                <div className="metric-top">
                  <span className="metric-label">Active</span>
                  <span className="metric-icon"><i className="bi bi-check2-circle" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">7,980</div>
               
              </article>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-warning">
                <div className="metric-top">
                  <span className="metric-label">Pending</span>
                  <span className="metric-icon"><i className="bi bi-hourglass-split" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">184</div>
               
              </article>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-danger">
                <div className="metric-top">
                  <span className="metric-label">Suspended</span>
                  <span className="metric-icon"><i className="bi bi-slash-circle" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">38</div>
                
              </article>
            </div>
          </section>

        <section className="panel mt-3">

  <div className="table-responsive">
    <table className="table align-middle mb-0" id="usersTable" data-searchable-table>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">email</th>
          <th scope="col">Role</th>
          
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item)=>(
 <tr key={item.id}>
          <td>
            <div className="d-flex align-items-center gap-2">
             
              <div>
                <p className="fw-semibold mb-0">{item.id}</p>
               
              </div>
            </div>
          </td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td><span className="">{item.role}</span></td>
     

          <td className="text-end align-middle">

            <div className="d-flex gap-1 justify-content-end">
              <Link className="btn btn-sm btn-outline-success" to={`/user-details/${item.id}`}><i className="bi bi-eye-fill"></i>
              </Link>
              <Link className="btn btn-sm btn-outline-warning" to={`/user-edit/${item.id}`}><i className="bi bi-pencil-square"></i>
              </Link>
               <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() =>
                              setDeleteItem({
                                id: Number(item.id),
                                name: item.name,
                              })
                            }
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
            </div>
          </td>
        </tr>

        ))}
       
       
      </tbody>
    </table>
  </div>
  {/* <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
    <p className="text-muted small mb-0">Showing 1 to 5 of 124 users</p>
    <nav aria-label="Users pagination">
      <ul className="pagination pagination-sm mb-0">
        <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
        <li className="page-item active"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  </div> */}
</section>
        </div>
      </main>
          {/* Modal */}
      <div className="modal fade" id="deleteModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title text-center fs-5">Delete User</h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <span className="badge border border-danger text-danger fs-5">
                User: {deleteItem.name}
              </span>
              <h3 className="mt-3">Are you sure?</h3>
              <p>Do you want to delete this user?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(deleteItem.id)}
                data-bs-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
        
    
}
export default UserManage;