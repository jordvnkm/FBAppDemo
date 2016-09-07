class Api::SessionsController < ApplicationController

  def create
    @user = Api::User.find_by(fb_id: params[:user][:fb_id])

    if @user.nil?
      @user = Api::User.new(fb_id: params[:user][:fb_id])
      
      if @user.save
        login_user(@user)
        render 'api/users/show'
      else
        @errors = @user.errors.full_messages
        render "api/shared/error", status: 422
      end
    else
      login_user(@user)
      render 'api/users/show'
    end

  end

  def show
    @user = current_user

    if @user
      render "api/users/show"
    else
      @errors = ['no current user']
      render "api/shared/error", status: 404
    end
  end

  def destroy
    @user = current_user

    if @user
      logout_user
      render 'api/users/show'
    else
      @errors = ['nobody logged in']
      render "api/shared/error", status: 404
    end

  end
end
