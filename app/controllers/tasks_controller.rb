class TasksController < ApplicationController
  def create
    Task.create!(task_params)
  end

  private

  def task_params
    params.require(:task).permit(:name, :description, :project_id)
  end
end
