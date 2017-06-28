"use strict";

const assert = require("assert");
const crypto = require("crypto");

const fromUrlSafeBase64 = base64url =>
{
    let length = base64url.length;
    return `${base64url.replace(/\-/g, "+").replace(/\_/g, "/")}${new Array(5 - (length % 4)).join("=")}`;
};
const toUrlSafeBase64 = base64 => base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

const CapabilityToken = module.exports = function({ version = 1, body = crypto.randomBytes(64).toString("base64") } = {})
{
    assert.ok(CapabilityToken.ONLY_BASE64_REGEX.exec(body));
    const self = this;
    self.version = version;
    self.body = body;
};

CapabilityToken.BASE64URL_REGEX = new RegExp("(?:[-_A-Za-z0-9]{4})*(?:[-_A-Za-z0-9]{2}|[-_A-Za-z0-9]{3})?");
CapabilityToken.ONLY_BASE64_REGEX = new RegExp("^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$");
CapabilityToken.TOKEN_REGEX = new RegExp(`^CPBLTY([0-9]+)-(${CapabilityToken.BASE64URL_REGEX.source})$`);

CapabilityToken.parse = token =>
{
    const parsed = CapabilityToken.TOKEN_REGEX.exec(token);
    // parsed[1] is version number
    // parsed[2] is base64url body
    if (!parsed)
    {
        return false;
    }
    switch (parsed[1])
    {
        case "1":
            return new CapabilityToken(
                {
                    version: 1,
                    body: fromUrlSafeBase64(parsed[2])
                }
            );
        default:
            return false;
    }
};

CapabilityToken.prototype.serialize = function()
{
    const self = this;
    switch (self.version)
    {
        case 1:
            let valid = CapabilityToken.ONLY_BASE64_REGEX.exec(self.body);
            if (!valid)
            {
                throw new Error(`Token body is not base64 encoded.`);
            }
            return `CPBLTY${self.version}-${toUrlSafeBase64(self.body)}`;
        default:
            throw new Error(`Unsupported token version ${self.version}`);
    }
};
