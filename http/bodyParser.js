export const bodyParser = (request) => {
	if (request.headers['Content-Type'] === "application/json") request.body = JSON.parse(request.body)
	return request
}