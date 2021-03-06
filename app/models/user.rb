# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  name            :string
#  image_url       :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  about_me        :text
#  allegiance_id   :integer
#

class User < ActiveRecord::Base
  validates :username, :password, :session_token, presence: true
  validates :password, length: {minimum:6, allow_nil: true}
  validates :username, :session_token, uniqueness: true

  belongs_to :allegiance
  has_many :places,
    primary_key: :id,
    foreign_key: :host_id,
    class_name: :Place
  has_many :bookings
  has_many :reviews,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :Review

  after_initialize :ensure_token

  def self.find_by_credentials(username,password)
    @user = User.find_by(username: username)
    return nil unless @user
    @user.is_password?(password) ? @user : nil
  end

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

  private
  def ensure_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
