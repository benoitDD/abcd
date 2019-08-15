import Mustache from 'mustache'

/**
 * 
 * @param {String} mustacheTemplate the mustache template
 * @return the function module for mapping each data in template. It take two parameters : the data and the timeTolive (example : to remove this data after x millisecond)
 */
export default function mappingTemplate(mustacheTemplate){
    let arrayData = []

    //Override the current data with the latest data
    function overrideData(data){
        if(!arrayData.length)
            return data

        return {...arrayData[arrayData.length - 1], ...data}
    }

    //Set time to live for the data
    function setTimeToLiveForData(data, timeTolive){
        setTimeout(() => {
            //Remove the data
            arrayData = arrayData.filter(d => d !== data)

        }, timeTolive)
    }

    return function render(data, timeTolive){
        //Override the data
        let dataOveride = overrideData(data)

        //Add in last position
        arrayData.push(dataOveride)

        //set time to live for data
        if(timeTolive)
            setTimeToLiveForData(dataOveride, timeTolive)

        //Render template with the data
        return Mustache.render(mustacheTemplate, dataOveride)
    }
}