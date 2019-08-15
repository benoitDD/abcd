import graphicsLayers from './graphicsLayers'
import mappingTemplate from './mappingTemplate'

/**
 * 
 * @param {String} rootId the root id to add the layers
 * @param {String} mustacheTemplate the mustache template
 * @return the function module for handle a entering data
 */
export default function engine(rootId, mustacheTemplate){
    let graphicHandler = graphicsLayers(rootId)
    let mappingHandler = mappingTemplate(mustacheTemplate)

    return function handle(data, timeTolive){
        let html = mappingHandler(data, timeTolive)
        graphicHandler(html, timeTolive)
    }
}