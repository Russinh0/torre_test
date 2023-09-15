const payloadGen=(payload=null,message=null,statusCode=404)=>{
    return [{payload,message},statusCode]
}

export default payloadGen