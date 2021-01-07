const userNotFound = {
  errors: [
    {
      param: 'id',
      message: 'User cannot be found'
    }
  ]
}

const dbError = {
  errors: [
    {
      param: null,
      message: 'Database Unavailable'
    }
  ]
}

const errors = { userNotFound, dbError }

export default errors
