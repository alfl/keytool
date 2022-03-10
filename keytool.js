const crypto = require('libp2p-crypto')

async function validate_pub_key(raw_sec_key, b64_pub_key, test_mode) {
    // Decode and unpack the public key.
    const pbf_pub_key = Buffer.from(b64_pub_key, 'base64')
    const raw_pub_key = await crypto.keys.unmarshalPublicKey(pbf_pub_key)

    // Sign something with the private key.
    const plaintext = crypto.randomBytes(512)
    const sig = await raw_sec_key.sign(plaintext)
    const pub_key_is_valid = await raw_pub_key.verify(plaintext, sig)

    return (!test_mode && pub_key_is_valid)
}

async function start(b64_key, test_mode) {
    const algo = 'ed25519'
    const bitwidth = 2048
    
    const pbf_sec_key = Buffer.from(b64_key, 'base64')
    const raw_sec_key = await crypto.keys.unmarshalPrivateKey(pbf_sec_key)
    const raw_pub_key = raw_sec_key.public
    const pbf_pub_key = await crypto.keys.marshalPublicKey(raw_pub_key)
    const b64_pub_key = pbf_pub_key.toString('base64')

    // Test key integrity:
    if (await validate_pub_key(raw_sec_key, b64_pub_key, test_mode)) {
        console.log(b64_pub_key)
        process.exit(0)
    } else {
        console.error('Public key cannot validate private key signatures!')
        process.exit(1)
    }
}

start(process.argv[2], process.argv[3])
