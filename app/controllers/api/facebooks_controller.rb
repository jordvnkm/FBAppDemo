class Api::FacebooksController < ApplicationController
  def index
    p params

    if params['hub.mode'] == 'subscribe' && params['hub.verify_token'] == 'token'
      render params['hub.challenge']
    end
  end

end
