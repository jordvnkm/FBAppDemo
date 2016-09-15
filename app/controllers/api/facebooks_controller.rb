class Api::FacebooksController < ApplicationController
  def index
    p params
    
    if params[:hub_mode] == 'subscribe' && params[:verify_token] ==
  end

end
