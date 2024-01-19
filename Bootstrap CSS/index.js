$(document).ready(function () {

    $(".SubmitButton").on("click", function () {
        console.log("submit button was clicked");
        var data = validateData();
        if (data) {
            storeData(data);
            displayUserData();
        }
    });

    $(".ResetButton").on("click", function () {
        $("#dataForm")[0].reset();
        removeErrorMessages();
    });

    $(".close").on("click", function () {
        $("#customAlert").hide();
    });

    $("#clearButton").on("click", function () {
        $("#displayData").html("");
    });

    $('#sameAsCurrent').on('change', function () {
        if ($(this).prop('checked')) {
            // Copy current address fields to permanent address fields
            $('.container-AG [data-store^="Current"]').each(function () {
                var permanentField = $('[data-store="Permanent' + this.dataset.store.substr(7) + '"]');
                if (permanentField.length) {
                    permanentField.val($(this).val());
                }
            });
        } else {
            // Clear permanent address fields
            $('.container-AG [data-store^="Current"]').each(function () {
                var permanentField = $('[data-store="Permanent' + this.dataset.store.substr(7) + '"]');
                if (permanentField.length) {
                    permanentField.val('');
                }
            });
        }
    }); 

   
    $('[name="country"]').on('change', function () {
        var countryDropdownId = $(this).attr('id');
       var stateDropdownId;
        // if (countryDropdownId === '#cCountry') {
        //     stateDropdownId = $('#cState');
        // } else {
        //     stateDropdownId = $('#pState');
        // }
        var stateDropdownId = $('#cState'); 
        updateStates(countryDropdownId, stateDropdownId);
    });


});

function displayUserData() {
    var displayDiv = $("#displayData");
    displayDiv.html("");

    var formData = $('#dataForm [data-store]');
    var tableHTML = '<div style="overflow-y: auto; max-height: 400px; margin-bottom: 10px; white-space: nowrap;">'; // Container for responsiveness with vertical scrollbar
    tableHTML += '<table border="1" style="border-collapse: collapse; width: 100%;">';
    tableHTML += '<tr>';

    formData.each(function (index) {
        var element = $(this);
        var value = localStorage.getItem(element.data('store'));
        if (value) {
            tableHTML += `<td style="padding: 5px; white-space: normal;">${element.data('store').charAt(0).toUpperCase() + element.data('store').slice(1)}: ${value}</td>`;

            // Check if this is the last element or the third element in a row
            if (index === formData.length - 1 || (index + 1) % 3 === 0) {
                tableHTML += '</tr>';
                // Start a new row if there are more elements
                if (index !== formData.length - 1) {
                    tableHTML += '<tr>';
                }
            }
        }
    });

    tableHTML += '</table>';
    tableHTML += '</div>'; // Close the container
    displayDiv.html(tableHTML);

    // Show the custom alert
    $("#customAlert").css('display', 'block');
}



