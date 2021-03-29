"""
Some initial setups
"""
#Here setup is done automatically
#Provide resources too later

import os
import sys
from pathlib import Path

module_path = os.path.abspath(os.path.join('..'))
if module_path not in sys.path:
    sys.path.append(module_path)

def media_path():
    """
    Returns path of medias
    """
    path = Path(os.path.abspath(os.path.join('..'))) / "media"
    return path
