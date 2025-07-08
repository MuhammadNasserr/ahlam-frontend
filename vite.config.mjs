// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";
let mainCssFileName = "";
export default defineConfig({
  server: {
    host: "0.0.0.0", // ده بيخلي السيرفر متاح على كل عناوين IP المتاحة للكمبيوتر
    // أو ممكن تستخدم: host: true
    // port: 5173, // ده البورت اللي السيرفر هيشتغل عليه، ممكن يكون أي رقم تاني
  },
  base: "./",
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        tags: [
          {
            injectTo: "head-prepend",
            tag: "link",
            attrs: {
              rel: "preload",
              as: "image",
              href: "/images/img1-1920.webp", // مسار الصورة الأكبر أو الافتراضية
              imagesrcset:
                "/images/img1-320.webp 320w, /images/img1-480.webp 480w, /images/img1-768.webp 768w, /images/img1-1024.webp 1024w, /images/img1-1440.webp 1440w, /images/img1-1920.webp 1920w",
              imagesizes: "100vw",
            },
          },
        ],
      },
    }),
    visualizer({ open: true }),
  ],
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            const moduleName = id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();

            // المكتبات الأساسية اللي بنقسمها
            if (["react", "react-dom"].includes(moduleName)) {
              return "react-core";
            }
            if (["aos", "@tanstack/react-query"].includes(moduleName)) {
              return "app-vendors";
            }
            if (["bootstrap"].includes(moduleName)) {
              return "bootstrap";
            }

            // **التعديل الجديد هنا:**
            // لا تخصص chunk منفصل لـ 'lottie-web' يدويًا في الـ manualChunks
            // لأننا نريدها أن تتقسم فقط من خلال الـ dynamic imports في الكود
            if (moduleName === "lottie-web") {
              return undefined; // لا تقسمها كـ chunk منفصل هنا
            }

            // المكتبات اللي كانت بتسبب "empty chunk"
            const emptyChunkModules = [
              "invariant",
              "react-lifecycles-compat",
              "react-router-dom", // لو react-router-dom بيعمل empty chunk
              "set-cookie-parser",
              "turbo-stream",
            ];
            if (emptyChunkModules.includes(moduleName)) {
              return undefined;
            }

            // أي مكتبة تانية في node_modules هتتقسم باسمها (باستثناء اللي فوق)
            return moduleName;
          }
          return undefined; // دع Rollup يتعامل مع ملفاتك الخاصة
        },
        assetFileNames: (assetInfo) => {
          if (
            assetInfo.type === "asset" &&
            assetInfo.name.endsWith(".css") &&
            assetInfo.name.includes("index")
          ) {
            mainCssFileName = `/${assetInfo.name}`; // تخزين المسار الكامل لملف CSS
            // تأكد من أن المسار في output هو نفسه الذي سيتم حقنه
            return `assets/${assetInfo.name}`;
          }

          return "assets/[name]-[hash][extname]";
        },
        plugins: [
          {
            name: "inject-non-blocking-css-after-build",
            generateBundle(options, bundle) {
              // هذا الـ hook يعمل بعد أن يتم تجميع جميع الملفات
              if (mainCssFileName) {
                // قم بحقن الـ link tag في الـ index.html
                const indexHtmlAsset = bundle["index.html"]; // الوصول إلى asset الخاص بـ index.html

                if (indexHtmlAsset && indexHtmlAsset.source) {
                  // الـ link tag لملف CSS غير الحظر (مع الهاش الذي التقطناه)
                  const cssLinkTag = `
                <link rel="stylesheet" href="${mainCssFileName}" media="print" onload="this.media='all'">
                <noscript><link rel="stylesheet" href="${mainCssFileName}"></noscript>
              `;

                  // مكان الحقن: ابحث عن </head> وأضف قبله (ليكون في الـ head)
                  indexHtmlAsset.source = indexHtmlAsset.source.replace(
                    "</head>",
                    `${cssLinkTag}\n</head>`,
                  );
                }
              }
            },
          },
        ],
      },
    },
  },
});
