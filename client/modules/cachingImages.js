/**
 * Load all images for set them in cache
 * @param {Array.String} arraySrc a array of image source
 * @return {Promise} promise call when all image are loaded
 */
export default function(arraySrc){
    return new Promise((resolve) => {
        arraySrc.forEach((src, index) => {
            let img = new Image()
            img.onload = function() {
                if(index + 1 === arraySrc.length)
                    resolve()
            }
            img.src = src
        })
    })
}