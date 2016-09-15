class FacebooksController < ApplicationController
  def index
    if params['hub.mode'] == 'subscribe' && params['hub.verify_token'] == 'token'
      render :text => params['hub.challenge']

    else
      render :text => "not found", status: 404
    end
  end

  def create
    Pusher.trigger('account_update', 'account_updated', {
    })
  end

end
