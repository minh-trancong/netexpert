import pandas as pd

from aicore.components.database.database import *
from aicore.components.database.utils.norm_data import norm_data


dt = pd.read_csv('../../data.csv')
dt = dt.astype('str')
dt.fillna("NULL")

for i in range(0, len(dt)):
    sample = ", ".join(dt.iloc[i].to_list())
    data = norm_data(sample)
    insert_device(Device(**data))
