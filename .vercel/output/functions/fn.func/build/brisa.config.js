// node_modules/brisa-adapter-vercel/dist/index.js
import q from "path";
import j from "fs/promises";
function N({ memory: k, regions: H, maxDuration: J } = {}) {
  return { name: "vercel", async adapt({ CONFIG: W, ROOT_DIR: V, BUILD_DIR: x }, S) {
    const $ = q.join(V, ".vercel"), Y = q.join($, "output"), G = q.join(Y, "config.json"), v = q.join(V, "out"), _ = q.join(x, "public"), B = q.join(Y, "static");
    switch (W.output) {
      case "static": {
        await M(), await P();
        break;
      }
      case "node": {
        await M(), await h();
        break;
      }
      default: {
        console.error('Vercel adapter only supports "node" and "static" output. Please set the "output" field in the brisa.config.ts file');
        return;
      }
    }
    async function M() {
      await j.rm($, { recursive: true, force: true }), await j.mkdir($), await j.mkdir(Y);
    }
    async function h() {
      const z = q.join(Y, "functions", "fn.func"), Z = q.join(z, "package.json"), w = q.join(z, ".vc-config.json");
      if (await P({ useFileSystem: true }), !await j.exists(z))
        await j.mkdir(z, { recursive: true });
      const A = { runtime: "nodejs20.x", handler: "build/server.js", launcherType: "Nodejs", experimentalResponseStreaming: true, environment: { USE_HANDLER: "true" } };
      if (k)
        A.memory = k;
      if (H)
        A.regions = H;
      if (J)
        A.maxDuration = J;
      await j.writeFile(Z, '{"type":"module"}', "utf-8"), await j.writeFile(w, JSON.stringify(A, null, 2), "utf-8");
      const K = q.join(z, "build");
      await j.cp(x, K, { recursive: true });
    }
    async function P({ useFileSystem: z = false } = {}) {
      const Z = Array.from(S?.values() ?? []).flat(), w = W.trailingSlash ? "/" : "", A = W.trailingSlash ? "" : "/", K = Z.flatMap((b) => {
        const Q = b.replace(/^\//, "");
        if (Q === "index.html")
          return [{ src: "/", dest: "/index.html" }];
        const E = Q.replace(y, ""), L = `/${E}${w}`, T = `/${E}${A}`;
        return [{ src: L, dest: T }, { headers: { Location: L }, src: T, status: 308 }];
      }), U = {};
      for (let b of Z) {
        const Q = b.replace(/^\//, "");
        U[Q] = { path: Q.replace(y, "") };
      }
      if (process.env.VERCEL_SKEW_PROTECTION_ENABLED)
        K.push({ src: "/.*", has: [{ type: "header", key: "Sec-Fetch-Dest", value: "document" }], headers: { "Set-Cookie": `__vdpl=${process.env.VERCEL_DEPLOYMENT_ID}; Path=${W.basePath ?? ""}/; SameSite=Strict; Secure; HttpOnly` }, continue: true });
      if (z)
        K.push(...[{ handle: "filesystem" }, { src: "/.*", dest: "/fn" }]);
      const C = { version: 3, routes: K, overrides: U };
      await j.writeFile(G, JSON.stringify(C, null, 2)), await j.mkdir(B);
      const X = z ? _ : v;
      if (await j.exists(X))
        await j.cp(X, B, { recursive: true });
    }
  } };
}
var y = /(\/?index)?\.html?$/;

// brisa.config.ts
var brisa_config_default = {
  output: "node",
  outputAdapter: N()
};
export {
  brisa_config_default as default
};
