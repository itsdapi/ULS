// src/utils/xhr.ts
let XMLHttpRequestNode: any;

if (typeof window === 'undefined') {
    // We're in Node.js
    const { XMLHttpRequest: NodeXMLHttpRequest } = require('xmlhttprequest');
    XMLHttpRequestNode = NodeXMLHttpRequest;
} else {
    // We're in a browser
    XMLHttpRequestNode = XMLHttpRequest;
}

/**
 * Creates a cross-platform XMLHttpRequest instance that works in both Node.js and browser environments
 * @returns XMLHttpRequest instance
 */
export function createXHR(): XMLHttpRequest {
    return new XMLHttpRequestNode();
}

/**
 * The cross-platform XMLHttpRequest constructor
 */
export { XMLHttpRequestNode as XMLHttpRequest };