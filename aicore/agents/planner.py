import os
import google.generativeai as genai
from google.generativeai.protos import Tool, FunctionDeclaration

tool_des = [
    {
        'name': 'normal_chat'
    },
    {
        'name': 'technical_chat',
        'arg': 'question'
    },
    {
        'name': 'get_more_info',
        'arg': 'cur_survey'
    },
    {
        'name': 'build_network',
        'arg': 'survey'
    },
    {
        'name': 'rcm_devices',
        'arg': 'requirements'
    }
]

tools = [

]