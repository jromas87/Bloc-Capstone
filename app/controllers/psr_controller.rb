class PsrController < ApplicationController
  def index
    @jobs = Job.all

    respond_to do |format|
      format.html
      format.json { render json: @jobs, root: false }
    end
  end

  def new
    @job = Job.new
  end

  def show
    @job = Job.find(params[:id])
  end

  def edit
    @job = Job.find(params[:id])
  end

  def create
    #binding.pry
    @job = Job.new(job_params)

    respond_to do |format|
      if @job.save
        format.html { redirect_to @job, notice: 'Job was successfully created.' }
        format.json { render json: @job, root: false, status: :created, location: @job }
      else
        format.html { render action: "new" }
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end


  def destroy
    @job = Job.find(params[:id])
    @job.destroy

    respond_to do |format|
      format.html { redirect_to jobs_url }
      format.json { head :no_content }
    end
  end


  def update
   @job = Job.find(params[:id])
    #binding.pry
    respond_to do |format|
      if @job.update_attributes(job_params)
        format.html { redirect_to @job, notice: 'Job was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @job.errors, root: true,status: :unprocessable_entity }
      end
    end
  end


  private

  def job_params
    state = params[:job].delete(:state)
    projType = params[:job].delete(:project_type)
    projPhase = params[:job].delete(:project_phase)
    sachseGroup = params[:job].delete(:sachse_group)
    contractType = params[:job].delete(:contract_type)
    params[:job].merge!({state_id: state["id"]})
    params[:job].merge!({project_type_id: projType["id"]})
    params[:job].merge!({project_phase_id: projPhase["id"]})
    params[:job].merge!({sachse_group_id: sachseGroup["id"]})
    params[:job].merge!({contract_type_id: contractType["id"]})
    params.require(:job).permit(:state_id, :name, :number, :precon_number, :address, :city, :zip, :country_id, :project_phase_id, :project_type_id, :sachse_group_id, :contract_type_id, :sqft, :start_date, :turnover_date, :building)
  end
end
