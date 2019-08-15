/** 
 * Handle many connected html layers and display only the last.
 * 
 * @param {string} rootId the root id to add the layers
 * @return the function module for handle layers in the root. It take two parameters : a html string (a layer) and a timeTolive (example : to remove this layer after x millisecond)
 */

export default function graphicsLayers(rootId){
    //Contain all layers (HTML node)
    let layers = []

    //The root to display the layers
    let root = document.getElementById(rootId)

    //Remove layer in [timeTolive] millisecond
    //Then display the last layer
    function handleTimeTolive(timeTolive, layer){
        setTimeout(() => {
            //Remove the layer
            layers = layers.filter(l => l !== layer)
            layer.remove()

            //Display the last layer
            if(layers.length)
                layers[layers.length - 1].style.visibility = 'visible'

        }, timeTolive)
    }

    /**
     * @param {string} html the html string to display
     * @param {object} options options for display (example remove layout after x millisecond)
     */
    return function addLayerHtml(html, timeTolive){
        //create a new layer with the html string parameter
        let layer = document.createElement('div')
        layer.style.position = 'absolute'
        layer.innerHTML = html

        //Hidden the last layer
        if(layers.length)
            layers[layers.length - 1].style.visibility = 'hidden'

        //Add the new layer in last position
        layers.push(layer)

        //Display the new layer
        root.appendChild(layer)

        //Handle timeTolive (example: remove layer in x millisecond)
        if(timeTolive)
            handleTimeTolive(timeTolive, layer)
    }
}