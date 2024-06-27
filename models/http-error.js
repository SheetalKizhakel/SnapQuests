//HttpError is our own class but it has the properties of already defined javascript class Error
class HttpError extends Error{
    constructor(message,errorCode)
    {
        super(message);//calls the constructor of the base class Error which will add a message property
        this.code=errorCode;//used to add a property to the currently calling object
    }
}
module.exports=HttpError;