import {createGUI} from './helpers.mjs';

const supportedMethods = ['get', 'post', 'put', 'patch', 'delete']

const body = document.body;

body.appendChild(createGUI(supportedMethods));

// const config = {
//     'tagName': 'button',
//     'tagText': 'ala ma kota',
//     'tagClass': 'send',
//     'tagId': 'send',
//     'tagAttr': {
//         'key': 'placeholder',
//         'val': 'endpoint'
//     },
//     'tagEvent': {
//         'type': 'click',
//         'cb': () => {
//             console.log('text');
//         }
//     }

// }

// const methodList = document.querySelector('#methods');
// const endpoint = document.querySelector('#endpoint');
// const sendBtn = document.querySelector('#send');





