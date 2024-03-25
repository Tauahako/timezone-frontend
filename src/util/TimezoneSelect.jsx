import React from 'react';
import TimezoneSelect from 'react-timezone-select';

function TimeZoneComponent() {
  const handleTimezoneChange = (timezone) => {
    console.log(timezone);
    // Gérez le changement de fuseau horaire ici
  };

  return (
    <div>
      <TimezoneSelect
        value="Europe/Paris" // Valeur par défaut
        onChange={handleTimezoneChange}
      />
    </div>
  );
}

export default TimeZoneComponent;
