import './App.css'
import TimezoneComponent from './components/TimezoneComponent'
import TimezoneList from './components/TimezoneListComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ViewTimezoneDetailsComponent from './components/ViewTimezoneDetailsComponent'
import SearchTimezoneComponent from './components/SearchTimezoneComponent'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = { <TimezoneList/> } />
          <Route path='/timezones' element = { <TimezoneList/> } />
          <Route path='/add-timezone' element = { <TimezoneComponent/> } />
          <Route path='/edit-timezone/:id' element = { <TimezoneComponent/> } />
          <Route path='/view-timezone/:id' element = { <ViewTimezoneDetailsComponent/> }/>
        </Routes>
      </BrowserRouter>
      <SearchTimezoneComponent />
    </>
  )
}

export default App
