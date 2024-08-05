#!/usr/bin/env node

import { program } from 'commander'
import { bech32 } from 'bech32'

// Function to convert string to Uint8Array
function stringToUint8Array(str) {
  return new TextEncoder().encode(str)
}

// Function to convert a number to 32-bit big-endian Uint8Array
function toBigEndianUint8Array(num) {
  const buffer = new ArrayBuffer(4)
  new DataView(buffer).setUint32(0, num, false)
  return new Uint8Array(buffer)
}

// Function to encode TLV items
function encodeTLV(identifier, authorPubkey, kind, relay) {
  const tlvItems = []

  // Encode identifier
  const identifierBytes = stringToUint8Array(identifier)
  tlvItems.push(new Uint8Array([0]), new Uint8Array([identifierBytes.length]), identifierBytes)

  // Encode author pubkey
  tlvItems.push(new Uint8Array([2]), new Uint8Array([32]), authorPubkey)

  // Encode kind
  const kindBytes = toBigEndianUint8Array(kind)
  tlvItems.push(new Uint8Array([3]), new Uint8Array([4]), kindBytes)

  // Encode relay if provided
  if (relay) {
    const relayBytes = stringToUint8Array(relay)
    tlvItems.push(new Uint8Array([1]), new Uint8Array([relayBytes.length]), relayBytes)
  }

  // Concatenate all TLV items
  return Buffer.concat(tlvItems.map(item => Buffer.from(item)))
}

// Function to encode naddr
function encodeNaddr(identifier, authorPubkeyHex, kind, relay) {
  const authorPubkey = Buffer.from(authorPubkeyHex, 'hex')
  const tlv = encodeTLV(identifier, authorPubkey, kind, relay)
  const words = bech32.toWords(tlv)
  return bech32.encode('naddr', words)
}

program
  .name('naddr-encoder')
  .description('CLI to encode NAddr')
  .version('1.0.0')
  .requiredOption('-d, --dtag <string>', 'd tag identifier')
  .requiredOption('-p, --pubkey <hex>', 'author public key (hex)')
  .requiredOption('-k, --kind <number>', 'kind', parseInt)
  .option('-r, --relay <url>', 'relay URL')
  .action((options) => {
    try {
      const encodedNaddr = encodeNaddr(options.dtag, options.pubkey, options.kind, options.relay)
      console.log(encodedNaddr)
    } catch (error) {
      console.error('Error encoding NAddr:', error.message)
      process.exit(1)
    }
  })

program.parse(process.argv)
