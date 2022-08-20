#!/usr/bin/env python3
# encoding: utf-8
from flask import Flask
from dotenv import load_dotenv
from web3 import HTTPProvider
from knimo.mock import Mock
from knimo.web3 import Web3Connector

import os

load_dotenv()
SERVER_PORT      = os.environ.get('SERVER_PORT', 3002)
SERVER_HOST      = os.environ.get('SERVER_HOST', '0.0.0.0')
ALCHEMY_PROVIDER = os.environ.get('ALCHEMY_HTTP_PROVIDER', None)

app = Flask(__name__)

@app.route('/registry', methods=['POST'])
def create_registry():
  return Mock.post_registry()

if __name__ == '__main__':
  web = Web3Connector(HTTPProvider(ALCHEMY_PROVIDER))
  app.run(host=SERVER_HOST, port=SERVER_PORT)