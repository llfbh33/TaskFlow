// index file for configuring backend.  will read environment variables
    // load, and export them.

module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    dbFile: process.env.DB_FILE,
    jwtConfig: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    }
}

// each environment variable is read and exported as a key from this file.
