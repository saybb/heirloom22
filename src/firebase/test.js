/******************* Test Functions ************************/

async function get_all() {
    collection = new Artifacts_collection(firestore)
    result = await collection.get_all_document()
    console.log(result)
    collection = new Appendums_collection(firestore)
    result = await collection.get_all_document()
    console.log(result)
    collection = new Users_collection(firestore)
    result = await collection.get_all_document()
    console.log(result)
    collection = new Events_collection(firestore)
    result = await collection.get_all_document()
    console.log(result)
    collection = new People_collection(firestore)
    result = await collection.get_all_document()
    console.log(result)
}

async function get() {
    collection = new Artifacts_collection(firestore)
    document_id = "wedding_ring_id"
    result = await collection.get_document_by_id(document_id)
    console.log(result)
}