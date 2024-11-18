<div align="center">  
  <h1>naddr</h1>
</div>

<div align="center">  
<i>naddr</i>
</div>

---

<div align="center">
<h4>Documentation</h4>
</div>

---

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/nostrapps/naddr/blob/gh-pages/LICENSE)
[![npm](https://img.shields.io/npm/v/naddr)](https://npmjs.com/package/naddr)
[![npm](https://img.shields.io/npm/dw/naddr.svg)](https://npmjs.com/package/naddr)
[![Github Stars](https://img.shields.io/github/stars/nostrapps/naddr.svg)](https://github.com/nostrapps/naddr/)

# NAddr Encoder CLI

A powerful and easy-to-use command-line interface (CLI) for encoding NAddr (Nostr Address) format. This tool simplifies the process of generating NAddr strings, making it perfect for developers working with Nostr-related applications.

## 🌟 Features

- Encode NAddr strings with a simple command
- Support for all required NAddr components
- Optional relay URL inclusion
- User-friendly command-line interface
- Built with Node.js for cross-platform compatibility

## 🚀 Installation

You can install the NAddr Encoder CLI globally using npm:

```bash
npm install -g naddr
```

## 📖 Usage

After installation, you can use the `naddr` command from anywhere in your terminal.

### Basic Usage

```bash
naddr -d <identifier> -p <pubkey> -k <kind> [-r <relay>]
```

### Options

- `-d, --identifier <string>`: The identifier for the NAddr (required)
- `-p, --pubkey <hex>`: The author's public key in hexadecimal format (required)
- `-k, --kind <number>`: The kind number (required)
- `-r, --relay <url>`: The relay URL (optional)
- `-h, --help`: Display help information
- `-V, --version`: Output the version number

### Example

```bash
naddr -d myprofile -p 3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d -k 1234 -r wss://example.com
```

This command will output the encoded NAddr string.

## 🛠️ Development

To set up the project for development:

1. Clone the repository:

   ```bash
   git clone https://github.com/nostrapps/naddr.git
   cd naddr
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Link the package locally:
   ```bash
   npm link
   ```

Now you can run the `naddr` command, and it will use your local development version.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/naddr/issues).

## 📄 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

## 🙏 Acknowledgements

- [Nostr Protocol](https://github.com/nostr-protocol/nips) for the NAddr specification
- [bech32](https://github.com/bitcoinjs/bech32) for Bech32 encoding
- [commander](https://github.com/tj/commander.js/) for the CLI interface

Made with ❤️ by Melvin Carvalho
