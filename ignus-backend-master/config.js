module.exports = {
	port: process.env.PORT || 8080,
	db: process.env.DB || '',
	url: process.env.URL || 'localhost',
	secret_key: process.env.SECRET_KEY || "712386210123",
	pathRootStaticFiles: process.env.PATHROOTSTATICFILES || "public"
}