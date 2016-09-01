import { expect } from 'chai';
import fin_id from '../src/';

describe('hetu', function(){

	it('.parse() is callable', function(){
		expect(fin_id).to.be.a('object');
		expect(fin_id.hetu).to.be.a('object');
		expect(fin_id.hetu.parse).to.be.a('function');
	});

	it('.check() is callable', function(){
		expect(fin_id).to.be.a('object');
		expect(fin_id.hetu).to.be.a('object');
		expect(fin_id.hetu.check).to.be.a('function');
	});

	it('.check() works', function(){
		expect( fin_id ).to.be.a('object');
		expect( fin_id.hetu ).to.be.a('object');
		expect( fin_id.hetu.check ).to.be.a('function');

		expect( fin_id.hetu.check('010171-1000') ).to.equal(true);
		expect( fin_id.hetu.check('010171-1234') ).to.equal(false);
		expect( fin_id.hetu.check('010171-1985') ).to.equal(true);
	});

	it('.check() works', function(){
		expect( fin_id ).to.be.a('object');
		expect( fin_id.hetu ).to.be.a('object');
		expect( fin_id.hetu.parse ).to.be.a('function');

		var parsed = fin_id.hetu.parse('010171-1000');

		var date = parsed.date();
		expect( date ).to.be.a('date');
		expect( date.getFullYear() ).to.equal(1971);
		expect( date.getMonth() ).to.equal(0);
		expect( date.getDate() ).to.equal(1);

		expect( parsed.sex() ).to.equal('female');
	});

});

/* EOF */
