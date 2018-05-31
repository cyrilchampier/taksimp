// All functions returns { success, object, error_message }
// TODO: transform this in a real class taking the object name as constructor parameter ?
class QueryHelper {
  static async create(model_name, params) {
    let ajaxParams = {
      type: 'POST',
      url: `/${model_name}s`,
      data: params
    }
    return this._executeQuery(ajaxParams)
  }

  // TODO: this `route` param is not generic, only for Works.
  static async update(model_name, id, params, { route } = {}) {
    let url = `/${model_name}s/${id}`
    if (route) {
      url += `/${route}`
    }
    let ajaxParams = {
      type: 'PUT',
      url,
      data: params
    }
    return this._executeQuery(ajaxParams)
  }

  static async delete(model_name, id) {
    let url = `/${model_name}s/${id}`
    let ajaxParams = {
      type: 'DELETE',
      url
    }
    return this._executeQuery(ajaxParams)
  }

  static async _executeQuery(ajaxParams) {
    try {
      let response = await jQuery.ajax(ajaxParams)
      if (!response) {
        throw new Error(`'no_content' received from ${JSON.stringify(ajaxParams)}`)
      }
      // TODO: we should validate this response format
      // let { success, object, error_message } = response
      return response
    }
    catch (error) {
      this._formatError(error)
    }
  }

  static _formatError(error) {
    console.log({ error })
    if (error.responseJSON) {
      // TODO: we should validate this response format
      // let { success, object, error_message } = response
      return error.responseJSON
    } else {
      let error_message = error.responseText || error
      return { success: false, object: undefined, error_message }
    }
  }
}

export default QueryHelper