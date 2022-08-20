#!/usr/bin/env python3
# encoding: utf-8
from flask import Flask
from web3 import Web3, HTTPProvider
from dotenv import load_dotenv

import os
import json

from knimo.mock import Mock

load_dotenv()
SERVER_PORT      = os.environ.get('SERVER_PORT', 3002)
SERVER_HOST      = os.environ.get('SERVER_HOST', '0.0.0.0')
ALCHEMY_PROVIDER = os.environ.get('ALCHEMY_HTTP_PROVIDER', None)

class Web3Connector:

  def __init__(self, provider) -> None:
    self.web = Web3(provider)
    if not self.is_connected_():
      raise Exception("Web3 is not connected, check provider")

  def is_connected_(self) -> bool:
    return self.web.isConnected()


web = Web3Connector(HTTPProvider(ALCHEMY_PROVIDER))
app = Flask(__name__)


@app.route('/registry', methods=['POST'])
def create_registry():
  return Mock.post_registry()

if __name__ == '__main__':
  app.run(host=SERVER_HOST, port=SERVER_PORT)