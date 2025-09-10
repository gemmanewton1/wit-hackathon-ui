import streamlit as st
import pandas as pd
from datetime import datetime

from data_utils import load_data, add_entry, edit_entry, delete_entry
from ui_utils import entry_row, edit_form, plot_prices

st.set_page_config(page_title="Supermarket Price Tracker", layout="wide")
st.title("🛒 Supermarket Price Tracking Dashboard")

df = load_data()

# --- Add Entry ---
st.sidebar.header("Add New Price Entry")
with st.sidebar.form(key="add_entry_form"):
    product_name = st.text_input("Product name")
    price = st.number_input("Price", min_value=0.0, step=0.01, format="%.2f")
    timestamp = st.date_input("Date", value=datetime.today())
    time_input = st.time_input("Time", value=datetime.now().time())
    submit_entry = st.form_submit_button("Add Price Entry")
if submit_entry and product_name != "":
    ts = datetime.combine(timestamp, time_input).strftime("%Y-%m-%d %H:%M:%S")
    df = add_entry(product_name, price, ts)
    st.sidebar.success("Entry added!")
    st.experimental_rerun()

# --- Edit / Delete Functionality ---
st.subheader("Edit or Delete Entries")
if not df.empty:
    for idx, row in df.iterrows():
        edit_btn, del_btn = entry_row(row)
        if edit_btn:
            result = edit_form(row)
            if result:
                new_product_name, new_price, new_ts, do_save, do_cancel = result
                if do_save:
                    df = edit_entry(row['id'], new_product_name, new_price, new_ts)
                    st.success("Entry updated!")
                    st.experimental_rerun()
                elif do_cancel:
                    st.experimental_rerun()
        if del_btn:
            df = delete_entry(row['id'])
            st.warning("Entry deleted.")
            st.experimental_rerun()
else:
    st.info("No entries yet.")

# --- Filtering and Plotting ---
st.subheader("Price Trends")
if not df.empty:
    products = df['product_name'].unique().tolist()
    selected_products = st.multiselect("Select products to plot", products, default=products[:1])
    if selected_products:
        plot_prices(df, selected_products)
else:
    st.info("Add entries to view price trends.")

# --- Data Table ---
st.subheader("All Entries")
if not df.empty:
    st.dataframe(df[['id', 'product_name', 'price', 'timestamp']].sort_values('timestamp', ascending=False), use_container_width=True)