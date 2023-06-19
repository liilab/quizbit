import create_config from "@kucrut/vite-for-wp";
import liveReload from "vite-plugin-live-reload";
import react from "@vitejs/plugin-react";

// Function to run during development
export default {
  ...create_config("", "dist", {
    plugins: [react(), liveReload(`${__dirname}/**/*\.php`)],

    build: {
      manifest: false,
      outDir: "dist",
      emptyOutDir: true,
      sourcemap: false,
      rollupOptions: {
        input: {
          admin: `${__dirname}/src/admin/admin.tsx`,
          user: `${__dirname}/src/user/user.tsx`,
        },
        output: {
          chunkFileNames: "js/[name].js",
          entryFileNames: "js/[name].js",

          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')){
                return 'images/[name][extname]';
            }

            if (/\.css$/.test(name ?? "")) {
              return "css/[name][extname]";
            }
            return "[name][extname]";
          },
        },
      },
    },
  }),
};
