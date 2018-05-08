class WorksController < ApplicationController

  def create
    render_json_save(Work.new(work_params))
  end

  private

  def work_params
    params.require(:work).permit(:task_id)
  end
end
