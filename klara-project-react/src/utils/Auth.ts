import { redirect } from "react-router";
import { api } from "../api";

export const needAuth = async () => {
     const token = await checkAuth();
     if (token) {
    //    alert("Has Tokeen");
    return true;
     }else{
    //   alert("No token");
    throw redirect("/access-denied");
     }
};


export const notAuth = async () => {
 const token = await checkAuth();
 if (!token) {
    // alert("Has Tokeen");
    return true;
 }else{
    // alert("No token");
  throw redirect("/contact"); 
 }
};


const checkAuth = () => {
//   return localStorage.getItem("token") !== null;
return api.post ('check-token')
.then(res => {
    if(res.status == 401){
        // throw redirect("/access-denied");
        return false;
    }else if(res.status == 200){
        return true;
    }
    
})
.catch(err => {
    return false;
});
return false;
}