export default {
  state: {
    users: [],
    planets: [],
  },

  getters: {
    users: state => state.users,
    planets: state => state.planets,
  },

  actions: {
    fetchData({commit}) {
      let apiUsers = [];
      const apiPlanets = [];

      let userDataComplete = false;
      let planetDataComplete = false;

      /**
       * @function getUsers
       * @description Function used to call API for people data. Recursive use as API only returns 10 results at a time
       * @param {string} url Endpoint URL
       */
      function getUsers(url) {
        fetch(url)
          .then(resp => resp.json())
          .then(data => {
            apiUsers.push(...data.results)
            if (data.next !== null) {
              let nextUrl = data.next.replace('http:', 'https:');
              getUsers(nextUrl);
            } else {
              userDataComplete = true;
            }
          })
      }

      /**
       * @function getPlanets
       * @description Function used to call API for planets data. Recursive use as API only returns 10 results at a time
       * @param {string} url Endpoint URL
       */
      function getPlanets(url) {
        fetch(url)
          .then(resp => resp.json())
          .then(data => {
            apiPlanets.push(...data.results)
            if (data.next !== null) {
              let nextUrl = data.next.replace('http:', 'https:');
              getPlanets(nextUrl);
            } else {
              planetDataComplete = true;
            }
          })
      }

      let intervalTimer = setInterval(checkDataComplete, 1000);

      function checkDataComplete() {
        if (userDataComplete && planetDataComplete) {
          clearInterval(intervalTimer);
          for (let i = 0; i < apiUsers.length; i++) {
            let [userPlanet] = apiPlanets.filter(planet => planet.url === apiUsers[i].homeworld)
            apiUsers[i].planet = userPlanet.name;

            let createDate = new Date(apiUsers[i].created)
            createDate = `${createDate.getMonth() + 1}/${createDate.getDate()}/${createDate.getFullYear()}`

            apiUsers[i].created = createDate;

            let editDate = new Date(apiUsers[i].created)
            editDate = `${editDate.getMonth() + 1}/${editDate.getDate()}/${editDate.getFullYear()}`

            apiUsers[i].edited = editDate;
          }

          apiUsers = apiUsers.sort((a, b) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          })

          commit('updateUsers', apiUsers);
          commit('updatePlanets', apiPlanets);
        }
      }

      getUsers('https://swapi.dev/api/people');
      getPlanets('https://swapi.dev/api/planets/');
      
    }
  },

  mutations: {
    updateUsers(state, data) {
      state.users = data;
    },

    updatePlanets(state, data) {
      state.planets = data;
    }
  }
}