class WorksController < ApplicationController

  def create
    work = Work.new(work_params)
    success = work.save
    render json: { success: success, work: work.as_json, error_message: work.errors.full_messages.join(', ') }
  end

  private

  def work_params
    params.require(:work).permit(:task_id)
  end

end
