import { Link, useParams } from "react-router"
// import PageHeading from "../../../components/PageHeading";
import axios from "axios";
import { useEffect, useState } from "react";
import { type Post, defaultPost } from "../../../interfaces/Post";


 


function PostDetails() {
  const { id } = useParams();
 const [post, setPost] = useState<Post>(defaultPost);
 const [user, setUser] = useState({
  name: "",
  email: "",
  phone: "",
  company: {
    name: "",
  },
  address: {
    city: "",
  },
});
 const [comments, setComments] = useState([
  {
    name: "",
    email: "",
    body: "",
   id: 0
  }
 ]);
  
  function getData() {
    axios.get("https://jsonplaceholder.typicode.com/posts/" + id)
      // axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)

      .then(function (res) {
        //console.log(res.data);
        setPost(res.data);
        return axios.get("https://jsonplaceholder.typicode.com/users/" + res.data.userId);
      })
      .then(function (res) {
        // console.log(res.data);
        setUser(res.data);
      })
      // return axios.get("https://jsonplaceholder.typicode.com/posts/" + id + "/comments")
      // .then(function (res) {
      //   console.log(res.data);
      //   setComments(res.data);
      // })
      
      
    .catch(function (err) {
      console.log(err);
    });
}
function getComments() {
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then(function (res) {
      // console.log(res.data);
      setComments(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}
useEffect(() => {
  getData();
  getComments();
}, [id]);

  return (
    <>
      <main className="dashboard-content">
        <h1>{id}</h1>
        <div className="container-fluid px-3 px-lg-4 py-4">
          <div className="page-heading">
            <div className="page-heading-copy">
              <span className="page-icon"><i className="bi bi-person-lines-fill" aria-hidden="true"></i></span>
              <div>
                <p className="eyebrow mb-1">Management</p>
                <h1 className="h3 mb-1">Post Details</h1>
                <p className="text-muted mb-0">Inspect account status, profile data, permissions, and recent activity.</p>
              </div>
            </div>
            <div className="heading-actions">
              <Link className="btn btn-outline-secondary btn-sm" to="/Post"><i className="bi bi-arrow-left" aria-hidden="true"></i> Back to Posts</Link>
              <Link className="btn btn-primary btn-sm" to="/Post-create"><i className="bi bi-person-plus" aria-hidden="true"></i> Add Post</Link></div>
          </div>

          <section className="row g-3">
            <div className="col-12 col-xl-4">
              <div className="panel h-100 text-center profile-card">
                <div className="profile-cover"><img src="https://i.pravatar.cc/50?img=1" alt="Post workspace preview" /></div>
                <div className="profile-hero">
                  <img className="avatar-img avatar-xl profile-photo" src="https://i.pravatar.cc/57?img=1" alt="Sarah Ahmed" />
                  <h2 className="h5 mb-1">{user.name}</h2>
                  <p className="text-muted mb-3"></p>
                  <span className="badge text-bg-success">Active Account</span>
                </div>
                <div className="info-list mt-4 text-start">
                  <div><span>Email</span><strong>{user.email}</strong></div>
                  <div><span>Phone</span><strong>{user.phone}</strong></div>
                  <div><span>Company</span><strong>{user.company.name}</strong></div>
                  <div><span>Address</span><strong>{user.address.city}</strong></div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-8">
              <div className="panel mb-3">
                <div className="panel-header">
                  <div>
                    <h2 className="h5 mb-1 section-title">
                      <span>{post.title}</span>
                    
                      </h2>
                      {/* <p className="text-muted mb-0">Permissions, plan, and current access details.</p> */}
                      </div>
                  <Link to={`/Post-edit/${id}`} className="btn btn-primary btn-sm" type="button">Edit Post</Link>
                </div>
                <div className="row g-3">
                  {post.body}
                </div>
              </div>
           <div className="panel">
  <div className="panel-header">
    <div>
      <h2 className="h5 mb-1 section-title"><i className="bi bi-clock-history" aria-hidden="true"></i><span>Post Comment
        </span></h2>
      <p className="text-muted mb-0">Latest Comments.</p>
    </div>
  </div>
  {comments.map(function (comment) {
  return (
  <div className="activity-item" key={comment.id}>
    <span className="activity-dot bg-primary"></span>

    <div>
      <p className="mb-1 fw-semibold">
        {comment.name}
      </p>

      <p className="text-muted small mb-0">
        {comment.body}
      </p>

      <p className="text-muted small mb-0">
        {comment.email}
      </p>
    </div>
  </div>
  );
  })}
</div>
            </div>
          </section>
        </div>
      </main>

    </>
  )
}

export default PostDetails