require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
  config.generators do |g|
    g.stylesheets false
    g.javascripts false
    g.helper false #実体はモジュール（多分、ヘルパーメソッドを自分で作る場合に使うのでは）
    g.test_framework false
  end
end
