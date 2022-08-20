import subprocess
import os
import json

from dotenv import load_dotenv

# faster than using a test framework and easier than writting a bash script for mocking responses

load_dotenv()
SERVER_PORT = os.environ.get('SERVER_PORT', 3002)
SERVER_URL  = os.environ.get('DOMAIN', 'http://127.0.0.1:' + str(SERVER_PORT))


def validate_response(route, response):
  response = json.loads(response)
  if response['success']:
    print('SUCCESS: ' + route)
  else:
    print('FAILED: ' + route)

validate_response('POST /registry', subprocess.run(f'curl -X POST {SERVER_URL}/registry', shell=True, capture_output=True).stdout.decode('utf-8'))