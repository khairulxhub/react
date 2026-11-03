import { redirect } from "react-router";

export function checkToken(){
const token = localStorage.getItem('bearer_token');
if(token){
   let payload = JSON.parse(atob(token?.split('.')[1]));
   //console.log(payload.exp  );
   if(payload.exp  * 1000< Date.now()) {
      localStorage.removeItem('bearer_token');
      return null;
   }else{
      //console.log("token is valid");
      return token;
      }

}else{
   return null;
}

}
// function checkToken(){
//    const token = localStorage.getItem('bearer_token');
//   console.log(token); (token?.split(' '));
// }
// export default checkToken;
export  const needToLogin = () => {
   const token = checkToken();
   // const token = localStorage.getItem('bearer_token');

   if(!token) return redirect('/login');
   return null;
};


export  const loggedIn = () => {
   const token = checkToken();
   // const token = localStorage.getItem('bearer_token');
   if(token) return redirect('/');
   return null;
   
};