import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDrivers, getTeams, changePage, filterTeam, refresh } from "../../redux/actions/actions";
import Cards from '../Cards/Cards'
import "./homepage.css"

const HomePage = () => {
  const dispatch = useDispatch();
  const drivers = useSelector(state => state.drivers);
  const teams = useSelector(state => state.teams);
  const currentPage = useSelector(state => state.currentPage);
  
  useEffect(() => {
    dispatch(getDrivers())
    dispatch(getTeams())
  },[])

  const pagination = (event) => {
    dispatch(changePage(event.target.name))
  }

  const filterTeams = (event) => {
    dispatch(filterTeam(event.target.value))
    console.log(event.target.value);
  }

  const handleRefresh = () => {
    dispatch(refresh())
  }

  return (
    <>
    {/* <div><h3>currenpage: {currentPage}</h3></div> */}
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      <select name="filter-teams" onChange={filterTeams}>
        {teams?.map((team,index)=> 
        <option key={index} value={team}>{team}</option>)}
      </select>
      <select name="order" id="">
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
    <div className='home-container'>
      <div className='home-button1'>
        <button onClick={pagination} name="prev" >{"<<"}</button>
      </div>
      <div className='home-button2'>
        <Cards drivers={drivers} />
      </div>
      <div className='home-button3'>
        <button onClick={pagination} name="next" >{">>"}</button></div>
    </div></>
  )
}

export default HomePage