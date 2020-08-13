const {assert, expect} = chai;

describe('加法函数的测试', function() {
    it('1 加 1 应该等于 2', function() {
        expect(add(1, 1)).to.equal(2)
    });

    it('任何数加0等于自身', function() {
        assert.equal(add(0, 8), 8)
    });
});