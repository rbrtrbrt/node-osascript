var serializeObject = require('../../lib/osa-vargen').serializeObject;


module.exports = {

  parseNumber : function (test) {
    test.expect(3);
    test.equal(serializeObject(1), '1', "Should parse float");
    test.equal(serializeObject(1.2), '1.2', "Should parse scientific syntax");
    test.equal(serializeObject(1e5), '100000', "Should parse int");
    test.done();
  },

  parseBoolean : function (test) {
    test.expect(2);
    test.equal(serializeObject(true) + '', 'true', "true");
    test.equal(serializeObject(false) + '', 'false', "false");
    test.done();
  },

  parseString : function(test){
    test.expect(1);
    test.equal(serializeObject("Hello"), '"Hello"', "Should parse Strings");
    test.done();
  },

  parseArray : function(test){
    test.expect(1);
    test.deepEqual(serializeObject(["this", "is", "an", "array"]), '{"this","is","an","array"}', "Arrays should be parsed");
    test.done();
  },

  parseObject : function(test){
    test.expect(1);
    test.deepEqual(serializeObject({"key" : "value"}), '{key:"value"}');
    test.done();
  },

  parseObjectInArray : function(test){
    test.expect(1);
    test.deepEqual(serializeObject(["this", "is", "an", {"object" : "in"}, "an", "array"]), '{"this","is","an",{object:"in"},"an","array"}', "Nested Object in Array");
    test.done();
  },

  parseNull : function(test){
    test.expect(1);
    test.deepEqual(serializeObject(null),'null');
    test.done();
  },

  parseNullInArray : function(test){
    test.expect(1);
    test.deepEqual(serializeObject(["Array","with a",null]),'{"Array","with a",null}');
    test.done();
  },

  parseUndefinedInArray : function(test){
    test.expect(2);
    test.deepEqual(serializeObject(["Array","with a",undefined]),'{"Array","with a",missing value}');
    test.deepEqual(serializeObject(["Array","with a",,"!!"]),'{"Array","with a",missing value,"!!"}');
    test.done();
  },

  parseNullInObject : function(test){
    test.expect(1);
    test.equal(serializeObject({ field: 11, nullField: null}),'{field:11,nullField:null}');
    test.done();
  },

  parseUndefinedInObject : function(test){
    test.expect(1);
    test.equal(serializeObject({ field: 11, undefField: undefined}),'{field:11,undefField:missing value}');
    test.done();
  }
};
