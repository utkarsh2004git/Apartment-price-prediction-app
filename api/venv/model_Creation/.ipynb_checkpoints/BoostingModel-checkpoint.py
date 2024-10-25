import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
import pickle

train_data= pd.read_csv('train')
train_data.drop(['ADDRESS'],axis=1,inplace=True)

train_data['BHK_OR_RK'] = train_data['BHK_OR_RK'].map({'BHK':1, 'RK':2})
train_data['POSTED_BY'] = train_data['POSTED_BY'].map({'Owner':1, 'Dealer':2, 'Builder':3})

Y = train_data['TARGET(PRICE_IN_LACS)']
X=train_data.drop(['TARGET(PRICE_IN_LACS)'], axis=1, inplace=False)

train_data.drop(['TARGET(PRICE_IN_LACS)'], axis=1, inplace=True)



boosting = GradientBoostingRegressor(n_estimators=2000, max_depth=5, learning_rate=0.1)
print(boosting)
boosting.fit(train_data, Y)


with open('BoostingModel.pkl', 'wb') as file:
    pickle.dump(boosting, file)

print("Model saved as model.pkl")