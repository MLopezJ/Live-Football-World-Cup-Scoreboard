# ADR 007: Use of Fluent Interface

`Fluent Interface` is used to create an easy-to-read and understandable API, the implementation of it allows developers to write instructions that reads like a sentence in a natural language, like in JavaScript array functions when chain functions as following:

```TypeScript
[1, 2, 3, 4]
  .map((element) => element * 2)
  .filter((element) => element % 2 === 0);
```

In the project, it is used in cases like:

```TypeScript
// ...

worldCup
    .addTeam(crc)  // Costa Rica
    .addTeam(nor)  // Norway
    .addTeam(bra)  // Brazil
    .addTeam(arg)  // Argentina
    .addTeam(ita)  // Italy
    .addTeam(esp); // Spain

worldCup
    .addMatch(crc, nor)  // CRC vs NOR
    .addMatch(bra, arg)  // BRA vs ARG
    .addMatch(ita, esp); // ITA vs ESP

// ...
```
