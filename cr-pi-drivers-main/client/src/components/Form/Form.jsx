import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createDriver, getTeams } from '../../redux/actions/actions';
import validation from "../../validation";
import Card from "../Card/Card";
import "./form.css";

function Form() {

  const dispatch = useDispatch();
  const teams = useSelector(state => state.teams);
  const drivers = useSelector(state => state.drivers)
  
  useEffect(() => {
    dispatch(getTeams())
  },[])
  
  const [form,setForm] = useState({
    name:"",
    lastname:"",
    nacionality:"",
    birthdate:"",
    Teams:[],
    image:"",
    description:"",
  })

  const [cont,setCont] = useState(1);
  const [team,setTeam] = useState([]);
  const [inputTeam,setInputTeam] = useState([]);
  const [errors, setErrors] = useState({})

  const handleInput = (event) =>{
    if(event.target.name === "teams"){
      if(event.target.value !== "------"){
      setTeam([...team,event.target.value])
      setForm((prev) =>{
        return {
          ...prev,
          Teams: [...prev.Teams,event.target.value]
        }
      })
    }
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
    <div className='form-label' key={cont}>
          <label htmlFor="teams">Teams:</label>
          <select onChange={handleInput} name="teams" id="teams">
            <option value="------">------</option>
            {teams.map((team,index) => <option key={index} value={team}>{team}</option>)}
          </select>
        </div>
  ])
    setCont(cont+1)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("teams").value = "------";
    const driversRepeat = drivers.find(driver=> driver.name.toLowerCase() === form.name.toLowerCase() && driver.lastname.toLowerCase() === form.lastname.toLowerCase())
    for(const key in form){
      if(form[key] ==="") return alert("Faltan completar algunos datos")
    }
    // if(Object.keys(errors).length) return alert("Faltan completar algunos datos")
    if(driversRepeat) return alert("The driver is already registered")
    dispatch(createDriver(form))
    alert("driver is created")
    setInputTeam([])
    setForm({
      name:"",
      lastname:"",
      nacionality:"",
      birthdate:"",
      Teams:[],
      image:"",
      description:"",
    })

  }

  return (
    <div className='form-cont'>
    <form onSubmit={handleSubmit}>
    <h2>Creating Drive</h2>

      <fieldset>
        <legend ><h3>Driver Information</h3></legend>

        <label className='form-label'>Name:
        <input onChange={handleInput} value={form.name} type="text" name="name" placeholder='Write...'/>
        <div className='error-cont'>{errors.name}</div>
        </label>

        <label className='form-label' >Lastname:
        <input onChange={handleInput} value={form.lastname} type="text" name="lastname" placeholder='Write...'/>
        <div className='error-cont'>{errors.lastname}</div>
        </label>

        <label className='form-label' >Nationality:
        <input onChange={handleInput} value={form.nacionality} type="text" name="nacionality" placeholder='Write...'/>
        <div className='error-cont'>{errors.nationality}</div>
        </label>

        <label className='form-label'>Birthdate:
        <input onChange={handleInput} value={form.birthdate} type="date" name="birthdate" id="birthdate" placeholder='Write...'/> 
        <div className='error-cont'>{errors.birthdate}</div>
        </label>
      </fieldset>

      <fieldset>
        <legend><h3>Additional Information</h3></legend>

        <div className='form-label'>
          <label htmlFor="teams">Teams:</label>
          <select onChange={handleInput} name="teams" id="teams">
            <option value="------">------</option>
            {teams?.map((team,index) => <option key={index} value={team}>{team}</option>)}
          </select>
        </div>
        {inputTeam.length ? inputTeam.map((e)=>e) : null}
          <button onClick={addTeam} className='form-button'>+</button>

        <label className='form-label'>Image:
          <input onChange={handleInput} value={form.image} name='image' type="text" placeholder='link...'/>
          <div className='error-cont'>{errors.image}</div>
        </label>

        <label className='form-label'>Description: <br />
          <textarea onChange={handleInput} value={form.description} name="description" cols="30" rows="10" placeholder='Write...'></textarea>
          <div className='error-cont'>{errors.description}</div>
        </label>
      </fieldset>

      <button type="submit" className='form-submit'>Register</button>
    </form>
    <Card className="form-card" name={form.name} image={form.image} Teams={form.Teams}/>
    </div>
  )
}

export default Form