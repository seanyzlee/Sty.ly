import pandas as pd
import numpy as np
import warnings
import json
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder

def read_json_as_df(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return pd.DataFrame(data)

def preprocess_data(df):
    # Fill missing values in 'Precipitation Type' with 'sunny'
    df['Precipitation Type'].fillna('sunny', inplace=True)
    
    # Encode categorical features except 'outfit'
    df_features = df.drop('outfit', axis=1)  # Drop target variable
    df_encoded = pd.get_dummies(df_features, drop_first=True)
    
    # Print the columns after one-hot encoding
    print("Columns after one-hot encoding:", df_encoded.columns)
    
    # Encode target variable 'outfit'
    label_encoder = LabelEncoder()
    df['outfit'] = label_encoder.fit_transform(df['outfit'])
    
    # Separate features and target variable
    X = df_encoded  # Features after one-hot encoding
    y = df['outfit']  # Target variable encoded
    
    return X, y, label_encoder

def main():
    warnings.filterwarnings("ignore")
    rain_data = read_json_as_df('datasets/clean_data/weatherHistory_rain_outfit.json')
    snow_data = read_json_as_df('datasets/clean_data/weatherHistory_snow_outfit.json')
    sun_data = read_json_as_df('datasets/clean_data/weatherHistory_nan_outfit.json')
    
    # Combine the three datasets
    combined_data = pd.concat([rain_data, snow_data, sun_data], ignore_index=True)

    # Save the combined dataset
    combined_data.to_json('datasets/clean_data/weatherHistory_combined_outfit.json', orient='records', lines=False)

    print("Combined dataset created")
    print('Combined dataset shape:')
    print(combined_data.shape)
    print('-'*50)
    print('Combined dataset info:')
    print(combined_data.info())
    print('-'*50)
    print(combined_data.isnull().sum())
    print('-'*50)
    print(combined_data.describe())
    print('-'*50)
    numeric_data = combined_data.select_dtypes(include=['float64', 'int64'])
    print('Numerical columns:', numeric_data)
    print('-'*50)
    corr = numeric_data.corr()
    print('Correlation matrix:')
    print(corr)
    plt.figure(figsize=(10, 6))
    sns.scatterplot(data=combined_data, x='Temperature', y='Humidity', hue='outfit', palette='Set1')
    plt.title('Temperature vs Humidity by Outfit')
    print('-'*50)
    print(combined_data['outfit'].value_counts())
    print('-'*50)

    X, y, label_encoder = preprocess_data(combined_data)


if __name__ == '__main__':
    main()
# Output: Combined dataset created

