export default function HashMap(){
  /*
    Creates a hash map
    @returns {object} - An object containing a hash function
  */
  let buckets = Array(16)
  const loadFactor = 0.75
  class LinkedList {
    size = 0;
    head = null;
    tail = null;
    constructor(key,value) {
    this.append(key,value);
    }
    get head() {
      return this.head;
    }
    get tail() {
      return this.tail;
    }
    append(key,value) {
      if (this.tail === null) {
        const node = new Node(key,value);
        this.tail = node;
        this.head = node;
      } else {
        const node = new Node(key,value);
        node.previousNode = this.tail;
        this.tail.nextNode = node;
        this.tail = node;
      }
      this.size += 1;
    }
  }
  class Node {
    constructor(key,value){
      this.pair= {[key]:value}
      this.nextNode = null;
      this.previousNode = null;
    }
  }

  function getBuckets(){
    return buckets;
  }

  function hash(key) {
    /*
    @param {string} key - The key to be hashed
    @returns {number} - The hash code
    */
   if (key.length == 0){
    throw Error("Key must have length greater than 0")
   }
    let hashCode = 0;
       
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
    }
 
    return hashCode;
  }

  function set(key,value){
    const hashCode = hash(key)
    if (buckets[hashCode] === undefined){
      const linkedList = new LinkedList(key,value)
      buckets[hashCode] = linkedList
      increaseBucketSize()
    } else {
      const linkedList = buckets[hashCode]
      let node =  linkedList.head
      let sameKey = false
      while(node !== null){
        if (Object.keys(node.pair)[0] === key){
          sameKey = true
          break
        }else{
          node = node.nextNode
        }
      }
      if (sameKey){
        node.pair[Object.keys(node.pair)[0]] = value
      }else{
        linkedList.append(key,value)
      }

    }
  }
  function get(key){
    const linkedList = buckets[hash(key)]
    if (linkedList == undefined){
      return null
    }
    let node =  linkedList.head
    while(node !== null){
      if (Object.keys(node.pair)[0] === key){
        return node.pair
      }else{
        node = node.nextNode
      }
    }
  }
  function has(key){
    const linkedList = buckets[hash(key)]
    if (linkedList == undefined){
      return false
    }
    let node =  linkedList.head
    while(node !== null){
      if (Object.keys(node.pair)[0] === key){
        return true
      }else{
        node = node.nextNode
      }
    }
    return false
  }
  function remove(key){
    const result = has(key)
    if (result == false){
      return result
    }
    const hashCode = hash(key)
    const linkedList = buckets[hashCode]
    const head = linkedList.head
    const headKey = Object.keys(head.pair)[0]
    if (headKey === key){
      if (head.nextNode !== null){
        linkedList.head = head.nextNode
        linkedList.size -= 1
      } else{
        buckets[hashCode] = undefined
      }
      return true
    }
    let prevNode = head
    let nextNode = head.nextNode
    while(nextNode !== null){
      if (Object.keys(nextNode.pair)[0] === key){
        prevNode.nextNode = nextNode.nextNode
        linkedList.size -= 1
        return true
      }else{
        prevNode = nextNode
        nextNode = nextNode.nextNode
      }
    }
    return false
  }
  function length(){
    let count = 0
    for (const bucket of buckets){
      if(bucket === undefined)
        continue
      count += bucket.size
    }
    return count
  }
  function clear(){
    const totalKeys = length()
    if (totalKeys === 0){
      return
    }
    buckets = Array(16)
  }
  function keys(){
    const keyList = []
    for (const bucket of buckets){
      if (bucket === undefined)
        continue
      let node = bucket.head
      while(node !== null){
        keyList.push(Object.keys(node.pair)[0])
        node = node.nextNode
      }
    }
    return keyList
  }
  function increaseBucketSize(){
    let occupiedCount = 0;
    for (const bucket of buckets){
      if (bucket !== undefined)
        occupiedCount += 1
    }
    if(occupiedCount / buckets.length >= loadFactor){
      const prevBuckets = buckets
      buckets = Array(prevBuckets.length*2)

      for (const bucket of prevBuckets){
        if(bucket !== undefined){
          const head = bucket.head
          const key = Object.keys(head.pair)[0]
          buckets[hash(key)] = bucket
        }
      }  
    }
  }
  return {hash,set,get,has,remove,length,clear,keys,getBuckets}
}
