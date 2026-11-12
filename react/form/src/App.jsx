
import './App.css';
import { useForm } from 'react-hook-form';

function App() {
  const {
  
    register,
    handleSubmit,
    watch,
    formState: { errors ,isSubmitting},
  }= useForm()

  // Define onSubmit handler
  const delay=(d)=>{
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolveConfig()
      },d*1000);
    })
  }
  const onSubmit = async (data) => {
    await delay(2)
    console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <>
    {isSubmitting && <div>loading...</div>}
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("username",{required:true,minLength:{value:3, message:"min length is 3 "},maxLength:{value:8 ,message:"max length is 8"}})} type="text" placeholder="Username" />
          {errors.username &&<div>{errors.username.message}</div>}
          <input {...register("password")} type="password" placeholder="Password" />
          <input type="submit" disabled={isSubmitting} value="Submit" />
        </form>
      </div>
    </>
  );
}

export default App;