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
    
    it("increases the bucket length when all buckets are occupied",() => {
        const {set,getBuckets} = HashMap()
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60]
        for (const key of keys) {
            set(String.fromCharCode(key),key)
        }
        const buckets = getBuckets()
        expect(buckets).toHaveLength(32)
    })
})

describe("Get",() => {
    it("returns null if the key is not found",() => {
        const {get} = HashMap()
        expect(get("k")).toBeNull()
    })
    it("returns the correct pair if the key is found and there's only one occupied bucket",() => {
        const key = "abcde";
        const {get,set} = HashMap()
        set(key,key)
        expect(get(key)).toEqual({[key]:key})
    })
    it("returns the correct pair if the key is the bucket but not at the head of the bucket",() => {
        const {set,hash,get} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        expect(get(key2)).toEqual({[key2]:value2})
    })
    it("returns the correct pair if key is found even after the buckets size has increased", () => {
        const {set,get} = HashMap()
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60]
        for (const key of keys) {
            set(String.fromCharCode(key),key)
        }
        expect(get(String.fromCharCode(59))).toEqual({[String.fromCharCode(59)]:59})
    })
})

describe("Has",() => {
    it("returns false if the key is not found",() => {
        const {has} = HashMap()
        expect(has("k")).toBe(false)
    })
    it("returns true if the key is found and there is only one bucket occupied", () => {
        const key = "abcde";
        const {has,set} = HashMap()
        set(key,key)
        expect(has(key)).toBe(true)
    })
    it("returns true if the key is found but it's not at the head of the bucket",() => {
        const {set,has} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        expect(has(key2)).toBe(true)
    })
    it("returns false if the key is not found but has the same hashing as another key which occupies a bucket", () => {
        const {set,has} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        expect(has(key2)).toBe(false)
    })
    it("returns true if the key is found even after the buckets size has increased",() =>{
        const {set,has} = HashMap()
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60]
        for (const key of keys) {
            set(String.fromCharCode(key),key)
        }
        expect(has(String.fromCharCode(58))).toBe(true)
    })
})

describe("Remove", () => {
    it("doesn't remove anything and returns false if the key is not found",() => {
        const key = "abcde";
        const {remove,set,has} = HashMap()
        set(key,key)
        const result = remove("a")
        expect(has(key)).toBe(true)
        expect(result).toBe(false)
    })
    it("removes the pair and returns true if the key is found at the head",() => {
        const {remove,set,has} = HashMap()
        const key = "abcde";
        set(key,key)
        const result = remove(key)
        expect(has(key)).toBe(false)
        expect(result).toBe(true)
    })
    it("removed the pair and returns true if the key is found at the head and there are more nodes after it",() => {
        const {set,has,remove} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        const result = remove(key)
        expect(has(key)).toBe(false)
        expect(has(key2)).toBe(true)
        expect(result).toBe(true)
    })
    it("removes the pair amd returns true if the key is found but it's not at the head of the bucket",() => {
        const {set,has,remove} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        const result = remove(key2)
        expect(has(key)).toBe(true)
        expect(has(key2)).toBe(false)
        expect(result).toBe(true)
    })
    it("removes the pair and returns true if the key is found but it's not at the head of the bucket and there's more node after it",() => {
        const {set,has,hash,remove} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        const key3 = "pa"
        const value3 = "I am yet another value"
        set(key3,value3)
        const result = remove(key2)
        expect(has(key)).toBe(true)
        expect(has(key2)).toBe(false)
        expect(has(key3)).toBe(true)
        expect(result).toBe(true)
    })
    it("removes the pair and returns true even after the buckets size has increased",() =>{
        const {set,has,remove} = HashMap()
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60]
        for (const key of keys) {
            set(String.fromCharCode(key),key)
        }
        const result = remove(String.fromCharCode(58))
        expect(has(String.fromCharCode(58))).toBe(false)
        expect(result).toBe(true)
    })
})