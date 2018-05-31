class ApplicationController < ActionController::Base

  def render_json_save(object)
    success = object.save
    render(build_response(success, object))
  end

  def render_json_destroy(object)
    object.destroy
    success = object.destroyed?
    render(build_response(success, object))
  end

  private

  def build_response(success, object)
    {
      status: status_from_success(success),
      json: build_json_response(success, object)
    }
  end

  def status_from_success(success)
    Rack::Utils::SYMBOL_TO_STATUS_CODE[success ? :ok : :unprocessable_entity]
  end

  def build_json_response(success, object)
    { success: success, object: object, error_message: object.errors.full_messages.join(', ') }
  end
end
