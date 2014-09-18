/* jshint -W030 */
    describe('First Test', function() {
      beforeEach(function() {

      });

      afterEach(function() {

      });

      it('should fail to show failing test', function() {
        expect(true).to.be.ok;
        expect(1).to.be.ok;
        expect(0).not.to.be.ok;
      });
    });