/* eslint-disable no-console */
/* eslint-disable no-undef */
const BASE_URL = 'http://localhost:4000'

const client = (function () {
    function getTimers(success) {
      return fetch(BASE_URL + '/api/timers', {
        headers: {
          Accept: 'application/json',
        },
      }).then(checkStatus)
        .then(parseJSON)
        .then(success);
    }
  
    function createTimer(data) {
      return fetch(BASE_URL + '/api/timers', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(checkStatus);
    }
  
    function updateTimer(data) {
      return fetch(BASE_URL + '/api/timers', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(checkStatus);
    }
  
    function deleteTimer(data) {
      return fetch(BASE_URL + '/api/timers', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(checkStatus);
    }
  
    function startTimer(data) {
      return fetch(BASE_URL + '/api/timers/start', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(checkStatus);
    }
  
    function stopTimer(data) {
      return fetch(BASE_URL + '/api/timers/stop', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(checkStatus);
    }
  
    function checkStatus(response) {
      if (response.status >= 200 && response.status < 300) {
        return response;
      } else {
        const error = new Error(`HTTP Error ${response.statusText}`);
        error.status = response.statusText;
        error.response = response;
        console.log(error);
        throw error;
      }
    }
  
    function parseJSON(response) {
      return response.json();
    }
  
    return {
      getTimers,
      createTimer,
      updateTimer,
      startTimer,
      stopTimer,
      deleteTimer,
    };
}());

export default client
  