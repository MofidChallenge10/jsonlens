<div align="center">

![jsonlens banner](assets/banner.svg)

# 🔍 jsonlens

**Pretty-print and query JSON from your terminal. Zero dependencies, one file.**

![Node](https://img.shields.io/badge/node-14+-339933?logo=node.js&logoColor=white)
![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

</div>

---

## ✨ Features

- 🎨 **Pretty-print** or minify any JSON
- 🎯 **Simple queries** — `users[0].name`, `users.0.name`, or `users.*.name`
- 🗝️ **Key listing** with `--keys`
- 🔗 **Pipe friendly** — reads from a file or stdin
- 📦 **Zero dependencies** — just Node.js

## 🚀 Quick start

```bash
git clone https://github.com/MofidChallenge10/jsonlens.git
cd jsonlens
node jsonlens.js --help
```

## 🧪 Examples

Given `data.json`:

```json
{ "users": [{ "name": "Ada", "age": 36 }, { "name": "Linus", "age": 54 }] }
```

```bash
# 🎨 Pretty-print
node jsonlens.js data.json

# 🎯 Extract a value
node jsonlens.js data.json -q "users[0].name" -r      # Ada

# 🌟 Wildcard
node jsonlens.js data.json -q "users.*.name" -c       # ["Ada","Linus"]

# 🔗 From stdin
curl -s https://api.example.com/data | node jsonlens.js -q "items[0]"
```

## ⚙️ Options

| Flag | Description |
| --- | --- |
| `-q, --query <path>` | 🎯 Extract a value by path |
| `-k, --keys` | 🗝️ Print keys of the result |
| `-c, --compact` | 📦 Minified output |
| `-r, --raw` | ✏️ Print strings without quotes |
| `-h, --help` | ❓ Show help |

## 🚦 Exit codes

- `0` ✅ success
- `1` ⚠️ path not found
- `2` ❌ invalid input or JSON

## 🤝 Contributing

Pull requests are welcome! 💡

## 📄 License

MIT © MofidChallenge10
