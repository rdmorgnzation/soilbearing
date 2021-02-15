"""
Properties of footing
"""

from enum import Enum

from .base import Base

class FootingType(str, Enum):
    """
    Supported footing types
    """
    Circular = 'Circular'
    Square = 'Square'
    Strip = 'Strip'
    Rectangular = 'Rectangular'

class FootingData(str, Enum):
    """
    Diffrent datas to be stored for footing info
    """
    Type = 'Type'
    Depth = 'Depth'
    Width = 'Width'
    Length = 'Length'

class Footing(Base):
    """
    Footing base class
    """

if __name__ == "__main__":
    import doctest
    doctest.testmod()
