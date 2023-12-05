// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!
document.addEventListener('DOMContentLoaded',()=>{
    const registerForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');
    const errorDiv=document.getElementById('error-container');

    registerForm?.addEventListener('submit', function(event){
        const firstName = document.getElementById('firstNameInput').value;
        const lastName = document.getElementById('lastNameInput').value;
        const emailAddress = document.getElementById('emailAddressInput').value;
        const password = document.getElementById('passwordInput').value;
        const confirmPassword = document.getElementById('confirmPasswordInput').value;
        const role = document.getElementById('roleInput').value;
        let errorMessage=[];

        if(!firstName || firstName.length<2 || firstName.length>25 || !/^[A-Za-z]+$/.test(firstName)){
            errorMessage.push('First name must be between 2 to 25 characters and must contain only letters')
        }
        if(!lastName || lastName.length<2 || lastName.length>25 || !/^[A-Za-z]+$/.test(lastName)){
            errorMessage.push('lastName  must be between 2 to 25 characters and must contain only letters')
        }
        //email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(emailAddress)){
            errorMessage.push(' Please enter a valid email Address'); 
          }
        let [prefix,domain]=emailAddress.split("@");
        if(!/^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/.test(prefix) || !/^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/.test(domain)) {
            errorMessage.push(' Email Address given does not  have a valid prefix or domain'); 
        }
        //passwordvalidate
        if(typeof(password)!=='string' || password.includes(' ') || password.length<8){
            errorMessage.push('Password must be valid String with no spaces and should be at least 8 characters long'); 
          }
          if(! /[A-Z]/.test(password)|| !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)){
            errorMessage.push('Password must contain at least one upperCase character, one number and one special character'); 
          }

        if(password !== confirmPassword){
            errorMessage.push(`Password and Confirm password don't match`);
        }

        if(!['admin','user'].includes(role.toLowerCase())){
            errorMessage.push(`Role must be either Admin or User`);
        }

        if(errorMessage.length>0){
            event.preventDefault();
            errorDiv.innerHTML = errorMessage.join('<br>');
            //errorDiv.style.display = 'block';//to be removed
            document.getElementById('firstNameInput').value = firstName;
            document.getElementById('lastNameInput').value =lastName;
            document.getElementById('emailAddressInput').value = emailAddress;
            document.getElementById('passwordInput').value =  password;
            document.getElementById('confirmPasswordInput').value = confirmPassword;
            document.getElementById('roleInput').value = role;
        }

    });

    loginForm?.addEventListener('submit', function(event){
        const emailAddress = document.getElementById('emailAddressInput').value;
        const password = document.getElementById('passwordInput').value;
        let errorMessage=[];
         //email validation
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(!emailAddress && !password){
            errorMessage.push('Please enter the values for all fields');
        }
          /* if(!emailRegex || !emailRegex.test(emailAddress)){
             errorMessage.push(' Please enter a valid email Address'); 
           }
        let [prefix,domain]=emailAddress.split("@");
        if(!/^([a-zA-Z0-9]+([_\.-]?[a-zA-Z0-9]+)*)$/.test(prefix) || !/^([a-zA-Z0-9-]+)+(\.[a-zA-Z]{2,})+$/.test(domain)) {
            errorMessage.push(' Email Address given does not  have a valid prefix or domain'); 
        }
        if(typeof(password)!=='string' || password.includes(' ') || password.length<8){
            errorMessage.push('Password must be valid String with no spaces and should be at least 8 characters long'); 
          }
          if(! /[A-Z]/.test(password)|| !/[0-9]/.test(password || !/[^A-Za-z0-9]/.test(password))){
            errorMessage.push('Password must contain at least one upperCase character, one number and one special character'); 
          }*/
          if(errorMessage.length>0){
            event.preventDefault();
            errorDiv.innerHTML = errorMessage.join('<br>');
            console.log("Error messages:",errorMessage);
            document.getElementById('emailAddressInput').value = emailAddress;
            document.getElementById('passwordInput').value = password;
            //errorDiv.style.display = 'block';//to be removed
        }

    })

})