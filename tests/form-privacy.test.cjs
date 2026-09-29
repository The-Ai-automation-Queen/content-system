const test = require('node:test');
const assert = require('node:assert/strict');
const {validateRequest} = require('../main-site/lib/form-privacy');
function res(){return {code:200,headers:{},setHeader(k,v){this.headers[k]=v},status(n){this.code=n;return this},json(x){this.body=x;return this}};}
test('reject cross-origin and oversized form payloads',()=>{
 for(const [request,code] of [[{method:'POST',headers:{origin:'https://evil.example'},body:{}},403],[{method:'POST',body:{message:'x'.repeat(16001)}},413],[{method:'GET',body:{}},405],[{method:'POST',body:[]},400]]){const r=res();assert.equal(validateRequest(request,r),false);assert.equal(r.code,code);assert.equal(r.headers['Cache-Control'],'no-store');}
});
for(const [name,key,value] of [['workbook-waitlist','product','your-human-evidence'],['guide-capture','guideSlug','what-is-ai']]){
 test(`${name}: requested email works without marketing; optional opt-in is explicit`,async()=>{
  const handler=require('../main-site/api/'+name);const old=global.fetch,token=process.env.LUMAIL_API_TOKEN;process.env.LUMAIL_API_TOKEN='test';
  try {for(const choice of [undefined,false,'true',true]) {let payload;global.fetch=async(url,opts)=>{if(url.endsWith('/subscribers'))payload=JSON.parse(opts.body);return {ok:true,json:async()=>({})}};const r=res();await handler({method:'POST',headers:{origin:'https://www.shiftandlead.com'},body:{email:'reader@example.com',firstName:'Reader',lastName:'Example',consent:true,[key]:value,marketingConsent:choice,timestamp:'forged',consentVersion:'forged'}},r);assert.equal(r.code,200);assert.equal(payload.resubscribe,false);assert.equal(payload.fields.marketing_consent,choice===true?'true':undefined);assert.notEqual(payload.fields.consent_timestamp,'forged');assert.notEqual(payload.fields.consent_version,'forged');assert.equal(payload.fields.referring_site,undefined);}}
  finally{global.fetch=old;if(token===undefined)delete process.env.LUMAIL_API_TOKEN;else process.env.LUMAIL_API_TOKEN=token;}
 });
}
