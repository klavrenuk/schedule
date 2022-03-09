const validationItem = (options, item) => {
    if(!item) {
        return {
            value: false,
            message: 'Bad request'
        }
    }

    let value = true,
        message = null;

    for(let option of options) {
        console.log(option);
        if(!item[option.prop] || item[option.prop] === null) {
            value = false;
            message = `Option ${option.prop} is required`;
            break;
        }

        switch(option.type) {
            case 'String':
                if(item[option.prop].trim() === '') {
                    value = false;
                }
                break;

            case 'Number':
                if(isNaN(item[option.prop])) {
                    value = false;
                }
                break;
        }

        if(!value) {
            message = `Please, fill option '${option.prop}' correct`;
            break;
        }
    }

    return {
        value: value,
        message: message
    }
}

const isObject = (obj) => {
    if(typeof obj == 'object' && !Array.isArray(obj) && obj !== null) {
        return true;
    } else {
        return false;
    }
}


module.exports = {validationItem, isObject};