describe('hooks 测试', function () {
    before(function () {
        // 在本区块的 所有 测试用例 之前 执行
        console.log('before')
    });
    after(function () {
        // 在本区块的 所有 测试用例 之后 执行
        console.log('after')
    });
    beforeEach(function () {
        // 在本区块的 每个 测试用例 之前 执行
        console.log('beforeEach')
    });
    afterEach(function () {
        // 在本区块的 每个 测试用例 之后 执行
        console.log('afterEach')
    })

    it('测试用例一 ', function () {
        console.log('用例一 执行')
    });
    it('测试用例二 ', function () {
        console.log('用例二 执行')
    });
});