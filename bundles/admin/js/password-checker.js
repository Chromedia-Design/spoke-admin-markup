var CheckPassword = function (options) {
    this.form = options.form;
    this.firstPassword = options.firstPassword;
    this.confirmPassword = options.confirmPassword;
};

CheckPassword.prototype.strongPassword = function () {
    const firstPasswordInput = this.firstPassword;
    const confirmPasswordInput = this.confirmPassword;
    const submitPassword = this.form.find('#submit-password');
    const form = this.form;
    const alertText = document.getElementById('password-confirm-match');

    const helperText = {
        charLength: this.form.find('.password-requirement-text .length'),
        lowercase: this.form.find('.password-requirement-text .lowercase'),
        uppercase: this.form.find('.password-requirement-text .uppercase'),
        special: this.form.find('.password-requirement-text .special'),
        number: this.form.find('.password-requirement-text .number')
    };

    const pattern = {
        charLength: function(passwordInput) {
            return passwordInput.val().length >= 8 ;
        },
        lowercase: function(passwordInput) {
            const regex = /^(?=.*[a-z]).+$/;

            //regex.text returns true or false
            return regex.test(passwordInput.val()) ;
        },
        uppercase: function(passwordInput) {
            const regex = /^(?=.*[A-Z]).+$/;

            //regex.text returns true or false
            return regex.test(passwordInput.val()) ;
        },
        special: function(passwordInput) {
            const regex = /^(?=.*[\W]).+$/;

            //regex.text returns true or false
            return regex.test(passwordInput.val()) ;
        },
        number: function(passwordInput) {
            const regex = /^(?=.*[0-9]).+$/;

            //regex.text returns true or false
            return regex.test(passwordInput.val());
        }
    };

    firstPasswordInput.on('keyup', function (){

        const patternCheck = {
            length: pattern.charLength(firstPasswordInput),
            lower: pattern.lowercase(firstPasswordInput),
            upper: pattern.uppercase(firstPasswordInput),
            special: pattern.special(firstPasswordInput),
            number: pattern.number(firstPasswordInput)
        };

        patternTest( patternCheck.length, helperText.charLength );
        patternTest( patternCheck.lower, helperText.lowercase );
        patternTest( patternCheck.upper, helperText.uppercase );
        patternTest( patternCheck.special, helperText.special );
        patternTest( patternCheck.number, helperText.number);

// Check that all requirements are fulfilled
        if( confirmPasswordInput.val() === firstPasswordInput.val() &&
            patternCheck.length && patternCheck.number && patternCheck.special
            && patternCheck.upper && patternCheck.lower
        ) {
            addClassName(firstPasswordInput, 'password-valid');
            removeClassName(submitPassword, 'disabled');
            $(form).off('submit').on('submit', function () {
                return true
            });
            alertText.innerHTML = "";
        }
        else {
            removeClassName(firstPasswordInput, 'password-valid');
            if(confirmPasswordInput.length === 0) {
                alertText.innerHTML = "Requirements not met or passwords don't match.";
            }
            $(form).on('submit', function () {
                return false
            });
            addClassName(submitPassword, 'disabled');
        }
    });

    confirmPasswordInput.on('keyup', function () {

        if (confirmPasswordInput.val() === firstPasswordInput.val() &&
            pattern.number(firstPasswordInput) &&
            pattern.charLength(firstPasswordInput) &&
            pattern.lowercase(firstPasswordInput) &&
            pattern.uppercase(firstPasswordInput)&&
            pattern.special(firstPasswordInput)
        ) {
            removeClassName(submitPassword, 'disabled');
            $(form).off('submit').on('submit', function () {
                return true
            });
            alertText.innerHTML = "";
        } else {
            alertText.innerHTML = "Requirements not met or passwords don't match.";
            addClassName(submitPassword, 'disabled');
            $(form).on('submit', function () {
                return false
            })
        }
    });

    $(form).on('submit', function () {
        return false
    });
    addClassName(submitPassword, 'disabled');


    function patternTest(pattern, response) {
        if(pattern) {
            addClassName(response, 'password-valid');
        }
        else {
            removeClassName(response, 'password-valid');
        }
    }

    function addClassName(el, className) {
        if (el) {
            el.addClass(className);
        }
        else {
            el.className += ' ' + className;
        }
    }

    function removeClassName(el, className) {
        if (el.attr('class'))
            el.removeClass(className);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
};
