import { LoginForm } from "../components";
import '../../src/index.css'

export default function Login(){
    console.log("Entered for login ")
   return (
      <div className="py-8">
         <h1>Entered in Login page</h1>
        <LoginForm/>
      </div>
   )
}