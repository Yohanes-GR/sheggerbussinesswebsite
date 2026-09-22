const { execSync } = require("child_process");

function missing(pkg) {
  try {
    require.resolve(pkg);
    return false;
  } catch {
    return true;
  }
}

const pkgs = ["@tailwindcss/postcss", "tailwindcss"];
const need = pkgs.filter(missing);
if (need.length === 0) process.exit(0);

const env = { ...process.env, NODE_ENV: "development" };
delete env.npm_config_production;
delete env.npm_config_omit;

execSync(`npm install ${need.map((pkg) => `${pkg}@^4`).join(" ")} --no-fund --no-audit`, {
  stdio: "inherit",
  env,
});
