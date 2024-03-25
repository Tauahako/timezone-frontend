import React, { useEffect, useState } from 'react'
import { getTimezone, viewTimezoneDetails } from '../services/TimezoneService';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment-timezone';

const ViewTimezoneDetailsComponent = () => {
    const [label, setLabel] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [timezoneValue, setTimezoneValue] = useState('')
    const [details, setDetails] = useState('');

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

    useEffect(() => {
        if (timezoneValue) {
            getTimezoneDetails(timezoneValue);
        }
    }, [timezoneValue]);

    const getTimezoneDetails = (timezoneValue) => {
        let timezone = moment.tz(timezoneValue);

        let details = {
            value: timezone.zoneAbbr(),
            label: timezone.format('z'),
            offset: timezone.utcOffset() / 60,
            abbrev: timezone.format('Z'),
            altName: timezone.format('zz')
        };

        setDetails(JSON.stringify(details, null, 2));
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className="card col-md-6 offset-md-3 offset-md-3">
                <h2 className='text-center'>Timezone Details</h2>
                <h5 className='card-title'>{companyName}</h5>
                <h6 className='card-subtitle mb-2 text-muted'>Timezone : {timezoneValue}</h6>
                <pre>{details}</pre>
            </div>
        </div>
    </div>
  )
}

export default ViewTimezoneDetailsComponent