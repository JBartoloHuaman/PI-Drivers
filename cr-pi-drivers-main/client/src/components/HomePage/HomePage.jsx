import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getDrivers, getTeams, changePage, filterTeam, refresh, filterOrder, filterOrigin } from "../../redux/actions/actions";
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
  }, [])

  const pagination = (event) => {
    dispatch(changePage(event.target.name))
  }

  const filter = (event) => {
    console.log(event.target.value);
    if (event.target.name === "filter-teams") dispatch(filterTeam(event.target.value))
    if (event.target.name === "filter-order") dispatch(filterOrder(event.target.value))
    if (event.target.name === "filter-origin") dispatch(filterOrigin(event.target.value))
  }



  const handleRefresh = () => {
    dispatch(refresh())
    document.getElementById("select-1").value = "all-drivers"
    document.getElementById("select-2").value = "------"
    document.getElementById("select-3").value = "------"

  }

  return (
    <div>
      <div className="home-filter">
        <div className="home-page"><h3>Page: {currentPage+1}</h3></div>
        <div className="filters">
          <button onClick={pagination} name="prev" className="select" >{"<<"}</button>

          <button onClick={handleRefresh} className="select">Refresh</button>

          <select name="filter-origin" onChange={filter} className="select" id="select-1">
            <option value="all-drivers">All Drivers</option>
            <option value="created">Created</option>
            <option value="api">API</option>
          </select>

          <select name="filter-teams" onChange={filter} className="select" id="select-2">
            <option value="------">------</option>
            {teams?.map((team, index) =>
              <option key={index} value={team}>{team}</option>)}
          </select>

          <select name="filter-order" onChange={filter} className="select" id="select-3">
            <option value="------">------</option>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
          <button onClick={pagination} name="next" className="select" >{">>"}</button>
        </div>

      </div>

      <div className='home-container'>

        <div className='home-button1'>

        </div>
        <div className='home-button2'>
          <Cards drivers={drivers} />
        </div>
        <div className='home-button3'>
        </div>
      </div>

    </div>


  )
}

export default HomePage