# capability-token

_Stability: 1 - [Experimental](https://github.com/tristanls/stability-index#stability-1---experimental)_

[![NPM version](https://badge.fury.io/js/capability-token.png)](http://npmjs.org/package/capability-token)

## Contributors

[@tristanls](https://github.com/tristanls)

## Contents

  * [Overview](#overview)
  * [Installation](#installation)
  * [Tests](#tests)
  * [Usage](#usage)
  * [Documentation](#documentation)
  * [Releases](#releases)

## Overview

This module documents the capability token format and provides a reference implementation.

### Capability token format

```
capability_token = "CPBLTY" version "-" base64url
```

Example:

```
CPBLTY1-IbwNerN4Dw4BYlpYc4Az-pNBWen_WsdrTrpb-HmMiJOEHvCv1xHKBn2Q
```

The string `CPBLTY` is a well-known string to facilitate searches for leaked
capabilities. `version` is the numeric version of the capability token.
`base64url` is URL-safe base64 encoded bytes of the specified capability.

## Installation

    npm install capability-token

## Tests

    npm test

## Usage

```javascript
const cryto = require("crypto");
const CapabilityToken = require("capability-token");

const token1 = CapabilityToken.parse("CPBLTY1-IbwNerN4Dw4BYlpYc4Az-pNBWen_WsdrTrpb-HmMiJOEHvCv1xHKBn2Q");

console.log(token1.serialize() == "CPBLTY1-IbwNerN4Dw4BYlpYc4Az-pNBWen_WsdrTrpb-HmMiJOEHvCv1xHKBn2Q")

const token2 = new CapabilityToken(
    {
        body: crypto.randomBytes(64).toString("base64")
    }
);

console.log(token2.serialize());
```

## Documentation

### CapabilityToken

**Public API**
  * [CapabilityToken.parse(token)](#capabilitytokenparsetoken)
  * [new CapabilityToken(config)](#new-capabilitytokenconfig)
  * [capabilityToken.serialize()](#capabilitytokenserialize)

#### CapabilityToken.parse(token)

  * `token`: _String_ String in capability token format.
  * Return: _CapabilityToken_ Version 1 capability token.

Parses `token` string and returns a version 1 `CapabilityToken`.

#### new CapabilityToken(config)

  * `config`: _Object_ Configuration.
    * `version`: _Number_ _(Default: 1)_ Version number to use.
    * `body`: _String_ Base64 encoded string to use for token body.
  * Return: _CapabilityToken_ Capability token with specified version and body.

Creates a new `CapabilityToken` with the specified `version` and `body`.

#### capabilityToken.serialize()

  * Return: _String_ String in capability token format.

Serializes `capabilityToken` into a string in capability token format.

## Releases

[Current releases](https://github.com/capabilityio/capability-token/releases).

### Policy

We follow the semantic versioning policy ([semver.org](http://semver.org/)) with a caveat:

> Given a version number MAJOR.MINOR.PATCH, increment the:
>
>MAJOR version when you make incompatible API changes,<br/>
>MINOR version when you add functionality in a backwards-compatible manner, and<br/>
>PATCH version when you make backwards-compatible bug fixes.

**caveat**: Major version zero is a special case indicating development version that may make incompatible API changes without incrementing MAJOR version.


