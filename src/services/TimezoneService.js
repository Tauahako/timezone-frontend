import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/timezones';

export const timezoneList = () => axios.get(REST_API_BASE_URL);

export const createTimezone = (timezone) => axios.post(REST_API_BASE_URL, timezone);

export const getTimezone = (timezoneId) => axios.get(REST_API_BASE_URL + '/' + timezoneId);

export const updateTimezone = (timezoneId, timezone) => axios.put(REST_API_BASE_URL + '/' + timezoneId, timezone);

export const deleteTimezone = (timezoneId) => axios.delete(REST_API_BASE_URL + '/' + timezoneId);

export const viewTimezoneDetails = (timezoneId) => axios.get(REST_API_BASE_URL + '/' + timezoneId);