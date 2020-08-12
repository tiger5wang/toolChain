var assert = require('assert');
const fetch = require("node-fetch");


it('测试应该5000毫秒后结束', function(done) {
    var x = true;
    var f = function() {
        x = false;
        assert.equal(x, false)
        done(); // 通知Mocha测试结束
    };
    // f()
    setTimeout(f, 1000);
});