function validateData() {
    var formData = $('#dataForm [data-store]');
    var data = {};
    let flag = false;
    let allFlagsTrue = true;

    formData.each(function () {
        var element = $(this);
        var value = $.trim($(element).val());
        // if(value == null){
        //     value = "";
        // }
        var errorMessage = $('<span>').addClass('error-message').attr('id', 'errorContainer');

        switch (element.data('store')) {

            case 'FirstName':
                if (value.length <= 0) {
                    element.focus();
                    const error = $('#errorMessageFirstNameDiv');
                    error.css('display', 'block').text('');
                    errorMessage.text("Please Enter First Name");
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageFirstNameDiv').css('display', '');
                }
                break;

            case 'Email':
                if (!validateEmail(value)) {
                    element.focus();
                    const error = $('#errorMessageDisplayBox');
                    error.css('display', 'block').text('');
                    errorMessage.text('Please enter a valid Email Address.');
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageDisplayBox').css('display', '');
                }
                break;

            case 'InstituteName10':
                if (value.length <= 0) {
                    element.focus();
                    const error = $('#errorMessageInstitute10Div');
                    error.css('display', 'block').text('');          
                    errorMessage.text("Please Enter Institute Name of Class 10");
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageFirstNameDiv').css('display', '');
                }
                break;

            case 'InstituteName12':
                if (value.length <= 0) {
                    element.focus();
                    const error = $('#errorMessageInstitute12Div');
                    error.css('display', 'block').text('');
                    errorMessage.text("Please Enter Institute Name of Class 12");
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageFirstNameDiv').css('display', '');
                }
                break;

            case 'InstituteNameG':
                if (value.length <= 0) {
                    element.focus();
                    const error = $('#errorMessageInstituteDiv');
                    error.css('display', 'block').text('');
                    errorMessage.text("Please Enter Institute Name of Class 12");
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageFirstNameDiv').css('display', '');
                }
                break;

            case 'Email':
                if (!validateEmail(value)) {
                    element.focus();
                    const error = $('#errorMessageDisplayBox');
                    error.css('display', 'block').text('');
                    errorMessage.text('Please enter a valid Email Address.');
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageDisplayBox').css('display', '');
                }
                break;

            case 'Password':
                if (!validatePassword(value)) {
                    element.focus();
                    const error = $('#errorMessagePasswordDiv');
                    error.css('display', 'block').text('');
                    errorMessage.text('Please enter a valid Password.');
                    error.append(errorMessage);
                }
                else {
                    flag = true;
                    $('#errorMessagePasswordDiv').css('display', '');
                }
                break;

            case 'ConfirmPassword':
                if (!validatePassword(value)) {
                    element.focus();
                    const error = $('#errorMessageConfirmPasswordDiv');
                    error.css('display', 'block').text('');
                    errorMessage.text('Please enter a valid cPassword.');
                    error.append(errorMessage);
                }
                else {
                    flag = true;
                    $('#errorMessageConfirmPasswordDiv').css('display', '');
                }
                break;

            case 'Age':
                if (!validateNumbers(value) || (value.length !== 2)) {
                    console.log('Value:', value);
                    console.log('Length:', value.length);
                    element.focus();
                    const error = $('#errorMessageAgeDiv');
                    error.css('display', 'block').text('');

                    errorMessage.text('Please enter a valid Age of 2 digit');
                    error.append(errorMessage);
                }
                else {
                    flag = true;
                    $('#errorMessageAgeDiv').css('display', '');
                }
                break;

            case 'Phone':
                if (!validateNumbers(value) || (value.length !== 10)) {
                    element.focus();
                    const error = $('#errorMessageContactDiv');
                    error.css('display', 'block').text('');
                    errorMessage.text('Please enter a valid Phone Number of 10 digits.');
                    error.append(errorMessage);
                }
                else {
                    flag = true;
                    $('#errorMessageContactDiv').css('display', '');
                }
                break;

            case 'Aadhar':
                if (!validateNumbers(value) || !(value.length == 12)) {
                    element.focus();
                    const error = $('#errorMessageAadharDiv');
                    error.css('display', 'block').text('');
                    errorMessage.text('Please enter a valid Aadhar Number of 12 digits.');
                    error.append(errorMessage);
                }
                else {
                    flag = true;
                    $('#errorMessageAadharDiv').css('display', '');
                }
                break;

            case 'CurrentPinCode':
                if (!validateNumbers(value) || !(value.length == 6)) {
                    element.focus();
                    const error = $('#errorMessageCurrentPinCodeDiv');
                   error.css('display', 'block').text('');
                    errorMessage.text('Please enter a valid PinCode of 6 digit');
                    error.append(errorMessage);
                }
                else {
                    flag = true;
                    $('#errorMessageCurrentPinCodeDiv').css('display', '');
                }
                break;

            case 'PermanentPinCode':
                if (!validateNumbers(value) || !(value.length == 6)) {
                    element.focus();
                    const error = $('#errorMessagePermanentPinCodeDiv');
                   error.css('display', 'block').text('');

                    errorMessage.text('Please enter a valid PinCode of 6 digit');
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessagePermanentPinCodeDiv').css('display', '');
                }
                break;

            case 'YOP10':
                if (!validateNumbers(value) && !(value.length == 4)) {
                    element.focus();
                    const error = $('#errorMessageYOP10Div');
                   error.css('display', 'block').text('');

                    errorMessage.text('Please enter a valid YOP of 4 digit');
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageYOP10Div').css('display', '');
                }
                break;

            case 'Aggregate10':
                if (!validateAggregate(value)) {
                    element.focus();
                    const error = $('#errorMessageAggregate10Div');
                   error.css('display', 'block').text('');

                    errorMessage.text('Please enter a valid Aggregrate');
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageAggregate10Div').css('display', '');
                }
                break;

            case 'YOP12':
                if (!validateNumbers(value) && !(value.length == 4)) {
                    element.focus();
                    const error = $('#errorMessageYOP12Div');
                   error.css('display', 'block').text('');
                    errorMessage.text('Please enter a valid YOP of 4 digit');
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageYOP12Div').css('display', '');
                }
                break;

            case 'Aggregate12':
                if (!validateAggregate(value)) {
                    element.focus();
                    const error = $('#errorMessageAggregate12Div');
                    errorMessage.text('Please enter a valid Aggregrate');
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageAggregate12Div').css('display', '');
                }
                break;

            case 'AggregateG':
                if (!validateAggregate(value)) {
                    element.focus();
                    const error = $('#errorMessageAggregateGDiv');
                   error.css('display', 'block').text('');
                    errorMessage.text('Please enter a Aggregrate');
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageAggregateGDiv').css('display', '');
                }
                break;

            case 'YOPG':
                if (!validateNumbers(value) && !(value.length == 4)) {
                    element.focus();
                    const error = $('#errorMessageYOPGDiv');
                   error.css('display', 'block').text('');
                    errorMessage.text('Please enter a valid YOP of 4 digit');
                    error.append(errorMessage);
                } else {
                    flag = true;
                    $('#errorMessageYOPGDiv').css('display', '');
                }
                break;

            default:
                break;
        }
        data[element.data('store')] = value;

        if (!flag) {
            allFlagsTrue = false;
        }


    });

    // if (allFlagsTrue) {
    //     alert("good data");
    //    return data;
    // } else {
    //     console.log('Validation failed. Data not submitted.');
    //     alert("bad data");
    //     return null;
    // }
    return data;
}


