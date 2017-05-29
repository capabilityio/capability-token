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
        expect(token.serialize).toThrow(Error);
        token = new CapabilityToken(
            {
                version: 17,
                body: crypto.randomBytes(64).toString("base64")
            }
        );
        expect(token.serialize).toThrow(Error);
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
