import {parseHTML}  from '../src/parser';
let assert = require('assert');

// 单独一个元素
it('parse a single element', function () {
    let doc = parseHTML('<div></div>');
    // console.log(doc)
    let div = doc.children[0];
    // console.log(div)
    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 2);
});

// 包含内容的元素
it('parse a single element with content', function () {
    let doc = parseHTML('<div>hello world</div>');
    // console.log(doc)
    let text = doc.children[0].children[0];
    // console.log(text)
    assert.equal(text.type, 'text');
    assert.equal(text.content, 'hello world');
});

// 开始结束标签对应不上
it('tag dissmatch', function () {
    try {
        let doc = parseHTML(`<div></dib>`);
    } catch (e) {
        assert.equal(e.message, "Tag start end doesn't match!");
    }
});

// 内容中包含 <
it('content with < ', function () {
	let doc = parseHTML('<div>a < b</div>');
	// console.log(doc)
	let text = doc.children[0].children[0];
	// console.log(text)
	assert.equal(text.type, 'text');
	assert.equal(text.content, 'a < b');
});

// 元素属性，及属性间有空格，制表符，换行等符号, 等号 = 前后有空格、制表符等
it('with attributes ', function () {
    let doc = parseHTML('<div id =a  class=     "cls"     data=\'abc\' ' +
        'changeLine="11"></div>');
	let div = doc.children[0];
	
	let count = 0;
	for(let attr of div.attributes) {
	    if(attr.name === 'id') {
	        count++;
			assert.equal(attr.value, 'a');
		}
		if(attr.name === 'class') {
	        count++;
			assert.equal(attr.value, 'cls');
		}
		if(attr.name === 'data') {
	        count++;
			assert.equal(attr.value, 'abc');
		}
		if(attr.name === 'changeLine') {
			count++;
			assert.equal(attr.value, '11');
		}
    }
    assert.ok(count === 4)
});

// 最后一个属性后面有空格，制表符等
it('last attributes with char ', function () {
	let doc = parseHTML('<div id=a  class="cls"     data=\'abc\' ' +
		'changeLine="11"    ></div>');
	let div = doc.children[0];
	
	let count = 0;
	for(let attr of div.attributes) {
		if(attr.name === 'id') {
			count++;
			assert.equal(attr.value, 'a');
		}
		if(attr.name === 'class') {
			count++;
			assert.equal(attr.value, 'cls');
		}
		if(attr.name === 'data') {
			count++;
			assert.equal(attr.value, 'abc');
		}
		if(attr.name === 'changeLine') {
			count++;
			assert.equal(attr.value, '11');
		}
	}
	assert.ok(count === 4)
});

// 只有属性名，没有属性值,及属性名后有空格，制表符等
it('only has attribute name ', function () {
	let doc = parseHTML('<div datas ></div>');
	let div = doc.children[0];
	// console.log(div)
	let count = 0;
	for(let attr of div.attributes) {
		if(attr.name === 'datas') {
			count++;
			assert.equal(attr.value, '');
		}
	}
	assert.ok(count === 1)
});

// 一个单独的属性名后面还有其他属性
it('after attribute name has other attribute', function () {
	let doc = parseHTML(`<div datas id='bb'></div>`);
	let div = doc.children[0];
	// console.log(div)
	let count = 0;
	for(let attr of div.attributes) {
		if(attr.name === 'datas') {
			count++;
			assert.equal(attr.value, '');
		}
		if(attr.name === 'id') {
			count++;
			assert.equal(attr.value, 'bb');
		}
	}
	assert.ok(count === 2)
});

// 属性值不带引号的属性作为最后一个属性
it('UnquotedAttributeValue is the last attribute ', function () {
	let doc = parseHTML(`<div datas=c></div>`);
	let div = doc.children[0];
	// console.log(div)
	let count = 0;
	for(let attr of div.attributes) {
		if(attr.name === 'datas') {
			count++;
			assert.equal(attr.value, 'c');
		}
	}
	assert.ok(count === 1)
});

// 自封闭元素
it('parse a selfClosingTag element with attributes', function () {
	let doc = parseHTML('<div/>');
	let div = doc.children[0];
	
	assert.equal(div.tagName, 'div')
});

