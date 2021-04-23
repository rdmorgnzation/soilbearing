"""
Teng method
"""
import subprocess, time
import win32gui
import win32con
import shutil, os
import pyodbc
from pathlib import Path
from blcalc.material import MaterialData

import math
from ..soilproperty import SoilProperty

def update_datas(input_datas, helper_path):
    odbc_head = "Driver={Driver do Microsoft Access (*.mdb)}"
    db_path = helper_path+"\\BHLog.DTA\\soildata.mdb"
    conn = pyodbc.connect("{};DBQ={};".format(odbc_head,db_path))
    cursor = conn.cursor()
    cursor.execute('select * from SoilNames where MatTypeName=?;', "Mohr-Coulomb")
    head = cursor.description
    row = cursor.fetchone()
    #Let's create inverse map for opposite operation
    map_pp = {}
    for i,data in enumerate(head):
        if row[i] and data[0]:
            if data[0].find('Name')!=-1:
                map_pp[row[i]]=''.join(data[0].split('Name'))
    template = 'UPDATE SoilData\n'
    template += ' SET'
    template += ' {} = ?,'.format(map_pp['G_ref'])
    template += ' {} = ?,'.format(map_pp['sin(phi)'])
    template += ' {} = ?,'.format(map_pp['c_ref'])
    template += ' {} = ?,'.format(map_pp['w_dry'])
    template += ' {} = ?,'.format(map_pp['w_wet'])
    template += ' {} = ?'.format(map_pp['nu'])
    template += ' \nWHERE ModelDesc = ?;'
    #print(template)
    # Req prop min
    for i in range(8):
        mat = input_datas.get((i+1)*1.5)
        lname = str(i)
        phi = mat[SoilProperty.phi]
        c = mat[SoilProperty.cu]
        gamma_wet = mat[SoilProperty.sat_unit_weight]
        gamma_dry = 9.81*float(mat[SoilProperty.gamma])
        if gamma_dry>gamma_dry:
            gamma_dry=gamma_wet
        #print(gamma_dry, gamma_wet)
        nu = mat[SoilProperty.nu]
        if nu>=0.499:
            nu=0.499
        E = mat[SoilProperty.elasticity]
        G = E / (1+nu) /2
        #update items
        params = (
            G,
            phi,
            c,
            gamma_dry,
            gamma_wet,
            nu,
            str(i)
        )
        cursor.execute(template, params)
    cursor.commit()
    conn.close()

def findWindow(win_class):
        return win32gui.FindWindow(win_class, None)

def update_data_cache(helper_path):
    input_program = "C:\\Program Files (x86)\\Plaxis8x\\Geo.exe"
    file = helper_path+"\\BHLog.plx"
    p=subprocess.Popen([input_program, file])
    time.sleep(0.5)
    window_class_main = 'TGeoMainForm'
    window_class_splash='TGeoSplash'
    while findWindow(window_class_splash):
        time.sleep(0.5)
    hwndMain = findWindow(window_class_main)
    time.sleep(1.5) # some time before loading
    win32gui.PostMessage(hwndMain, win32con.WM_COMMAND, 5, 0)
    time.sleep(1.25)#crack does it's work here
    win32gui.PostMessage(hwndMain, win32con.WM_COMMAND, 19, 0)
    p.wait()

def create_empty_file(name):
    try:
        with open(name,'w') as f:
            pass
    except:
        pass

def plaxis_method(input_datas, helper_path):
    batch_program = "C:\\Program Files (x86)\\Plaxis8x\\batch.exe"
    file = helper_path+"\\BHLog.plx"
    #Remove old force datas
    force_data_file = "C:\\Program Files (x86)\\Plaxis8x\\force.txt"
    create_empty_file(force_data_file)
    update_datas(input_datas, helper_path)
    update_data_cache(helper_path)
    file="C:\\Program Files (x86)\\Plaxis8x\\Examples\\BHLog.plx"
    p=subprocess.Popen([batch_program, file])
    time.sleep(0.5)
    window_class_main = 'TBatchFrm'
    window_class_splash = 'TCalcSplash'
    window_class_calculation = 'TCalcForm'
    while findWindow(window_class_splash):
        time.sleep(0.3)
    # get main window hwnd, print(hwndMain)
    #calculate
    time.sleep(1.25)#more data more time to load,1.5:ok
    create_empty_file(force_data_file)
    hwndMain = findWindow(window_class_main)
    win32gui.PostMessage(hwndMain, win32con.WM_COMMAND, 23, 0)
    #check for 4 lines on that file
    while True:
        time.sleep(0.75)
        try:
            with open(force_data_file) as f:
                data = f.read()
                if len(data.splitlines())>6:
                    break
        except:
            pass
    time.sleep(0.75)
    #save and exit
    win32gui.PostMessage(hwndMain, win32con.WM_COMMAND, 3, 0)
    time.sleep(0.5)
    win32gui.PostMessage(hwndMain, win32con.WM_COMMAND, 11, 0)
    p.wait()
    datas = []
    with open(force_data_file) as f:
        dat = f.read().splitlines()
        for h,i in enumerate(dat[1:]):
            #h = 1.5*(h+1)
            #surcharge = get_top_material(input_datas,h)[8]
            datas.append(float(i))
            #datas.append(float(i.split(' ')[1]))
            #datas.append((float(i.split(' ')[1])*-2-surcharge)/3)
    os.unlink(force_data_file)
    return datas

#do simulation
class Plaxis:
    """
    Plaxis method
    """
    @staticmethod
    def calculate(lay, depth):
        depthx = lay[MaterialData.WaterDepth]
        if depthx>12:
            depthx=12
        conv = float(int(depthx/0.5)*0.5)
        conv = "%.1f"%conv
        helper_path = str(Path(__file__).parent / 'helper' / conv)
        helper_root_path = str(Path(__file__).parent / 'helper')
        if lay[MaterialData.ID]>=0:
            #check if result is stored previously
            try:
                with open(helper_root_path+'\\results\\%d.txt'%lay[MaterialData.ID]) as f:
                    res = []
                    for i in range(6):
                        res.append(float(f.readline()))
            except IOError:
                res = plaxis_method(lay, helper_path)
                with open(helper_root_path+'\\results\\%d.txt'%lay[MaterialData.ID],'w') as f:
                    for i in res:
                        f.write(str(i)+'\n')
            #print(res)
            if depth<=1.5:
                ans = [res[0] , res[3]]
            elif depth<=3:
                ans = [res[1], res[4]]
            else:
                ans = [res[2], res[5]]
            return [ans[0]/-2,ans[1]/-2]
        else:
            return 0
        return 0