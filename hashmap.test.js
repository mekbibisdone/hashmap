import { it,expect, describe } from "vitest";
import HashMap from "./hashmap";

describe("Getting the hash for a given key", () =>{
    const {hash} = HashMap();

    it("throws an error if the string passed has length zero", () => {
        const key = "";
        expect(() => hash(key)).toThrow("Key must have length greater than 0")
    })
    it("returns the correct hash code for the passed string with a length of one",()=>{
        const key = "a";
        const hashCode = hash(key); 
        expect(hashCode).toBe(1)
    })
    
    it("returns the correct hash code for a passed string with a length of two",() => {
        const key = "ab";
        const hashCode = hash(key); 
        expect(hashCode).toBe(1)
    })

    it("returns the correct hash code for a passed string with a length of five",() => {
        const key = "abcde";
        const hashCode = hash(key);
        expect(hashCode).toBe(3)
    })
})

describe("Adding a pair into a bucket",() => {

    it("sets the key value pair when the bucket is empty", () => {
        const {set,hash,getBuckets} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const buckets =  getBuckets()
        const bucket = buckets[hash(key)]
        const storedPair = bucket.head.pair
        expect(storedPair).toEqual({[key]:value})
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
        const secondPair = bucket.head.nextNode.pair
        expect(secondPair).toEqual({[key2]:value2})
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
        const storedPair = bucket.head.pair
        expect(storedPair).toEqual({[key]:newValue})
    })
    
    it("increases the bucket length when all buckets are occupied",() => {
        const {set,getBuckets} = HashMap()
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60].map(key =>String.fromCharCode(key) )
        for (const key of keys) {
            set(key,key)
        }
        const buckets = getBuckets()
        expect(buckets).toHaveLength(32)
    })
})

describe("Getting a stored pair that matches the passed key",() => {
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
    it("returns the correct pair if the key is in the bucket but not at the head of the bucket",() => {
        const {set,get} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        expect(get(key2)).toEqual({[key2]:value2})
    })
    it("returns null if the key's hash matches another's key hash but isn't stored",() => {
        const {set,get} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        expect(get(key2)).toBeNull()
    })
    it("returns the correct pair if key is found even after the buckets size has increased", () => {
        const {set,get} = HashMap()
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60].map(key => String.fromCharCode(key) )
        for (const key of keys) {
            set(key,key)
        }
        expect(get(String.fromCharCode(59))).toEqual({[String.fromCharCode(59)]:String.fromCharCode(59)})
    })
})

describe("Checking if a pair is stored",() => {
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
    it("returns false if the key is not found but has the same hashing as another key which occupies the bucket", () => {
        const {set,has} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        expect(has(key2)).toBe(false)
    })
    it("returns true if the key is found even after the buckets size has increased",() =>{
        const {set,has} = HashMap()
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60].map(key => String.fromCharCode(key))
        for (const key of keys) {
            set(key,key)
        }
        expect(has(String.fromCharCode(58))).toBe(true)
    })
})

describe("Removing a pair", () => {
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
    it("removes the pair and returns true if the key is found at the head and there are more nodes after it",() => {
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
        const {set,has,remove} = HashMap()
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
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60].map(key => String.fromCharCode(key))
        for (const key of keys) {
            set(key,key)
        }
        const result = remove(String.fromCharCode(58))
        expect(has(String.fromCharCode(58))).toBe(false)
        expect(result).toBe(true)
    })
})

describe("Getting the number of stored keys", () => {
    it("returns the correct number of stored keys when there is no bucket occupied",() => {
        const {length} = HashMap()
        expect(length()).toBe(0) 
    })
    it("returns the correct number of stored keys when only one bucket is occupied",()=>{
        const key = "abcde";
        const {set,length} = HashMap()
        set(key,key)
        expect(length()).toBe(1) 
    })
    it("returns the correct number of stored keys when only one bucket is occupied but there is more than one key in a bucket",()=>{
        const {set,length} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        expect(length()).toBe(2)
    })
    it("returns the correct number of stored keys when a key is removed from the bucket that has two keys",() => {
        const {set,remove,length} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        remove(key)
        expect(length()).toBe(1)
    })
    it("returns the correct number of stored keys even after the bucket size has increased", () => {
        const {set,length} = HashMap()
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60].map(key => String.fromCharCode(key))
        for (const key of keys) {
            set(key,key)
        }
        expect(length()).toBe(keys.length)
    })
    it("returns the correct number of stored keys when multiple buckets are occupied and a keys has been removed",() =>{
        const {set,length,remove} = HashMap()
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60].map(key => String.fromCharCode(key))
        for (const key of keys) {
            set(key,key)
        }
        remove(String.fromCharCode(58))
        expect(length()).toBe(keys.length - 1)
    })
})

