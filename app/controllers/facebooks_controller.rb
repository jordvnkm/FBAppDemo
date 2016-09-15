class FacebooksController < ApplicationController
  def index
    p params

    if params['hub.mode'] == 'subscribe' && params['hub.verify_token'] == 'token'
      render :text => params['hub.challenge']
      Pusher.trigger('account_update', 'account_updated', {
      })
    else
      render :text => "not found", status: 404
    end
  end

end
