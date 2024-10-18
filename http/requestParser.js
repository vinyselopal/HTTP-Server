const requestParser = (requestData) => {
	const [firstLine, ...restLines] = requestData.toString().split('\n')
	const crlfIndex = restLines.indexOf('\r')
	const body = restLines.slice(crlfIndex + 1)
	const [method, path, httpVersion] = firstLine.trim().split(' ')
	const headers = Object.fromEntries(restLines.slice(0, crlfIndex).map(a => a.split(':')
		.map(a => a.trim()))
		.map(([name, ...rest]) => [name, rest.join(':')])
	)
	return { headers, body, method, path, httpVersion }
}

module.exports = { requestParser }