import engine from './modules/engine'
import cachingImages from './modules/cachingImages'

let handler = engine('content',
`
<p
{{#next}}
class = "thrill"
{{/next}}
>
    {{logo.name}}
</p>
{{#next}}
    <div>{{title}}</div>
    <div>{{line_1}}</div>
    {{#line_2}}
    <div>{{line_2}}</div>
        {{#line_3}}
    <div>{{line_3}}</div>
        {{/line_3}}
        {{#after}}
            <div>After: {{text}}</div>
        {{/after}}
    {{/line_2}}
{{/next}}
`)

let requestLogo = {
    logo: {
        name: 'Eurosport 1'
    }
}, requestNext = {
    next: {
        title: 'This night',
        line_1: 'rugby',
        line_2: 'football',
        line_3: 'hanball'
    }
}, requestAfter = {
    after: {
        text: 'Hello'
    }
}

const liveNext = 5000, liveAfter = 2000

cachingImages(['/public/en.png', '/public/fr.png'])
.then(() => {
    handler(requestLogo)

    setTimeout(() => {
        handler(requestNext, liveNext)
        setTimeout(() => {
            handler(requestAfter, liveAfter)
            setTimeout(() => {
                handler(requestAfter, 5000)
            }, 10000)
        }, 2000)
    }, 2000)
})