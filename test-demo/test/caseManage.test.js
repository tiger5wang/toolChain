const assert = require('assert');

// describe('only 测试', function () {
//     describe('测试套件一：', function () {
//         it.only('should 1+1=2', function () {
//             assert.equal(1+1, 2)
//         });
//         it('should 2+2 = 4', function () {
//             assert.equal(2+2, 4)
//         });
//     });
//
//     describe.only('测试套件二：', function () {
//         it('用例 一 ', function () {
//
//         });
//         it.only('用例 二 ', function () {
//
//         });
//     })
// })


describe('skip 测试', function () {
    it.skip('用例 一', function () {
        console.log('11111111111')
        assert.equal(1+1, 2)
    });
    it('用例 二', function () {
        assert.equal(2+2, 4)
    });
})
