var assert = require('assert');
// const {add} = require('../src/add');
import { add } from '../src/add'


describe('add', function () {
    it('add(3,4) will be 7', function () {
        assert.equal(add(3,4), 7);
    });
});

// describe('add', function () {
//     it('add(5,8) will be 13', function () {
//         assert.equal(add(5,8), 13);
//     });
// });

