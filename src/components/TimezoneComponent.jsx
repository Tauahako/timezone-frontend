import React, { useEffect, useState } from 'react'
import { createTimezone, getTimezone, updateTimezone } from '../services/TimezoneService';
import { useNavigate, useParams } from 'react-router-dom';

const TimezoneComponent = () => {
    const [label, setLabel] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [timezoneValue, setTimezoneValue] = useState('')

    const {id} = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if(id) {
            getTimezone(id).then((response) => {
                setLabel(response.data.label);
                setCompanyName(response.data.companyName);
                setTimezoneValue(response.data.timezoneValue);
            }).catch(error => {
                console.log(error);
            })
        }
    }, [id])

    function saveOrUpdateTimezone(e) {
        e.preventDefault();

        const timezone = {label, companyName, timezoneValue}
        console.log(timezone)

        if(id) {
            console.log(timezone);
            updateTimezone(id, timezone).then((response) => {
                console.log(response.data);
                navigator('/timezones');
            }).catch(error => {
                console.log(error);
            })
        } else {
            createTimezone(timezone).then((response) => {
                console.log(response.data);
                navigator('/timezones')
            }).catch(error => {
                console.log(error);
            })
        }
    }

    function pageTitle() {
        if(id) {
            return <h2 className='text-center'>Update Timezone</h2>
        } else {
            return <h2 className='text-center'>Add Timezone</h2>
        }
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className="card col-md-6 offset-md-3 offset-md-3">
                {
                    pageTitle()
                }
                <div className="card-body">
                    <form>
                        <div className="form-group mb-2">
                            <label htmlFor="label" className="form-label">Label</label>
                            <input
                                type="text" 
                                name="label" 
                                id="label" 
                                placeholder='Enter timezone label' 
                                value={label} 
                                className='form-control'
                                onChange={(e) => setLabel(e.target.value)} />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="companyName" className="form-label">Company Name</label>
                            <input
                                type="text" 
                                name="companyName" 
                                id="companyName" 
                                placeholder='Enter company name' 
                                value={companyName} 
                                className='form-control'
                                onChange={(e) => setCompanyName(e.target.value)} />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="timezoneValue" className="form-label">Timezone Value</label>
                            <input
                                type="text" 
                                name="timezoneValue" 
                                id="timezoneValue" 
                                placeholder='Enter timezone value' 
                                value={timezoneValue} 
                                className='form-control'
                                onChange={(e) => setTimezoneValue(e.target.value)} />
                        </div>
                        <button type="button" className='btn btn-primary' onClick={saveOrUpdateTimezone}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimezoneComponent