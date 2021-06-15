import * as axios from 'axios';

class HttpServer {
    register(userCredentials) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await axios.post('http://localhost:5000/registration/register', userCredentials);
                resolve(result.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    checkUsernameAvailability(username) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await axios.get('http://localhost:5000/registration/usernameAvailable', { username: username });
                resolve(result.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    login(userCredentials) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await axios.post('http://localhost:5000/registration/login', userCredentials);
                resolve(result.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    logout(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await axios.post('http://localhost:5000/registration/logout', userId);
                resolve(result.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    setLocalStorage(key, item) {
        return new Promise(async (resolve, reject) => {
            try {
                localStorage.setItem(key, item)
                resolve(true);
            } catch (err) {
                reject(err)
            }
        })
    }

    removeLocalStorage(key) {
        return new Promise(async (resolve, reject) => {
            try {
                localStorage.removeItem(key)
                resolve(true);
            } catch (err) {
                reject(err)
            }
        })
    }

    getUserId() {
        return new Promise((resolve, reject) => {
            try {
                resolve(localStorage.getItem('userid'));
            } catch (error) {
                reject(error);
            }
        });
    }

    getUsersTeams(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await axios.post("http://localhost:5000/team/getUsersTeams", userId)
                resolve(result.data)
            } catch (err) {
                reject(err)
            }
        });
    }

    getTeamById(teamId) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await axios.post("http://localhost:5000/team/getTeamById", teamId)
                resolve(result.data)
            } catch (err) {
                reject(err)
            }
        });
    }
}

export default new HttpServer();