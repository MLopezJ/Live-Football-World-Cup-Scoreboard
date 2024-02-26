# APPDR 010: Error management

As it is described in [APPDR 009: Edge cases](./009-edge-cases.md), there are some constraints that the library consider in its functionality. When an action does not follow those constraints, occurs what is considered as an 'error'.

By the use of `Error` class from JavaScript and the concept of `inheritance` from Object Oriented programing, errors are managed depending on their nature; so for example, an error that is created in the context of the `Match` class has its own "match error" class to comunicate properly the situation.

When an error happens, it is throw and in the [README](../README.md#example-of-usage) and [../src/example.ts](../src/example.ts) files are examples about how to catch them. The decision of throw errors was taken to favor the usability of the library from the user perspective; if something does not happens as expected is more valuable for the user of the lib (a developer or another system) to have an error object with the context of the situation instead of just a log of what happened.
