class TasksController < ApplicationController
  def create
    render_json_save(Task.new(task_params))
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :project_id)
  end
end
