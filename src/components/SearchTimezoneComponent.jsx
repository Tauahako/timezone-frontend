import React, { useState } from 'react'
import moment from 'moment-timezone';

const SearchTimezoneComponent = () => {
  const [timezone, setTimezone] = useState('Europe/Paris');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [matchingTimezone, setMatchingTimezone] = useState({});

  const handleDateTimeChange = (event) => {
      setSelectedDateTime(event.target.value);
      convertTime(event.target.value);
  };

  const convertTime = (dateTime) => {
      const convertedTimes = {};

      moment.tz.names().forEach((timezone) => {
          convertedTimes[timezone] = moment(dateTime).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
      });

      setMatchingTimezone(matchingTimezone);
  };
    
  return (
    <>
        <div className="container mt-5">
            <h2>Timezone Converter</h2>
            <div className='form-group mb-2'>
                <label className='form-label'>Select Timezone: </label>
                <input
                    type="text" 
                    name="timezone" 
                    id="timezone" 
                    placeholder='Enter timezone value' 
                    value={timezone} 
                    className='form-control'
                    onChange={(e) => setTimezone(e.target.value)} />
            </div>
            <div className='form-group'>
                <label>Enter Date/Time: </label>
                <input type="datetime-local" className='form-control' value={selectedDateTime} onChange={handleDateTimeChange} />
            </div>
            <div>
                <h3>Matched Times:</h3>
                <ul>
                    {/* TODO */}
                </ul>
            </div>
        </div>
    </>
  )
}

export default SearchTimezoneComponent