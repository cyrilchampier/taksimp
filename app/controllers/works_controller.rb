class WorksController < ApplicationController

  def create
    render_json_save(Work.new(work_params))
  end

  def update
    work = Work.find(params.require(:id))
    work.assign_attributes(work_params)
    render_json_save(work)
  end

  def descriptions
    return if params[:description].blank?
    work = Work.find(params.require(:id))
    # TODO: use strong params
    work.descriptions << params[:description]
    render_json_save(work)
  end

  private

  def work_params
    params.require(:work).permit(:task_id, :day_percentage, :done_on)
  end
end
