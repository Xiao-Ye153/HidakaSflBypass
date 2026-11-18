import axios from 'axios';
import crypto from 'node:crypto';

export async function JHSFL(input, log = () => {}) {
  const baseRes = { status: true, author_skrep: 'JH a.k.a Dhika', kesayangan: 'Fiony Alveria♡', data: { author: '', title: '', media: [] } };

/*
- HARGAI WOY JANGAN DIHAPUS!
- Skrep by *JH a.k.a DHIKA - FIONY BOT*
- Credits to all Fiony's Bot Admin. 
- Maaf kalo kurang maksimal atau berantakan
- Hasil gabut saja xixixi. 
*/

  const pick = (...vals) => {
    for (let i = 0; i < vals.length; i++) {
      if (vals[i] !== undefined ? (vals[i] !== null ? (vals[i] !== '' ? true : false) : false) : false) return vals[i];
    }
    return '';
  };

  input = pick(input, '');

  const _kx = crypto;
  const _s0 = 'xq9-sfl-ϟ7';

  const VW = 392;
  const VH = 687;
  const MAX_HOP = 10;
  const MAX_ROUND = 5;
  const GATE_RE = /id=["']verify["']/i;

  const jantung = {
    'Accept-Language': 'id-ID,id;q=0.9',
    'Sec-Ch-Ua': '"Chromium";v="147", "Not.A/Brand";v="8"',
    'Sec-Ch-Ua-Mobile': '?1',
    'Sec-Ch-Ua-Platform': '"Android"',
    'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Mobile Safari/537.36'
  };

  const _r1 = 'Lkzmw1ugtFCt8B0zhWr00Ak+wUur';

  class SflError extends Error {
    constructor(msg, raw) {
      super(msg);
      this.raw = raw;
    }
  }

  function _m7(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h >>> 0;
  }

  const rawOf = (e) => [e && e.name, e && e.message, e && e.cause && (e.cause.code || e.cause.message)].filter(Boolean).join(' | ');
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const isSfl = (h) => /(^|\.)sfl\.gl$/i.test(h);

  const bersih = (u) => {
    try {
      const x = new URL(String(u).replace(/\\/g, '/'));
      x.pathname = x.pathname.replace(/\/{2,}/g, '/');
      return x.href;
    } catch (e) {
      return u;
    }
  };

  const _h1 = '2796dc0f3760aecb';
  const _r2 = 'NiY2WZz5b8zdHEZ0+sVbbkaGJ5RT';

  const jar = new Map();

  function _brk() {
    const msg = '✘ ERROR: eaa ngapain ngutak-ngatik credit si brayy, minimal kalo udah BEGO jan ditambah MENTAL MALING wkk, pake aja dengan anteng kodenye ye dek. :p';
    throw new Error(msg);
  }

  const cookieHeader = (host) => (jar.has(host) ? [...jar.get(host)].map(([k, v]) => `${k}=${v}`).join('; ') : '');

  const _alg1 = String.fromCharCode(115, 104, 97, 50, 53, 54);
  const _g1 = String.fromCharCode(99, 114, 101, 97, 116, 101, 72, 97, 115, 104);
  const _h2 = '956ddc012926128b';

  const storeCookies = (host, res) => {
    const sc = res.headers['set-cookie'] || [];
    if (sc.length === 0) return;
    if (!jar.has(host)) jar.set(host, new Map());
    const store = jar.get(host);
    for (const c of sc) {
      const [kv] = c.split(';');
      const i = kv.indexOf('=');
      if (i < 1) continue;
      const name = kv.slice(0, i).trim();
      const val = kv.slice(i + 1).trim();
      if (/max-age=0/i.test(c) || /expires=Thu, 01 Jan 1970/i.test(c)) store.delete(name);
      else store.set(name, val);
    }
  };

  const _r3 = 'vUJwlRmofCfdzgLcwBl2HnoiQtPI';

  function _xw3(seed, len) {
    const out = Buffer.alloc(len);
    let block = _kx[_g1](_alg1).update(seed).digest();
    let off = 0;
    let counter = 0;
    while (off < len) {
      const h = _kx[_g1](_alg1).update(Buffer.concat([block, Buffer.from([counter++])])).digest();
      h.copy(out, off, 0, Math.min(h.length, len - off));
      off += h.length;
      block = h;
    }
    return out;
  }

  const http = async (url, { method = 'GET', json, referer } = {}) => {
    const u = new URL(url);
    const headers = { ...jantung };
    const ck = cookieHeader(u.host);
    if (ck !== '') headers['Cookie'] = ck;
    if (referer) headers['Referer'] = referer;
    let data;
    if (method === 'POST') {
      headers['Accept'] = '*/*';
      headers['Content-Type'] = 'application/json';
      headers['Origin'] = u.origin;
      headers['Sec-Fetch-Dest'] = 'empty';
      headers['Sec-Fetch-Mode'] = 'cors';
      headers['Sec-Fetch-Site'] = 'same-origin';
      data = JSON.stringify(json || {});
    } else {
      headers['Accept'] = 'text/html,application/xhtml+xml,*/*;q=0.8';
      headers['Upgrade-Insecure-Requests'] = '1';
    }
    let res;
    try {
      res = await axios({
        url,
        method,
        headers,
        data,
        maxRedirects: 0,
        validateStatus: () => true,
        responseType: 'text',
        transformResponse: [(d) => d]
      });
    } catch (e) {
      throw new SflError('Gagal terhubung ke ' + u.host + '.', rawOf(e));
    }
    storeCookies(u.host, res);
    return { status: res.status, location: res.headers['location'], text: typeof res.data === 'string' ? res.data : String(pick(res.data, '')) };
  };

  const _h3 = 'abe7e4cdc6729708';
  const _alg2 = String.fromCharCode(97, 101, 115, 45, 50, 53, 54, 45, 103, 99, 109);
  const _g2 = String.fromCharCode(99, 114, 101, 97, 116, 101, 68, 101, 99, 105, 112, 104, 101, 114, 105, 118);

  const sniffBody = (html, base) => {
    const form = html.match(/<form[^>]+action=["']([^"']+)["'][^>]*>([\s\S]*?)<\/form>/i);
    if (form && !/method=["']?post/i.test(form[0].match(/^<form[^>]*>/i)[0])) {
      const u = new URL(form[1], base);
      for (const mm of form[2].matchAll(/<input[^>]+>/gi)) {
        const n = mm[0].match(/name=["']([^"']+)["']/i);
        const v = mm[0].match(/value=["']([^"']*)["']/i);
        if (n) u.searchParams.set(n[1], v ? v[1] : '');
      }
      return u.href;
    }
    const meta = html.match(/<meta[^>]+http-equiv=["']?refresh["']?[^>]*content=["'][^"']*url=([^"'>\s]+)/i);
    if (meta) return new URL(meta[1], base).href;
    const js = html.match(/(?:window\.|document\.|top\.)?location(?:\.href)?\s*=\s*["']([^"']+)["']/i);
    if (js) return new URL(js[1], base).href;
    const rep = html.match(/location\.replace\(\s*["']([^"']+)["']\s*\)/i);
    if (rep) return new URL(rep[1], base).href;
    return null;
  };

  const _r4 = 'KkzUhS4xr7xwbPXXRclQdwoL1g1n';

  const sniffFinal = (body, base) => {
    try {
      const j = JSON.parse(body);
      const u = j && (j.url || j.target || j.link || j.redirect);
      if (u) return new URL(u, base).href;
    } catch (e) {}
    const hop = sniffBody(body, base);
    if (hop && hop !== base) return hop;
    const SKIP = /(^|\.)(sfl\.gl|w3\.org|google\.com|googleapis\.com|gstatic\.com|cloudflare\.com|jquery\.com|facebook\.com|twitter\.com)$/i;
    for (const mm of body.replace(/\\+\//g, '/').matchAll(/https?:\/\/[^\s"'<>\\)]+/gi)) {
      try {
        const u = new URL(mm[0]);
        if (!SKIP.test(u.hostname)) return u.href;
      } catch (e) {}
    }
    return null;
  };

  const _h4 = '5f34461d23d6c735';
  const _n3 = 1983952584;

  function _ck7() {
    const a = baseRes.author_skrep;
    const k = baseRes.kesayangan;
    if (baseRes.status !== true) _brk('s1');
    const dg = _kx[_g1](_alg1).update(JSON.stringify([a, k, _s0])).digest('hex');
    if (dg !== _h1 + _h2 + _h3 + _h4) _brk('s2');
    if (_m7(a + '\u0001' + k + '\u0001' + _s0) !== _n3) _brk('s3');
    return { a, k };
  }

  const _r5 = 'BzdDl6qw/TjlaP2yw2+GFA==';
  let _dF = null;

  function _rF() {
    if (_dF) return _dF;
    const { a, k } = _ck7();
    try {
      const blob = Buffer.from(_r1 + _r2 + _r3 + _r4 + _r5, 'base64');
      const ks = _xw3('P2\u0000' + a + '\u0000' + k, blob.length);
      const un = Buffer.alloc(blob.length);
      for (let i = 0; i < blob.length; i++) un[i] = blob[i] ^ ks[i];
      const iv = un.subarray(0, 12);
      const tag = un.subarray(12, 28);
      const ct = un.subarray(28);
      const aesKey = _kx[_g1](_alg1).update('P1\u0000' + k + '\u0000' + a).digest();
      const d = _kx[_g2](_alg2, aesKey, iv);
      d.setAuthTag(tag);
      const pt = Buffer.concat([d.update(ct), d.final()]);
      _dF = JSON.parse(pt.toString('utf8')).z;
      return _dF;
    } catch {
      return _brk('s4');
    }
  }

  const makeToken = (host) => {
    const xsrf = jar.get(host) && jar.get(host).get('XSRF-TOKEN');
    if (!xsrf) {
      throw new SflError('Cookie XSRF-TOKEN tidak ada.', 'host=' + host + ' cookies=[' + (jar.has(host) ? [...jar.get(host).keys()].join(',') : '') + ']');
    }
    const u = '#' + Buffer.from(_rF()).toString('base64');
    return decodeURIComponent(xsrf).slice(0, 128 - u.length) + u;
  };

  const api = async (page, path, json) => {
    const res = await http(new URL(path, page).href, { method: 'POST', json, referer: page });
    if (res.status < 200 || res.status >= 300) {
      if (res.status === 419) throw new SflError('Sesi/token ditolak server (419), coba jalankan ulang.', `${path} :: ${res.text}`);
      if (res.status === 422) throw new SflError('Request ditolak validasi server (422).', `${path} :: ${res.text}`);
      throw new SflError(`API ${path} ditolak (HTTP ${res.status}).`, res.text);
    }
    try {
      return JSON.parse(res.text);
    } catch (e) {
      throw new SflError(`Response ${path} bukan JSON.`, res.text);
    }
  };

  const navigate = async (start, referer, chain) => {
    let url = start;
    let prev = referer || '';
    for (let i = 0; i < MAX_HOP; i++) {
      const res = await http(url, { referer: prev });
      chain.push({ url, status: res.status });
      if (res.status >= 300 && res.status < 400 && res.location) {
        prev = url;
        url = new URL(res.location, url).href;
        continue;
      }
      if (res.status >= 400) throw new SflError('Server menolak request (HTTP ' + res.status + ').', url + ' :: ' + res.text);
      if (GATE_RE.test(res.text)) return { url, body: res.text, gate: true };
      const next = sniffBody(res.text, url);
      if (next && next !== url) {
        prev = url;
        url = next;
        continue;
      }
      return { url, body: res.text, gate: false };
    }
    throw new SflError('Redirect terlalu banyak (>' + MAX_HOP + ').', chain.map((c) => c.url).join(' -> '));
  };

  const finalize = async (start, referer, chain) => {
    let url = start;
    let prev = referer || '';
    for (let i = 0; i < MAX_HOP; i++) {
      if (!isSfl(new URL(url).hostname)) return url;
      const res = await http(url, { referer: prev });
      chain.push({ url, status: res.status });
      if (res.status >= 300 && res.status < 400 && res.location) {
        prev = url;
        url = new URL(res.location, url).href;
        continue;
      }
      if (res.status >= 400) throw new SflError('Server menolak request (HTTP ' + res.status + ').', url + ' :: ' + res.text);
      const next = sniffFinal(res.text, url);
      if (!next || next === url) throw new SflError('Tujuan akhir tidak ditemukan di halaman /ready/go.', url + ' :: ' + res.text);
      prev = url;
      url = next;
    }
    throw new SflError('Redirect terlalu banyak di hop terakhir.', chain.map((c) => c.url).join(' -> '));
  };

  const resolve = async (startUrl) => {
    _ck7();
    const chain = [];
    log('Membuka link dan mencari halaman gate');
    let page = await navigate(startUrl, '', chain);

    for (let round = 0; round < MAX_ROUND; round++) {
      if (!page.gate) throw new SflError('Halaman gate SafelinkU tidak ditemukan (mungkin struktur berubah).', page.url);
      log('Halaman gate ketemu, minta sesi ke server');

      const host = new URL(page.url).host;
      const s = await api(page.url, '/api/session', { _token: makeToken(host) });
      if (s.captcha || s.passcode) throw new SflError('Link ini butuh captcha/passcode, belum bisa di-dor wkk.', JSON.stringify(s));

      if (s.step === 1) {
        log('Gate tahap 1: server minta nunggu 12 detik');
        await sleep(12000);
        const v = await api(page.url, '/api/verify', { _a: 0 });
        const next = new URL(pick(v.target, '/redirect.php'), page.url).href;
        log('Tahap 1 lolos, pindah ke halaman berikutnya');
        page = await navigate(next, page.url, chain);
        continue;
      }

      if (s.step === 2) {
        log('Gate tahap 2: nunggu 5 detik lagi');
        await sleep(5000);
        const a = Math.floor(Math.random() * 1000);
        const size = (VW + a) * 2 + '.' + (VH + a) * 2;
        log('Minta link tujuan ke server');
        const g = await api(page.url, '/api/go', { key: a, size, ado: null });
        if (!g.url) throw new SflError('Response /api/go tidak berisi url.', JSON.stringify(g));
        const final = bersih(await finalize(new URL(g.url, page.url).href, page.url, chain));
        log('Link tujuan ketemu');
        return final;
      }

      throw new SflError('Step tidak dikenal: ' + s.step, JSON.stringify(s));
    }
    throw new SflError('Terlalu banyak putaran gate (>' + MAX_ROUND + ').', chain.map((c) => c.url).join(' -> '));
  };

  try {
    if (input === '') throw new SflError('Link belum diisi.', 'input kosong');

    const matchUrl = input.match(/(?:https?:\/\/)?(?:[a-z0-9-]+\.)*sfl\.gl(?:\/[^\s]*)?/i);
    if (!matchUrl) throw new SflError('Link harus dari domain sfl.gl brayy.', input);

    const startUrl = /^https?:\/\//i.test(matchUrl[0]) ? matchUrl[0] : 'https://' + matchUrl[0];
    const final = await resolve(startUrl);

    let hostName = '';
    try {
      hostName = pick(new URL(final).hostname, '');
    } catch (e) {}

    baseRes.data.author = pick(hostName, final);
    baseRes.data.title = startUrl;
    baseRes.data.media.push({ type: 'link', url: final });

    return JSON.stringify(baseRes, null, 2);

  } catch (error) {
    baseRes.status = false;
    baseRes.error = pick(error.message, 'Unknown Error');
    if (error.raw) baseRes.raw = error.raw;
    baseRes.data = null;
    return JSON.stringify(baseRes, null, 2);
  }
}
