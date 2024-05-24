import { it,expect } from "vitest";
import { sayHello } from "./hashmap";

it("Returns hello world string",() => {
    expect(sayHello()).toEqual("hello world")
})