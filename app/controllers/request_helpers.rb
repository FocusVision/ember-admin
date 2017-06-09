module RequestHelpers
  attr_reader :response

  def headers_for_user(user)
    access_token = create(:access_token, resource_owner_id: user.id)
    json_api_media_type_headers.merge(
      'Authorization' => "Bearer #{access_token.token}"
    )
  end

  def authentication_error(message=nil)
    {
      title: 'Authentication failed',
      detail: message || 'Authentication failed',
      status: '401',
      code: '401'
    }
  end
end
