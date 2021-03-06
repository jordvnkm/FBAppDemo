class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.

  helper_method :current_user

  def current_user
    @current_user ||= Api::User.find_by(session_token: session[:session_token])
  end


  def login_user(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout_user
    session[:session_token] = nil
    current_user.reset_session_token!
    @current_user = nil
  end
end
