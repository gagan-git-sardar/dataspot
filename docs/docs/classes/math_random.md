---
layout: default
title: random
parent: math
grand_parent: Dataspot
has_children: false
---

**[@ascentcore/dataspot](../README.md)**

> [Globals](../globals.md) / math.random

# random

## Hierarchy

* **math.random**

## Index

### Properties

* [rand](math_random.md#rand)

### Methods

* [mulberry32](math_random.md#mulberry32)
* [random](math_random.md#random)
* [randomChoice](math_random.md#randomchoice)
* [randomInt](math_random.md#randomint)
* [roundToPrecision](math_random.md#roundtoprecision)
* [seededRandom](math_random.md#seededrandom)
* [seededRandomInt](math_random.md#seededrandomint)
* [xmur3](math_random.md#xmur3)

## Properties

### rand

▪ `Static` `Private` **rand**: (Anonymous function) = Random.mulberry32(Random.xmur3('apples')())

*Defined in [lib/math/random.ts:3](https://github.com/ascentcore/dataspot/blob/46219f5/lib/math/random.ts#L3)*

## Methods

### mulberry32

▸ `Static` `Private`**mulberry32**(`a`: number): (Anonymous function)

*Defined in [lib/math/random.ts:19](https://github.com/ascentcore/dataspot/blob/46219f5/lib/math/random.ts#L19)*

#### Parameters:

Name | Type |
------ | ------ |
`a` | number |

**Returns:** (Anonymous function)

___

### random

▸ `Static`**random**(`min`: number, `max`: number): number

*Defined in [lib/math/random.ts:34](https://github.com/ascentcore/dataspot/blob/46219f5/lib/math/random.ts#L34)*

#### Parameters:

Name | Type |
------ | ------ |
`min` | number |
`max` | number |

**Returns:** number

___

### randomChoice

▸ `Static`**randomChoice**\<T>(`arr`: T[]): T

*Defined in [lib/math/random.ts:54](https://github.com/ascentcore/dataspot/blob/46219f5/lib/math/random.ts#L54)*

#### Type parameters:

Name |
------ |
`T` |

#### Parameters:

Name | Type |
------ | ------ |
`arr` | T[] |

**Returns:** T

___

### randomInt

▸ `Static`**randomInt**(`min`: number, `max`: number): number

*Defined in [lib/math/random.ts:38](https://github.com/ascentcore/dataspot/blob/46219f5/lib/math/random.ts#L38)*

#### Parameters:

Name | Type |
------ | ------ |
`min` | number |
`max` | number |

**Returns:** number

___

### roundToPrecision

▸ `Static`**roundToPrecision**(`input`: number, `precision`: number): number

*Defined in [lib/math/random.ts:29](https://github.com/ascentcore/dataspot/blob/46219f5/lib/math/random.ts#L29)*

#### Parameters:

Name | Type |
------ | ------ |
`input` | number |
`precision` | number |

**Returns:** number

___

### seededRandom

▸ `Static`**seededRandom**(`min`: number, `max`: number): number

*Defined in [lib/math/random.ts:44](https://github.com/ascentcore/dataspot/blob/46219f5/lib/math/random.ts#L44)*

#### Parameters:

Name | Type |
------ | ------ |
`min` | number |
`max` | number |

**Returns:** number

___

### seededRandomInt

▸ `Static`**seededRandomInt**(`min`: number, `max`: number): number

*Defined in [lib/math/random.ts:48](https://github.com/ascentcore/dataspot/blob/46219f5/lib/math/random.ts#L48)*

#### Parameters:

Name | Type |
------ | ------ |
`min` | number |
`max` | number |

**Returns:** number

___

### xmur3

▸ `Static` `Private`**xmur3**(`str`: string): function

*Defined in [lib/math/random.ts:5](https://github.com/ascentcore/dataspot/blob/46219f5/lib/math/random.ts#L5)*

#### Parameters:

Name | Type |
------ | ------ |
`str` | string |

**Returns:** function