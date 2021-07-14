/* eslint-disable */
/**
 * Trust All Scripts
 *
 * This is a dirty little script for iterating over script tags
 * of your Ghost posts and adding them to the document head.
 *
 * This works for any script that then injects content into the page
 * via ids/classnames etc.
 *
 */
//css
require('./src/assets/css/bootstrap.min.css')
// require("./src/assets/scss/paper-kit.scss?v=1.2.0")
require('./src/assets/demo/demo.css?v=1.2.0')
var trustAllScripts = function () {
    var scriptNodes = document.querySelectorAll('.load-external-scripts script')

    for (var i = 0; i < scriptNodes.length; i += 1) {
        var node = scriptNodes[i]
        var s = document.createElement('script')
        s.type = node.type || 'text/javascript'

        if (node.attributes.src) {
            s.src = node.attributes.src.value
        } else {
            s.innerHTML = node.innerHTML
        }

        document.getElementsByTagName('head')[0].appendChild(s)
    }
}

exports.shouldUpdateScroll = ({
    routerProps: { location },
    getSavedScrollPosition,
}) => {
    const { pathname } = location
    // list of routes for the scroll-to-top-hook
    const scrollToTopRoutes = [`/`, `/blog`, `/habitify`]
    // if the new route is part of the list above, scroll to top (0, 0)
    if (scrollToTopRoutes.indexOf(pathname) !== -1) {
        window.scrollTo(0, 0)
    }

    return false
}

exports.onRouteUpdate = function () {
    trustAllScripts()
}

exports.onInitialClientRender = () => {
    // setTimeout(function () {
    document.getElementById('___loader').style.display = 'none'
    // }, 10000)
}
