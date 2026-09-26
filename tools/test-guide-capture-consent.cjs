const assert = require('node:assert/strict');
const handler = require('../main-site/api/guide-capture.js');

async function simulate(marketingConsent) {
  const calls=[];
  global.fetch=async (url, options)=>{ calls.push({url,body:JSON.parse(options.body)});return {ok:true,status:200}; };
  const response={statusCode:200,payload:null,setHeader(){return this;},status(n){this.statusCode=n;return this;},json(data){this.payload=data;return this;}};
  await handler({method:'POST',headers:{origin:'https://www.shiftandlead.com'},body:{email:'qa@example.invalid',firstName:'Test',guideSlug:'what-is-ai',consent:true,marketingConsent}},response);
  return {calls,response};
}
(async()=>{
  process.env.LUMAIL_API_TOKEN='test-token-not-used-on-network';
  const unchecked=await simulate(false);
  assert.equal(unchecked.response.statusCode,200);
  assert.equal(unchecked.response.payload.marketingEnrolled,false);
  assert.deepEqual(unchecked.calls.map(c=>c.url),['https://lumail.io/api/v2/emails']);
  assert.match(unchecked.calls[0].body.markdown,/Return|Open your guide/);
  const checked=await simulate(true);
  assert.equal(checked.response.statusCode,200);
  assert.equal(checked.response.payload.marketingEnrolled,true);
  assert.deepEqual(checked.calls.map(c=>c.url),['https://lumail.io/api/v2/emails','https://lumail.io/api/v1/subscribers']);
  assert.equal(checked.calls[1].body.resubscribe,false);
  assert.equal(checked.calls[1].body.fields.marketing_consent,'true');
  console.log('PASS: unchecked delivers email only; checked delivers email + Lumail marketing signup. No external calls.');
})().catch(error=>{console.error(error);process.exitCode=1;});
