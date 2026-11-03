import { Link, useParams } from "react-router"
import PageHeading from "../../../components/PageHeading";
import axios from "axios";
import { useEffect, useState } from "react";
import { type Post, defaultPost } from "../../../interfaces/Post";



function PostEdit() {
    const { id } = useParams();
    const [post, setPost] = useState<Post>(defaultPost);
    const [msg, setMsg] = useState("");
    function getData() {
        axios.get("https://jsonplaceholder.typicode.com/posts/" + id)
            // axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)

            .then(function (res) {
                //console.log(res.data);
                setPost(res.data);
            })

            .catch(function (err) {
                console.log(err);
            });
    }
    useEffect(() => {
        getData();
    }, []);

    function handleSubmit() {
        //   console.log(post);
        axios.put("https://jsonplaceholder.typicode.com/posts/" + id, post)
            .then(function (res) {
                //   console.log(res);
                setPost(res.data);
                setMsg(" ★ 𝙎𝙪𝙘𝙘𝙚𝙨𝙨 ★ Post updated successfully");
                // location.replace("/post");

            })
            .catch(function (err) {
                console.log(err);
                setMsg(" ❌ something went wrong. Post not updated");
            });

    }
    return (
        <>

            <main className="dashboard-content">
                <div className="container-fluid px-3 px-lg-4 py-4">
                    <PageHeading icon="bi bi-pencil-square" subtitle=" Edit-Posts" title="Edit Post"><Link to="/Posts" className="btn btn-primary"><i className="bi bi-arrow-90deg-left"></i>
                    </Link>

                    </PageHeading>



                    <section className="row g-3">
                        <div className="col-12 col-xl-12">
                            {msg != "" && (
                                <div className="alert alert-info" role="alert">
                                    {msg}
                                </div>
                            )}

                            <form className="panel needs-validation" >


                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="firstName">
                                            Title
                                        </label>
                                        <input
                                            className="form-control"
                                            id="title"
                                            type="text"
                                            value={post.title}
                                            onChange={(e) => setPost({ ...post, title: e.target.value })}
                                        />

                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label" htmlFor="email">
                                            Body
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="email"

                                            value={post.body}
                                            onChange={(e) => setPost({ ...post, body: e.target.value })}> {post.body}</textarea>


                                    </div>

                                </div>
                                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
                                    <button className="btn btn-outline-secondary" type="reset"  >Cancel</button>
                                    <button className="btn btn-primary" type="button" onClick={handleSubmit}><i className="bi bi-person-check" aria-hidden="true"></i> Update Posts</button></div>
                            </form>
                        </div>

                    </section>
                </div>
            </main>

        </>
    )
}
export default PostEdit;