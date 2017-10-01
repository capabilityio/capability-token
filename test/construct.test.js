"use strict";

const crypto = require("crypto");

const CapabilityToken = require("../index.js");

describe("body", () =>
{
    it("accepts Base64 encoding", () =>
        {
            const buffer = crypto.randomBytes(64);
            const base64 = buffer.toString("base64");
            expect(() => new CapabilityToken(
                {
                    body: base64
                }
            )).not.toThrow();
        }
    );
    it("accepts Base64url encoding", () =>
        {
            const buffer = crypto.randomBytes(64);
            const base64url = CapabilityToken.toUrlSafeBase64(buffer.toString("base64"));
            expect(() => new CapabilityToken(
                {
                    body: base64url
                }
            )).not.toThrow();
        }
    );
    it("accepts Buffer", () =>
        {
            const buffer = crypto.randomBytes(64);
            expect(() => new CapabilityToken(
                {
                    body: buffer
                }
            )).not.toThrow();
        }
    );
    it("encodings are equivalent", () =>
        {
            const buffer = crypto.randomBytes(64);
            const base64 = buffer.toString("base64");
            const base64url = CapabilityToken.toUrlSafeBase64(base64);
            const bufferToken = new CapabilityToken(
                {
                    body: buffer
                }
            );
            const base64Token = new CapabilityToken(
                {
                    body: base64
                }
            );
            const base64urlToken = new CapabilityToken(
                {
                    body: base64url
                }
            );
            expect(bufferToken.serialize()).toEqual(base64Token.serialize());
            expect(bufferToken.serialize()).toEqual(base64urlToken.serialize());
            expect(base64Token.serialize()).toEqual(base64urlToken.serialize());
        }
    );
});
