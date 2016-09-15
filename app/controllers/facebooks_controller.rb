class FacebooksController < ApplicationController
  def index
    p params

    if params['hub.mode'] == 'subscribe' && params['hub.verify_token'] == 'token'
      render :text => params['hub.challenge']
    else
      render :text => "not found", status: 404
    end
  end

end
