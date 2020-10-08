"""
Meyerhoff settlement
"""

class Bowels:
    """
    Meyerhoff settlement, looks same as bowels
    """####@@@@@@@@@@@@@@@@TODO: need to check and fix it
    @static_method
    def capacity(N60, depth_footing, width_footing):
        kd = 1 + 0.33*depth_footing/width_footing
        if kd>1.33:
            kd=1.33
        #change N60 to N55
        # N55 * 55 = N60 * 60, some changes as per new privided report
        N55 = N60 * 60/55
        F1 = 0.05
        F2 = 0.08
        F3 = 0.3
        F4 = 1.2
        if footing_width<F4:
            return N55 / F1 * kd
        return N55 / F2 * ((width_footing + F3)/width_footing)**2 * kd
        # as found in Bowels book
