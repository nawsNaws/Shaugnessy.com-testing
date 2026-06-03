const PLAINTEXT_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CIPHERTEXT_ALPHABET = '23456789ABCDEFGHJKLMNPQRST';
const ENCODE_MAP = {};
const DECODE_MAP = {};
for (let i = 0; i < PLAINTEXT_ALPHABET.length; i++) {
  const p = PLAINTEXT_ALPHABET[i];
  const c = CIPHERTEXT_ALPHABET[i];
  ENCODE_MAP[p] = c;
  ENCODE_MAP[p.toLowerCase()] = c;
  DECODE_MAP[c] = p.toLowerCase();
}
const OCR_NORMALIZATION = {'0':'Q','O':'Q','o':'Q','1':'L','I':'L','i':'L','Z':'2','z':'2'};
function normalizeCiphertext(ciphertext){
  return (ciphertext||'').replace(/[\r\n\t]+/g,' ').replace(/ {2,}/g,' ').split('').map(ch => OCR_NORMALIZATION[ch] || ch.toUpperCase()).join('');
}
function encryptMessage(message){
  let result = '';
  for(let i=0;i<message.length;i++){
    const ch = message[i];
    result += ENCODE_MAP[ch] || ENCODE_MAP[ch.toUpperCase()] || ch;
  }
  return result;
}
function decryptMessage(cipher){
  const normalized = normalizeCiphertext(cipher);
  let out = '';
  for(let i=0;i<normalized.length;i++){
    const ch = normalized[i];
    out += DECODE_MAP[ch] || ch;
  }
  return out.toLowerCase();
}

const plaintexts = [
  'Hello World',
  'This is a Test.',
  'keep spaces and  punctuation!'
];
for(const p of plaintexts){
  const enc = encryptMessage(p);
  const dec = decryptMessage(enc);
  console.log('plain :', p);
  console.log('enc   :', enc);
  console.log('dec   :', dec);
  console.log('equal?:', dec === p.toLowerCase());
  console.log('---');
}
