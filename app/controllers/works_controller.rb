class WorksController < ApplicationController

  def create
    render_json_save(Work.new(work_params))
  end

  def update
    work.assign_attributes(work_params)
    render_json_save(work)
  end

  def destroy
    render_json_destroy(work)
  end

  def descriptions
    return if params[:description].blank?
    # TODO: use strong params
    work.descriptions << params[:description]
    render_json_save(work)
  end

  private

  def work
    @_work ||= Work.find(params.require(:id))
  end

  def work_params
    params.require(:work).permit(:task_id, :day_percentage, :done_on)
  end
end
