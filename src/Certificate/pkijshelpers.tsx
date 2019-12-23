const pkiJS = require("pkijs");
const asn1js = require("asn1js");

const createPKIJSCertificate = (pem: string) => {
  const certArrayBuffer = convertPemToArrayBuffer(removePemArmoring(pem));
  const asn1data = asn1js.fromBER(certArrayBuffer);
  return new pkiJS.Certificate({ schema: asn1data.result });
};

function removePemArmoring(pemString: string) {
  const result = pemString.replace(
    /((\n|\r)?-----BEGIN CERTIFICATE-----(\n|\r)?|(\n|\r)?-----END CERTIFICATE-----(\n|\r)?)/g,
    ""
  );
  return result.trim();
}

function convertPemToArrayBuffer(pemString: string) {
  const buffer = Buffer.from(pemString, "base64");

  return new Uint8Array(buffer).buffer;
}

export {createPKIJSCertificate};