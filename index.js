import { bech32 } from 'bech32'

// Function to convert string to Uint8Array
function stringToUint8Array (str) {
  return new TextEncoder().encode(str)
}

// Function to convert a number to 32-bit big-endian Uint8Array
function toBigEndianUint8Array (num) {
  const buffer = new ArrayBuffer(4)
  new DataView(buffer).setUint32(0, num, false)
  return new Uint8Array(buffer)
}

// Function to encode TLV items
function encodeTLV (identifier, authorPubkey, kind, relay) {
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
  return Buffer.concat(tlvItems)
}

// Function to encode naddr
export function encodeNaddr (identifier, authorPubkeyHex, kind, relay) {
  const authorPubkey = Buffer.from(authorPubkeyHex, 'hex')
  const tlv = encodeTLV(identifier, authorPubkey, kind, relay)
  const words = bech32.toWords(tlv)
  return bech32.encode('naddr', words, 1000)
}

// Example usage
const identifier = 'example_id'
const authorPubkeyHex = '3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d'
const kind = 1234
const relay = 'wss://example.com'
const encodedNaddr = encodeNaddr(identifier, authorPubkeyHex, kind, relay)
console.log('Encoded naddr:', encodedNaddr)
