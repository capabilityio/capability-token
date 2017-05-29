"use strict";

const clone = require("clone");
const crypto = require("crypto");

const CapabilityToken = require("../index.js");

test("no CPBLTY prefix returns false", () =>
    {
        const invalid =
        [
            null, undefined, 17, "", "bleh", "Bearer foo"
        ];
        invalid.map(value =>
            {
                expect(CapabilityToken.parse(value)).toBe(false);
            }
        );
    }
);

test("not base64", () =>
    {
        const invalid = [ "CPBLTY1-not base 64" ];
        invalid.map(value =>
            {
                expect(CapabilityToken.parse(value)).toBe(false);
            }
        );
    }
);

test("invalid version", () =>
    {
        const invalid =
        [
            "CPBLTY-beef", "CPBLTY2-beef"
        ];
        invalid.map(value =>
            {
                expect(CapabilityToken.parse(value)).toBe(false);
            }
        );
    }
);

describe("version 1", () =>
{
    it("returns parsed capability", () =>
        {
            const capability = crypto.randomBytes(64).toString("base64");
            const urlSafeCapability = capability
                                        .replace(/\+/g, "-")
                                        .replace(/\//g, "_")
                                        .replace(/=+$/, "");
            expect(CapabilityToken.parse(`CPBLTY1-${urlSafeCapability}`))
                .toEqual(
                    new CapabilityToken(
                        {
                            version: 1,
                            body: capability
                        }
                    )
                );
        }
    );
});
