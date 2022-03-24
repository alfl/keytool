# Keytool

A tool for generating base64-encoded ECDSA keys for kubelt.com.

## Example Output

```bash
SECRET KEY (NOT FOR SHARING)	 eyJrdHkiOiJFQyIsIngiOiJvSkk2MVdEMWhnOTM4Zm5DOXBtclF2aVFOSmlFVUtZTXBrdkotTUdGc01jIiwieSI6Ik1aeHB5V3Ayemk4V0pfaFd1ZGVodzJxNTlJZk44ZlhhVzBaQ3VLS0J3YVUiLCJjcnYiOiJQLTI1NiIsImQiOiJiRW9xS0lOdmo4TnZHR2JQTHJYbEJaVDluZ0VsNTViclBpTm4zNXVtdVZnIn0=
PUBLIC KEY (SHARE WITH KUBELT)	 eyJrdHkiOiJFQyIsIngiOiJvSkk2MVdEMWhnOTM4Zm5DOXBtclF2aVFOSmlFVUtZTXBrdkotTUdGc01jIiwieSI6Ik1aeHB5V3Ayemk4V0pfaFd1ZGVodzJxNTlJZk44ZlhhVzBaQ3VLS0J3YVUiLCJjcnYiOiJQLTI1NiJ9
```

## Quickstart

```bash
npm i
npm start
```

## Tests

The tool self-tests by unpacking the generated keys and attempting a signature verification with them.
