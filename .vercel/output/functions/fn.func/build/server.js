// node_modules/brisa/out/cli/serve/index.js
import {createRequire as te} from "node:module";
import Ja from "node:cluster";
import {cpus as ae} from "node:os";
import A from "node:path";
import fe from "node:path";
import si from "node:path";
import {fileURLToPath as ue} from "node:url";
import {createRequire as me} from "node:module";
function oi(a, n) {
  try {
    return me(n ?? si.resolve(process.cwd(), "src")).resolve(a, { paths: n ? [si.resolve(n.startsWith("file://") ? ue(n) : n, "..")] : undefined });
  } catch (i) {
    if (!de)
      throw i;
    return Bun.resolveSync(a, n ? si.dirname(n) : import.meta.dirname);
  }
}
import xe from "node:path";
import {pathToFileURL as ve} from "node:url";
function D(a, n = be) {
  return n ? ve(a).href : a;
}
function na(a, n, i) {
  try {
    const e = oi(xe.join(n, a));
    return D(e, i);
  } catch (e) {
    return null;
  }
}
async function O(a, n = fe.join(process.cwd(), "build")) {
  const i = na(a, n);
  if (!i)
    return null;
  return await import(i);
}
function Ta(a = "", n = 0) {
  if (typeof Bun !== "undefined")
    return Bun.hash(a, n);
  return ge(a, n);
}
function ge(a = "", n = 0) {
  const { ptr: i, size: e } = typeof a === "string" ? ye(a, false) : Ri(a);
  return BigInt.asUintN(64, ci.wyhash(i, e, BigInt(n)));
}
function Ri(a, n = false) {
  const i = a.byteLength + +n;
  if (i === 0)
    return { ptr: -1, size: 0 };
  const e = ci.alloc(i);
  if (e === -1)
    throw new Error("WASM memory allocation failed");
  const s = new Uint8Array(ci.memory.buffer);
  if (s.set(new Uint8Array(ArrayBuffer.isView(a) ? a.buffer : a), e), n)
    s[e + a.byteLength] = 0;
  return { ptr: e, size: i };
}
function ye(a, n = true) {
  const i = ke.encode(a);
  return Ri(i, n);
}
import pi from "node:process";
import ze from "node:os";
import Ci from "node:tty";
function $e() {
  const { env: a } = pi;
  if (!a.FORCE_COLOR)
    return;
  if (a.FORCE_COLOR === "true" || a.FORCE_COLOR.length === 0)
    return true;
  if (a.FORCE_COLOR === "false")
    return false;
  return Math.min(Number.parseInt(a.FORCE_COLOR, 10), 3) > 0;
}
function Pi() {
  const { env: a } = pi, n = $e();
  if (n !== undefined)
    return n;
  if (!Ci.isatty(1) && !Ci.isatty(2))
    return false;
  if (pi.platform === "win32") {
    const i = ze.release().split(".");
    return Number(i[0]) >= 10 && Number(i[2]) >= 10586;
  }
  return a.TERM !== "dumb";
}
import Ai from "node:fs";
import _i from "node:crypto";
import P from "node:path";
import aa from "node:process";
function pn({ context: a, value: n, store: i, webComponentSymbol: e }) {
  const s = Symbol("context-provider"), { contextStore: o, providerStore: p } = u(), c = new Set;
  let t = p.get(R), r = false;
  function d(j, k) {
    j.set(a.id, k), i.set(ua, j);
  }
  function u() {
    const j = i.get(ua) ?? new Map, k = j.get(a.id) ?? new Map;
    return { contextStore: j, providerStore: k };
  }
  function m(j) {
    c.add(j);
  }
  function g(j) {
    return c.has(j);
  }
  function v() {
    return c.size > 0;
  }
  function b() {
    const { contextStore: j, providerStore: k } = u();
    k.delete(s), k.set(R, t), d(j, k);
  }
  function l() {
    const { contextStore: j, providerStore: k } = u();
    r = true, k.set(R, t), d(j, k);
  }
  function x() {
    const { contextStore: j, providerStore: k } = u();
    r = false, t = k.get(R), k.set(R, s), d(j, k);
  }
  function z() {
    return r;
  }
  const h = { value: n, clearProvider: b, pauseProvider: l, restoreProvider: x, isProviderPaused: z, addSlot: m, hasSlot: g, hasSomeSlot: v, webComponentSymbol: e };
  return p.set(s, h), p.set(R, s), d(o, p), h;
}
function tn(a, n) {
  const i = n.store.get(ua) ?? new Map;
  for (let e of i.values()) {
    const s = e.get(R);
    if (!s)
      continue;
    e.get(s)?.addSlot(a);
  }
}
function rn(a, n) {
  const i = a.store.get(ua) ?? new Map;
  for (let e of i.values())
    for (let s of e.values()) {
      if (!s || typeof s === "symbol")
        continue;
      n(s, e);
    }
}
function ln(a, n) {
  const i = [];
  return rn(n, (e) => {
    if (e.isProviderPaused() && e.hasSlot(a))
      e.restoreProvider(), i.push(e);
  }), i;
}
function un(a, n) {
  rn(n, (i, e) => {
    if (i.webComponentSymbol === a) {
      if (i.clearProvider(), e.size === 1)
        e.clear();
    }
  });
}
function Fe(a, { children: n, ...i }, e) {
  let s = n;
  if (Array.isArray(n) && !n?.[mi])
    s = n.map((o) => o?.[mi] ? o : Ga({ children: o }));
  return Object.assign([a, { ...i, key: e }, s], { [mi]: true });
}
function $(a, { children: n, ...i }, e) {
  let s = n;
  if (Array.isArray(n) && !n?.[di])
    s = n.map((o) => o?.[di] ? o : I({ children: o }));
  return Object.assign([a, { ...i, key: e }, s], { [di]: true });
}
async function vi({ Component: a, selector: n, __key: i, ...e }, { store: s, useContext: o, i18n: p, indicate: c, route: t }) {
  const { WEB_CONTEXT_PLUGINS: r } = w(), d = !s.has(xi), u = { shadowRoot: {}, attachInternals: ma };
  let m = "";
  const g = n;
  if (typeof a === "string")
    a = await import(a).then((x) => x.default);
  s.setOptimistic = ma;
  const v = { store: s, self: u, state: (x) => ({ value: x }), effect: ma, onMount: ma, reset: ma, derived: (x) => ({ value: x() }), cleanup: ma, indicate: c, useContext: o, i18n: p, css: (x, ...z) => {
    m += String.raw(x, ...z.map((h) => typeof h === "function" ? h() : h));
  }, route: { name: t?.name, pathname: t?.pathname, params: t?.params, query: t?.query } };
  for (let x of r)
    Object.assign(v, x(v));
  const b = { ...e, children: $("slot", {}, undefined, false, undefined, this) };
  let l;
  if (d)
    try {
      l = await (typeof a.suspense === "function" ? a.suspense(b, v) : a(b, v));
    } catch (x) {
      if (a.error)
        l = await a.error({ ...b, error: x }, v);
      else
        throw x;
    }
  return $(g, { ...e, __isWebComponent: true, children: [d && $("template", { shadowrootmode: "open", __skipGlobalCSS: u.shadowRoot.adoptedStyleSheets?.length === 0, children: [l, m.length > 0 && $("style", { children: oa(m) }, undefined, false, undefined, this)] }, undefined, true, undefined, this), $(Ga, { slot: "", children: e.children }, undefined, false, undefined, this)] }, i, true, undefined, this);
}
import Fn from "node:path";
import fa from "node:fs";
import ga from "node:path";
import dn from "node:crypto";
import mn from "node:process";
function vn(a) {
  if (a == null)
    return a;
  const n = dn.createCipheriv(...xn());
  let i = a, e = Ya;
  if (typeof a !== "string")
    i = JSON.stringify(a), e = Aa;
  return e + n.update(i, "utf8", "hex") + n.final("hex");
}
function bn(a) {
  const n = a.startsWith(Ya), i = dn.createDecipheriv(...xn()), e = a.replace(Ya, "").replace(Aa, ""), s = i.update(e, "hex", "utf8") + i.final("utf8");
  return n ? s : JSON.parse(s);
}
function fn(a) {
  const { LOG_PREFIX: n } = w(), i = n[{ Error: "ERROR", Warning: "WARN" }[a]];
  return (e, s, o) => {
    if (console.log(i, `Ops! ${a}:`), console.log(i, "--------------------------"), e.forEach((p, c) => console.log(i, c === 0 ? la(p) : p)), console.log(i, "--------------------------"), s)
      console.log(i, s);
    if (o)
      console.log(i, o);
  };
}
function X({ messages: a, req: n, stack: i, docTitle: e, docLink: s }) {
  let o;
  if (n) {
    const p = { title: a[0], details: a.slice(1), stack: i, docTitle: e, docLink: s }, c = n.store.get(bi) || [];
    c.push(p), n.store.set(bi, c), n.store.transferToClient([bi]);
  }
  if (s)
    o = `${e ?? "Documentation"}: ${s}`;
  return fn("Error")(a, o, i);
}
function gn(a, n) {
  return fn("Warning")(a, n);
}
function _a(a) {
  const n = new Map, i = a.webStore;
  for (let e of i.keys()) {
    const s = i.get(e)?.encrypt ?? false, o = a.store.get(e);
    n.set(e, s ? vn(o) : o);
  }
  return n;
}
async function Wa(a) {
  const n = a.headers.get("content-type"), i = a.clone(), e = a.method === "POST" && !a.bodyUsed, s = n?.includes("multipart/form-data"), o = s && e ? await a.formData() : null, p = new Set, c = !s && e ? await i.json() : null, t = o ? JSON.parse(o.get("x-s")?.toString() ?? "[]") : c?.["x-s"];
  if (o)
    o.delete("x-s");
  return { formData: o, body: c, transferClientStoreToServer() {
    if (!t)
      return;
    for (let [r, d] of t)
      try {
        let u = d, m = false;
        if (r == null || r?.startsWith("context:"))
          continue;
        if (typeof d === "string" && (d.startsWith(Ya) || d.startsWith(Aa)))
          p.add(r), u = bn(d), m = true;
        a.store.set(r, u), a.store.transferToClient([r], { encrypt: m });
      } catch (u) {
        X({ messages: [`Error transferring client "${r}" store to server store`, u.message], docTitle: "Documentation about store.transferToClient", docLink: "https://brisa.build/api-reference/components/request-context#transfertoclient", req: a });
      }
  } };
}
function Le() {
  const a = new Date, n = new Date(a.getFullYear(), a.getMonth(), 1);
  return a.getTime() - n.getTime();
}
function fi({ controller: a, head: n, applySuspense: i = true, request: e }) {
  const s = new Set, o = [], p = [], c = [], t = Promise.withResolvers(), r = new Map, d = [], u = (v) => r.get(v) ?? { chunk: "", openTags: 0, closeTags: 0 };
  let m = false, g;
  return { head: n, styleSheetsChunks: d, hasHeadTag: false, insideHeadTag: false, hasUnsuspense: false, hasActionRPC: false, areSignalsInjected: e.method === "POST", applySuspense: i, generateComponentId() {
    if (!g)
      g = Le();
    o.push((g++).toString(36));
  }, getComponentId() {
    return o.at(-1) ?? "";
  }, getParentComponentId() {
    return o.at(-2) ?? "";
  }, removeComponentId() {
    o.pop();
  }, setCurrentWebComponentSymbol(v) {
    if (v)
      p.push(v);
    else
      p.pop();
  }, getCurrentWebComponentSymbol() {
    return p.at(-1);
  }, addId(v) {
    s.add(v);
  }, transferStoreToClient(v) {
    const b = _a(e), l = this.areSignalsInjected;
    if (b.size === 0)
      return;
    const x = JSON.stringify([...b]), z = e.renderInitiator === L.SPA_NAVIGATION || e.renderInitiator === L.SERVER_ACTION;
    let h;
    if (z)
      h = `<script type="application/json" id="S">${x}</script>`;
    else if (l && m)
      h = `<script>for(let [k, v] of ${x}){ _s?.set?.(k, v); _S.push([k, v])}</script>`;
    else if (l && !m)
      h = `<script>window._S=${x};for(let [k, v] of _S) _s?.set?.(k, v)</script>`;
    else if (m && !l)
      h = `<script>for(let e of ${x}) _S.push(e)</script>`;
    else
      h = `<script>window._S=${x}</script>`;
    this.enqueue(h, v), e.webStore.clear(), m = true;
  }, hasId(v) {
    return s.has(v);
  }, startTag(v, b) {
    if (!b) {
      if (v)
        a.enqueue(v);
      return;
    }
    const l = u(b);
    l.openTags++, l.chunk += v ?? "", r.set(b, l);
  }, enqueue(v, b) {
    if (!b)
      return a.enqueue(v);
    const l = u(b);
    return l.chunk += v, r.set(b, l);
  }, async endTag(v, b) {
    if (!b) {
      const x = v === "</html>";
      if (x)
        this.transferStoreToClient();
      if (v)
        a.enqueue(v);
      if (x)
        await this.waitSuspensedPromises();
      return;
    }
    const l = u(b);
    l.closeTags++, l.chunk += v ?? "", r.set(b, l);
  }, flushAndUnsupenseAllReady() {
    for (let [v, b] of r.entries()) {
      if (b.closeTags !== b.openTags)
        continue;
      a.enqueue(He(b.chunk, v)), r.delete(v);
    }
  }, suspensePromise(v) {
    c.push(Promise.all([t.promise, v]).then(() => this.flushAndUnsupenseAllReady()));
  }, async waitSuspensedPromises() {
    if (c.length === 0)
      return;
    t.resolve(), await Promise.all(c);
  }, nextSuspenseIndex() {
    return c.length + 1;
  } };
}
function ca(a) {
  return hn(a, (n, i) => `${i}${n}`);
}
function gi(a) {
  return hn(a, (n, i) => n.replace(i, ""));
}
function hn(a, n) {
  const { CONFIG: i } = w(), e = i.basePath || "";
  let s;
  if (!e)
    return a;
  if (URL.canParse(a)) {
    const o = new URL(a);
    o.pathname = n(o.pathname, e), s = o.toString();
  } else
    s = n(a, e);
  if (!a.endsWith("/") && s.endsWith("/"))
    return s.slice(0, -1);
  return s;
}
function pa(a, n) {
  const i = new URL(n, "http://localhost"), e = i.search + i.hash;
  if (!a.match(Na.DYNAMIC)?.length)
    return a + e;
  const s = i.pathname.split("/");
  return a.split("/").map((c, t) => {
    const r = Na.CATCH_ALL.test(c), d = Na.REST_DYNAMIC.test(c), u = Na.DYNAMIC.test(c);
    if (!r && !d && !u)
      return c;
    const m = s[t];
    if (!m)
      return c;
    if (r || d)
      return s.slice(t).join("/");
    return m;
  }).join("/") + e;
}
function Te(a) {
  const { I18N_CONFIG: n, IS_PRODUCTION: i } = w(), { hrefLangOrigin: e } = n ?? {}, s = typeof e === "string" ? e : e?.[a];
  if (!s)
    return "";
  if (s && !URL.canParse(s)) {
    if (!i)
      console.warn(`hrefLangOrigin for ${a} is not a valid URL. Please check that has protocol and domain.`);
    return "";
  }
  return s;
}
function Ve(a, n, i) {
  const { I18N_CONFIG: e, LOCALES_SET: s } = w(), o = new URL(i.finalURL).pathname.split("/"), p = s.has(o[1]) ? o.join("/").slice(3) : o.join("/"), c = new URL(p, a), { pages: t = {} } = e ?? {}, r = i.route?.name || "", d = t[r]?.[n] || r, u = pa(d, p);
  return c.pathname = `/${n}${u}`, c;
}
function hi(a) {
  const { locale: n } = a.i18n ?? {}, { I18N_CONFIG: i, RESERVED_PAGES: e, CONFIG: s } = w(), { locales: o, hrefLangOrigin: p } = i ?? {}, c = a.route?.name || "";
  if (!n || !p || e.includes(c))
    return "";
  return o.map((t) => {
    if (t === n)
      return "";
    const r = Te(t);
    if (!r)
      return "";
    const u = Ve(r, t, a).toString().replace(/\/$/, ""), m = ca(`${u}${s.trailingSlash ? "/" : ""}`);
    return `<link rel="alternate" hreflang="${t}" href="${m}" />`;
  }).join("");
}
function da(a, n) {
  const { REGEX: i } = w(), s = a.replace(i.CATCH_ALL, ".*").replace(i.REST_DYNAMIC, ".*").replace(i.DYNAMIC, '[^\\/:*?"<>|]+');
  return new RegExp(`^${s}$`).test(n);
}
function wn(a) {
  return typeof a !== "object" ? a : JSON.stringify(a, (n, i) => i === undefined ? "_|U|_" : i);
}
function jn(a) {
  if (!a)
    return a;
  try {
    return JSON.parse(a, (n, i) => i === "_|U|_" ? undefined : i);
  } catch (n) {
    return a;
  }
}
function Ea(a) {
  return wn(a).replace(/'/g, "\\u0027");
}
function wi(a) {
  let n = "";
  for (let i in a) {
    const e = Ge(i.replace(/([A-Z])/g, "-$1"));
    n += `${e}:${a[i]};`;
  }
  return n;
}
function Ae(a) {
  return typeof a === "function" && "actionId" in a;
}
function Ee(a, n) {
  const { I18N_CONFIG: i } = w(), { pages: e } = i ?? {}, { locale: s, locales: o } = n.i18n ?? {}, p = URL.canParse(a);
  let c = a.replace(/\/$/, "");
  for (let [u, m] of Object.entries(n.route?.params ?? {}))
    c = c.replace(`[${u}]`, m);
  if (p)
    return a;
  if (!s)
    return kn(ca(a));
  const t = De(e, c);
  if (t) {
    const [u, m] = t, g = m?.[s] ?? u;
    c = pa(g, c);
  }
  if (c && c[0] !== "/")
    c = "/" + c;
  const r = !o?.some((u) => c?.split("/")?.[1] === u), d = kn(r ? `/${s}${c}` : c);
  return ca(d);
}
function De(a, n) {
  const e = new URL(n, ji).pathname.replace(/\/$/, "");
  for (let s of Object.entries(a ?? {}))
    if (da(s[0], e))
      return s;
}
function kn(a) {
  const { CONFIG: n } = w();
  if (!n.trailingSlash)
    return a;
  const i = new URL(a, ji);
  return i.pathname = i.pathname.endsWith("/") ? i.pathname : `${i.pathname}/`, i.toString().replace(ji, "");
}
function ki({ elementProps: a, request: n, type: i, componentProps: e, componentID: s }) {
  const { IS_PRODUCTION: o, CONFIG: p, BOOLEANS_IN_HTML: c } = w(), t = n.i18n?.locale, { basePath: r, assetPrefix: d } = p, u = new Set;
  let m = "", g = a["data-action-onsubmit"];
  for (let b in a) {
    const l = b.toLowerCase();
    let x = a[b];
    if (u.has(l))
      continue;
    if (u.add(l), _e.has(b) || t && i === "html" && b === "lang")
      continue;
    if (b === "src" && (d || r) && !URL.canParse(x))
      x = `${d ? d : r}${x}`;
    const z = typeof x === "function";
    if (!o && z && !l.startsWith("on"))
      gn([`The prop "${b}" is a function and it's not an event handler.`, 'It should start with "on" to be considered an event handler', `Example: ${la("on" + b[0].toUpperCase() + b.slice(1))}`], "Event handlers docs: https://brisa.build/building-your-application/components-details/web-components#events");
    if (z && globalThis.REGISTERED_ACTIONS && !xa(x))
      x.actionId = globalThis.REGISTERED_ACTIONS.push(x) - 1;
    if (xa(x)) {
      const j = `data-action-${l}`, k = m.replace(new RegExp(`${j}=".*?"`), `${j}="${x.actionId}"`);
      if (l === "onsubmit")
        g = x.actionId;
      if (u.has(j))
        m = k;
      else
        u.add(j), m += ` ${j}="${x.actionId}"`;
      if (!u.has("data-action"))
        u.add("data-action"), m += " data-action";
      continue;
    }
    if (l === "indicator") {
      const h = Array.isArray(x) ? x : [x];
      x = Ea(h.map((j) => j.id));
    }
    if (l.startsWith("indicate") && x?.id?.startsWith("__ind:"))
      x = x.id;
    if (Ne.has(typeof x))
      continue;
    if (typeof x === "boolean" && c.has(l)) {
      if (x)
        m += ` ${l}`;
      continue;
    }
    if (typeof x === "object") {
      m += ` ${l}='${x && l === "style" ? wi(x) : Ea(x)}'`;
      continue;
    }
    if (b === "href" && typeof x === "string" && (i === "a" || i === "link" && a.rel === "prefetch")) {
      m += ` ${l}="${Ee(x, n)}"`;
      continue;
    }
    m += ` ${l}="${x}"`;
  }
  const v = u.has("data-action");
  if (v && s)
    m += ` data-cid="${s}"`;
  if (v && e) {
    const b = [];
    let l = [];
    for (let [h, j] of Object.entries(e)) {
      if (!xa(j))
        continue;
      if (j.cid)
        b.push([h, j.actionId, j.cid]);
      if (l.length === 0 && j.actions?.length)
        l = j.actions.slice();
    }
    const x = b.length > 0, z = x || l.length > 0;
    if (x)
      l.unshift(b);
    if (z)
      m += ` data-actions='${Ea(l)}'`;
  }
  if (g && i === "form") {
    if (!u.has("action")) {
      const b = new URL(n.url);
      b.searchParams.set("_aid", g), u.add("action"), m += ` action="${b.pathname}${b.search}"`;
    }
    if (!u.has("enctype"))
      u.add("enctype"), m += ' enctype="multipart/form-data"';
    if (!u.has("method"))
      u.add("method"), m += ' method="POST"';
  }
  if (t && i === "html") {
    const b = new Intl.Locale(t), { direction: l } = b.textInfo ?? b.getTextInfo();
    m += ` lang="${t}" dir="${l}"`;
  }
  if (i === "head" && r)
    m += ` basepath="${r}"`;
  return m;
}
function va(a) {
  return a instanceof Error && a.name === "NotFoundError";
}
function Da(a, n) {
  for (let i in n) {
    if (!a.hasOwnProperty(i))
      continue;
    a[i] = typeof a[i] === "object" ? Da(a[i], n[i]) : n[i];
  }
  return a;
}
function Oe(a, n = "") {
  const i = [];
  let e;
  for (let s in a) {
    const o = a[s];
    if (xa(o)) {
      if (i.push([s, o.actionId, n]), !e && Array.isArray(o.actions) && o.actions.length > 0)
        e = o.actions;
    }
  }
  return i.length ? [i, ...e ?? []] : [];
}
function yi(a, n, i) {
  const e = {};
  let s;
  for (let o in a) {
    const p = o.toLowerCase(), c = `${yn}-${p}`, t = a[o];
    if (typeof t === "function" && c in a && !("actionId" in t)) {
      if (!s)
        s = Oe(n, i?.getParentComponentId());
      Object.assign(t, { actionId: a[c], actions: s, cid: i?.getComponentId() });
    }
    if (p.startsWith(yn))
      continue;
    e[o] = t;
  }
  return e;
}
function ba(a) {
  return a instanceof Error && a.name.startsWith("navigate:");
}
function zi(a) {
  return a.name.replace("navigate:", "");
}
function $i(a) {
  return `<script>(()=>{let u=new URL(location.href);u.searchParams.set("_not-found","1"),location.${a?.renderInitiator === "SERVER_ACTION" ? "assign" : "replace"}(u.toString())})()</script>`;
}
function Xa(a) {
  return String(a).replace(Re, Pe);
}
async function Ra(a, n, i, e, s = false, o) {
  const p = await Promise.resolve().then(() => a);
  let c = Array.isArray(p) ? p : [p];
  if (Ba(c))
    c = [c];
  const { BUILD_DIR: t, VERSION_HASH: r, CONFIG: d, IS_DEVELOPMENT: u, IS_SERVE_PROCESS: m } = w(), v = (d.basePath || "") + "/_brisa/pages";
  for (let b of c) {
    if (b === false || b == null)
      continue;
    if (Un.has(typeof b)) {
      i.enqueue(Xa(b.toString()), e);
      continue;
    }
    if (typeof b === "object" && !Ba(b)) {
      i.enqueue(String(b), e);
      continue;
    }
    const [l, x, z] = b, h = { ...x, children: z }, j = l === zn && h.serverOnly, k = l?.__isFragment || l === null, G = k || j, ia = l?.__isWebComponent || h?.__isWebComponent, _ = typeof l === "string", Q = ia && _;
    let M, f = s, Y;
    const B = typeof h?.slot === "string" && s && (_ || ia || k);
    if (Q)
      f = true, Y = Symbol("web-component"), i.setCurrentWebComponentSymbol(Y);
    else if (_)
      f = false;
    if (l === "HTML") {
      i.enqueue(h.html, e);
      continue;
    }
    if (l === "slot")
      tn(h.name ?? "", n);
    if (B)
      M = ln(h.slot, n);
    const F = () => {
      if (Q && Y)
        return un(Y, n), i.setCurrentWebComponentSymbol();
      if (!B || !M?.length)
        return;
      for (let W of M)
        W.pauseProvider();
    };
    if (Ui(l) && !G) {
      const W = l?._hasActions, K = yi(h, o, i), J = { component: l, props: K };
      if (i.applySuspense && Ui(l.suspense)) {
        const Z = i.nextSuspenseIndex();
        return i.startTag(`<div id="S:${Z}">`, e), await Oa({ component: l.suspense, props: K }, n, i, e, f), await i.endTag("</div>", e), i.suspensePromise(Oa(J, n, i, Z, f));
      }
      if (W)
        i.generateComponentId(), i.enqueue(`<!--o:${i.getComponentId()}-->`, e);
      const N = await Oa(J, n, i, e, f);
      if (W)
        i.enqueue(`<!--c:${i.getComponentId()}-->`, e), i.removeComponentId();
      return F(), N;
    }
    if (i.insideHeadTag && i.hasId(h.id))
      return;
    if (i.insideHeadTag && h.id)
      i.addId(h.id);
    const y = ki({ elementProps: h, request: n, type: l, componentProps: o, componentID: i.getComponentId() }), U = l === zn;
    let T;
    if (U)
      T = pn({ context: h.context, value: h.value, store: n.store, webComponentSymbol: i.getCurrentWebComponentSymbol() });
    if (i.startTag(G ? null : `<${l}${y}>`, e), l === "head") {
      if (i.insideHeadTag = true, i.head)
        await Oa({ component: i.head, props: {} }, n, i, e, f);
    } else if (l === "template" && h.shadowrootmode === "open" && !h.__skipGlobalCSS) {
      const W = n._globalStyle;
      if (W)
        i.enqueue(`<style>${oa(W)}</style>`, e);
      i.enqueue(i.styleSheetsChunks.join(""), e);
    }
    if (await Ji(z, n, i, e, f, o), l === "head") {
      if (i.enqueue(hi(n), e), i.hasHeadTag = true, i.insideHeadTag = false, i.hasUnsuspense)
        i.enqueue(`<script src="${v}/_unsuspense-${r}.js"></script>`, e);
      if (i.hasActionRPC)
        i.enqueue(`<script src="${v}/_rpc-${r}.js"></script>`, e);
    } else if (l === "link" && h.rel === "stylesheet" && i.insideHeadTag)
      i.styleSheetsChunks.push(`<link rel="stylesheet" href="${h.href}"></link>`);
    else if (l === "body") {
      if (u && m)
        i.enqueue("<brisa-error-dialog skipSSR></brisa-error-dialog>", e);
      const W = n.route?.filePath?.replace(ga.sep + "pages", ga.sep + "pages-client")?.replace(".js", ".txt");
      if (i.transferStoreToClient(e), fa.existsSync(W)) {
        const K = fa.readFileSync(W, "utf8"), J = n.route.src.replace(".js", `-${K}.js`), { locale: H } = n.i18n, N = JSON.stringify({ name: n.route?.name, pathname: n.route?.pathname, query: n.route?.query, params: n.route?.params });
        if (H) {
          const Z = J.replace(".js", `-${H}.js`), E = ga.join(t, "pages-client", Z);
          if (fa.existsSync(E)) {
            let Ua = `<script src="${v}/${Z}"></script>`;
            if (n.store.has("_messages")) {
              const La = fa.readFileSync(E, "utf-8").replace(/^window.i18nMessages ?=/, "return ");
              Ua = `<script>window.i18nMessages={...window.i18nMessages,...(${JSON.stringify(Da(new Function(La)(), n.store.get("_messages")))})}</script>`;
            }
            i.enqueue(Ua, e);
          }
        }
        i.areSignalsInjected = true, i.enqueue(`<script>window.r=${N}</script>`, e), i.enqueue(`<script async fetchpriority="high" src="${v}/${J}"></script>`, e);
      }
    }
    if (T)
      if (T.hasSomeSlot())
        T.pauseProvider();
      else
        T.clearProvider();
    F(), await i.endTag(G ? null : `</${l}>`, e);
  }
}
async function Oa({ component: a, props: n }, i, e, s, o = false) {
  const p = await Ie(a, n, i);
  if (Jn(e, i, s), typeof p?.next === "function") {
    for await (let c of p)
      Jn(e, i, s), await Ji(c, i, e, s, o, n);
    return;
  }
  if (Un.has(typeof p))
    return e.enqueue(Xa(p.toString()), s);
  if (Array.isArray(p) && !Ba(p))
    return Ji(p, i, e, s, o, n);
  return Ra(p, i, e, s, o, n);
}
async function Ji(a, n, i, e, s = false, o) {
  if (a === false || a == null)
    return;
  if (Array.isArray(a) && !Ba(a))
    await Zn(a, n, i, e, s, o);
  else if (typeof a === "object")
    await Ra(a, n, i, e, s, o);
  else if (typeof a?.toString === "function")
    await i.enqueue(Xa(a.toString()), e);
}
async function Zn(a, n, i, e, s = false, o) {
  for (let p of a)
    if (Array.isArray(p) && !Ba(p))
      await Zn(p, n, i, e, s, o);
    else
      await Ra(p, n, i, e, s, o);
}
function Ui(a) {
  return typeof a === "function";
}
function Ie(a, n, i) {
  return Promise.resolve().then(() => a(n, i) ?? "").catch((e) => {
    if (va(e) || ba(e))
      throw e;
    if (!Ui(a.error)) {
      const s = a.__isWebComponent, p = `Error in SSR of ${(s ? n.selector : a.name) || "Component"} component with props ${JSON.stringify(n)}`;
      return X({ req: i, messages: [p, e.message], stack: e.stack, docTitle: "Documentation about SSR", docLink: s ? "https://brisa.build/building-your-application/components-details/web-components.html#server-side-rendering" : "https://brisa.build/building-your-application/components-details/server-components.html" }), "";
    }
    return a.error({ error: e, ...n }, i);
  });
}
async function $n(a, n) {
  const { BUILD_DIR: i } = w(), e = fa.existsSync(a) ? fa.readFileSync(a, "utf-8") : "";
  if (!e)
    return false;
  const s = (n.route?.filePath ?? "").replace(i, "");
  return new Set(e.split("\n")).has(s);
}
function Jn(a, n, i) {
  if (n._style)
    a.enqueue(`<style>${oa(n._style)}</style>`, i), n._style = "";
}
function Ba(a) {
  return Array.isArray(a) && Symbol.for("isJSX") in a;
}
function ha(a, { request: n, head: i, isPage: e = true, applySuspense: s = globalThis.FORCE_SUSPENSE_DEFAULT ?? true }) {
  const o = C({ originalRequest: n }), { IS_PRODUCTION: p, BUILD_DIR: c } = w(), t = ga.join(c, "pages-client"), r = ga.join(t, "_unsuspense.txt"), d = ga.join(t, "_rpc.txt");
  let u = false;
  return new ReadableStream({ async start(m) {
    const g = fi({ controller: m, head: i, applySuspense: s, request: o }), v = new Promise((l) => o.signal.addEventListener("abort", () => {
      u = true, l(u);
    }));
    g.hasUnsuspense = await $n(r, o), g.hasActionRPC = await $n(d, o);
    const b = Ra(a, o, g).then(() => g.waitSuspensedPromises()).then(() => g.transferStoreToClient()).catch(async (l) => {
      if (va(l))
        g.enqueue(Se), g.transferStoreToClient(), g.enqueue($i(o));
      else if (ba(l)) {
        const x = o.renderInitiator === L.SERVER_ACTION ? "assign" : "replace";
        g.transferStoreToClient(), g.enqueue(`<script>window._xm="${zi(l)}";location.${x}("${l.message}")</script>`);
      } else
        m.error(l);
    });
    if (await Promise.race([v, b]), m.close(), e && !p && !u && !g.hasHeadTag)
      X({ messages: ["No <head> tag", "You should have a <head> tag in your document. Please review your layout. You can experiment some issues with client JavaScript code without it."], docTitle: "Documentation about layout", docLink: "https://brisa.build/building-your-application/routing/pages-and-layouts.html#layout" });
  } });
}
function Ma(a) {
  return Object.assign(["HTML", { html: a }, null], { [Symbol.for("isJSX")]: true });
}
import {watch as qe, existsSync as as, statSync as is, readFileSync as ns} from "node:fs";
import Qn from "node:path";
import wa from "node:process";
import {spawnSync as es} from "node:child_process";
function Wn() {
  return Number(wa.hrtime.bigint());
}
async function ts() {
  let a = false, n = "";
  async function i(s, o) {
    try {
      const p = Qn.join(Yn, o);
      let c = null;
      if (s !== "change" && is(p).size !== 0)
        return;
      if (as(p)) {
        const t = ns(p), r = t.buffer.slice(t.byteOffset, t.byteOffset + t.byteLength);
        c = Ta(r);
      }
      if (!c || Pa.has(c))
        return;
      if (Pa.size > ps)
        Pa.clear();
      if (Pa.add(c), console.log(Ca.WAIT, `recompiling ${o}...`), a)
        n = o;
      else
        e(o);
    } catch (p) {
      X({ messages: [p.message, `Error while trying to recompile ${o}`], stack: p.stack, docTitle: "Please, file a GitHub issue to Brisa's team", docLink: "https://github.com/brisa-build/brisa/issues/new" });
    }
  }
  async function e(s) {
    if (a = true, typeof Bun !== "undefined")
      globalThis.Loader.registry.clear();
    const o = Wn(), { error: p } = es(wa.execPath, [Qn.join(wa.argv[1], "..", "..", "build.js")], { env: wa.env, stdio: ["inherit", "inherit", "pipe"] }), t = ((Wn() - o) / 1e6).toFixed(2);
    if (p) {
      console.log(Ca.ERROR, `failed to recompile ${s}`, p.toString()), a = false;
      return;
    }
    if (console.log(Ca.READY, `hot reloaded successfully in ${t}ms`), !globalThis.brisaServer)
      return;
    if (globalThis.brisaServer.publish("hot-reload", Xn), n) {
      const r = n;
      n = "", await e(r);
    }
    a = false;
  }
  if (globalThis.watcher)
    globalThis.watcher.close();
  else
    console.log(Ca.INFO, "hot reloading enabled");
  globalThis.watcher = qe(Yn, { recursive: true }, i), wa.on("SIGINT", () => {
    globalThis.watcher?.close(), wa.exit(0);
  });
}
function Bn({ port: a, children: n }) {
  const e = `ws://localhost:${globalThis.brisaServer?.port ?? a}/${cs}`;
  return $(I, { children: [$("script", { id: "hotreloading-script", children: Ma(oa(`(()=>{
            let s;
            let tries = 0;

            function wsc() {
              tries++;
              if(tries > 10) return;
              if(s) s.close();
              s = new WebSocket("${e}");
              s.onmessage = e => {
                if(e.data === "${Xn}"){
                  window._xm = "native";
                  location.reload();
                }
              };
              s.onopen = () => { tries = 0 };
              s.onclose = wsc;
              s.onerror = () => s.close();
            }
            wsc();
          })();`)) }, undefined, false, undefined, this), n] }, undefined, true, undefined, this);
}
async function Zi({ children: a, layoutModule: n }) {
  if (!n)
    return $("html", { children: [$("head", { children: [$("meta", { charSet: "UTF-8" }, undefined, false, undefined, this), $("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }, undefined, false, undefined, this), $("meta", { name: "theme-color", content: "#317EFB" }, undefined, false, undefined, this), $("title", { children: "Brisa" }, undefined, false, undefined, this)] }, undefined, true, undefined, this), $("body", { children: a }, undefined, false, undefined, this)] }, undefined, true, undefined, this);
  const i = n.default;
  return $(i, { children: a }, undefined, false, undefined, this);
}
function rs({ children: a, layoutModule: n }) {
  const { IS_PRODUCTION: i, PORT: e } = w();
  return $(Zi, { layoutModule: n, children: i ? a : $(Bn, { port: e, children: a }, undefined, false, undefined, this) }, undefined, false, undefined, this);
}
async function Qi(a, n) {
  const { BUILD_DIR: i } = w(), e = await import(D(a.filePath)), s = na("layout", i), o = s ? await import(s) : undefined, p = e.default;
  return { Page: () => $(I, { children: [Ma("<!DOCTYPE html>"), $(rs, { layoutModule: o, children: $(p, { error: n }, undefined, false, undefined, this) }, undefined, false, undefined, this)] }, undefined, true, undefined, this), module: e, layoutModule: o };
}
async function Sa({ req: a, route: n, error: i, status: e = 200, headers: s }) {
  const { HEADERS: o, BUILD_DIR: p } = w(), c = await O("middleware", p), { Page: t, module: r, layoutModule: d } = await Qi(n, i), u = c?.responseHeaders?.(a, e) ?? {}, m = d?.responseHeaders?.(a, e) ?? {}, g = await r.responseHeaders?.(a, e) ?? {}, v = new Headers({ "cache-control": o.CACHE_CONTROL, ...u, ...m, ...g, ...s, "transfer-encoding": "chunked", vary: "Accept-Encoding", "content-type": "text/html; charset=utf-8" });
  return { PageComponent: t, pageModule: r, pageHeaders: v };
}
import Mn from "node:fs";
import {pipeline as ls} from "node:stream";
function ja(a, n = us) {
  if (!Mn.existsSync(a))
    return null;
  if (n)
    return Bun.file(a).stream();
  const i = Mn.createReadStream(a);
  return new ReadableStream({ start(e) {
    ls(i, async function* (s) {
      for await (let o of s)
        e.enqueue(o);
      e.close();
    }, (s) => {
      if (s)
        e.error(s);
    });
  } });
}
function ms(a) {
  const { BUILD_DIR: n, CONFIG: i } = w(), { pathname: e } = new URL(a.pathname, "http://localhost"), s = Fn.join(n, "prerendered-pages", i.trailingSlash ? `${e}${Fn.sep}index.html` : `${e}.html`);
  return ja(s);
}
async function ka({ req: a, route: n, status: i = 200, error: e, headers: s = {} }) {
  const { transferClientStoreToServer: o } = await Wa(a), { PageComponent: p, pageModule: c, pageHeaders: t } = await Sa({ req: a, route: n, error: e, status: i, headers: s });
  if (a.renderInitiator !== L.SERVER_ACTION)
    o();
  const d = ms(n) ?? ha(p(), { request: a, head: c.Head });
  return new Response(d, { headers: t, status: i });
}
import $s from "node:path";
function Fa(a, n = false) {
  if (!a)
    return false;
  return (n ? xs : ds).test(a);
}
import Ia from "node:path";
import vs from "node:fs";
function Yi(a) {
  const n = Object.entries(ys(a)).sort(zs);
  function i(e) {
    const s = new URL(e.replace(gs, "/"), "http://l"), o = decodeURIComponent(s.pathname + s.search + s.hash), p = decodeURIComponent(s.pathname.replace(hs, "") || "/").trim();
    for (let [c, t] of n) {
      const r = ks(c), d = t.replace(a.dir + Ia.sep, "");
      if (r === "exact" && c === p)
        return { filePath: t, kind: r, name: c, pathname: o, src: d, ...Ln(c, p, s) };
      if (r === "dynamic" || r === "catch-all" || r === "optional-catch-all") {
        const u = c.split("/"), m = p.split("/");
        for (let g = 0;g < u.length; g++) {
          const v = u[g];
          if (v.startsWith("["))
            m[g] = u[g];
          if (v.includes("...")) {
            m.splice(g, m.length), u.splice(g, u.length);
            break;
          }
        }
        if (u.join("/") === m.join("/"))
          return { filePath: t, kind: r, name: c, pathname: o, src: d, ...Ln(c, p, s) };
      }
    }
    return null;
  }
  return { routes: n, match: i };
}
function ks(a) {
  if (a.includes("[[..."))
    return "optional-catch-all";
  if (a.includes("[..."))
    return "catch-all";
  if (a.includes("["))
    return "dynamic";
  return "exact";
}
function Ln(a, n, i) {
  const e = a.split("/"), s = n.split("/"), o = e.reduce((c, t, r) => {
    if (t.startsWith("[")) {
      const d = t.replace(ws, "");
      c[d] = t.includes("...") ? s.slice(r) ?? "" : s[r] ?? "";
    }
    return c;
  }, {}), p = { ...o, ...Object.fromEntries(i.searchParams) };
  return { params: o, query: p };
}
function ys({ dir: a, fileExtensions: n = fs }) {
  const i = {}, e = vs.readdirSync(a, { withFileTypes: true, recursive: true });
  for (let s of e) {
    if (s.isDirectory() || Fa(s.name, true))
      continue;
    const o = Ia.extname(s.name);
    if (!n.includes(o))
      continue;
    const p = Ia.resolve(s.parentPath, s.name);
    let c = p.replace(o, "").replace(a, "").replace(bs, "").replace(js, "/");
    if (c === "")
      c = "/";
    i[c] = p;
  }
  return i;
}
function zs([a], [n]) {
  const i = a.split("/"), e = n.split("/"), s = Math.min(i.length, e.length);
  for (let o = 0;o < s; o++) {
    const p = i[o], c = e[o], t = Hn.has(p[0]), r = Hn.has(c[0]), d = parseInt("" + p.match(Kn), 10), u = parseInt("" + c.match(Kn), 10);
    if (!isNaN(d) && !isNaN(u)) {
      const g = d - u;
      if (g !== 0)
        return g;
    }
    if (t && !r)
      return 1;
    if (!t && r)
      return -1;
    const m = p.localeCompare(c, "en", { sensitivity: "base" });
    if (m !== 0)
      return m;
  }
  return i.length - e.length;
}
function q(a, n = [], i) {
  const e = Yi({ dir: a }), s = new Set(n), o = (c) => {
    const t = new URL(c.finalURL);
    if (i)
      t.pathname = t.pathname.replace(new RegExp(`/${i}(/|$)`), "");
    let r = e.match(t.toString());
    if (Fa(r?.name) || t.pathname.endsWith($s.sep + "index"))
      return { route: null, isReservedPathname: false };
    return { route: r, isReservedPathname: s.has(r?.pathname ?? "") };
  }, p = n.reduce((c, t) => {
    return c[t] = e.match(t), c;
  }, {});
  return { match: o, reservedRoutes: p };
}
function Js(a) {
  return a.headers.get("Cookie")?.match(/BRISA_LOCALE=(?<locale>\w+)/)?.groups?.locale;
}
function Us(a) {
  return a.headers.get("Accept-Language")?.split(",").map((i) => i.split(";")[0]);
}
function Zs(a, n) {
  const i = new URL(a.finalURL).hostname;
  return n.domains?.[i]?.defaultLocale ?? n.defaultLocale;
}
function Qs(a = [], n) {
  for (let i of a) {
    if (n.has(i))
      return i;
    const [e] = i.split("-");
    if (n.has(e))
      return e;
  }
}
function Wi(a) {
  const { I18N_CONFIG: n = {}, LOCALES_SET: i } = w(), { pathname: e } = new URL(a.finalURL), [, s] = e.split("/");
  if (i.has(s))
    return s;
  const o = Js(a);
  if (o && i.has(o))
    return o;
  const p = Us(a), c = Qs(p, i);
  return c ? c : Zs(a, n);
}
function Tn(a) {
  if (!a.length)
    return [];
  const [n, i, e, s] = a.slice(0, 4);
  return [[n || e, i || "", s]].concat(Tn(a.slice(4, a.length)));
}
function qa(a, n = []) {
  const i = a.replace(Ws, "").split(Ys);
  if (i.length === 1)
    return a;
  const e = [], s = i.shift();
  if (s)
    e.push(s);
  const o = Tn(i);
  for (let [p, c, t] of o) {
    const r = n[p] || $(I, {}, undefined, false, undefined, this);
    if (r[2] = c ? qa(c, n) : c, e.push(r), t)
      e.push(t);
  }
  return e;
}
function Ka(a, n = "", i, e = { returnObjects: false }) {
  const { keySeparator: s = "." } = i || {}, o = s ? n.split(s) : [n];
  if (n === s && e.returnObjects)
    return a;
  const p = o.reduce((c, t) => {
    if (typeof c === "string")
      return {};
    const r = c[t];
    return r || (typeof r === "string" ? r : {});
  }, a);
  if (typeof p === "string" || p instanceof Object && e.returnObjects)
    return p;
  return;
}
function Xs(a, n, i, e, s) {
  if (!s || typeof s.count !== "number")
    return i;
  const o = `${i}_${s.count}`;
  if (Ka(n, o, e) !== undefined)
    return o;
  const p = `${i}_${a.select(s.count)}`;
  if (Ka(n, p, e) !== undefined)
    return p;
  const c = `${i}.${s.count}`;
  if (Ka(n, c, e) !== undefined)
    return c;
  const t = `${i}.${a.select(s.count)}`;
  if (Ka(n, t, e) !== undefined)
    return t;
  return i;
}
function Vn({ text: a, query: n, config: i, locale: e }) {
  if (!a || !n)
    return a || "";
  const s = (r) => r.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), { format: o = null, prefix: p = "{{", suffix: c = "}}" } = i.interpolation || {}, t = c === "" ? "" : `(?:[\\s,]+([\\w-]*))?\\s*${s(c)}`;
  return Object.keys(n).reduce((r, d) => {
    const u = new RegExp(`${s(p)}\\s*${d}${t}`, "gm");
    return r.replace(u, (m, g) => {
      return g && o ? o(n[d], g, e) : n[d];
    });
  }, a);
}
function Gn({ obj: a, query: n, config: i, locale: e }) {
  if (!n || Object.keys(n).length === 0)
    return a;
  return Object.keys(a).forEach((s) => {
    if (a[s] instanceof Object)
      Gn({ obj: a[s], query: n, config: i, locale: e });
    if (typeof a[s] === "string")
      a[s] = Vn({ text: a[s], query: n, config: i, locale: e });
  }), a;
}
function Xi(a, n) {
  const { allowEmptyStrings: i = true } = n, e = new Intl.PluralRules(a), s = (c, t) => {
    if (Array.isArray(c))
      return c.map((r) => s(r, t));
    if (c instanceof Object)
      return Gn({ obj: c, query: t, config: n, locale: a });
    return Vn({ text: c, query: t, config: n, locale: a });
  }, o = (c = "", t, r) => {
    const d = n._messages || {}, u = { ...n.messages?.[a] || {}, ...d }, m = Xs(e, u, c, n, t), g = Ka(u, m, n, r), v = typeof g === "object" ? JSON.parse(JSON.stringify(g)) : g, b = typeof v === "undefined" || typeof v === "object" && !Object.keys(v).length || v === "" && !i, l = typeof r?.fallback === "string" ? [r.fallback] : r?.fallback || [];
    if (b && Array.isArray(l) && l.length) {
      const [x, ...z] = l;
      if (typeof x === "string")
        return p(x, t, { ...r, fallback: z });
    }
    if (b && r && r.hasOwnProperty("default") && !l?.length)
      return r.default ? s(r.default, t) : r.default;
    if (b)
      return c;
    return s(v, t);
  }, p = (c = "", t, r) => {
    const d = o(c, t, r);
    return r?.elements ? qa(d, r.elements) : d;
  };
  return p;
}
function Ms([a, n]) {
  return Object.entries(n ?? {}).map(([i, e]) => [e, { locale: i, route: a }]);
}
function Bi(a, n) {
  const e = Object.entries(a ?? {}).flatMap(Ms), s = Object.fromEntries(e);
  return { match: (p) => {
    const c = new URL(p.finalURL), t = p.i18n?.locale, r = (d) => C({ originalRequest: p, finalURL: d });
    c.pathname = c.pathname.replace(`/${t}`, "").replace(Bs, "");
    for (let d in s) {
      const { route: u, locale: m } = s[d];
      if (m !== t)
        continue;
      if (t && a?.[u]?.[t] && d !== u && da(u, c.pathname))
        return { route: null, isReservedPathname: false };
      if (da(d, c.pathname))
        return c.pathname = pa(u, c.pathname), n.match(r(c.toString()));
    }
    return n.match(r(c.toString()));
  }, reservedRoutes: n.reservedRoutes };
}
import An from "node:fs";
import Fs from "node:path";
function Mi(a) {
  const { ASSETS_DIR: n } = w(), i = new URL(a.finalURL), e = Fs.join(n, i.pathname);
  return i.pathname !== "/" && An.existsSync(e);
}
function _n(a, n) {
  const i = new URL(a, n);
  return i.search = n.search, i.hash = n.hash, i;
}
function ya(a) {
  const { CONFIG: n } = w(), { trailingSlash: i } = n, e = new URL(a.finalURL), { pathname: s } = e, o = s === "/";
  if (i && !s.endsWith("/") && !o)
    return ta(_n(s + "/", e).toString());
  if (!i && s.endsWith("/") && !o)
    return ta(_n(s.slice(0, -1), e).toString());
}
function ta(a, n = 301) {
  return new Response(null, { status: n, headers: { "Cache-Control": "no-cache, no-store, must-revalidate", expires: "-1", pragma: "no-cache", location: ca(a), vary: "Accept-Language" } });
}
function Nn(a, n) {
  if (a.origin !== new URL(n.url).origin)
    return ta(a.toString(), 307);
  const i = C({ originalRequest: new Request(a) }), e = Mi(i), s = e ? {} : za(i), o = n.method === "POST" && n.headers.has("x-action");
  if (s.response)
    return s.response;
  if (!e && !o) {
    const p = ya(i);
    if (p)
      return p;
  }
  return ta(a.toString());
}
function za(a) {
  const { PAGES_DIR: n, BUILD_DIR: i, RESERVED_PAGES: e, I18N_CONFIG: s, CONFIG: o, IS_PRODUCTION: p } = w(), { locales: c, defaultLocale: t, pages: r, domains: d } = s || {}, u = o.trailingSlash ? "/" : "";
  if (!t || !c?.length)
    return {};
  const m = Wi(a), g = new URL(a.finalURL), [, v] = g.pathname.split("/"), b = g.pathname.replace(Ks, ""), l = { pagesRouter: q(n, e, m), rootRouter: q(i, undefined, m) };
  if (v !== m) {
    const { route: z } = l.pagesRouter.match(a), h = r?.[z?.name]?.[m] ?? b, [j, k] = Object.entries(d || {}).find(([, Q]) => Q.defaultLocale === m) ?? [], G = `/${m}${h}${u}${g.search}${g.hash}`, _ = j && (p || k?.dev) ? `${k?.protocol || "https"}://${j}${G}` : G;
    return { response: ta(_) };
  }
  const x = { ...s, get _messages() {
    return a.store.get("_messages");
  } };
  if (a.i18n = { defaultLocale: t, locales: c, locale: m, t: Xi(m, x), pages: r ?? {}, overrideMessages: (z) => {
    if (typeof z !== "function")
      return X({ messages: ["Error in overrideMessages", "overrideMessages requires a callback function"], docTitle: "Documentation about overrideMessages", docLink: "https://brisa.build/building-your-application/routing/internationalization#override-translations-in-web-components", req: a });
    const h = z(s?.messages?.[m]), j = (k) => a.store.set("_messages", k);
    if (h instanceof Promise)
      h.then(j);
    else
      j(h);
  } }, r)
    l.pagesRouter = Bi(r, l.pagesRouter);
  return l;
}
function Fi(a) {
  return JSON.stringify([..._a(a)]);
}
async function Hs(a) {
  const n = a.getReader();
  let i = "";
  while (true) {
    const { done: e, value: s } = await n.read();
    if (e)
      break;
    i += Ls(s);
  }
  return i;
}
function Ls(a) {
  if (typeof a === "string")
    return a;
  else
    return new TextDecoder().decode(a, { stream: true });
}
function ai(a) {
  const n = Bun.serve(a);
  return globalThis.brisaServer = n, { port: n.port, hostname: n.hostname, server: n };
}
function C({ originalRequest: a, route: n, store: i, webStore: e, i18n: s, finalURL: o, id: p }) {
  return a.finalURL = o ?? a.finalURL ?? a.url, a.route = n ?? a.route, a.store = i ?? a.store ?? new Map, a.webStore = e ?? a.webStore ?? new Map, a.store.transferToClient = (c, t) => {
    for (let r of c)
      a.webStore.set(r, t);
  }, a.useContext = (c) => {
    const r = a.store.get(ua)?.get(c.id), d = c.defaultValue;
    if (!r)
      return { value: d };
    const u = r.get(r.get(R));
    if (!u || u.isProviderPaused())
      return { value: d };
    return { value: u.value ?? d };
  }, a.id = p ?? a.id, a.ws = globalThis.sockets?.get(a.id) ?? null, globalThis.sockets?.delete(a.id), a.i18n = a.i18n ?? s ?? { defaultLocale: "", locales: [], locale: "", t: () => "", overrideMessages: () => {
  }, pages: {} }, a.indicate = (c) => ({ id: `__ind:${c}`, value: false, error: {} }), a._style = "", a._globalStyle = "", a.css = (c, ...t) => {
    const r = String.raw(c, ...t);
    a._style += r, a._globalStyle += r;
  }, a.renderInitiator ??= L.INITIAL_REQUEST, a;
}
function Ki(a, n) {
  if (a.name === "ERR_DLOPEN_FAILED") {
    X({ messages: ["ERR_DLOPEN_FAILED", "", "If you use FFI you must create a prebuild folder with the compiled files in there.", "All these prebuild files will be accessible from the build itself (build/prebuild).", "", "Example:", "", "path.join(Bun.env.BRISA_BUILD_FOLDER, 'prebuild', `libadd.${suffix}`)"], docTitle: "Documentation about FFI", docLink: "https://brisa.build/building-your-application/configuring/zig-rust-c-files", req: n });
    return;
  }
  X({ messages: [a.stack?.toString?.() ?? a.message, ""], req: n });
}
import {join as En} from "node:path";
function Gs(a) {
  return a.split("_").at(0) + ".js";
}
async function Hi(a) {
  const { transferClientStoreToServer: n, formData: i, body: e } = await Wa(a), { BUILD_DIR: s } = w(), o = new URL(a.url), p = a.headers.get("x-action") ?? o.searchParams.get("_aid") ?? "", c = a.headers.get("x-actions") ?? "[]", t = Gs(p), r = await import(D(En(s, "actions", t)));
  let d = false;
  const u = { action: a.url, autocomplete: "on", enctype: "multipart/form-data", encoding: "multipart/form-data", method: "post", elements: {}, reset: () => {
    d = true;
  } };
  let m = i ? [{ isTrusted: true, bubbles: false, cancelBubble: false, cancelable: false, composed: false, currentTarget: u, defaultPrevented: true, eventPhase: 0, formData: i, returnValue: true, srcElement: null, target: u, timeStamp: 0, type: "formdata" }] : e?.args ?? [];
  if (typeof m[0] === "object" && "isTrusted" in m[0] && "detail" in m[0] && m[0]._wc)
    m = m[0].detail;
  n();
  const v = [], b = [], l = c ? jn(c) : [];
  let x = {};
  a.store.set(`__params:${p}`, m), a.store.set(Vs, l);
  for (let Q = l.length - 1;Q >= 0; Q -= 1)
    x = z(l[Q], x);
  function z(Q, M = {}) {
    const f = {};
    for (let [Y, B] of Q)
      f[Y] = async (...F) => {
        const { promise: y, resolve: U, reject: T } = Promise.withResolvers();
        v.push([B, y]);
        const W = B.split("_").at(0), K = W === t ? r[B] : (await import(D(En(s, "actions", W))))[B];
        a.store.set(`__params:${B}`, F);
        try {
          const J = await K(M, a);
          if (J instanceof Response)
            b.push(J);
          return v.pop(), U(J), J;
        } catch (J) {
          T(J);
        }
      };
    return f;
  }
  if (!r[p])
    return X({ messages: [`The action ${p} was not found.`, "Don't worry, it's not your fault. Probably a bug in Brisa."], docTitle: "Please report it", docLink: "https://github.com/brisa-build/brisa/issues/new", req: a }), new Response(Fi(a), { status: 404, headers: { "content-type": "application/json" } });
  const { promise: h, resolve: j } = Promise.withResolvers();
  v.push([p, h]), a._p = (Q) => {
    if (Q instanceof Promise)
      v.push(["", Q]);
    return Q;
  }, a._waitActionCallPromises = (Q) => {
    const M = v.findIndex(([f]) => f === Q);
    return Promise.all(v.slice(M + 1).map(([, f]) => f));
  }, a._originalActionId = p;
  let k = await r[p](x, a);
  const G = k instanceof Response;
  if (j(k), !G && b.length > 0)
    k = b[0];
  if (!(k instanceof Response))
    k = new Response(Fi(a), { headers: { "content-type": "application/json" } });
  const _ = await (a.route ? await import(D(a.route.filePath)) : {}).responseHeaders?.(a, k.status) ?? {};
  for (let [Q, M] of Object.entries(_))
    k.headers.set(Q, M);
  if (d)
    k.headers.set("X-Reset", "1");
  return k;
}
function Gi(a) {
  const n = Vi.default.lookup(a) || "application/octet-stream", i = Vi.default.charset(n), e = i ? `;charset=${i.toLowerCase()}` : "";
  return n + e;
}
async function Ha() {
  qs();
  const { IS_PRODUCTION: a, IS_DEVELOPMENT: n, PAGE_404: i, PAGE_500: e, RESERVED_PAGES: s, BUILD_DIR: o, PORT: p, PAGES_DIR: c, ASSETS_DIR: t, CONFIG: r, JS_RUNTIME: d, LOG_PREFIX: u, HEADERS: { CACHE_CONTROL: m } } = w();
  if (a && !Ai.existsSync(o))
    return console.log(u.ERROR, 'Not exist "build" yet. Please run "brisa build" first'), null;
  if (!Ai.existsSync(c)) {
    const f = a ? "build/pages" : "src/pages", Y = a ? "brisa start" : "brisa dev";
    return console.log(u.ERROR, `Not exist ${f}" directory. It\'s required to run "${Y}"`), null;
  }
  let g = q(c, s), v = q(o);
  const b = "hot-reload", l = "/_brisa/pages/", x = na("websocket", o), z = x ? await import(x) : null, h = g.reservedRoutes[i], k = (await O("middleware", o))?.default, G = r?.tls, ia = r?.basePath ?? "";
  return { port: p, development: !a, async fetch(f, Y) {
    const B = _i.randomUUID(), F = z?.attach ? await z.attach(f) ?? {} : {};
    if (Y.upgrade(f, { data: { id: B, ...F } }))
      return;
    const y = C({ originalRequest: f, id: B }), U = new URL(y.finalURL);
    if (n && U.pathname === "/__brisa_dev_file__" && f.method === "POST") {
      if (d !== "bun")
        return new Response(null, { status: 404 });
      let Z = U.searchParams.get("file");
      const E = U.searchParams.get("line"), Ua = U.searchParams.get("column"), La = P.sep + "_brisa" + P.sep + "pages";
      if (Z?.startsWith(La))
        Z = P.join(o, Z.replace(La, P.sep + "pages-client"));
      if (Z && E != null && Ua != null)
        return Bun.openInEditor(Z, { line: +E, column: +Ua }), new Response(null, { status: 200 });
    }
    if (U.searchParams.get("_not-found") || !U.pathname.startsWith(ia))
      return M(y);
    if (ia)
      y.finalURL = gi(y.finalURL), U.pathname = gi(U.pathname);
    const T = U.pathname.startsWith(l), W = U.pathname === "/", K = P.join(t, U.pathname), J = !W && Ai.existsSync(K), H = J ? {} : za(y);
    if (T) {
      const Z = P.join(o, "pages-client", U.pathname.replace(l, ""));
      return Q(Z, y);
    }
    const N = () => {
      return g.match(y).route || v.match(y).route;
    };
    if (H.response)
      return N() ? H.response : M(y);
    if (H.pagesRouter && H.rootRouter)
      g = H.pagesRouter, v = H.rootRouter;
    if (!J) {
      const Z = ya(y);
      if (Z)
        return N() ? Z : M(y);
    }
    return y.getIP = () => Y.requestIP(f), _(y, { isAnAsset: J }).catch((Z) => {
      if (va(Z))
        return M(y);
      if (ba(Z))
        return Nn(new URL(Z.message, U.origin), y);
      Ki(Z, y);
      const E = g.reservedRoutes[e];
      if (!E)
        throw Z;
      return y.route = E, ka({ req: y, route: E, status: 500, error: Z });
    });
  }, tls: G, websocket: { open: (f) => {
    if (!globalThis.sockets)
      globalThis.sockets = new Map;
    const { id: Y } = f.data;
    if (globalThis.sockets.set(Y, f), !a)
      f.subscribe(b);
    z?.open?.(f);
  }, close: (f) => {
    const { id: Y } = f.data;
    if (globalThis.sockets?.delete?.(Y), !a)
      f.unsubscribe(b);
    z?.close?.(f);
  }, message: (f, Y) => {
    z?.message?.(f, Y);
  }, drain: (f) => {
    z?.drain?.(f);
  } } };
  async function _(f, { isAnAsset: Y }) {
    const B = f.i18n.locale, F = new URL(f.finalURL), y = F.pathname, { route: U, isReservedPathname: T } = g.match(f), W = y.startsWith(B ? `/${B}/api/` : "/api/"), K = W ? v.match(f) : null;
    if (f.route = W ? K?.route : U, k) {
      const J = await Promise.resolve().then(() => k(f));
      if (J)
        return J;
    }
    if (Y) {
      const J = P.join(t, F.pathname);
      return Q(J, f);
    }
    if (!W && U && !T) {
      if (f.method === "POST") {
        if (!F.searchParams.has("_aid"))
          f.store.set(xi, true);
        if (f.headers.has("x-action"))
          return f.renderInitiator = L.SERVER_ACTION, Hi(f);
        f.renderInitiator = L.SPA_NAVIGATION;
      }
      return ka({ req: f, route: U });
    }
    if (W && K?.route && !K?.isReservedPathname) {
      const J = await import(D(K.route.filePath)), H = f.method.toUpperCase(), N = J[H]?.(f);
      if (N)
        return N;
    }
    return M(f);
  }
  function Q(f, Y) {
    const B = Y.headers.get("accept-encoding") || "", F = a && r.assetCompression;
    let y = "";
    if (F && B.includes("br"))
      y = "br";
    else if (F && B.includes("gzip"))
      y = "gz";
    const U = { headers: { "content-type": Gi(f), "cache-control": m, ...y ? { "content-encoding": y === "br" ? "br" : "gzip", vary: "Accept-Encoding" } : {} } };
    return new Response(y ? ja(`${f}.${y}`) : ja(f), U);
  }
  function M(f) {
    if (!h)
      return new Response("Not found", { status: 404, headers: { "cache-control": m } });
    return f.route = h, ka({ req: f, route: h, status: 404 });
  }
}
function qs(a = Boolean(aa.argv[1].includes(P.join("brisa", "out", "cli", "serve", "index.js")))) {
  if (!a) {
    if (!aa.env.__CRYPTO_KEY__)
      aa.env.__CRYPTO_KEY__ = _i.randomBytes(32).toString("hex");
    if (!aa.env.__CRYPTO_IV__)
      aa.env.__CRYPTO_IV__ = _i.randomBytes(8).toString("hex");
  }
  if (!aa.env.BRISA_BUILD_FOLDER)
    aa.env.BRISA_BUILD_FOLDER = P.join(aa.cwd(), "build");
}
import so from "node:https";
import oo from "node:http";
function Ni(a) {
  if (Array.isArray(a))
    return a;
  if (typeof a !== "string")
    return [];
  let n = [], i = 0, e, s, o, p, c;
  function t() {
    while (i < a.length && /\s/.test(a.charAt(i)))
      i += 1;
    return i < a.length;
  }
  function r() {
    return s = a.charAt(i), s !== "=" && s !== ";" && s !== ",";
  }
  while (i < a.length) {
    e = i, c = false;
    while (t())
      if (s = a.charAt(i), s === ",") {
        o = i, i += 1, t(), p = i;
        while (i < a.length && r())
          i += 1;
        if (i < a.length && a.charAt(i) === "=")
          c = true, i = p, n.push(a.substring(e, o)), e = i;
        else
          i = o + 1;
      } else
        i += 1;
    if (!c || i >= a.length)
      n.push(a.substring(e, a.length));
  }
  return n;
}
function io(a) {
  const n = a.headers;
  if (!n["content-type"])
    return null;
  const i = Number(n["content-length"]);
  if (a.httpVersionMajor === 1 && isNaN(i) && n["transfer-encoding"] == null || i === 0)
    return null;
  if (a.destroyed) {
    const s = new ReadableStream;
    return s.cancel(), s;
  }
  let e = false;
  return new ReadableStream({ start(s) {
    a.on("error", (o) => {
      e = true, s.error(o);
    }), a.on("end", () => {
      if (e)
        return;
      s.close();
    }), a.on("data", (o) => {
      if (e)
        return;
      if (s.enqueue(o), s.desiredSize === null || s.desiredSize <= 0)
        a.pause();
    });
  }, pull() {
    a.resume();
  }, cancel(s) {
    e = true, a.destroy(s);
  } });
}
async function no({ request: a, base: n }) {
  return new Request(n + a.url, { duplex: "half", method: a.method, headers: a.headers, body: io(a) });
}
async function eo(a, n) {
  for (let [o, p] of n.headers)
    try {
      a.setHeader(o, o === "set-cookie" ? Ni(p) : p);
    } catch (c) {
      console.log({ error: c }), a.getHeaderNames().forEach((t) => a.removeHeader(t)), a.writeHead(500).end(String(c));
      return;
    }
  if (a.writeHead(n.status), !n.body) {
    a.end();
    return;
  }
  if (n.body.locked) {
    a.write("Fatal error: Response body is locked. This can happen when the response was already read (for example through 'response.json()' or 'response.text()')."), a.end();
    return;
  }
  const i = n.body.getReader();
  if (a.destroyed) {
    i.cancel();
    return;
  }
  const e = (o) => {
    if (a.off("close", e), a.off("error", e), i.cancel(o).catch(() => {
    }), o)
      a.destroy(o);
  };
  a.on("close", e), a.on("error", e), s();
  async function s() {
    try {
      for (;; ) {
        const { done: o, value: p } = await i.read();
        if (o)
          break;
        if (!a.write(p)) {
          a.once("drain", s);
          return;
        }
      }
      a.end();
    } catch (o) {
      e(o instanceof Error ? o : new Error(String(o)));
    }
  }
}
async function $a(a, n) {
  const i = { upgrade: () => {
  }, requestIP: () => a.socket.remoteAddress }, e = `${a.headers["x-forwarded-proto"] ?? "http"}://${a.headers.host}`, s = await no({ request: a, base: e }), o = await ao.fetch.call(i, s, i);
  await eo(n, o);
}
async function Ei({ port: a = V.PORT } = { port: V.PORT }) {
  const n = w().CONFIG?.tls, i = n ? so.createServer(n, $a) : oo.createServer($a);
  if (n && (!n.key || !n.cert))
    X({ messages: ["Missing key or certificate in TLS configuration."] });
  return i.listen(a), i.on("error", (e) => {
    X({ messages: [`Error starting ${n ? "https" : "http"} server in Node.js:`, e.message], stack: e.stack });
  }), { server: i, port: a, hostname: "localhost" };
}
async function ie(a) {
  if (Ja.isPrimary && V.CONFIG?.clustering) {
    console.log(S.INFO, `Clustering enabled with ${ae().length} cpus`);
    for (let i = 0;i < ae().length; i++)
      Ja.fork();
    let n = false;
    Ja.on("message", (i, e) => {
      if (n)
        return;
      n = true, console.log(S.INFO, e);
    }), Ja.on("exit", (i, e, s) => {
      console.log(S.ERROR, `Worker ${i.process.pid} exited`), console.log(S.ERROR, `Code: ${e}`), console.log(S.ERROR, `Signal: ${s}`), console.log(S.INFO, "Starting a new worker"), Ja.fork();
    });
    return;
  }
  try {
    const n = po ? Ei.bind(null, { port: Number(a.port) }) : ai.bind(null, a), { hostname: i, port: e } = await n(), s = `listening on http://${i}:${e}`;
    if (!V.CONFIG?.clustering)
      console.log(S.INFO, s);
    Ja.worker?.send(s);
  } catch (n) {
    const { message: i } = n;
    if (i?.includes(`Is port ${a.port} in use?`))
      console.log(S.ERROR, i), ie({ ...a, port: 0 });
    else
      console.error(S.ERROR, i ?? "Error on start server"), process.exit(1);
  }
}
function Di(a) {
  return (n) => {
    X({ messages: [`Oops! An ${a} occurred:`, "", ...n.message.split("\n").map(la), "", "This happened because there might be an unexpected issue in the code or an unforeseen situation.", "If the problem persists, please report this error to the Brisa team:", ra("\uD83D\uDD17 https://github.com/brisa-build/brisa/issues/new"), "Please don't worry, we are here to help.", "More details about the error:"], stack: n.stack });
  };
}
var ee = Object.create;
var { getPrototypeOf: se, defineProperty: Oi, getOwnPropertyNames: oe } = Object;
var ce = Object.prototype.hasOwnProperty;
var pe = (a, n, i) => {
  i = a != null ? ee(se(a)) : {};
  const e = n || !a || !a.__esModule ? Oi(i, "default", { value: a, enumerable: true }) : i;
  for (let s of oe(a))
    if (!ce.call(e, s))
      Oi(e, s, { get: () => a[s], enumerable: true });
  return e;
};
var ni = (a, n) => () => (n || a((n = { exports: {} }).exports, n), n.exports);
var re = te(import.meta.url);
var Dn = ni((wr, As) => {
  As.exports = { "application/1d-interleaved-parityfec": { source: "iana" }, "application/3gpdash-qoe-report+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/3gpp-ims+xml": { source: "iana", compressible: true }, "application/3gpphal+json": { source: "iana", compressible: true }, "application/3gpphalforms+json": { source: "iana", compressible: true }, "application/a2l": { source: "iana" }, "application/ace+cbor": { source: "iana" }, "application/activemessage": { source: "iana" }, "application/activity+json": { source: "iana", compressible: true }, "application/alto-costmap+json": { source: "iana", compressible: true }, "application/alto-costmapfilter+json": { source: "iana", compressible: true }, "application/alto-directory+json": { source: "iana", compressible: true }, "application/alto-endpointcost+json": { source: "iana", compressible: true }, "application/alto-endpointcostparams+json": { source: "iana", compressible: true }, "application/alto-endpointprop+json": { source: "iana", compressible: true }, "application/alto-endpointpropparams+json": { source: "iana", compressible: true }, "application/alto-error+json": { source: "iana", compressible: true }, "application/alto-networkmap+json": { source: "iana", compressible: true }, "application/alto-networkmapfilter+json": { source: "iana", compressible: true }, "application/alto-updatestreamcontrol+json": { source: "iana", compressible: true }, "application/alto-updatestreamparams+json": { source: "iana", compressible: true }, "application/aml": { source: "iana" }, "application/andrew-inset": { source: "iana", extensions: ["ez"] }, "application/applefile": { source: "iana" }, "application/applixware": { source: "apache", extensions: ["aw"] }, "application/at+jwt": { source: "iana" }, "application/atf": { source: "iana" }, "application/atfx": { source: "iana" }, "application/atom+xml": { source: "iana", compressible: true, extensions: ["atom"] }, "application/atomcat+xml": { source: "iana", compressible: true, extensions: ["atomcat"] }, "application/atomdeleted+xml": { source: "iana", compressible: true, extensions: ["atomdeleted"] }, "application/atomicmail": { source: "iana" }, "application/atomsvc+xml": { source: "iana", compressible: true, extensions: ["atomsvc"] }, "application/atsc-dwd+xml": { source: "iana", compressible: true, extensions: ["dwd"] }, "application/atsc-dynamic-event-message": { source: "iana" }, "application/atsc-held+xml": { source: "iana", compressible: true, extensions: ["held"] }, "application/atsc-rdt+json": { source: "iana", compressible: true }, "application/atsc-rsat+xml": { source: "iana", compressible: true, extensions: ["rsat"] }, "application/atxml": { source: "iana" }, "application/auth-policy+xml": { source: "iana", compressible: true }, "application/bacnet-xdd+zip": { source: "iana", compressible: false }, "application/batch-smtp": { source: "iana" }, "application/bdoc": { compressible: false, extensions: ["bdoc"] }, "application/beep+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/calendar+json": { source: "iana", compressible: true }, "application/calendar+xml": { source: "iana", compressible: true, extensions: ["xcs"] }, "application/call-completion": { source: "iana" }, "application/cals-1840": { source: "iana" }, "application/captive+json": { source: "iana", compressible: true }, "application/cbor": { source: "iana" }, "application/cbor-seq": { source: "iana" }, "application/cccex": { source: "iana" }, "application/ccmp+xml": { source: "iana", compressible: true }, "application/ccxml+xml": { source: "iana", compressible: true, extensions: ["ccxml"] }, "application/cdfx+xml": { source: "iana", compressible: true, extensions: ["cdfx"] }, "application/cdmi-capability": { source: "iana", extensions: ["cdmia"] }, "application/cdmi-container": { source: "iana", extensions: ["cdmic"] }, "application/cdmi-domain": { source: "iana", extensions: ["cdmid"] }, "application/cdmi-object": { source: "iana", extensions: ["cdmio"] }, "application/cdmi-queue": { source: "iana", extensions: ["cdmiq"] }, "application/cdni": { source: "iana" }, "application/cea": { source: "iana" }, "application/cea-2018+xml": { source: "iana", compressible: true }, "application/cellml+xml": { source: "iana", compressible: true }, "application/cfw": { source: "iana" }, "application/city+json": { source: "iana", compressible: true }, "application/clr": { source: "iana" }, "application/clue+xml": { source: "iana", compressible: true }, "application/clue_info+xml": { source: "iana", compressible: true }, "application/cms": { source: "iana" }, "application/cnrp+xml": { source: "iana", compressible: true }, "application/coap-group+json": { source: "iana", compressible: true }, "application/coap-payload": { source: "iana" }, "application/commonground": { source: "iana" }, "application/conference-info+xml": { source: "iana", compressible: true }, "application/cose": { source: "iana" }, "application/cose-key": { source: "iana" }, "application/cose-key-set": { source: "iana" }, "application/cpl+xml": { source: "iana", compressible: true, extensions: ["cpl"] }, "application/csrattrs": { source: "iana" }, "application/csta+xml": { source: "iana", compressible: true }, "application/cstadata+xml": { source: "iana", compressible: true }, "application/csvm+json": { source: "iana", compressible: true }, "application/cu-seeme": { source: "apache", extensions: ["cu"] }, "application/cwt": { source: "iana" }, "application/cybercash": { source: "iana" }, "application/dart": { compressible: true }, "application/dash+xml": { source: "iana", compressible: true, extensions: ["mpd"] }, "application/dash-patch+xml": { source: "iana", compressible: true, extensions: ["mpp"] }, "application/dashdelta": { source: "iana" }, "application/davmount+xml": { source: "iana", compressible: true, extensions: ["davmount"] }, "application/dca-rft": { source: "iana" }, "application/dcd": { source: "iana" }, "application/dec-dx": { source: "iana" }, "application/dialog-info+xml": { source: "iana", compressible: true }, "application/dicom": { source: "iana" }, "application/dicom+json": { source: "iana", compressible: true }, "application/dicom+xml": { source: "iana", compressible: true }, "application/dii": { source: "iana" }, "application/dit": { source: "iana" }, "application/dns": { source: "iana" }, "application/dns+json": { source: "iana", compressible: true }, "application/dns-message": { source: "iana" }, "application/docbook+xml": { source: "apache", compressible: true, extensions: ["dbk"] }, "application/dots+cbor": { source: "iana" }, "application/dskpp+xml": { source: "iana", compressible: true }, "application/dssc+der": { source: "iana", extensions: ["dssc"] }, "application/dssc+xml": { source: "iana", compressible: true, extensions: ["xdssc"] }, "application/dvcs": { source: "iana" }, "application/ecmascript": { source: "iana", compressible: true, extensions: ["es", "ecma"] }, "application/edi-consent": { source: "iana" }, "application/edi-x12": { source: "iana", compressible: false }, "application/edifact": { source: "iana", compressible: false }, "application/efi": { source: "iana" }, "application/elm+json": { source: "iana", charset: "UTF-8", compressible: true }, "application/elm+xml": { source: "iana", compressible: true }, "application/emergencycalldata.cap+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/emergencycalldata.comment+xml": { source: "iana", compressible: true }, "application/emergencycalldata.control+xml": { source: "iana", compressible: true }, "application/emergencycalldata.deviceinfo+xml": { source: "iana", compressible: true }, "application/emergencycalldata.ecall.msd": { source: "iana" }, "application/emergencycalldata.providerinfo+xml": { source: "iana", compressible: true }, "application/emergencycalldata.serviceinfo+xml": { source: "iana", compressible: true }, "application/emergencycalldata.subscriberinfo+xml": { source: "iana", compressible: true }, "application/emergencycalldata.veds+xml": { source: "iana", compressible: true }, "application/emma+xml": { source: "iana", compressible: true, extensions: ["emma"] }, "application/emotionml+xml": { source: "iana", compressible: true, extensions: ["emotionml"] }, "application/encaprtp": { source: "iana" }, "application/epp+xml": { source: "iana", compressible: true }, "application/epub+zip": { source: "iana", compressible: false, extensions: ["epub"] }, "application/eshop": { source: "iana" }, "application/exi": { source: "iana", extensions: ["exi"] }, "application/expect-ct-report+json": { source: "iana", compressible: true }, "application/express": { source: "iana", extensions: ["exp"] }, "application/fastinfoset": { source: "iana" }, "application/fastsoap": { source: "iana" }, "application/fdt+xml": { source: "iana", compressible: true, extensions: ["fdt"] }, "application/fhir+json": { source: "iana", charset: "UTF-8", compressible: true }, "application/fhir+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/fido.trusted-apps+json": { compressible: true }, "application/fits": { source: "iana" }, "application/flexfec": { source: "iana" }, "application/font-sfnt": { source: "iana" }, "application/font-tdpfr": { source: "iana", extensions: ["pfr"] }, "application/font-woff": { source: "iana", compressible: false }, "application/framework-attributes+xml": { source: "iana", compressible: true }, "application/geo+json": { source: "iana", compressible: true, extensions: ["geojson"] }, "application/geo+json-seq": { source: "iana" }, "application/geopackage+sqlite3": { source: "iana" }, "application/geoxacml+xml": { source: "iana", compressible: true }, "application/gltf-buffer": { source: "iana" }, "application/gml+xml": { source: "iana", compressible: true, extensions: ["gml"] }, "application/gpx+xml": { source: "apache", compressible: true, extensions: ["gpx"] }, "application/gxf": { source: "apache", extensions: ["gxf"] }, "application/gzip": { source: "iana", compressible: false, extensions: ["gz"] }, "application/h224": { source: "iana" }, "application/held+xml": { source: "iana", compressible: true }, "application/hjson": { extensions: ["hjson"] }, "application/http": { source: "iana" }, "application/hyperstudio": { source: "iana", extensions: ["stk"] }, "application/ibe-key-request+xml": { source: "iana", compressible: true }, "application/ibe-pkg-reply+xml": { source: "iana", compressible: true }, "application/ibe-pp-data": { source: "iana" }, "application/iges": { source: "iana" }, "application/im-iscomposing+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/index": { source: "iana" }, "application/index.cmd": { source: "iana" }, "application/index.obj": { source: "iana" }, "application/index.response": { source: "iana" }, "application/index.vnd": { source: "iana" }, "application/inkml+xml": { source: "iana", compressible: true, extensions: ["ink", "inkml"] }, "application/iotp": { source: "iana" }, "application/ipfix": { source: "iana", extensions: ["ipfix"] }, "application/ipp": { source: "iana" }, "application/isup": { source: "iana" }, "application/its+xml": { source: "iana", compressible: true, extensions: ["its"] }, "application/java-archive": { source: "apache", compressible: false, extensions: ["jar", "war", "ear"] }, "application/java-serialized-object": { source: "apache", compressible: false, extensions: ["ser"] }, "application/java-vm": { source: "apache", compressible: false, extensions: ["class"] }, "application/javascript": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["js", "mjs"] }, "application/jf2feed+json": { source: "iana", compressible: true }, "application/jose": { source: "iana" }, "application/jose+json": { source: "iana", compressible: true }, "application/jrd+json": { source: "iana", compressible: true }, "application/jscalendar+json": { source: "iana", compressible: true }, "application/json": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["json", "map"] }, "application/json-patch+json": { source: "iana", compressible: true }, "application/json-seq": { source: "iana" }, "application/json5": { extensions: ["json5"] }, "application/jsonml+json": { source: "apache", compressible: true, extensions: ["jsonml"] }, "application/jwk+json": { source: "iana", compressible: true }, "application/jwk-set+json": { source: "iana", compressible: true }, "application/jwt": { source: "iana" }, "application/kpml-request+xml": { source: "iana", compressible: true }, "application/kpml-response+xml": { source: "iana", compressible: true }, "application/ld+json": { source: "iana", compressible: true, extensions: ["jsonld"] }, "application/lgr+xml": { source: "iana", compressible: true, extensions: ["lgr"] }, "application/link-format": { source: "iana" }, "application/load-control+xml": { source: "iana", compressible: true }, "application/lost+xml": { source: "iana", compressible: true, extensions: ["lostxml"] }, "application/lostsync+xml": { source: "iana", compressible: true }, "application/lpf+zip": { source: "iana", compressible: false }, "application/lxf": { source: "iana" }, "application/mac-binhex40": { source: "iana", extensions: ["hqx"] }, "application/mac-compactpro": { source: "apache", extensions: ["cpt"] }, "application/macwriteii": { source: "iana" }, "application/mads+xml": { source: "iana", compressible: true, extensions: ["mads"] }, "application/manifest+json": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["webmanifest"] }, "application/marc": { source: "iana", extensions: ["mrc"] }, "application/marcxml+xml": { source: "iana", compressible: true, extensions: ["mrcx"] }, "application/mathematica": { source: "iana", extensions: ["ma", "nb", "mb"] }, "application/mathml+xml": { source: "iana", compressible: true, extensions: ["mathml"] }, "application/mathml-content+xml": { source: "iana", compressible: true }, "application/mathml-presentation+xml": { source: "iana", compressible: true }, "application/mbms-associated-procedure-description+xml": { source: "iana", compressible: true }, "application/mbms-deregister+xml": { source: "iana", compressible: true }, "application/mbms-envelope+xml": { source: "iana", compressible: true }, "application/mbms-msk+xml": { source: "iana", compressible: true }, "application/mbms-msk-response+xml": { source: "iana", compressible: true }, "application/mbms-protection-description+xml": { source: "iana", compressible: true }, "application/mbms-reception-report+xml": { source: "iana", compressible: true }, "application/mbms-register+xml": { source: "iana", compressible: true }, "application/mbms-register-response+xml": { source: "iana", compressible: true }, "application/mbms-schedule+xml": { source: "iana", compressible: true }, "application/mbms-user-service-description+xml": { source: "iana", compressible: true }, "application/mbox": { source: "iana", extensions: ["mbox"] }, "application/media-policy-dataset+xml": { source: "iana", compressible: true, extensions: ["mpf"] }, "application/media_control+xml": { source: "iana", compressible: true }, "application/mediaservercontrol+xml": { source: "iana", compressible: true, extensions: ["mscml"] }, "application/merge-patch+json": { source: "iana", compressible: true }, "application/metalink+xml": { source: "apache", compressible: true, extensions: ["metalink"] }, "application/metalink4+xml": { source: "iana", compressible: true, extensions: ["meta4"] }, "application/mets+xml": { source: "iana", compressible: true, extensions: ["mets"] }, "application/mf4": { source: "iana" }, "application/mikey": { source: "iana" }, "application/mipc": { source: "iana" }, "application/missing-blocks+cbor-seq": { source: "iana" }, "application/mmt-aei+xml": { source: "iana", compressible: true, extensions: ["maei"] }, "application/mmt-usd+xml": { source: "iana", compressible: true, extensions: ["musd"] }, "application/mods+xml": { source: "iana", compressible: true, extensions: ["mods"] }, "application/moss-keys": { source: "iana" }, "application/moss-signature": { source: "iana" }, "application/mosskey-data": { source: "iana" }, "application/mosskey-request": { source: "iana" }, "application/mp21": { source: "iana", extensions: ["m21", "mp21"] }, "application/mp4": { source: "iana", extensions: ["mp4s", "m4p"] }, "application/mpeg4-generic": { source: "iana" }, "application/mpeg4-iod": { source: "iana" }, "application/mpeg4-iod-xmt": { source: "iana" }, "application/mrb-consumer+xml": { source: "iana", compressible: true }, "application/mrb-publish+xml": { source: "iana", compressible: true }, "application/msc-ivr+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/msc-mixer+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/msword": { source: "iana", compressible: false, extensions: ["doc", "dot"] }, "application/mud+json": { source: "iana", compressible: true }, "application/multipart-core": { source: "iana" }, "application/mxf": { source: "iana", extensions: ["mxf"] }, "application/n-quads": { source: "iana", extensions: ["nq"] }, "application/n-triples": { source: "iana", extensions: ["nt"] }, "application/nasdata": { source: "iana" }, "application/news-checkgroups": { source: "iana", charset: "US-ASCII" }, "application/news-groupinfo": { source: "iana", charset: "US-ASCII" }, "application/news-transmission": { source: "iana" }, "application/nlsml+xml": { source: "iana", compressible: true }, "application/node": { source: "iana", extensions: ["cjs"] }, "application/nss": { source: "iana" }, "application/oauth-authz-req+jwt": { source: "iana" }, "application/oblivious-dns-message": { source: "iana" }, "application/ocsp-request": { source: "iana" }, "application/ocsp-response": { source: "iana" }, "application/octet-stream": { source: "iana", compressible: false, extensions: ["bin", "dms", "lrf", "mar", "so", "dist", "distz", "pkg", "bpk", "dump", "elc", "deploy", "exe", "dll", "deb", "dmg", "iso", "img", "msi", "msp", "msm", "buffer"] }, "application/oda": { source: "iana", extensions: ["oda"] }, "application/odm+xml": { source: "iana", compressible: true }, "application/odx": { source: "iana" }, "application/oebps-package+xml": { source: "iana", compressible: true, extensions: ["opf"] }, "application/ogg": { source: "iana", compressible: false, extensions: ["ogx"] }, "application/omdoc+xml": { source: "apache", compressible: true, extensions: ["omdoc"] }, "application/onenote": { source: "apache", extensions: ["onetoc", "onetoc2", "onetmp", "onepkg"] }, "application/opc-nodeset+xml": { source: "iana", compressible: true }, "application/oscore": { source: "iana" }, "application/oxps": { source: "iana", extensions: ["oxps"] }, "application/p21": { source: "iana" }, "application/p21+zip": { source: "iana", compressible: false }, "application/p2p-overlay+xml": { source: "iana", compressible: true, extensions: ["relo"] }, "application/parityfec": { source: "iana" }, "application/passport": { source: "iana" }, "application/patch-ops-error+xml": { source: "iana", compressible: true, extensions: ["xer"] }, "application/pdf": { source: "iana", compressible: false, extensions: ["pdf"] }, "application/pdx": { source: "iana" }, "application/pem-certificate-chain": { source: "iana" }, "application/pgp-encrypted": { source: "iana", compressible: false, extensions: ["pgp"] }, "application/pgp-keys": { source: "iana", extensions: ["asc"] }, "application/pgp-signature": { source: "iana", extensions: ["asc", "sig"] }, "application/pics-rules": { source: "apache", extensions: ["prf"] }, "application/pidf+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/pidf-diff+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/pkcs10": { source: "iana", extensions: ["p10"] }, "application/pkcs12": { source: "iana" }, "application/pkcs7-mime": { source: "iana", extensions: ["p7m", "p7c"] }, "application/pkcs7-signature": { source: "iana", extensions: ["p7s"] }, "application/pkcs8": { source: "iana", extensions: ["p8"] }, "application/pkcs8-encrypted": { source: "iana" }, "application/pkix-attr-cert": { source: "iana", extensions: ["ac"] }, "application/pkix-cert": { source: "iana", extensions: ["cer"] }, "application/pkix-crl": { source: "iana", extensions: ["crl"] }, "application/pkix-pkipath": { source: "iana", extensions: ["pkipath"] }, "application/pkixcmp": { source: "iana", extensions: ["pki"] }, "application/pls+xml": { source: "iana", compressible: true, extensions: ["pls"] }, "application/poc-settings+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/postscript": { source: "iana", compressible: true, extensions: ["ai", "eps", "ps"] }, "application/ppsp-tracker+json": { source: "iana", compressible: true }, "application/problem+json": { source: "iana", compressible: true }, "application/problem+xml": { source: "iana", compressible: true }, "application/provenance+xml": { source: "iana", compressible: true, extensions: ["provx"] }, "application/prs.alvestrand.titrax-sheet": { source: "iana" }, "application/prs.cww": { source: "iana", extensions: ["cww"] }, "application/prs.cyn": { source: "iana", charset: "7-BIT" }, "application/prs.hpub+zip": { source: "iana", compressible: false }, "application/prs.nprend": { source: "iana" }, "application/prs.plucker": { source: "iana" }, "application/prs.rdf-xml-crypt": { source: "iana" }, "application/prs.xsf+xml": { source: "iana", compressible: true }, "application/pskc+xml": { source: "iana", compressible: true, extensions: ["pskcxml"] }, "application/pvd+json": { source: "iana", compressible: true }, "application/qsig": { source: "iana" }, "application/raml+yaml": { compressible: true, extensions: ["raml"] }, "application/raptorfec": { source: "iana" }, "application/rdap+json": { source: "iana", compressible: true }, "application/rdf+xml": { source: "iana", compressible: true, extensions: ["rdf", "owl"] }, "application/reginfo+xml": { source: "iana", compressible: true, extensions: ["rif"] }, "application/relax-ng-compact-syntax": { source: "iana", extensions: ["rnc"] }, "application/remote-printing": { source: "iana" }, "application/reputon+json": { source: "iana", compressible: true }, "application/resource-lists+xml": { source: "iana", compressible: true, extensions: ["rl"] }, "application/resource-lists-diff+xml": { source: "iana", compressible: true, extensions: ["rld"] }, "application/rfc+xml": { source: "iana", compressible: true }, "application/riscos": { source: "iana" }, "application/rlmi+xml": { source: "iana", compressible: true }, "application/rls-services+xml": { source: "iana", compressible: true, extensions: ["rs"] }, "application/route-apd+xml": { source: "iana", compressible: true, extensions: ["rapd"] }, "application/route-s-tsid+xml": { source: "iana", compressible: true, extensions: ["sls"] }, "application/route-usd+xml": { source: "iana", compressible: true, extensions: ["rusd"] }, "application/rpki-ghostbusters": { source: "iana", extensions: ["gbr"] }, "application/rpki-manifest": { source: "iana", extensions: ["mft"] }, "application/rpki-publication": { source: "iana" }, "application/rpki-roa": { source: "iana", extensions: ["roa"] }, "application/rpki-updown": { source: "iana" }, "application/rsd+xml": { source: "apache", compressible: true, extensions: ["rsd"] }, "application/rss+xml": { source: "apache", compressible: true, extensions: ["rss"] }, "application/rtf": { source: "iana", compressible: true, extensions: ["rtf"] }, "application/rtploopback": { source: "iana" }, "application/rtx": { source: "iana" }, "application/samlassertion+xml": { source: "iana", compressible: true }, "application/samlmetadata+xml": { source: "iana", compressible: true }, "application/sarif+json": { source: "iana", compressible: true }, "application/sarif-external-properties+json": { source: "iana", compressible: true }, "application/sbe": { source: "iana" }, "application/sbml+xml": { source: "iana", compressible: true, extensions: ["sbml"] }, "application/scaip+xml": { source: "iana", compressible: true }, "application/scim+json": { source: "iana", compressible: true }, "application/scvp-cv-request": { source: "iana", extensions: ["scq"] }, "application/scvp-cv-response": { source: "iana", extensions: ["scs"] }, "application/scvp-vp-request": { source: "iana", extensions: ["spq"] }, "application/scvp-vp-response": { source: "iana", extensions: ["spp"] }, "application/sdp": { source: "iana", extensions: ["sdp"] }, "application/secevent+jwt": { source: "iana" }, "application/senml+cbor": { source: "iana" }, "application/senml+json": { source: "iana", compressible: true }, "application/senml+xml": { source: "iana", compressible: true, extensions: ["senmlx"] }, "application/senml-etch+cbor": { source: "iana" }, "application/senml-etch+json": { source: "iana", compressible: true }, "application/senml-exi": { source: "iana" }, "application/sensml+cbor": { source: "iana" }, "application/sensml+json": { source: "iana", compressible: true }, "application/sensml+xml": { source: "iana", compressible: true, extensions: ["sensmlx"] }, "application/sensml-exi": { source: "iana" }, "application/sep+xml": { source: "iana", compressible: true }, "application/sep-exi": { source: "iana" }, "application/session-info": { source: "iana" }, "application/set-payment": { source: "iana" }, "application/set-payment-initiation": { source: "iana", extensions: ["setpay"] }, "application/set-registration": { source: "iana" }, "application/set-registration-initiation": { source: "iana", extensions: ["setreg"] }, "application/sgml": { source: "iana" }, "application/sgml-open-catalog": { source: "iana" }, "application/shf+xml": { source: "iana", compressible: true, extensions: ["shf"] }, "application/sieve": { source: "iana", extensions: ["siv", "sieve"] }, "application/simple-filter+xml": { source: "iana", compressible: true }, "application/simple-message-summary": { source: "iana" }, "application/simplesymbolcontainer": { source: "iana" }, "application/sipc": { source: "iana" }, "application/slate": { source: "iana" }, "application/smil": { source: "iana" }, "application/smil+xml": { source: "iana", compressible: true, extensions: ["smi", "smil"] }, "application/smpte336m": { source: "iana" }, "application/soap+fastinfoset": { source: "iana" }, "application/soap+xml": { source: "iana", compressible: true }, "application/sparql-query": { source: "iana", extensions: ["rq"] }, "application/sparql-results+xml": { source: "iana", compressible: true, extensions: ["srx"] }, "application/spdx+json": { source: "iana", compressible: true }, "application/spirits-event+xml": { source: "iana", compressible: true }, "application/sql": { source: "iana" }, "application/srgs": { source: "iana", extensions: ["gram"] }, "application/srgs+xml": { source: "iana", compressible: true, extensions: ["grxml"] }, "application/sru+xml": { source: "iana", compressible: true, extensions: ["sru"] }, "application/ssdl+xml": { source: "apache", compressible: true, extensions: ["ssdl"] }, "application/ssml+xml": { source: "iana", compressible: true, extensions: ["ssml"] }, "application/stix+json": { source: "iana", compressible: true }, "application/swid+xml": { source: "iana", compressible: true, extensions: ["swidtag"] }, "application/tamp-apex-update": { source: "iana" }, "application/tamp-apex-update-confirm": { source: "iana" }, "application/tamp-community-update": { source: "iana" }, "application/tamp-community-update-confirm": { source: "iana" }, "application/tamp-error": { source: "iana" }, "application/tamp-sequence-adjust": { source: "iana" }, "application/tamp-sequence-adjust-confirm": { source: "iana" }, "application/tamp-status-query": { source: "iana" }, "application/tamp-status-response": { source: "iana" }, "application/tamp-update": { source: "iana" }, "application/tamp-update-confirm": { source: "iana" }, "application/tar": { compressible: true }, "application/taxii+json": { source: "iana", compressible: true }, "application/td+json": { source: "iana", compressible: true }, "application/tei+xml": { source: "iana", compressible: true, extensions: ["tei", "teicorpus"] }, "application/tetra_isi": { source: "iana" }, "application/thraud+xml": { source: "iana", compressible: true, extensions: ["tfi"] }, "application/timestamp-query": { source: "iana" }, "application/timestamp-reply": { source: "iana" }, "application/timestamped-data": { source: "iana", extensions: ["tsd"] }, "application/tlsrpt+gzip": { source: "iana" }, "application/tlsrpt+json": { source: "iana", compressible: true }, "application/tnauthlist": { source: "iana" }, "application/token-introspection+jwt": { source: "iana" }, "application/toml": { compressible: true, extensions: ["toml"] }, "application/trickle-ice-sdpfrag": { source: "iana" }, "application/trig": { source: "iana", extensions: ["trig"] }, "application/ttml+xml": { source: "iana", compressible: true, extensions: ["ttml"] }, "application/tve-trigger": { source: "iana" }, "application/tzif": { source: "iana" }, "application/tzif-leap": { source: "iana" }, "application/ubjson": { compressible: false, extensions: ["ubj"] }, "application/ulpfec": { source: "iana" }, "application/urc-grpsheet+xml": { source: "iana", compressible: true }, "application/urc-ressheet+xml": { source: "iana", compressible: true, extensions: ["rsheet"] }, "application/urc-targetdesc+xml": { source: "iana", compressible: true, extensions: ["td"] }, "application/urc-uisocketdesc+xml": { source: "iana", compressible: true }, "application/vcard+json": { source: "iana", compressible: true }, "application/vcard+xml": { source: "iana", compressible: true }, "application/vemmi": { source: "iana" }, "application/vividence.scriptfile": { source: "apache" }, "application/vnd.1000minds.decision-model+xml": { source: "iana", compressible: true, extensions: ["1km"] }, "application/vnd.3gpp-prose+xml": { source: "iana", compressible: true }, "application/vnd.3gpp-prose-pc3ch+xml": { source: "iana", compressible: true }, "application/vnd.3gpp-v2x-local-service-information": { source: "iana" }, "application/vnd.3gpp.5gnas": { source: "iana" }, "application/vnd.3gpp.access-transfer-events+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.bsf+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.gmop+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.gtpc": { source: "iana" }, "application/vnd.3gpp.interworking-data": { source: "iana" }, "application/vnd.3gpp.lpp": { source: "iana" }, "application/vnd.3gpp.mc-signalling-ear": { source: "iana" }, "application/vnd.3gpp.mcdata-affiliation-command+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcdata-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcdata-payload": { source: "iana" }, "application/vnd.3gpp.mcdata-service-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcdata-signalling": { source: "iana" }, "application/vnd.3gpp.mcdata-ue-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcdata-user-profile+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-affiliation-command+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-floor-request+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-location-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-mbms-usage-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-service-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-signed+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-ue-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-ue-init-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcptt-user-profile+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-affiliation-command+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-affiliation-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-location-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-service-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-transmission-request+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-ue-config+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mcvideo-user-profile+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.mid-call+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.ngap": { source: "iana" }, "application/vnd.3gpp.pfcp": { source: "iana" }, "application/vnd.3gpp.pic-bw-large": { source: "iana", extensions: ["plb"] }, "application/vnd.3gpp.pic-bw-small": { source: "iana", extensions: ["psb"] }, "application/vnd.3gpp.pic-bw-var": { source: "iana", extensions: ["pvb"] }, "application/vnd.3gpp.s1ap": { source: "iana" }, "application/vnd.3gpp.sms": { source: "iana" }, "application/vnd.3gpp.sms+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.srvcc-ext+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.srvcc-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.state-and-event-info+xml": { source: "iana", compressible: true }, "application/vnd.3gpp.ussd+xml": { source: "iana", compressible: true }, "application/vnd.3gpp2.bcmcsinfo+xml": { source: "iana", compressible: true }, "application/vnd.3gpp2.sms": { source: "iana" }, "application/vnd.3gpp2.tcap": { source: "iana", extensions: ["tcap"] }, "application/vnd.3lightssoftware.imagescal": { source: "iana" }, "application/vnd.3m.post-it-notes": { source: "iana", extensions: ["pwn"] }, "application/vnd.accpac.simply.aso": { source: "iana", extensions: ["aso"] }, "application/vnd.accpac.simply.imp": { source: "iana", extensions: ["imp"] }, "application/vnd.acucobol": { source: "iana", extensions: ["acu"] }, "application/vnd.acucorp": { source: "iana", extensions: ["atc", "acutc"] }, "application/vnd.adobe.air-application-installer-package+zip": { source: "apache", compressible: false, extensions: ["air"] }, "application/vnd.adobe.flash.movie": { source: "iana" }, "application/vnd.adobe.formscentral.fcdt": { source: "iana", extensions: ["fcdt"] }, "application/vnd.adobe.fxp": { source: "iana", extensions: ["fxp", "fxpl"] }, "application/vnd.adobe.partial-upload": { source: "iana" }, "application/vnd.adobe.xdp+xml": { source: "iana", compressible: true, extensions: ["xdp"] }, "application/vnd.adobe.xfdf": { source: "iana", extensions: ["xfdf"] }, "application/vnd.aether.imp": { source: "iana" }, "application/vnd.afpc.afplinedata": { source: "iana" }, "application/vnd.afpc.afplinedata-pagedef": { source: "iana" }, "application/vnd.afpc.cmoca-cmresource": { source: "iana" }, "application/vnd.afpc.foca-charset": { source: "iana" }, "application/vnd.afpc.foca-codedfont": { source: "iana" }, "application/vnd.afpc.foca-codepage": { source: "iana" }, "application/vnd.afpc.modca": { source: "iana" }, "application/vnd.afpc.modca-cmtable": { source: "iana" }, "application/vnd.afpc.modca-formdef": { source: "iana" }, "application/vnd.afpc.modca-mediummap": { source: "iana" }, "application/vnd.afpc.modca-objectcontainer": { source: "iana" }, "application/vnd.afpc.modca-overlay": { source: "iana" }, "application/vnd.afpc.modca-pagesegment": { source: "iana" }, "application/vnd.age": { source: "iana", extensions: ["age"] }, "application/vnd.ah-barcode": { source: "iana" }, "application/vnd.ahead.space": { source: "iana", extensions: ["ahead"] }, "application/vnd.airzip.filesecure.azf": { source: "iana", extensions: ["azf"] }, "application/vnd.airzip.filesecure.azs": { source: "iana", extensions: ["azs"] }, "application/vnd.amadeus+json": { source: "iana", compressible: true }, "application/vnd.amazon.ebook": { source: "apache", extensions: ["azw"] }, "application/vnd.amazon.mobi8-ebook": { source: "iana" }, "application/vnd.americandynamics.acc": { source: "iana", extensions: ["acc"] }, "application/vnd.amiga.ami": { source: "iana", extensions: ["ami"] }, "application/vnd.amundsen.maze+xml": { source: "iana", compressible: true }, "application/vnd.android.ota": { source: "iana" }, "application/vnd.android.package-archive": { source: "apache", compressible: false, extensions: ["apk"] }, "application/vnd.anki": { source: "iana" }, "application/vnd.anser-web-certificate-issue-initiation": { source: "iana", extensions: ["cii"] }, "application/vnd.anser-web-funds-transfer-initiation": { source: "apache", extensions: ["fti"] }, "application/vnd.antix.game-component": { source: "iana", extensions: ["atx"] }, "application/vnd.apache.arrow.file": { source: "iana" }, "application/vnd.apache.arrow.stream": { source: "iana" }, "application/vnd.apache.thrift.binary": { source: "iana" }, "application/vnd.apache.thrift.compact": { source: "iana" }, "application/vnd.apache.thrift.json": { source: "iana" }, "application/vnd.api+json": { source: "iana", compressible: true }, "application/vnd.aplextor.warrp+json": { source: "iana", compressible: true }, "application/vnd.apothekende.reservation+json": { source: "iana", compressible: true }, "application/vnd.apple.installer+xml": { source: "iana", compressible: true, extensions: ["mpkg"] }, "application/vnd.apple.keynote": { source: "iana", extensions: ["key"] }, "application/vnd.apple.mpegurl": { source: "iana", extensions: ["m3u8"] }, "application/vnd.apple.numbers": { source: "iana", extensions: ["numbers"] }, "application/vnd.apple.pages": { source: "iana", extensions: ["pages"] }, "application/vnd.apple.pkpass": { compressible: false, extensions: ["pkpass"] }, "application/vnd.arastra.swi": { source: "iana" }, "application/vnd.aristanetworks.swi": { source: "iana", extensions: ["swi"] }, "application/vnd.artisan+json": { source: "iana", compressible: true }, "application/vnd.artsquare": { source: "iana" }, "application/vnd.astraea-software.iota": { source: "iana", extensions: ["iota"] }, "application/vnd.audiograph": { source: "iana", extensions: ["aep"] }, "application/vnd.autopackage": { source: "iana" }, "application/vnd.avalon+json": { source: "iana", compressible: true }, "application/vnd.avistar+xml": { source: "iana", compressible: true }, "application/vnd.balsamiq.bmml+xml": { source: "iana", compressible: true, extensions: ["bmml"] }, "application/vnd.balsamiq.bmpr": { source: "iana" }, "application/vnd.banana-accounting": { source: "iana" }, "application/vnd.bbf.usp.error": { source: "iana" }, "application/vnd.bbf.usp.msg": { source: "iana" }, "application/vnd.bbf.usp.msg+json": { source: "iana", compressible: true }, "application/vnd.bekitzur-stech+json": { source: "iana", compressible: true }, "application/vnd.bint.med-content": { source: "iana" }, "application/vnd.biopax.rdf+xml": { source: "iana", compressible: true }, "application/vnd.blink-idb-value-wrapper": { source: "iana" }, "application/vnd.blueice.multipass": { source: "iana", extensions: ["mpm"] }, "application/vnd.bluetooth.ep.oob": { source: "iana" }, "application/vnd.bluetooth.le.oob": { source: "iana" }, "application/vnd.bmi": { source: "iana", extensions: ["bmi"] }, "application/vnd.bpf": { source: "iana" }, "application/vnd.bpf3": { source: "iana" }, "application/vnd.businessobjects": { source: "iana", extensions: ["rep"] }, "application/vnd.byu.uapi+json": { source: "iana", compressible: true }, "application/vnd.cab-jscript": { source: "iana" }, "application/vnd.canon-cpdl": { source: "iana" }, "application/vnd.canon-lips": { source: "iana" }, "application/vnd.capasystems-pg+json": { source: "iana", compressible: true }, "application/vnd.cendio.thinlinc.clientconf": { source: "iana" }, "application/vnd.century-systems.tcp_stream": { source: "iana" }, "application/vnd.chemdraw+xml": { source: "iana", compressible: true, extensions: ["cdxml"] }, "application/vnd.chess-pgn": { source: "iana" }, "application/vnd.chipnuts.karaoke-mmd": { source: "iana", extensions: ["mmd"] }, "application/vnd.ciedi": { source: "iana" }, "application/vnd.cinderella": { source: "iana", extensions: ["cdy"] }, "application/vnd.cirpack.isdn-ext": { source: "iana" }, "application/vnd.citationstyles.style+xml": { source: "iana", compressible: true, extensions: ["csl"] }, "application/vnd.claymore": { source: "iana", extensions: ["cla"] }, "application/vnd.cloanto.rp9": { source: "iana", extensions: ["rp9"] }, "application/vnd.clonk.c4group": { source: "iana", extensions: ["c4g", "c4d", "c4f", "c4p", "c4u"] }, "application/vnd.cluetrust.cartomobile-config": { source: "iana", extensions: ["c11amc"] }, "application/vnd.cluetrust.cartomobile-config-pkg": { source: "iana", extensions: ["c11amz"] }, "application/vnd.coffeescript": { source: "iana" }, "application/vnd.collabio.xodocuments.document": { source: "iana" }, "application/vnd.collabio.xodocuments.document-template": { source: "iana" }, "application/vnd.collabio.xodocuments.presentation": { source: "iana" }, "application/vnd.collabio.xodocuments.presentation-template": { source: "iana" }, "application/vnd.collabio.xodocuments.spreadsheet": { source: "iana" }, "application/vnd.collabio.xodocuments.spreadsheet-template": { source: "iana" }, "application/vnd.collection+json": { source: "iana", compressible: true }, "application/vnd.collection.doc+json": { source: "iana", compressible: true }, "application/vnd.collection.next+json": { source: "iana", compressible: true }, "application/vnd.comicbook+zip": { source: "iana", compressible: false }, "application/vnd.comicbook-rar": { source: "iana" }, "application/vnd.commerce-battelle": { source: "iana" }, "application/vnd.commonspace": { source: "iana", extensions: ["csp"] }, "application/vnd.contact.cmsg": { source: "iana", extensions: ["cdbcmsg"] }, "application/vnd.coreos.ignition+json": { source: "iana", compressible: true }, "application/vnd.cosmocaller": { source: "iana", extensions: ["cmc"] }, "application/vnd.crick.clicker": { source: "iana", extensions: ["clkx"] }, "application/vnd.crick.clicker.keyboard": { source: "iana", extensions: ["clkk"] }, "application/vnd.crick.clicker.palette": { source: "iana", extensions: ["clkp"] }, "application/vnd.crick.clicker.template": { source: "iana", extensions: ["clkt"] }, "application/vnd.crick.clicker.wordbank": { source: "iana", extensions: ["clkw"] }, "application/vnd.criticaltools.wbs+xml": { source: "iana", compressible: true, extensions: ["wbs"] }, "application/vnd.cryptii.pipe+json": { source: "iana", compressible: true }, "application/vnd.crypto-shade-file": { source: "iana" }, "application/vnd.cryptomator.encrypted": { source: "iana" }, "application/vnd.cryptomator.vault": { source: "iana" }, "application/vnd.ctc-posml": { source: "iana", extensions: ["pml"] }, "application/vnd.ctct.ws+xml": { source: "iana", compressible: true }, "application/vnd.cups-pdf": { source: "iana" }, "application/vnd.cups-postscript": { source: "iana" }, "application/vnd.cups-ppd": { source: "iana", extensions: ["ppd"] }, "application/vnd.cups-raster": { source: "iana" }, "application/vnd.cups-raw": { source: "iana" }, "application/vnd.curl": { source: "iana" }, "application/vnd.curl.car": { source: "apache", extensions: ["car"] }, "application/vnd.curl.pcurl": { source: "apache", extensions: ["pcurl"] }, "application/vnd.cyan.dean.root+xml": { source: "iana", compressible: true }, "application/vnd.cybank": { source: "iana" }, "application/vnd.cyclonedx+json": { source: "iana", compressible: true }, "application/vnd.cyclonedx+xml": { source: "iana", compressible: true }, "application/vnd.d2l.coursepackage1p0+zip": { source: "iana", compressible: false }, "application/vnd.d3m-dataset": { source: "iana" }, "application/vnd.d3m-problem": { source: "iana" }, "application/vnd.dart": { source: "iana", compressible: true, extensions: ["dart"] }, "application/vnd.data-vision.rdz": { source: "iana", extensions: ["rdz"] }, "application/vnd.datapackage+json": { source: "iana", compressible: true }, "application/vnd.dataresource+json": { source: "iana", compressible: true }, "application/vnd.dbf": { source: "iana", extensions: ["dbf"] }, "application/vnd.debian.binary-package": { source: "iana" }, "application/vnd.dece.data": { source: "iana", extensions: ["uvf", "uvvf", "uvd", "uvvd"] }, "application/vnd.dece.ttml+xml": { source: "iana", compressible: true, extensions: ["uvt", "uvvt"] }, "application/vnd.dece.unspecified": { source: "iana", extensions: ["uvx", "uvvx"] }, "application/vnd.dece.zip": { source: "iana", extensions: ["uvz", "uvvz"] }, "application/vnd.denovo.fcselayout-link": { source: "iana", extensions: ["fe_launch"] }, "application/vnd.desmume.movie": { source: "iana" }, "application/vnd.dir-bi.plate-dl-nosuffix": { source: "iana" }, "application/vnd.dm.delegation+xml": { source: "iana", compressible: true }, "application/vnd.dna": { source: "iana", extensions: ["dna"] }, "application/vnd.document+json": { source: "iana", compressible: true }, "application/vnd.dolby.mlp": { source: "apache", extensions: ["mlp"] }, "application/vnd.dolby.mobile.1": { source: "iana" }, "application/vnd.dolby.mobile.2": { source: "iana" }, "application/vnd.doremir.scorecloud-binary-document": { source: "iana" }, "application/vnd.dpgraph": { source: "iana", extensions: ["dpg"] }, "application/vnd.dreamfactory": { source: "iana", extensions: ["dfac"] }, "application/vnd.drive+json": { source: "iana", compressible: true }, "application/vnd.ds-keypoint": { source: "apache", extensions: ["kpxx"] }, "application/vnd.dtg.local": { source: "iana" }, "application/vnd.dtg.local.flash": { source: "iana" }, "application/vnd.dtg.local.html": { source: "iana" }, "application/vnd.dvb.ait": { source: "iana", extensions: ["ait"] }, "application/vnd.dvb.dvbisl+xml": { source: "iana", compressible: true }, "application/vnd.dvb.dvbj": { source: "iana" }, "application/vnd.dvb.esgcontainer": { source: "iana" }, "application/vnd.dvb.ipdcdftnotifaccess": { source: "iana" }, "application/vnd.dvb.ipdcesgaccess": { source: "iana" }, "application/vnd.dvb.ipdcesgaccess2": { source: "iana" }, "application/vnd.dvb.ipdcesgpdd": { source: "iana" }, "application/vnd.dvb.ipdcroaming": { source: "iana" }, "application/vnd.dvb.iptv.alfec-base": { source: "iana" }, "application/vnd.dvb.iptv.alfec-enhancement": { source: "iana" }, "application/vnd.dvb.notif-aggregate-root+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-container+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-generic+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-ia-msglist+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-ia-registration-request+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-ia-registration-response+xml": { source: "iana", compressible: true }, "application/vnd.dvb.notif-init+xml": { source: "iana", compressible: true }, "application/vnd.dvb.pfr": { source: "iana" }, "application/vnd.dvb.service": { source: "iana", extensions: ["svc"] }, "application/vnd.dxr": { source: "iana" }, "application/vnd.dynageo": { source: "iana", extensions: ["geo"] }, "application/vnd.dzr": { source: "iana" }, "application/vnd.easykaraoke.cdgdownload": { source: "iana" }, "application/vnd.ecdis-update": { source: "iana" }, "application/vnd.ecip.rlp": { source: "iana" }, "application/vnd.eclipse.ditto+json": { source: "iana", compressible: true }, "application/vnd.ecowin.chart": { source: "iana", extensions: ["mag"] }, "application/vnd.ecowin.filerequest": { source: "iana" }, "application/vnd.ecowin.fileupdate": { source: "iana" }, "application/vnd.ecowin.series": { source: "iana" }, "application/vnd.ecowin.seriesrequest": { source: "iana" }, "application/vnd.ecowin.seriesupdate": { source: "iana" }, "application/vnd.efi.img": { source: "iana" }, "application/vnd.efi.iso": { source: "iana" }, "application/vnd.emclient.accessrequest+xml": { source: "iana", compressible: true }, "application/vnd.enliven": { source: "iana", extensions: ["nml"] }, "application/vnd.enphase.envoy": { source: "iana" }, "application/vnd.eprints.data+xml": { source: "iana", compressible: true }, "application/vnd.epson.esf": { source: "iana", extensions: ["esf"] }, "application/vnd.epson.msf": { source: "iana", extensions: ["msf"] }, "application/vnd.epson.quickanime": { source: "iana", extensions: ["qam"] }, "application/vnd.epson.salt": { source: "iana", extensions: ["slt"] }, "application/vnd.epson.ssf": { source: "iana", extensions: ["ssf"] }, "application/vnd.ericsson.quickcall": { source: "iana" }, "application/vnd.espass-espass+zip": { source: "iana", compressible: false }, "application/vnd.eszigno3+xml": { source: "iana", compressible: true, extensions: ["es3", "et3"] }, "application/vnd.etsi.aoc+xml": { source: "iana", compressible: true }, "application/vnd.etsi.asic-e+zip": { source: "iana", compressible: false }, "application/vnd.etsi.asic-s+zip": { source: "iana", compressible: false }, "application/vnd.etsi.cug+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvcommand+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvdiscovery+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvprofile+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvsad-bc+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvsad-cod+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvsad-npvr+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvservice+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvsync+xml": { source: "iana", compressible: true }, "application/vnd.etsi.iptvueprofile+xml": { source: "iana", compressible: true }, "application/vnd.etsi.mcid+xml": { source: "iana", compressible: true }, "application/vnd.etsi.mheg5": { source: "iana" }, "application/vnd.etsi.overload-control-policy-dataset+xml": { source: "iana", compressible: true }, "application/vnd.etsi.pstn+xml": { source: "iana", compressible: true }, "application/vnd.etsi.sci+xml": { source: "iana", compressible: true }, "application/vnd.etsi.simservs+xml": { source: "iana", compressible: true }, "application/vnd.etsi.timestamp-token": { source: "iana" }, "application/vnd.etsi.tsl+xml": { source: "iana", compressible: true }, "application/vnd.etsi.tsl.der": { source: "iana" }, "application/vnd.eu.kasparian.car+json": { source: "iana", compressible: true }, "application/vnd.eudora.data": { source: "iana" }, "application/vnd.evolv.ecig.profile": { source: "iana" }, "application/vnd.evolv.ecig.settings": { source: "iana" }, "application/vnd.evolv.ecig.theme": { source: "iana" }, "application/vnd.exstream-empower+zip": { source: "iana", compressible: false }, "application/vnd.exstream-package": { source: "iana" }, "application/vnd.ezpix-album": { source: "iana", extensions: ["ez2"] }, "application/vnd.ezpix-package": { source: "iana", extensions: ["ez3"] }, "application/vnd.f-secure.mobile": { source: "iana" }, "application/vnd.familysearch.gedcom+zip": { source: "iana", compressible: false }, "application/vnd.fastcopy-disk-image": { source: "iana" }, "application/vnd.fdf": { source: "iana", extensions: ["fdf"] }, "application/vnd.fdsn.mseed": { source: "iana", extensions: ["mseed"] }, "application/vnd.fdsn.seed": { source: "iana", extensions: ["seed", "dataless"] }, "application/vnd.ffsns": { source: "iana" }, "application/vnd.ficlab.flb+zip": { source: "iana", compressible: false }, "application/vnd.filmit.zfc": { source: "iana" }, "application/vnd.fints": { source: "iana" }, "application/vnd.firemonkeys.cloudcell": { source: "iana" }, "application/vnd.flographit": { source: "iana", extensions: ["gph"] }, "application/vnd.fluxtime.clip": { source: "iana", extensions: ["ftc"] }, "application/vnd.font-fontforge-sfd": { source: "iana" }, "application/vnd.framemaker": { source: "iana", extensions: ["fm", "frame", "maker", "book"] }, "application/vnd.frogans.fnc": { source: "iana", extensions: ["fnc"] }, "application/vnd.frogans.ltf": { source: "iana", extensions: ["ltf"] }, "application/vnd.fsc.weblaunch": { source: "iana", extensions: ["fsc"] }, "application/vnd.fujifilm.fb.docuworks": { source: "iana" }, "application/vnd.fujifilm.fb.docuworks.binder": { source: "iana" }, "application/vnd.fujifilm.fb.docuworks.container": { source: "iana" }, "application/vnd.fujifilm.fb.jfi+xml": { source: "iana", compressible: true }, "application/vnd.fujitsu.oasys": { source: "iana", extensions: ["oas"] }, "application/vnd.fujitsu.oasys2": { source: "iana", extensions: ["oa2"] }, "application/vnd.fujitsu.oasys3": { source: "iana", extensions: ["oa3"] }, "application/vnd.fujitsu.oasysgp": { source: "iana", extensions: ["fg5"] }, "application/vnd.fujitsu.oasysprs": { source: "iana", extensions: ["bh2"] }, "application/vnd.fujixerox.art-ex": { source: "iana" }, "application/vnd.fujixerox.art4": { source: "iana" }, "application/vnd.fujixerox.ddd": { source: "iana", extensions: ["ddd"] }, "application/vnd.fujixerox.docuworks": { source: "iana", extensions: ["xdw"] }, "application/vnd.fujixerox.docuworks.binder": { source: "iana", extensions: ["xbd"] }, "application/vnd.fujixerox.docuworks.container": { source: "iana" }, "application/vnd.fujixerox.hbpl": { source: "iana" }, "application/vnd.fut-misnet": { source: "iana" }, "application/vnd.futoin+cbor": { source: "iana" }, "application/vnd.futoin+json": { source: "iana", compressible: true }, "application/vnd.fuzzysheet": { source: "iana", extensions: ["fzs"] }, "application/vnd.genomatix.tuxedo": { source: "iana", extensions: ["txd"] }, "application/vnd.gentics.grd+json": { source: "iana", compressible: true }, "application/vnd.geo+json": { source: "iana", compressible: true }, "application/vnd.geocube+xml": { source: "iana", compressible: true }, "application/vnd.geogebra.file": { source: "iana", extensions: ["ggb"] }, "application/vnd.geogebra.slides": { source: "iana" }, "application/vnd.geogebra.tool": { source: "iana", extensions: ["ggt"] }, "application/vnd.geometry-explorer": { source: "iana", extensions: ["gex", "gre"] }, "application/vnd.geonext": { source: "iana", extensions: ["gxt"] }, "application/vnd.geoplan": { source: "iana", extensions: ["g2w"] }, "application/vnd.geospace": { source: "iana", extensions: ["g3w"] }, "application/vnd.gerber": { source: "iana" }, "application/vnd.globalplatform.card-content-mgt": { source: "iana" }, "application/vnd.globalplatform.card-content-mgt-response": { source: "iana" }, "application/vnd.gmx": { source: "iana", extensions: ["gmx"] }, "application/vnd.google-apps.document": { compressible: false, extensions: ["gdoc"] }, "application/vnd.google-apps.presentation": { compressible: false, extensions: ["gslides"] }, "application/vnd.google-apps.spreadsheet": { compressible: false, extensions: ["gsheet"] }, "application/vnd.google-earth.kml+xml": { source: "iana", compressible: true, extensions: ["kml"] }, "application/vnd.google-earth.kmz": { source: "iana", compressible: false, extensions: ["kmz"] }, "application/vnd.gov.sk.e-form+xml": { source: "iana", compressible: true }, "application/vnd.gov.sk.e-form+zip": { source: "iana", compressible: false }, "application/vnd.gov.sk.xmldatacontainer+xml": { source: "iana", compressible: true }, "application/vnd.grafeq": { source: "iana", extensions: ["gqf", "gqs"] }, "application/vnd.gridmp": { source: "iana" }, "application/vnd.groove-account": { source: "iana", extensions: ["gac"] }, "application/vnd.groove-help": { source: "iana", extensions: ["ghf"] }, "application/vnd.groove-identity-message": { source: "iana", extensions: ["gim"] }, "application/vnd.groove-injector": { source: "iana", extensions: ["grv"] }, "application/vnd.groove-tool-message": { source: "iana", extensions: ["gtm"] }, "application/vnd.groove-tool-template": { source: "iana", extensions: ["tpl"] }, "application/vnd.groove-vcard": { source: "iana", extensions: ["vcg"] }, "application/vnd.hal+json": { source: "iana", compressible: true }, "application/vnd.hal+xml": { source: "iana", compressible: true, extensions: ["hal"] }, "application/vnd.handheld-entertainment+xml": { source: "iana", compressible: true, extensions: ["zmm"] }, "application/vnd.hbci": { source: "iana", extensions: ["hbci"] }, "application/vnd.hc+json": { source: "iana", compressible: true }, "application/vnd.hcl-bireports": { source: "iana" }, "application/vnd.hdt": { source: "iana" }, "application/vnd.heroku+json": { source: "iana", compressible: true }, "application/vnd.hhe.lesson-player": { source: "iana", extensions: ["les"] }, "application/vnd.hl7cda+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.hl7v2+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.hp-hpgl": { source: "iana", extensions: ["hpgl"] }, "application/vnd.hp-hpid": { source: "iana", extensions: ["hpid"] }, "application/vnd.hp-hps": { source: "iana", extensions: ["hps"] }, "application/vnd.hp-jlyt": { source: "iana", extensions: ["jlt"] }, "application/vnd.hp-pcl": { source: "iana", extensions: ["pcl"] }, "application/vnd.hp-pclxl": { source: "iana", extensions: ["pclxl"] }, "application/vnd.httphone": { source: "iana" }, "application/vnd.hydrostatix.sof-data": { source: "iana", extensions: ["sfd-hdstx"] }, "application/vnd.hyper+json": { source: "iana", compressible: true }, "application/vnd.hyper-item+json": { source: "iana", compressible: true }, "application/vnd.hyperdrive+json": { source: "iana", compressible: true }, "application/vnd.hzn-3d-crossword": { source: "iana" }, "application/vnd.ibm.afplinedata": { source: "iana" }, "application/vnd.ibm.electronic-media": { source: "iana" }, "application/vnd.ibm.minipay": { source: "iana", extensions: ["mpy"] }, "application/vnd.ibm.modcap": { source: "iana", extensions: ["afp", "listafp", "list3820"] }, "application/vnd.ibm.rights-management": { source: "iana", extensions: ["irm"] }, "application/vnd.ibm.secure-container": { source: "iana", extensions: ["sc"] }, "application/vnd.iccprofile": { source: "iana", extensions: ["icc", "icm"] }, "application/vnd.ieee.1905": { source: "iana" }, "application/vnd.igloader": { source: "iana", extensions: ["igl"] }, "application/vnd.imagemeter.folder+zip": { source: "iana", compressible: false }, "application/vnd.imagemeter.image+zip": { source: "iana", compressible: false }, "application/vnd.immervision-ivp": { source: "iana", extensions: ["ivp"] }, "application/vnd.immervision-ivu": { source: "iana", extensions: ["ivu"] }, "application/vnd.ims.imsccv1p1": { source: "iana" }, "application/vnd.ims.imsccv1p2": { source: "iana" }, "application/vnd.ims.imsccv1p3": { source: "iana" }, "application/vnd.ims.lis.v2.result+json": { source: "iana", compressible: true }, "application/vnd.ims.lti.v2.toolconsumerprofile+json": { source: "iana", compressible: true }, "application/vnd.ims.lti.v2.toolproxy+json": { source: "iana", compressible: true }, "application/vnd.ims.lti.v2.toolproxy.id+json": { source: "iana", compressible: true }, "application/vnd.ims.lti.v2.toolsettings+json": { source: "iana", compressible: true }, "application/vnd.ims.lti.v2.toolsettings.simple+json": { source: "iana", compressible: true }, "application/vnd.informedcontrol.rms+xml": { source: "iana", compressible: true }, "application/vnd.informix-visionary": { source: "iana" }, "application/vnd.infotech.project": { source: "iana" }, "application/vnd.infotech.project+xml": { source: "iana", compressible: true }, "application/vnd.innopath.wamp.notification": { source: "iana" }, "application/vnd.insors.igm": { source: "iana", extensions: ["igm"] }, "application/vnd.intercon.formnet": { source: "iana", extensions: ["xpw", "xpx"] }, "application/vnd.intergeo": { source: "iana", extensions: ["i2g"] }, "application/vnd.intertrust.digibox": { source: "iana" }, "application/vnd.intertrust.nncp": { source: "iana" }, "application/vnd.intu.qbo": { source: "iana", extensions: ["qbo"] }, "application/vnd.intu.qfx": { source: "iana", extensions: ["qfx"] }, "application/vnd.iptc.g2.catalogitem+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.conceptitem+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.knowledgeitem+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.newsitem+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.newsmessage+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.packageitem+xml": { source: "iana", compressible: true }, "application/vnd.iptc.g2.planningitem+xml": { source: "iana", compressible: true }, "application/vnd.ipunplugged.rcprofile": { source: "iana", extensions: ["rcprofile"] }, "application/vnd.irepository.package+xml": { source: "iana", compressible: true, extensions: ["irp"] }, "application/vnd.is-xpr": { source: "iana", extensions: ["xpr"] }, "application/vnd.isac.fcs": { source: "iana", extensions: ["fcs"] }, "application/vnd.iso11783-10+zip": { source: "iana", compressible: false }, "application/vnd.jam": { source: "iana", extensions: ["jam"] }, "application/vnd.japannet-directory-service": { source: "iana" }, "application/vnd.japannet-jpnstore-wakeup": { source: "iana" }, "application/vnd.japannet-payment-wakeup": { source: "iana" }, "application/vnd.japannet-registration": { source: "iana" }, "application/vnd.japannet-registration-wakeup": { source: "iana" }, "application/vnd.japannet-setstore-wakeup": { source: "iana" }, "application/vnd.japannet-verification": { source: "iana" }, "application/vnd.japannet-verification-wakeup": { source: "iana" }, "application/vnd.jcp.javame.midlet-rms": { source: "iana", extensions: ["rms"] }, "application/vnd.jisp": { source: "iana", extensions: ["jisp"] }, "application/vnd.joost.joda-archive": { source: "iana", extensions: ["joda"] }, "application/vnd.jsk.isdn-ngn": { source: "iana" }, "application/vnd.kahootz": { source: "iana", extensions: ["ktz", "ktr"] }, "application/vnd.kde.karbon": { source: "iana", extensions: ["karbon"] }, "application/vnd.kde.kchart": { source: "iana", extensions: ["chrt"] }, "application/vnd.kde.kformula": { source: "iana", extensions: ["kfo"] }, "application/vnd.kde.kivio": { source: "iana", extensions: ["flw"] }, "application/vnd.kde.kontour": { source: "iana", extensions: ["kon"] }, "application/vnd.kde.kpresenter": { source: "iana", extensions: ["kpr", "kpt"] }, "application/vnd.kde.kspread": { source: "iana", extensions: ["ksp"] }, "application/vnd.kde.kword": { source: "iana", extensions: ["kwd", "kwt"] }, "application/vnd.kenameaapp": { source: "iana", extensions: ["htke"] }, "application/vnd.kidspiration": { source: "iana", extensions: ["kia"] }, "application/vnd.kinar": { source: "iana", extensions: ["kne", "knp"] }, "application/vnd.koan": { source: "iana", extensions: ["skp", "skd", "skt", "skm"] }, "application/vnd.kodak-descriptor": { source: "iana", extensions: ["sse"] }, "application/vnd.las": { source: "iana" }, "application/vnd.las.las+json": { source: "iana", compressible: true }, "application/vnd.las.las+xml": { source: "iana", compressible: true, extensions: ["lasxml"] }, "application/vnd.laszip": { source: "iana" }, "application/vnd.leap+json": { source: "iana", compressible: true }, "application/vnd.liberty-request+xml": { source: "iana", compressible: true }, "application/vnd.llamagraphics.life-balance.desktop": { source: "iana", extensions: ["lbd"] }, "application/vnd.llamagraphics.life-balance.exchange+xml": { source: "iana", compressible: true, extensions: ["lbe"] }, "application/vnd.logipipe.circuit+zip": { source: "iana", compressible: false }, "application/vnd.loom": { source: "iana" }, "application/vnd.lotus-1-2-3": { source: "iana", extensions: ["123"] }, "application/vnd.lotus-approach": { source: "iana", extensions: ["apr"] }, "application/vnd.lotus-freelance": { source: "iana", extensions: ["pre"] }, "application/vnd.lotus-notes": { source: "iana", extensions: ["nsf"] }, "application/vnd.lotus-organizer": { source: "iana", extensions: ["org"] }, "application/vnd.lotus-screencam": { source: "iana", extensions: ["scm"] }, "application/vnd.lotus-wordpro": { source: "iana", extensions: ["lwp"] }, "application/vnd.macports.portpkg": { source: "iana", extensions: ["portpkg"] }, "application/vnd.mapbox-vector-tile": { source: "iana", extensions: ["mvt"] }, "application/vnd.marlin.drm.actiontoken+xml": { source: "iana", compressible: true }, "application/vnd.marlin.drm.conftoken+xml": { source: "iana", compressible: true }, "application/vnd.marlin.drm.license+xml": { source: "iana", compressible: true }, "application/vnd.marlin.drm.mdcf": { source: "iana" }, "application/vnd.mason+json": { source: "iana", compressible: true }, "application/vnd.maxar.archive.3tz+zip": { source: "iana", compressible: false }, "application/vnd.maxmind.maxmind-db": { source: "iana" }, "application/vnd.mcd": { source: "iana", extensions: ["mcd"] }, "application/vnd.medcalcdata": { source: "iana", extensions: ["mc1"] }, "application/vnd.mediastation.cdkey": { source: "iana", extensions: ["cdkey"] }, "application/vnd.meridian-slingshot": { source: "iana" }, "application/vnd.mfer": { source: "iana", extensions: ["mwf"] }, "application/vnd.mfmp": { source: "iana", extensions: ["mfm"] }, "application/vnd.micro+json": { source: "iana", compressible: true }, "application/vnd.micrografx.flo": { source: "iana", extensions: ["flo"] }, "application/vnd.micrografx.igx": { source: "iana", extensions: ["igx"] }, "application/vnd.microsoft.portable-executable": { source: "iana" }, "application/vnd.microsoft.windows.thumbnail-cache": { source: "iana" }, "application/vnd.miele+json": { source: "iana", compressible: true }, "application/vnd.mif": { source: "iana", extensions: ["mif"] }, "application/vnd.minisoft-hp3000-save": { source: "iana" }, "application/vnd.mitsubishi.misty-guard.trustweb": { source: "iana" }, "application/vnd.mobius.daf": { source: "iana", extensions: ["daf"] }, "application/vnd.mobius.dis": { source: "iana", extensions: ["dis"] }, "application/vnd.mobius.mbk": { source: "iana", extensions: ["mbk"] }, "application/vnd.mobius.mqy": { source: "iana", extensions: ["mqy"] }, "application/vnd.mobius.msl": { source: "iana", extensions: ["msl"] }, "application/vnd.mobius.plc": { source: "iana", extensions: ["plc"] }, "application/vnd.mobius.txf": { source: "iana", extensions: ["txf"] }, "application/vnd.mophun.application": { source: "iana", extensions: ["mpn"] }, "application/vnd.mophun.certificate": { source: "iana", extensions: ["mpc"] }, "application/vnd.motorola.flexsuite": { source: "iana" }, "application/vnd.motorola.flexsuite.adsi": { source: "iana" }, "application/vnd.motorola.flexsuite.fis": { source: "iana" }, "application/vnd.motorola.flexsuite.gotap": { source: "iana" }, "application/vnd.motorola.flexsuite.kmr": { source: "iana" }, "application/vnd.motorola.flexsuite.ttc": { source: "iana" }, "application/vnd.motorola.flexsuite.wem": { source: "iana" }, "application/vnd.motorola.iprm": { source: "iana" }, "application/vnd.mozilla.xul+xml": { source: "iana", compressible: true, extensions: ["xul"] }, "application/vnd.ms-3mfdocument": { source: "iana" }, "application/vnd.ms-artgalry": { source: "iana", extensions: ["cil"] }, "application/vnd.ms-asf": { source: "iana" }, "application/vnd.ms-cab-compressed": { source: "iana", extensions: ["cab"] }, "application/vnd.ms-color.iccprofile": { source: "apache" }, "application/vnd.ms-excel": { source: "iana", compressible: false, extensions: ["xls", "xlm", "xla", "xlc", "xlt", "xlw"] }, "application/vnd.ms-excel.addin.macroenabled.12": { source: "iana", extensions: ["xlam"] }, "application/vnd.ms-excel.sheet.binary.macroenabled.12": { source: "iana", extensions: ["xlsb"] }, "application/vnd.ms-excel.sheet.macroenabled.12": { source: "iana", extensions: ["xlsm"] }, "application/vnd.ms-excel.template.macroenabled.12": { source: "iana", extensions: ["xltm"] }, "application/vnd.ms-fontobject": { source: "iana", compressible: true, extensions: ["eot"] }, "application/vnd.ms-htmlhelp": { source: "iana", extensions: ["chm"] }, "application/vnd.ms-ims": { source: "iana", extensions: ["ims"] }, "application/vnd.ms-lrm": { source: "iana", extensions: ["lrm"] }, "application/vnd.ms-office.activex+xml": { source: "iana", compressible: true }, "application/vnd.ms-officetheme": { source: "iana", extensions: ["thmx"] }, "application/vnd.ms-opentype": { source: "apache", compressible: true }, "application/vnd.ms-outlook": { compressible: false, extensions: ["msg"] }, "application/vnd.ms-package.obfuscated-opentype": { source: "apache" }, "application/vnd.ms-pki.seccat": { source: "apache", extensions: ["cat"] }, "application/vnd.ms-pki.stl": { source: "apache", extensions: ["stl"] }, "application/vnd.ms-playready.initiator+xml": { source: "iana", compressible: true }, "application/vnd.ms-powerpoint": { source: "iana", compressible: false, extensions: ["ppt", "pps", "pot"] }, "application/vnd.ms-powerpoint.addin.macroenabled.12": { source: "iana", extensions: ["ppam"] }, "application/vnd.ms-powerpoint.presentation.macroenabled.12": { source: "iana", extensions: ["pptm"] }, "application/vnd.ms-powerpoint.slide.macroenabled.12": { source: "iana", extensions: ["sldm"] }, "application/vnd.ms-powerpoint.slideshow.macroenabled.12": { source: "iana", extensions: ["ppsm"] }, "application/vnd.ms-powerpoint.template.macroenabled.12": { source: "iana", extensions: ["potm"] }, "application/vnd.ms-printdevicecapabilities+xml": { source: "iana", compressible: true }, "application/vnd.ms-printing.printticket+xml": { source: "apache", compressible: true }, "application/vnd.ms-printschematicket+xml": { source: "iana", compressible: true }, "application/vnd.ms-project": { source: "iana", extensions: ["mpp", "mpt"] }, "application/vnd.ms-tnef": { source: "iana" }, "application/vnd.ms-windows.devicepairing": { source: "iana" }, "application/vnd.ms-windows.nwprinting.oob": { source: "iana" }, "application/vnd.ms-windows.printerpairing": { source: "iana" }, "application/vnd.ms-windows.wsd.oob": { source: "iana" }, "application/vnd.ms-wmdrm.lic-chlg-req": { source: "iana" }, "application/vnd.ms-wmdrm.lic-resp": { source: "iana" }, "application/vnd.ms-wmdrm.meter-chlg-req": { source: "iana" }, "application/vnd.ms-wmdrm.meter-resp": { source: "iana" }, "application/vnd.ms-word.document.macroenabled.12": { source: "iana", extensions: ["docm"] }, "application/vnd.ms-word.template.macroenabled.12": { source: "iana", extensions: ["dotm"] }, "application/vnd.ms-works": { source: "iana", extensions: ["wps", "wks", "wcm", "wdb"] }, "application/vnd.ms-wpl": { source: "iana", extensions: ["wpl"] }, "application/vnd.ms-xpsdocument": { source: "iana", compressible: false, extensions: ["xps"] }, "application/vnd.msa-disk-image": { source: "iana" }, "application/vnd.mseq": { source: "iana", extensions: ["mseq"] }, "application/vnd.msign": { source: "iana" }, "application/vnd.multiad.creator": { source: "iana" }, "application/vnd.multiad.creator.cif": { source: "iana" }, "application/vnd.music-niff": { source: "iana" }, "application/vnd.musician": { source: "iana", extensions: ["mus"] }, "application/vnd.muvee.style": { source: "iana", extensions: ["msty"] }, "application/vnd.mynfc": { source: "iana", extensions: ["taglet"] }, "application/vnd.nacamar.ybrid+json": { source: "iana", compressible: true }, "application/vnd.ncd.control": { source: "iana" }, "application/vnd.ncd.reference": { source: "iana" }, "application/vnd.nearst.inv+json": { source: "iana", compressible: true }, "application/vnd.nebumind.line": { source: "iana" }, "application/vnd.nervana": { source: "iana" }, "application/vnd.netfpx": { source: "iana" }, "application/vnd.neurolanguage.nlu": { source: "iana", extensions: ["nlu"] }, "application/vnd.nimn": { source: "iana" }, "application/vnd.nintendo.nitro.rom": { source: "iana" }, "application/vnd.nintendo.snes.rom": { source: "iana" }, "application/vnd.nitf": { source: "iana", extensions: ["ntf", "nitf"] }, "application/vnd.noblenet-directory": { source: "iana", extensions: ["nnd"] }, "application/vnd.noblenet-sealer": { source: "iana", extensions: ["nns"] }, "application/vnd.noblenet-web": { source: "iana", extensions: ["nnw"] }, "application/vnd.nokia.catalogs": { source: "iana" }, "application/vnd.nokia.conml+wbxml": { source: "iana" }, "application/vnd.nokia.conml+xml": { source: "iana", compressible: true }, "application/vnd.nokia.iptv.config+xml": { source: "iana", compressible: true }, "application/vnd.nokia.isds-radio-presets": { source: "iana" }, "application/vnd.nokia.landmark+wbxml": { source: "iana" }, "application/vnd.nokia.landmark+xml": { source: "iana", compressible: true }, "application/vnd.nokia.landmarkcollection+xml": { source: "iana", compressible: true }, "application/vnd.nokia.n-gage.ac+xml": { source: "iana", compressible: true, extensions: ["ac"] }, "application/vnd.nokia.n-gage.data": { source: "iana", extensions: ["ngdat"] }, "application/vnd.nokia.n-gage.symbian.install": { source: "iana", extensions: ["n-gage"] }, "application/vnd.nokia.ncd": { source: "iana" }, "application/vnd.nokia.pcd+wbxml": { source: "iana" }, "application/vnd.nokia.pcd+xml": { source: "iana", compressible: true }, "application/vnd.nokia.radio-preset": { source: "iana", extensions: ["rpst"] }, "application/vnd.nokia.radio-presets": { source: "iana", extensions: ["rpss"] }, "application/vnd.novadigm.edm": { source: "iana", extensions: ["edm"] }, "application/vnd.novadigm.edx": { source: "iana", extensions: ["edx"] }, "application/vnd.novadigm.ext": { source: "iana", extensions: ["ext"] }, "application/vnd.ntt-local.content-share": { source: "iana" }, "application/vnd.ntt-local.file-transfer": { source: "iana" }, "application/vnd.ntt-local.ogw_remote-access": { source: "iana" }, "application/vnd.ntt-local.sip-ta_remote": { source: "iana" }, "application/vnd.ntt-local.sip-ta_tcp_stream": { source: "iana" }, "application/vnd.oasis.opendocument.chart": { source: "iana", extensions: ["odc"] }, "application/vnd.oasis.opendocument.chart-template": { source: "iana", extensions: ["otc"] }, "application/vnd.oasis.opendocument.database": { source: "iana", extensions: ["odb"] }, "application/vnd.oasis.opendocument.formula": { source: "iana", extensions: ["odf"] }, "application/vnd.oasis.opendocument.formula-template": { source: "iana", extensions: ["odft"] }, "application/vnd.oasis.opendocument.graphics": { source: "iana", compressible: false, extensions: ["odg"] }, "application/vnd.oasis.opendocument.graphics-template": { source: "iana", extensions: ["otg"] }, "application/vnd.oasis.opendocument.image": { source: "iana", extensions: ["odi"] }, "application/vnd.oasis.opendocument.image-template": { source: "iana", extensions: ["oti"] }, "application/vnd.oasis.opendocument.presentation": { source: "iana", compressible: false, extensions: ["odp"] }, "application/vnd.oasis.opendocument.presentation-template": { source: "iana", extensions: ["otp"] }, "application/vnd.oasis.opendocument.spreadsheet": { source: "iana", compressible: false, extensions: ["ods"] }, "application/vnd.oasis.opendocument.spreadsheet-template": { source: "iana", extensions: ["ots"] }, "application/vnd.oasis.opendocument.text": { source: "iana", compressible: false, extensions: ["odt"] }, "application/vnd.oasis.opendocument.text-master": { source: "iana", extensions: ["odm"] }, "application/vnd.oasis.opendocument.text-template": { source: "iana", extensions: ["ott"] }, "application/vnd.oasis.opendocument.text-web": { source: "iana", extensions: ["oth"] }, "application/vnd.obn": { source: "iana" }, "application/vnd.ocf+cbor": { source: "iana" }, "application/vnd.oci.image.manifest.v1+json": { source: "iana", compressible: true }, "application/vnd.oftn.l10n+json": { source: "iana", compressible: true }, "application/vnd.oipf.contentaccessdownload+xml": { source: "iana", compressible: true }, "application/vnd.oipf.contentaccessstreaming+xml": { source: "iana", compressible: true }, "application/vnd.oipf.cspg-hexbinary": { source: "iana" }, "application/vnd.oipf.dae.svg+xml": { source: "iana", compressible: true }, "application/vnd.oipf.dae.xhtml+xml": { source: "iana", compressible: true }, "application/vnd.oipf.mippvcontrolmessage+xml": { source: "iana", compressible: true }, "application/vnd.oipf.pae.gem": { source: "iana" }, "application/vnd.oipf.spdiscovery+xml": { source: "iana", compressible: true }, "application/vnd.oipf.spdlist+xml": { source: "iana", compressible: true }, "application/vnd.oipf.ueprofile+xml": { source: "iana", compressible: true }, "application/vnd.oipf.userprofile+xml": { source: "iana", compressible: true }, "application/vnd.olpc-sugar": { source: "iana", extensions: ["xo"] }, "application/vnd.oma-scws-config": { source: "iana" }, "application/vnd.oma-scws-http-request": { source: "iana" }, "application/vnd.oma-scws-http-response": { source: "iana" }, "application/vnd.oma.bcast.associated-procedure-parameter+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.drm-trigger+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.imd+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.ltkm": { source: "iana" }, "application/vnd.oma.bcast.notification+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.provisioningtrigger": { source: "iana" }, "application/vnd.oma.bcast.sgboot": { source: "iana" }, "application/vnd.oma.bcast.sgdd+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.sgdu": { source: "iana" }, "application/vnd.oma.bcast.simple-symbol-container": { source: "iana" }, "application/vnd.oma.bcast.smartcard-trigger+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.sprov+xml": { source: "iana", compressible: true }, "application/vnd.oma.bcast.stkm": { source: "iana" }, "application/vnd.oma.cab-address-book+xml": { source: "iana", compressible: true }, "application/vnd.oma.cab-feature-handler+xml": { source: "iana", compressible: true }, "application/vnd.oma.cab-pcc+xml": { source: "iana", compressible: true }, "application/vnd.oma.cab-subs-invite+xml": { source: "iana", compressible: true }, "application/vnd.oma.cab-user-prefs+xml": { source: "iana", compressible: true }, "application/vnd.oma.dcd": { source: "iana" }, "application/vnd.oma.dcdc": { source: "iana" }, "application/vnd.oma.dd2+xml": { source: "iana", compressible: true, extensions: ["dd2"] }, "application/vnd.oma.drm.risd+xml": { source: "iana", compressible: true }, "application/vnd.oma.group-usage-list+xml": { source: "iana", compressible: true }, "application/vnd.oma.lwm2m+cbor": { source: "iana" }, "application/vnd.oma.lwm2m+json": { source: "iana", compressible: true }, "application/vnd.oma.lwm2m+tlv": { source: "iana" }, "application/vnd.oma.pal+xml": { source: "iana", compressible: true }, "application/vnd.oma.poc.detailed-progress-report+xml": { source: "iana", compressible: true }, "application/vnd.oma.poc.final-report+xml": { source: "iana", compressible: true }, "application/vnd.oma.poc.groups+xml": { source: "iana", compressible: true }, "application/vnd.oma.poc.invocation-descriptor+xml": { source: "iana", compressible: true }, "application/vnd.oma.poc.optimized-progress-report+xml": { source: "iana", compressible: true }, "application/vnd.oma.push": { source: "iana" }, "application/vnd.oma.scidm.messages+xml": { source: "iana", compressible: true }, "application/vnd.oma.xcap-directory+xml": { source: "iana", compressible: true }, "application/vnd.omads-email+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.omads-file+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.omads-folder+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.omaloc-supl-init": { source: "iana" }, "application/vnd.onepager": { source: "iana" }, "application/vnd.onepagertamp": { source: "iana" }, "application/vnd.onepagertamx": { source: "iana" }, "application/vnd.onepagertat": { source: "iana" }, "application/vnd.onepagertatp": { source: "iana" }, "application/vnd.onepagertatx": { source: "iana" }, "application/vnd.openblox.game+xml": { source: "iana", compressible: true, extensions: ["obgx"] }, "application/vnd.openblox.game-binary": { source: "iana" }, "application/vnd.openeye.oeb": { source: "iana" }, "application/vnd.openofficeorg.extension": { source: "apache", extensions: ["oxt"] }, "application/vnd.openstreetmap.data+xml": { source: "iana", compressible: true, extensions: ["osm"] }, "application/vnd.opentimestamps.ots": { source: "iana" }, "application/vnd.openxmlformats-officedocument.custom-properties+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawing+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.extended-properties+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.presentation": { source: "iana", compressible: false, extensions: ["pptx"] }, "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.slide": { source: "iana", extensions: ["sldx"] }, "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.slideshow": { source: "iana", extensions: ["ppsx"] }, "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.template": { source: "iana", extensions: ["potx"] }, "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { source: "iana", compressible: false, extensions: ["xlsx"] }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.template": { source: "iana", extensions: ["xltx"] }, "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.theme+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.themeoverride+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.vmldrawing": { source: "iana" }, "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { source: "iana", compressible: false, extensions: ["docx"] }, "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.template": { source: "iana", extensions: ["dotx"] }, "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-package.core-properties+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": { source: "iana", compressible: true }, "application/vnd.openxmlformats-package.relationships+xml": { source: "iana", compressible: true }, "application/vnd.oracle.resource+json": { source: "iana", compressible: true }, "application/vnd.orange.indata": { source: "iana" }, "application/vnd.osa.netdeploy": { source: "iana" }, "application/vnd.osgeo.mapguide.package": { source: "iana", extensions: ["mgp"] }, "application/vnd.osgi.bundle": { source: "iana" }, "application/vnd.osgi.dp": { source: "iana", extensions: ["dp"] }, "application/vnd.osgi.subsystem": { source: "iana", extensions: ["esa"] }, "application/vnd.otps.ct-kip+xml": { source: "iana", compressible: true }, "application/vnd.oxli.countgraph": { source: "iana" }, "application/vnd.pagerduty+json": { source: "iana", compressible: true }, "application/vnd.palm": { source: "iana", extensions: ["pdb", "pqa", "oprc"] }, "application/vnd.panoply": { source: "iana" }, "application/vnd.paos.xml": { source: "iana" }, "application/vnd.patentdive": { source: "iana" }, "application/vnd.patientecommsdoc": { source: "iana" }, "application/vnd.pawaafile": { source: "iana", extensions: ["paw"] }, "application/vnd.pcos": { source: "iana" }, "application/vnd.pg.format": { source: "iana", extensions: ["str"] }, "application/vnd.pg.osasli": { source: "iana", extensions: ["ei6"] }, "application/vnd.piaccess.application-licence": { source: "iana" }, "application/vnd.picsel": { source: "iana", extensions: ["efif"] }, "application/vnd.pmi.widget": { source: "iana", extensions: ["wg"] }, "application/vnd.poc.group-advertisement+xml": { source: "iana", compressible: true }, "application/vnd.pocketlearn": { source: "iana", extensions: ["plf"] }, "application/vnd.powerbuilder6": { source: "iana", extensions: ["pbd"] }, "application/vnd.powerbuilder6-s": { source: "iana" }, "application/vnd.powerbuilder7": { source: "iana" }, "application/vnd.powerbuilder7-s": { source: "iana" }, "application/vnd.powerbuilder75": { source: "iana" }, "application/vnd.powerbuilder75-s": { source: "iana" }, "application/vnd.preminet": { source: "iana" }, "application/vnd.previewsystems.box": { source: "iana", extensions: ["box"] }, "application/vnd.proteus.magazine": { source: "iana", extensions: ["mgz"] }, "application/vnd.psfs": { source: "iana" }, "application/vnd.publishare-delta-tree": { source: "iana", extensions: ["qps"] }, "application/vnd.pvi.ptid1": { source: "iana", extensions: ["ptid"] }, "application/vnd.pwg-multiplexed": { source: "iana" }, "application/vnd.pwg-xhtml-print+xml": { source: "iana", compressible: true }, "application/vnd.qualcomm.brew-app-res": { source: "iana" }, "application/vnd.quarantainenet": { source: "iana" }, "application/vnd.quark.quarkxpress": { source: "iana", extensions: ["qxd", "qxt", "qwd", "qwt", "qxl", "qxb"] }, "application/vnd.quobject-quoxdocument": { source: "iana" }, "application/vnd.radisys.moml+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-audit+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-audit-conf+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-audit-conn+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-audit-dialog+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-audit-stream+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-conf+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-base+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-fax-detect+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-group+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-speech+xml": { source: "iana", compressible: true }, "application/vnd.radisys.msml-dialog-transform+xml": { source: "iana", compressible: true }, "application/vnd.rainstor.data": { source: "iana" }, "application/vnd.rapid": { source: "iana" }, "application/vnd.rar": { source: "iana", extensions: ["rar"] }, "application/vnd.realvnc.bed": { source: "iana", extensions: ["bed"] }, "application/vnd.recordare.musicxml": { source: "iana", extensions: ["mxl"] }, "application/vnd.recordare.musicxml+xml": { source: "iana", compressible: true, extensions: ["musicxml"] }, "application/vnd.renlearn.rlprint": { source: "iana" }, "application/vnd.resilient.logic": { source: "iana" }, "application/vnd.restful+json": { source: "iana", compressible: true }, "application/vnd.rig.cryptonote": { source: "iana", extensions: ["cryptonote"] }, "application/vnd.rim.cod": { source: "apache", extensions: ["cod"] }, "application/vnd.rn-realmedia": { source: "apache", extensions: ["rm"] }, "application/vnd.rn-realmedia-vbr": { source: "apache", extensions: ["rmvb"] }, "application/vnd.route66.link66+xml": { source: "iana", compressible: true, extensions: ["link66"] }, "application/vnd.rs-274x": { source: "iana" }, "application/vnd.ruckus.download": { source: "iana" }, "application/vnd.s3sms": { source: "iana" }, "application/vnd.sailingtracker.track": { source: "iana", extensions: ["st"] }, "application/vnd.sar": { source: "iana" }, "application/vnd.sbm.cid": { source: "iana" }, "application/vnd.sbm.mid2": { source: "iana" }, "application/vnd.scribus": { source: "iana" }, "application/vnd.sealed.3df": { source: "iana" }, "application/vnd.sealed.csf": { source: "iana" }, "application/vnd.sealed.doc": { source: "iana" }, "application/vnd.sealed.eml": { source: "iana" }, "application/vnd.sealed.mht": { source: "iana" }, "application/vnd.sealed.net": { source: "iana" }, "application/vnd.sealed.ppt": { source: "iana" }, "application/vnd.sealed.tiff": { source: "iana" }, "application/vnd.sealed.xls": { source: "iana" }, "application/vnd.sealedmedia.softseal.html": { source: "iana" }, "application/vnd.sealedmedia.softseal.pdf": { source: "iana" }, "application/vnd.seemail": { source: "iana", extensions: ["see"] }, "application/vnd.seis+json": { source: "iana", compressible: true }, "application/vnd.sema": { source: "iana", extensions: ["sema"] }, "application/vnd.semd": { source: "iana", extensions: ["semd"] }, "application/vnd.semf": { source: "iana", extensions: ["semf"] }, "application/vnd.shade-save-file": { source: "iana" }, "application/vnd.shana.informed.formdata": { source: "iana", extensions: ["ifm"] }, "application/vnd.shana.informed.formtemplate": { source: "iana", extensions: ["itp"] }, "application/vnd.shana.informed.interchange": { source: "iana", extensions: ["iif"] }, "application/vnd.shana.informed.package": { source: "iana", extensions: ["ipk"] }, "application/vnd.shootproof+json": { source: "iana", compressible: true }, "application/vnd.shopkick+json": { source: "iana", compressible: true }, "application/vnd.shp": { source: "iana" }, "application/vnd.shx": { source: "iana" }, "application/vnd.sigrok.session": { source: "iana" }, "application/vnd.simtech-mindmapper": { source: "iana", extensions: ["twd", "twds"] }, "application/vnd.siren+json": { source: "iana", compressible: true }, "application/vnd.smaf": { source: "iana", extensions: ["mmf"] }, "application/vnd.smart.notebook": { source: "iana" }, "application/vnd.smart.teacher": { source: "iana", extensions: ["teacher"] }, "application/vnd.snesdev-page-table": { source: "iana" }, "application/vnd.software602.filler.form+xml": { source: "iana", compressible: true, extensions: ["fo"] }, "application/vnd.software602.filler.form-xml-zip": { source: "iana" }, "application/vnd.solent.sdkm+xml": { source: "iana", compressible: true, extensions: ["sdkm", "sdkd"] }, "application/vnd.spotfire.dxp": { source: "iana", extensions: ["dxp"] }, "application/vnd.spotfire.sfs": { source: "iana", extensions: ["sfs"] }, "application/vnd.sqlite3": { source: "iana" }, "application/vnd.sss-cod": { source: "iana" }, "application/vnd.sss-dtf": { source: "iana" }, "application/vnd.sss-ntf": { source: "iana" }, "application/vnd.stardivision.calc": { source: "apache", extensions: ["sdc"] }, "application/vnd.stardivision.draw": { source: "apache", extensions: ["sda"] }, "application/vnd.stardivision.impress": { source: "apache", extensions: ["sdd"] }, "application/vnd.stardivision.math": { source: "apache", extensions: ["smf"] }, "application/vnd.stardivision.writer": { source: "apache", extensions: ["sdw", "vor"] }, "application/vnd.stardivision.writer-global": { source: "apache", extensions: ["sgl"] }, "application/vnd.stepmania.package": { source: "iana", extensions: ["smzip"] }, "application/vnd.stepmania.stepchart": { source: "iana", extensions: ["sm"] }, "application/vnd.street-stream": { source: "iana" }, "application/vnd.sun.wadl+xml": { source: "iana", compressible: true, extensions: ["wadl"] }, "application/vnd.sun.xml.calc": { source: "apache", extensions: ["sxc"] }, "application/vnd.sun.xml.calc.template": { source: "apache", extensions: ["stc"] }, "application/vnd.sun.xml.draw": { source: "apache", extensions: ["sxd"] }, "application/vnd.sun.xml.draw.template": { source: "apache", extensions: ["std"] }, "application/vnd.sun.xml.impress": { source: "apache", extensions: ["sxi"] }, "application/vnd.sun.xml.impress.template": { source: "apache", extensions: ["sti"] }, "application/vnd.sun.xml.math": { source: "apache", extensions: ["sxm"] }, "application/vnd.sun.xml.writer": { source: "apache", extensions: ["sxw"] }, "application/vnd.sun.xml.writer.global": { source: "apache", extensions: ["sxg"] }, "application/vnd.sun.xml.writer.template": { source: "apache", extensions: ["stw"] }, "application/vnd.sus-calendar": { source: "iana", extensions: ["sus", "susp"] }, "application/vnd.svd": { source: "iana", extensions: ["svd"] }, "application/vnd.swiftview-ics": { source: "iana" }, "application/vnd.sycle+xml": { source: "iana", compressible: true }, "application/vnd.syft+json": { source: "iana", compressible: true }, "application/vnd.symbian.install": { source: "apache", extensions: ["sis", "sisx"] }, "application/vnd.syncml+xml": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["xsm"] }, "application/vnd.syncml.dm+wbxml": { source: "iana", charset: "UTF-8", extensions: ["bdm"] }, "application/vnd.syncml.dm+xml": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["xdm"] }, "application/vnd.syncml.dm.notification": { source: "iana" }, "application/vnd.syncml.dmddf+wbxml": { source: "iana" }, "application/vnd.syncml.dmddf+xml": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["ddf"] }, "application/vnd.syncml.dmtnds+wbxml": { source: "iana" }, "application/vnd.syncml.dmtnds+xml": { source: "iana", charset: "UTF-8", compressible: true }, "application/vnd.syncml.ds.notification": { source: "iana" }, "application/vnd.tableschema+json": { source: "iana", compressible: true }, "application/vnd.tao.intent-module-archive": { source: "iana", extensions: ["tao"] }, "application/vnd.tcpdump.pcap": { source: "iana", extensions: ["pcap", "cap", "dmp"] }, "application/vnd.think-cell.ppttc+json": { source: "iana", compressible: true }, "application/vnd.tmd.mediaflex.api+xml": { source: "iana", compressible: true }, "application/vnd.tml": { source: "iana" }, "application/vnd.tmobile-livetv": { source: "iana", extensions: ["tmo"] }, "application/vnd.tri.onesource": { source: "iana" }, "application/vnd.trid.tpt": { source: "iana", extensions: ["tpt"] }, "application/vnd.triscape.mxs": { source: "iana", extensions: ["mxs"] }, "application/vnd.trueapp": { source: "iana", extensions: ["tra"] }, "application/vnd.truedoc": { source: "iana" }, "application/vnd.ubisoft.webplayer": { source: "iana" }, "application/vnd.ufdl": { source: "iana", extensions: ["ufd", "ufdl"] }, "application/vnd.uiq.theme": { source: "iana", extensions: ["utz"] }, "application/vnd.umajin": { source: "iana", extensions: ["umj"] }, "application/vnd.unity": { source: "iana", extensions: ["unityweb"] }, "application/vnd.uoml+xml": { source: "iana", compressible: true, extensions: ["uoml"] }, "application/vnd.uplanet.alert": { source: "iana" }, "application/vnd.uplanet.alert-wbxml": { source: "iana" }, "application/vnd.uplanet.bearer-choice": { source: "iana" }, "application/vnd.uplanet.bearer-choice-wbxml": { source: "iana" }, "application/vnd.uplanet.cacheop": { source: "iana" }, "application/vnd.uplanet.cacheop-wbxml": { source: "iana" }, "application/vnd.uplanet.channel": { source: "iana" }, "application/vnd.uplanet.channel-wbxml": { source: "iana" }, "application/vnd.uplanet.list": { source: "iana" }, "application/vnd.uplanet.list-wbxml": { source: "iana" }, "application/vnd.uplanet.listcmd": { source: "iana" }, "application/vnd.uplanet.listcmd-wbxml": { source: "iana" }, "application/vnd.uplanet.signal": { source: "iana" }, "application/vnd.uri-map": { source: "iana" }, "application/vnd.valve.source.material": { source: "iana" }, "application/vnd.vcx": { source: "iana", extensions: ["vcx"] }, "application/vnd.vd-study": { source: "iana" }, "application/vnd.vectorworks": { source: "iana" }, "application/vnd.vel+json": { source: "iana", compressible: true }, "application/vnd.verimatrix.vcas": { source: "iana" }, "application/vnd.veritone.aion+json": { source: "iana", compressible: true }, "application/vnd.veryant.thin": { source: "iana" }, "application/vnd.ves.encrypted": { source: "iana" }, "application/vnd.vidsoft.vidconference": { source: "iana" }, "application/vnd.visio": { source: "iana", extensions: ["vsd", "vst", "vss", "vsw"] }, "application/vnd.visionary": { source: "iana", extensions: ["vis"] }, "application/vnd.vividence.scriptfile": { source: "iana" }, "application/vnd.vsf": { source: "iana", extensions: ["vsf"] }, "application/vnd.wap.sic": { source: "iana" }, "application/vnd.wap.slc": { source: "iana" }, "application/vnd.wap.wbxml": { source: "iana", charset: "UTF-8", extensions: ["wbxml"] }, "application/vnd.wap.wmlc": { source: "iana", extensions: ["wmlc"] }, "application/vnd.wap.wmlscriptc": { source: "iana", extensions: ["wmlsc"] }, "application/vnd.webturbo": { source: "iana", extensions: ["wtb"] }, "application/vnd.wfa.dpp": { source: "iana" }, "application/vnd.wfa.p2p": { source: "iana" }, "application/vnd.wfa.wsc": { source: "iana" }, "application/vnd.windows.devicepairing": { source: "iana" }, "application/vnd.wmc": { source: "iana" }, "application/vnd.wmf.bootstrap": { source: "iana" }, "application/vnd.wolfram.mathematica": { source: "iana" }, "application/vnd.wolfram.mathematica.package": { source: "iana" }, "application/vnd.wolfram.player": { source: "iana", extensions: ["nbp"] }, "application/vnd.wordperfect": { source: "iana", extensions: ["wpd"] }, "application/vnd.wqd": { source: "iana", extensions: ["wqd"] }, "application/vnd.wrq-hp3000-labelled": { source: "iana" }, "application/vnd.wt.stf": { source: "iana", extensions: ["stf"] }, "application/vnd.wv.csp+wbxml": { source: "iana" }, "application/vnd.wv.csp+xml": { source: "iana", compressible: true }, "application/vnd.wv.ssp+xml": { source: "iana", compressible: true }, "application/vnd.xacml+json": { source: "iana", compressible: true }, "application/vnd.xara": { source: "iana", extensions: ["xar"] }, "application/vnd.xfdl": { source: "iana", extensions: ["xfdl"] }, "application/vnd.xfdl.webform": { source: "iana" }, "application/vnd.xmi+xml": { source: "iana", compressible: true }, "application/vnd.xmpie.cpkg": { source: "iana" }, "application/vnd.xmpie.dpkg": { source: "iana" }, "application/vnd.xmpie.plan": { source: "iana" }, "application/vnd.xmpie.ppkg": { source: "iana" }, "application/vnd.xmpie.xlim": { source: "iana" }, "application/vnd.yamaha.hv-dic": { source: "iana", extensions: ["hvd"] }, "application/vnd.yamaha.hv-script": { source: "iana", extensions: ["hvs"] }, "application/vnd.yamaha.hv-voice": { source: "iana", extensions: ["hvp"] }, "application/vnd.yamaha.openscoreformat": { source: "iana", extensions: ["osf"] }, "application/vnd.yamaha.openscoreformat.osfpvg+xml": { source: "iana", compressible: true, extensions: ["osfpvg"] }, "application/vnd.yamaha.remote-setup": { source: "iana" }, "application/vnd.yamaha.smaf-audio": { source: "iana", extensions: ["saf"] }, "application/vnd.yamaha.smaf-phrase": { source: "iana", extensions: ["spf"] }, "application/vnd.yamaha.through-ngn": { source: "iana" }, "application/vnd.yamaha.tunnel-udpencap": { source: "iana" }, "application/vnd.yaoweme": { source: "iana" }, "application/vnd.yellowriver-custom-menu": { source: "iana", extensions: ["cmp"] }, "application/vnd.youtube.yt": { source: "iana" }, "application/vnd.zul": { source: "iana", extensions: ["zir", "zirz"] }, "application/vnd.zzazz.deck+xml": { source: "iana", compressible: true, extensions: ["zaz"] }, "application/voicexml+xml": { source: "iana", compressible: true, extensions: ["vxml"] }, "application/voucher-cms+json": { source: "iana", compressible: true }, "application/vq-rtcpxr": { source: "iana" }, "application/wasm": { source: "iana", compressible: true, extensions: ["wasm"] }, "application/watcherinfo+xml": { source: "iana", compressible: true, extensions: ["wif"] }, "application/webpush-options+json": { source: "iana", compressible: true }, "application/whoispp-query": { source: "iana" }, "application/whoispp-response": { source: "iana" }, "application/widget": { source: "iana", extensions: ["wgt"] }, "application/winhlp": { source: "apache", extensions: ["hlp"] }, "application/wita": { source: "iana" }, "application/wordperfect5.1": { source: "iana" }, "application/wsdl+xml": { source: "iana", compressible: true, extensions: ["wsdl"] }, "application/wspolicy+xml": { source: "iana", compressible: true, extensions: ["wspolicy"] }, "application/x-7z-compressed": { source: "apache", compressible: false, extensions: ["7z"] }, "application/x-abiword": { source: "apache", extensions: ["abw"] }, "application/x-ace-compressed": { source: "apache", extensions: ["ace"] }, "application/x-amf": { source: "apache" }, "application/x-apple-diskimage": { source: "apache", extensions: ["dmg"] }, "application/x-arj": { compressible: false, extensions: ["arj"] }, "application/x-authorware-bin": { source: "apache", extensions: ["aab", "x32", "u32", "vox"] }, "application/x-authorware-map": { source: "apache", extensions: ["aam"] }, "application/x-authorware-seg": { source: "apache", extensions: ["aas"] }, "application/x-bcpio": { source: "apache", extensions: ["bcpio"] }, "application/x-bdoc": { compressible: false, extensions: ["bdoc"] }, "application/x-bittorrent": { source: "apache", extensions: ["torrent"] }, "application/x-blorb": { source: "apache", extensions: ["blb", "blorb"] }, "application/x-bzip": { source: "apache", compressible: false, extensions: ["bz"] }, "application/x-bzip2": { source: "apache", compressible: false, extensions: ["bz2", "boz"] }, "application/x-cbr": { source: "apache", extensions: ["cbr", "cba", "cbt", "cbz", "cb7"] }, "application/x-cdlink": { source: "apache", extensions: ["vcd"] }, "application/x-cfs-compressed": { source: "apache", extensions: ["cfs"] }, "application/x-chat": { source: "apache", extensions: ["chat"] }, "application/x-chess-pgn": { source: "apache", extensions: ["pgn"] }, "application/x-chrome-extension": { extensions: ["crx"] }, "application/x-cocoa": { source: "nginx", extensions: ["cco"] }, "application/x-compress": { source: "apache" }, "application/x-conference": { source: "apache", extensions: ["nsc"] }, "application/x-cpio": { source: "apache", extensions: ["cpio"] }, "application/x-csh": { source: "apache", extensions: ["csh"] }, "application/x-deb": { compressible: false }, "application/x-debian-package": { source: "apache", extensions: ["deb", "udeb"] }, "application/x-dgc-compressed": { source: "apache", extensions: ["dgc"] }, "application/x-director": { source: "apache", extensions: ["dir", "dcr", "dxr", "cst", "cct", "cxt", "w3d", "fgd", "swa"] }, "application/x-doom": { source: "apache", extensions: ["wad"] }, "application/x-dtbncx+xml": { source: "apache", compressible: true, extensions: ["ncx"] }, "application/x-dtbook+xml": { source: "apache", compressible: true, extensions: ["dtb"] }, "application/x-dtbresource+xml": { source: "apache", compressible: true, extensions: ["res"] }, "application/x-dvi": { source: "apache", compressible: false, extensions: ["dvi"] }, "application/x-envoy": { source: "apache", extensions: ["evy"] }, "application/x-eva": { source: "apache", extensions: ["eva"] }, "application/x-font-bdf": { source: "apache", extensions: ["bdf"] }, "application/x-font-dos": { source: "apache" }, "application/x-font-framemaker": { source: "apache" }, "application/x-font-ghostscript": { source: "apache", extensions: ["gsf"] }, "application/x-font-libgrx": { source: "apache" }, "application/x-font-linux-psf": { source: "apache", extensions: ["psf"] }, "application/x-font-pcf": { source: "apache", extensions: ["pcf"] }, "application/x-font-snf": { source: "apache", extensions: ["snf"] }, "application/x-font-speedo": { source: "apache" }, "application/x-font-sunos-news": { source: "apache" }, "application/x-font-type1": { source: "apache", extensions: ["pfa", "pfb", "pfm", "afm"] }, "application/x-font-vfont": { source: "apache" }, "application/x-freearc": { source: "apache", extensions: ["arc"] }, "application/x-futuresplash": { source: "apache", extensions: ["spl"] }, "application/x-gca-compressed": { source: "apache", extensions: ["gca"] }, "application/x-glulx": { source: "apache", extensions: ["ulx"] }, "application/x-gnumeric": { source: "apache", extensions: ["gnumeric"] }, "application/x-gramps-xml": { source: "apache", extensions: ["gramps"] }, "application/x-gtar": { source: "apache", extensions: ["gtar"] }, "application/x-gzip": { source: "apache" }, "application/x-hdf": { source: "apache", extensions: ["hdf"] }, "application/x-httpd-php": { compressible: true, extensions: ["php"] }, "application/x-install-instructions": { source: "apache", extensions: ["install"] }, "application/x-iso9660-image": { source: "apache", extensions: ["iso"] }, "application/x-iwork-keynote-sffkey": { extensions: ["key"] }, "application/x-iwork-numbers-sffnumbers": { extensions: ["numbers"] }, "application/x-iwork-pages-sffpages": { extensions: ["pages"] }, "application/x-java-archive-diff": { source: "nginx", extensions: ["jardiff"] }, "application/x-java-jnlp-file": { source: "apache", compressible: false, extensions: ["jnlp"] }, "application/x-javascript": { compressible: true }, "application/x-keepass2": { extensions: ["kdbx"] }, "application/x-latex": { source: "apache", compressible: false, extensions: ["latex"] }, "application/x-lua-bytecode": { extensions: ["luac"] }, "application/x-lzh-compressed": { source: "apache", extensions: ["lzh", "lha"] }, "application/x-makeself": { source: "nginx", extensions: ["run"] }, "application/x-mie": { source: "apache", extensions: ["mie"] }, "application/x-mobipocket-ebook": { source: "apache", extensions: ["prc", "mobi"] }, "application/x-mpegurl": { compressible: false }, "application/x-ms-application": { source: "apache", extensions: ["application"] }, "application/x-ms-shortcut": { source: "apache", extensions: ["lnk"] }, "application/x-ms-wmd": { source: "apache", extensions: ["wmd"] }, "application/x-ms-wmz": { source: "apache", extensions: ["wmz"] }, "application/x-ms-xbap": { source: "apache", extensions: ["xbap"] }, "application/x-msaccess": { source: "apache", extensions: ["mdb"] }, "application/x-msbinder": { source: "apache", extensions: ["obd"] }, "application/x-mscardfile": { source: "apache", extensions: ["crd"] }, "application/x-msclip": { source: "apache", extensions: ["clp"] }, "application/x-msdos-program": { extensions: ["exe"] }, "application/x-msdownload": { source: "apache", extensions: ["exe", "dll", "com", "bat", "msi"] }, "application/x-msmediaview": { source: "apache", extensions: ["mvb", "m13", "m14"] }, "application/x-msmetafile": { source: "apache", extensions: ["wmf", "wmz", "emf", "emz"] }, "application/x-msmoney": { source: "apache", extensions: ["mny"] }, "application/x-mspublisher": { source: "apache", extensions: ["pub"] }, "application/x-msschedule": { source: "apache", extensions: ["scd"] }, "application/x-msterminal": { source: "apache", extensions: ["trm"] }, "application/x-mswrite": { source: "apache", extensions: ["wri"] }, "application/x-netcdf": { source: "apache", extensions: ["nc", "cdf"] }, "application/x-ns-proxy-autoconfig": { compressible: true, extensions: ["pac"] }, "application/x-nzb": { source: "apache", extensions: ["nzb"] }, "application/x-perl": { source: "nginx", extensions: ["pl", "pm"] }, "application/x-pilot": { source: "nginx", extensions: ["prc", "pdb"] }, "application/x-pkcs12": { source: "apache", compressible: false, extensions: ["p12", "pfx"] }, "application/x-pkcs7-certificates": { source: "apache", extensions: ["p7b", "spc"] }, "application/x-pkcs7-certreqresp": { source: "apache", extensions: ["p7r"] }, "application/x-pki-message": { source: "iana" }, "application/x-rar-compressed": { source: "apache", compressible: false, extensions: ["rar"] }, "application/x-redhat-package-manager": { source: "nginx", extensions: ["rpm"] }, "application/x-research-info-systems": { source: "apache", extensions: ["ris"] }, "application/x-sea": { source: "nginx", extensions: ["sea"] }, "application/x-sh": { source: "apache", compressible: true, extensions: ["sh"] }, "application/x-shar": { source: "apache", extensions: ["shar"] }, "application/x-shockwave-flash": { source: "apache", compressible: false, extensions: ["swf"] }, "application/x-silverlight-app": { source: "apache", extensions: ["xap"] }, "application/x-sql": { source: "apache", extensions: ["sql"] }, "application/x-stuffit": { source: "apache", compressible: false, extensions: ["sit"] }, "application/x-stuffitx": { source: "apache", extensions: ["sitx"] }, "application/x-subrip": { source: "apache", extensions: ["srt"] }, "application/x-sv4cpio": { source: "apache", extensions: ["sv4cpio"] }, "application/x-sv4crc": { source: "apache", extensions: ["sv4crc"] }, "application/x-t3vm-image": { source: "apache", extensions: ["t3"] }, "application/x-tads": { source: "apache", extensions: ["gam"] }, "application/x-tar": { source: "apache", compressible: true, extensions: ["tar"] }, "application/x-tcl": { source: "apache", extensions: ["tcl", "tk"] }, "application/x-tex": { source: "apache", extensions: ["tex"] }, "application/x-tex-tfm": { source: "apache", extensions: ["tfm"] }, "application/x-texinfo": { source: "apache", extensions: ["texinfo", "texi"] }, "application/x-tgif": { source: "apache", extensions: ["obj"] }, "application/x-ustar": { source: "apache", extensions: ["ustar"] }, "application/x-virtualbox-hdd": { compressible: true, extensions: ["hdd"] }, "application/x-virtualbox-ova": { compressible: true, extensions: ["ova"] }, "application/x-virtualbox-ovf": { compressible: true, extensions: ["ovf"] }, "application/x-virtualbox-vbox": { compressible: true, extensions: ["vbox"] }, "application/x-virtualbox-vbox-extpack": { compressible: false, extensions: ["vbox-extpack"] }, "application/x-virtualbox-vdi": { compressible: true, extensions: ["vdi"] }, "application/x-virtualbox-vhd": { compressible: true, extensions: ["vhd"] }, "application/x-virtualbox-vmdk": { compressible: true, extensions: ["vmdk"] }, "application/x-wais-source": { source: "apache", extensions: ["src"] }, "application/x-web-app-manifest+json": { compressible: true, extensions: ["webapp"] }, "application/x-www-form-urlencoded": { source: "iana", compressible: true }, "application/x-x509-ca-cert": { source: "iana", extensions: ["der", "crt", "pem"] }, "application/x-x509-ca-ra-cert": { source: "iana" }, "application/x-x509-next-ca-cert": { source: "iana" }, "application/x-xfig": { source: "apache", extensions: ["fig"] }, "application/x-xliff+xml": { source: "apache", compressible: true, extensions: ["xlf"] }, "application/x-xpinstall": { source: "apache", compressible: false, extensions: ["xpi"] }, "application/x-xz": { source: "apache", extensions: ["xz"] }, "application/x-zmachine": { source: "apache", extensions: ["z1", "z2", "z3", "z4", "z5", "z6", "z7", "z8"] }, "application/x400-bp": { source: "iana" }, "application/xacml+xml": { source: "iana", compressible: true }, "application/xaml+xml": { source: "apache", compressible: true, extensions: ["xaml"] }, "application/xcap-att+xml": { source: "iana", compressible: true, extensions: ["xav"] }, "application/xcap-caps+xml": { source: "iana", compressible: true, extensions: ["xca"] }, "application/xcap-diff+xml": { source: "iana", compressible: true, extensions: ["xdf"] }, "application/xcap-el+xml": { source: "iana", compressible: true, extensions: ["xel"] }, "application/xcap-error+xml": { source: "iana", compressible: true }, "application/xcap-ns+xml": { source: "iana", compressible: true, extensions: ["xns"] }, "application/xcon-conference-info+xml": { source: "iana", compressible: true }, "application/xcon-conference-info-diff+xml": { source: "iana", compressible: true }, "application/xenc+xml": { source: "iana", compressible: true, extensions: ["xenc"] }, "application/xhtml+xml": { source: "iana", compressible: true, extensions: ["xhtml", "xht"] }, "application/xhtml-voice+xml": { source: "apache", compressible: true }, "application/xliff+xml": { source: "iana", compressible: true, extensions: ["xlf"] }, "application/xml": { source: "iana", compressible: true, extensions: ["xml", "xsl", "xsd", "rng"] }, "application/xml-dtd": { source: "iana", compressible: true, extensions: ["dtd"] }, "application/xml-external-parsed-entity": { source: "iana" }, "application/xml-patch+xml": { source: "iana", compressible: true }, "application/xmpp+xml": { source: "iana", compressible: true }, "application/xop+xml": { source: "iana", compressible: true, extensions: ["xop"] }, "application/xproc+xml": { source: "apache", compressible: true, extensions: ["xpl"] }, "application/xslt+xml": { source: "iana", compressible: true, extensions: ["xsl", "xslt"] }, "application/xspf+xml": { source: "apache", compressible: true, extensions: ["xspf"] }, "application/xv+xml": { source: "iana", compressible: true, extensions: ["mxml", "xhvml", "xvml", "xvm"] }, "application/yang": { source: "iana", extensions: ["yang"] }, "application/yang-data+json": { source: "iana", compressible: true }, "application/yang-data+xml": { source: "iana", compressible: true }, "application/yang-patch+json": { source: "iana", compressible: true }, "application/yang-patch+xml": { source: "iana", compressible: true }, "application/yin+xml": { source: "iana", compressible: true, extensions: ["yin"] }, "application/zip": { source: "iana", compressible: false, extensions: ["zip"] }, "application/zlib": { source: "iana" }, "application/zstd": { source: "iana" }, "audio/1d-interleaved-parityfec": { source: "iana" }, "audio/32kadpcm": { source: "iana" }, "audio/3gpp": { source: "iana", compressible: false, extensions: ["3gpp"] }, "audio/3gpp2": { source: "iana" }, "audio/aac": { source: "iana" }, "audio/ac3": { source: "iana" }, "audio/adpcm": { source: "apache", extensions: ["adp"] }, "audio/amr": { source: "iana", extensions: ["amr"] }, "audio/amr-wb": { source: "iana" }, "audio/amr-wb+": { source: "iana" }, "audio/aptx": { source: "iana" }, "audio/asc": { source: "iana" }, "audio/atrac-advanced-lossless": { source: "iana" }, "audio/atrac-x": { source: "iana" }, "audio/atrac3": { source: "iana" }, "audio/basic": { source: "iana", compressible: false, extensions: ["au", "snd"] }, "audio/bv16": { source: "iana" }, "audio/bv32": { source: "iana" }, "audio/clearmode": { source: "iana" }, "audio/cn": { source: "iana" }, "audio/dat12": { source: "iana" }, "audio/dls": { source: "iana" }, "audio/dsr-es201108": { source: "iana" }, "audio/dsr-es202050": { source: "iana" }, "audio/dsr-es202211": { source: "iana" }, "audio/dsr-es202212": { source: "iana" }, "audio/dv": { source: "iana" }, "audio/dvi4": { source: "iana" }, "audio/eac3": { source: "iana" }, "audio/encaprtp": { source: "iana" }, "audio/evrc": { source: "iana" }, "audio/evrc-qcp": { source: "iana" }, "audio/evrc0": { source: "iana" }, "audio/evrc1": { source: "iana" }, "audio/evrcb": { source: "iana" }, "audio/evrcb0": { source: "iana" }, "audio/evrcb1": { source: "iana" }, "audio/evrcnw": { source: "iana" }, "audio/evrcnw0": { source: "iana" }, "audio/evrcnw1": { source: "iana" }, "audio/evrcwb": { source: "iana" }, "audio/evrcwb0": { source: "iana" }, "audio/evrcwb1": { source: "iana" }, "audio/evs": { source: "iana" }, "audio/flexfec": { source: "iana" }, "audio/fwdred": { source: "iana" }, "audio/g711-0": { source: "iana" }, "audio/g719": { source: "iana" }, "audio/g722": { source: "iana" }, "audio/g7221": { source: "iana" }, "audio/g723": { source: "iana" }, "audio/g726-16": { source: "iana" }, "audio/g726-24": { source: "iana" }, "audio/g726-32": { source: "iana" }, "audio/g726-40": { source: "iana" }, "audio/g728": { source: "iana" }, "audio/g729": { source: "iana" }, "audio/g7291": { source: "iana" }, "audio/g729d": { source: "iana" }, "audio/g729e": { source: "iana" }, "audio/gsm": { source: "iana" }, "audio/gsm-efr": { source: "iana" }, "audio/gsm-hr-08": { source: "iana" }, "audio/ilbc": { source: "iana" }, "audio/ip-mr_v2.5": { source: "iana" }, "audio/isac": { source: "apache" }, "audio/l16": { source: "iana" }, "audio/l20": { source: "iana" }, "audio/l24": { source: "iana", compressible: false }, "audio/l8": { source: "iana" }, "audio/lpc": { source: "iana" }, "audio/melp": { source: "iana" }, "audio/melp1200": { source: "iana" }, "audio/melp2400": { source: "iana" }, "audio/melp600": { source: "iana" }, "audio/mhas": { source: "iana" }, "audio/midi": { source: "apache", extensions: ["mid", "midi", "kar", "rmi"] }, "audio/mobile-xmf": { source: "iana", extensions: ["mxmf"] }, "audio/mp3": { compressible: false, extensions: ["mp3"] }, "audio/mp4": { source: "iana", compressible: false, extensions: ["m4a", "mp4a"] }, "audio/mp4a-latm": { source: "iana" }, "audio/mpa": { source: "iana" }, "audio/mpa-robust": { source: "iana" }, "audio/mpeg": { source: "iana", compressible: false, extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"] }, "audio/mpeg4-generic": { source: "iana" }, "audio/musepack": { source: "apache" }, "audio/ogg": { source: "iana", compressible: false, extensions: ["oga", "ogg", "spx", "opus"] }, "audio/opus": { source: "iana" }, "audio/parityfec": { source: "iana" }, "audio/pcma": { source: "iana" }, "audio/pcma-wb": { source: "iana" }, "audio/pcmu": { source: "iana" }, "audio/pcmu-wb": { source: "iana" }, "audio/prs.sid": { source: "iana" }, "audio/qcelp": { source: "iana" }, "audio/raptorfec": { source: "iana" }, "audio/red": { source: "iana" }, "audio/rtp-enc-aescm128": { source: "iana" }, "audio/rtp-midi": { source: "iana" }, "audio/rtploopback": { source: "iana" }, "audio/rtx": { source: "iana" }, "audio/s3m": { source: "apache", extensions: ["s3m"] }, "audio/scip": { source: "iana" }, "audio/silk": { source: "apache", extensions: ["sil"] }, "audio/smv": { source: "iana" }, "audio/smv-qcp": { source: "iana" }, "audio/smv0": { source: "iana" }, "audio/sofa": { source: "iana" }, "audio/sp-midi": { source: "iana" }, "audio/speex": { source: "iana" }, "audio/t140c": { source: "iana" }, "audio/t38": { source: "iana" }, "audio/telephone-event": { source: "iana" }, "audio/tetra_acelp": { source: "iana" }, "audio/tetra_acelp_bb": { source: "iana" }, "audio/tone": { source: "iana" }, "audio/tsvcis": { source: "iana" }, "audio/uemclip": { source: "iana" }, "audio/ulpfec": { source: "iana" }, "audio/usac": { source: "iana" }, "audio/vdvi": { source: "iana" }, "audio/vmr-wb": { source: "iana" }, "audio/vnd.3gpp.iufp": { source: "iana" }, "audio/vnd.4sb": { source: "iana" }, "audio/vnd.audiokoz": { source: "iana" }, "audio/vnd.celp": { source: "iana" }, "audio/vnd.cisco.nse": { source: "iana" }, "audio/vnd.cmles.radio-events": { source: "iana" }, "audio/vnd.cns.anp1": { source: "iana" }, "audio/vnd.cns.inf1": { source: "iana" }, "audio/vnd.dece.audio": { source: "iana", extensions: ["uva", "uvva"] }, "audio/vnd.digital-winds": { source: "iana", extensions: ["eol"] }, "audio/vnd.dlna.adts": { source: "iana" }, "audio/vnd.dolby.heaac.1": { source: "iana" }, "audio/vnd.dolby.heaac.2": { source: "iana" }, "audio/vnd.dolby.mlp": { source: "iana" }, "audio/vnd.dolby.mps": { source: "iana" }, "audio/vnd.dolby.pl2": { source: "iana" }, "audio/vnd.dolby.pl2x": { source: "iana" }, "audio/vnd.dolby.pl2z": { source: "iana" }, "audio/vnd.dolby.pulse.1": { source: "iana" }, "audio/vnd.dra": { source: "iana", extensions: ["dra"] }, "audio/vnd.dts": { source: "iana", extensions: ["dts"] }, "audio/vnd.dts.hd": { source: "iana", extensions: ["dtshd"] }, "audio/vnd.dts.uhd": { source: "iana" }, "audio/vnd.dvb.file": { source: "iana" }, "audio/vnd.everad.plj": { source: "iana" }, "audio/vnd.hns.audio": { source: "iana" }, "audio/vnd.lucent.voice": { source: "iana", extensions: ["lvp"] }, "audio/vnd.ms-playready.media.pya": { source: "iana", extensions: ["pya"] }, "audio/vnd.nokia.mobile-xmf": { source: "iana" }, "audio/vnd.nortel.vbk": { source: "iana" }, "audio/vnd.nuera.ecelp4800": { source: "iana", extensions: ["ecelp4800"] }, "audio/vnd.nuera.ecelp7470": { source: "iana", extensions: ["ecelp7470"] }, "audio/vnd.nuera.ecelp9600": { source: "iana", extensions: ["ecelp9600"] }, "audio/vnd.octel.sbc": { source: "iana" }, "audio/vnd.presonus.multitrack": { source: "iana" }, "audio/vnd.qcelp": { source: "iana" }, "audio/vnd.rhetorex.32kadpcm": { source: "iana" }, "audio/vnd.rip": { source: "iana", extensions: ["rip"] }, "audio/vnd.rn-realaudio": { compressible: false }, "audio/vnd.sealedmedia.softseal.mpeg": { source: "iana" }, "audio/vnd.vmx.cvsd": { source: "iana" }, "audio/vnd.wave": { compressible: false }, "audio/vorbis": { source: "iana", compressible: false }, "audio/vorbis-config": { source: "iana" }, "audio/wav": { compressible: false, extensions: ["wav"] }, "audio/wave": { compressible: false, extensions: ["wav"] }, "audio/webm": { source: "apache", compressible: false, extensions: ["weba"] }, "audio/x-aac": { source: "apache", compressible: false, extensions: ["aac"] }, "audio/x-aiff": { source: "apache", extensions: ["aif", "aiff", "aifc"] }, "audio/x-caf": { source: "apache", compressible: false, extensions: ["caf"] }, "audio/x-flac": { source: "apache", extensions: ["flac"] }, "audio/x-m4a": { source: "nginx", extensions: ["m4a"] }, "audio/x-matroska": { source: "apache", extensions: ["mka"] }, "audio/x-mpegurl": { source: "apache", extensions: ["m3u"] }, "audio/x-ms-wax": { source: "apache", extensions: ["wax"] }, "audio/x-ms-wma": { source: "apache", extensions: ["wma"] }, "audio/x-pn-realaudio": { source: "apache", extensions: ["ram", "ra"] }, "audio/x-pn-realaudio-plugin": { source: "apache", extensions: ["rmp"] }, "audio/x-realaudio": { source: "nginx", extensions: ["ra"] }, "audio/x-tta": { source: "apache" }, "audio/x-wav": { source: "apache", extensions: ["wav"] }, "audio/xm": { source: "apache", extensions: ["xm"] }, "chemical/x-cdx": { source: "apache", extensions: ["cdx"] }, "chemical/x-cif": { source: "apache", extensions: ["cif"] }, "chemical/x-cmdf": { source: "apache", extensions: ["cmdf"] }, "chemical/x-cml": { source: "apache", extensions: ["cml"] }, "chemical/x-csml": { source: "apache", extensions: ["csml"] }, "chemical/x-pdb": { source: "apache" }, "chemical/x-xyz": { source: "apache", extensions: ["xyz"] }, "font/collection": { source: "iana", extensions: ["ttc"] }, "font/otf": { source: "iana", compressible: true, extensions: ["otf"] }, "font/sfnt": { source: "iana" }, "font/ttf": { source: "iana", compressible: true, extensions: ["ttf"] }, "font/woff": { source: "iana", extensions: ["woff"] }, "font/woff2": { source: "iana", extensions: ["woff2"] }, "image/aces": { source: "iana", extensions: ["exr"] }, "image/apng": { compressible: false, extensions: ["apng"] }, "image/avci": { source: "iana", extensions: ["avci"] }, "image/avcs": { source: "iana", extensions: ["avcs"] }, "image/avif": { source: "iana", compressible: false, extensions: ["avif"] }, "image/bmp": { source: "iana", compressible: true, extensions: ["bmp"] }, "image/cgm": { source: "iana", extensions: ["cgm"] }, "image/dicom-rle": { source: "iana", extensions: ["drle"] }, "image/emf": { source: "iana", extensions: ["emf"] }, "image/fits": { source: "iana", extensions: ["fits"] }, "image/g3fax": { source: "iana", extensions: ["g3"] }, "image/gif": { source: "iana", compressible: false, extensions: ["gif"] }, "image/heic": { source: "iana", extensions: ["heic"] }, "image/heic-sequence": { source: "iana", extensions: ["heics"] }, "image/heif": { source: "iana", extensions: ["heif"] }, "image/heif-sequence": { source: "iana", extensions: ["heifs"] }, "image/hej2k": { source: "iana", extensions: ["hej2"] }, "image/hsj2": { source: "iana", extensions: ["hsj2"] }, "image/ief": { source: "iana", extensions: ["ief"] }, "image/jls": { source: "iana", extensions: ["jls"] }, "image/jp2": { source: "iana", compressible: false, extensions: ["jp2", "jpg2"] }, "image/jpeg": { source: "iana", compressible: false, extensions: ["jpeg", "jpg", "jpe"] }, "image/jph": { source: "iana", extensions: ["jph"] }, "image/jphc": { source: "iana", extensions: ["jhc"] }, "image/jpm": { source: "iana", compressible: false, extensions: ["jpm"] }, "image/jpx": { source: "iana", compressible: false, extensions: ["jpx", "jpf"] }, "image/jxr": { source: "iana", extensions: ["jxr"] }, "image/jxra": { source: "iana", extensions: ["jxra"] }, "image/jxrs": { source: "iana", extensions: ["jxrs"] }, "image/jxs": { source: "iana", extensions: ["jxs"] }, "image/jxsc": { source: "iana", extensions: ["jxsc"] }, "image/jxsi": { source: "iana", extensions: ["jxsi"] }, "image/jxss": { source: "iana", extensions: ["jxss"] }, "image/ktx": { source: "iana", extensions: ["ktx"] }, "image/ktx2": { source: "iana", extensions: ["ktx2"] }, "image/naplps": { source: "iana" }, "image/pjpeg": { compressible: false }, "image/png": { source: "iana", compressible: false, extensions: ["png"] }, "image/prs.btif": { source: "iana", extensions: ["btif"] }, "image/prs.pti": { source: "iana", extensions: ["pti"] }, "image/pwg-raster": { source: "iana" }, "image/sgi": { source: "apache", extensions: ["sgi"] }, "image/svg+xml": { source: "iana", compressible: true, extensions: ["svg", "svgz"] }, "image/t38": { source: "iana", extensions: ["t38"] }, "image/tiff": { source: "iana", compressible: false, extensions: ["tif", "tiff"] }, "image/tiff-fx": { source: "iana", extensions: ["tfx"] }, "image/vnd.adobe.photoshop": { source: "iana", compressible: true, extensions: ["psd"] }, "image/vnd.airzip.accelerator.azv": { source: "iana", extensions: ["azv"] }, "image/vnd.cns.inf2": { source: "iana" }, "image/vnd.dece.graphic": { source: "iana", extensions: ["uvi", "uvvi", "uvg", "uvvg"] }, "image/vnd.djvu": { source: "iana", extensions: ["djvu", "djv"] }, "image/vnd.dvb.subtitle": { source: "iana", extensions: ["sub"] }, "image/vnd.dwg": { source: "iana", extensions: ["dwg"] }, "image/vnd.dxf": { source: "iana", extensions: ["dxf"] }, "image/vnd.fastbidsheet": { source: "iana", extensions: ["fbs"] }, "image/vnd.fpx": { source: "iana", extensions: ["fpx"] }, "image/vnd.fst": { source: "iana", extensions: ["fst"] }, "image/vnd.fujixerox.edmics-mmr": { source: "iana", extensions: ["mmr"] }, "image/vnd.fujixerox.edmics-rlc": { source: "iana", extensions: ["rlc"] }, "image/vnd.globalgraphics.pgb": { source: "iana" }, "image/vnd.microsoft.icon": { source: "iana", compressible: true, extensions: ["ico"] }, "image/vnd.mix": { source: "iana" }, "image/vnd.mozilla.apng": { source: "iana" }, "image/vnd.ms-dds": { compressible: true, extensions: ["dds"] }, "image/vnd.ms-modi": { source: "iana", extensions: ["mdi"] }, "image/vnd.ms-photo": { source: "apache", extensions: ["wdp"] }, "image/vnd.net-fpx": { source: "iana", extensions: ["npx"] }, "image/vnd.pco.b16": { source: "iana", extensions: ["b16"] }, "image/vnd.radiance": { source: "iana" }, "image/vnd.sealed.png": { source: "iana" }, "image/vnd.sealedmedia.softseal.gif": { source: "iana" }, "image/vnd.sealedmedia.softseal.jpg": { source: "iana" }, "image/vnd.svf": { source: "iana" }, "image/vnd.tencent.tap": { source: "iana", extensions: ["tap"] }, "image/vnd.valve.source.texture": { source: "iana", extensions: ["vtf"] }, "image/vnd.wap.wbmp": { source: "iana", extensions: ["wbmp"] }, "image/vnd.xiff": { source: "iana", extensions: ["xif"] }, "image/vnd.zbrush.pcx": { source: "iana", extensions: ["pcx"] }, "image/webp": { source: "apache", extensions: ["webp"] }, "image/wmf": { source: "iana", extensions: ["wmf"] }, "image/x-3ds": { source: "apache", extensions: ["3ds"] }, "image/x-cmu-raster": { source: "apache", extensions: ["ras"] }, "image/x-cmx": { source: "apache", extensions: ["cmx"] }, "image/x-freehand": { source: "apache", extensions: ["fh", "fhc", "fh4", "fh5", "fh7"] }, "image/x-icon": { source: "apache", compressible: true, extensions: ["ico"] }, "image/x-jng": { source: "nginx", extensions: ["jng"] }, "image/x-mrsid-image": { source: "apache", extensions: ["sid"] }, "image/x-ms-bmp": { source: "nginx", compressible: true, extensions: ["bmp"] }, "image/x-pcx": { source: "apache", extensions: ["pcx"] }, "image/x-pict": { source: "apache", extensions: ["pic", "pct"] }, "image/x-portable-anymap": { source: "apache", extensions: ["pnm"] }, "image/x-portable-bitmap": { source: "apache", extensions: ["pbm"] }, "image/x-portable-graymap": { source: "apache", extensions: ["pgm"] }, "image/x-portable-pixmap": { source: "apache", extensions: ["ppm"] }, "image/x-rgb": { source: "apache", extensions: ["rgb"] }, "image/x-tga": { source: "apache", extensions: ["tga"] }, "image/x-xbitmap": { source: "apache", extensions: ["xbm"] }, "image/x-xcf": { compressible: false }, "image/x-xpixmap": { source: "apache", extensions: ["xpm"] }, "image/x-xwindowdump": { source: "apache", extensions: ["xwd"] }, "message/cpim": { source: "iana" }, "message/delivery-status": { source: "iana" }, "message/disposition-notification": { source: "iana", extensions: ["disposition-notification"] }, "message/external-body": { source: "iana" }, "message/feedback-report": { source: "iana" }, "message/global": { source: "iana", extensions: ["u8msg"] }, "message/global-delivery-status": { source: "iana", extensions: ["u8dsn"] }, "message/global-disposition-notification": { source: "iana", extensions: ["u8mdn"] }, "message/global-headers": { source: "iana", extensions: ["u8hdr"] }, "message/http": { source: "iana", compressible: false }, "message/imdn+xml": { source: "iana", compressible: true }, "message/news": { source: "iana" }, "message/partial": { source: "iana", compressible: false }, "message/rfc822": { source: "iana", compressible: true, extensions: ["eml", "mime"] }, "message/s-http": { source: "iana" }, "message/sip": { source: "iana" }, "message/sipfrag": { source: "iana" }, "message/tracking-status": { source: "iana" }, "message/vnd.si.simp": { source: "iana" }, "message/vnd.wfa.wsc": { source: "iana", extensions: ["wsc"] }, "model/3mf": { source: "iana", extensions: ["3mf"] }, "model/e57": { source: "iana" }, "model/gltf+json": { source: "iana", compressible: true, extensions: ["gltf"] }, "model/gltf-binary": { source: "iana", compressible: true, extensions: ["glb"] }, "model/iges": { source: "iana", compressible: false, extensions: ["igs", "iges"] }, "model/mesh": { source: "iana", compressible: false, extensions: ["msh", "mesh", "silo"] }, "model/mtl": { source: "iana", extensions: ["mtl"] }, "model/obj": { source: "iana", extensions: ["obj"] }, "model/step": { source: "iana" }, "model/step+xml": { source: "iana", compressible: true, extensions: ["stpx"] }, "model/step+zip": { source: "iana", compressible: false, extensions: ["stpz"] }, "model/step-xml+zip": { source: "iana", compressible: false, extensions: ["stpxz"] }, "model/stl": { source: "iana", extensions: ["stl"] }, "model/vnd.collada+xml": { source: "iana", compressible: true, extensions: ["dae"] }, "model/vnd.dwf": { source: "iana", extensions: ["dwf"] }, "model/vnd.flatland.3dml": { source: "iana" }, "model/vnd.gdl": { source: "iana", extensions: ["gdl"] }, "model/vnd.gs-gdl": { source: "apache" }, "model/vnd.gs.gdl": { source: "iana" }, "model/vnd.gtw": { source: "iana", extensions: ["gtw"] }, "model/vnd.moml+xml": { source: "iana", compressible: true }, "model/vnd.mts": { source: "iana", extensions: ["mts"] }, "model/vnd.opengex": { source: "iana", extensions: ["ogex"] }, "model/vnd.parasolid.transmit.binary": { source: "iana", extensions: ["x_b"] }, "model/vnd.parasolid.transmit.text": { source: "iana", extensions: ["x_t"] }, "model/vnd.pytha.pyox": { source: "iana" }, "model/vnd.rosette.annotated-data-model": { source: "iana" }, "model/vnd.sap.vds": { source: "iana", extensions: ["vds"] }, "model/vnd.usdz+zip": { source: "iana", compressible: false, extensions: ["usdz"] }, "model/vnd.valve.source.compiled-map": { source: "iana", extensions: ["bsp"] }, "model/vnd.vtu": { source: "iana", extensions: ["vtu"] }, "model/vrml": { source: "iana", compressible: false, extensions: ["wrl", "vrml"] }, "model/x3d+binary": { source: "apache", compressible: false, extensions: ["x3db", "x3dbz"] }, "model/x3d+fastinfoset": { source: "iana", extensions: ["x3db"] }, "model/x3d+vrml": { source: "apache", compressible: false, extensions: ["x3dv", "x3dvz"] }, "model/x3d+xml": { source: "iana", compressible: true, extensions: ["x3d", "x3dz"] }, "model/x3d-vrml": { source: "iana", extensions: ["x3dv"] }, "multipart/alternative": { source: "iana", compressible: false }, "multipart/appledouble": { source: "iana" }, "multipart/byteranges": { source: "iana" }, "multipart/digest": { source: "iana" }, "multipart/encrypted": { source: "iana", compressible: false }, "multipart/form-data": { source: "iana", compressible: false }, "multipart/header-set": { source: "iana" }, "multipart/mixed": { source: "iana" }, "multipart/multilingual": { source: "iana" }, "multipart/parallel": { source: "iana" }, "multipart/related": { source: "iana", compressible: false }, "multipart/report": { source: "iana" }, "multipart/signed": { source: "iana", compressible: false }, "multipart/vnd.bint.med-plus": { source: "iana" }, "multipart/voice-message": { source: "iana" }, "multipart/x-mixed-replace": { source: "iana" }, "text/1d-interleaved-parityfec": { source: "iana" }, "text/cache-manifest": { source: "iana", compressible: true, extensions: ["appcache", "manifest"] }, "text/calendar": { source: "iana", extensions: ["ics", "ifb"] }, "text/calender": { compressible: true }, "text/cmd": { compressible: true }, "text/coffeescript": { extensions: ["coffee", "litcoffee"] }, "text/cql": { source: "iana" }, "text/cql-expression": { source: "iana" }, "text/cql-identifier": { source: "iana" }, "text/css": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["css"] }, "text/csv": { source: "iana", compressible: true, extensions: ["csv"] }, "text/csv-schema": { source: "iana" }, "text/directory": { source: "iana" }, "text/dns": { source: "iana" }, "text/ecmascript": { source: "iana" }, "text/encaprtp": { source: "iana" }, "text/enriched": { source: "iana" }, "text/fhirpath": { source: "iana" }, "text/flexfec": { source: "iana" }, "text/fwdred": { source: "iana" }, "text/gff3": { source: "iana" }, "text/grammar-ref-list": { source: "iana" }, "text/html": { source: "iana", compressible: true, extensions: ["html", "htm", "shtml"] }, "text/jade": { extensions: ["jade"] }, "text/javascript": { source: "iana", compressible: true }, "text/jcr-cnd": { source: "iana" }, "text/jsx": { compressible: true, extensions: ["jsx"] }, "text/less": { compressible: true, extensions: ["less"] }, "text/markdown": { source: "iana", compressible: true, extensions: ["markdown", "md"] }, "text/mathml": { source: "nginx", extensions: ["mml"] }, "text/mdx": { compressible: true, extensions: ["mdx"] }, "text/mizar": { source: "iana" }, "text/n3": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["n3"] }, "text/parameters": { source: "iana", charset: "UTF-8" }, "text/parityfec": { source: "iana" }, "text/plain": { source: "iana", compressible: true, extensions: ["txt", "text", "conf", "def", "list", "log", "in", "ini"] }, "text/provenance-notation": { source: "iana", charset: "UTF-8" }, "text/prs.fallenstein.rst": { source: "iana" }, "text/prs.lines.tag": { source: "iana", extensions: ["dsc"] }, "text/prs.prop.logic": { source: "iana" }, "text/raptorfec": { source: "iana" }, "text/red": { source: "iana" }, "text/rfc822-headers": { source: "iana" }, "text/richtext": { source: "iana", compressible: true, extensions: ["rtx"] }, "text/rtf": { source: "iana", compressible: true, extensions: ["rtf"] }, "text/rtp-enc-aescm128": { source: "iana" }, "text/rtploopback": { source: "iana" }, "text/rtx": { source: "iana" }, "text/sgml": { source: "iana", extensions: ["sgml", "sgm"] }, "text/shaclc": { source: "iana" }, "text/shex": { source: "iana", extensions: ["shex"] }, "text/slim": { extensions: ["slim", "slm"] }, "text/spdx": { source: "iana", extensions: ["spdx"] }, "text/strings": { source: "iana" }, "text/stylus": { extensions: ["stylus", "styl"] }, "text/t140": { source: "iana" }, "text/tab-separated-values": { source: "iana", compressible: true, extensions: ["tsv"] }, "text/troff": { source: "iana", extensions: ["t", "tr", "roff", "man", "me", "ms"] }, "text/turtle": { source: "iana", charset: "UTF-8", extensions: ["ttl"] }, "text/ulpfec": { source: "iana" }, "text/uri-list": { source: "iana", compressible: true, extensions: ["uri", "uris", "urls"] }, "text/vcard": { source: "iana", compressible: true, extensions: ["vcard"] }, "text/vnd.a": { source: "iana" }, "text/vnd.abc": { source: "iana" }, "text/vnd.ascii-art": { source: "iana" }, "text/vnd.curl": { source: "iana", extensions: ["curl"] }, "text/vnd.curl.dcurl": { source: "apache", extensions: ["dcurl"] }, "text/vnd.curl.mcurl": { source: "apache", extensions: ["mcurl"] }, "text/vnd.curl.scurl": { source: "apache", extensions: ["scurl"] }, "text/vnd.debian.copyright": { source: "iana", charset: "UTF-8" }, "text/vnd.dmclientscript": { source: "iana" }, "text/vnd.dvb.subtitle": { source: "iana", extensions: ["sub"] }, "text/vnd.esmertec.theme-descriptor": { source: "iana", charset: "UTF-8" }, "text/vnd.familysearch.gedcom": { source: "iana", extensions: ["ged"] }, "text/vnd.ficlab.flt": { source: "iana" }, "text/vnd.fly": { source: "iana", extensions: ["fly"] }, "text/vnd.fmi.flexstor": { source: "iana", extensions: ["flx"] }, "text/vnd.gml": { source: "iana" }, "text/vnd.graphviz": { source: "iana", extensions: ["gv"] }, "text/vnd.hans": { source: "iana" }, "text/vnd.hgl": { source: "iana" }, "text/vnd.in3d.3dml": { source: "iana", extensions: ["3dml"] }, "text/vnd.in3d.spot": { source: "iana", extensions: ["spot"] }, "text/vnd.iptc.newsml": { source: "iana" }, "text/vnd.iptc.nitf": { source: "iana" }, "text/vnd.latex-z": { source: "iana" }, "text/vnd.motorola.reflex": { source: "iana" }, "text/vnd.ms-mediapackage": { source: "iana" }, "text/vnd.net2phone.commcenter.command": { source: "iana" }, "text/vnd.radisys.msml-basic-layout": { source: "iana" }, "text/vnd.senx.warpscript": { source: "iana" }, "text/vnd.si.uricatalogue": { source: "iana" }, "text/vnd.sosi": { source: "iana" }, "text/vnd.sun.j2me.app-descriptor": { source: "iana", charset: "UTF-8", extensions: ["jad"] }, "text/vnd.trolltech.linguist": { source: "iana", charset: "UTF-8" }, "text/vnd.wap.si": { source: "iana" }, "text/vnd.wap.sl": { source: "iana" }, "text/vnd.wap.wml": { source: "iana", extensions: ["wml"] }, "text/vnd.wap.wmlscript": { source: "iana", extensions: ["wmls"] }, "text/vtt": { source: "iana", charset: "UTF-8", compressible: true, extensions: ["vtt"] }, "text/x-asm": { source: "apache", extensions: ["s", "asm"] }, "text/x-c": { source: "apache", extensions: ["c", "cc", "cxx", "cpp", "h", "hh", "dic"] }, "text/x-component": { source: "nginx", extensions: ["htc"] }, "text/x-fortran": { source: "apache", extensions: ["f", "for", "f77", "f90"] }, "text/x-gwt-rpc": { compressible: true }, "text/x-handlebars-template": { extensions: ["hbs"] }, "text/x-java-source": { source: "apache", extensions: ["java"] }, "text/x-jquery-tmpl": { compressible: true }, "text/x-lua": { extensions: ["lua"] }, "text/x-markdown": { compressible: true, extensions: ["mkd"] }, "text/x-nfo": { source: "apache", extensions: ["nfo"] }, "text/x-opml": { source: "apache", extensions: ["opml"] }, "text/x-org": { compressible: true, extensions: ["org"] }, "text/x-pascal": { source: "apache", extensions: ["p", "pas"] }, "text/x-processing": { compressible: true, extensions: ["pde"] }, "text/x-sass": { extensions: ["sass"] }, "text/x-scss": { extensions: ["scss"] }, "text/x-setext": { source: "apache", extensions: ["etx"] }, "text/x-sfv": { source: "apache", extensions: ["sfv"] }, "text/x-suse-ymp": { compressible: true, extensions: ["ymp"] }, "text/x-uuencode": { source: "apache", extensions: ["uu"] }, "text/x-vcalendar": { source: "apache", extensions: ["vcs"] }, "text/x-vcard": { source: "apache", extensions: ["vcf"] }, "text/xml": { source: "iana", compressible: true, extensions: ["xml"] }, "text/xml-external-parsed-entity": { source: "iana" }, "text/yaml": { compressible: true, extensions: ["yaml", "yml"] }, "video/1d-interleaved-parityfec": { source: "iana" }, "video/3gpp": { source: "iana", extensions: ["3gp", "3gpp"] }, "video/3gpp-tt": { source: "iana" }, "video/3gpp2": { source: "iana", extensions: ["3g2"] }, "video/av1": { source: "iana" }, "video/bmpeg": { source: "iana" }, "video/bt656": { source: "iana" }, "video/celb": { source: "iana" }, "video/dv": { source: "iana" }, "video/encaprtp": { source: "iana" }, "video/ffv1": { source: "iana" }, "video/flexfec": { source: "iana" }, "video/h261": { source: "iana", extensions: ["h261"] }, "video/h263": { source: "iana", extensions: ["h263"] }, "video/h263-1998": { source: "iana" }, "video/h263-2000": { source: "iana" }, "video/h264": { source: "iana", extensions: ["h264"] }, "video/h264-rcdo": { source: "iana" }, "video/h264-svc": { source: "iana" }, "video/h265": { source: "iana" }, "video/iso.segment": { source: "iana", extensions: ["m4s"] }, "video/jpeg": { source: "iana", extensions: ["jpgv"] }, "video/jpeg2000": { source: "iana" }, "video/jpm": { source: "apache", extensions: ["jpm", "jpgm"] }, "video/jxsv": { source: "iana" }, "video/mj2": { source: "iana", extensions: ["mj2", "mjp2"] }, "video/mp1s": { source: "iana" }, "video/mp2p": { source: "iana" }, "video/mp2t": { source: "iana", extensions: ["ts"] }, "video/mp4": { source: "iana", compressible: false, extensions: ["mp4", "mp4v", "mpg4"] }, "video/mp4v-es": { source: "iana" }, "video/mpeg": { source: "iana", compressible: false, extensions: ["mpeg", "mpg", "mpe", "m1v", "m2v"] }, "video/mpeg4-generic": { source: "iana" }, "video/mpv": { source: "iana" }, "video/nv": { source: "iana" }, "video/ogg": { source: "iana", compressible: false, extensions: ["ogv"] }, "video/parityfec": { source: "iana" }, "video/pointer": { source: "iana" }, "video/quicktime": { source: "iana", compressible: false, extensions: ["qt", "mov"] }, "video/raptorfec": { source: "iana" }, "video/raw": { source: "iana" }, "video/rtp-enc-aescm128": { source: "iana" }, "video/rtploopback": { source: "iana" }, "video/rtx": { source: "iana" }, "video/scip": { source: "iana" }, "video/smpte291": { source: "iana" }, "video/smpte292m": { source: "iana" }, "video/ulpfec": { source: "iana" }, "video/vc1": { source: "iana" }, "video/vc2": { source: "iana" }, "video/vnd.cctv": { source: "iana" }, "video/vnd.dece.hd": { source: "iana", extensions: ["uvh", "uvvh"] }, "video/vnd.dece.mobile": { source: "iana", extensions: ["uvm", "uvvm"] }, "video/vnd.dece.mp4": { source: "iana" }, "video/vnd.dece.pd": { source: "iana", extensions: ["uvp", "uvvp"] }, "video/vnd.dece.sd": { source: "iana", extensions: ["uvs", "uvvs"] }, "video/vnd.dece.video": { source: "iana", extensions: ["uvv", "uvvv"] }, "video/vnd.directv.mpeg": { source: "iana" }, "video/vnd.directv.mpeg-tts": { source: "iana" }, "video/vnd.dlna.mpeg-tts": { source: "iana" }, "video/vnd.dvb.file": { source: "iana", extensions: ["dvb"] }, "video/vnd.fvt": { source: "iana", extensions: ["fvt"] }, "video/vnd.hns.video": { source: "iana" }, "video/vnd.iptvforum.1dparityfec-1010": { source: "iana" }, "video/vnd.iptvforum.1dparityfec-2005": { source: "iana" }, "video/vnd.iptvforum.2dparityfec-1010": { source: "iana" }, "video/vnd.iptvforum.2dparityfec-2005": { source: "iana" }, "video/vnd.iptvforum.ttsavc": { source: "iana" }, "video/vnd.iptvforum.ttsmpeg2": { source: "iana" }, "video/vnd.motorola.video": { source: "iana" }, "video/vnd.motorola.videop": { source: "iana" }, "video/vnd.mpegurl": { source: "iana", extensions: ["mxu", "m4u"] }, "video/vnd.ms-playready.media.pyv": { source: "iana", extensions: ["pyv"] }, "video/vnd.nokia.interleaved-multimedia": { source: "iana" }, "video/vnd.nokia.mp4vr": { source: "iana" }, "video/vnd.nokia.videovoip": { source: "iana" }, "video/vnd.objectvideo": { source: "iana" }, "video/vnd.radgamettools.bink": { source: "iana" }, "video/vnd.radgamettools.smacker": { source: "iana" }, "video/vnd.sealed.mpeg1": { source: "iana" }, "video/vnd.sealed.mpeg4": { source: "iana" }, "video/vnd.sealed.swf": { source: "iana" }, "video/vnd.sealedmedia.softseal.mov": { source: "iana" }, "video/vnd.uvvu.mp4": { source: "iana", extensions: ["uvu", "uvvu"] }, "video/vnd.vivo": { source: "iana", extensions: ["viv"] }, "video/vnd.youtube.yt": { source: "iana" }, "video/vp8": { source: "iana" }, "video/vp9": { source: "iana" }, "video/webm": { source: "apache", compressible: false, extensions: ["webm"] }, "video/x-f4v": { source: "apache", extensions: ["f4v"] }, "video/x-fli": { source: "apache", extensions: ["fli"] }, "video/x-flv": { source: "apache", compressible: false, extensions: ["flv"] }, "video/x-m4v": { source: "apache", extensions: ["m4v"] }, "video/x-matroska": { source: "apache", compressible: false, extensions: ["mkv", "mk3d", "mks"] }, "video/x-mng": { source: "apache", extensions: ["mng"] }, "video/x-ms-asf": { source: "apache", extensions: ["asf", "asx"] }, "video/x-ms-vob": { source: "apache", extensions: ["vob"] }, "video/x-ms-wm": { source: "apache", extensions: ["wm"] }, "video/x-ms-wmv": { source: "apache", compressible: false, extensions: ["wmv"] }, "video/x-ms-wmx": { source: "apache", extensions: ["wmx"] }, "video/x-ms-wvx": { source: "apache", extensions: ["wvx"] }, "video/x-msvideo": { source: "apache", extensions: ["avi"] }, "video/x-sgi-movie": { source: "apache", extensions: ["movie"] }, "video/x-smv": { source: "apache", extensions: ["smv"] }, "x-conference/x-cooltalk": { source: "apache", extensions: ["ice"] }, "x-shader/x-fragment": { compressible: true }, "x-shader/x-vertex": { compressible: true } };
});
var Rn = ni((jr, On) => {
  /*!
   * mime-db
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015-2022 Douglas Christopher Wilson
   * MIT Licensed
   */
  On.exports = Dn();
});
var qn = ni((Cs) => {
  function Pn(a) {
    if (!a || typeof a !== "string")
      return false;
    var n = Cn.exec(a), i = n && ii[n[1].toLowerCase()];
    if (i && i.charset)
      return i.charset;
    if (n && Ns.test(n[1]))
      return "UTF-8";
    return false;
  }
  function Es(a) {
    if (!a || typeof a !== "string")
      return false;
    var n = a.indexOf("/") === -1 ? Cs.lookup(a) : a;
    if (!n)
      return false;
    if (n.indexOf("charset") === -1) {
      var i = Cs.charset(n);
      if (i)
        n += "; charset=" + i.toLowerCase();
    }
    return n;
  }
  function Ds(a) {
    if (!a || typeof a !== "string")
      return false;
    var n = Cn.exec(a), i = n && Cs.extensions[n[1].toLowerCase()];
    if (!i || !i.length)
      return false;
    return i[0];
  }
  function Os(a) {
    if (!a || typeof a !== "string")
      return false;
    var n = _s("x." + a).toLowerCase().substr(1);
    if (!n)
      return false;
    return Cs.types[n] || false;
  }
  function Rs(a, n) {
    var i = ["nginx", "apache", undefined, "iana"];
    Object.keys(ii).forEach(function e(s) {
      var o = ii[s], p = o.extensions;
      if (!p || !p.length)
        return;
      a[s] = p;
      for (var c = 0;c < p.length; c++) {
        var t = p[c];
        if (n[t]) {
          var r = i.indexOf(ii[n[t]].source), d = i.indexOf(o.source);
          if (n[t] !== "application/octet-stream" && (r > d || r === d && n[t].substr(0, 12) === "application/"))
            continue;
        }
        n[t] = s;
      }
    });
  }
  /*!
   * mime-types
   * Copyright(c) 2014 Jonathan Ong
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   */
  var ii = Rn(), _s = re("path").extname, Cn = /^\s*([^;\s]*)(?:;|\s|$)/, Ns = /^text\//i;
  Cs.charset = Pn;
  Cs.charsets = { lookup: Pn };
  Cs.contentType = Es;
  Cs.extension = Ds;
  Cs.extensions = Object.create(null);
  Cs.lookup = Os;
  Cs.types = Object.create(null);
  Rs(Cs.extensions, Cs.types);
});
var ei = "0.0.206";
var de = typeof Bun !== "undefined";
var be = typeof Bun === "undefined";
var he = "AGFzbQEAAAABTwtgBH9/f38Bf2AFf39/f38AYAF/AX9gA39/fgF+YAN/f38AYAJ/fwF/YAJ+fgF+YAR/f35+AGADf39/AX9gBn9/f39/fwF/YAV/fn5+fgADFBMCAwQFBQUCAwYHCAgDAAIJAQoIBAUBcAEEBAUDAQARBgkBfwFBgIDAAAsHbgoGbWVtb3J5AgAFYWxsb2MAAAZ3eWhhc2gAAQdhZGxlcjMyAAMFY3JjMzIABApjaXR5aGFzaDMyAAUKY2l0eWhhc2g2NAAHCm11cm11cjMydjMACgptdXJtdXIzMnYyAAsKbXVybXVyNjR2MgAMCQkBAEEBCwMNDxAKtjITQQEBfgJAIAANAEF/DwsCQEEAKQOQgMCAACIBpyAAQQBBACABQiCIpygCABGAgICAAAAiAEUNACAADwsDfwAMAAsL/QUFAn8BfgF/AX4CfyOAgICAAEHwAGsiAySAgICAACADQeAAaiACQq/I9cXHrIe7oH+FQgBC29HQhZra34FnQgAQkYCAgAAgA0HoAGopAwAgAykDYIUgAoUhAgJAAkACQAJAAkAgAUEQSw0AIAFBA00NASAANQAAQiCGIAAgAUEBdkH8////B3EiBGo1AACEIQUgACABQXxqIgZqNQAAQiCGIAAgBiAEa2o1AACEIQcMBAtBACEEIAFBME8NAUEAIQYMAgtCACEHAkAgAQ0AQgAhBQwDCyAAIAFBAXZqMQAAQgiGIAAxAABCEIaEIAEgAGpBf2oxAACEIQUMAgtBACEGIAIhBSACIQcCQANAIAZBMGoiCCABTw0BIANBwABqIAAgBmoiBikACCAHhUIAIAYpAABC29HQhZra34FnhUIAEJGAgIAAIANBMGogBkEYaikAACAFhUIAIAZBEGopAABC442j5Inemt6Of4VCABCRgICAACADQSBqIAZBKGopAAAgAoVCACAGQSBqKQAAQsOZ3anHudnM2ACFQgAQkYCAgAAgA0HAAGpBCGopAwAgAykDQIUhByADQSBqQQhqKQMAIAMpAyCFIQIgA0EwakEIaikDACADKQMwhSEFIAghBgwACwsgBSAChSAHhSECCyAAIAZqIQkgASAGayEIAkADQCAEQRBqIgYgCE8NASADQdAAaiAJIARqIgRBCGopAAAgAoVCACAEKQAAQtvR0IWa2t+BZ4VCABCRgICAACADQdAAakEIaikDACADKQNQhSECIAYhBAwACwsgASAAaiIEQXhqKQAAIQcgBEFwaikAACEFCyADQRBqIAVC29HQhZra34FnhUIAIAcgAoVCABCRgICAACADIANBEGpBCGopAwBC29HQhZra34FnhUIAIAGtIAMpAxCFQq/I9cXHrIe7oH+FQgAQkYCAgABBkIDAgAAgACABEIKAgIAAIANBCGopAwAhAiADKQMAIQUgA0HwAGokgICAgAAgAiAFhQs4AQF/AkAgAkEAIAIbIgNFDQAgACgCACABQarVqtV6IAIbIANBAEEAIAAoAgQoAggRgYCAgAAACwujBgEGfwJAAkAgAUEBRw0AIAAtAABBAWoiAiEDDAELAkACQCABQRBJDQBBACEEIAAhBUEAIQJBASEDDAELQQAhBSABIQQgACEGQQEhAgJAA0AgBEUNASAEQX9qIQQgAiAGLQAAaiICIAVqIQUgBkEBaiEGDAALCyACQY+AfGogAiACQfD/A0sbIQMgBUHx/wNwIQIMAQsDQAJAAkAgBEGwK2oiByABSw0AQQAhBgNAIAZBsCtGDQIgAyAFIAZqIgQtAABqIgMgAmogAyAEQQFqLQAAaiICaiACIARBAmotAABqIgJqIAIgBEEDai0AAGoiAmogAiAEQQRqLQAAaiICaiACIARBBWotAABqIgJqIAIgBEEGai0AAGoiAmogAiAEQQdqLQAAaiICaiACIARBCGotAABqIgJqIAIgBEEJai0AAGoiAmogAiAEQQpqLQAAaiICaiACIARBC2otAABqIgJqIAIgBEEMai0AAGoiAmogAiAEQQ1qLQAAaiICaiACIARBDmotAABqIgJqIAIgBEEPai0AAGoiA2ohAiAGQRBqIQYMAAsLIAQgAU8NAgNAAkAgBEEQaiIGIAFNDQACQANAIAQgAU8NASADIAAgBGotAABqIgMgAmohAiAEQQFqIQQMAAsLIAJB8f8DcCECIANB8f8DcCEDDAQLIAMgACAEaiIELQAAaiIDIAJqIAMgBEEBai0AAGoiAmogAiAEQQJqLQAAaiICaiACIARBA2otAABqIgJqIAIgBEEEai0AAGoiAmogAiAEQQVqLQAAaiICaiACIARBBmotAABqIgJqIAIgBEEHai0AAGoiAmogAiAEQQhqLQAAaiICaiACIARBCWotAABq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";
var we = Buffer.from(he, "base64");
var { instance: je } = await WebAssembly.instantiate(we, { env: { print(a) {
  console.log(a);
} } });
var ci = je.exports;
var ke = new TextEncoder;
var ea = Pi();
var ti = (a) => ea ? `\x1B[32m${a}\x1B[0m` : a;
var Si = (a) => ea ? `\x1B[33m${a}\x1B[0m` : a;
var Ii = (a) => ea ? `\x1B[31m${a}\x1B[0m` : a;
var ra = (a) => ea ? `\x1B[34m${a}\x1B[0m` : a;
var qi = (a) => ea ? `\x1B[36m${a}\x1B[0m` : a;
var la = (a) => ea ? `\x1B[1m${a}\x1B[0m` : a;
var { NODE_ENV: en } = process.env;
var ri = Boolean(true) || en === "production" || process.argv.some((a) => a === "PROD");
var li = A.join("brisa", "out", "cli");
var Je = Boolean(true) || Boolean(process.argv[1]?.endsWith?.(A.join(li, "serve", "index.js")));
var ui = Boolean(true);
var sn = Boolean(process.argv[1]?.endsWith?.(A.join(li, "build.js")));
var Ue = process.argv[1]?.replace(new RegExp(`${li}.*`), "brisa");
var Va = ui ? import.meta.dirname : process.cwd();
var Ze = new Set(["static", "desktop", "android", "ios"]);
var on = ui ? import.meta.dirname : A.resolve(Va, "src");
var Za = ui ? import.meta.dirname : process.env.BRISA_BUILD_FOLDER ?? A.resolve(Va, "build");
var Qe = sn ? on : Za;
var an = "/_404";
var nn = "/_500";
var Ye = await O("_integrations", A.resolve(Za, "web-components"));
var Qa = (await O("i18n", Qe))?.default;
var sa = (await O("brisa.config", Va))?.default ?? {};
if (Qa?.pages)
  Qa.pages = JSON.parse(JSON.stringify(Qa.pages, (a, n) => typeof n === "string" && n.length > 1 ? n.replace(/\/$/g, "") : n));
