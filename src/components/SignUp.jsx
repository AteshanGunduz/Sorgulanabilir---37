import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";




const SignUp = () => {

    const {register, handleSubmit, formState: {errors, isSubmitting}, setError}= useForm()
    const router = useRouter()
    
  
    
    const onSubmit = async (data)=>{
        try{
            await new Promise((resovle)=> setTimeout(resovle, 1000))
    
    
            router.push('/')
        } catch (error) {
             setError("root", {message: "This email is already taken"})
        }
      
    }



  return (
    <div className="flex justify-center login-con p-15">
   
   <form onSubmit={handleSubmit(onSubmit)}>
       
        <h2>Sign-Up</h2>
        <input {...register("firstName", {required:"Name is required", validate: (value)=> {if (!/^[a-zA-Z ]*$/.test(value)) {
        return "Please Enter a valid name";
        } return true
        }})}type="text" placeholder="First Name" />
        {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}


        <input {...register("lastName", {required:"Last Name is required", validate: (value)=> {if (!/^[a-zA-Z]+$/.test(value)) {
        return "Please Enter a valid last name";
        } return true
        }})}type="text" placeholder="Last Name" />
        {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}


        
        <input {...register("phone", {required:"Phone Number is required", validate: (value)=> { if (!/^\d{1,10}$/.test(value)){
        return "Please Enter a valid Phone Number";
        } return true
        }})}type="text" placeholder="Phone Number" maxLength={10} />
        {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}



        <input {...register("email", {required: "Email is required", validate: (value)=> {if(!value.includes("@")){
          return "Email must include @"
        } return true
        }})} type="text" placeholder="Email"/>
        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        <input {...register("password", {required: "Password is required", minLength: {value:8, message:"Password must have at least 8 characters" }})} type="password" placeholder="Password" />
        {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        <button disabled={isSubmitting} className="pr-4 pl-4 p-1">
            {isSubmitting ? "Loading" : "Submit"}
        </button>
        {errors.root && <p className="text-red-600">{errors.root.message}</p>}
    </form>
    </div>
  )
}
export default SignUp