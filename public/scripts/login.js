
const validateLogin = () => {
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const form = document.getElementById('login-form')
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const err_msg = document.getElementById('error-msg')
        if(err_msg){
            err_msg.style.visibility = "hidden"
        }
        
        let email_valid = true
        let pass_valid = true
        if(email.value.length == 0){
            console.log('invalid email' + email.value )
            email.classList.add('invalid-input')
            email_valid = false
        }
        else{
            email.classList.remove('invalid-input')
        }
        if(password.value.length == 0){
            console.log("invalid password")
            password.classList.add('invalid-input')
            pass_valid = false
        }
        else{
            password.classList.remove('invalid-input')
        }
        
        if(pass_valid && email_valid){
            console.log('valid input')
            form.submit()
        }

    })
}


document.addEventListener('DOMContentLoaded', () => {
    validateLogin()
})
