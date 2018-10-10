/**
 * @fileoverview
 * Frameless jQuery:
 * https://gist.github.com/vmysla/00806f5c98b51857ee36
 * @example
 * ```js
    var container = document.querySelector('body');
    var html = '<h1>Timestamp <script>document.write( Date.now() );</script></h1>';

    function logFrameEvent(frame, eventName) {
        console.log(
            'eventName', eventName, 
            'frame.resolved' , frame.resolved, 
            'document.body'  , frame.document && frame.document.body 
        );
    }

    var listeners = {
        'onBeforeAppend': logFrameEvent,
        'onAfterAppend' : logFrameEvent,
        'onBeforePopulate': logFrameEvent,
        'onAfterPopulate': logFrameEvent
    };
    ```
 */

// Capture the scope for exporting modules.
var outside = (function () {
    if(typeof module === 'object' && module.exports) {
        return module;
    }

    if(typeof window === 'object') {
        return window;
    }

    return this;
})();

outside.iframer = iframer;

/**
 * @function iframer
 * @returns {void}
 */
function iframer(container, html, listeners, domain) {
    /**
     * @type object
     */
    var frame = {
        container: container || document.body,
        html: html || '',
        listeners: listeners || {},
        domain: domain || document.domain,

        element: document.createElement('iframe'),
        resolved: false,
        document: false,
        window: false
    };

    iframer.append(frame);
    if(iframer.resolve(frame)) {
        iframer.populate(frame);
    } else {
        iframer.populate(frame, document.domain);
    }
}

/**
 * @function append
 * @name iframer.append
 * @returns {void}
 */
iframer.append = function(frame) {
    iframer.trigger(frame, 'onBeforeAppend');
    frame.container.appendChild(frame.element);
    iframer.trigger(frame, 'onAfterAppend');
};

/**
 * @function populate
 * @name iframer.populate
 * @returns {void}
 */
iframer.populate = function(frame, domain) {
    if (domain) {
        frame.element.populate = iframer.populate;
        frame.element.src =
            'javascript:(document.open().domain="' +
            domain +
            '") && frameElement.populate(frameElement)';
    } else {
        iframer.resolve(frame);
        iframer.trigger(frame, 'onBeforePopulate');
        frame.element.frameElement = frame.element;
        frame.document.write(frame.html);
        frame.document.close();
        iframer.trigger(frame, 'onAfterPopulate');
    }
};

/**
 * @function trigger
 * @name iframer.trigger
 * @returns {boolean}
 */
iframer.trigger = function(frame, eventName) {
    var handler = frame.listeners[eventName];
    return handler && handler(frame, eventName);
};

/**
 * @function resolve
 * @name iframer.resolve
 * @returns {!boolean}
 */
iframer.resolve = function(frame) {
    try {
        frame.window = frame.element.contentWindow;
        frame.document =
            frame.element.contentDocument ||
            (frame.window && frame.window.document);
    } catch (ex) {}
    return (frame.resolved = !!(frame.window && frame.document));
};
