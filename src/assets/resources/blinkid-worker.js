var Ee = Object.defineProperty;
var J = (e) => {
  throw TypeError(e);
};
var ke = (e, r, t) => r in e ? Ee(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t;
var v = (e, r, t) => ke(e, typeof r != "symbol" ? r + "" : r, t), $ = (e, r, t) => r.has(e) || J("Cannot " + t);
var o = (e, r, t) => ($(e, r, "read from private field"), t ? t.call(e) : r.get(e)), b = (e, r, t) => r.has(e) ? J("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(e) : r.set(e, t), y = (e, r, t, n) => ($(e, r, "write to private field"), n ? n.call(e, t) : r.set(e, t), t), D = (e, r, t) => ($(e, r, "access private method"), t);
var Q = (e, r, t, n) => ({
  set _(i) {
    y(e, r, i, t);
  },
  get _() {
    return o(e, r, n);
  }
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const ne = Symbol("Comlink.proxy"), Se = Symbol("Comlink.endpoint"), Re = Symbol("Comlink.releaseProxy"), O = Symbol("Comlink.finalizer"), W = Symbol("Comlink.thrown"), oe = (e) => typeof e == "object" && e !== null || typeof e == "function", Te = {
  canHandle: (e) => oe(e) && e[ne],
  serialize(e) {
    const { port1: r, port2: t } = new MessageChannel();
    return q(e, r), [t, [t]];
  },
  deserialize(e) {
    return e.start(), Le(e);
  }
}, ve = {
  canHandle: (e) => oe(e) && W in e,
  serialize({ value: e }) {
    let r;
    return e instanceof Error ? r = {
      isError: !0,
      value: {
        message: e.message,
        name: e.name,
        stack: e.stack
      }
    } : r = { isError: !1, value: e }, [r, []];
  },
  deserialize(e) {
    throw e.isError ? Object.assign(new Error(e.value.message), e.value) : e.value;
  }
}, ae = /* @__PURE__ */ new Map([
  ["proxy", Te],
  ["throw", ve]
]);
function Ne(e, r) {
  for (const t of e)
    if (r === t || t === "*" || t instanceof RegExp && t.test(r))
      return !0;
  return !1;
}
function q(e, r = globalThis, t = ["*"]) {
  r.addEventListener("message", function n(i) {
    if (!i || !i.data)
      return;
    if (!Ne(t, i.origin)) {
      console.warn(`Invalid origin '${i.origin}' for comlink proxy`);
      return;
    }
    const { id: c, type: s, path: a } = Object.assign({ path: [] }, i.data), h = (i.data.argumentList || []).map(T);
    let l;
    try {
      const u = a.slice(0, -1).reduce((g, P) => g[P], e), p = a.reduce((g, P) => g[P], e);
      switch (s) {
        case "GET":
          l = p;
          break;
        case "SET":
          u[a.slice(-1)[0]] = T(i.data.value), l = !0;
          break;
        case "APPLY":
          l = p.apply(u, h);
          break;
        case "CONSTRUCT":
          {
            const g = new p(...h);
            l = de(g);
          }
          break;
        case "ENDPOINT":
          {
            const { port1: g, port2: P } = new MessageChannel();
            q(e, P), l = ue(g, [g]);
          }
          break;
        case "RELEASE":
          l = void 0;
          break;
        default:
          return;
      }
    } catch (u) {
      l = { value: u, [W]: 0 };
    }
    Promise.resolve(l).catch((u) => ({ value: u, [W]: 0 })).then((u) => {
      const [p, g] = z(u);
      r.postMessage(Object.assign(Object.assign({}, p), { id: c }), g), s === "RELEASE" && (r.removeEventListener("message", n), ie(r), O in e && typeof e[O] == "function" && e[O]());
    }).catch((u) => {
      const [p, g] = z({
        value: new TypeError("Unserializable return value"),
        [W]: 0
      });
      r.postMessage(Object.assign(Object.assign({}, p), { id: c }), g);
    });
  }), r.start && r.start();
}
function xe(e) {
  return e.constructor.name === "MessagePort";
}
function ie(e) {
  xe(e) && e.close();
}
function Le(e, r) {
  const t = /* @__PURE__ */ new Map();
  return e.addEventListener("message", function(i) {
    const { data: c } = i;
    if (!c || !c.id)
      return;
    const s = t.get(c.id);
    if (s)
      try {
        s(c);
      } finally {
        t.delete(c.id);
      }
  }), _(e, t, [], r);
}
function I(e) {
  if (e)
    throw new Error("Proxy has been released and is not useable");
}
function ce(e) {
  return N(e, /* @__PURE__ */ new Map(), {
    type: "RELEASE"
  }).then(() => {
    ie(e);
  });
}
const F = /* @__PURE__ */ new WeakMap(), B = "FinalizationRegistry" in globalThis && new FinalizationRegistry((e) => {
  const r = (F.get(e) || 0) - 1;
  F.set(e, r), r === 0 && ce(e);
});
function Me(e, r) {
  const t = (F.get(r) || 0) + 1;
  F.set(r, t), B && B.register(e, r, e);
}
function Ue(e) {
  B && B.unregister(e);
}
function _(e, r, t = [], n = function() {
}) {
  let i = !1;
  const c = new Proxy(n, {
    get(s, a) {
      if (I(i), a === Re)
        return () => {
          Ue(c), ce(e), r.clear(), i = !0;
        };
      if (a === "then") {
        if (t.length === 0)
          return { then: () => c };
        const h = N(e, r, {
          type: "GET",
          path: t.map((l) => l.toString())
        }).then(T);
        return h.then.bind(h);
      }
      return _(e, r, [...t, a]);
    },
    set(s, a, h) {
      I(i);
      const [l, u] = z(h);
      return N(e, r, {
        type: "SET",
        path: [...t, a].map((p) => p.toString()),
        value: l
      }, u).then(T);
    },
    apply(s, a, h) {
      I(i);
      const l = t[t.length - 1];
      if (l === Se)
        return N(e, r, {
          type: "ENDPOINT"
        }).then(T);
      if (l === "bind")
        return _(e, r, t.slice(0, -1));
      const [u, p] = Z(h);
      return N(e, r, {
        type: "APPLY",
        path: t.map((g) => g.toString()),
        argumentList: u
      }, p).then(T);
    },
    construct(s, a) {
      I(i);
      const [h, l] = Z(a);
      return N(e, r, {
        type: "CONSTRUCT",
        path: t.map((u) => u.toString()),
        argumentList: h
      }, l).then(T);
    }
  });
  return Me(c, e), c;
}
function Ae(e) {
  return Array.prototype.concat.apply([], e);
}
function Z(e) {
  const r = e.map(z);
  return [r.map((t) => t[0]), Ae(r.map((t) => t[1]))];
}
const le = /* @__PURE__ */ new WeakMap();
function ue(e, r) {
  return le.set(e, r), e;
}
function de(e) {
  return Object.assign(e, { [ne]: !0 });
}
function z(e) {
  for (const [r, t] of ae)
    if (t.canHandle(e)) {
      const [n, i] = t.serialize(e);
      return [
        {
          type: "HANDLER",
          name: r,
          value: n
        },
        i
      ];
    }
  return [
    {
      type: "RAW",
      value: e
    },
    le.get(e) || []
  ];
}
function T(e) {
  switch (e.type) {
    case "HANDLER":
      return ae.get(e.name).deserialize(e.value);
    case "RAW":
      return e.value;
  }
}
function N(e, r, t, n) {
  return new Promise((i) => {
    const c = Ie();
    r.set(c, i), e.start && e.start(), e.postMessage(Object.assign({ id: c }, t), n);
  });
}
function Ie() {
  return new Array(4).fill(0).map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)).join("-");
}
const Ce = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 3, 1, 0, 1, 10, 14, 1, 12, 0, 65, 0, 65, 0, 65, 0, 252, 10, 0, 0, 11])), Oe = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 2, 8, 1, 1, 97, 1, 98, 3, 127, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 5, 1, 1, 97, 3, 1])), We = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 7, 1, 5, 0, 208, 112, 26, 11])), Fe = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 12, 1, 10, 0, 67, 0, 0, 0, 0, 252, 0, 26, 11])), Be = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 8, 1, 6, 0, 65, 0, 192, 26, 11])), ze = async () => WebAssembly.validate(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 5, 1, 96, 0, 1, 123, 3, 2, 1, 0, 10, 10, 1, 8, 0, 65, 0, 253, 15, 253, 98, 11])), $e = () => (async (e) => {
  try {
    return typeof MessageChannel < "u" && new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)), WebAssembly.validate(e);
  } catch {
    return !1;
  }
})(new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 5, 4, 1, 3, 1, 1, 10, 11, 1, 9, 0, 65, 0, 254, 16, 2, 0, 26, 11]));
function De() {
  const e = navigator.userAgent.toLowerCase();
  return e.includes("safari") && !e.includes("chrome");
}
async function Ve() {
  if (!await $e())
    return !1;
  if (!("importScripts" in self))
    throw Error("Not implemented");
  return De() ? !1 : "Worker" in self;
}
async function _e() {
  const e = [
    Oe(),
    We(),
    Ce(),
    Fe(),
    Be()
  ];
  if (!(await Promise.all(e)).every(Boolean))
    throw new Error("Browser doesn't meet minimum requirements!");
  return await ze() ? await Ve() ? "advanced-threads" : "advanced" : "basic";
}
const je = { basic: { lightweight: 3503840, full: 3463916 }, advanced: { lightweight: 3502656, full: 3464935 }, "advanced-threads": { full: 3518342, lightweight: 3554515 } }, qe = { basic: { lightweight: 12173753, full: 13806438 }, advanced: { lightweight: 12173753, full: 13806438 }, "advanced-threads": { full: 13806438, lightweight: 12173753 } }, He = {
  wasm: je,
  data: qe
};
function C(...e) {
  const r = e.filter((t) => t).join("/").replace(/([^:]\/)\/+/g, "$1");
  try {
    new URL(r, "http://example.com");
  } catch {
    throw new Error(`Invalid URL: ${r}`);
  }
  return r;
}
async function ee(e, r) {
  var P;
  const { url: t, fileType: n, variant: i, buildType: c, progressCallback: s } = e, a = await fetch(t);
  if (!s)
    return a.arrayBuffer();
  const h = a.headers.get("Content-Length"), l = h ? parseInt(h, 10) : r({ fileType: n, variant: i, buildType: c });
  if (isNaN(l) || l <= 0)
    throw new Error(`Invalid content length for ${n} file: ${l}`);
  let u = 0;
  const p = new TransformStream({
    transform(E, k) {
      u += E.length;
      const A = Math.min(Math.round(u / l * 100), 100);
      s({
        loaded: u,
        contentLength: l,
        progress: A,
        finished: !1
      }), k.enqueue(E);
    },
    flush() {
      s({
        loaded: u,
        contentLength: l,
        progress: 100,
        finished: !0
      });
    }
  });
  return new Response((P = a.body) == null ? void 0 : P.pipeThrough(p), a).arrayBuffer();
}
const re = "application/javascript", Ge = (e, r = {}) => {
  const t = {
    skipSameOrigin: !0,
    useBlob: !0,
    ...r
  };
  return t.skipSameOrigin && new URL(e).origin === self.location.origin ? Promise.resolve(e) : new Promise((n, i) => void fetch(e).then((c) => c.text()).then((c) => {
    new URL(e).href.split("/").pop();
    let a = "";
    if (t.useBlob) {
      const h = new Blob([c], { type: re });
      a = URL.createObjectURL(h);
    } else
      a = `data:${re},` + encodeURIComponent(c);
    n(a);
  }).catch(i));
};
function Ke(e, r) {
  const t = r[e.fileType][e.variant];
  if (typeof t == "number")
    return t;
  if (e.buildType === void 0)
    throw new Error("buildType is required when size manifest entry is build-aware");
  return t[e.buildType];
}
function Ye() {
  const e = self.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(e);
}
function Xe(e) {
  return {
    licenseId: e.licenseId,
    licensee: e.licensee,
    applicationIds: e.applicationIds,
    packageName: e.packageName,
    platform: "Browser",
    sdkName: e.sdkName,
    sdkVersion: e.sdkVersion
  };
}
async function te(e, r = "https://baltazar.microblink.com/api/v2/status/check") {
  if (!r || typeof r != "string")
    throw new Error("Invalid baltazarUrl: must be a non-empty string");
  try {
    new URL(r);
  } catch {
    throw new Error(`Invalid baltazarUrl format: ${r}`);
  }
  try {
    const t = await fetch(r, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      cache: "no-cache",
      body: JSON.stringify(Xe(e))
    });
    if (!t.ok)
      throw new Error(`Server returned error: ${t.status} ${t.statusText}`);
    return await t.text();
  } catch (t) {
    throw console.error("Server permission request failed:", t), t;
  }
}
function se(e) {
  return Math.ceil(e * 1024 * 1024 / 64 / 1024);
}
class V extends Error {
  constructor(t, n, i) {
    super(`Proxy URL validation failed for "${i}": ${n}`);
    v(this, "code");
    v(this, "url");
    this.code = t, this.url = i, this.name = "ProxyUrlValidationError";
  }
}
function Je(e) {
  const r = e.unlockResult === "requires-server-permission", { allowPingProxy: t, allowBaltazarProxy: n, hasPing: i } = e;
  if (!t && !n)
    throw new Error("Microblink proxy URL is set but your license doesn't permit proxy usage. Check your license.");
  if (!r && !i)
    throw new Error("Microblink proxy URL is set but your license doesn't permit proxy usage. Check your license.");
  if (!r && i && n && !t || r && !i && !n && t)
    throw new Error("Microblink proxy URL is set but your license doesn't permit proxy usage. Check your license.");
}
function Qe(e) {
  let r;
  try {
    r = new URL(e);
  } catch {
    throw new V("INVALID_PROXY_URL", `Failed to create URL instance for provided Microblink proxy URL "${e}". Expected format: https://your-proxy.com or https://your-proxy.com/`, e);
  }
  if (r.protocol !== "https:")
    throw new V("HTTPS_REQUIRED", `Proxy URL validation failed for "${e}": HTTPS protocol must be used. Expected format: https://your-proxy.com or https://your-proxy.com/`, e);
  const t = r.origin;
  try {
    const n = new URL(`${r.pathname}${r.pathname.endsWith("/") ? "" : "/"}api/v2/status/check`, t).toString();
    return {
      ping: t + r.pathname.replace(/\/$/, ""),
      baltazar: n
    };
  } catch {
    throw new V("INVALID_PROXY_URL", "Failed to build baltazar service URL", e);
  }
}
function Ze(e, r) {
  const t = !!e, n = r.unlockResult === "requires-server-permission";
  return {
    pingProxyEnabled: t && r.allowPingProxy && r.hasPing,
    baltazarProxyEnabled: n && t && r.allowBaltazarProxy
  };
}
class er extends Error {
  constructor(t) {
    super(t);
    v(this, "code", "SERVER_PERMISSION_ERROR");
    this.name = "ServerPermissionError";
  }
}
class rr extends Error {
  constructor(t) {
    super(t);
    v(this, "code", "LICENSE_ERROR");
    this.name = "LicenseError";
  }
}
function tr({ workerScope: e, getSessionNumber: r, onError: t }) {
  const n = e ?? self, i = r ?? (() => 0);
  let c = !1;
  const s = (l, u) => {
    if (!c) {
      c = !0;
      try {
        t({
          origin: l,
          error: u,
          sessionNumber: i()
        });
      } finally {
        c = !1;
      }
    }
  }, a = (l) => {
    const u = l;
    s("worker.onerror", u.error ?? u.message ?? "Unknown worker error");
  }, h = (l) => {
    s("worker.unhandledrejection", l.reason ?? "Unhandled worker rejection");
  };
  return n.addEventListener("error", a), n.addEventListener("unhandledrejection", h), () => {
    n.removeEventListener("error", a), n.removeEventListener("unhandledrejection", h);
  };
}
const he = "FrameTransferError", sr = (e, r) => {
  const t = r instanceof Error && r.message ? `: ${r.message}` : "", n = new Error(
    `${e}${t}`,
    r instanceof Error ? { cause: r } : void 0
  );
  return n.name = he, n;
};
var d, w, j, M, U, m, S, x, R, L, fe, ge;
class nr {
  constructor() {
    b(this, L);
    /**
     * The Wasm module.
     */
    b(this, d);
    /**
     * Active scanning session created by this worker.
     */
    b(this, w);
    /**
     * The default session settings.
     *
     * Must be initialized when calling initBlinkId.
     */
    b(this, j);
    /**
     * The progress status callback.
     */
    v(this, "progressStatusCallback");
    /**
     * Whether the demo overlay is shown.
     */
    b(this, M, !0);
    /**
     * Whether the production overlay is shown.
     */
    b(this, U, !0);
    /**
     * The current session number.
     */
    b(this, m, 0);
    /**
     * Sanitized proxy URLs for Microblink services.
     */
    b(this, S);
    b(this, x);
    b(this, R);
    y(this, R, tr({
      getSessionNumber: () => o(this, m),
      onError: ({ error: r, sessionNumber: t }) => {
        o(this, d) && (this.reportPinglet({
          schemaName: "ping.error",
          schemaVersion: "1.0.0",
          sessionNumber: t,
          data: {
            errorType: "Crash",
            errorMessage: r instanceof Error ? r.message : String(r),
            stackTrace: r instanceof Error ? r.stack : void 0
          }
        }), this.sendPinglets());
      }
    }));
  }
  reportPinglet(r) {
    if (!o(this, d))
      throw new Error("Cannot report pinglet: Wasm module not loaded");
    try {
      o(this, d).queuePinglet(
        JSON.stringify(r.data),
        r.schemaName,
        r.schemaVersion,
        r.sessionNumber ?? o(this, m)
      );
    } catch (t) {
      console.warn("Failed to queue pinglet:", t, r);
    }
  }
  sendPinglets() {
    if (!o(this, d))
      throw new Error("Cannot send pinglets: Wasm module not loaded");
    try {
      o(this, d).sendPinglets();
    } catch (r) {
      console.warn("Failed to send pinglets:", r);
    }
  }
  /**
   * This method initializes everything.
   */
  async initBlinkId(r, t) {
    var a, h;
    const n = new URL(
      "resources/",
      r.resourcesLocation
    ).toString();
    this.progressStatusCallback = t, y(this, x, r.userId);
    const i = r.wasmVariant ?? await _e(), c = r.useLightweightBuild ? "lightweight" : "full";
    if (await D(this, L, fe).call(this, {
      resourceUrl: n,
      wasmVariant: i,
      featureVariant: c,
      initialMemory: r.initialMemory
    }), !o(this, d))
      throw new Error("Wasm module not loaded");
    const s = o(this, d).initializeWithLicenseKey(
      r.licenseKey,
      r.userId,
      !1
    );
    if (this.reportPinglet({
      schemaName: "ping.sdk.init.start",
      schemaVersion: "1.3.0",
      sessionNumber: 0,
      data: {
        packageName: self.location.hostname,
        platform: "Emscripten",
        platformDetails: `${c}-${i}`,
        product: "BlinkID",
        userId: o(this, x),
        ...Ze(
          r.microblinkProxyUrl,
          s
        )
      }
    }), s.licenseError)
      throw new rr(
        "License unlock error: " + s.licenseError
      );
    if (r.microblinkProxyUrl && (Je(s), y(this, S, Qe(r.microblinkProxyUrl)), s.allowPingProxy && s.hasPing && (o(this, d).setPingProxyUrl(o(this, S).ping), console.debug(`Using ping proxy URL: ${o(this, S).ping}`))), s.unlockResult === "requires-server-permission") {
      const u = ((a = o(this, S)) == null ? void 0 : a.baltazar) && s.allowBaltazarProxy ? (h = o(this, S)) == null ? void 0 : h.baltazar : void 0;
      u && console.debug(`Using Baltazar proxy URL: ${u}`);
      const p = u ? await te(s, u) : await te(s), g = o(this, d).submitServerPermission(
        p
      );
      if (g != null && g.error)
        throw new er(
          "Server unlock error: " + g.error
        );
    }
    try {
      console.debug(`BlinkID SDK ${s.sdkVersion} unlocked`), y(this, M, s.showDemoOverlay), y(this, U, s.showProductionOverlay), o(this, d).initializeSdk(r.userId);
    } catch (l) {
      throw console.warn("Failed to initialize BlinkID SDK:", l), this.reportPinglet({
        schemaName: "ping.error",
        schemaVersion: "1.0.0",
        sessionNumber: 0,
        data: {
          errorType: "Crash",
          errorMessage: l instanceof Error ? l.message : String(l),
          stackTrace: l instanceof Error ? l.stack : void 0
        }
      }), this.sendPinglets(), l;
    }
  }
  /**
   * This method creates a BlinkID scanning session.
   *
   * @param sessionSettings - The options for the session.
   * @returns The session.
   */
  createScanningSession(r, t) {
    if (!o(this, d))
      throw new Error("Wasm module not loaded");
    try {
      const n = o(this, d).createScanningSession(
        r ?? {},
        o(this, x)
      );
      return Q(this, m)._++, this.sendPinglets(), D(this, L, ge).call(this, n, t == null ? void 0 : t.redactionSettingsResolver);
    } catch (n) {
      throw this.reportPinglet({
        schemaName: "ping.error",
        schemaVersion: "1.0.0",
        sessionNumber: o(this, m),
        data: {
          errorType: "Crash",
          errorMessage: n instanceof Error ? n.message : String(n),
          stackTrace: n instanceof Error ? n.stack : void 0
        }
      }), this.sendPinglets(), n;
    }
  }
  getDefaultRedactionSettings(r) {
    if (!o(this, d))
      throw new Error("Wasm module not loaded");
    try {
      return o(this, d).getDefaultRedactionSettings(r);
    } catch (t) {
      throw console.warn("Failed to get default redaction settings:", t), this.reportPinglet({
        schemaName: "ping.error",
        schemaVersion: "1.0.0",
        sessionNumber: o(this, m),
        data: {
          errorType: "NonFatal",
          errorMessage: t instanceof Error ? t.message : String(t)
        }
      }), this.sendPinglets(), new Error("Failed to get default redaction settings", {
        cause: t
      });
    }
  }
  /**
   * This method is called when the worker is terminated.
   */
  [O]() {
  }
  /**
   * Terminates the workers and the Wasm runtime.
   */
  async terminate() {
    var n, i;
    if (self.setTimeout(() => self.close, 5e3), o(this, w))
      try {
        o(this, w).isDeleted() || (console.debug("Deleting BlinkId session during terminate"), o(this, w).delete());
      } catch (c) {
        if (console.warn(
          "Failed to delete BlinkId session during terminate:",
          c
        ), !o(this, d))
          return;
        this.reportPinglet({
          schemaName: "ping.error",
          schemaVersion: "1.0.0",
          sessionNumber: o(this, m),
          data: {
            errorType: "NonFatal",
            errorMessage: c instanceof Error ? c.message : String(c),
            stackTrace: c instanceof Error ? c.stack : void 0
          }
        }), this.sendPinglets();
      } finally {
        y(this, w, void 0);
      }
    if (!o(this, d)) {
      (n = o(this, R)) == null || n.call(this), y(this, R, void 0), console.warn(
        "No Wasm module loaded during worker termination. Skipping cleanup."
      ), self.close();
      return;
    }
    o(this, d).terminateSdk(), await new Promise((c) => setTimeout(c, 0)), this.sendPinglets();
    const t = Date.now();
    for (; o(this, d).arePingRequestsInProgress() && Date.now() - t < 5e3; )
      await new Promise((c) => setTimeout(c, 100));
    y(this, d, void 0), (i = o(this, R)) == null || i.call(this), y(this, R, void 0), console.debug("BlinkIdWorker terminated 🔴"), self.close();
  }
}
d = new WeakMap(), w = new WeakMap(), j = new WeakMap(), M = new WeakMap(), U = new WeakMap(), m = new WeakMap(), S = new WeakMap(), x = new WeakMap(), R = new WeakMap(), L = new WeakSet(), fe = async function({
  resourceUrl: r,
  wasmVariant: t,
  featureVariant: n,
  initialMemory: i
}) {
  if (o(this, d)) {
    console.log("Wasm already loaded");
    return;
  }
  const c = "BlinkIdModule", s = C(
    r,
    n,
    t
  ), a = C(s, `${c}.js`), h = C(s, `${c}.wasm`), l = C(s, `${c}.data`), u = await Ge(a), g = (await import(
    /* @vite-ignore */
    u
  )).default;
  i || (i = Ye() ? 700 : 200);
  const P = new WebAssembly.Memory({
    initial: se(i),
    maximum: se(2048),
    shared: t === "advanced-threads"
  });
  let E, k, A = 0;
  const me = 32, H = () => {
    if (!this.progressStatusCallback || !E || !k)
      return;
    const f = E.finished && k.finished, K = E.loaded + k.loaded, Y = E.contentLength + k.contentLength, Pe = f ? 100 : Math.min(Math.round(K / Y * 100), 100), X = performance.now();
    X - A < me || (A = X, this.progressStatusCallback({
      loaded: K,
      contentLength: Y,
      progress: Pe,
      finished: f
    }));
  }, pe = (f) => {
    E = f, H();
  }, ye = (f) => {
    k = f, H();
  }, G = (f) => Ke({ ...f, buildType: n }, He), [we, be] = await Promise.all([
    ee(
      {
        url: h,
        fileType: "wasm",
        variant: t,
        buildType: n,
        progressCallback: pe
      },
      G
    ),
    ee(
      {
        url: l,
        fileType: "data",
        variant: t,
        buildType: n,
        progressCallback: ye
      },
      G
    )
  ]);
  if (this.progressStatusCallback && E && k) {
    const f = E.contentLength + k.contentLength;
    this.progressStatusCallback({
      loaded: f,
      contentLength: f,
      progress: 100,
      finished: !0
    });
  }
  if (y(this, d, await g({
    locateFile: (f) => `${s}/${t}/${f}`,
    onAbort: (f) => {
      o(this, d) && (this.reportPinglet({
        schemaName: "ping.error",
        schemaVersion: "1.0.0",
        sessionNumber: o(this, m),
        data: {
          errorType: "Crash",
          errorMessage: f instanceof Error ? f.message : String(f),
          stackTrace: f instanceof Error ? f.stack : void 0
        }
      }), this.sendPinglets());
    },
    printErr: (f) => {
      if (console.error(f), /\babort(ed)?\b/i.test(f)) {
        if (!o(this, d))
          return;
        this.reportPinglet({
          schemaName: "ping.error",
          schemaVersion: "1.0.0",
          sessionNumber: o(this, m),
          data: {
            errorType: "Crash",
            errorMessage: String(f),
            stackTrace: void 0
          }
        }), this.sendPinglets();
      }
    },
    // pthreads build breaks without this:
    // "Failed to execute 'createObjectURL' on 'URL': Overload resolution failed."
    mainScriptUrlOrBlob: u,
    wasmBinary: we,
    getPreloadedPackage() {
      return be;
    },
    wasmMemory: P,
    noExitRuntime: !0
  })), !o(this, d))
    throw new Error("Failed to load Wasm module");
}, /**
 * This method creates a proxy session.
 *
 * @param session - The session.
 * @returns The proxy session.
 */
