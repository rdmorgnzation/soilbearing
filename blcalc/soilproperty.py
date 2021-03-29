"""
Diffrent properties of soil
"""
from enum import Enum

class SoilProperty(str, Enum):
    """
    Diffrent soil properties
    """
    SPT_N = 'SPT_N'
    N60 = 'N60'
    depth = 'depth'
    gamma = 'gamma'
    vertical_effective_stress = 'vertical_effective_stress'
    total_effective_stress = 'total_effective_stress'
    phi = 'phi'
    GI = 'GI'
    elasticity = 'elasticity'
    packing_case = 'packing_case'
    nu = 'nu'
    qu = 'qu'
    cu = 'cu'
    water_per = 'water_per'
    G = 'G'
    sat_unit_weight = 'sat_unit_weight'
    water_depth = 'water_depth' #need for dil correction
    FC = 'FC'
    thickness = 'thickness'