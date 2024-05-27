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

describe("Set",() => {


    it("sets the key value pair when the bucket is empty", () => {
        const {set,hash,getBuckets} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const buckets =  getBuckets()
        const bucket = buckets[hash(key)]
        expect(bucket.head.pair).toEqual({[key]:value})
    } )

    it("sets the key value pair to the next node when the bucket is occupied", () => {
        const {set,hash,getBuckets} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        const buckets =  getBuckets()
        const bucket = buckets[hash(key2)]
        expect(bucket.head.nextNode.pair).toEqual({[key2]:value2})
    })

    it("replaces the value when a node has the same key", () => {
        const {set,hash,getBuckets} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const newValue = "I am the new value"
        set(key,newValue)
        const buckets = getBuckets()
        const bucket = buckets[hash(key)]
        expect(bucket.head.pair).toEqual({[key]:newValue})
    })
    
})