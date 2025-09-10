import pandas as pd
import os
from datetime import datetime

DATA_FILE = "supermarket_prices.csv"

def load_data():
    if not os.path.exists(DATA_FILE):
        df = pd.DataFrame(columns=['id', 'product_name', 'price', 'timestamp'])
        df.to_csv(DATA_FILE, index=False)
    else:
        df = pd.read_csv(DATA_FILE)
    return df

def save_data(df):
    df.to_csv(DATA_FILE, index=False)

def add_entry(product_name, price, timestamp):
    df = load_data()
    new_id = int(df['id'].max())+1 if not df.empty else 1
    new_row = {
        'id': new_id,
        'product_name': product_name,
        'price': float(price),
        'timestamp': timestamp
    }
    df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
    save_data(df)
    return df

def edit_entry(row_id, product_name, price, timestamp):
    df = load_data()
    df.loc[df['id'] == row_id, ['product_name', 'price', 'timestamp']] = [product_name, price, timestamp]
    save_data(df)
    return df

def delete_entry(row_id):
    df = load_data()
    df = df[df['id'] != row_id]
    save_data(df)
    return df