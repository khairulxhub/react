
import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Post } from "../../../interfaces/Post";

function PostManage() {
  const [post,setPost] = useState<Post[]>([]);
  const [msg, setMsg] = useState("");
  function getAllDate(){
    axios.get("https://jsonplaceholder.typicode.com/posts")
    .then(function (res) {
      // console.log(res.data);
      setPost(res.data);
    })
    .catch(function (err) {
      console.log(err)

    });
  }
  useEffect(() => {
    getAllDate(); 
  }, []);

  function handleDelete(id:number | undefined){
    axios.delete("https://jsonplaceholder.typicode.com/posts/"+id)
    .then(function (res) {
      // console.log(res);
      if(res.status === 200) setMsg("Post deleted successfully");
      getAllDate();
    })
    .catch(function (err) {
       
      console.log(err);
      setMsg("Something went wrong. Post not deleted");

    });
  }
    return (
        <>
        
        <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
       <PageHeading subtitle="Posts" title="Manage Posts"> 
        <Link to="/Post-create" className="btn btn-primary">
        <i className="bi bi-plus-lg me-1" ></i>Add New</Link>
         </PageHeading> 
          
          {/* <section className="row g-3 mt-1" aria-label="Post summary">
            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-primary">
                <div className="metric-top">
                  <span className="metric-label">Total Posts</span>
                  <span className="metric-icon"><i className="bi bi-people" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">8,742</div>
                <div className="metric-meta">
                  <span className="text-success">+5.1%</span>
                  <span>this month</span>
                </div>
              </article>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-success">
                <div className="metric-top">
                  <span className="metric-label">Active</span>
                  <span className="metric-icon"><i className="bi bi-check2-circle" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">7,980</div>
                <div className="metric-meta">
                  <span className="text-success">91%</span>
                  <span>healthy accounts</span>
                </div>
              </article>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-warning">
                <div className="metric-top">
                  <span className="metric-label">Pending</span>
                  <span className="metric-icon"><i className="bi bi-hourglass-split" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">184</div>
                <div className="metric-meta">
                  <span className="text-warning">12</span>
                  <span>need approval</span>
                </div>
              </article>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-danger">
                <div className="metric-top">
                  <span className="metric-label">Suspended</span>
                  <span className="metric-icon"><i className="bi bi-slash-circle" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">38</div>
                <div className="metric-meta">
                  <span className="text-danger">4</span>
                  <span>flagged today</span>
                </div>
              </article>
            </div>
          </section> */}

          <section className="panel mt-3">
        
            <div className="table-responsive">
               {msg != "" && (
                <div className="alert alert-info" role="alert">
                  {msg}
                </div>
              )}
              <table className="table align-middle mb-0" id="PostsTable" data-searchable-table>
                <thead>
                  <tr>
                <th scope="col">ID</th>
                <th scope="col">USER</th>
                <th scope="col">TITLE</th>
                
                <th scope="col" className="text-end">Action</th>
                </tr>
                </thead>
                <tbody>
                  {post.map((item) => ( 
                     <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img className="avatar-img avatar-sm" src="https://i.pravatar.cc/50?img=1" alt="Sarah Ahmed"/>
                        <div>
                         {item.userId}
                        </div>
                      </div>
                    </td>
                    <td>{item.title}</td>
               
                    
                   
                    <td className="text-end">

                     <div className="d-flex gap-1 justify-content-end">
  <Link className="btn btn-sm btn-outline-success" to={`/Post-details/${item.id}`}><i className="bi bi-eye-fill"></i>
  </Link>
  <Link className="btn btn-sm btn-outline-warning" to={`/Post-edit/${item.id}`}><i className="bi bi-pencil-square"></i>
  </Link>
  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)} type="button"><i className="bi bi-trash"></i></button>
</div>
                    </td>
                  </tr>
                  ))}
                 
                  
                </tbody>
              </table>
            </div>
            {/* <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
              <p className="text-muted small mb-0">Showing 1 to 5 of 124 Posts</p>
              <nav aria-label="Posts pagination"><ul className="pagination pagination-sm mb-0"><li className="page-item disabled"><a className="page-link" href="#">Previous</a></li><li className="page-item active"><a className="page-link" href="#">1</a></li><li className="page-item"><a className="page-link" href="#">2</a></li><li className="page-item"><a className="page-link" href="#">Next</a></li></ul></nav>
            </div> */}
          </section>
        </div>
      </main>
        
        </>
    )
}
export default PostManage;