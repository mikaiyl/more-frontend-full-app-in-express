const userCreateForm = document.getElementById("user-create-form")
const userCreateSubmitButton = userCreateForm.querySelector("button[type='submit']")

const modal = document.getElementById('modal')

const username = document.getElementById('inputUsername')
const email = document.getElementById('inputEmail')
const password = document.getElementById('inputPassword')
const phone = document.getElementById('inputPhone')

userCreateForm.addEventListener( 'submit', handleClick )

function postData(url, data) {
    let head = {
        'Content-Type': 'application/json'
    }
    // Default options are marked with *
    const raw =  fetch( url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: head,
        body: JSON.stringify(data), // must match 'Content-Type' header
    }).then( async res => {
        let obj = {
            status: res.status,
            json: await res.json()
        }

        return obj
        // parses response to JSON
    }).then( data => {
        console.log(data)
        let { status, json } = data
        console.log( status )
        console.log( json )
        if ( status === 201 ) {
            document.querySelector( '#modalLabel' ).textContent = json.message
            $( '#modal' ).modal( 'show' )
        } else if ( status === 409 ) {
            document.querySelector( '#modalLabel' ).textContent = json.message
            $( '#modal' ).modal( 'show' )
        }
    } )
}

function handleClick( event ) {
    event.preventDefault()
    let userPackage = {
        username: username.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
    }
    postData( 'http://localhost:3000/api/user', userPackage )
}
