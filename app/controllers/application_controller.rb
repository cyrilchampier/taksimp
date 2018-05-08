class ApplicationController < ActionController::Base

  def render_json_save(object)
    success = object.save
    render json: { success: success, object: object.as_json, error_message: object.errors.full_messages.join(', ') }
  end
end
