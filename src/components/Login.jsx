import Link from "next/link"
import { useForm } from "react-hook-form"




const Login = () => {

    const {register, handleSubmit, formState: {errors, isSubmitting}, setError}= useForm()

    const onSubmit = async (data)=>{
        try{
            await new Promise((resovle)=> setTimeout(resovle, 1000))
            throw new Error()
            console.log(data);
        } catch (error) {
             setError("root", {message: "You need to Sign-up before Log-In"})
        }
      
    }




  return (
    <div className="flex justify-center login-con p-15">
    <form onSubmit={handleSubmit(onSubmit)}>
         <h2>Log-In to your Profile</h2>
         <input {...register("email", {required: "Email is required", validate: (value)=> {if(!value.includes("@")){
           return "Email must include @"
         } return true
         }})} type="text" placeholder="Email"/>
         {errors.email && <p className="text-red-600">{errors.email.message}</p>}
         <input {...register("password", {required: "Password is required", minLength: {value:8, message:"Password must have at least 8 characters" }})} type="password" placeholder="Password" />
         {errors.password && <p className="text-red-600">{errors.password.message}</p>}
         <button disabled={isSubmitting} className="pr-4 pl-4 p-1">
             {isSubmitting ? "Loading" : "Log In"}
         </button>
         {errors.root && <p className="text-red-600">{errors.root.message}</p>}
         <Link  href="/signup"><h4  className="text-gray-700"><span className="text-blue-500">Sign-up</span> to have an account</h4></Link>
     </form>
     </div>
  )
}
export default Login