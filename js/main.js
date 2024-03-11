console.clear()

// setTimeout(() => {
//     console.log('Current setTimeout')
// }, 3000)

// setInterval(() => {
//     console.log('Current setInterval')
// }, 1000)

const RequestGet = async (path) => {
    return await fetch(path, {
        method: 'GET'
    }).then(response => response.json())
}

const RequestPost = async (path, data) => {
    return await fetch(path, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
}

const RequestDelete = async(path) => {
    return await fetch(path, {
        method: 'DELETE'
    }).then(response => response.json())
}

const RequestPatch = async (path, data) => {
    return await fetch(path, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(response => response.json())
}

const RequestPut = async (path, data) => {
    return await fetch(path, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json'
        }
    }).then(response => response.json())
}

const APIUrl = `https://jsonplaceholder.typicode.com`

const InitFunc = () => {
    const container = document.querySelector('#table tbody')

    const userId = document.querySelector('#user-id')
    const buttonDelete = document.querySelector('#delete')
    const buttonPost = document.querySelector('#post')
    const userName = document.querySelector('#user-name')
    const userEmail = document.querySelector('#user-email')
    const userBody = document.querySelector('#user-comment')

    const user = {
        name: undefined,
        body: null,
        email: null
    }

    container.innerHTML = 'Loading...'

    RequestGet(APIUrl + '/users').then(data => {
        container.innerHTML = ''

        data.forEach((user, index) => {
            index += 1
            container.insertAdjacentHTML('beforeend', `
                    <tr>
                        <th scope="row">${index}</th>
                            <td>${user.name} @${user.username}</td>
                            <td>${user.email}</td>
                            <td>
                                <ul>
                                    <li>${user.company.name}</li>
                                    <li>${user.company.catchphrase}</li>
                                    <li>${user.company.bs}</li>
                                </ul>
                            </td>
                            <td>
                                <button class="btn btn-danger" data-user-id="${user.id}">Delete</button>
                            </td>
                    </tr>
            `)
        })
    })

    buttonDelete.addEventListener('click', () => {
        const value = userId.value

        const id = value !== '' ? value: 0

        RequestDelete(APIUrl + '/users' + value).then(() => {
            alert('User was deleted')

            userId.id = ''
        }).catch(error => {
            console.error(error)

            alert('User was not deleted')
        })
    })

    userName.addEventListener('input', (e) => {
        user.name = e.target.value
    })
    
    userEmail.addEventListener('input', (e) => {
        user.email = e.target.value
    })

    userBody.addEventListener('input', (e) => {
        user.body = e.target.value
    })

    buttonPost.addEventListener('click', (e) => {
        RequestPost(APIUrl + '/users', user).then(() => {
            alert('New User Created')
            userBody.value = ''
            userName.value = ''
            userEmail.value = ''
        }).catch(error => {
            console.error(error)
            alert('New User was not created')
        })
    })
}

InitFunc()