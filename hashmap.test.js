import { it,expect, describe } from "vitest";
import HashMap from "./hashmap";

describe("Hash", () =>{
    const {hash} = HashMap();

    it("throws an error if the string passed has length zero", () => {
        const key = "";
        expect(() => hash(key)).toThrow("Key must have length greater than 0")
    })
    it("returns the correct hashcode for passed string with length one",()=>{
        const key = "a";
        const hashCode = hash(key); 
        expect(hashCode).toBe(1)
    })
    
    it("returns the correct hashcode for a passed string with length two",() => {
        const key = "ab";
        const hashCode = hash(key); 
        expect(hashCode).toBe(1)
    })

    it("returns the correct hashcode for a passed string with length five",() => {
        const key = "abcde";
        const hashCode = hash(key);
        expect(hashCode).toBe(3)
    })
})