"use strict";

const assert = require("assert");
const crypto = require("crypto");

const fromUrlSafeBase64 = base64url =>
{
    let length = base64url.length;
    return `${base64url.replace(/\-/g, "+").replace(/\_/g, "/")}${new Array(5 - (length % 4)).join("=")}`;
};

class CapabilityToken
{
    constructor({ version = 1, body = crypto.randomBytes(64) } = {})
    {
        const self = this;
        self.version = version;
        self.body = body;
        if (!Buffer.isBuffer(body))
        {
            assert.ok(CapabilityToken.BASE64_BASE64URL_REGEX.exec(body));
            self.body = Buffer.from(self.body, "base64");
        }
        self.wellKnown = `CPBLTY${self.version}`;
    }

    static parse(token)
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
                        body: parsed[2]
                    }
                );
            default:
                return false;
        }
    }

    static toUrlSafeBase64(base64)
    {
        return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }

    serialize()
    {
        const self = this;
        switch (self.version)
        {
            case 1:
                let valid = Buffer.isBuffer(self.body);
                if (!valid)
                {
                    throw new Error(`Token body is not Buffer.`);
                }
                return `CPBLTY${self.version}-${CapabilityToken.toUrlSafeBase64(self.body.toString("base64"))}`;
            default:
                throw new Error(`Unsupported token version ${self.version}`);
        }
    }
}

CapabilityToken.BASE64URL_REGEX = new RegExp("(?:[-_A-Za-z0-9]{4})*(?:[-_A-Za-z0-9]{2}|[-_A-Za-z0-9]{3})?");
CapabilityToken.BASE64_BASE64URL_REGEX = new RegExp("^(?:[-_A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[-_A-Za-z0-9]{2,3})?$");
CapabilityToken.TOKEN_REGEX = new RegExp(`^CPBLTY([0-9]+)-(${CapabilityToken.BASE64URL_REGEX.source})$`);

module.exports = CapabilityToken;
