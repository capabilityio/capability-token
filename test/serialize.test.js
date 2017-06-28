"use strict";

const clone = require("clone");
const crypto = require("crypto");

const CapabilityToken = require("../index.js");

test("invalid token throws", () =>
    {
        let token = new CapabilityToken(
            {
                body: crypto.randomBytes(64).toString("base64")
            }
        );
        token.body = "nope nope";
        expect(() => token.serialize()).toThrow(Error);
        token = new CapabilityToken(
            {
                version: 17,
                body: crypto.randomBytes(64).toString("base64")
            }
        );
        expect(() => token.serialize()).toThrow(Error);
    }
);

test("no token version defaults to version 1", () =>
    {
        let token = new CapabilityToken();
        expect(token.serialize()).toEqual(expect.stringMatching(`^CPBLTY1-.*$`));
    }
);

test("no token body generates body", () =>
    {
        let token = new CapabilityToken();
        expect(token.serialize.bind(token)).not.toThrow();
        expect(token.serialize()).toEqual(expect.stringMatching(`^CPBLTY([0-9]+)-(${CapabilityToken.BASE64URL_REGEX.source})$`));
    }
);

test("serializes token", () =>
    {
        let body = crypto.randomBytes(64).toString("base64");
        let token = new CapabilityToken(
            {
                body
            }
        );
        expect(token.serialize()).toBe(`CPBLTY1-${body.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")}`);
    }
);
