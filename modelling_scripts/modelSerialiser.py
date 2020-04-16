import pickle
import pandas as pd
from sklearn.linear_model import LinearRegression


def serialise_model_weekday(station_id):
    """Function to generate a model for each station based
    upon the days of the week.
    """
    weekly_df = pd.read_csv('/home/ubuntu/COMP30830_project/csv_files/modellingTable.csv')
    weekly_df = weekly_df.loc[(weekly_df['day_x'] >= 0) & (weekly_df['day_x'] <= 4)]
    weekly_df = weekly_df.loc[(weekly_df.ID == station_id)]
    weekly_df.to_csv('/home/ubuntu/COMP30830_project/csv_files/weeklyAvailableBikes.csv', index=False)
    df = pd.read_csv('/home/ubuntu/COMP30830_project/csv_files/weeklyAvailableBikes.csv')
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
    weekend_df = pd.read_csv('/home/ubuntu/COMP30830_project/csv_files/modellingTable.csv')
    weekend_df = weekend_df.loc[(weekend_df['day_x'] >= 5) & (weekend_df['day_x'] <= 6)]
    weekend_df = weekend_df.loc[(weekend_df.ID == weekend_df)]
    weekend_df.to_csv('/home/ubuntu/COMP30830_project/csv_files/weekendAvailableBikes.csv', index=False)
    df = pd.read_csv('/home/ubuntu/COMP30830_project/csv_files/weekendAvailableBikes.csv')
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


for i in full_df['ID'].unique().tolist():
    serialise_model_weekday(i)
    serialise_model_weekend(i)
