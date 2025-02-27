document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const fields = {
        firstName: document.getElementById('firstName'),
        lastName: document.getElementById('lastName'),
        email: document.getElementById('email'),
        message: document.getElementById('message'),
        consent: document.getElementById('consent')
    };
    
    const errors = {
        firstName: document.getElementById('firstNameError'),
        lastName: document.getElementById('lastNameError'),
        email: document.getElementById('emailError'),
        queryType: document.getElementById('queryTypeError'),
        message: document.getElementById('messageError'),
        consent: document.getElementById('consentError')
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset all errors
        Object.values(errors).forEach(error => {
            error.style.display = 'none';
        });
        
        Object.entries(fields).forEach(([fieldName, field]) => {
            field.classList.remove('error-field');
            
            if (fieldName === 'consent') {
                if (!field.checked) {
                    errors[fieldName].style.display = 'block';
                    isValid = false;
                }
            } else if (!field.value.trim()) {
                field.classList.add('error-field');
                errors[fieldName].style.display = 'block';
                isValid = false;
            }
        });
        
        // Check email format
        if (fields.email.value.trim() && !isValidEmail(fields.email.value.trim())) {
            fields.email.classList.add('error-field');
            errors.email.style.display = 'block';
            isValid = false;
        }
        
        // Check radio buttons
        const queryType = document.querySelector('input[name="queryType"]:checked');
        if (!queryType) {
            errors.queryType.style.display = 'block';
            isValid = false;
        }
        
        if (isValid) {
            alert('Form submitted successfully!');
            form.reset();
        }
    });
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
});