// 自封闭元素包含属性，属性间有空格，制表符，换行等符号
it('parse a selfClosingTag element with attributes', function () {
	let doc = parseHTML('<div  id=a  class="cls"     data=\'abc\' ' +
		'changeLine="11"/>');
    let div = doc.children[0];
	
	let count = 0;
	for(let attr of div.attributes) {
		if(attr.name === 'id') {
			count++;
			assert.equal(attr.value, 'a');
		}
		if(attr.name === 'class') {
			count++;
			assert.equal(attr.value, 'cls');
		}
		if(attr.name === 'data') {
			count++;
			assert.equal(attr.value, 'abc');
		}
		if(attr.name === 'changeLine') {
			count++;
			assert.equal(attr.value, '11');
		}
	}
	assert.ok(count === 4)
});

// 自封闭元素 最后一个属性后面有空格，制表符等
it('parse a selfClosingTag element last attributes with char', function () {
	let doc = parseHTML('<div  id=a  class="cls"     data=\'abc\' ' +
		'changeLine="11"     />');
	let div = doc.children[0];
	
	let count = 0;
	for(let attr of div.attributes) {
		if(attr.name === 'id') {
			count++;
			assert.equal(attr.value, 'a');
		}
		if(attr.name === 'class') {
			count++;
			assert.equal(attr.value, 'cls');
		}
		if(attr.name === 'data') {
			count++;
			assert.equal(attr.value, 'abc');
		}
		if(attr.name === 'changeLine') {
			count++;
			assert.equal(attr.value, '11');
		}
	}
	assert.ok(count === 4)
});

// 自封闭 元素 属性值不带引号的属性作为最后一个属性
it('UnquotedAttributeValue is the last attribute ', function () {
	let doc = parseHTML(`<div datas=c/>`);
	let div = doc.children[0];
	// console.log(div)
	let count = 0;
	for(let attr of div.attributes) {
		if(attr.name === 'datas') {
			count++;
			assert.equal(attr.value, 'c');
		}
	}
	assert.ok(count === 1)
});

// 元素名包含大写字母
it('element with uppercaseWord ', function () {
    let doc = parseHTML('<diV></diV>');
	let div = doc.children[0];
	
	assert.equal(div.tagName, 'div')
});


//
// it('with property2', function () {
//     try {
//         let doc = parseHTML('<div id="a" class="cls" data=\"abc\"></div>');
//         let div = doc.children[0];
//         // console.log(text)
//
//         for (let attr of div.attributes) {
//             if (attr.name === 'id') {
//                 assert.equal(attr.value, 'a');
//                 return
//             }
//             if (attr.name === 'class') {
//                 assert.equal(attr.value, 'cls');
//                 return
//             }
//             if (attr.name === 'data') {
//                 assert.equal(attr.value, 'abc');
//                 return
//             }
//         }
//         assert.ok(false)
//     } catch (e) {
//         console.log(e);
//         assert.equal(e.message, 'Tag start end doesn`t match');
//     }
// });
//
// it('with property3', function () {
//     try {
//         let doc = parseHTML('<div id="a" class="cls" data=\"abc\"></div>');
//         let div = doc.children[0];
//         // console.log(text)
//
//         for (let attr of div.attributes) {
//             if (attr.name === 'id') {
//                 assert.equal(attr.value, 'a');
//                 return
//             }
//             if (attr.name === 'class') {
//                 assert.equal(attr.value, 'cls');
//                 return
//             }
//             if (attr.name === 'data') {
//                 assert.equal(attr.value, 'abc');
//                 return
//             }
//         }
//         assert.ok(false)
//     } catch (e) {
//         console.log(e);
//         assert.equal(e.message, 'Tag start end doesn`t match');
//     }
// });
//
// it('with script', function () {
//     try {
//         let content = ``
//         let doc = parseHTML(`<script>
// <div>aaa</div>
// <span>bbb</span>
// <p>ccc</p>
// /script>
// <
// </
// <s
// <sc
// <scr
// <scri
// <scrip
// <script
// </script>`);
//         let text = doc.children[0].children[0]
//         // assert.equal(text.type, 'text');
//         // assert.equal(text.content, 'a < b');
//
//     } catch (e) {
//         console.log(e);
//         assert.equal(e.message, 'Tag start end doesn`t match');
//     }
// });
//
// it('attribute with no value', function () {
//     try {
//         let doc = parseHTML('<div class></div>');
//         let div = doc.children[0];
//         // console.log(text)
//
//     } catch (e) {
//         console.log(e);
//         assert.equal(e.message, 'Tag start end doesn`t match');
//     }
// });