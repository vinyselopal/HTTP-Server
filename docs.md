- request = simple request | full request
- Streams and Buffers
- Handle Express next with generators
- Serve body usng streams and json without
- According to ExpressJS spec
    - error handling with req-res cycle, eg. whether req has been sent
    - express middlewares
    - CORS, same origin, etc.
- caching
- downloading
- handling different status codes
    - Some status codes dont include body
    - No content length => bad request
    - handle unrecognized header fields
- URI
- expiration
- dates
- character sets
- Socket pool
- Keep Alive
- Chunked Transfer Encoding
- Spec documentation
- Forms: multipart (boundary), url-encoded (ampersand)

        request                     response
sock -> IncomingMessage (readable stream) -> OutgoingMessage (writable stream)-> sock