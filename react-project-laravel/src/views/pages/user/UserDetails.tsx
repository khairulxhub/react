import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import { defaultUser, type User } from "../../../interfaces/User";
import {api} from "../../../config";



function UserDetails(){
    const {id} = useParams();
    const [user, setUser] = useState<User>(defaultUser);
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
    return(
       <>
    <main className="dashboard-content">
  {/* <h1>{id}</h1> */}
  <div className="container-fluid px-3 px-lg-4 py-4">
    <div className="page-heading">
      <div className="page-heading-copy">
        <span className="page-icon"><i className="bi bi-person-lines-fill" aria-hidden="true"></i></span>
        <div>
          <p className="eyebrow mb-1">Management</p>
          <h1 className="h3 mb-1">User Details</h1>
          <p className="text-muted mb-0">Inspect account status, profile data, permissions, and recent activity.</p>
        </div>
      </div>
      <div className="heading-actions">
        <Link className="btn btn-outline-secondary btn-sm" to="/users"><i className="bi bi-arrow-left"
          aria-hidden="true"></i> Back to Users</Link>
        <Link className="btn btn-primary btn-sm" to="/user-create"><i className="bi bi-person-plus"
          aria-hidden="true"></i> Add User</Link>
      </div>
    </div>

    <section className="row g-3">
      <div className="col-12 col-xl-4">
        <div className="panel h-100 text-center profile-card">
          <div className="profile-cover"><img src="https://i.pravatar.cc/50?img=1" alt="User workspace preview" /></div>
          <div className="profile-hero">
            <img className="avatar-img avatar-xl profile-photo" src="https://i.pravatar.cc/57?img=1"
              alt="Sarah Ahmed" />
            <h2 className="h5 mb-1">{user.name}</h2>
          
            <span className="badge text-bg-success">{user.role}</span>
          </div>
          <div className="info-list mt-4 text-start">
            <div><span>Email</span><strong>{user.email}</strong></div>
            
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-8">
        <div className="panel mb-3">
          <div className="panel-header">
            <div>
              <h2 className="h5 mb-1 section-title"><i className="bi bi-person-lines-fill"
                  aria-hidden="true"></i><span>Account Overview</span></h2>
              <p className="text-muted mb-0">Permissions, plan, and current access details.</p>
            </div>
            <Link to={`/user-edit/${id}`} className="btn btn-primary btn-sm" type="button">Edit User</Link>
          </div>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="mini-card"><span>Role</span><strong>{user.role}</strong></div>
            </div>
            <div className="col-md-4">
              <div className="mini-card"><span>Role Id</span><strong>{user.role_id}</strong></div>
            </div>
           
          </div>
        </div>
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2 className="h5 mb-1 section-title"><i className="bi bi-clock-history"
                  aria-hidden="true"></i><span>Recent Activity</span></h2>
              <p className="text-muted mb-0">Latest security and workflow events.</p>
            </div>
          </div>
          <div className="activity-list">
            <div className="activity-item"><span className="activity-dot bg-primary"></span>
              <div>
                <p className="mb-1 fw-semibold">Updated billing permissions</p>
                <p className="text-muted small mb-0">2 hours ago</p>
              </div>
            </div>
            <div className="activity-item"><span className="activity-dot bg-success"></span>
              <div>
                <p className="mb-1 fw-semibold">Approved new teammate</p>
                <p className="text-muted small mb-0">Yesterday</p>
              </div>
            </div>
            <div className="activity-item"><span className="activity-dot bg-warning"></span>
              <div>
                <p className="mb-1 fw-semibold">Changed password</p>
                <p className="text-muted small mb-0">Apr 30, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</main>
       
       </>
    )
}

export default UserDetails