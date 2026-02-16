import { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function App() {
  const[user,setUser]=useState([]);
  const[form,setForm]=useState({
    name:"",
    email:"",
    phone:"",
    age:"",
  })
  const[editId,setEditid]=useState(null);
  const Api="http://localhost:7000/api/user";
const fetch=async()=>{
  const res=await axios.get(Api);
  setUser(res.data);
}
useEffect(()=>{
  fetch();
},[])
//handle form input change
const handleform=(e)=>{
  setForm({...form,[e.target.name]:e.target.value});
}
//form submit create or update
const handlesubmit=async(e)=>{
  e.preventDefault();
  if(editId){
    await axios.put(`${Api}/${editId}`,form);
    setEditid(null);
     setForm({
      name:"",
      email:"",
      phone:"",
      age:""
    })
  }
  else{
    await axios.post(`${Api}`,form);
    setForm({
      name:"",
      email:"",
      phone:"",
      age:""
    })
    toast.success("successfil",{className:"bg-green-700 text-white"})
  }
  fetch();
}
const handleEdit=(user)=>{
  setForm(user);
  setEditid(user._id);
 
}
const handleDelete=async(id)=>{
  await axios.delete(`${Api}/${id}`);
  fetch();
}

return(
<div className="min-h-screen bg-blue-700 flex items-center justify-center p-4 flex flex-col">
  <form onSubmit={handlesubmit} className="bg-white p-4 rounded shadow-md w-1/2">
    <input type="text" name="name" value={form.name} onChange={handleform} placeholder="Name" className="w-full mb-2 p-2 border border-gray-300 rounded"/>
    <input type="email" name="email" value={form.email} onChange={handleform} placeholder="Email" className="w-full mb-2 p-2 border border-gray-300 rounded"/>
    <input type="text" name="phone" value={form.phone} onChange={handleform} placeholder="Phone" className="w-full mb-2 p-2 border border-gray-300 rounded"/>
    <input type="number" name="age" value={form.age} onChange={handleform} placeholder="Age" className="w-full mb-2 p-2 border border-gray-300 rounded"/>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded items-center">{editId?"Update":"Create"}</button>
  </form>
  <div className="mt-4 w-full">
  <table className="w-full bg-white shadow-md rounded">
    <thead className="bg-blue-400 text-white">
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Age</th>
        <th colSpan="2">Action</th>
      </tr>
    </thead>
    <tbody>
      {user.map((u) => (
        <tr key={u._id} className="text-center border-t">
          <td>{u.name}</td>
          <td>{u.email}</td>
          <td>{u.phone}</td>
          <td>{u.age}</td>
          <td>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
              onClick={() => handleEdit(u)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDelete(u._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>
)
}
export default App;
