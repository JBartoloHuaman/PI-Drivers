function validation({name,lastname,nacionality,image,description,birthdate}){
    const onlyLetters = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$/;
    const url = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const imageurl = /\.(jpg|jpeg|png|gif)$/i;
    const errors={}
    if(name.length<5) errors.name= "Must be at least 5 characters"
    if(!name.length) errors.name = "missing data"
    if(lastname.length<5) errors.lastname= "Must be at least 5 characters"
    if(!lastname.length) errors.lastname = "missing data"
    if(description.length<5) errors.description= "Must be at least 5 characters"
    if(!description.length) errors.description = "missing data"
    if(!birthdate.length) errors.birthdate = "missing data"
    if(nacionality.length<5) errors.nationality= "Must be at least 5 characters"
    if(!nacionality.length) errors.nationality = "missing data"

    if(!onlyLetters.test(name)) errors.name = "numbers are not allowed"
    if(!onlyLetters.test(lastname)) errors.lastname = "numbers are not allowed"
    if(!onlyLetters.test(nacionality)) errors.nationality = "numbers are not allowed"
    if(!url.test(image) || !imageurl.test(image)) errors.image = "must be the URL of an image"
   
   
    
    return errors;
    }

export default validation;
