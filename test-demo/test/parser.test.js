import {parseHTML}  from '../src/parser';
import {add} from "../src/add";
let assert = require('assert');

it('should return -1 when ', function () {
    let doc = parseHTML('<div></div>');
    // console.log(doc)
    let div = doc.children[0];
    // console.log(div)
    assert.equal(div.tagName, 'div');
    assert.equal(div.children.length, 0);
    assert.equal(div.type, 'element');
    assert.equal(div.attributes.length, 2);
});

it('should return -1 when ', function () {
    let doc = parseHTML('<div>hello world</div>');
    console.log(doc)
    let text = doc.children[0].children[0];
    console.log(text)
    assert.equal(text.type, 'text');
    assert.equal(text.content, 'hello world');
});

it('tag mismatch', function () {
    try {
        let doc = parseHTML('<div></div>');
    } catch (e) {
        console.log(e);
        assert.equal(e.message, 'Tag start end doesn`t match');
    }
});

it('text with <', function () {
    try {
        let doc = parseHTML('<div>a < b</div>');
        let text = doc.children[0].children[0];
        // console.log(text)
        assert.equal(text.type, 'text');
        assert.equal(text.content, 'a < b');
    } catch (e) {
        console.log(e);
        assert.equal(e.message, 'Tag start end doesn`t match');
    }
});

it('with property', function () {
    try {
        let doc = parseHTML('<div id="a" class="cls" data=\"abc\" ></div>');
        let div = doc.children[0];
        // console.log(text)

        for (let attr of div.attributes) {
            if (attr.name === 'id') {
                assert.equal(attr.value, 'a');
                return
            }
            if (attr.name === 'class') {
                assert.equal(attr.value, 'cls');
                return
            }
            if (attr.name === 'data') {
                assert.equal(attr.value, 'abc');
                return
            }
        }
        assert.ok(false)
    } catch (e) {
        console.log(e);
        assert.equal(e.message, 'Tag start end doesn`t match');
    }
});

it('with property2', function () {
    try {
        let doc = parseHTML('<div id="a" class="cls" data=\"abc\"></div>');
        let div = doc.children[0];
        // console.log(text)

        for (let attr of div.attributes) {
            if (attr.name === 'id') {
                assert.equal(attr.value, 'a');
                return
            }
            if (attr.name === 'class') {
                assert.equal(attr.value, 'cls');
                return
            }
            if (attr.name === 'data') {
                assert.equal(attr.value, 'abc');
                return
            }
        }
        assert.ok(false)
    } catch (e) {
        console.log(e);
        assert.equal(e.message, 'Tag start end doesn`t match');
    }
});

it('with property3', function () {
    try {
        let doc = parseHTML('<div id="a" class="cls" data=\"abc\"></div>');
        let div = doc.children[0];
        // console.log(text)

        for (let attr of div.attributes) {
            if (attr.name === 'id') {
                assert.equal(attr.value, 'a');
                return
            }
            if (attr.name === 'class') {
                assert.equal(attr.value, 'cls');
                return
            }
            if (attr.name === 'data') {
                assert.equal(attr.value, 'abc');
                return
            }
        }
        assert.ok(false)
    } catch (e) {
        console.log(e);
        assert.equal(e.message, 'Tag start end doesn`t match');
    }
});

it('with script', function () {
    try {
        let content = ``
        let doc = parseHTML(`<script>
<div>aaa</div>
<span>bbb</span>
<p>ccc</p>
/script>
<
</
<s
<sc
<scr
<scri
<scrip
<script
</script>`);
        let text = doc.children[0].children[0]
        // assert.equal(text.type, 'text');
        // assert.equal(text.content, 'a < b');

    } catch (e) {
        console.log(e);
        assert.equal(e.message, 'Tag start end doesn`t match');
    }
});

it('attribute with no value', function () {
    try {
        let doc = parseHTML('<div class></div>');
        let div = doc.children[0];
        // console.log(text)

    } catch (e) {
        console.log(e);
        assert.equal(e.message, 'Tag start end doesn`t match');
    }
});