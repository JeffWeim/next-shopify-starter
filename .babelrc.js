module.exports = {
  "presets": ["next/babel"],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./"]
      }
    ],
    ["styled-components", { "ssr": true, "displayName": process.env.NODE_ENV !== "production" }]
  ]
}