if (sa?.basePath && !sa.basePath.startsWith(A.sep))
  sa.basePath = A.sep + sa.basePath;
globalThis.__BASE_PATH__ = sa.basePath;
var We = new Set(["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected", "data-action"]);
var Xe = process.platform !== "darwin" && process.platform !== "win32";
var Be = ri ? "public, max-age=31536000, immutable" : "no-store, must-revalidate";
var Me = { trailingSlash: false, assetPrefix: "", basePath: "", extendPlugins: (a) => a, output: "bun", clustering: ri && Xe };
var cn = { JS_RUNTIME: typeof Bun !== "undefined" ? "bun" : "node", PAGE_404: an, PAGE_500: nn, VERSION: ei, VERSION_HASH: Ta(ei), WEB_CONTEXT_PLUGINS: Ye?.webContextPlugins ?? [], RESERVED_PAGES: [an, nn], IS_PRODUCTION: ri, IS_DEVELOPMENT: process.argv.some((a) => a === "DEV") || en === "development", IS_SERVE_PROCESS: Je, IS_BUILD_PROCESS: sn, PORT: Number.parseInt(process.argv[2]) || 3000, BUILD_DIR: Za, ROOT_DIR: Va, BRISA_DIR: Ue, SRC_DIR: on, ASSETS_DIR: A.resolve(Za, "public"), PAGES_DIR: A.resolve(Za, "pages"), I18N_CONFIG: Qa, LOG_PREFIX: { WAIT: qi("[ wait ]") + " ", READY: ti("[ ready ] ") + " ", INFO: ra("[ info ] ") + " ", ERROR: Ii("[ error ] ") + " ", WARN: Si("[ warn ] ") + " ", TICK: ti("\u2713 ") + " " }, LOCALES_SET: new Set(Qa?.locales || []), CONFIG: { ...Me, ...sa }, IS_STATIC_EXPORT: Ze.has(sa?.output), REGEX: { CATCH_ALL: /\[\[\.{3}.*?\]\]/g, DYNAMIC: /\[.*?\]/g, REST_DYNAMIC: /\[\.{3}.*?\]/g }, BOOLEANS_IN_HTML: We, HEADERS: { CACHE_CONTROL: Be } };
var w = () => globalThis.mockConstants ? globalThis.mockConstants : cn;
var V = cn;
var R = Symbol.for("current-provider-id");
var ua = Symbol.for("context");
var oa = (a) => a.replace(/\s*\n\s*/g, "");
var mi = Symbol.for("isJSX");
var Ga = (a) => Fe(null, a);
Ga.__isFragment = true;
var di = Symbol.for("isJSX");
var I = (a) => $(null, a);
I.__isFragment = true;
var xi = Symbol.for("AVOID_DECLARATIVE_SHADOW_DOM");
var ma = () => {
};
vi.__isWebComponent = true;
var Ke = `\n\nPlease use the 'rerenderInAction' function inside a server action without using a try-catch block\nbecause 'rerenderInAction' is a throwable caught by Brisa to rerender the component or page.\n\nMore details: ${ra("https://brisa.build/api-reference/server-apis/rerenderInAction#rerenderinaction")}`;
var L = { INITIAL_REQUEST: "INITIAL_REQUEST", SPA_NAVIGATION: "SPA_NAVIGATION", SERVER_ACTION: "SERVER_ACTION" };
var xn = () => ["aes-256-cbc", Buffer.from(mn.env.__CRYPTO_KEY__ ?? "", "hex"), mn.env.__CRYPTO_IV__ ?? ""];
var Ya = "__encrypted:";
var Aa = "__encrypted-notext:";
var bi = "__BRISA_ERRORS__";
var He = (a, n) => `<template id="U:${n}">${a}</template><script id="R:${n}">u$('${n}')</script>`;
var { REGEX: Na } = V;
var Ge = (a) => a.toLowerCase();
var xa = Ae;
var _e = new Set(["children", "__isWebComponent", "__skipGlobalCSS"]);
var Ne = new Set(["function", "undefined"]);
var ji = "http://localhost";
var yn = "data-action";
var Re = /["&'<>]/g;
var Ce = { '"': "&quot;", "&": "&amp;", "'": "&#x27;", "<": "&lt;", ">": "&gt;" };
var Pe = (a) => Ce[a];
var zn = "context-provider";
var Un = new Set(["string", "number"]);
var Se = '<meta name="robots" content="noindex" />';
var { LOG_PREFIX: Ca, SRC_DIR: Yn, IS_DEVELOPMENT: ss, IS_SERVE_PROCESS: os } = V;
var cs = "__brisa_live_reload__";
var Xn = "reload";
var Pa = new Set;
var ps = 100;
if (ss && os)
  ts();
var us = typeof Bun !== "undefined";
var ds = new RegExp("(?:\\.test|_test|\\.spec|_spec)$");
var xs = new RegExp("(?:\\.test|_test|\\.spec|_spec)\\.(js|jsx|ts|tsx|cjs|mjs)$");
var bs = new RegExp(`${Ia.sep}index$`);
var fs = [".tsx", ".jsx", ".ts", ".mjs", ".cjs", ".js"];
var gs = /(?<!:)\/{2,}/g;
var hs = /\/$/;
var ws = /\[|\]|\./g;
var js = /\\/g;
var Kn = /\d+/;
var Hn = new Set(["[", "_", "@", "$", "~", "%", "^", "&", "*", "(", "+", "="]);
var Ys = /<(\w+) *>(.*?)<\/\1 *>|<(\w+) *\/>/;
var Ws = /(?:\r\n|\r|\n)/g;
var Bs = /\/$/;
var Ks = /\/$/;
var Gt = Symbol.for("DEPENDENCIES");
var Ts = typeof Bun !== "undefined" ? Bun.readableStreamToText : Hs;
var Vs = Symbol.for("DEPENDENCIES");
var Vi = pe(qn(), 1);
if (!Promise.withResolvers)
  Promise.withResolvers = () => {
    let a, n;
    return { promise: new Promise((e, s) => {
      a = e, n = s;
    }), resolve: a, reject: n };
  };
var ao = await Ha();
var { LOG_PREFIX: S, JS_RUNTIME: co } = V;
var po = co === "node";
process.on("unhandledRejection", Di("Unhandled Rejection"));
process.on("uncaughtException", Di("Uncaught Exception"));
process.on("uncaughtExceptionMonitor", Di("Uncaught Exception Monitor"));
var ne = await Ha();
if (!ne)
  process.exit(1);
if (!process.env.USE_HANDLER)
  ie(ne);
var xl = $a;
export {
  xl as default
};
