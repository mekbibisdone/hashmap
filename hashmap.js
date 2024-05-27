export default function HashMap(){
  /*
    Creates a hash map
    @returns {object} - An object containing a hash function
  */
  const buckets = Array(16)

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
  return {hash,set,getBuckets}
}
