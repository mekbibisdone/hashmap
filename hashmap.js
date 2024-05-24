export default function HashMap(){
  /*
    Creates a hash map
    @returns {object} - An object containing a hash function
  */
  let bucketLength = 16

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
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucketLength;
    }
 
    return hashCode;
  } 
  
  return {hash}
}