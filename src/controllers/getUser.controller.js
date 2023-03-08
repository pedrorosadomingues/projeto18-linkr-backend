

export async function getUser(_, res){
try {
	res.status(200).send(res.locals.user)
} catch (error) {
	console.log(error)
    res.status(500).send(error.message)
}
}