def serialize_image(req, resp, resource):
    if 'image' not in resp.content_type:
        return

    resp.body = resp.body.read()
