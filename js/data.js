import {showLoading, hideLoading} from "./notification.js";

function host(endpoint) {
    return `https://api.backendless.com/04B757E2-F823-EBAE-FF31-DAB0AA48A900/8F6C597D-EF79-40B3-B03F-F5D4B2BE80C8/${endpoint}`
}

const endpoinsts = {

    REGISTER: 'users/register',
    LOGIN: 'users/login',
    LOGOUT: 'users/logout',
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
};

export async function register(username, password) {
    showLoading()
    const result = (await fetch(host(endpoinsts.REGISTER), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    })).json();

    hideLoading();
    return result;
}

export async function login(username, password) {
    showLoading()
    const result = await (await fetch(host(endpoinsts.LOGIN), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: username,
            password
        })
    })).json();

    localStorage.setItem('userToken', result['user-token']);
    localStorage.setItem('username', result.username);
    localStorage.setItem('userId', result.objectId);

    hideLoading();
    return result;
}

export async function logout() {
    showLoading();
    const token = localStorage.getItem('userToken')
    localStorage.removeItem('userToken');
    const result = fetch(host(endpoinsts.LOGOUT), {
        headers: {
            'user-token': token
        }
    });

    hideLoading()
    return result;

}

//get all movies
export async function getMovies() {
    showLoading()
    const token = localStorage.getItem('userToken')

    const result = (await fetch(host(endpoinsts.MOVIES), {
        headers: {
            'user-token': token
        }
    })).json();
    hideLoading();
    return result;
}

//get movie by ID
export async function getMovieById(id) {
    showLoading();
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoinsts.MOVIE_BY_ID + id), {
        headers: {
            'user-token': token
        }
    })).json();

    hideLoading();
    return result;
}

//create movie
export async function createMovie(movie) {
    showLoading();
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoinsts.MOVIES), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(movie)
    })).json();
    hideLoading();
    return result;
}

//edit movie
export async function updateMovie(id, updatedProps) {
    showLoading();
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoinsts.MOVIE_BY_ID + id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        },
        body: JSON.stringify(updatedProps)
    })).json();
    hideLoading();
    return result;
}

//delete movie
export async function deleteMovie(id) {
    showLoading();
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoinsts.MOVIE_BY_ID + id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();
    hideLoading();
    return result;
}

//get movies by userID
export async function getMoviesByOwner(ownerId) {
    showLoading();
    const token = localStorage.getItem('userToken');

    const result = (await fetch(host(endpoinsts.MOVIES + `?where=ownerId%3D%27${ownerId}%27`), {
        headers: {
            'Content-Type': 'application/json',
            'user-token': token
        }
    })).json();
    hideLoading();
    return result;
}


//buy ticket
export async function byTicket(movie) {

    const newTickets = movie.tickets - 1;
    const movieId = movie.objectId;

    return updateMovie(movieId, {tickets: {newTickets}});
}