describe("Clear all the entries", () => {
    it("doesn't do anything if all the buckets are unoccupied",() => {
        const {length,clear,getBuckets} = HashMap()
        const lengthBeforeClear = length()
        const bucketSizeBeforeClear = getBuckets().length
        clear()
        const lengthAfterClear = length()
        const bucketSizeAfterClear = getBuckets().length
        expect(lengthAfterClear).toBe(lengthBeforeClear)
        expect(bucketSizeAfterClear).toBe(bucketSizeBeforeClear)
        
    })
    it("removes all the stored entries and reverts to original bucket size",() => {
        const {set,length,clear,getBuckets} = HashMap()
        const keys = [48,49,50,51,52,53,54,55,56,57,58,59,60].map(key => String.fromCharCode(key))
        for (const key of keys) {
            set(key,key)
        }
        clear()
        expect(length()).toBe(0)
        expect(getBuckets()).toHaveLength(16)
    })
})

describe("Gets all the keys",() =>{
    it("returns an empty list if there are no keys", () => {
        const {keys} = HashMap()
        expect(keys()).toHaveLength(0)
    })
    it("returns the correct list of keys when there is one key in a bucket",() =>{
        const key = "abcde";
        const {set,keys} = HashMap()
        set(key,key)
        expect(keys()).toEqual([key]) 
    })
    it("returns the correct list of keys when there is more than one key in a bucket", () => {
        const {set,keys} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        expect(keys()).toEqual([key,key2])
    })
    it("returns the correct list of keys even after the buckets length has increased",() =>{
        const {set,keys} = HashMap()
        const keyList = [48,49,50,51,52,53,54,55,56,57,58,59,60].map(key => String.fromCharCode(key))
        for (const key of keyList) {
            set(key,key)
        }
        expect(keys()).toEqual(keyList)
    })
})

describe("Get all the values",()=>{
    it("return an empty list when there are value",() => {
        const {values} = HashMap()
        expect(values()).toHaveLength(0)
    })
    it("returns the correct list of values when there is one value in a bucket",() =>{
        const key = "abcde";
        const value = "hello"
        const {set,values} = HashMap()
        set(key,value)
        expect(values()).toEqual([value]) 
    })
    it("returns the correct list of values when there is more than one value in one bucket", () => {
        const {set,values} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        expect(values()).toEqual([value,value2])
    })
    it("returns the correct list of values even after the buckets length has increased",() =>{
        const {set,values} = HashMap()
        const valueList = [48,49,50,51,52,53,54,55,56,57,58,59,60].map(key => String.fromCharCode(key))
        for (const key of valueList) {
            set(key,key)
        }
        expect(values()).toEqual(valueList)
    })
})

describe("Get all the pairs",()=>{
    it("returns an empty list when there is no entry in the buckets",() => {
        const {entries} = HashMap()
        expect(entries()).toHaveLength(0)
    })
    it("returns a list of a pair when there is one bucket occupied",()=>{
        const key = "abcde";
        const value = "hello"
        const {set,entries} = HashMap()
        set(key,value)
        expect(entries()).toEqual([[key,value]]) 
    })
    it("returns the correct list of entries when there is more than one entry in one bucket", () => {
        const {set,entries} = HashMap()
        const key = "a"
        const value = "I am the old value"
        set(key,value)
        const key2 = "ab"
        const value2 = "I am a value"
        set(key2,value2)
        expect(entries()).toEqual([[key,value],[key2,value2]])
    })
    it("returns the correct list of entries even after the buckets length has increased",() =>{
        const {set,entries} = HashMap()
        const entryList = [48,49,50,51,52,53,54,55,56,57,58,59,60].map(key => String.fromCharCode(key))
        for (const entry of entryList) {
            set(entry,entry)
        }
        expect(entries()).toEqual(entryList.map(entry => [entry,entry]))
    })
})