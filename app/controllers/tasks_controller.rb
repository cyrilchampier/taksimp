class TasksController < ApplicationController
  def create
    render_json_save(Task.new(task_params))
  end

  def update
    # TODO: check error display if "BIM"
    task = Task.find(params.require(:id))
    task.assign_attributes(task_params)
    render_json_save(task)
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :project_id, :done_on)
  end
end
