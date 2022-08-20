import subprocess
import os
import json

from dotenv import load_dotenv

# faster than using a test framework and easier than writting a bash script for mocking responses

load_dotenv()
SERVER_PORT = os.environ.get('SERVER_PORT', 3002)
SERVER_URL  = os.environ.get('DOMAIN', 'http://127.0.0.1:' + str(SERVER_PORT))

HEADERS = '-H "Content-Type: application/json"'

def build_curl_request(route, method, data=None):
  if data:
    data = json.dumps(data)
  return f"curl -i {HEADERS} -X {method} {SERVER_URL}{route}  -d '{data}'"

route   = '/registry'
command = build_curl_request(route, 'POST', { 'id': '321' })
print('1.', subprocess.run(command, shell=True, capture_output=True).stdout.decode('utf-8'))

route   = '/registry'
command = build_curl_request(route, 'GET', { 'id': '321' })
print('2.', subprocess.run(command, shell=True, capture_output=True).stdout.decode('utf-8'))

route   = '/registry'
command = build_curl_request(route, 'GET', { 'id': '5321' })
print('3.', subprocess.run(command, shell=True, capture_output=True).stdout.decode('utf-8'))