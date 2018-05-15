class ApplicationController < ActionController::Base

  def render_json_save(object)
    success = object.save
    render(
      status: Rack::Utils::SYMBOL_TO_STATUS_CODE[success ? :ok : :unprocessable_entity],
      json: { success: success, object: object.as_json, error_message: object.errors.full_messages.join(', ') }
    )
  end
end