function storeData(data) {
    $.each(data, function (key, value) {
        if(data[key] === ""){
            localStorage.setItem(key, "NA");
        }
        else
        localStorage.setItem(key, data[key]);
    });
}

function removeErrorMessages() {
    $('.error-message').remove();
}

function updateStates(countryDropdownId, stateDropdownId) {

    var selectedCountry = $('#' + countryDropdownId).val();
    var stateDropdown = $('#' + stateDropdownId);
    
    stateDropdown.html('<option value="" disabled selected>Select State</option>');

  
    var states = {
        india: ['Delhi', 'Kolkata', 'Mumbai', 'Odisha'],
        canada: ['Ontario', 'British Columbia', 'Alberta', 'Quebec'],
        unitedKingdom: ['England', 'Scotland', 'Wales', 'Northern Ireland'],
        australia: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia']
    };

    if (selectedCountry in states) {
        $.each(states[selectedCountry], function (index, state) {
            var option = $('<option></option>').val(state.toLowerCase()).text(state);
            stateDropdown.append(option);
        });
    }
}

function copyAddress() {

    var sameAddressCheckbox = $('#sameAsCurrent');
    var permanentAddress1 = $('#p1Address');
    var permanentAddress2 = $('#p2Address');
    var permanentPincode = $('#pPinCode');
    var permanentCountry = $('#pCountry');
    var permanentState = $('#pState');

    if (sameAddressCheckbox.prop('checked')) {
        var currentAddress1 = $('#c1address').val();
        var currentAddress2 = $('#c2Address').val();
        var currentPincode = $('#cPinCode').val();
        var currentCountry = $('#cCountry').val();
        var currentState = $('#cState').val();

        permanentAddress1.val(currentAddress1).prop('readonly', true);
        permanentAddress2.val(currentAddress2).prop('readonly', true);
        permanentPincode.val(currentPincode).prop('readonly', true);
        permanentCountry.val(currentCountry).prop('readonly', true);
        updateStates(('cCountry'),('pState'));
        permanentState.val(currentState).prop('readonly', true);
    } else {
        permanentAddress1.prop('readonly', false);
        permanentAddress2.prop('readonly', false);
        permanentPincode.prop('readonly', false);
        permanentCountry.prop('readonly', false);
        permanentState.prop('readonly', false);
    }
}



function validateEmail(verifyEmail) {
    var mailPattern = /^[a-z]*[A-Z]*[@][a-z]*[.][a-x]{3}/;

    return mailPattern.test(verifyEmail) ? true : false;
}

function validatePassword(parameter) {
    let verifyPassword = parameter;
    var vpass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%])[A-Za-z\d@#$%]{8,15}$/;
    return vpass.test(verifyPassword) && verifyPassword.val() >= 8 && verifyPassword.val() <= 15;
}

function validateNumbers(parameter) {
    let verifyParameter = parameter;
    var numbers = /^[0-9]+$/;
    return numbers.test(verifyParameter);
}

function validateAlphaNumeric(parameter) {
    var letters = /^[0-9a-zA-Z]+$/;
    let verifyParameter = parameter;
    return letters.test(verifyParameter);
}

function validateAggregate(parameter) {
    var compare = /[0-9]+[.]*[0-9]*/;
    let verifyParameter = parameter;
    return compare.test(verifyParameter);
}