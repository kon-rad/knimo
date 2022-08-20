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

class Mock:
  
  @staticmethod
  def post_registry():
    return json.dumps({ 'id': '0x1234567890', 'name': 'knimo registry', 'success': True })