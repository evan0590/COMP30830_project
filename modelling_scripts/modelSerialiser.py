import pickle
import pandas as pd
from sklearn.linear_model import LinearRegression
import time

try:
    week_df = pd.read_csv('/home/ubuntu/COMP30830_project/csv_files/weeklyAvailableBikes.csv')
    weekend_df = pd.read_csv('/home/ubuntu/COMP30830_project/csv_files/weekendAvailableBikes.csv')


    def serialise_model_weekday(station_id):
        """Function to generate a model for each station based
        upon the days of the week.
        """
        df = week_df.loc[(week_df.ID == station_id)]
        df.drop(["ID", "datetime"], axis=1, inplace=True)
        df["day_x"].replace([0, 1, 2, 3, 4, 5, 6], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], inplace=True)
        df = pd.get_dummies(df, drop_first=True)
        column_names = list(df.columns)[1:]
        X = df[column_names]
        y = df.target
        add_var = pd.get_dummies(X['tod'], prefix='tod', drop_first=True)
        X = X.join(add_var)
        X.drop(columns=['tod'], inplace=True)
        df.dropna(axis=0, how='any', inplace=True)
        model = LinearRegression(fit_intercept=False)
        model.fit(X, y)
        with open('app/static/models_weekdays/%s.pkl' % station_id, 'wb') as handle:
            pickle.dump(model, handle, pickle.HIGHEST_PROTOCOL)


    def serialise_model_weekend(station_id):
        """Function to generate a model for each station based
        upon the days of the weekend.
        """
        df = weekend_df.loc[(weekend_df.ID == station_id)]
        df.drop(["ID", "datetime"], axis=1, inplace=True)
        df["day_x"].replace([0, 1, 2, 3, 4, 5, 6], ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], inplace=True)
        df = pd.get_dummies(df, drop_first=True)
        column_names = list(df.columns)[1:]
        X = df[column_names]
        y = df.target
        add_var = pd.get_dummies(X['tod'], prefix='tod', drop_first=True)
        X = X.join(add_var)
        X.drop(columns=['tod'], inplace=True)
        df.dropna(axis=0, how='any', inplace=True)
        model = LinearRegression(fit_intercept=False)
        model.fit(X, y)
        with open('/home/ubuntu/COMP30830_project/app/static/models_weekends/%s.pkl' % station_id, 'wb') as handle:
            pickle.dump(model, handle, pickle.HIGHEST_PROTOCOL)


    for i in week_df['ID'].unique().tolist():
        serialise_model_weekday(i)
        serialise_model_weekend(i)

except:
    print("Model Serialiser failed", time.time())
