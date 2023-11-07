import { useEffect, useState } from 'react'
import "./form.css";
import { useDispatch, useSelector } from 'react-redux';
import { getTeams } from '../../redux/actions/actions';
import validation from "../../validation";

function Form() {

  const dispatch = useDispatch();
  const teams = useSelector(state => state.teams);
  
  useEffect(() => {
    dispatch(getTeams())
    console.log(teams);
  },[])
  
  const [form,setForm] = useState({
    name:"",
    lastname:"",
    nationality:"",
    birthdate:"",
    teams:[],
    image:"",
    description:"",
  })

  const [cont,setCont] = useState(1);
  const [team,setTeam] = useState([]);
  const [inputTeam,setInputTeam] = useState([]);
  const [errors, setErrors] = useState({})

  const handleInput = (event) =>{
    if(event.target.name === "teams"){
      setTeam([...team,event.target.value])
      setForm((prev) =>{
        return {
          ...prev,
          teams: [...prev.teams,event.target.value]
        }
      })
    }
    if(event.target.name !== "teams"){
      setForm({
        ...form,
        [event.target.name]:event.target.value,
      })        
    }
    setErrors(validation({
      ...form,
      [event.target.name]: event.target.value
    }))
  }

  

  const addTeam = (event) =>{
    event.preventDefault()
    setInputTeam([...inputTeam,
    <div key={cont}>
          <label htmlFor="teams">Teams:</label>
          <select onChange={handleInput} name="teams" id="teams">
            {teams.map((team,index) => <option key={index} value={team}>{team}</option>)}
          </select>
        </div>
  ])
    setCont(cont+1)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(Object.keys(errors).length) return alert("Faltan completar algunos datos")
    console.log(event);
  }
  

  return (
    <div>
    <h2>Creating Drive</h2>
    <form onSubmit={handleSubmit}>

      <fieldset>
        <legend >Driver Information</legend>

        <label >Name:
        <input onChange={handleInput} value={form.name} type="text" name="name" placeholder='Write...'/>
        <div className='error-cont'>{errors.name}</div>
        </label>

        <label >Lastname:
        <input onChange={handleInput} value={form.lastname} type="text" name="lastname" placeholder='Write...'/>
        <div className='error-cont'>{errors.lastname}</div>
        </label>

        <label >Nationality:
        <input onChange={handleInput} value={form.nationality} type="text" name="nationality" placeholder='Write...'/>
        <div className='error-cont'>{errors.nationality}</div>
        </label>

        <label>Birthdate:
        <input onChange={handleInput} value={form.fecha} type="date" name="birthdate" id="birthdate" placeholder='Write...'/> 
        <div className='error-cont'>{errors.birthdate}</div>
        </label>
      </fieldset>

      <fieldset>
        <legend>Additional Information</legend>

        <div>
          <label htmlFor="teams">Teams:</label>
          <select onChange={handleInput} name="teams" id="teams">
            {teams.map((team,index) => <option key={index} value={team}>{team}</option>)}
          </select>
        </div>
        {inputTeam.length ? inputTeam.map((e)=>e) : null}
          <button onClick={addTeam}>+</button>

        <label>Image:
          <input onChange={handleInput} value={form.image} name='image' type="text" placeholder='link...'/>
          <div className='error-cont'>{errors.image}</div>
        </label>

        <label>Description:
          <textarea onChange={handleInput} value={form.description} name="description" cols="30" rows="10" placeholder='Write...'></textarea>
          <div className='error-cont'>{errors.description}</div>
        </label>
      </fieldset>

      <button type="submit" >Register</button>
    </form>
    </div>
  )
}

export default Form