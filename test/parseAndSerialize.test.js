"use strict";

const crypto = require("crypto");

const CapabilityToken = require("../index.js");

test("serializes and parses version 1 token", () =>
    {
        let token = new CapabilityToken();
        expect(CapabilityToken.parse(token.serialize())).toEqual(token);
    }
);
