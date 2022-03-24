const crypto = require('crypto')
const jose = require('jose')

async function validate_keys(baseSK, basePK) {
    const test_msg = 'this is only a test'

    const buffSK = Buffer.from(baseSK, 'base64')
    const jsonSK = JSON.parse(buffSK)
    const skey = await jose.importJWK(jsonSK, 'ES256')

    const sign = crypto.createSign('SHA256')
    sign.write(test_msg)
    sign.end()

    const sig = sign.sign(skey, 'base64')

    const buffPK = Buffer.from(basePK, 'base64')
    const jsonPK = JSON.parse(buffPK)
    const pkey = await jose.importJWK(jsonPK, 'ES256')

    const verify = crypto.createVerify('SHA256')
    verify.write(test_msg)
    verify.end()

    return verify.verify(pkey, sig, 'base64')
}

async function start() {
    const ALGO = 'ES256'
    const EXTR = true
    const { publicKey, privateKey } = await jose.generateKeyPair(ALGO, { extractable: EXTR })

    const exportPK = await jose.exportJWK(publicKey)
    const exportSK = await jose.exportJWK(privateKey)

    const jsonPK = JSON.stringify(exportPK)
    const jsonSK = JSON.stringify(exportSK)

    const buffPK = Buffer.from(jsonPK)
    const buffSK = Buffer.from(jsonSK)

    const basePK = buffPK.toString('base64')
    const baseSK = buffSK.toString('base64')

    // Test key integrity:
    if (await validate_keys(baseSK, basePK)) {
        console.log('SECRET KEY (NOT FOR SHARING)\t', baseSK)
        console.log('PUBLIC KEY (SHARE WITH KUBELT)\t', basePK)
        process.exit(0)
    } else {
        console.error('Public key cannot validate private key signatures!')
        process.exit(1)
    }
}

start()
