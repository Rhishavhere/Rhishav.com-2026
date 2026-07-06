import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

/**
 * Always-loaded core libraries (react, gsap) split into long-lived, separately
 * cached vendor chunks. Route-specific packages are intentionally omitted here;
 * Vite's automatic code splitting places them in the relevant route chunk so
 * they aren't loaded unnecessarily on every page.
 */
function manualChunks(id) {
  if (!id.includes("node_modules")) return;
  if (/[\\/]node_modules[\\/](gsap|@gsap)[\\/]/.test(id)) return "vendor-gsap";
  if (
    /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/.test(
      id
    )
  ) {
    return "vendor-react";
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === "build";

  return {
    plugins: [react()],

    resolve: {
      alias: {
        // ESM-compatible absolute path — no need for __dirname
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },

    css: {
      // CSS source maps in development — easier debugging
      devSourcemap: true,
    },

    esbuild: {
      // Strip console/debugger only in production; keep in dev
      drop: isProduction ? ["console", "debugger"] : [],
      legalComments: "none",
    },

    build: {
      target: "esnext",
      minify: "esbuild",
      cssMinify: true,
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks,
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.css$/.test(name ?? "")) {
              return "assets/css/[name]-[hash][extname]";
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(name ?? "")) {
              return "assets/fonts/[name]-[hash][extname]";
            }
            return "assets/misc/[name]-[hash][extname]";
          },
        },
      },
    },

    server: {
      host: true,
      port: 5173,
    },

    preview: {
      host: true,
      port: 4173,
    },
  };
});
