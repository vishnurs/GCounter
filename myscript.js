(function() {
    'use strict';
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            var div, node, container;
            localStorage['mgcounter'] = request.gcount;
            div = document.querySelector('button[value="Search"]');
            div = div.parentElement.parentElement.parentElement.parentElement.parentElement;
            node = document.createElement("div");
            node.setAttribute('id', 'gcounter-sp-container076');
            node.setAttribute('title', 'Google Counter');
            container = document.getElementById('gcounter-sp-container076');
            if(!container) {
                div.appendChild(node);
            } else {
                container.innerHTML = '';
                container.innerHTML = typeof request.gcount === 'undefined' ? 0 : request.gcount;
            }
        }
    );
})()
