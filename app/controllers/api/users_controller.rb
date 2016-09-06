

class Api::UsersController < ApplicationController

  def index
    @users = Api::User.all

    if @users
      render '/api/users/index'
    else
      @errors = @users.errors.full_messages
      render '/api/shared/error', status: 404
    end
  end

  def show
    @user = current_user
    if @user
      render "api/users/show"
    else
      render json: nil, status: 404
    end
  end

  def create
    @user = Api::User.new(user_params)
    if @user.save
      login_user(@user)
      render 'api/users/show'
    else
      @errors = @user.errors.full_messages
      render "api/shared/error", status: 422
    end
  end

  def update
    @user = Api::User.find(params[:id])
    @user.update(user_params)
    # @user.profile_img_url = params[:user][:profile_img_url]

    if @user.save
      render '/api/users/show'
    else
      @errors = @user.errors.full_messages
      render '/api/shared/error', status: 422
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :home_location_id, :profile_img_url, :email, :password)
  end


end
