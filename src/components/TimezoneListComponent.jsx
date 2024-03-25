import React, {useEffect, useState} from 'react'
import {deleteTimezone, timezoneList} from '../services/TimezoneService'
import { useNavigate } from 'react-router-dom'

const TimezoneList = () => {
    const [timezones, setTimezones] = useState([])
    const navigator = useNavigate();

    useEffect(() => {
        getAllTimezones();
        const interval = setInterval(() => {
            updateTimezoneData();
        }, 1000); // Refresh every second

        return () => clearInterval(interval);
    }, [])

    const getAllTimezones = () => {
        timezoneList().then((response) => {
            setTimezones(response.data);
        }).catch(error => {
            console.error(error);
        })
    };

    const addNewTimezone = () => {
        navigator('/add-timezone')
    };

    const updateTimezone = (id) => {
        navigator(`/edit-timezone/${id}`)
    };

    const removeTimezone = (id) => {
        console.log(id);
        deleteTimezone(id).then((response) =>  {
            getAllTimezones();
        }).catch(error => {
            console.log(error);
        })
    };

    const viewTimezoneDetails = (id) => {
        console.log(id);
        navigator(`/view-timezone/${id}`)
    };

    const handleCorrespondingTime = (timezoneValue) => {
        let date = new Date();
        let options = { timeZone: timezoneValue, hour12: false };
        let hour = date.toLocaleTimeString('en-US', options);
        return hour;
    };

    const updateTimezoneData = () => {
        setTimezones(prevTimezones => prevTimezones.map(timezone => ({
            ...timezone,
            time: handleCorrespondingTime(timezone.timezoneValue)
        })));
    };
    
  return (
    <div className='container'>
        <h2 className='text-center'>List of timezone</h2>
        <button type="button" className='btn btn-primary mb-2' onClick={addNewTimezone}>Add Timezone</button>
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Label</th>
                    <th>Company's Name</th>
                    <th>Time</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    timezones.map(timezone =>
                        <tr key={timezone.id}>
                            <td>{timezone.id}</td>
                            <td>{timezone.label}</td>
                            <td>{timezone.companyName}</td>
                            <td>{handleCorrespondingTime(timezone.timezoneValue)}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateTimezone(timezone.id)}>
                                    Update
                                </button>
                                <button className='btn btn-danger' onClick={() => removeTimezone(timezone.id)}>
                                    Delete
                                </button>
                                <button className='btn btn-secondary' onClick={() => viewTimezoneDetails(timezone.id)}>
                                    View
                                </button>
                            </td>
                        </tr>    
                    )
                }
            </tbody>
        </table>
        {/* <div>
            <input type="datetime-local" value={dateTime} onChange={handleDateTimeChange} />
        </div>
        <div>
            <h2>Converted Times</h2>
            <ul>
            {Object.keys(convertedTimes).map(id => (
                <li key={id}>
                {timezones.find(timezone => timezone.id === parseInt(id)).label}: {convertedTimes[id]}
                </li>
            ))}
            </ul>
        </div> */}
    </div>
  )
}

export default TimezoneList