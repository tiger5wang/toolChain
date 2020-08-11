let currentToken = null;
let currentAttribute = null;

let stack;
let currentTextNode = null;

function emit(token){
    let top = stack[stack.length - 1];

    if(token.type == "startTag") {
        let element = {
            type: "element",
            children: [],
            attributes: []
        };

        element.tagName = token.tagName;

        for(let p in token) {
            if(p != "type" || p != "tagName")
                console.log('1111111111111111', p)
                element.attributes.push({
                    name: p,
                    value: token[p]
                });
        }

        top.children.push(element);

        if(!token.isSelfClosing)
            stack.push(element);

        currentTextNode = null;
        
    } else if(token.type == "endTag") {
        if(top.tagName != token.tagName) {
            throw new Error("Tag start end doesn't match!");
        } else {
            stack.pop();
        }
        currentTextNode = null;
    }  else if(token.type == "text") {
        if(currentTextNode == null) {
            currentTextNode = {
                type: "text",
                content: ""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

const EOF = Symbol("EOF");

function data(c){
    if(c == "<") {
        return tagOpen;
    } else if( c == EOF) {
        emit({
            type:"EOF"
        });
        return;
    } else {
        emit({
            type:"text",
            content:c
        });
        return data;
    }
}

function tagOpen(c){
    if(c == "/") {
		currentToken = {
			type: "endTag",
			tagName : ""
		};
        return endTagOpen;
    } else if(c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName : ""
        }
        return tagName(c);
    } else {
        emit({
            type: "text",
            content : '<'
        });
        emit({
            type: "text",
            content : c
        });
        return data;
    }
}

// 处理标签名状态
function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if(c == "/") {
        return selfClosingStartTag;
    } else if(c.match(/^[A-Z]$/)) {
        currentToken.tagName += c.toLowerCase();   //.toLowerCase();
        return tagName;
    } else if(c == ">") {
        emit(currentToken);
        return data;
    } else {
        currentToken.tagName += c;
        return tagName;
    }
}

// 属性名开始前的状态
function beforeAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if(c == "/" || c == ">") {
        return afterAttributeName(c);
    } else {
        currentAttribute = {
            name: "",
            value: ""
        };
        return attributeName(c);
    }
}

// 校验属性名状态
function attributeName(c) {
    //console.log(currentAttribute);
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" ) {
        return afterAttributeName(c);
    } else if(c == "=") {
        return beforeAttributeValue;
    } else {
        currentAttribute.name += c;
        return attributeName;
    }
    // else if(c == "\u0000") {
    //
    // } else if(c == "\"" || c == "'" || c == "<") {
    //
    // }
}

// 属性名结束后状态
function afterAttributeName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if(c == "/") {
        return selfClosingStartTag;
    } else if(c == "=") {
        return beforeAttributeValue;
    } else if(c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name : "",
            value : ""
        };
        return attributeName(c);
    }
}

// 属性值开始前的状态
function beforeAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
        return beforeAttributeValue;
    } else if(c == "\"") {
        return doubleQuotedAttributeValue;
    } else if(c == "\'") {
        return singleQuotedAttributeValue;
    } else {
        return UnquotedAttributeValue(c);
    }
}

// 校验双引号属性值
function doubleQuotedAttributeValue(c) {
    if(c == "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else {
        currentAttribute.value += c;
        return doubleQuotedAttributeValue
    }
    // else if(c == "\u0000") {
    //
    // } else if(c == EOF) {
    //
    // }
}

// 校验单引号属性值
function singleQuotedAttributeValue(c) {
    if(c == "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue
    }
    // else if(c == "\u0000") {
    //
    // } else if(c == EOF) {
    //
    // }
}

// 带引号属性值结束后状态
function afterQuotedAttributeValue (c){
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if(c === "/") {
        return selfClosingStartTag;
    } else if(c === ">") {
        console.log('22222222222222222', c)
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }
	// else {
	// 	console.log('currentAttribute', currentAttribute)
	// 	currentAttribute.value += c;
	// 	return doubleQuotedAttributeValue
	// }
}


function UnquotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if(c == "/") {
        // console.log('currentAttribute', currentAttribute)
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if(c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else {
        currentAttribute.value += c;
        return UnquotedAttributeValue
    }
    // else if(c == "\u0000") {
    //
    // } else if(c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {
    //
    // } else if(c == EOF) {
    //
    // }
}

// 自封闭标签
function selfClosingStartTag(c){
    if( c == ">") {
        console.log('333333333333333333', c)
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    }
}

// 结束标签
function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)) {
        return tagName(c);
    }
}


module.exports.parseHTML = function parseHTML(html){
    let state = data;
    stack =  [{type: "document", children:[]}];
    for(let c of html) {
        state = state(c);
        // if(stack[stack.length - 1].tagName === "script" && state == data) {
        //     state = scriptData;
        // }
    }
    state = state(EOF);
    return stack[0];
}