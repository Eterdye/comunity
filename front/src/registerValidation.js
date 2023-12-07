const stringWithSpaceValidation = /^[a-zA-Z]+\s?[a-zA-Z]+$/
const numberValidation = /^[0-9]{7,12}$/
const genderValidation = /^[h|m]{1}$/i 

function validate ({name,lastname,ci,gender}) {
    return Boolean(name && stringWithSpaceValidation.test(name)
        && lastname && stringWithSpaceValidation.test(lastname)
        && ci && numberValidation.test(parseInt(ci))
        && gender && genderValidation.test(gender) )
}


export default validate


