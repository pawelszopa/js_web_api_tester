import {getMethod, postMethod, deleteMethod, patchMethod, putMethod} from "./methods.mjs";



const createHTMLTag = ({tagName, tagId, tagText, tagClass, tagAttr, tagEvent}) => {
    const node = document.createElement(tagName ? tagName : 'div');
    if (tagId !== undefined){
        node.id = tagId;
    }
    if (tagText !== undefined){
        const nodeText = document.createTextNode(tagText);
        node.appendChild(nodeText);
    }
    if (tagClass !== undefined){
        if (Array.isArray(tagClass)){
            tagClass.forEach(cl => {
                node.classList.add(cl)
            })
        }else{
        node.classList.add(tagClass)
        }
    }

    if (tagAttr !== undefined){
            if (Array.isArray(tagClass)){
                tagAttr.forEach(attr => {
                    node.setAttribute(attr.key, attr.val);
                });
        }else{
        node.setAttribute(tagAttr.key, tagAttr.val)
    }
    }

    if (tagEvent !== undefined){
        node.addEventListener(tagEvent.type, tagEvent.cb)
    }

    return node
}

const sendRequest = (url, method, body, resultTag) => {
    if (url === '') {return false}

    switch (method){
        case "get":
            getMethod(url)
                .then(response => resultTag.innerText = JSON.stringify(response, null, 2))
            break;

        case "post":
            postMethod(url, body)
                .then(response => resultTag.innerText = JSON.stringify(response, null, 2))
            break;
        
        case "delete":
            deleteMethod(url)
            .then(response => resultTag.innerText = JSON.stringify(response, null, 2))
            break;

        case "patch":
            patchMethod(url, body)
                .then(response => resultTag.innerText = JSON.stringify(response, null, 2))
            break;

        case "put":
            putMethod(url, body)
                .then(response => resultTag.innerText = JSON.stringify(response, null, 2))
            break;

    }

    
}
// 15:55 do filmiku przypomniec sobie
const serializeData = () => {
    const inputsARR = [...document.querySelectorAll(".requestBody input")]
    const inputsVal = inputsARR.map(input => input.value)

    const data = {}
    inputsVal.forEach((val, idx, arr) => {
        if (idx % 2 === 0 && val !== ''){
            data[val] = arr[idx + 1];
        } 
    })
    return JSON.stringify(data)
}

const handleButtonRow = (event) => {
    // referencje cod synchroniczny wykona sie przed asynchronicznym
    // kazdy event to obiekt
    // event z buttona  .target zwraca to co wyemitowalo event button
    const row = event.target.parentElement;
    addRow(row);

    // deaktywuje stare add next row
    event.target.removeEventListener('click', handleButtonRow)
    // zmieniamy nazwe na remove line
    event.target.innerText = 'Remove Row';
    event.target.addEventListener('click', () => {
        removeRow(row);
    })
}

// parentElement z button idziemy do parenta (div) appendchild dodaje drugie dziecko
const addRow = row => {row.parentElement.appendChild(createBodyRow())}
//remove usuwa z drzewo dom rzeczy
const removeRow = row => { row.remove() }

const createBodyRow = () => {
    const rowTag = createHTMLTag({'tagClass': 'requestBody'});

    const keyInputTag = createHTMLTag({'tagName': 'input'});

    const valInputTag = createHTMLTag({'tagName': 'input'});

    const button = createHTMLTag({
        'tagName': "button",
        "tagText": "add next row",
        "tagEvent": {
            "type": "click",
            "cb": handleButtonRow
        }
    })
    rowTag.appendChild(keyInputTag);
    rowTag.appendChild(valInputTag);
    rowTag.appendChild(button)

    return rowTag;
};

const handleMethodsChange = (evt, rowData) => {
    
    if (evt.target.value === 'get' || evt.target.value === 'delete'){
        rowData.classList.add('hide');
    }else{
        rowData.classList.remove('hide');
    }
}

// cos tutaj jest nie tak value nei dziala
export const createGUI = supportedMethods => {
    const wrapper = createHTMLTag({})

    const input = createHTMLTag({
        'tagName': 'input',
        'tagId': 'endpoint',
        'tagAttr':[{
            'key': 'value',
            'val': 'http://localhost:3000/posts',
        },
        {
        'key': "type",
        'val':'text'
    }],
    });
    
    const result = createHTMLTag({
        'tagName': 'pre',
    })
    
    const rowWrapper = createHTMLTag({
        "tagClass": ['hide', "dupa"]
    })
    const rowTag = createBodyRow();

    const select = createHTMLTag({
        'tagName': 'select',
        'tagId': 'method',
        'tagAttr':{
            'key': 'name',
            'val': 'methods',
        },
        'tagEvent': {
            'type': 'change',
            'cb': (event) => {handleMethodsChange(event, rowWrapper)}
        }
    });
    
        
    supportedMethods.forEach(method => {
        const option = createHTMLTag({
            'tagName': 'option',
            'tagText': method.toUpperCase(),
            'tagAttr': {
                'key': 'value',
                'val': method,
            }
        });
        select.appendChild(option)
    })

    const btnSend = createHTMLTag({
        'tagName': 'button',
        'tagId': 'send',
        'tagText': 'Send',
        'tagEvent': {
            'type': 'click',
            'cb': ()  => {
                    sendRequest(input.value, select.value, serializeData(), result)
                }
            }
    });
    
  
    rowWrapper.appendChild(rowTag)
    
    wrapper.appendChild(select);
    wrapper.appendChild(input);
    wrapper.appendChild(btnSend);
    wrapper.appendChild(rowWrapper);
    wrapper.appendChild(result);

    

    return wrapper
}