# Simulate Network Responses
# (incomplete) POST    registry                              
# (incomplete) GET     registry/<id>                       
# (incomplete) POST    registry/<id>/profile
# (incomplete) GET     registry/<id>/profile/<id>
# (incomplete) POST    registry/<id>/profile/<id>/issue
# (incomplete) PATCH   registry/<id>/profile/<id>/
# (incomplete) POST    registry/<id>/profile/<id>/perk
# (incomplete) GET     registry/<id>/profile/<id>/perk/<id>
# (incomplete) GET     registry/<id>/profile/<id>/perks
# (incomplete) PATCH   registry/<id>/profile/<id>/perk/<id>
# (incomplete) DELETE registry/<id>/profile/<id>/perk/<id>
# (incomplete) POST    registry/<id>/profile/<id>/pause
# (incomplete) POST    registry/<id>/profile/<id>/nft
# (incomplete) GET     registry/<id>/profiles
# (incomplete) GET     profile/<id>
# (incomplete) GET     profile/<id>/metadata
# (incomplete) GET     profile/<id>/registry
# (incomplete) GET     profile/<id>/perks
# (incomplete) GET     profile/<id>/perk/<id>
# (incomplete) GET     profile/<id>/nfts
# (incomplete) GET     profile/<id>/nft/<id>
# (incomplete) GET     profile/<id>/nft/<id>/metadata
# (incomplete) GET     profile/<id>/nft/<id>/owner
# (incomplete) GET     profile/<id>/nft/<id>/renter 

import json

__global_state__ = {
  'registry': [
    {
      'id': '0x0000000000000000000000000000000000000000',
      'profiles': [],
    }
  ],
}


class Mock:
  
  @staticmethod
  def post_registry(_id):
    global __global_state__

    if _id:
      __global_state__['registry'].append({
        'id': _id,
        'profiles': [],
      })
      return json.dumps({
        'success': True,
        'message': 'Registry created',
        'data': {
          'id': _id,
        }
      })

    return json.dumps({ 'success': False })


  @staticmethod
  def get_registry(_id):
    global __global_state__

    if _id:
      for registry in __global_state__['registry']:
        if registry['id'] == _id:
          return json.dumps({
            'success': True,
            'message': 'Registry found',
            'data': registry,
          })
    
    return json.dumps({ 'success': False, 'message': 'Registry not found' })

  @staticmethod
  def post_profile():
    return json.dumps({ 'id': '0x1234567890', 'name': 'knimo profile', 'success': True })

  @staticmethod
  def get_profile():
    return json.dumps({ 'id': '0x1234567890', 'name': 'knimo profile', 'success': True })

  @staticmethod
  def post_issue():
    return json.dumps({ 'id': '0x1234567890', 'name': 'knimo issue', 'success': True })

  @staticmethod
  def patch_profile():
    return json.dumps({ 'id': '0x1234567890', 'name': 'knimo profile', 'success': True })