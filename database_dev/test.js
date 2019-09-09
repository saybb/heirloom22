// how to return the value in an asyn function?
function print_document(path) {
    db.doc(path).then(
        (doc) => console.log(doc.data())
    )
}


// differences?
function callback()
// TODO Unexpected token function?
function a(callback){
    callback()
};

promise = new Promise (callback)
promise.then(

)
