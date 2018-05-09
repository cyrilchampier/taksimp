class WorksController < ApplicationController

  def create
    render_json_save(Work.new(work_params))
  end

  def done
    # work_update_params = params.require(:work).permit(:day_percentage)
    work = Work.find(params.require(:id))
    work.day_percentage = params[:work][:day_percentage].to_f
    work.done_on = Time.current
    render_json_save(work)
  end

  private

  def work_params
    params.require(:work).permit(:task_id, :description)
  end
end