ge = function(r, t) {
  y(this, w, r);
  let n = null, i = null;
  return de({
    getResult: async () => {
      try {
        if (!t || !n)
          return r.getResult();
        const s = await t(n);
        return s == null ? r.getResult() : r.getResult(s);
      } catch (s) {
        throw o(this, d) && (this.reportPinglet({
          schemaName: "ping.error",
          schemaVersion: "1.0.0",
          sessionNumber: o(this, m),
          data: {
            errorType: "NonFatal",
            errorMessage: s instanceof Error ? s.message : String(s),
            stackTrace: s instanceof Error ? s.stack : void 0
          }
        }), this.sendPinglets()), s;
      }
    },
    process: (s) => {
      try {
        const a = r.process(s);
        "error" in a ? o(this, d) && (this.reportPinglet({
          schemaName: "ping.error",
          schemaVersion: "1.0.0",
          sessionNumber: o(this, m),
          data: {
            errorType: "NonFatal",
            errorMessage: String(a.error),
            stackTrace: void 0
          }
        }), this.sendPinglets()) : (a.inputImageAnalysisResult.documentClassInfo.type && (n = a.inputImageAnalysisResult.documentClassInfo), a.inputImageAnalysisResult.documentRotation !== "not-available" && (i = a.inputImageAnalysisResult.documentRotation), n && (n == null ? void 0 : n.type) !== a.inputImageAnalysisResult.documentClassInfo.type && (a.inputImageAnalysisResult.documentClassInfo = n), i && i !== a.inputImageAnalysisResult.documentRotation && (a.inputImageAnalysisResult.documentRotation = i));
        let h;
        try {
          h = ue(
            {
              ...a,
              arrayBuffer: s.data.buffer
            },
            [s.data.buffer]
          );
        } catch (l) {
          const u = sr(
            "Failed to transfer frame from worker",
            l
          );
          throw o(this, d) && (this.reportPinglet({
            schemaName: "ping.error",
            schemaVersion: "1.0.0",
            sessionNumber: o(this, m),
            data: {
              errorType: "Crash",
              errorMessage: u.message,
              stackTrace: u.stack
            }
          }), this.sendPinglets()), u;
        }
        return h;
      } catch (a) {
        throw a instanceof Error && a.name === he || !o(this, d) || (this.reportPinglet({
          schemaName: "ping.error",
          schemaVersion: "1.0.0",
          sessionNumber: o(this, m),
          data: {
            errorType: "NonFatal",
            errorMessage: a instanceof Error ? a.message : String(a),
            stackTrace: a instanceof Error ? a.stack : void 0
          }
        }), this.sendPinglets()), a;
      }
    },
    getScanningStatus: () => {
      try {
        return r.getScanningStatus();
      } catch (s) {
        throw this.reportPinglet({
          schemaName: "ping.error",
          schemaVersion: "1.0.0",
          sessionNumber: o(this, m),
          data: {
            errorType: "NonFatal",
            errorMessage: s instanceof Error ? s.message : String(s),
            stackTrace: s instanceof Error ? s.stack : void 0
          }
        }), this.sendPinglets(), s;
      }
    },
    ping: (s) => {
      this.reportPinglet({
        ...s,
        sessionNumber: s.sessionNumber ?? o(this, m)
      });
    },
    sendPinglets: () => this.sendPinglets(),
    getSettings: () => r.getSettings(),
    getResolvedSessionSettings: () => r.getResolvedSessionSettings(),
    getSessionId: () => r.getSessionId(),
    getSessionNumber: () => r.getSessionNumber(),
    resolveCurrentStep: () => {
      try {
        console.debug("BlinkIdWorker: resolveCurrentStep"), r.resolveCurrentStep();
      } catch (s) {
        throw this.reportPinglet({
          schemaName: "ping.error",
          schemaVersion: "1.0.0",
          sessionNumber: o(this, m),
          data: {
            errorType: "NonFatal",
            errorMessage: s instanceof Error ? s.message : String(s),
            stackTrace: s instanceof Error ? s.stack : void 0
          }
        }), this.sendPinglets(), s;
      }
    },
    reset: () => {
      try {
        r.reset(), n = null, i = null;
      } catch (s) {
        throw o(this, d) && (this.reportPinglet({
          schemaName: "ping.error",
          schemaVersion: "1.0.0",
          sessionNumber: o(this, m),
          data: {
            errorType: "NonFatal",
            errorMessage: s instanceof Error ? s.message : String(s),
            stackTrace: s instanceof Error ? s.stack : void 0
          }
        }), this.sendPinglets()), s;
      }
    },
    delete: () => {
      r.isDeleted() || r.delete(), o(this, w) === r && y(this, w, void 0);
    },
    deleteLater: () => {
      r.isDeleted() || r.deleteLater(), o(this, w) === r && y(this, w, void 0);
    },
    isDeleted: () => r.isDeleted(),
    isAliasOf: (s) => r.isAliasOf(s),
    showDemoOverlay: () => o(this, M),
    showProductionOverlay: () => o(this, U)
  });
};
const or = new nr();
q(or);
