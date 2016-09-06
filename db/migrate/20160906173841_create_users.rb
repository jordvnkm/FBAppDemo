class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :fb_id, null: false
      t.string :session_token, null: false
    end
  end
end
