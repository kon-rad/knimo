from web3 import Web3
from dotenv import load_dotenv

import os

load_dotenv()
REGISTRY_SC_ABI  = os.environ.get('REGISTRY_SC_ABI', None)
REGISTRY_SC_BYTE = os.environ.get('REGISTRY_SC_BYTE', None)

class Web3Connector:

  def __init__(self, provider) -> None:
    self.web = Web3(provider)
    if not self.is_connected_():
      raise Exception("Web3 is not connected, check provider")


  def is_connected_(self) -> bool:
    return self.web.isConnected()
