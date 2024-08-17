import pandas as pd
import numpy as np
import warnings
import json
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.tree import ExtraTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import BaggingClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.metrics import accuracy_score
from sklearn.metrics import classification_report
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
from sklearn.pipeline import Pipeline


def read_json_as_df(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return pd.DataFrame(data)


def preprocess_data(df):
    # Fill missing values
    df['Precipitation Type'].fillna('Unknown', inplace=True)

    # Encode categorical features
    categorical_features = ['Summary', 'Precipitation Type']
    numerical_features = ['Temperature', 'Humidity']
    
    # Define transformers
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', 'passthrough', numerical_features),
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), categorical_features)  # Change sparse=True to sparse=False
        ]
    )

    # Transform features
    X = preprocessor.fit_transform(df)
    y = df['outfit']
    
    return X, y, preprocessor

def split_data(X, y):
    # Split the data into training and test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=0)
    
    return X_train, X_test, y_train, y_test

def train_model(X_train, y_train, x_test, y_test):
    # model testing
    models = {
        'Logistic Regression': LogisticRegression(),
        'Naive Bayes': GaussianNB(),
        'SVM': SVC(),
        'KNN': KNeighborsClassifier(),
        'Decision Tree': DecisionTreeClassifier(),
        'Extra Tree': ExtraTreeClassifier(),
        'Random Forest': RandomForestClassifier(n_estimators=100,random_state=42),
        'Bagging': BaggingClassifier(),
        'Gradient Boosting': GradientBoostingClassifier(),
        'AdaBoost': AdaBoostClassifier()
    }

    for name, model in models.items():
        model.fit(X_train, y_train)
        ypred = model.predict(x_test)
        print(f"{name}  with accuracy : {accuracy_score(y_test,ypred)}")

    return models

def predict_outfit(Summary, Precipitation_Type, Temperature, Humidity):
    features = np.array([json.loads(f'{{"Summary":"{Summary}","Precipitation Type":"{Precipitation_Type}","Temperature":{Temperature},"Humidity":{Humidity}}}')])
    df = pd.DataFrame(features)
    print(df)

    

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

    X, y, preprocessor = preprocess_data(combined_data)
    X_train, X_test, y_train, y_test = split_data(X, y)

    print('X_train shape:', X_train.shape)
    print('X_test shape:', X_test.shape)
    print('y_train shape:', y_train.shape)
    print('y_test shape:', y_test.shape)
    print('-'*50)

    models = train_model(X_train, y_train, X_test, y_test)
    print('-'*50)
    predict_outfit('Partly Cloudy', 'rain', 33.9, 0.41)
    print('-'*50)
    
def train():
    data_str = """{"Summary":"Partly Cloudy","Precipitation Type":"rain","Temperature":33.9,"Humidity":0.41,"outfit":"Sunglasses, Hat, T-shirt"},{"Summary":"Mostly Cloudy","Precipitation Type":"rain","Temperature":13.9,"Humidity":0.67,"outfit":"Raincoat, Umbrella, Waterproof shoes"},..."""  # Your full data string here
    data_list = [json.loads(item) for item in data_str.split('},{')]
    df = pd.DataFrame(data_list)
    X = df[['Summary', 'Precipitation Type', 'Temperature', 'Humidity']]
    y = df['outfit']
    le = LabelEncoder()
    X['Summary'] = le.fit_transform(X['Summary'])
    X['Precipitation Type'] = le.fit_transform(X['Precipitation Type'])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
    rf_model.fit(X_train, y_train)
    y_pred = rf_model.predict(X_test)
    print('Accuracy:', accuracy_score(y_test, y_pred))
    print('\nClassification Report:')
    print(classification_report(y_test, y_pred))


if __name__ == '__main__':
    main()
# Output: Combined dataset created

