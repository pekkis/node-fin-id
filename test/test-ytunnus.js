import { expect } from 'chai';
import fin_id from '../src/';

describe('ytunnus', function(){

	it('.parse() is callable', function(){
		expect(fin_id).to.be.a('object');
		expect(fin_id.ytunnus).to.be.a('object');
		expect(fin_id.ytunnus.parse).to.be.a('function');
	});

	it('.check() is callable', function(){
		expect(fin_id).to.be.a('object');
		expect(fin_id.ytunnus).to.be.a('object');
		expect(fin_id.ytunnus.check).to.be.a('function');
	});

	it('.hasSum() can validate checksums', function(){
		expect( fin_id ).to.be.a('object');
		expect( fin_id.ytunnus ).to.be.a('object');
		expect( fin_id.ytunnus.hasSum ).to.be.a('function');

		expect( fin_id.ytunnus.hasSum('2092540') ).to.equal(false);
		expect( fin_id.ytunnus.hasSum('2256931') ).to.equal(false);
		expect( fin_id.ytunnus.hasSum('0709019') ).to.equal(false);
		expect( fin_id.ytunnus.hasSum( '709019') ).to.equal(false);

		expect( fin_id.ytunnus.hasSum('2092540-6') ).to.equal(true);
		expect( fin_id.ytunnus.hasSum('2256931-0') ).to.equal(true);
		expect( fin_id.ytunnus.hasSum('0709019-2') ).to.equal(true);
		expect( fin_id.ytunnus.hasSum('709019-2') ).to.equal(true);

	});

	it('.withSum() can parse IDs', function(){
		expect( fin_id ).to.be.a('object');
		expect( fin_id.ytunnus ).to.be.a('object');
		expect( fin_id.ytunnus.withSum ).to.be.a('function');

		expect( fin_id.ytunnus.withSum('2092540') ).to.equal('2092540-6');
		expect( fin_id.ytunnus.withSum('2256931') ).to.equal('2256931-0');
		expect( fin_id.ytunnus.withSum('0709019') ).to.equal('0709019-2');
		expect( fin_id.ytunnus.withSum('709019') ).to.equal('0709019-2');

		expect( fin_id.ytunnus.withSum('2092540-6') ).to.equal('2092540-6');
		expect( fin_id.ytunnus.withSum('2256931-0') ).to.equal('2256931-0');
		expect( fin_id.ytunnus.withSum('0709019-2') ).to.equal('0709019-2');
		expect( fin_id.ytunnus.withSum( '709019-2') ).to.equal('0709019-2');

	});

	it('.parse() can parse without checksum', function(){
		expect( fin_id ).to.be.a('object');
		expect( fin_id.ytunnus ).to.be.a('object');
		expect( fin_id.ytunnus.parse ).to.be.a('function');

		expect( fin_id.ytunnus.parse('2092540') ).to.equal('2092540-6');
		expect( fin_id.ytunnus.parse('2256931') ).to.equal('2256931-0');
		expect( fin_id.ytunnus.parse('0709019') ).to.equal('0709019-2');
		expect( fin_id.ytunnus.parse( '709019') ).to.equal('0709019-2');

	});

	it('.parse() can parse with checksum', function(){
		expect( fin_id ).to.be.a('object');
		expect( fin_id.ytunnus ).to.be.a('object');
		expect( fin_id.ytunnus.parse ).to.be.a('function');

		expect( fin_id.ytunnus.parse('2092540-6') ).to.equal('2092540-6');
		expect( fin_id.ytunnus.parse('2256931-0') ).to.equal('2256931-0');
		expect( fin_id.ytunnus.parse('0709019-2') ).to.equal('0709019-2');
		expect( fin_id.ytunnus.parse( '709019-2') ).to.equal('0709019-2');

	});

	it('.check() requires checksum', function(){
		expect( fin_id ).to.be.a('object');
		expect( fin_id.ytunnus ).to.be.a('object');
		expect( fin_id.ytunnus.check ).to.be.a('function');

		expect( fin_id.ytunnus.check('2092540') ).to.equal(false);
		expect( fin_id.ytunnus.check('2256931') ).to.equal(false);
		expect( fin_id.ytunnus.check('0709019') ).to.equal(false);
		expect( fin_id.ytunnus.check( '709019') ).to.equal(false);

	});

	it('.check() accepts valid IDs', function(){
		expect( fin_id ).to.be.a('object');
		expect( fin_id.ytunnus ).to.be.a('object');
		expect( fin_id.ytunnus.check ).to.be.a('function');
		expect( fin_id.ytunnus.check('2092540-6') ).to.equal(true);
		expect( fin_id.ytunnus.check('2256931-0') ).to.equal(true);
		expect( fin_id.ytunnus.check('0709019-2') ).to.equal(true);
		expect( fin_id.ytunnus.check( '709019-2') ).to.equal(true);
	});

	it('.check() rejects invalid IDs', function(){
		expect( fin_id ).to.be.a('object');
		expect( fin_id.ytunnus ).to.be.a('object');
		expect( fin_id.ytunnus.check ).to.be.a('function');
		expect( fin_id.ytunnus.check('2092540-4') ).to.equal(false);
		expect( fin_id.ytunnus.check('2256931-7') ).to.equal(false);
		expect( fin_id.ytunnus.check('0709019-3') ).to.equal(false);
		expect( fin_id.ytunnus.check( '709019-5') ).to.equal(false);
	});

});
