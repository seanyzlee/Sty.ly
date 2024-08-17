# Preprocessing csv datas in order for read
from queue import Full
import pandas as pd


def read_csv(file_path):
    return pd.read_csv(file_path, sep=',')

def clean_data(data):
    data = data.rename(columns={'Temperature (C)': 'Temperature'})
    data = data.rename(columns={'Precip Type': 'Precipitation Type'})
    columns_to_keep = ['Summary', 'Precipitation Type', 'Temperature', 'Humidity']
    data = data[columns_to_keep]
    data['Temperature'] = data['Temperature'].round(1)
    return data

def save_new_clean_data(data, file_path):
    data.to_csv(file_path, sep=',', index=False, na_rep='null')
    return True

def read_clean_data(file_path):
    return pd.read_csv(file_path, sep=',')

def filter_by_precip_type(data, precip_type, limit=15):
    filtered_data = data[data['Precipitation Type'] == precip_type]
    sampled_data = filtered_data.sample(n=min(limit, len(filtered_data)), random_state=1)
    return sampled_data

def save_filtered_data(data, file_path):
    data.to_csv(file_path, sep=',', index=False, na_rep='null')
    return True

def save_nan_data(data, column_name, limit=15):
    # Filter rows where the specified column has NaN values
    nan_data = data[pd.isna(data[column_name])]
    sampled_data = nan_data.sample(n=min(limit, len(nan_data)), random_state=1)
    sampled_data.to_csv('datasets/weatherHistory_nan.csv', sep=',', index=False, na_rep='null')
    return True

def save_random_rain_data(data, limit=1000):
    rain_data = data[data['Precipitation Type'] == 'rain']
    sampled_data = rain_data.sample(n=min(limit, len(rain_data)), random_state=1)
    sampled_data.to_csv('datasets/unfiltered_clean_data/weatherHistory_rain.csv', sep=',', index=False, na_rep='null')

def save_random_snow_data(data, limit=1000):
    snow_data = data[data['Precipitation Type'] == 'snow']
    sampled_data = snow_data.sample(n=min(limit, len(snow_data)), random_state=1)
    sampled_data.to_csv('datasets/unfiltered_clean_data/weatherHistory_snow.csv', sep=',', index=False, na_rep='null')

def save_random_nan_data(data, limit=1000):
    nan_data = data[pd.isna(data['Precipitation Type'])]
    sampled_data = nan_data.sample(n=min(limit, len(nan_data)), random_state=1)
    sampled_data.to_csv('datasets/unfiltered_clean_data/weatherHistory_nan.csv', sep=',', index=False, na_rep='null')

if __name__ == '__main__':
    data = read_csv('datasets/weatherHistory.csv')
    data = clean_data(data)
    save_new_clean_data(data, 'datasets/weatherHistory_clean.csv')

    cleaned_data = read_clean_data('datasets/weatherHistory_clean.csv')
    precip_type = ['rain', 'snow']

    for precip in precip_type:
        filtered_data = filter_by_precip_type(cleaned_data, precip)
        save_filtered_data(filtered_data, 'datasets/weatherHistory_clean_{}.csv'.format(precip))

    save_nan_data(cleaned_data, 'Precipitation Type')

    save_random_rain_data(cleaned_data)
    save_random_snow_data(cleaned_data)
    save_random_nan_data(cleaned_data)

    print('Preprocessing completed!')
